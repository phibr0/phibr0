'use client';

import '@ungap/with-resolvers';
import { useState } from 'react';
import Turnstile, { useTurnstile } from 'react-turnstile';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc =
  typeof window === 'undefined'
    ? ''
    : `${window.location.origin}/pdf.worker.min.mjs`;

export default function CVPage() {
  const [pdf, setPdf] = useState<ArrayBuffer | null>(null);
  const turnstile = useTurnstile();

  return (
    <div className="grid place-items-center size-full min-h-screen">
      {!pdf ? (
        <Turnstile
          // biome-ignore lint/style/noNonNullAssertion: needs to be inlined
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_ID!}
          onVerify={async (token) => {
            const response = await fetch('/cv/verify', {
              method: 'POST',
              body: JSON.stringify({ token }),
            });
            if (!response.ok) turnstile.reset();
            const buffer = await response.arrayBuffer();
            setPdf(buffer);
          }}
        />
      ) : (
        <Document
          file={pdf}
          className="overflow-clip rounded-md m-4 animate-in"
          loading={<div />}
        >
          <Page pageNumber={1} scale={1.4} />
        </Document>
      )}
    </div>
  );
}
