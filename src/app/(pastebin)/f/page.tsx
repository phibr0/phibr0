'use client';

import { codeToHtml, bundledLanguagesInfo } from 'shikiji';
import { CreateButton } from '@/components/common/CreateButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createFile } from './createFile';
import { createHash, encryptText, generateKey } from './crypto';

export default function PasteBin() {
  const [text, setText] = useState('');
  const [lang, setLanguage] = useState('tsx');
  const router = useRouter();

  const submitFile = async () => {
    const [hash, key, highlightedCode] = await Promise.all([
      createHash(text),
      generateKey(),
      codeToHtml(text, {
        lang,
        theme: 'min-dark',
      }),
    ]);
    const shortLink = hash.slice(0, 5);
    router.prefetch(`/f/${shortLink}`);
    const [{ encrypted, iv }, rawKey] = await Promise.all([
      encryptText(highlightedCode, key),
      crypto.subtle.exportKey('raw', key),
    ]);

    const publicKey = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
    const cypherBase64 = btoa(
      String.fromCharCode(...new Uint8Array(encrypted))
    );

    await createFile(shortLink, cypherBase64);

    router.push(`/f/${shortLink}#${publicKey}$${iv}`);
  };

  return (
    <div className="relative h-screen grid place-items-center">
      <div className="z-50">
        <div className="flex gap-6 flex-col items-center">
          <h1 className="text-4xl text-neutral-200 font-mono">PasteBin</h1>
          <p className="text-neutral-500">Paste Text to share with others</p>

          <form
            className="flex relative z-10 flex-col items-center gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              await submitFile();
            }}
          >
            <textarea
              name="code"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your code here"
              className="px-2 py-2 rounded-sm min-w-[600px] max-w-full min-h-[800px] border resize font-mono border-neutral-700 shadow-sm bg-neutral-900 outline-none"
            />
            <div className="flex gap-2 items-center">
              <select
                name="language"
                value={lang}
                onChange={(e) => setLanguage(e.target.value)}
                className="p-1.5 h-[34px] rounded-sm outline-none bg-neutral-900 border-neutral-700 border hover:bg-neutral-800 transition-all"
              >
                {bundledLanguagesInfo.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name ?? lang.id}
                  </option>
                ))}
              </select>
              <CreateButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
