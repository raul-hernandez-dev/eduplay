import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar recursos locales
import esTranslation from './locales/es.json';
import enTranslation from './locales/en.json';
import ptTranslation from './locales/pt.json';

const resources = {
  es: {
    translation: esTranslation
  },
  en: {
    translation: enTranslation
  },
  pt: {
    translation: ptTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;