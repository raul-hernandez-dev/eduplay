import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import PasswordFields from '../../../components/ui/PasswordFields';
import Recaptcha from './Recaptcha';
import Button from '../../../components/ui/Button';

const ResetPasswordForm = () => {
  const { t } = useTranslation('auth');
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    password: '',
    isValid: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

      const { error } = await updatePassword(passwordData.password);
      if (error) throw error;

      navigate('/login');
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
          {t('reset_password')}
        </h2>
        <p className="text-sm text-app-fg opacity-80">
          {t('reset_password_help')}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <PasswordFields onChange={setPasswordData} />

        <Recaptcha
          ref={recaptchaRef}
          onVerify={setCaptchaToken}
          onExpired={() => setCaptchaToken(null)}
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          disabled={!passwordData.isValid || !captchaToken}
          className="w-full"
        >
          {t('save_password')}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
