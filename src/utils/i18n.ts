export const getLocalizedText = (obj: any, lang: 'en' | 'mr'): string => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj['en'] || '';
};
