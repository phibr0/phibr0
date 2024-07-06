import { readFile, readdir } from 'node:fs/promises';
import Link from 'next/link';
import matter from 'gray-matter';
import * as z from 'zod';
import { join } from 'node:path';

const PostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.coerce.date(),
});

const POST_PATH = './posts';
const SNIPPET_PATH = './snippets';

export default async function BlogPage() {
  const [postFiles, snippetFiles] = await Promise.all([
    readdir(POST_PATH),
    readdir(SNIPPET_PATH),
  ]);
  const [posts, snippets] = await Promise.all([
    Promise.all(
      postFiles.map((file) =>
        readFile(join(POST_PATH, file)).then((buffer) => {
          const parsed = matter(buffer.toString());
          parsed.data = PostSchema.parse(parsed.data);
          return parsed;
        })
      )
    ),
    Promise.all(
      snippetFiles.map((file) =>
        readFile(join(SNIPPET_PATH, file)).then((buffer) => {
          const parsed = matter(buffer.toString());
          parsed.data = PostSchema.parse(parsed.data);
          return parsed;
        })
      )
    ),
  ]);

  return (
    <main className="max-w-screen-lg mx-auto">
      <Link
        href="/"
        className="text-neutral-300 w-fit hover:text-neutral-400 transition mx-4 mb-4 mt-12 block"
      >
        ← Back
      </Link>
      <h1 className="mb-4 text-4xl font-serif font-medium mx-4">Blog</h1>
      <ul className="space-y-1 pt-4">
        {posts.map((post) => (
          <li key={post.data.slug}>
            <Link
              href={`/blog/${post.data.slug}`}
              className="rounded-md px-4 py-3 transparent hover:bg-neutral-900 transition flex flex-col gap-1"
            >
              <span className="text-xs text-neutral-500">
                {post.data.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>{post.data.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <h1 className="mb-4 mt-32 text-4xl font-serif font-medium mx-4">
        Snippets
      </h1>
      <ul className="space-y-1 pt-4">
        {snippets.map((snippet) => (
          <li key={snippet.data.slug}>
            <Link
              href={`/snippets/${snippet.data.slug}`}
              className="rounded-md px-4 py-3 transparent hover:bg-neutral-900 transition flex flex-col gap-1"
            >
              <span className="text-xs text-neutral-500">
                {snippet.data.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>{snippet.data.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
