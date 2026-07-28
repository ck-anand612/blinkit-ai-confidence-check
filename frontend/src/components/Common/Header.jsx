import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-yellow-400 border-b border-yellow-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-emerald-700 text-yellow-300 font-extrabold text-2xl tracking-tighter px-3 py-1 rounded-xl shadow-inner group-hover:scale-105 transition-transform">
            blink<span className="text-yellow-400">it</span>
          </div>
          <span className="bg-emerald-800 text-emerald-100 text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
            AI-Native Confidence MVP
          </span>
        </Link>

        <div className="flex items-center space-x-3 bg-yellow-300/80 px-3.5 py-1.5 rounded-full border border-yellow-500/30 text-xs font-bold text-gray-900 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <span>⚡ Delivery in 10 minutes</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
