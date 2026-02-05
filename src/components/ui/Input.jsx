import React from 'react';

const Input = React.forwardRef(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full px-3 py-2 rounded-md
          border border-surface
          bg-app-bg text-app-fg
          placeholder:opacity-50
          focus:outline-none
          focus:ring-2 focus:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
