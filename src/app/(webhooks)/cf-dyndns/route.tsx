import { kv } from '@vercel/kv';
import { type NextRequest } from 'next/server';
import { Heading, Hr, Text } from '@react-email/components';
import { render } from '@react-email/render';
import { mail } from '@/lib/mail';
import { Mail } from '@/components/common/Mail';
import { env } from '@/lib/env';

// https://phib.ro/cf-dyndns?user=<username>&password=<pass>&host=<domain>&ip=<ipaddr>&ip6=<ip6addr>

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const user = searchParams.get('user');
  const password = searchParams.get('password');
  const host = searchParams.get('host');
  const ip = searchParams.get('ip');

  if (user !== env('DYNDNS_USER') || password !== env('DYNDNS_PASSWORD')) {
    await mail({
      subject: '[WARNING] Unauthorized access to cf-dyndns',
      html: render(
        <Mail>
          <Heading>Unauthorized access to cf-dyndns</Heading>
          <Text>
            Someone tried to access cf-dyndns with user {user} and password{' '}
            {password} at {new Date().toISOString()}.
          </Text>
          <Hr />
          <Text>{JSON.stringify(req, null, 2)}</Text>
        </Mail>
      ),
    });
    return new Response('Unauthorized', { status: 401 });
  }

  const last = await kv.get('local.phib.ro');
  if (last === ip?.trim()) {
    console.log(`IP is still ${last}`);
    return new Response('IP did not change', { status: 200 });
  }
  console.log(`IP changed from ${last} to ${ip}`);

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env('CF_TOKEN')}`,
    },
    body: JSON.stringify({
      content: ip,
    }),
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${env(
      'CF_ZONE_ID'
    )}/dns_records/${env('CF_DNS_ID')}`,
    options
  );

  const result = await response.json();

  if (result.success === true) {
    await kv.set('local.phib.ro', ip);
  } else {
    await mail({
      subject: 'Failed DynDNS update',
      html: render(
        <Mail>
          <Heading>DynDNS update failed</Heading>
          <Text>
            cf-dyndns failed to update local.phib.ro to {ip} at{' '}
            {new Date().toISOString()}.
          </Text>
          <Hr />
          <Text>{JSON.stringify(result, null, 2)}</Text>
          <Hr />
          <Text>{JSON.stringify(req, null, 2)}</Text>
        </Mail>
      ),
    });
  }

  return new Response(JSON.stringify(result), { status: 200 });
};

export const dynamic = 'force-dynamic';
