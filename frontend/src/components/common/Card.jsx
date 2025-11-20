// src/components/common/Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  footer,
  hover = false,
  padding = 'normal',
  className = ''
}) => {
  // Padding variants
  const paddings = {
    none: '',
    sm: 'p-3',
    normal: 'p-6',
    lg: 'p-8'
  };
  
  // Hover effect
  const hoverEffect = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';
  
  return (
    <div className={`bg-white rounded-lg shadow-md ${hoverEffect} ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className={`border-b border-gray-200 ${paddings[padding]}`}>
          {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      
      {/* Body */}
      <div className={paddings[padding]}>
        {children}
      </div>
      
      {/* Footer */}
      {footer && (
        <div className={`border-t border-gray-200 ${paddings[padding]} bg-gray-50`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;