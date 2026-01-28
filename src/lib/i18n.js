import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          login: "Login",
          register: "Register",
          logout: "Logout",
          profile: "Profile",
          email: "Email",
          password: "Password",
          confirm_password: "Confirm Password",
          dark_mode: "Dark Mode",
          light_mode: "Light Mode",
          home: "Home",
          dashboard: "Dashboard",
          description: "Modern platform designed to offer a fast, secure, and efficient experience.",
        }
      },
      es: {
        translation: {
          welcome: "Bienvenido",
          login: "Iniciar Sesión",
          register: "Registrarse",
          logout: "Cerrar Sesión",
          profile: "Perfil",
          email: "Correo Electrónico",
          password: "Contraseña",
          confirm_password: "Confirmar Contraseña",
          dark_mode: "Modo Oscuro",
          light_mode: "Modo Claro",
          home: "Inicio",
          dashboard: "Panel",
          description: "Plataforma moderna diseñada para ofrecer una experiencia rápida, segura y eficiente.",
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;