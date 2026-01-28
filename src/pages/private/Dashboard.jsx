import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t('dashboard')}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="space-y-2">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>User ID:</strong> {user?.id}</p>
          <p><strong>Last Login:</strong> {new Date(user?.last_sign_in_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;