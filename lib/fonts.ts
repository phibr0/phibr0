import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Syne,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontSerif = Syne({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});
