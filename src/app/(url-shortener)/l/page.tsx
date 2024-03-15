import crypto from 'crypto';
import { kv } from '@vercel/kv';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { SuspenseErrorBoundary } from '@/components/common/SuspenseErrorBoundary';
import { CreateButton } from '@/components/common/CreateButton';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

const createHash = async (text: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

const createLink = async (formData: FormData) => {
  'use server';
  const url = formData.get('url')?.toString();
  console.log(formData);
  if (!url) return 'Invalid URL';
  const hash = await createHash(url);
  const shortLink = hash.slice(0, 5);
  await Promise.all([
    kv.set(`link-${shortLink}`, url),
    kv.set(`link-${shortLink}-visits`, 0),
  ]);
  console.log(`Created link ${shortLink} for ${url}`);
  redirect(`/l/${shortLink}`);
};

export default async function CreateShortLink() {
  return (
    <>
      <div className="relative h-screen grid place-items-center">
        <div className="inset-0 absolute">
          <SuspenseErrorBoundary>
            <Scene />
          </SuspenseErrorBoundary>
        </div>
        <div className="z-50">
          <div className="flex gap-6 flex-col items-center">
            <h1 className="text-4xl text-neutral-200 font-mono">Quicklinks</h1>
            <p className="text-neutral-500">Create a short link for any URL</p>

            <form
              action={createLink}
              className="flex relative z-10 flex-col items-center gap-4"
            >
              <input
                name="url"
                type="url"
                placeholder="Enter URL"
                className="px-2 py-2 rounded-sm border border-neutral-700 shadow-sm bg-neutral-900 outline-none w-[320px]"
              />
              <CreateButton />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
