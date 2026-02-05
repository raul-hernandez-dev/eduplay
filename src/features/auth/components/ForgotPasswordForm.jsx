import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import Recaptcha from './Recaptcha';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ForgotPasswordForm = () => {
  const { t } = useTranslation('auth');
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

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

      const { error } = await resetPassword(email);
      if (error) throw error;

      setMessage(t('reset_email_sent'));
    } catch (err) {
      setError(err.message || t('captcha_failed'));
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface shadow-lg rounded-xl max-w-md w-full px-8 py-10 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-app-fg">
          {t('forgot_password')}
        </h2>
        <p className="text-sm text-app-fg opacity-80">
          {t('forgot_password_help')}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm">
            {message}
          </div>
        )}

        {/* EMAIL */}
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('email')}
        />

        <Recaptcha
          ref={recaptchaRef}
          onVerify={setCaptchaToken}
          onExpired={() => setCaptchaToken(null)}
        />

        {/* SUBMIT */}
        <Button
          type="submit"
          loading={loading}
          disabled={!captchaToken}
          className="w-full"
        >
          {t('send_reset_link')}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
