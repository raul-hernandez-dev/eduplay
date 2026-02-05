import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';

const Dashboard = () => {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-app-fg">
        {t('dashboard')}
      </h1>

      <div className="bg-surface rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-app-fg mb-4">
          {t('user_information')}
        </h2>

        <div className="space-y-2 text-app-fg">
          <p>
            <strong>{t('email')}:</strong> {user?.email}
          </p>

          <p>
            <strong>{t('id_user')}:</strong> {user?.id}
          </p>

          <p>
            <strong>{t('last_login')}:</strong>{' '}
            {user?.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleString()
              : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
