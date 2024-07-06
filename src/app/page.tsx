import { SuspenseErrorBoundary } from '@/components/common/SuspenseErrorBoundary';
import { Projects } from '@/components/widgets/Projects';
import { Spotify } from '@/components/widgets/Spotify';
import { Status } from '@/components/widgets/Status';
import { Weather } from '@/components/widgets/Weather';
import { MotionDiv } from '@/lib/framer-motion';
import {
  GitHubLogoIcon,
  ImageIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { Tooltip } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Scene = dynamic(() => import('@/components/three/Scene'));

export default function IndexPage() {
  return (
    <>
      <div className="relative">
        <div className="inset-0 absolute">
          <SuspenseErrorBoundary>
            <Scene />
          </SuspenseErrorBoundary>
        </div>
        <header className="grid z-50 relative h-[100dvh] grid-cols-2 grid-rows-3 transition-all">
          <div className="p-6 lg:p-20 row-[1] col-span-2 lg:row-span-2 lg:col-[1]">
            <div className="group space-y-4">
              <SuspenseErrorBoundary>
                <Status />
                <Spotify />
              </SuspenseErrorBoundary>
            </div>
          </div>
          <div className="row-[2] col-span-2 lg:row-span-2 lg:col-[2]" />
          <h1 className="self-end p-6 font-serif text-3xl font-bold lg:p-20 lg:text-5xl">
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              phib.ro
            </MotionDiv>
          </h1>

          <MotionDiv
            className="self-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <nav>
              <ul className="p-6 text-right text-sm space-y-2 lg:space-y-1 lg:p-20 pointer-events-auto">
                <li>
                  <Link href="#info" className="pl-4 py-2 lg:p-0">
                    about
                  </Link>
                </li>
                <li>
                  <Link href="#info" className="pl-4 py-2 lg:p-0">
                    projects
                  </Link>
                </li>
                <li>
                  <Link href="#info" className="pl-4 py-2 lg:p-0">
                    contact
                  </Link>
                </li>
                <li>
                  <Link href="/posts" className="pl-4 py-2 lg:p-0">
                    posts
                  </Link>
                </li>
              </ul>
            </nav>
          </MotionDiv>
        </header>
      </div>
      <section className="h-[100dvh] transition-all">
        <div className="grid h-full grid-cols-2 grid-rows-2">
          <div className="col-span-2 space-y-4 p-6 lg:p-20">
            <h2 className="font-serif text-2xl font-bold lg:text-4xl">about</h2>
            <p className="text-sm" style={{ textWrap: 'pretty' }}>
              I&apos;m a software developer from Germany. I&apos;m currently
              studying computer science at the{' '}
              <Link
                className="hover:underline"
                href="https://www.tu-dortmund.de/en/"
              >
                Technical University in Dortmund
              </Link>{' '}
              and working on the frontend of{' '}
              <Link className="hover:underline" href="https://nindo.de">
                Nindo
              </Link>
              .
            </p>
            <SuspenseErrorBoundary>
              <p className="text-sm" style={{ textWrap: 'pretty' }}>
                <Weather />
              </p>
            </SuspenseErrorBoundary>
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
            <p className="text-sm" id="info" style={{ textWrap: 'pretty' }}>
              You can contact me via email at{' '}
              <a href="mailto:hello@phib.ro">hello@phib.ro</a> or via my
              socials:
            </p>
            <div className="mt-4 flex gap-4">
              <Tooltip content="GitHub">
                <Link
                  href="https://github.com/phibr0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-400"
                >
                  <GitHubLogoIcon width={20} height={20} aria-label="GitHub" />
                </Link>
              </Tooltip>
              <Tooltip content="LinkedIn">
                <Link
                  href="https://linkedin.com/in/phibr0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-400"
                >
                  <LinkedInLogoIcon
                    width={20}
                    height={20}
                    aria-label="LinkedIn"
                  />
                </Link>
              </Tooltip>
              <Tooltip content="Twitter">
                <Link
                  href="https://twitter.com/phibr0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-400"
                >
                  <TwitterLogoIcon
                    width={20}
                    height={20}
                    aria-label="Twitter"
                  />
                </Link>
              </Tooltip>
              <Tooltip content="BlueSky">
                <Link
                  href="https://bsky.app/profile/phib.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-400"
                >
                  <ImageIcon width={20} height={20} aria-label="Bluesky" />
                </Link>
              </Tooltip>
            </div>
          </div>
        </div>
        <span
          aria-hidden
          className="absolute right-0 bottom-12 text-xs lg:text-sm flex gap-3 lg:gap-2 text-neutral-700"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'sideways',
          }}
        >
          <span>{`${process.env.VERCEL_GIT_COMMIT_SHA?.toLowerCase().slice(
            0,
            11
          )}`}</span>
          <Link href="/imprint">Imprint</Link>
        </span>
      </section>
    </>
  );
}

export const revalidate = 1;
