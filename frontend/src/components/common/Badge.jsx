import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  rounded = true,
  className = ''
}) => {
  // Variant styles
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    gold: 'bg-yellow-50 text-yellow-700 border border-yellow-300'
  };
  
  // Size styles
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };
  
  // Border radius
  const borderRadius = rounded ? 'rounded-full' : 'rounded';
  
  const badgeClasses = `inline-flex items-center font-medium ${variants[variant]} ${sizes[size]} ${borderRadius} ${className}`;
  
  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;