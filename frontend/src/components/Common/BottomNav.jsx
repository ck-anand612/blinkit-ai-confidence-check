import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/useCart';

export const BottomNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  const isHome = location.pathname === '/';
  const isCart = location.pathname === '/cart';

  return (
    <div className="absolute bottom-0 left-0 w-full bg-[#FFFFFF] border-t border-[#E5E5E5] z-50 px-3 py-2 flex items-center justify-around text-[10px] font-semibold text-[#666666] shadow-xs">
      <Link
        to="/"
        className={`flex flex-col items-center space-y-0.5 transition-colors ${
          isHome ? 'text-[#0C831F] font-extrabold' : 'text-[#666666] hover:text-[#1F1F1F]'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl text-[#2F2F2F]"
          style={{ fontVariationSettings: isHome ? "'FILL' 1" : "'FILL' 0", color: isHome ? '#0C831F' : '#2F2F2F' }}
        >
          home
        </span>
        <span>Home</span>
      </Link>

      <div className="flex flex-col items-center space-y-0.5 text-[#666666] hover:text-[#1F1F1F] cursor-pointer">
        <span className="material-symbols-outlined text-xl text-[#2F2F2F]">shopping_bag</span>
        <span>Order Again</span>
      </div>

      <div className="flex flex-col items-center space-y-0.5 text-[#666666] hover:text-[#1F1F1F] cursor-pointer">
        <span className="material-symbols-outlined text-xl text-[#2F2F2F]">grid_view</span>
        <span>Categories</span>
      </div>

      <div className="flex flex-col items-center space-y-0.5 text-[#666666] hover:text-[#1F1F1F] cursor-pointer">
        <span className="material-symbols-outlined text-xl text-[#2F2F2F]">print</span>
        <span>Print</span>
      </div>

      <Link
        to="/cart"
        className={`flex flex-col items-center space-y-0.5 relative transition-colors ${
          isCart ? 'text-[#0C831F] font-extrabold' : 'text-[#666666] hover:text-[#1F1F1F]'
        }`}
      >
        <div className="relative">
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: isCart ? "'FILL' 1" : "'FILL' 0", color: isCart ? '#0C831F' : '#2F2F2F' }}
          >
            shopping_cart
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#0C831F] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </Link>
    </div>
  );
};

export default BottomNav;
