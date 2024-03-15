import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SuspenseErrorBoundary } from '@/components/common/SuspenseErrorBoundary';

const Scene = dynamic(() => import('@/components/three/Scene'));

export default function Page() {
  return (
    <div className="relative h-screen grid place-items-center">
      <div className="inset-0 absolute">
        <SuspenseErrorBoundary>
          <Scene />
        </SuspenseErrorBoundary>
      </div>
      <div className="z-50">
        <div className="flex gap-6 flex-col items-center">
          <h1 className="text-4xl text-neutral-200 font-mono">404</h1>
          <p className="text-neutral-500">This page could not be found.</p>

          <Link
            href="/"
            className="hover:underline no-underline mt-32 text-neutral-500"
          >
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}
