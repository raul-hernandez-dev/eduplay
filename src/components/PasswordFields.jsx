import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PasswordFields = ({ onChange, error }) => {
  const { t } = useTranslation('auth');

  const passwordRules = [
    {
      label: t('password_min_length'),
      test: (value) => value.length >= 8,
    },
    {
      label: t('password_uppercase'),
      test: (value) => /[A-Z]/.test(value),
    },
    {
      label: t('password_lowercase'),
      test: (value) => /[a-z]/.test(value),
    },
    {
      label: t('password_number'),
      test: (value) => /\d/.test(value),
    },
    {
      label: t('password_special'),
      test: (value) => /[^A-Za-z0-9]/.test(value),
    },
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
  }, [password, confirmPassword]);

  return (
    <div className="space-y-4">
      <div>
        <input
          type="password"
          placeholder={t('new_password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched(true)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder={t('confirm_password')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => setTouched(true)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {touched && (
        <div>
          <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {t('password_requirements')}
          </p>
          <ul className="space-y-1 text-sm">
            {validations.map((rule) => (
              <li
                key={rule.label}
                className={rule.valid ? 'text-green-500' : 'text-gray-400'}
              >
                • {rule.label}
              </li>
            ))}
            <li
              className={
                password === confirmPassword && password.length
                  ? 'text-green-500'
                  : 'text-gray-400'
              }
            >
              • {t('password_match')}
            </li>
          </ul>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default PasswordFields;
