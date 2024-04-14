import { env } from '@/lib/env';
import crypto from 'crypto';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const expectedSignature =
    'sha1=' +
    crypto
      .createHmac('sha1', env('GITHUB_WEBHOOK_SECRET'))
      .update(await req.text())
      .digest('hex');

  if (headers().get('x-hub-signature') !== expectedSignature) {
    return new Response('Invalid signature', { status: 401 });
  }

  revalidateTag('gh');

  return new Response('OK');
};
