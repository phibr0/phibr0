import dynamic from 'next/dynamic';
import ImprintImage from '@/../public/imprint.png';
import { SuspenseErrorBoundary } from '@/components/common/SuspenseErrorBoundary';
import Image from 'next/image';
import { ClientOnly } from '@/components/common/ClientOnly';

const Scene = dynamic(() => import('@/components/three/Scene'));

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <div className="inset-0 z-10 absolute">
        <SuspenseErrorBoundary>
          <Scene />
        </SuspenseErrorBoundary>
      </div>
      <div className="z-50 relative pt-12 pb-24 max-w-screen-md mx-auto px-4">
        <h1 className="text-4xl text-neutral-200 font-mono mb-4">Impressum</h1>

        <main className="text-neutral-400 text-lg space-y-2">
          <p>
            Abbildungen und andere Inhalte auf dieser Website unterliegen dem
            Schutz des Urheberrechts.
          </p>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle wird keine Haftung für die
            Inhalte externer Links übernommen. Für den Inhalt der verlinkten
            Seiten sind ausschließlich deren Betreiber verantwortlich. ​
          </p>
          <ClientOnly>
            <Image src={ImprintImage} alt="Imprint" width={140} />
          </ClientOnly>
        </main>
      </div>
    </div>
  );
}
