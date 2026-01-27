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
  Shield,
  Briefcase,
  GraduationCap,
  Users
} from 'lucide-react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import Button from '../../../components/ui/Button/Button';
import Card, { CardBody, CardFooter } from '../../../components/ui/Card/Card';

// Esquema de validación
const registerSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios'),
  
  email: z.string()
    .email('Email inválido')
    .min(1, 'El email es requerido')
    .max(100, 'El email es demasiado largo'),
  
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'La contraseña es demasiado larga')
    .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
  
  confirmPassword: z.string()
    .min(1, 'La confirmación de contraseña es requerida'),
  
  birthDate: z.string()
    .refine((date) => {
      if (!date) return false;
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, 'Debes tener al menos 18 años'),
  
  role: z.enum(['student', 'professional', 'instructor'], {
    errorMap: () => ({ message: 'Selecciona un perfil válido' })
  }),
  
  acceptTerms: z.boolean()
    .refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordSuggestions, setPasswordSuggestions] = useState([]);

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
      password: '',
      confirmPassword: '',
      birthDate: '',
      role: 'student',
      acceptTerms: false,
    },
  });

  const password = watch('password');
  const email = watch('email');

  // Verificar fortaleza de contraseña
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordSuggestions([]);
      return;
    }

    let strength = 0;
    const suggestions = [];

    // Longitud mínima
    if (password.length >= 8) strength++;
    else suggestions.push('Al menos 8 caracteres');

    // Mayúsculas
    if (/[A-Z]/.test(password)) strength++;
    else suggestions.push('Una letra mayúscula');

    // Minúsculas
    if (/[a-z]/.test(password)) strength++;
    else suggestions.push('Una letra minúscula');

    // Números
    if (/[0-9]/.test(password)) strength++;
    else suggestions.push('Un número');

    // Caracteres especiales
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else suggestions.push('Un carácter especial');

    setPasswordStrength(strength);
    setPasswordSuggestions(suggestions);
  }, [password]);

  // Verificar disponibilidad de email
  const checkEmailAvailability = async (email) => {
    if (!email || errors.email) return true;
    
    // Aquí puedes agregar una llamada a tu API para verificar el email
    // Por ahora, simulamos que siempre está disponible
    return true;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength === 2) return 'bg-orange-500';
    if (strength === 3) return 'bg-yellow-500';
    if (strength === 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength) => {
    const texts = [
      'Muy débil',
      'Débil',
      'Regular',
      'Buena',
      'Excelente',
    ];
    return texts[Math.min(strength, 4)] || 'Muy débil';
  };

  const onSubmit = async (data) => {
    clearErrors();
    
    // Verificar email
    const isEmailAvailable = await checkEmailAvailability(data.email);
    if (!isEmailAvailable) {
      setError('email', { 
        type: 'manual', 
        message: 'Este email ya está registrado' 
      });
      return;
    }

    const result = await registerUser(data);
    
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError('root', { 
        type: 'manual', 
        message: result.error || t('register.error') 
      });
    }
  };

  const roleOptions = [
    { 
      value: 'student', 
      label: t('register.roles.student'), 
      description: 'Estoy buscando mejorar mis habilidades profesionales',
      icon: <GraduationCap className="w-6 h-6" />
    },
    { 
      value: 'professional', 
      label: t('register.roles.professional'), 
      description: 'Quiero actualizar mis conocimientos para mi carrera',
      icon: <Briefcase className="w-6 h-6" />
    },
    { 
      value: 'instructor', 
      label: t('register.roles.instructor'), 
      description: 'Deseo compartir mi experiencia como instructor',
      icon: <Users className="w-6 h-6" />
    },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card>
          <CardBody className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('register.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {t('register.subtitle')}
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                          ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                          : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Juan Pérez"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
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
                      onBlur={() => trigger('email')}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                          : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
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

                {/* Fecha de Nacimiento */}
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
                      max={new Date().toISOString().split('T')[0]}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        errors.birthDate
                          ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                          : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                  </div>
                  {errors.birthDate && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>

                {/* Rol */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('register.role')}
                  </label>
                  <div className="space-y-3">
                    {roleOptions.map((role) => (
                      <label
                        key={role.value}
                        className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                          watch('role') === role.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <input
                          {...register('role')}
                          type="radio"
                          value={role.value}
                          className="sr-only"
                        />
                        <div className="flex items-center h-5 mt-0.5">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            watch('role') === role.value
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {watch('role') === role.value && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <span className="text-gray-700 dark:text-gray-300 mr-3">
                              {role.icon}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {role.label}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {role.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.role && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Contraseña */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
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
                            ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                            : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
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
                            ? 'border-red-300 focus:ring-red-500 dark:border-red-600'
                            : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Medidor de Fortaleza */}
                {password && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Fortaleza de la contraseña
                        </span>
                        <span className={`text-sm font-medium ${
                          passwordStrength <= 2 ? 'text-red-600 dark:text-red-400' :
                          passwordStrength === 3 ? 'text-yellow-600 dark:text-yellow-400' :
                          passwordStrength >= 4 ? 'text-green-600 dark:text-green-400' :
                          'text-gray-600 dark:text-gray-400'
                        }`}>
                          {getStrengthText(passwordStrength)}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStrengthColor(passwordStrength)} transition-all duration-500`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Sugerencias */}
                    {passwordSuggestions.length > 0 && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                          Para mejorar tu contraseña:
                        </p>
                        <ul className="space-y-1">
                          {passwordSuggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-yellow-700 dark:text-yellow-400 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Requisitos Cumplidos */}
                    {passwordSuggestions.length === 0 && passwordStrength >= 4 && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-2 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          ¡Contraseña segura!
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Tu contraseña cumple con todos los requisitos de seguridad.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Términos y Condiciones */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      {...register('acceptTerms')}
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                    />
                  </div>
                  <div className="ml-3">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      {t('register.acceptTerms.text')}{' '}
                      <Link
                        to="/terms"
                        className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
                      >
                        {t('register.acceptTerms.link')}
                      </Link>{' '}
                      {t('register.acceptTerms.and')}{' '}
                      <Link
                        to="/privacy"
                        className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
                      >
                        {t('register.acceptTerms.privacy')}
                      </Link>
                    </label>
                  </div>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.acceptTerms.message}
                  </p>
                )}

                {/* Security Notice */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex">
                    <Shield className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Protegemos tu información con encriptación de nivel empresarial y cumplimos con las normativas de protección de datos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {t('register.button')}
              </Button>
            </form>
          </CardBody>

          <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-6 text-center rounded-b-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('register.haveAccount')}{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
              >
                {t('register.loginLink')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;