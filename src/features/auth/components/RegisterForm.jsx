import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import Recaptcha from './Recaptcha';
import PasswordFields from '../../../components/ui/PasswordFields';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

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
      if (error) throw error;

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
      <div className="min-h-screen flex items-center justify-center bg-app-bg px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-app-fg">
            {t('registration_success')}
          </h2>

          <p className="text-app-fg opacity-80">
            {t('check_email_confirmation')}
          </p>

          <Button
            variant="secondary"
            onClick={onSwitchToLogin}
          >
            {t('go_to_login')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg py-12 px-4">
      <div className="bg-surface shadow-lg rounded-xl max-w-md w-full px-8 py-10 space-y-6">
        <h2 className="text-center text-3xl font-extrabold text-app-fg">
          {t('register')}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
              {error}
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

          {/* PASSWORD + CONFIRM */}
          <PasswordFields onChange={setPasswordData} />

          <Recaptcha
            ref={recaptchaRef}
            onVerify={setCaptchaToken}
            onExpired={() => setCaptchaToken(null)}
          />

          {/* SUBMIT */}
          <Button
            type="submit"
            loading={loading}
            disabled={!passwordData.isValid || !captchaToken}
            className="w-full"
          >
            {t('register')}
          </Button>

          <div className="text-center text-sm text-app-fg">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary hover:underline font-medium"
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
