import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/useCart';

export const BottomNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  const isHome = location.pathname === '/';
  const isCart = location.pathname === '/cart';

  return (
    <div className="absolute bottom-0 left-0 w-full bg-[#1A1A1A] border-t border-white/10 z-50 px-3 py-2 flex items-center justify-around text-[10px] font-semibold">
      <Link
        to="/"
        className={`flex flex-col items-center space-y-1 transition-colors ${
          isHome ? 'text-[#F8C537] font-black' : 'text-[#B8B8B8] hover:text-white'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: isHome ? "'FILL' 1" : "'FILL' 0" }}
        >
          home
        </span>
        <span>Home</span>
      </Link>

      <div className="flex flex-col items-center space-y-1 text-[#B8B8B8] hover:text-white cursor-pointer">
        <span className="material-symbols-outlined text-xl">shopping_bag</span>
        <span>Order Again</span>
      </div>

      <div className="flex flex-col items-center space-y-1 text-[#B8B8B8] hover:text-white cursor-pointer">
        <span className="material-symbols-outlined text-xl">grid_view</span>
        <span>Categories</span>
      </div>

      <div className="flex flex-col items-center space-y-1 text-[#B8B8B8] hover:text-white cursor-pointer">
        <span className="material-symbols-outlined text-xl">print</span>
        <span>Print</span>
      </div>

      <Link
        to="/cart"
        className={`flex flex-col items-center space-y-1 relative transition-colors ${
          isCart ? 'text-[#F8C537] font-black' : 'text-[#B8B8B8] hover:text-white'
        }`}
      >
        <div className="relative">
          <span
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: isCart ? "'FILL' 1" : "'FILL' 0" }}
          >
            shopping_cart
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#18C37E] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
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
