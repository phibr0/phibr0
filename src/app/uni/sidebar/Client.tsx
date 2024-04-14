'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@/components/common/Accordion';
import { useValidatedSearchParams } from '@/lib/useValidatedSearchParams';
import { FileIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Card, ScrollArea, Spinner, TextField } from '@radix-ui/themes';
import Link from 'next/link';
import { memo, useDeferredValue, useMemo } from 'react';
import { z } from 'zod';
import { type File } from '../gh';

const Schema = z.object({
  query: z.string().default(''),
});

export const ClientSidebar = ({ file }: { file: File }) => {
  const [{ query } = { query: '' }, setParams, pending] =
    useValidatedSearchParams(Schema, {
      shallow: true,
    });

  const defQuery = useDeferredValue(query);
  const tree = useMemo(
    () =>
      defQuery
        ? ({
            path: 'query',
            type: 'tree',
            children: search(file, defQuery),
          } as File)
        : file,
    [defQuery, file]
  );

  return (
    <div className="p-4 h-full">
      <Card>
        <ScrollArea className="max-h-[calc(100vh-134px)] relative">
          <TextField.Root
            placeholder="Search"
            variant="soft"
            className="w-full sticky top-0 backdrop-blur-lg"
            value={query}
            onInput={(e) => setParams({ query: e.currentTarget.value })}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
          {tree.children?.length === 0 ? (
            <p className="italic mt-3 text-neutral-400 text-center">
              Keine Dateien gefunden
            </p>
          ) : (
            <AccordionRoot type="multiple" defaultValue={['root']}>
              <AccordionItem value="root">
                <AccordionTrigger className="lg:hidden">
                  {query ? 'Suchergebnisse' : 'Dateien'}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                  <NestedList file={tree} key={defQuery} />
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
};

const NestedList = memo(
  ({ file, className }: { file: File; className?: string }) =>
    file.children
      ?.sort((a, b) => {
        if (a.type === b.type) {
          return a.path.localeCompare(b.path);
        }
        return a.type === 'tree' ? -1 : 1;
      })
      .map((child) =>
        child.type === 'tree' ? (
          <AccordionItem
            key={child.path}
            value={child.path}
            className={className}
          >
            <AccordionTrigger>{child.path.split('/').pop()}</AccordionTrigger>
            <AccordionContent className="pl-3">
              <NestedList file={child} />
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Item key={child.path} file={child} />
        )
      )
);

const search = (file: File, query: string) => {
  const results: File[] = [];
  for (const child of file.children || []) {
    if (child.type === 'tree') {
      results.push(...search(child, query));
    } else if (child.type === 'blob' && child.path.includes(query)) {
      results.push(child);
    }
  }
  return results;
};
const Item = ({ file }: { file: File }) => (
  <Link
    href={`/uni/${file.path}`}
    className="px-2 py-1 rounded-md transition hover:bg-neutral-800 block flex gap-1 items-center"
  >
    <FileIcon className="text-neutral-500" />
    {file.path.split('/').pop()}
  </Link>
);
