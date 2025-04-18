import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nockly | We Craft Websites',
  description: 'Professional website development agency specializing in custom web solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
} 