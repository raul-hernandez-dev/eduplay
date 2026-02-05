import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

const Header = () => {
  const { t } = useTranslation(['common', 'auth', 'profile']);
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

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  return (
    <header className="bg-surface text-app-fg shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-primary hover:opacity-90"
          >
            {t('home')}
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <Link
                to="/dashboard"
                className="hover:text-primary transition-colors"
              >
                {t('dashboard')}
              </Link>
            )}

            <ThemeToggle />

            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-surface hover:bg-surface-hover px-2 py-1 rounded"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

            {user ? (
              <div ref={profileRef} className="relative">
                {/* Avatar button */}
                <Button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="w-9 h-9 rounded-full p-0 font-semibold"
                >
                  {userInitial}
                </Button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-surface rounded-lg shadow-lg py-1 z-20">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-surface-hover"
                    >
                      {t('profile:profile')}
                    </Link>

                    <Button
                      variant="secondary"
                      onClick={handleLogout}
                      className="w-full justify-start px-4 py-2 text-sm rounded-none"
                    >
                      {t('auth:logout')}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button>
                  {t('auth:login')}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />

            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-surface hover:bg-surface-hover px-2 py-1 rounded"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

            <button onClick={() => setMenuOpen((p) => !p)}>
              <svg
                className="w-6 h-6 text-app-fg"
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
          <div className="md:hidden mt-4 space-y-4 border-t border-surface-hover pt-4">
            {user && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {userInitial}
                </div>
                <div>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm py-2 px-4"
                  >
                    {t('profile:profile')}
                  </Link>

                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                    className="p-0 text-sm"
                  >
                    {t('auth:logout')}
                  </Button>
                </div>
              </div>
            )}

            {user && (
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                {t('dashboard')}
              </Link>
            )}

            {!user && (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                <Button className="w-full">
                  {t('auth:login')}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
