import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from './Input';

const PasswordFields = ({ onChange, error }) => {
  const { t } = useTranslation('auth');

  const passwordRules = [
    { label: t('password_min_length'), test: (v) => v.length >= 8 },
    { label: t('password_uppercase'), test: (v) => /[A-Z]/.test(v) },
    { label: t('password_lowercase'), test: (v) => /[a-z]/.test(v) },
    { label: t('password_number'), test: (v) => /\d/.test(v) },
    { label: t('password_special'), test: (v) => /[^A-Za-z0-9]/.test(v) },
  ];

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const validations = passwordRules.map((rule) => ({
    ...rule,
    valid: rule.test(password),
  }));

  const isValid =
    validations.every((v) => v.valid) &&
    password === confirmPassword &&
    password.length > 0;

  useEffect(() => {
    onChange({ password, isValid });
  }, [password, confirmPassword, isValid, onChange]);

  return (
    <div className="space-y-4">
      {/* PASSWORD */}
      <Input
        type="password"
        placeholder={t('new_password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched(true)}
      />

      {/* CONFIRM PASSWORD */}
      <Input
        type="password"
        placeholder={t('confirm_password')}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => setTouched(true)}
      />

      {/* VALIDATIONS */}
      {touched && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-app-fg opacity-80">
            {t('password_requirements')}
          </p>

          <ul className="space-y-1 text-sm">
            {validations.map((rule) => (
              <li
                key={rule.label}
                className={rule.valid ? 'text-green-600' : 'opacity-50'}
              >
                • {rule.label}
              </li>
            ))}
            <li
              className={
                password === confirmPassword && password.length
                  ? 'text-green-600'
                  : 'opacity-50'
              }
            >
              • {t('password_match')}
            </li>
          </ul>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="px-4 py-2 rounded border border-red-400 bg-red-100 text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default PasswordFields;
