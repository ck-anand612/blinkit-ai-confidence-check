import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { getBrandedFallbackImage } from '../utils/imageUtils';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, grandTotal, placeOrder } = useCart();
  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [customAddress, setCustomAddress] = useState('Flat 402, Sunshine Apartments, Green Glen Layout, Bellandur, Bengaluru - 560103');
  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const [isPlacing, setIsPlacing] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-900">No items to checkout</h2>
        <Link to="/" className="inline-block bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      placeOrder({
        address: selectedAddress === 'Home' ? customAddress : 'Office 201, Tech Park, Outer Ring Road, Bengaluru',
        paymentMethod: selectedPayment === 'UPI' ? 'UPI (Google Pay)' : selectedPayment === 'CARD' ? 'Credit/Debit Card' : 'Cash on Delivery'
      });
      navigate('/order-success');
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-28">
      <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
        <Link to="/cart" className="hover:text-emerald-700">Cart</Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">Checkout</span>
      </div>

      <h1 className="text-2xl font-extrabold text-gray-900">Checkout</h1>

      {/* 1. Delivery Address */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-700 text-lg font-bold">📍</span>
            <h2 className="font-bold text-base text-gray-900">Delivery Address</h2>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
            ⚡ 10-15 Mins
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setSelectedAddress('Home')}
            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
              selectedAddress === 'Home'
                ? 'border-emerald-700 bg-emerald-50/50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-gray-900">🏠 Home</span>
              {selectedAddress === 'Home' && <span className="text-emerald-700 text-xs font-bold">✓</span>}
            </div>
            <textarea
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-xs text-gray-600 bg-transparent border-0 focus:ring-0 p-0 resize-none h-14"
            />
          </div>

          <div
            onClick={() => setSelectedAddress('Work')}
            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
              selectedAddress === 'Work'
                ? 'border-emerald-700 bg-emerald-50/50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-gray-900">🏢 Work</span>
              {selectedAddress === 'Work' && <span className="text-emerald-700 text-xs font-bold">✓</span>}
            </div>
            <p className="text-xs text-gray-600">
              Office 201, Tech Park, Outer Ring Road, Bengaluru - 560103
            </p>
          </div>
        </div>
      </div>

      {/* 2. Payment Method */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-emerald-700 text-lg font-bold">💳</span>
          <h2 className="font-bold text-base text-gray-900">Select Payment Method</h2>
        </div>

        <div className="space-y-2.5">
          <label className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
            selectedPayment === 'UPI' ? 'border-emerald-700 bg-emerald-50/40' : 'border-gray-100 hover:border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'UPI'}
                onChange={() => setSelectedPayment('UPI')}
                className="text-emerald-700 focus:ring-emerald-600 h-4 w-4"
              />
              <div>
                <span className="font-bold text-xs text-gray-900 block">UPI (Google Pay, PhonePe, Paytm)</span>
                <span className="text-[11px] text-gray-500">Instant refund eligible • Recommended</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700">⚡ Fast</span>
          </label>

          <label className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
            selectedPayment === 'CARD' ? 'border-emerald-700 bg-emerald-50/40' : 'border-gray-100 hover:border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'CARD'}
                onChange={() => setSelectedPayment('CARD')}
                className="text-emerald-700 focus:ring-emerald-600 h-4 w-4"
              />
              <div>
                <span className="font-bold text-xs text-gray-900 block">Credit / Debit Card</span>
                <span className="text-[11px] text-gray-500">Visa, Mastercard, RuPay, Amex</span>
              </div>
            </div>
          </label>

          <label className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
            selectedPayment === 'COD' ? 'border-emerald-700 bg-emerald-50/40' : 'border-gray-100 hover:border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === 'COD'}
                onChange={() => setSelectedPayment('COD')}
                className="text-emerald-700 focus:ring-emerald-600 h-4 w-4"
              />
              <div>
                <span className="font-bold text-xs text-gray-900 block">Cash on Delivery</span>
                <span className="text-[11px] text-gray-500">Pay cash or UPI to delivery partner</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* 3. Order Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
        <h2 className="font-bold text-base text-gray-900 border-b border-gray-100 pb-2">Order Summary ({cartItems.length} Items)</h2>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center space-x-2">
                <img
                  src={product.images && product.images.length > 0 && product.images[0] ? product.images[0] : getBrandedFallbackImage(product.name)}
                  alt={product.name}
                  className="w-8 h-8 object-contain rounded bg-gray-50 p-0.5 border"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getBrandedFallbackImage(product.name);
                  }}
                />
                <span className="font-medium text-gray-800 line-clamp-1">{quantity}x {product.name}</span>
              </div>
              <span className="font-bold text-gray-900 shrink-0 ml-2">₹{product.price * quantity}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm font-extrabold text-gray-900">Total Payable</span>
          <span className="text-lg font-extrabold text-emerald-700">₹{grandTotal}</span>
        </div>
      </div>

      {/* Sticky Place Order Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-xl z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 block font-medium">Paying via {selectedPayment}</span>
            <span className="text-lg font-extrabold text-gray-900">₹{grandTotal}</span>
          </div>

          <button
            type="button"
            disabled={isPlacing}
            onClick={handlePlaceOrder}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm px-10 py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center space-x-2"
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
