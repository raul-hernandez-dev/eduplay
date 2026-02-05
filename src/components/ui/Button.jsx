import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary: `
      bg-primary text-white
      hover:bg-primary-hover
      focus:ring-primary
    `,
    secondary: `
      bg-surface text-app-fg
      hover:bg-surface-hover
      focus:ring-surface
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
    `,
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        px-4 py-2 rounded-md text-sm font-medium
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  );
};

export default Button;
