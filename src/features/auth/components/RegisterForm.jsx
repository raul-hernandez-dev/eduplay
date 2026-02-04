import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import Recaptcha from '../../../components/ui/Recaptcha';
import PasswordFields from '../../../components/ui/PasswordFields';

const RegisterForm = ({ onSwitchToLogin }) => {
  const { t } = useTranslation('auth');
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [passwordData, setPasswordData] = useState({
    password: '',
    isValid: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!passwordData.isValid) {
      setError(t('password_invalid'));
      return;
    }

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

      const { error } = await signUp(email, passwordData.password);
      if (error) {
        throw error;
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || t('registration_failed'));

      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('registration_success')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('check_email_confirmation')}
          </p>
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            {t('go_to_login')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl max-w-md  w-full px-8 py-10 space-y-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('register')}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="rounded-md shadow-sm">
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

          {/* PASSWORD + CONFIRM PASSWORD */}
          <PasswordFields onChange={setPasswordData} />

          <Recaptcha
            ref={recaptchaRef}
            onVerify={setCaptchaToken}
            onExpired={() => setCaptchaToken(null)}
          />

          <button
            type="submit"
            disabled={loading || !passwordData.isValid || !captchaToken}
            className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? t('loading') : t('register')}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              {t('already_have_account')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
