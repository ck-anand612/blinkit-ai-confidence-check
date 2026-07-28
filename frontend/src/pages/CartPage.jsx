import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { getProductImageUrl, handleImageLoadError, handleImageLoadCheck } from '../utils/imageUtils';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartTotal, deliveryCharge, handlingFee, grandTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
          🛒
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900">Your Cart is Empty</h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Looks like you haven't added any products to your cart yet. Explore our high-confidence skincare & beauty collection!
        </p>
        <Link
          to="/"
          className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 text-sm"
        >
          Explore Catalog →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Top Banner */}
      <div className="bg-emerald-800 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">⚡</span>
          <div>
            <h3 className="font-extrabold text-sm">Delivery in 10-15 minutes</h3>
            <p className="text-xs text-emerald-200">Shipment from nearest dark store • Bellandur</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-xs bg-emerald-700 hover:bg-emerald-600 font-bold px-3 py-1.5 rounded-lg transition-colors"
        >
          + Add More
        </button>
      </div>

      {/* Cart Items List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-base text-gray-900">Items ({cartItems.length})</h2>
          <span className="text-xs text-gray-400 font-medium">Verified Authentic Stock</span>
        </div>

        <div className="divide-y divide-gray-100">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <img
                  src={getProductImageUrl(product)}
                  alt={product.name}
                  className="w-16 h-16 object-contain rounded-lg bg-gray-50 border border-gray-100 p-1 shrink-0"
                  onLoad={(e) => handleImageLoadCheck(e, product.name)}
                  onError={(e) => handleImageLoadError(e, product.name)}
                />
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    {product.brand}
                  </span>
                  <Link to={`/products/${product.id}`} className="font-semibold text-xs text-gray-900 hover:text-emerald-700 line-clamp-1">
                    {product.name}
                  </Link>
                  <p className="text-xs font-bold text-gray-900 mt-1">₹{product.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <div className="flex items-center bg-emerald-700 text-white rounded-lg px-2.5 py-1 space-x-2.5 font-bold text-xs shadow-sm">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, -1)}
                    className="hover:bg-emerald-800 px-1 rounded transition-colors"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, 1)}
                    className="hover:bg-emerald-800 px-1 rounded transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
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
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-3">
        <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">Bill Details</h3>
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>Item Total</span>
          <span className="font-semibold text-gray-900">₹{cartTotal}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-600">
          <span>Delivery Charge</span>
          {deliveryCharge === 0 ? (
            <span className="font-bold text-emerald-700">FREE <span className="line-through font-normal text-gray-400">₹25</span></span>
          ) : (
            <span className="font-semibold text-gray-900">₹{deliveryCharge}</span>
          )}
        </div>

        <div className="flex justify-between text-xs text-gray-600">
          <span>Handling Charge</span>
          <span className="font-semibold text-gray-900">₹{handlingFee}</span>
        </div>

        <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-gray-900">
          <span>To Pay</span>
          <span className="text-base text-emerald-700">₹{grandTotal}</span>
        </div>
      </div>

      {/* Sticky Checkout Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-xl z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium block">Total Amount</span>
            <span className="text-lg font-extrabold text-gray-900">₹{grandTotal}</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center space-x-2"
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
