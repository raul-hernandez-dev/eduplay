import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import PasswordFields from '../../components/PasswordFields';

const Profile = () => {
  const { t } = useTranslation();
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
      <h1 className="text-3xl font-extrabold">
        {t('profile')}
      </h1>

      {(error || message) && (
        <div
          className={`px-4 py-3 rounded ${
            error
              ? 'bg-red-100 text-red-700 border border-red-400'
              : 'bg-green-100 text-green-700 border border-green-400'
          }`}
        >
          {error || message}
        </div>
      )}

      {/* BASIC INFO */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-3">
        <h2 className="text-xl font-semibold">
          {t('account_information')}
        </h2>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>{t('provider')}:</strong>{' '}
            {user.app_metadata?.provider || 'email'}
          </p>
          <p>
            <strong>{t('created_at')}:</strong>{' '}
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* UPDATE EMAIL */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          {t('change_email')}
        </h2>

        <form onSubmit={handleEmailUpdate} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-blue-600 text-white
              hover:bg-blue-700 disabled:opacity-50"
          >
            {t('update_email')}
          </button>
        </form>
      </div>

      {/* UPDATE PASSWORD */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          {t('change_password')}
        </h2>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <PasswordFields onChange={setPasswordData} />

          <button
            type="submit"
            disabled={loading || !passwordData.isValid}
            className="px-4 py-2 rounded-md bg-blue-600 text-white
              hover:bg-blue-700 disabled:opacity-50"
          >
            {t('update_password')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
