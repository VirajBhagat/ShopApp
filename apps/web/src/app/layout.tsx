import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
import './globals.css';

const heading = Archivo({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-heading' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'CardVault — Pokémon, One Piece & Dragon Ball singles',
  description:
    'Graded and raw trading card singles, sealed boxes and preorders. Condition-checked, sleeved and shipped from India.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2C7A70',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        {/* The storefront is designed mobile-first; on desktop it sits in a
            centred column until the responsive web layout is built out. */}
        <div className="mx-auto min-h-screen w-full max-w-app bg-surface shadow-[0_0_60px_rgba(0,0,0,0.07)]">
          {children}
        </div>
      </body>
    </html>
  );
}
