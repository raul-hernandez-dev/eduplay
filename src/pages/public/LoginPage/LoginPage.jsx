// src/pages/public/LoginPage/LoginPage.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import Button from '../../../components/ui/Button/Button';
import Card, { CardBody, CardFooter } from '../../../components/ui/Card/Card';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'El email es requerido'),
  password: z.string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    clearErrors();
    try {
      const result = await login(data);
      
      if (result.success) {
        toast.success(t('login.success'), {
          icon: '👋',
          duration: 4000,
        });
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('root', {
          type: 'manual',
          message: result.error || t('login.error')
        });
        toast.error(result.error || t('login.error'));
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: t('login.error')
      });
      toast.error(t('login.error'));
    }
  };

  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    clearErrors();
    
    try {
      const result = await login({
        email: 'profesional@eduplay.com',
        password: 'Demo123!@#',
        rememberMe: true,
      });
      
      if (result.success) {
        toast.success(t('login.demoSuccess'), {
          icon: '🚀',
          duration: 4000,
        });
        navigate('/dashboard', { replace: true });
      } else {
        setError('root', {
          type: 'manual',
          message: t('login.error')
        });
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: t('login.error')
      });
    } finally {
      setIsDemoLoading(false);
    }
  };

  const handleCorporateLogin = () => {
    toast.success('Redirigiendo al portal corporativo...', {
      icon: '🏢',
      duration: 3000,
    });
    // Aquí iría la redirección al login corporativo
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('login.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('login.subtitle')}
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardBody className="p-8">
            {/* Error general */}
            {errors.root && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                  <span className="text-sm font-medium text-red-800 dark:text-red-300">
                    {errors.root.message}
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('login.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    autoComplete="email"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.email
                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                    placeholder="nombre@empresa.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('login.password')}
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
                  >
                    {t('login.forgotPassword')}
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.password
                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5" />
                    {errors.password.message}
                  </p>
                )}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Mínimo 8 caracteres
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  id="rememberMe"
                />
                <label 
                  htmlFor="rememberMe" 
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  {t('login.rememberMe')}
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3 text-base"
                isLoading={isLoading}
                disabled={isLoading || isDemoLoading}
              >
                {t('login.button')}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  {t('login.orContinueWith')}
                </span>
              </div>
            </div>

            {/* Demo Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full mb-4"
              onClick={handleDemoLogin}
              isLoading={isDemoLoading}
              disabled={isLoading || isDemoLoading}
            >
              <ShieldCheck className="w-5 h-5 mr-2" />
              {t('login.demoButton')}
            </Button>

            {/* Corporate Login Button */}
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={handleCorporateLogin}
              disabled={isLoading || isDemoLoading}
            >
              <Building2 className="w-5 h-5 mr-2" />
              Acceso Corporativo
            </Button>
          </CardBody>

          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {t('login.noAccount')}{' '}
              <Link
                to="/register"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
              >
                {t('login.createAccount')}
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span>Conexión segura • SSL encriptado • Certificado válido</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;