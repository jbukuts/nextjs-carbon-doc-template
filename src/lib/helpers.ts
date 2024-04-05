import { DEF_LOCALE } from '#/i18n';

const ABSOLUTE_URL_REGEX = new RegExp('^(?:[a-z+]+:)?//', 'i');
const URI_URL_REGEX = new RegExp('^([a-z]+:)(?!//)', 'i');

/**
 * determines if input URL is relative
 *
 * @param url
 * @returns {boolean} is URL relative
 */
const isURLAbsolute = (url: string): boolean =>
  ABSOLUTE_URL_REGEX.test(url) || URI_URL_REGEX.test(url);

/**
 * determines if input URL is absolute
 *
 * @param url
 * @returns {boolean} is URL absolute
 */
const isURLRelative = (url: string): boolean => !isURLAbsolute(url);

/**
 * determines locale from input file path
 *
 * @param {string} name
 * @param {string=} defLocale
 *
 * @example <caption>Locale in name</caption>
 * // returns `es`
 * parseLocaleFromFileName('path/to/file/test.es')
 *
 * @example <caption>No locale in name</caption>
 * // returns `en`
 * parseLocaleFromFileName('path/to/file/test')
 *
 */
const parseLocaleFromFileName = (
  name: string,
  defLocale: string = DEF_LOCALE
) => {
  // extract locale from file name
  const splitName = name.split('.');
  if (splitName.length === 1) splitName.push(defLocale);
  const locale = splitName[1];

  return locale;
};

/**
 * determines locale from input filename
 *
 * @param {string} name
 * @param {string=} defLocale
 *
 *@example <caption>Locale in name</caption>
 * // returns `es`
 * parseLocaleFromFileName('test.es')
 *
 * @example <caption>No locale in name</caption>
 * // returns `en`
 * parseLocaleFromFileName('test')
 *
 */
const parseLocaleFromFilePath = (
  path: string,
  defLocale: string = DEF_LOCALE
) => {
  const splitPath = path.split('/');
  const fileName = splitPath.pop();

  if (!fileName) return defLocale;
  return parseLocaleFromFileName(fileName);
};

/**
 * Formats time in minutes to hours and minutes string
 *
 *@example <caption>Under 1 hour</caption>
 * // returns `10min`
 * toHoursAndMinutes(10)
 *
 * @example <caption>Exactly 1 hour</caption>
 * // returns `1hr`
 * toHoursAndMinutes(60)
 *
 * @example <caption>More than 1 hour</caption>
 * // returns `1hr 10min`
 * toHoursAndMinutes(70)
 *
 * @param {number} totalMinutes
 * @returns {string} formatted time string
 */
const toHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''}` : ``;
  const formattedMin = minutes > 0 ? `${minutes} min` : '';

  return `${formattedHours} ${formattedMin}`.trim();
};

export {
  toHoursAndMinutes,
  isURLAbsolute,
  isURLRelative,
  parseLocaleFromFileName,
  parseLocaleFromFilePath
};
