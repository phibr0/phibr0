import Link from 'next/link';
import { allPosts, Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

function PostCard(post: Post) {
  return (
    <Link
      href={post.url}
      className="block p-4 rounded-md hover:bg-neutral-900/40"
    >
      <h3 className="text-lg font-medium">{post.title}</h3>
      <time dateTime={post.date} className="block text-sm text-neutral-500">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
    </Link>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <div className="max-w-screen-md w-full mx-auto max-h-screen overflow-y-auto">
      <h1 className="mt-8 mx-4 font-serif text-3xl font-bold lg:text-5xl">
        Blog
      </h1>
      <Link
        className="hover:underline mb-8 block mx-4 no-underline text-sm text-neutral-100 mt-2"
        href="/"
      >
        Go back
      </Link>

      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
}
