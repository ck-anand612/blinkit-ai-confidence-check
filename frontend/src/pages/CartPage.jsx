import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { getProductImageUrl, handleImageLoadError, handleImageLoadCheck } from '../utils/imageUtils';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartTotal, deliveryCharge, handlingFee, grandTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#121212] min-h-screen text-white flex flex-col items-center justify-center p-6 text-center space-y-5 font-sans">
        <div className="w-20 h-20 bg-[#1E1E1E] border border-white/10 rounded-full flex items-center justify-center text-3xl shadow-lg">
          🛒
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white">Your Cart is Empty</h2>
          <p className="text-xs text-[#B8B8B8] max-w-xs mx-auto">
            Explore our AI-verified skincare & beauty products with 10-minute delivery.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block bg-[#F8C537] hover:bg-[#e2bd00] text-[#121212] font-black text-xs px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
        >
          Explore Catalog →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans p-4 space-y-4 pb-28">
      {/* Top Header & Delivery Info */}
      <div className="bg-gradient-to-r from-[#2B0D0D] via-[#1E0909] to-[#142A22] text-white p-3.5 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2.5">
          <span className="material-symbols-outlined text-[#F8C537] text-xl">bolt</span>
          <div>
            <h3 className="font-black text-xs text-white">Delivery in 10-15 minutes</h3>
            <p className="text-[10px] text-[#B8B8B8]">Shipment from nearest dark store • Sector 49</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-[10px] bg-[#1E1E1E] hover:bg-[#2A2A2A] border border-white/10 text-[#F8C537] font-extrabold px-2.5 py-1.5 rounded-xl transition-colors"
        >
          + Add More
        </button>
      </div>

      {/* Coupon Savings Card */}
      <div className="bg-[#142A22] border border-[#18C37E]/40 p-3 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-[#18C37E] text-base">local_offer</span>
          <div>
            <span className="font-black text-[#18C37E] block text-[11px]">₹25 Saved on Delivery</span>
            <span className="text-[10px] text-[#B8B8B8]">Free 10-min delivery offer applied</span>
          </div>
        </div>
        <span className="text-[10px] font-black text-[#18C37E] bg-[#18C37E]/20 px-2 py-0.5 rounded-md border border-[#18C37E]/30 uppercase">
          APPLIED
        </span>
      </div>

      {/* Cart Items List */}
      <div className="bg-[#1E1E1E] rounded-2xl border border-white/10 overflow-hidden shadow-sm">
        <div className="p-3.5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-black text-xs text-white uppercase tracking-wider">Cart Items ({cartItems.length})</h2>
          <span className="text-[10px] text-[#18C37E] font-bold">100% Authentic Stock</span>
        </div>

        <div className="divide-y divide-white/10">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <img
                  src={getProductImageUrl(product)}
                  alt={product.name}
                  className="w-14 h-14 object-contain rounded-xl bg-[#1A1A1A] border border-white/10 p-1 shrink-0"
                  onLoad={(e) => handleImageLoadCheck(e, product.name)}
                  onError={(e) => handleImageLoadError(e, product.name)}
                />
                <div>
                  <span className="text-[9px] font-extrabold text-[#B8B8B8] uppercase tracking-wider block">
                    {product.brand}
                  </span>
                  <Link to={`/products/${product.id}`} className="font-bold text-xs text-white hover:text-[#F8C537] line-clamp-1">
                    {product.name}
                  </Link>
                  <p className="text-xs font-black text-white mt-0.5">₹{product.price}</p>
                </div>
              </div>

              {/* Quantity Selector & Remove Button */}
              <div className="flex items-center space-x-2 shrink-0">
                <div className="flex items-center bg-[#18C37E] text-black rounded-xl px-2 py-1 space-x-2 font-black text-xs shadow-sm">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, -1)}
                    className="hover:bg-black/10 px-1 rounded transition-colors"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, 1)}
                    className="hover:bg-black/10 px-1 rounded transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="text-[#B8B8B8] hover:text-red-400 transition-colors p-1"
                  title="Remove item"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Details */}
      <div className="bg-[#1E1E1E] rounded-2xl border border-white/10 p-3.5 space-y-2.5 shadow-sm">
        <h3 className="font-black text-xs text-white uppercase tracking-wider border-b border-white/10 pb-2">
          Bill Details
        </h3>
        
        <div className="flex justify-between text-xs text-[#B8B8B8]">
          <span>Item Total</span>
          <span className="font-bold text-white">₹{cartTotal}</span>
        </div>

        <div className="flex justify-between text-xs text-[#B8B8B8]">
          <span>Delivery Charge</span>
          {deliveryCharge === 0 ? (
            <span className="font-black text-[#18C37E]">FREE <span className="line-through font-normal text-[#B8B8B8]">₹25</span></span>
          ) : (
            <span className="font-bold text-white">₹{deliveryCharge}</span>
          )}
        </div>

        <div className="flex justify-between text-xs text-[#B8B8B8]">
          <span>Handling Fee</span>
          <span className="font-bold text-white">₹{handlingFee}</span>
        </div>

        <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-white">
          <span>To Pay</span>
          <span className="text-base font-black text-[#F8C537]">₹{grandTotal}</span>
        </div>
      </div>

      {/* Fixed Sticky Bottom Checkout Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-[#1A1A1A] border-t border-white/10 p-3.5 shadow-2xl z-40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#B8B8B8] font-semibold block">Grand Total</span>
            <span className="text-base font-black text-white">₹{grandTotal}</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="bg-[#F8C537] hover:bg-[#e2bd00] text-[#121212] font-black text-xs px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
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
