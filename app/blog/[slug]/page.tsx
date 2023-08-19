'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import type { MDXComponents } from 'mdx/types';
import { useMDXComponent } from 'next-contentlayer/hooks';

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
};

export default function Page({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose mt-12 mb-48 prose-invert mx-auto max-w-screen-md">
      <h1
        className="font-serif text-3xl font-bold lg:text-5xl"
        // @ts-expect-error
        style={{ textWrap: 'pretty' }}
      >
        {post.title}
      </h1>
      <div className="lg:mt-[-32px] mb-12 mt-[-16px]">
        <time dateTime={post.date} className="block text-sm text-neutral-500">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <Link
          className="hover:underline no-underline text-sm text-neutral-100 mt-2"
          href="/b"
        >
          Go back
        </Link>
      </div>
      <MDXContent components={mdxComponents} />
    </article>
  );
}
