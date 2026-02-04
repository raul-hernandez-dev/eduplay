import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import Recaptcha from '../../../components/ui/Recaptcha';

const LoginForm = ({ onSwitchToRegister }) => {
  const { t } = useTranslation('auth');
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!captchaToken) {
      setError(t('captcha_required'));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-recaptcha`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ token: captchaToken }),
        }
      );

      const captchaResult = await res.json();

      if (!res.ok || !captchaResult.success) {
        throw new Error(t('captcha_failed'));
      }

      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (err) {
      setError(err.message || t('login_failed'));
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl px-8 py-10 space-y-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('login')}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div>
              <label className="sr-only">{t('email')}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email')}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="sr-only">{t('password')}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('password')}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('forgot_password')}
              </a>
            </div>

            <Recaptcha
              ref={recaptchaRef}
              onVerify={setCaptchaToken}
              onExpired={() => setCaptchaToken(null)}
            />

            <button
              type="submit"
              disabled={loading || !captchaToken}
              className="w-full py-2 px-4 rounded-md text-sm font-medium text-white
                bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          {/* FOOTER */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            <span>{t('no_account')}</span>{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {t('register')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
