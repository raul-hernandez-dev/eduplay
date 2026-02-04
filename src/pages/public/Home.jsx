import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">{t('welcome')}</h1>
      <p className="text-lg mb-8">
        {user ? `Welcome back, ${user.email}!` : t('initial_message')}
      </p>
      {!user && (
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            {t('login')}
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium"
          >
            {t('register')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;