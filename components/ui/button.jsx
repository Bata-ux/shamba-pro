import React from 'react';
export function Button({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default',
  disabled = false,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    ghost: 'hover:bg-gray-100'
  };
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md'
  };
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
