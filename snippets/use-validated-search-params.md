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
 * @param {CustomToStringFn<z.infer<T>[keyof z.infer<T>]>} [customToString] - Optional custom toString function for converting a parameter to a string for the URL.
 * @returns {[z.infer<T>, (value: z.infer<T>) => void, boolean]} - A tuple containing the validated parameters, a function to set the value (like what useState returns), and a boolean indicating if the transition is pending.
 */
export function useValidatedSearchParams<T extends z.ZodType>(
  zodValidator: T,
  options?: {
    customToString?: CustomToStringFn<z.infer<T>[keyof z.infer<T>]>;
    href?: string;
  }
): [z.infer<T>, (value: z.infer<T>) => void, boolean] {
  const [pending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const validatedParams = useMemo(() => {
    const params = Object.fromEntries(searchParams?.entries() ?? []);
    return zodValidator.parse(params);
  }, [searchParams, zodValidator]);

  const [optimisticParams, setOptimisticParams] =
    useOptimistic(validatedParams);

  const setValue = useCallback(
    (newValue: z.infer<T>) => {
      startTransition(() => {
        setOptimisticParams(newValue);
        const url = updateSearchParams<T>(newValue, options?.customToString);
        url.pathname = options?.href ?? url.pathname;
        router.replace(url.href, { scroll: false });
      });
    },
    [options, router, setOptimisticParams, startTransition]
  );

  return [optimisticParams, setValue, pending];
}

function updateSearchParams<T extends z.ZodType>(
  newValue: z.TypeOf<T>,
  customToString?: CustomToStringFn<z.infer<T>>
) {
  const url = new URL(window.location.href);
  for (const [key, val] of Object.entries<T>(newValue)) {
    const value = customToString?.(val) ?? val?.toString();
    if (value !== undefined || value !== null) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  }
  return url;
}
```
