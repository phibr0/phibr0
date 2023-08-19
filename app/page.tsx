import { Suspense } from "react"
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"

import { SpotifyActivity, WakatimeActivity } from "@/components/Activity"
import { Projects } from "@/components/Projects"

export default function IndexPage() {
  return (
    <>
      <header className="grid h-[100dvh] grid-cols-2 grid-rows-3 transition-all">
        <div className="space-y-4 p-6 lg:p-20 row-[1] col-span-2 lg:row-span-2 lg:col-[1]">
          <Suspense>
            <WakatimeActivity />
            <SpotifyActivity />
          </Suspense>
        </div>
        <div className='row-[2] col-span-2 lg:row-span-2 lg:col-[2]'>

        </div>
        <h1 className="self-end p-6 font-serif text-3xl font-bold lg:p-20 lg:text-5xl">
          phib.ro
        </h1>
        <nav className="self-end animate-in fade-in-0 delay-1000">
          <a href="#info">
            <ul className="space-y-1 p-6 text-right text-sm lg:p-20">
              <li>about</li>
              <li>projects</li>
              <li>contact</li>
            </ul>
          </a>
        </nav>
      </header>
      <section className="h-[100dvh] transition-all">
        <div className="grid h-full grid-cols-2 grid-rows-2">
          <div className="col-span-2 space-y-4 p-6 lg:p-20">
            <h2 className="font-serif text-2xl font-bold lg:text-4xl">about</h2>
            {/* @ts-expect-error */}
            <p className="text-sm" style={{ "text-wrap": "balance" }}>
              I&apos;m a software
              developer from Germany. I&apos;m currently studying computer
              science at the{" "}
              <a
                className="hover:underline"
                href="https://www.tu-dortmund.de/en/"
              >
                Technical University in Dortmund
              </a>{" "}
              and working on the frontend of{" "}
              <a className="hover:underline" href="https://nindo.de">
                Nindo
              </a>
              .
            </p>
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
            <p className="text-sm" id="info">
              You can contact me via email at{" "}
              <span className="select-none before:content-['bronzel.phillip'] after:content-['gmail.com']">
                @
              </span>{" "}
              or via:
              <div className="mt-4 flex gap-4">
                <a
                  href="https://github.com/phibr0"
                  className="text-neutral-500 hover:text-neutral-400"
                >
                  <GitHubLogoIcon width={20} height={20} />
                </a>
                <a
                  href="https://linkedin.com/in/phibr0"
                  className="text-neutral-500 hover:text-neutral-400"
                >
                  <LinkedInLogoIcon width={20} height={20} />
                </a>
              </div>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export const revalidate = 1
