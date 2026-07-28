import React from 'react';

export const LocalConfidenceSignal = ({ text }) => {
  if (!text) return null;

  return (
    <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4 flex items-start space-x-3 transition-all hover:bg-amber-50">
      <div className="bg-amber-500 text-white p-2 rounded-xl shadow-sm shrink-0 mt-0.5">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Local Dark Store Guarantee</h4>
        <p className="text-xs text-amber-800 mt-1 leading-snug">{text}</p>
      </div>
    </div>
  );
};

export default LocalConfidenceSignal;
