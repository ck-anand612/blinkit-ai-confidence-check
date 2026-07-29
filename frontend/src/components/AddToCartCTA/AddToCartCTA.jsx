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
    <div className="absolute bottom-0 left-0 w-full bg-[#1A1A1A] border-t border-white/10 px-4 py-3 z-40 flex items-center justify-between shadow-2xl">
      {/* Price Section */}
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold text-[#B8B8B8] line-through">
          ₹{Math.round(itemPrice * 1.25)}
        </span>
        <span className="text-lg font-black text-white leading-tight">
          ₹{itemPrice}
        </span>
      </div>

      <div className="flex items-center gap-2 relative">
        {addedNotice && (
          <p className="text-[10px] text-[#18C37E] font-bold absolute -top-8 right-0 bg-[#142A22] px-2.5 py-0.5 rounded-full border border-[#18C37E]/40 whitespace-nowrap animate-bounce">
            ✓ Added to Cart!
          </p>
        )}

        {quantity > 0 ? (
          <div className="flex items-center bg-[#18C37E] text-black rounded-xl px-3 py-2 space-x-3 font-black text-xs shadow-md">
            <button
              type="button"
              onClick={() => handleQuantity(-1)}
              className="hover:bg-black/10 px-1.5 py-0.5 rounded transition-colors text-sm"
            >
              -
            </button>
            <span>{quantity} in Cart</span>
            <button
              type="button"
              onClick={() => handleQuantity(1)}
              className="hover:bg-black/10 px-1.5 py-0.5 rounded transition-colors text-sm"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-[#F8C537] hover:bg-[#e2bd00] text-[#121212] font-black text-xs px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all duration-200 active:scale-95"
          >
            <span>ADD TO CART</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        )}

        {cartCount > 0 && (
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="bg-[#18C37E] hover:bg-[#15b072] text-black font-black text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1 shadow-md transition-all active:scale-95"
          >
            <span>Cart ({cartCount})</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AddToCartCTA;
