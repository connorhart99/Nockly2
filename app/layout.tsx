import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Menu from './components/Menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nockly',
  description: 'We Craft Sites To Convert',
};

// Preload critical fonts
const preloadFonts = () => {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/inter-var-latin.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {preloadFonts()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.className} relative min-h-screen`} suppressHydrationWarning>
        {/* Fixed background image */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/assets/background.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark-brown-70"></div>
        </div>
        
        {/* Menu */}
        <Menu />
        
        {/* Main content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
} 