import { kv } from '@vercel/kv';
import { Renderer } from './Renderer';
import { notFound } from 'next/navigation';

export default async function File({ params }: { params: { hash: string } }) {
  const { hash } = params;
  const cypher = await kv.get<string>(hash);

  if (!cypher) {
    notFound();
  }

  return (
    <div className="max-w-screen-lg mx-auto lg:py-20 p-4 overflow-auto">
      <Renderer cypher={cypher} />
    </div>
  );
}
