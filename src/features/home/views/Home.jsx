import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation(['common', 'auth']);
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">{t('welcome')}</h1>
      <p className="text-lg mb-8">
        {user ? `${t('welcome_back')}, ${user.email}!` : t('initial_message')}
      </p>
      {!user && (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium"
          >
            {t('auth:login')}
          </Link>

          <Link
            to="/register"
            className="bg-surface hover:bg-surface-hover text-app-fg px-6 py-3 rounded-lg font-medium"
          >
            {t('auth:register')}
          </Link>

        </div>
      )}
    </div>
  );
};

export default Home;