import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { getProductImageUrl, handleImageLoadError, handleImageLoadCheck } from '../utils/imageUtils';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, grandTotal, placeOrder } = useCart();
  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [customAddress, setCustomAddress] = useState('Flat 402, Sunshine Apartments, Green Glen Layout, Sector 49, Gurgaon - 122003');
  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const [isPlacing, setIsPlacing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#121212] min-h-screen text-white flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans">
        <h2 className="text-lg font-black text-white">No items to checkout</h2>
        <Link to="/" className="inline-block bg-[#F8C537] text-[#121212] px-6 py-2.5 rounded-xl font-black text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      placeOrder({
        address: selectedAddress === 'Home' ? customAddress : 'Office 201, Tech Park, Outer Ring Road, Gurgaon',
        paymentMethod: selectedPayment === 'UPI' ? 'UPI (Google Pay)' : selectedPayment === 'CARD' ? 'Credit/Debit Card' : 'Cash on Delivery'
      });
      navigate('/order-success');
    }, 800);
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans p-4 space-y-4 pb-28">
      {/* Breadcrumb Header */}
      <div className="flex items-center space-x-2 text-xs font-bold text-[#B8B8B8]">
        <Link to="/cart" className="hover:text-white">Cart</Link>
        <span>/</span>
        <span className="text-[#F8C537] font-black">Checkout</span>
      </div>

      {/* Top Delivery Header Banner */}
      <div className="bg-gradient-to-r from-[#2B0D0D] via-[#1E0909] to-[#142A22] text-white p-3.5 rounded-2xl border border-white/10 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-[#F8C537] text-xl">bolt</span>
          <div>
            <h1 className="text-sm font-black text-white leading-tight">Checkout Order</h1>
            <p className="text-[10px] text-[#B8B8B8]">Fast 10-15 Min Delivery • Sector 49</p>
          </div>
        </div>
        <span className="bg-[#18C37E]/20 text-[#18C37E] text-[10px] font-black px-2.5 py-1 rounded-full border border-[#18C37E]/30 uppercase">
          10 Mins SLA
        </span>
      </div>

      {/* 1. Delivery Address */}
      <div className="bg-[#1E1E1E] rounded-2xl border border-white/10 p-4 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <span className="material-symbols-outlined text-[#F8C537] text-lg">location_on</span>
          <h2 className="font-black text-xs text-white uppercase tracking-wider">Delivery Address</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div
            onClick={() => setSelectedAddress('Home')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              selectedAddress === 'Home'
                ? 'border-[#18C37E] bg-[#142A22] shadow-sm'
                : 'border-white/10 bg-[#1A1A1A]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-white">🏠 Home</span>
              {selectedAddress === 'Home' && <span className="text-[#18C37E] text-xs font-black">✓</span>}
            </div>
            <textarea
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-[11px] text-[#B8B8B8] bg-transparent border-0 focus:outline-none p-0 resize-none h-12"
            />
          </div>

          <div
            onClick={() => setSelectedAddress('Work')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              selectedAddress === 'Work'
                ? 'border-[#18C37E] bg-[#142A22] shadow-sm'
                : 'border-white/10 bg-[#1A1A1A]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-white">🏢 Work</span>
              {selectedAddress === 'Work' && <span className="text-[#18C37E] text-xs font-black">✓</span>}
            </div>
            <p className="text-[11px] text-[#B8B8B8]">
              Office 201, Tech Park, Outer Ring Road, Gurgaon - 122003
            </p>
          </div>
        </div>
      </div>

      {/* 2. Payment Method */}
      <div className="bg-[#1E1E1E] rounded-2xl border border-white/10 p-4 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <span className="material-symbols-outlined text-[#F8C537] text-lg">credit_card</span>
          <h2 className="font-black text-xs text-white uppercase tracking-wider">Select Payment Method</h2>
        </div>

        <div className="space-y-2">
          <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
            selectedPayment === 'UPI' ? 'border-[#18C37E] bg-[#142A22]' : 'border-white/10 bg-[#1A1A1A]'
          }`}>
            <div className="flex items-center space-x-2.5">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'UPI'}
                onChange={() => setSelectedPayment('UPI')}
                className="text-[#18C37E] focus:ring-0 h-3.5 w-3.5"
              />
              <div>
                <span className="font-bold text-xs text-white block">UPI (Google Pay, PhonePe, Paytm)</span>
                <span className="text-[10px] text-[#B8B8B8]">Instant refund eligible • Recommended</span>
              </div>
            </div>
            <span className="text-[10px] font-black text-[#18C37E]">⚡ FAST</span>
          </label>

          <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
            selectedPayment === 'CARD' ? 'border-[#18C37E] bg-[#142A22]' : 'border-white/10 bg-[#1A1A1A]'
          }`}>
            <div className="flex items-center space-x-2.5">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'CARD'}
                onChange={() => setSelectedPayment('CARD')}
                className="text-[#18C37E] focus:ring-0 h-3.5 w-3.5"
              />
              <div>
                <span className="font-bold text-xs text-white block">Credit / Debit Card</span>
                <span className="text-[10px] text-[#B8B8B8]">Visa, Mastercard, RuPay, Amex</span>
              </div>
            </div>
          </label>

          <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
            selectedPayment === 'COD' ? 'border-[#18C37E] bg-[#142A22]' : 'border-white/10 bg-[#1A1A1A]'
          }`}>
            <div className="flex items-center space-x-2.5">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'COD'}
                onChange={() => setSelectedPayment('COD')}
                className="text-[#18C37E] focus:ring-0 h-3.5 w-3.5"
              />
              <div>
                <span className="font-bold text-xs text-white block">Cash on Delivery</span>
                <span className="text-[10px] text-[#B8B8B8]">Pay cash or UPI to delivery partner</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* 3. Order Summary */}
      <div className="bg-[#1E1E1E] rounded-2xl border border-white/10 p-4 shadow-sm space-y-2.5">
        <h2 className="font-black text-xs text-white uppercase tracking-wider border-b border-white/10 pb-2">
          Order Summary ({cartItems.length} Items)
        </h2>

        <div className="space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-none">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center space-x-2">
                <img
                  src={getProductImageUrl(product)}
                  alt={product.name}
                  className="w-8 h-8 object-contain rounded-lg bg-[#1A1A1A] p-0.5 border border-white/10 shrink-0"
                  onLoad={(e) => handleImageLoadCheck(e, product.name)}
                  onError={(e) => handleImageLoadError(e, product.name)}
                />
                <span className="font-medium text-white line-clamp-1">{quantity}x {product.name}</span>
              </div>
              <span className="font-bold text-white shrink-0 ml-2">₹{product.price * quantity}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-black">
          <span className="text-white">Total Payable</span>
          <span className="text-base text-[#F8C537]">₹{grandTotal}</span>
        </div>
      </div>

      {/* Sticky Place Order Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-[#1A1A1A] border-t border-white/10 p-3.5 shadow-2xl z-40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#B8B8B8] font-semibold block">Paying via {selectedPayment}</span>
            <span className="text-base font-black text-white">₹{grandTotal}</span>
          </div>

          <button
            type="button"
            disabled={isPlacing}
            onClick={handlePlaceOrder}
            className="bg-[#F8C537] hover:bg-[#e2bd00] disabled:opacity-50 text-[#121212] font-black text-xs px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
          >
            {isPlacing ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <span>Place Order</span>
                <span>⚡</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
