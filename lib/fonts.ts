import { Syne } from 'next/font/google';
import { GeistMono as FontMono, GeistSans as FontSans } from 'geist/font';

export const fontSans = FontSans;

export const fontSerif = Syne({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const fontMono = FontMono;
