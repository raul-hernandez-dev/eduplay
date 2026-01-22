import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Calendar,
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Building2,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import Button from '../../../components/ui/Button/Button';
import Card, { CardBody, CardFooter } from '../../../components/ui/Card/Card';
import toast from 'react-hot-toast';

// Esquema de validación mejorado
const passwordSchema = z.string()
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Al menos una mayúscula')
  .regex(/[a-z]/, 'Al menos una minúscula')
  .regex(/[0-9]/, 'Al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Al menos un carácter especial');

const registerSchema = z.object({
  name: z.string()
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email requerido'),
  birthDate: z.string()
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }, 'Debes ser mayor de 18 años'),
  password: passwordSchema,
  confirmPassword: z.string(),
  role: z.enum(['student', 'professional', 'corporate']),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Debes aceptar los términos' }),
  }),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    trigger,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      acceptTerms: false,
      jobTitle: '',
      company: '',
    },
  });

  const password = watch('password');
  const selectedRole = watch('role');

  // Validar requisitos de contraseña en tiempo real
  useEffect(() => {
    if (!password) {
      setPasswordRequirements({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
      return;
    }

    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });

    // Validar campo de confirmación cuando cambia la contraseña
    if (watch('confirmPassword')) {
      trigger('confirmPassword');
    }
  }, [password, watch, trigger]);

  const onSubmit = async (data) => {
    clearErrors();
    
    // Validar que cumpla todos los requisitos
    const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);
    if (!allRequirementsMet) {
      setError('password', {
        type: 'manual',
        message: 'La contraseña no cumple todos los requisitos'
      });
      toast.error('Por favor, cumple todos los requisitos de la contraseña');
      return;
    }

    try {
      const result = await registerUser(data);
      
      if (result.success) {
        toast.success(t('register.success'), {
          icon: '🎉',
          duration: 5000,
        });
        navigate('/dashboard', { replace: true });
      } else {
        setError('root', {
          type: 'manual',
          message: result.error || t('register.error')
        });
        toast.error(result.error || t('register.error'));
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: t('register.error')
      });
      toast.error(t('register.error'));
    }
  };

  const getPasswordStrength = () => {
    const metCount = Object.values(passwordRequirements).filter(Boolean).length;
    const total = Object.keys(passwordRequirements).length;
    return Math.round((metCount / total) * 100);
  };

  const getStrengthColor = (strength) => {
    if (strength <= 20) return 'bg-red-500';
    if (strength <= 40) return 'bg-orange-500';
    if (strength <= 60) return 'bg-yellow-500';
    if (strength <= 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength) => {
    if (strength <= 20) return 'Muy débil';
    if (strength <= 40) return 'Débil';
    if (strength <= 60) return 'Regular';
    if (strength <= 80) return 'Buena';
    return 'Excelente';
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('register.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('register.subtitle')}
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
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('register.name')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('name')}
                      type="text"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.name
                          ? 'border-red-300 dark:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                      placeholder="Nombre completo"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('register.email')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('email')}
                      type="email"
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

                {/* Fecha de nacimiento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('register.birthDate')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('birthDate')}
                      type="date"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.birthDate
                          ? 'border-red-300 dark:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    />
                  </div>
                  {errors.birthDate && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>

                {/* Rol */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('register.role')}
                  </label>
                  <select
                    {...register('role')}
                    className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.role
                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  >
                    <option value="student">
                      <GraduationCap className="inline w-4 h-4 mr-2" />
                      {t('register.roles.student')}
                    </option>
                    <option value="professional">
                      <Briefcase className="inline w-4 h-4 mr-2" />
                      {t('register.roles.professional')}
                    </option>
                    <option value="corporate">
                      <Building2 className="inline w-4 h-4 mr-2" />
                      {t('register.roles.corporate')}
                    </option>
                  </select>
                </div>
              </div>

              {/* Campos condicionales para corporativo */}
              {selectedRole === 'corporate' && (
                <div className="grid md:grid-cols-2 gap-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Empresa
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cargo
                    </label>
                    <input
                      {...register('jobTitle')}
                      type="text"
                      className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Tu cargo en la empresa"
                    />
                  </div>
                </div>
              )}

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('register.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.password
                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    placeholder="Crea una contraseña segura"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
                
                {/* Indicador de fortaleza */}
                {password && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fortaleza de la contraseña
                      </span>
                      <span className={`text-sm font-bold ${
                        getPasswordStrength() >= 80 ? 'text-green-600' :
                        getPasswordStrength() >= 60 ? 'text-blue-600' :
                        getPasswordStrength() >= 40 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {getStrengthText(getPasswordStrength())}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStrengthColor(getPasswordStrength())} transition-all duration-500`}
                        style={{ width: `${getPasswordStrength()}%` }}
                      />
                    </div>
                    
                    {/* Requisitos de contraseña */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                      {[
                        { key: 'length', text: 'Mínimo 8 caracteres' },
                        { key: 'uppercase', text: 'Al menos una mayúscula' },
                        { key: 'lowercase', text: 'Al menos una minúscula' },
                        { key: 'number', text: 'Al menos un número' },
                        { key: 'special', text: 'Al menos un carácter especial' },
                      ].map((req) => (
                        <div key={req.key} className="flex items-center text-sm">
                          {passwordRequirements[req.key] ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400 mr-2" />
                          )}
                          <span className={
                            passwordRequirements[req.key]
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-500 dark:text-gray-400'
                          }>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('register.confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.confirmPassword
                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    placeholder="Confirma tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Términos y condiciones */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register('acceptTerms')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    id="acceptTerms"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    {t('register.acceptTerms.text')}{' '}
                    <Link
                      to="/terms"
                      className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
                    >
                      {t('register.acceptTerms.link')}
                    </Link>{' '}
                    {t('register.acceptTerms.and')}{' '}
                    <Link
                      to="/privacy"
                      className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
                    >
                      {t('register.acceptTerms.privacy')}
                    </Link>
                  </label>
                </div>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1.5" />
                  {errors.acceptTerms.message}
                </p>
              )}

              {/* Botón de registro */}
              <Button
                type="submit"
                className="w-full py-3 text-base"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {t('register.button')}
              </Button>
            </form>
          </CardBody>

          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {t('register.haveAccount')}{' '}
              <Link
                to="/login"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
              >
                {t('register.loginLink')}
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-lg">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Datos protegidos • Encriptación de extremo a extremo • Sin spam</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;