import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { getProductImageUrl, handleImageLoadError, handleImageLoadCheck } from '../utils/imageUtils';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartTotal, deliveryCharge, handlingFee, grandTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F8F8F8] text-[#1F1F1F] flex flex-col items-center justify-center p-6 text-center space-y-3 font-sans h-full">
        <div className="w-14 h-14 bg-[#FFFFFF] border border-[#E5E5E5] rounded-full flex items-center justify-center text-xl shadow-2xs">
          🛒
        </div>
        <div className="space-y-0.5">
          <h2 className="text-base font-black text-[#1F1F1F]">Your Cart is Empty</h2>
          <p className="text-[11px] text-[#666666] max-w-xs mx-auto leading-snug">
            Explore our AI-verified skincare & beauty products with 10-minute delivery.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block bg-[#0C831F] hover:bg-[#0A701A] text-white font-black text-xs px-5 py-2 rounded-xl shadow-2xs transition-all active:scale-95"
        >
          Explore Catalog →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F8F8] text-[#1F1F1F] font-sans p-2.5 space-y-2 pb-14 relative">
      {/* Top Header & Delivery Info Banner */}
      <div className="bg-[#F3F4F6] text-[#1F1F1F] p-2 rounded-[14px] border border-[#E5E5E5] flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-1.5">
          <span className="material-symbols-outlined text-[#0C831F] text-base">bolt</span>
          <div>
            <h3 className="font-extrabold text-[11px] text-[#1F1F1F] leading-tight">Delivery in 10-15 minutes</h3>
            <p className="text-[9px] text-[#666666]">Nearest dark store • Sector 49</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-[9px] bg-[#FFFFFF] border border-[#E5E5E5] text-[#0C831F] font-extrabold px-2 py-0.5 rounded-lg hover:bg-[#F3F4F6] transition-colors shadow-2xs"
        >
          + Add More
        </button>
      </div>

      {/* Coupon Savings Card */}
      <div className="bg-[#F3F4F6] border border-[#E5E5E5] p-2 rounded-[14px] flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5">
          <span className="material-symbols-outlined text-[#0C831F] text-sm">local_offer</span>
          <div>
            <span className="font-black text-[#0C831F] block text-[10px]">₹25 Saved on Delivery</span>
            <span className="text-[9px] text-[#666666]">Free 10-min delivery applied</span>
          </div>
        </div>
        <span className="text-[9px] font-black text-[#0C831F] bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E5E5E5] uppercase shadow-2xs">
          APPLIED
        </span>
      </div>

      {/* Cart Items List */}
      <div className="bg-[#FFFFFF] rounded-[14px] border border-[#E5E5E5] overflow-hidden shadow-2xs">
        <div className="px-2.5 py-1.5 border-b border-[#E5E5E5] flex items-center justify-between bg-[#F3F4F6]">
          <h2 className="font-black text-[10px] text-[#1F1F1F] uppercase tracking-wider">Cart Items ({cartItems.length})</h2>
          <span className="text-[9px] text-[#0C831F] font-extrabold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[10px]">verified</span>
            100% Authentic
          </span>
        </div>

        <div className="divide-y divide-[#E5E5E5] max-h-36 overflow-y-auto scrollbar-none">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="p-2 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2 min-w-0">
                <img
                  src={getProductImageUrl(product)}
                  alt={product.name}
                  className="w-9 h-9 object-contain rounded-lg bg-[#F8F8F8] border border-[#E5E5E5] p-0.5 shrink-0"
                  onLoad={(e) => handleImageLoadCheck(e, product.name)}
                  onError={(e) => handleImageLoadError(e, product.name)}
                />
                <div className="min-w-0">
                  <span className="text-[8px] font-bold text-[#666666] uppercase tracking-wider block truncate">
                    {product.brand}
                  </span>
                  <Link to={`/products/${product.id}`} className="font-bold text-[11px] text-[#1F1F1F] hover:text-[#0C831F] line-clamp-1 leading-tight">
                    {product.name}
                  </Link>
                  <p className="text-[11px] font-black text-[#1F1F1F]">₹{product.price}</p>
                </div>
              </div>

              {/* Quantity Selector & Remove Button */}
              <div className="flex items-center space-x-1.5 shrink-0">
                <div className="flex items-center bg-[#0C831F] text-white rounded-md px-1.5 py-0.5 space-x-1.5 font-bold text-[11px] shadow-2xs">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, -1)}
                    className="hover:bg-black/20 px-1 rounded transition-colors"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, 1)}
                    className="hover:bg-black/20 px-1 rounded transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="text-[#666666] hover:text-[#EF4444] transition-colors p-0.5"
                  title="Remove item"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Details */}
      <div className="bg-[#FFFFFF] rounded-[14px] border border-[#E5E5E5] p-2.5 space-y-1.5 text-xs text-[#666666] shadow-2xs">
        <h3 className="font-black text-[10px] text-[#1F1F1F] uppercase tracking-wider border-b border-[#E5E5E5] pb-1">
          Bill Details
        </h3>
        
        <div className="flex justify-between text-[11px] text-[#666666]">
          <span>Item Total</span>
          <span className="font-bold text-[#1F1F1F]">₹{cartTotal}</span>
        </div>

        <div className="flex justify-between text-[11px] text-[#666666]">
          <span>Delivery Charge</span>
          {deliveryCharge === 0 ? (
            <span className="font-bold text-[#0C831F]">FREE <span className="line-through font-normal text-[#666666]">₹25</span></span>
          ) : (
            <span className="font-bold text-[#1F1F1F]">₹{deliveryCharge}</span>
          )}
        </div>

        <div className="flex justify-between text-[11px] text-[#666666]">
          <span>Handling Fee</span>
          <span className="font-bold text-[#1F1F1F]">₹{handlingFee}</span>
        </div>

        <div className="pt-1 border-t border-[#E5E5E5] flex justify-between text-xs font-black text-[#1F1F1F]">
          <span>To Pay</span>
          <span className="text-sm font-black text-[#1F1F1F]">₹{grandTotal}</span>
        </div>
      </div>

      {/* Fixed Sticky Bottom Checkout Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-[#FFFFFF] border-t border-[#E5E5E5] px-3 py-2 shadow-lg z-40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#666666] font-semibold block">Grand Total</span>
            <span className="text-sm font-black text-[#1F1F1F]">₹{grandTotal}</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="bg-[#0C831F] hover:bg-[#0A701A] text-white font-black text-xs px-5 py-2 rounded-xl shadow-2xs transition-all active:scale-95 flex items-center space-x-1"
          >
            <span>Proceed to Checkout</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
