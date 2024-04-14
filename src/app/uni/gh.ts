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
  };
});
