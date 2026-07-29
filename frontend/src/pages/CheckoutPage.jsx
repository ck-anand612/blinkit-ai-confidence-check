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
      <div className="bg-[#F8F8F8] text-[#1F1F1F] flex flex-col items-center justify-center p-6 text-center space-y-3 font-sans h-full">
        <h2 className="text-base font-black text-[#1F1F1F]">No items to checkout</h2>
        <Link to="/" className="inline-block bg-[#0C831F] text-white px-5 py-2 rounded-xl font-black text-xs shadow-2xs">
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
    <div className="bg-[#F8F8F8] text-[#1F1F1F] font-sans p-2.5 space-y-2 pb-14 relative">
      {/* Breadcrumb Header */}
      <div className="flex items-center space-x-1.5 text-[10px] font-bold text-[#666666]">
        <Link to="/cart" className="hover:text-[#1F1F1F]">Cart</Link>
        <span>/</span>
        <span className="text-[#0C831F] font-extrabold">Checkout</span>
      </div>

      {/* Top Delivery Header Banner */}
      <div className="bg-[#F3F4F6] text-[#1F1F1F] p-2 rounded-[14px] border border-[#E5E5E5] flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-1.5">
          <span className="material-symbols-outlined text-[#0C831F] text-base">bolt</span>
          <div>
            <h1 className="text-[11px] font-extrabold text-[#1F1F1F] leading-tight">Checkout Order</h1>
            <p className="text-[9px] text-[#666666]">Fast 10-15 Min Delivery • Sector 49</p>
          </div>
        </div>
        <span className="bg-[#FFFFFF] text-[#0C831F] text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-[#E5E5E5] uppercase shadow-2xs">
          10 Mins SLA
        </span>
      </div>

      {/* 1. Delivery Address */}
      <div className="bg-[#FFFFFF] rounded-[14px] border border-[#E5E5E5] p-2.5 shadow-2xs space-y-1.5">
        <div className="flex items-center space-x-1 border-b border-[#E5E5E5] pb-1">
          <span className="material-symbols-outlined text-[#0C831F] text-sm">location_on</span>
          <h2 className="font-black text-[10px] text-[#1F1F1F] uppercase tracking-wider">Delivery Address</h2>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <div
            onClick={() => setSelectedAddress('Home')}
            className={`p-2 rounded-lg border cursor-pointer transition-all ${
              selectedAddress === 'Home'
                ? 'border-[#0C831F] bg-[#F3F4F6] shadow-2xs'
                : 'border-[#E5E5E5] bg-[#FFFFFF] hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-bold text-[10px] text-[#1F1F1F]">🏠 Home</span>
              {selectedAddress === 'Home' && <span className="text-[#0C831F] text-[10px] font-black">✓</span>}
            </div>
            <p className="text-[9px] text-[#666666] leading-tight line-clamp-2">
              {customAddress}
            </p>
          </div>

          <div
            onClick={() => setSelectedAddress('Work')}
            className={`p-2 rounded-lg border cursor-pointer transition-all ${
              selectedAddress === 'Work'
                ? 'border-[#0C831F] bg-[#F3F4F6] shadow-2xs'
                : 'border-[#E5E5E5] bg-[#FFFFFF] hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-bold text-[10px] text-[#1F1F1F]">🏢 Work</span>
              {selectedAddress === 'Work' && <span className="text-[#0C831F] text-[10px] font-black">✓</span>}
            </div>
            <p className="text-[9px] text-[#666666] leading-tight line-clamp-2">
              Office 201, Tech Park, Gurgaon
            </p>
          </div>
        </div>
      </div>

      {/* 2. Payment Method */}
      <div className="bg-[#FFFFFF] rounded-[14px] border border-[#E5E5E5] p-2.5 shadow-2xs space-y-1.5">
        <div className="flex items-center space-x-1 border-b border-[#E5E5E5] pb-1">
          <span className="material-symbols-outlined text-[#0C831F] text-sm">credit_card</span>
          <h2 className="font-black text-[10px] text-[#1F1F1F] uppercase tracking-wider">Select Payment Method</h2>
        </div>

        <div className="space-y-1">
          <label className={`flex items-center justify-between p-1.5 rounded-lg border cursor-pointer transition-all ${
            selectedPayment === 'UPI' ? 'border-[#0C831F] bg-[#F3F4F6]' : 'border-[#E5E5E5] bg-[#FFFFFF] hover:border-gray-400'
          }`}>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'UPI'}
                onChange={() => setSelectedPayment('UPI')}
                className="text-[#0C831F] focus:ring-0 h-3 w-3"
              />
              <div>
                <span className="font-bold text-[10px] text-[#1F1F1F] block">UPI (GPay, PhonePe, Paytm)</span>
                <span className="text-[9px] text-[#666666]">Instant refund eligible</span>
              </div>
            </div>
            <span className="text-[8px] font-black text-[#0C831F] bg-[#FFFFFF] border border-[#E5E5E5] px-1.5 py-0.5 rounded uppercase">⚡ FAST</span>
          </label>

          <label className={`flex items-center justify-between p-1.5 rounded-lg border cursor-pointer transition-all ${
            selectedPayment === 'CARD' ? 'border-[#0C831F] bg-[#F3F4F6]' : 'border-[#E5E5E5] bg-[#FFFFFF] hover:border-gray-400'
          }`}>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'CARD'}
                onChange={() => setSelectedPayment('CARD')}
                className="text-[#0C831F] focus:ring-0 h-3 w-3"
              />
              <div>
                <span className="font-bold text-[10px] text-[#1F1F1F] block">Credit / Debit Card</span>
                <span className="text-[9px] text-[#666666]">Visa, Mastercard, RuPay</span>
              </div>
            </div>
          </label>

          <label className={`flex items-center justify-between p-1.5 rounded-lg border cursor-pointer transition-all ${
            selectedPayment === 'COD' ? 'border-[#0C831F] bg-[#F3F4F6]' : 'border-[#E5E5E5] bg-[#FFFFFF] hover:border-gray-400'
          }`}>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'COD'}
                onChange={() => setSelectedPayment('COD')}
                className="text-[#0C831F] focus:ring-0 h-3 w-3"
              />
              <div>
                <span className="font-bold text-[10px] text-[#1F1F1F] block">Cash on Delivery</span>
                <span className="text-[9px] text-[#666666]">Pay cash/UPI at delivery</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* 3. Order Summary */}
      <div className="bg-[#FFFFFF] rounded-[14px] border border-[#E5E5E5] p-2.5 shadow-2xs space-y-1.5">
        <h2 className="font-black text-[10px] text-[#1F1F1F] uppercase tracking-wider border-b border-[#E5E5E5] pb-1">
          Order Summary ({cartItems.length} Items)
        </h2>

        <div className="space-y-1 max-h-24 overflow-y-auto pr-0.5 scrollbar-none">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between text-[11px] py-0.5">
              <div className="flex items-center space-x-1.5 min-w-0">
                <img
                  src={getProductImageUrl(product)}
                  alt={product.name}
                  className="w-6 h-6 object-contain rounded bg-[#F8F8F8] p-0.5 border border-[#E5E5E5] shrink-0"
                  onLoad={(e) => handleImageLoadCheck(e, product.name)}
                  onError={(e) => handleImageLoadError(e, product.name)}
                />
                <span className="font-medium text-[#1F1F1F] truncate">{quantity}x {product.name}</span>
              </div>
              <span className="font-bold text-[#1F1F1F] shrink-0 ml-1">₹{product.price * quantity}</span>
            </div>
          ))}
        </div>

        <div className="pt-1 border-t border-[#E5E5E5] flex justify-between items-center text-xs font-black">
          <span className="text-[#1F1F1F]">Total Payable</span>
          <span className="text-sm text-[#1F1F1F] font-black">₹{grandTotal}</span>
        </div>
      </div>

      {/* Sticky Place Order Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-[#FFFFFF] border-t border-[#E5E5E5] px-3 py-2 shadow-lg z-40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#666666] font-semibold block">Paying via {selectedPayment}</span>
            <span className="text-sm font-black text-[#1F1F1F]">₹{grandTotal}</span>
          </div>

          <button
            type="button"
            disabled={isPlacing}
            onClick={handlePlaceOrder}
            className="bg-[#0C831F] hover:bg-[#0A701A] disabled:opacity-50 text-white font-black text-xs px-5 py-2 rounded-xl shadow-2xs transition-all active:scale-95 flex items-center space-x-1"
          >
            {isPlacing ? (
              <span>Placing...</span>
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
