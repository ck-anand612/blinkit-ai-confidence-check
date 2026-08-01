import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';

export const Header = () => {
  const { cartCount, cartTotal } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#F8C537] border-b border-amber-300 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3.5 h-12 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="bg-[#0C831F] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            Blinkit Confidence Guarantee
          </span>
        </Link>

        <div className="flex items-center space-x-2.5">
          <div className="hidden md:flex items-center space-x-1.5 bg-white/90 px-3 py-1 rounded-full border border-amber-200 text-xs font-bold text-[#1F1F1F] shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0C831F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0C831F]"></span>
            </span>
            <span>⚡ 10 mins</span>
          </div>

          <Link
            to="/cart"
            className="flex items-center space-x-1.5 bg-[#0C831F] hover:bg-[#0A701A] text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-2xs group active:scale-95"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>{cartCount > 0 ? `${cartCount} • ₹${cartTotal}` : 'Cart'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
