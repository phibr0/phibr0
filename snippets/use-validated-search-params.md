---
title: URL State as easy as useState in Nextjs' App Router
slug: 'use-validated-search-params'
date: '2024-02-02'
---

```tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useOptimistic, useTransition } from 'react';
import { z } from 'zod';

type CustomToStringFn<T> = (value: T) => string | null | undefined;

/**
 * A custom hook that provides validated search parameters based on a Zod validator.
 *
 * @template T - The ZodType used for validation.
 * @param {T} zodValidator - The Zod validator to validate the search parameters. *Make sure to provide a default fallback.*
 * @param {CustomToStringFn<z.infer<T>[keyof z.infer<T>]>} [options.customToString] - A custom function to convert the value to a string used in the URL.
 * @param {string} [options.pathname] - The pathname to use when updating the URL.
 * @param {boolean} [options.shallow] - If true, the URL will be updated without reloading rsc's.
 * @returns {[z.infer<T>, (value: z.infer<T>) => void, boolean]} - A tuple containing the validated parameters, a function to set the value (like what useState returns), and a boolean indicating if the transition is pending.
 */
export function useValidatedSearchParams<T extends z.ZodType>(
  zodValidator: T,
  options?: {
    customToString?: CustomToStringFn<z.infer<T>[keyof z.infer<T>]>;
    pathname?: string;
    shallow?: boolean;
  }
): [
  z.infer<T> | undefined,
  (value: z.infer<T>, resetKeys?: string[]) => void,
  boolean
] {
  const [pending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const validatedParams = useMemo(() => {
    const params = fromEntries(searchParams?.entries() ?? []);
    const parsed = zodValidator.safeParse(params);
    if (parsed.success) {
      return parsed.data;
    }
    return undefined;
  }, [searchParams, zodValidator]);

  const [optimisticParams, setOptimisticParams] =
    useOptimistic(validatedParams);

  const setValue = useCallback(
    (newValue: z.infer<T>, resetKeys?: string[]) => {
      startTransition(() => {
        setOptimisticParams(newValue);
        const url = updateSearchParams<T>(
          newValue,
          resetKeys,
          options?.customToString
        );
        url.pathname = options?.pathname ?? url.pathname;
        if (options?.shallow) {
          window.history.replaceState({}, '', url.href);
        } else {
          router.replace(url.href, { scroll: false });
        }
      });
    },
    [
      options?.customToString,
      options?.pathname,
      options?.shallow,
      router,
      setOptimisticParams,
      startTransition,
    ]
  );

  return [optimisticParams, setValue, pending];
}

function fromEntries(entries: Iterable<[string, string]>) {
  const output: Record<string, string | string[]> = {};
  for (const [key, value] of entries) {
    if (output[key] === undefined) {
      output[key] = value;
    } else if (Array.isArray(output[key])) {
      // @ts-expect-error isArray so push exists
      output[key].push(value);
    } else {
      // @ts-expect-error output[key] is a string
      output[key] = [output[key], value];
    }
  }
  return output;
}

function updateSearchParams<T extends z.ZodType>(
  newValue: z.TypeOf<T>,
  resetKeys?: string[],
  customToString?: CustomToStringFn<z.infer<T>>
) {
  const url = new URL(window.location.href);
  for (const [key, val] of Object.entries<T>(newValue)) {
    if (Array.isArray(val)) {
      url.searchParams.delete(key);
      for (const value of val) {
        const strValue = customToString?.(value) ?? value?.toString();
        if (strValue !== undefined && strValue !== null) {
          url.searchParams.append(key, strValue);
        }
      }
    } else {
      const strValue = customToString?.(val) ?? val?.toString();
      if (strValue !== undefined && strValue !== null) {
        url.searchParams.set(key, strValue);
      } else {
        url.searchParams.delete(key);
      }
    }
  }
  resetKeys?.forEach((key) => url.searchParams.delete(key));
  return url;
}
```
