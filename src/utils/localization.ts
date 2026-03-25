import type { Lang } from '../data/translations';

/**
 * Safely gets localized text from a value that can be either a string or a localized object.
 * @param value - The text value that can be a string or { es: string; en: string; }
 * @param lang - The current language ('es' or 'en')
 * @returns The appropriate localized text
 */
export function getLocalizedText(
  value: string | { es: string; en: string },
  lang: Lang
): string {
  if (typeof value === 'string') {
    return value;
  }
  
  return value[lang] || value.es || value.en || '';
}
