import './globals.css';
import { ReactNode } from 'react';
import Providers from './providers';

export const metadata = {
  title: 'Dreamer AI Studios',
  description: 'The intersection of imagination and intelligence',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className="min-h-screen w-full overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
