import { notFound } from 'next/navigation';
import { gh } from '../gh';
import { codeToHtml } from 'shiki';
import { ScrollArea } from '@radix-ui/themes';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypeShiki from '@shikijs/rehype';

export default async function Page({ params }: { params: { path: string[] } }) {
  const file = await gh()
    .file(decodeURIComponent(params.path.join('/')))
    .catch(notFound);

  // @ts-expect-error
  const type = file.name.split('.').pop();

  return (
    <ScrollArea className="!h-[calc(100vh-64px)]">
      {type === 'pdf' ? (
        /* @ts-expect-error */
        <PDFRenderer url={`data:application/pdf;base64,${file.content!}`} />
      ) : type === 'md' ? (
        /* @ts-expect-error */
        <MarkdownRenderer content={atob(file.content!)} />
      ) : [
          'png',
          'jpg',
          'jpeg',
          'gif',
          'webp',
          'bmp',
          'ico',
          'tiff',
          'tif',
          'avif',
        ].includes(type) ? (
        /* @ts-expect-error */
        <img src={`data:image/${type};base64,${file.content!}`} />
      ) : type === 'svg' ? (
        /* @ts-expect-error */
        <img src={`data:image/svg+xml;base64,${file.content!}`} />
      ) : (
        <pre className="py-4">
          {/* @ts-expect-error */}
          <CodeRenderer code={atob(file.content!)} lang={type} />
        </pre>
      )}
    </ScrollArea>
  );
}

const CodeRenderer = async ({ code, lang }: { code: string; lang: string }) => {
  const html = await codeToHtml(code, { lang, theme: 'min-dark' });
  return <code dangerouslySetInnerHTML={{ __html: html }} />;
};

const PDFRenderer = ({ url }: { url: string }) => {
  return <iframe src={url} className="w-full h-full" />;
};

const MarkdownRenderer = async ({ content }: { content: string }) => {
  const rendered = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, { theme: 'min-dark' })
    .use(rehypeStringify)
    .process(content)
    .then((v) => v.toString());
  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
};
