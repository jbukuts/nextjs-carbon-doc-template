import { LOCALE_LIST } from '#/lib/velite';

/**
 * SSG function to determine slugs to prerender
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  return LOCALE_LIST.map((locale) => ({ locale }));
}

/**
 * Localized 404 Error Page
 */
export default function FourOhFour() {
  return (
    <div>
      <h1>404 Not found</h1>
    </div>
  );
}
