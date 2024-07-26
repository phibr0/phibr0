"use client"

import '@ungap/with-resolvers';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { useRef, useState, useLayoutEffect } from 'react';
import { Button, Card } from '@radix-ui/themes';
import { DownloadIcon } from '@radix-ui/react-icons';

pdfjs.GlobalWorkerOptions.workerSrc =
  typeof window === 'undefined'
    ? ''
    : `${window.location.origin}/pdf.worker.min.mjs`;

export const PDF = ({ url }: { url: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ height, width }, setSize] = useState<{
    height?: number;
    width?: number;
  }>({ height: undefined, width: undefined });

  useLayoutEffect(() => {
    const measure = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref.current, setSize]);

  return (
    <div className="flex flex-col p-4 md:flex-row justify-center items-end w-full gap-4">
      <div ref={ref} className='max-w-screen-md grow w-full'>
        <Document
          file={url}
          className="overflow-clip rounded-md"
          loading={<EmptyPaper width={width} />}
        >
          <Page pageNumber={1} width={width} />
        </Document>
      </div>
      <div className="flex lg:flex-col gap-4 items-start">
        <Button size="3" variant='classic' className='w-fit' onClick={() => {
          const a = document.createElement('a');
          a.href = url;
          a.download = 'cv_phillip_bronzel.pdf';
          a.click();
        }}>
          <DownloadIcon className='size-6' />
        </Button>
      </div>
    </div>
  )
}

const EmptyPaper = ({ width }: { width?: number }) => (
  <div className="bg-white h-full w-full rounded-md" style={{ width, aspectRatio: 1 / 1.41 }} />
)
