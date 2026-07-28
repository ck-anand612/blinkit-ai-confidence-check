import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { getBrandedFallbackImage } from '../utils/imageUtils';

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-900">No active order found</h2>
        <Link to="/" className="inline-block bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Success Hero */}
      <div className="bg-emerald-800 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl relative overflow-hidden">
        <div className="w-20 h-20 bg-yellow-400 text-emerald-900 rounded-full flex items-center justify-center mx-auto text-4xl font-black shadow-lg animate-bounce">
          ✓
        </div>
        <div className="space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-300">Order Confirmed</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Delivery in 10-15 Minutes ⚡</h1>
          <p className="text-xs text-emerald-200">Your order has been assigned to a Blinkit rider!</p>
        </div>

        {/* Delivery Progress Bar */}
        <div className="pt-4 max-w-sm mx-auto space-y-1.5">
          <div className="flex justify-between text-[11px] text-emerald-200 font-semibold">
            <span>Order Packed</span>
            <span>Rider Dispatched</span>
            <span className="text-yellow-300 font-bold">10 MINS</span>
          </div>
          <div className="w-full bg-emerald-900/60 rounded-full h-3 p-0.5 overflow-hidden border border-emerald-600/40">
            <div className="bg-gradient-to-r from-yellow-400 to-emerald-400 h-full rounded-full w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs text-gray-400 font-medium block">Order ID</span>
            <span className="font-mono font-extrabold text-sm text-gray-900">{lastOrder.orderId}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 font-medium block">Total Paid</span>
            <span className="font-extrabold text-base text-emerald-700">₹{lastOrder.totalAmount}</span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Delivery Address:</span>
            <span className="text-gray-900 font-semibold text-right max-w-xs">{lastOrder.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Payment Mode:</span>
            <span className="text-gray-900 font-semibold">{lastOrder.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Order Placed:</span>
            <span className="text-gray-900 font-semibold">{new Date(lastOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Ordered Items Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">Items Ordered</h3>
        <div className="space-y-3">
          {lastOrder.items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={product.images && product.images.length > 0 && product.images[0] ? product.images[0] : getBrandedFallbackImage(product.name)}
                  alt={product.name}
                  className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-1 border border-gray-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getBrandedFallbackImage(product.name);
                  }}
                />
                <div>
                  <h4 className="font-bold text-xs text-gray-900 line-clamp-1">{product.name}</h4>
                  <p className="text-[11px] text-gray-500">Qty: {quantity} • ₹{product.price} each</p>
                </div>
              </div>
              <span className="font-bold text-xs text-gray-900">₹{product.price * quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="text-center pt-2">
        <button
          onClick={() => navigate('/')}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
        >
          Continue Shopping →
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
