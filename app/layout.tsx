import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nockly | We Craft Websites',
  description: 'Professional website development agency specializing in custom web solutions',
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
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
} 