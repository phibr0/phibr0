import { cache } from 'react';
import { Octokit } from 'octokit';
import { env } from '@/lib/env';
import { unstable_cache } from 'next/cache';

const AUTO_REVALIDATE = {
  revalidate: false as const,
  tags: ['gh'],
};

export const gh = cache(() => {
  const octokit = new Octokit({
    auth: env('GITHUB_PAT'),
  });

  return {
    collaborators: unstable_cache(
      async () => {
        return await octokit.request(
          'GET /repos/{owner}/{repo}/collaborators',
          {
            owner: 'phibr0',
            repo: 'uni',
          }
        );
      },
      ['collaborators'],
      AUTO_REVALIDATE
    ),
    files: unstable_cache(
      async () => {
        const { data } = await octokit.request(
          'GET /repos/{owner}/{repo}/git/trees/main?recursive=5',
          {
            owner: 'phibr0',
            repo: 'uni',
            path: '',
          }
        );
        const tree = data.tree;
        const root: File = { path: '', type: 'tree', children: [] };
        const map = new Map<string, File>();
        map.set('', root);
        for (const { path, type, url } of tree) {
          const parts = path.split('/');
          parts.pop();
          const parent = parts.join('/');
          const file = { path, type, url };
          map.set(path, file);
          const parentFile = map.get(parent);
          if (parentFile) {
            parentFile.children = parentFile.children || [];
            parentFile.children.push(file);
          }
        }
        return root;
      },
      ['files'],
      AUTO_REVALIDATE
    ),
    file: unstable_cache(
      async (path: string) => {
        const { data } = await octokit.request(
          'GET /repos/{owner}/{repo}/contents/{path}',
          {
            owner: 'phibr0',
            repo: 'uni',
            path,
          }
        );
        return data;
      },
      ['file', 'files'],
      AUTO_REVALIDATE
    ),
  };
});

export type File = {
  path: string;
  type: 'tree' | 'blob';
  url?: string;
  children?: File[];
};
