import type { Metadata } from 'next';

import Header from '../components/Header';

import './globals.css';

export const metadata: Metadata = {
  title: 'CryptoRank Test Task',
  description: 'An application for a test assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
