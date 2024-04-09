import * as themes from '@carbon/themes';
import type { Viewport, Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.scss';
import baseMetadata from '#/shared-metadata';

// @ts-ignore
const { g100, white } = themes;

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Viewport object
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#the-viewport-object
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: white.background },
    { media: '(prefers-color-scheme: dark)', color: g100.background }
  ]
};

/**
 * SEO metadata
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return <html>{children}</html>;
}
