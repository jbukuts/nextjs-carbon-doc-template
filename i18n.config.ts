import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export type Locale = 'en' | 'es';
export const DEF_LOCALE: Locale = 'en';
export const SUPPORTED_LOCALES: Locale[] = ['en', 'es'];

export const localeMap: Record<Locale, string> = {
  en: 'English',
  es: 'Español'
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!SUPPORTED_LOCALES.includes(locale as any)) notFound();

  return {
    messages: (await import(`./translations/${locale}.json`)).default
  };
});
