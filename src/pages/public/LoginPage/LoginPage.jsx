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
  Github,
  Chrome,
  Shield
} from 'lucide-react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import Button from '../../../components/ui/Button/Button';
import Card, { CardBody, CardFooter } from '../../../components/ui/Card/Card';

const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'El email es requerido'),
  password: z.string()
    .min(1, 'La contraseña es requerida'),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, loginWithGitHub, isLoading } = useAuth();
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
  const result = await login(data);
  
  if (result.success) {
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  } else {
    // Mostrar error específico de Supabase
    let errorMessage = result.error || t('login.error');
    
    // Traducir errores comunes de Supabase
    if (errorMessage.includes('Invalid login credentials')) {
      errorMessage = 'Email o contraseña incorrectos';
    } else if (errorMessage.includes('Email not confirmed')) {
      errorMessage = 'Por favor confirma tu email antes de iniciar sesión';
    }
    
    setError('root', { 
      type: 'manual', 
      message: errorMessage 
    });
  }
};

  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    clearErrors();
    
    try {
      // Intentar login con cuenta demo
      const result = await login({
        email: 'demo@eduplay.com',
        password: 'Demo@1234',
      });
      
      if (result.success) {
        navigate('/dashboard', { replace: true });
      } else {
        // Si no existe la cuenta demo, usar test credentials de Supabase
        const testResult = await login({
          email: 'test@example.com',
          password: 'Test@1234',
        });
        
        if (!testResult.success) {
          setError('root', { 
            type: 'manual', 
            message: 'Usa tu cuenta real para acceder o registra una nueva' 
          });
        }
      }
    } catch (error) {
      setError('root', { 
        type: 'manual', 
        message: 'Error en el acceso demo' 
      });
    } finally {
      setIsDemoLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    clearErrors();
    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else if (provider === 'github') {
        await loginWithGitHub();
      }
    } catch (error) {
      setError('root', { 
        type: 'manual', 
        message: `Error al iniciar sesión con ${provider}` 
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardBody className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('login.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {t('login.subtitle')}
              </p>
            </div>

            {/* Error General */}
            {errors.root && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.root.message}
                  </p>
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
                        ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                        : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                    placeholder="usuario@empresa.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
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
                        ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                        : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {t('login.rememberMe')}
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {t('login.button')}
              </Button>

              {/* Demo Login Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleDemoLogin}
                isLoading={isDemoLoading}
                disabled={isLoading || isDemoLoading}
              >
                {t('login.demoButton')}
              </Button>
            </form>

            {/* Separator */}
            <div className="my-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    {t('login.orContinueWith')}
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex">
                <Shield className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Tu seguridad es importante. Usamos encriptación de nivel empresarial.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>

          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-6 text-center rounded-b-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('login.noAccount')}{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
              >
                {t('login.createAccount')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;