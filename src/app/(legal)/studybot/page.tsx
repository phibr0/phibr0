import dynamic from 'next/dynamic';
import { SuspenseErrorBoundary } from '@/components/common/SuspenseErrorBoundary';

const Scene = dynamic(() => import('@/components/three/Scene'));

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <div className="inset-0 z-10 absolute">
        <SuspenseErrorBoundary>
          <Scene />
        </SuspenseErrorBoundary>
      </div>
      <div className="z-50 relative pt-12 pb-24 max-w-screen-md mx-auto">
        <h1 className="text-4xl text-neutral-200 font-mono mb-4">
          Studybot - Privacy Policy
        </h1>

        <p className="text-neutral-400 text-lg">
          The "Studybot" GPT/Plugin for OpenAI's ChatGPT possesses the
          capability to create Anki Decks from uploaded documents and any other
          provided information. It is important to note that this plugin is
          neither affiliated with nor endorsed by Anki or OpenAI. The generated
          decks are stored on an external server for a duration not exceeding
          twenty-four hours, after which they are automatically deleted. In
          addition to this, logs pertaining to network traffic are collected and
          retained for the purpose of ensuring the optimal functionality and
          performance of the plugin. These logs are subject to an automatic
          deletion process, which occurs one week after their initial creation.
          This systematic approach to data handling and deletion is implemented
          to maintain the integrity and efficiency of the plugin's operation
          while adhering to data privacy and security standards.
        </p>
      </div>
    </div>
  );
}
