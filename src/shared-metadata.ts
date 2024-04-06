import 'server-only';

import merge from 'lodash/merge';
import type { Metadata } from 'next';

const { PORT = 3000, NODE_ENV, VERCEL_URL } = process.env;
const IS_DEV = NODE_ENV === 'development';

const siteData = {
  title: 'Carbon Next.js Template',
  description:
    'Documentation style site template for Next.js and Carbon Design',
  image: '/vercel.svg'
};

const baseMetadata: Metadata = {
  metadataBase: new URL(
    IS_DEV ? `http://localhost:${PORT}` : `https://${VERCEL_URL}`
  ),
  title: siteData.title,
  description: siteData.description,
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    siteName: siteData.title,
    url: '/',
    locale: 'en_US',
    description: siteData.description,
    images: siteData.image
  },
  twitter: {
    card: 'summary',
    title: siteData.title,
    description: siteData.description,
    creator: '@ibm',
    images: siteData.image
  }
};

/**
 * Helper to merge partial metadata with base metadata
 *
 * @param partialMetadata
 * @returns merged metadata object
 */
export function generateMergedMetadata(partialMetadata: Metadata) {
  return merge(baseMetadata, partialMetadata);
}

export default baseMetadata;
