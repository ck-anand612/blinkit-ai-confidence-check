import React from 'react';

export const LoadingSpinner = ({ label = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      {label && <p className="text-sm font-medium text-emerald-800 animate-pulse">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;
