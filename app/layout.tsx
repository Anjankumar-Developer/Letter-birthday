import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'For My Jaanu ❤️',
  description: 'A personal cinematic birthday surprise.',
  openGraph: {
    title: 'For My Jaanu ❤️',
    description: 'A personal cinematic birthday surprise.',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="bg-[#0a0a0a] text-white font-sans antialiased overflow-x-hidden selection:bg-rose-500/30">
        {children}
      </body>
    </html>
  );
}
