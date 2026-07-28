import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/useCart';

export const AddToCartCTA = ({ product, price }) => {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, cartCount } = useCart();
  const [addedNotice, setAddedNotice] = useState(false);

  const cartItem = product ? cartItems.find(item => item.product.id === product.id) : null;
  const quantity = cartItem ? cartItem.quantity : 0;
  const itemPrice = price || product?.price || 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2500);
    }
  };

  const handleQuantity = (delta) => {
    if (product) {
      updateQuantity(product.id, delta);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-[768px] md:left-1/2 md:-translate-x-1/2 bg-surface-container-lowest border-t border-surface-variant px-margin-mobile py-3 z-40 flex items-center justify-between shadow-lg">
      <div className="flex flex-col">
        {/* Mock original price */}
        <span className="font-label-sm text-label-sm text-on-surface-variant line-through">₹{Math.round(itemPrice * 1.2)}</span>
        <span className="font-headline-md text-headline-md text-on-background font-bold">₹{itemPrice}</span>
      </div>

      <div className="flex items-center gap-3 relative">
        {addedNotice && (
          <p className="text-[11px] text-emerald-700 font-bold absolute -top-9 right-0 bg-emerald-50 px-3 py-1 rounded-full shadow-sm border border-emerald-200 whitespace-nowrap animate-bounce">
            ✓ Added to Cart!
          </p>
        )}

        {quantity > 0 ? (
          <div className="flex items-center bg-emerald-700 text-white rounded-lg px-3 py-2 space-x-3 font-bold text-sm shadow-md">
            <button
              type="button"
              onClick={() => handleQuantity(-1)}
              className="hover:bg-emerald-800 px-2 py-0.5 rounded transition-colors text-base"
            >
              -
            </button>
            <span>{quantity} in Cart</span>
            <button
              type="button"
              onClick={() => handleQuantity(1)}
              className="hover:bg-emerald-800 px-2 py-0.5 rounded transition-colors text-base"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-[#f7d002] hover:bg-[#e2bd00] text-[#6b5900] font-label-lg text-label-lg font-bold px-7 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-sm border border-[#e6c100] active:scale-95"
          >
            <span>ADD TO CART</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        )}

        {cartCount > 0 && (
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-3 rounded-lg flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <span>View Cart ({cartCount})</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AddToCartCTA;
