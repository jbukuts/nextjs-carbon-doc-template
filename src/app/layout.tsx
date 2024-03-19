import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.scss';

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * SEO metadata
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: 'IBM VEST Workshops',
  description: 'Experiential Selling Workshops for IBM Partners'
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return children;
}
