import { kv } from '@vercel/kv';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { hash: string } }) {
  const resolved = await kv.get<string>(`link-${params.hash}`);
  if (resolved) {
    kv.incr(`link-${params.hash}-visits`);
    redirect(resolved);
  }
  redirect('/');
}
