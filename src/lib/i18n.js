import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEN from '../locales/en/common.json';
import authEN from '../locales/en/auth.json';
import dasboardEN from '../locales/en/dashboard.json'
import profileEN from '../locales/en/profile.json'

import commonES from '../locales/es/common.json';
import authES from '../locales/es/auth.json';
import dasboardES from '../locales/es/dashboard.json'
import profileES from '../locales/es/profile.json'



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth', 'dashboard', 'profile'],
    resources: {
      en: {
        common: commonEN,
        auth: authEN,
        dashboard: dasboardEN,
        profile: profileEN,
      },
      es: {
        common: commonES,
        auth: authES,
        dashboard: dasboardES,
        profile: profileES,
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
