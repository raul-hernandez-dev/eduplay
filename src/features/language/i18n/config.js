import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Recursos de idioma
const resources = {
  es: {
    translation: {
      welcome: "Bienvenido a Eduplay",
      tagline: "Aprende jugando",
      login: "Iniciar sesión",
      register: "Registrarse",
    }
  },
  en: {
    translation: {
      welcome: "Welcome to Eduplay",
      tagline: "Learn by playing",
      login: "Login",
      register: "Register",
    }
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