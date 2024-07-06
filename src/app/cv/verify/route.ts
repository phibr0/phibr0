import { env } from '@/lib/env';
import { createReadStream, type ReadStream } from 'node:fs';
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { stat } from 'node:fs/promises';

const TURNSTILE_SECRET = env('TURNSTILE_SECRET');
const URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const FILE = `${process.cwd()}/src/app/cv/verify/cv.pdf`;

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') return await streamCV();

  const body = await request.json();
  const { token } = z.object({ token: z.string().min(0) }).parse(body);
  const ip = request.ip ?? request.headers.get('X-Forwarded-For');

  if (!ip) return new Response(null, { status: 500 });

  const formData = new FormData();
  formData.append('secret', TURNSTILE_SECRET);
  formData.append('response', token);
  formData.append('remoteip', ip);

  const result = await fetch(URL, {
    method: 'POST',
    body: formData,
  });
  const outcome = await result.json();
  if (!outcome.success) return new Response(null, { status: 400 });

  return await streamCV();
}

async function streamCV() {
  const stats = await stat(FILE);
  const stream = streamFile(FILE);
  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': 'application/pdf',
      'content-length': stats.size.toString(),
    },
  });
}

function iteratorToStream(iterator: AsyncGenerator<Uint8Array>) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

async function* nodeStreamToIterator(stream: ReadStream) {
  for await (const chunk of stream) {
    yield new Uint8Array(chunk);
  }
}

function streamFile(path: string): ReadableStream {
  const nodeStream = createReadStream(path);
  const data: ReadableStream = iteratorToStream(
    nodeStreamToIterator(nodeStream)
  );
  return data;
}
