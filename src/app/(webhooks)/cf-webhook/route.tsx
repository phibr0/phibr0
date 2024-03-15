import { kv } from '@vercel/kv';
import { render } from '@react-email/render';
import { Button, Hr, Text, Heading } from '@react-email/components';
import { mail } from '@/lib/mail';
import { Mail } from '@/components/common/Mail';
import { env } from '@/lib/env';

export const POST = async (req: Request) => {
  if (req.headers.get('cf-webhook-auth') !== env('CF_WEBHOOK_SECRET')) {
    return Response.json(
      { status: 'error', message: 'unauthorized' },
      { status: 401 }
    );
  }
  const update = await req.json();

  if (update.data.alert_name === 'tunnel_health_event') {
    await Promise.all([
      kv.set('tunnel', update.data.new_status),
      mail({
        subject: `Tunnel health event: ${update.data.new_status}`,
        html: render(
          <Mail>
            <Heading>Tunnel health event</Heading>
            <Text>
              The tunnel {update.data.tunnel_name} is now{' '}
              {update.data.new_status}.
            </Text>
            <Text>Time: {new Date(update.data.timestamp).toDateString()}</Text>
            <Hr />
            <Button
              href={update.data.dashboard_link}
              className="bg-black text-white px-4 py-2"
            >
              View Cloudflare dashboard
            </Button>
          </Mail>
        ),
      }),
    ]);
  }

  return Response.json({ status: 'ok' });
};
