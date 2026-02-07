import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEN from './locales/common_en.json';
import authEN from '../../features/auth/i18n/auth_en.json';
import dasboardEN from '../../features/dashboard/i18n/dashboard_en.json'
import profileEN from '../../features/users/i18n/profile_en.json'
import homeEN from '../../features/home/i18n/home_en.json'

import commonES from './locales/common_es.json';
import authES from '../../features/auth/i18n/auth_es.json';
import dasboardES from '../../features/dashboard/i18n/dashboard_es.json'
import profileES from '../../features/users/i18n/profile_es.json'
import homeES from '../../features/home/i18n/home_es.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth', 'dashboard', 'profile', 'home'],
    resources: {
      en: {
        common: commonEN,
        auth: authEN,
        dashboard: dasboardEN,
        profile: profileEN,
        home: homeEN,
      },
      es: {
        common: commonES,
        auth: authES,
        dashboard: dasboardES,
        profile: profileES,
        home: homeES, 
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
