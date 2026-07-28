import React from 'react';

export const ReturnPolicyBadge = ({ text }) => {
  if (!text) return null;

  return (
    <div className="bg-blue-50/80 border border-blue-200/60 rounded-2xl p-4 flex items-start space-x-3 transition-all hover:bg-blue-50">
      <div className="bg-blue-600 text-white p-2 rounded-xl shadow-sm shrink-0 mt-0.5">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <div>
        <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Hassle-Free Returns</h4>
        <p className="text-xs text-blue-800 mt-1 leading-snug">{text}</p>
      </div>
    </div>
  );
};

export default ReturnPolicyBadge;
