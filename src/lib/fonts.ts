import { Syne } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const fontSerif = Syne({
	subsets: ["latin"],
	variable: "--font-serif",
});
export const fontSans = GeistSans;
export const fontMono = GeistMono;
