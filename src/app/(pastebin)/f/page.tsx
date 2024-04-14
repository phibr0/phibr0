'use client';

import { codeToHtml, bundledLanguagesInfo } from 'shikiji';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { createFile } from './createFile';
import { createHash, encryptText, generateKey } from './crypto';
import { Button, Select, Spinner, TextArea } from '@radix-ui/themes';
import { FilePlusIcon } from '@radix-ui/react-icons';

export default function PasteBin() {
  const [text, setText] = useState('');
  const [lang, setLanguage] = useState('tsx');
  const router = useRouter();
  const [pending, startTransition] = useTransition();

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
              startTransition(async () => await submitFile());
            }}
          >
            <TextArea
              name="code"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your code here"
              className="font-mono min-w-[600px] max-w-full min-h-[800px] resize"
            />
            <div className="flex gap-2 items-center">
              <Select.Root
                defaultValue="typescript"
                onValueChange={(value) => setLanguage(value)}
              >
                <Select.Trigger />
                <Select.Content>
                  {bundledLanguagesInfo.map((lang) => (
                    <Select.Item key={lang.id} value={lang.id}>
                      {lang.name ?? lang.id}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <Button disabled={pending}>
                <Spinner loading={pending}>
                  <FilePlusIcon />
                </Spinner>
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
