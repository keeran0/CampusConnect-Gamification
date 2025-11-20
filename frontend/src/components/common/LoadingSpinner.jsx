import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  fullScreen = false,
  message = 'Loading...'
}) => {
  // Size variants
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizes[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}></div>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner;