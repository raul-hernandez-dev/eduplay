import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import ThemeToggle from '../../../features/theme/components/ThemeToggle';
import LanguageSelector from '../../../features/language/components/LanguageSelector';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.home'), href: '/', show: true },
    { name: t('nav.courses'), href: '/courses', show: true },
    { name: t('nav.about'), href: '/about', show: true },
    { name: t('nav.dashboard'), href: '/dashboard', show: isAuthenticated },
    { name: t('nav.login'), href: '/login', show: !isAuthenticated },
    { name: t('nav.register'), href: '/register', show: !isAuthenticated },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-edu-blue to-edu-purple rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-edu-blue to-edu-purple bg-clip-text text-transparent">
              Eduplay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => 
              item.show && (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu (if authenticated) */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-edu-blue to-edu-purple flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name || 'Usuario'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  
                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                      {t('nav.profile')}
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                      {t('nav.settings')}
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-edu-blue to-edu-purple text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => 
                item.show && (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-base font-medium ${
                      location.pathname === item.href
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="px-3">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;