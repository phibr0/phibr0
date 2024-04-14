import { join } from 'path';
import rehypeStringify from 'rehype-stringify';
import { readFile, readdir } from 'fs/promises';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import rehypeShikiji from '@shikijs/rehype';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import * as z from 'zod';
import Link from 'next/link';

export const dynamicParams = false;

const PostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.coerce.date(),
});

const DIR_PATH = './posts';

export async function generateStaticParams() {
  const files = await readdir(DIR_PATH);
  const posts = await Promise.all(
    files.map((file) =>
      readFile(join(DIR_PATH, file)).then((buffer) => {
        const parsed = matter(buffer.toString());
        parsed.data = PostSchema.parse(parsed.data);
        return parsed;
      })
    )
  );

  return posts.map((post) => ({
    slug: post.data.slug,
  }));
}

export default async function BlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const files = await readdir(DIR_PATH);
  const posts = await Promise.all(
    files.map((file) =>
      readFile(join(DIR_PATH, file)).then((buffer) => {
        const parsed = matter(buffer.toString());
        parsed.data = PostSchema.parse(parsed.data);
        return parsed;
      })
    )
  );
  const post = posts.find((post) => post.data.slug === slug);
  if (!post) {
    notFound();
  }

  const content = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShikiji, { theme: 'min-dark' })
    .use(rehypeStringify)
    .process(post.content)
    .then((v) => v.toString());

  return (
    <main className="max-w-screen-lg mx-auto">
      <Link
        href="/posts"
        className="text-neutral-300 w-fit hover:text-neutral-400 transition mx-4 mb-4 mt-12 block"
      >
        ← Back
      </Link>
      <h1 className="mb-8 text-4xl font-serif font-medium mx-4">
        {post.data.title}
      </h1>
      <article
        className="prose prose-invert [&_img]:rounded-md [&_img]:px-4 mx-4 pb-48 lg:pb-96 prose-h1:font-serif prose-h2:font-serif prose-h3:font-serif prose-h4:font-serif prose-h5:font-serif prose-h6:font-serif prose-h1:font-medium prose-h2:font-medium prose-h3:font-medium prose-h4:font-medium prose-h5:font-medium prose-h6:font-medium"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted content
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  );
}
