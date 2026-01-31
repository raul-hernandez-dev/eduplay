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
          forgot_password: "Forgot password",
          forgot_password_help: "We will send you a link to reset your password",
          reset_password: "Reset password",
          reset_password_help: "Enter your new password",

          send_reset_link: "Send reset link",
          reset_email_sent: "Check your email to reset your password",

          new_password: "New password",
          save_password: "Save password",

          password_requirements: "Password requirements",
          password_min_length: "At least 8 characters",
          password_uppercase: "At least one uppercase letter",
          password_lowercase: "At least one lowercase letter",
          password_number: "At least one number",
          password_special: "At least one special character",
          password_match: "Passwords match",

          password_invalid: "Password does not meet requirements",

          captcha_required: "Please verify the captcha",
          captcha_failed: "Captcha validation failed",
          loading: "Loading..."
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
          forgot_password: "Recuperar contraseña",
          forgot_password_help: "Te enviaremos un enlace para restablecerla",
          reset_password: "Restablecer contraseña",
          reset_password_help: "Ingresa tu nueva contraseña",

          send_reset_link: "Enviar enlace",
          reset_email_sent: "Revisa tu correo para restablecer tu contraseña",

          new_password: "Nueva contraseña",
          save_password: "Guardar contraseña",

          password_requirements: "Requisitos de la contraseña",
          password_min_length: "Mínimo 8 caracteres",
          password_uppercase: "Al menos una mayúscula",
          password_lowercase: "Al menos una minúscula",
          password_number: "Al menos un número",
          password_special: "Al menos un carácter especial",
          password_match: "Las contraseñas coinciden",

          password_invalid: "La contraseña no cumple con los requisitos",

          captcha_required: "Verifica el captcha",
          captcha_failed: "Falló la validación del captcha",

          loading: "Cargando...",

          account_information: "Información de la cuenta",
          provider: "Proveedor",
          created_at: "Fecha de creación",
          change_email: "Cambiar correo electrónico",
          update_email: "Actualizar correo electrónico",
          change_password: "Cambiar contraseña",
          update_password: "Actualizar contraseña",
          password_updated: "Contraseña actualizada con éxito",
          email_update_confirmation: "Revisa tu correo para confirmar el cambio",
          password_invalid: "La contraseña no cumple con los requisitos",
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;