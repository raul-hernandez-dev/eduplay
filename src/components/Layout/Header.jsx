import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ThemeToggle from '../ThemeToggle';

const Header = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const userInitial = user?.email?.charAt(0).toUpperCase();

  const handleLogout = async () => {
    setProfileOpen(false);
    setMenuOpen(false);
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    if (!profileOpen) return;

    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 dark:text-blue-400"
          >
            {t('home')}
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                {t('dashboard')}
              </Link>
            )}

            <ThemeToggle />

            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

            {user ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="w-9 h-9 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center"
                >
                  {userInitial}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {t('profile')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {t('login')}
              </Link>
            )}
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />

            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

            <button onClick={() => setMenuOpen((prev) => !prev)}>
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4 border-t pt-4">
            {user && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {userInitial}
                </div>
                <div>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm"
                  >
                    {t('profile')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-sm text-red-600"
                  >
                    {t('logout')}
                  </button>
                </div>
              </div>
            )}

            {user && (
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300"
              >
                {t('dashboard')}
              </Link>
            )}

            {!user && (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-blue-600"
              >
                {t('login')}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
