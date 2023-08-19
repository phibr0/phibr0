import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';

import { SpotifyActivity, WakatimeActivity } from '@/components/Activity';
import { Projects } from '@/components/Projects';
import { CurrentWeather } from '@/components/Weather';

const Scene = dynamic(() => import('@/components/Scene'));

export default function IndexPage() {
  return (
    <>
      <div className="relative">
        <div className="inset-0 absolute">
          <Suspense>
            <Scene />
          </Suspense>
        </div>
        <header className="grid z-10 relative pointer-events-none h-[100dvh] grid-cols-2 grid-rows-3 transition-all">
          <div className="space-y-4 p-6 lg:p-20 row-[1] col-span-2 lg:row-span-2 lg:col-[1]">
            <Suspense>
              <WakatimeActivity />
              <SpotifyActivity />
            </Suspense>
          </div>
          <div className="row-[2] col-span-2 lg:row-span-2 lg:col-[2]"></div>
          <h1 className="self-end p-6 font-serif text-3xl font-bold lg:p-20 lg:text-5xl">
            phib.ro
          </h1>
          <nav className="self-end animate-in fade-in-0 delay-1000">
            <ul className="p-6 text-right text-sm space-y-1 lg:p-20 pointer-events-auto">
              <a href="#info" className='space-y-1'>
                <li>about</li>
                <li>projects</li>
                <li>contact</li>
              </a>
              <li>
                <a href="/b">blog</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <section className="h-[100dvh] transition-all">
        <div className="grid h-full grid-cols-2 grid-rows-2">
          <div className="col-span-2 space-y-4 p-6 lg:p-20">
            <h2 className="font-serif text-2xl font-bold lg:text-4xl">about</h2>
            {/* @ts-expect-error */}
            <p className="text-sm" style={{ textWrap: 'pretty' }}>
              I&apos;m a software developer from Germany. I&apos;m currently
              studying computer science at the{' '}
              <a
                className="hover:underline"
                href="https://www.tu-dortmund.de/en/"
              >
                Technical University in Dortmund
              </a>{' '}
              and working on the frontend of{' '}
              <a className="hover:underline" href="https://nindo.de">
                Nindo
              </a>
              .
            </p>
            <Suspense>
              {/* @ts-expect-error */}
              <p className="text-sm" style={{ textWrap: 'pretty' }}>
                <CurrentWeather />
              </p>
            </Suspense>
          </div>
          <div className="col-span-2 space-y-4">
            <h2 className="px-6 font-serif mb-[-12px] text-2xl font-bold lg:px-20 lg:text-4xl">
              projects
            </h2>
            <Projects />
          </div>
          <div className="col-span-2 space-y-4 p-6 lg:p-20">
            <h2 className="font-serif text-2xl font-bold lg:text-4xl">
              contact
            </h2>
            {/* @ts-expect-error */}
            <p className="text-sm" id="info" style={{ textWrap: 'pretty' }}>
              You can contact me via email at{' '}
              <a href="mailto:hello@phib.ro">hello@phib.ro</a> or via my
              socials:
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://github.com/phibr0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-400"
              >
                <GitHubLogoIcon width={20} height={20} />
              </a>
              <a
                href="https://linkedin.com/in/phibr0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-400"
              >
                <LinkedInLogoIcon width={20} height={20} />
              </a>
              <a
                href="https://twitter.com/phibr0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-400"
              >
                <TwitterLogoIcon width={20} height={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const revalidate = 1;
