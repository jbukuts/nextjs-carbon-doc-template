import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export type Locale = 'en' | 'es';

export const DEF_LOCALE: Locale = 'en';

// Can be imported from a shared config
export const locales: Locale[] = ['en', 'es'];

export const localeMap: Record<Locale, string> = {
  en: 'English',
  es: 'Español'
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
