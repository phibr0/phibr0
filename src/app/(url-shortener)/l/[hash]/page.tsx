import { SuspenseErrorBoundary } from '@/components/common/SuspenseErrorBoundary';
import { kv } from '@vercel/kv';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CopyButton } from './CopyButton';
import { Button } from '@radix-ui/themes';
import { CopyIcon, GlobeIcon } from '@radix-ui/react-icons';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

export default async function ShortLinkInfo({
  params,
}: {
  params: { hash: string };
}) {
  const { hash } = params;
  const [url, count] = await Promise.all([
    kv.get<string>(`link-${hash}`),
    kv.get<number>(`link-${hash}-visits`),
  ]);

  if (!url) return notFound();

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
            <h1 className="text-8xl text-neutral-200 font-mono tabular-nums">
              <span className="text-sm text-neutral-500">
                your quicklink has
              </span>
              <span className="mx-1">{count}</span>
              <span className="text-sm text-neutral-500">
                {count === 1 ? 'visit' : 'visits'}
              </span>
            </h1>

            <div className="flex gap-6 items-center">
              <CopyButton text={`https://phib.ro/${hash}`}>
                <CopyIcon />
                Copy Link
              </CopyButton>
              <Button asChild variant="ghost">
                <Link href={`/${hash}`}>
                  <GlobeIcon /> Visit
                </Link>
              </Button>
            </div>

            <div className="absolute flex justify-center bottom-16 left-0 right-0 font-mono tabular-nums text-sm text-neutral-500">
              {hash}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
