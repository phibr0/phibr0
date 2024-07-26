import { readFile } from 'node:fs/promises';
import { PDF } from './pdf';

const FILE = `${process.cwd()}/src/app/cv/cv.pdf`;

export default async function CVPage() {
  const file = await readFile(FILE);
  const base64 = Buffer.from(file).toString('base64');
  const url = `data:application/pdf;base64,${base64}`;
  return (
    <div className="grid place-items-center size-full min-h-screen">
      <PDF url={url} />
    </div>
  );
}
