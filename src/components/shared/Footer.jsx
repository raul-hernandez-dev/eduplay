import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface text-app-fg border-t border-surface-hover">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 text-center md:text-left">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Calmécac
            </h3>

            <p className="text-sm opacity-80">
              {t('description')}
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="opacity-70 hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.6l-.4 3h-2.2v7A10 10 0 0022 12z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
                className="opacity-70 hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.91 11.91 0 0012.01 0C5.39 0 .01 5.38.01 12a11.9 11.9 0 001.65 6.02L0 24l6.18-1.62A11.96 11.96 0 0012 24c6.62 0 12-5.38 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22a9.94 9.94 0 01-5.1-1.4l-.37-.22-3.67.96.98-3.58-.24-.38A9.93 9.93 0 1122 12c0 5.52-4.48 10-10 10z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="opacity-70 hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.47.42a4.92 4.92 0 011.77 1.03 4.92 4.92 0 011.03 1.77c.17.47.36 1.27.42 2.47.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 2-.42 2.47a4.92 4.92 0 01-1.03 1.77 4.92 4.92 0 01-1.77 1.03c-.47.17-1.27.36-2.47.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.25-2.47-.42a4.92 4.92 0 01-1.77-1.03 4.92 4.92 0 01-1.03-1.77c-.17-.47-.36-1.27-.42-2.47C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-2 .42-2.47a4.92 4.92 0 011.03-1.77 4.92 4.92 0 011.77-1.03c.47-.17 1.27-.36 2.47-.42C8.4 2.2 8.8 2.2 12 2.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Placeholder columns */}
          <div />
          <div />
          <div />
        </div>

        <div className="py-6 text-center text-sm opacity-70 border-t border-surface-hover">
          <p>
            &copy; {year} Calmécac. {t('welcome')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
