import Image from 'next/image';
import Picture from './me.jpg';
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  ImageIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/Tooltip';
import { ClientOnly } from '@/components/common/ClientOnly';
import { MotionA } from '@/lib/framer-motion';

export default async function Page() {
  return (
    <div className="max-w-screen-md text-pretty mx-auto px-6 py-8 lg:py-32 w-full">
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:justify-between">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-xl font-medium text-center lg:text-left">
              Phillip Bronzel
            </h1>
            <p className="text-neutral-400">
              I am Phillip, a student & software engineer from Germany. My main
              focus of expertise is the frontend, primarily using modern React &
              Typescript, but I have also been enjoying Rust in my free time and
              on personal projects.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-medium">Projects</h2>
          </div>

          <div className="space-y-4">
            <h2 className="font-medium">Experience</h2>

            <ul className="pl-6 text-neutral-400 list-disc">
              <li>
                <h3>Frontend Engineer @ Nindo</h3>
                <p>
                  Building an interactive Analytics Platform for Social Media
                  and Marketing Agencies
                </p>
              </li>
              <li>
                <h3>CS @ Technical University Dortmund</h3>
                <p>Currently enrolled in the fourth semester.</p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-medium">Contact & Socials</h2>

            <TooltipProvider>
              <div className="mt-4 flex gap-4">
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="https://github.com/phibr0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-400"
                    >
                      <GitHubLogoIcon
                        width={20}
                        height={20}
                        aria-label="GitHub"
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8}>
                    GitHub
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
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
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8}>
                    LinkedIn
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
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
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8}>
                    Twitter
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href="https://bsky.app/profile/phib.ro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-400"
                    >
                      <ImageIcon width={20} height={20} aria-label="Bluesky" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8}>
                    Bluesky
                  </TooltipContent>
                </Tooltip>

                <ClientOnly>
                  <MotionA
                    href="mailto:contact@phib.ro"
                    className="text-neutral-500 hover:text-neutral-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    contact@phib.ro
                  </MotionA>
                </ClientOnly>
              </div>
            </TooltipProvider>
          </div>
        </div>
        <div className="shrink-0 lg:size-80 rotate-6">
          <Image
            src={Picture}
            priority
            alt="Picture of me"
            placeholder="blur"
            className="rounded-full mx-auto lg:mx-0"
            width={224}
            height={224}
          />
        </div>
      </div>
    </div>
  );
}
