import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import PasswordFields from '../../../components/ui/PasswordFields';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const Profile = () => {
  const { t } = useTranslation(['auth', 'profile']);
  const { user, updateEmail, updatePassword } = useAuth();

  const [email, setEmail] = useState(user.email);
  const [passwordData, setPasswordData] = useState({
    password: '',
    isValid: false,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const { error } = await updateEmail(email);
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage(t('email_update_confirmation'));
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!passwordData.isValid) {
      setError(t('password_invalid'));
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(passwordData.password);
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage(t('password_updated'));
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-app-fg">
        {t('profile:profile')}
      </h1>

      {(error || message) && (
        <div
          className={`px-4 py-3 rounded border text-sm ${
            error
              ? 'bg-red-100 text-red-700 border-red-400'
              : 'bg-green-100 text-green-700 border-green-400'
          }`}
        >
          {error || message}
        </div>
      )}

      {/* BASIC INFO */}
      <div className="bg-surface rounded-xl shadow p-6 space-y-3">
        <h2 className="text-xl font-semibold text-app-fg">
          {t('profile:account_information')}
        </h2>

        <div className="text-sm text-app-fg opacity-80 space-y-1">
          <p>
            <strong>{t('profile:id')}:</strong> {user.id}
          </p>
          <p>
            <strong>{t('profile:provider')}:</strong>{' '}
            {user.app_metadata?.provider || 'email'}
          </p>
          <p>
            <strong>{t('profile:created_at')}:</strong>{' '}
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* UPDATE EMAIL */}
      <div className="bg-surface rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-app-fg">
          {t('change_email')}
        </h2>

        <form onSubmit={handleEmailUpdate} className="space-y-3">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            loading={loading}
          >
            {t('update_email')}
          </Button>
        </form>
      </div>

      {/* UPDATE PASSWORD */}
      <div className="bg-surface rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-app-fg">
          {t('change_password')}
        </h2>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <PasswordFields onChange={setPasswordData} />

          <Button
            type="submit"
            loading={loading}
            disabled={!passwordData.isValid}
          >
            {t('update_password')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
