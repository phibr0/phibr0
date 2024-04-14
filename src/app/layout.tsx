import './globals.css';
import '@radix-ui/themes/styles.css';
import { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import { fontMono, fontSans, fontSerif } from '@/lib/fonts';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'you@phib.ro $_',
  icons: {
    icon: '/favicon.png',
  },
  metadataBase: new URL('https://phib.ro/'),
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en">
        <head />
        <body
          className={cn(
            'min-h-screen scroll-smooth bg-background font-sans antialiased bg-[#0F0F0F] text-neutral-300',
            fontSans.variable,
            fontSerif.variable,
            fontMono.variable
          )}
        >
          <Theme
            accentColor="jade"
            appearance="dark"
            radius="small"
            panelBackground="translucent"
          >
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
          </Theme>
        </body>
      </html>
    </>
  );
}
