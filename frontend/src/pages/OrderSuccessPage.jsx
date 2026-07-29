import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { getProductImageUrl, handleImageLoadError, handleImageLoadCheck } from '../utils/imageUtils';

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-3 font-sans bg-[#F8F8F8] h-full flex flex-col justify-center items-center text-[#1F1F1F]">
        <h2 className="text-base font-bold text-[#1F1F1F]">No active order found</h2>
        <Link to="/" className="inline-block bg-[#0C831F] text-white px-5 py-2 rounded-xl font-bold text-xs shadow-2xs">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F8F8] text-[#1F1F1F] font-sans pt-7 px-2.5 pb-6 space-y-2 relative">
      {/* Success Hero Banner (Success Green #16A34A with #F8C537 Check Badge) */}
      <div className="bg-[#16A34A] text-white p-3.5 rounded-[14px] text-center space-y-1.5 shadow-2xs relative overflow-hidden">
        <div className="w-10 h-10 bg-[#F8C537] text-[#1F1F1F] rounded-full flex items-center justify-center mx-auto text-base font-black shadow-inner">
          ✓
        </div>

        <div className="space-y-0.5">
          <span className="bg-white/20 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            Order Confirmed
          </span>
          <h1 className="text-base font-black tracking-tight">Order #{lastOrder.orderId || lastOrder.id} Placed!</h1>
          <p className="text-[10px] font-semibold text-emerald-100">
            Arriving in 10-15 minutes at {lastOrder.address?.split(',')[0]}
          </p>
        </div>

        {/* Live Delivery Progress Bar */}
        <div className="bg-white/20 p-1.5 rounded-lg text-left space-y-0.5">
          <div className="flex justify-between text-[9px] font-bold text-white">
            <span>⚡ Packing at dark store</span>
            <span>Est. 12 mins</span>
          </div>
          <div className="w-full bg-white/30 h-1 rounded-full overflow-hidden">
            <div className="bg-[#F8C537] h-full w-2/3 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-[#FFFFFF] rounded-[14px] border border-[#E5E5E5] p-2.5 shadow-2xs space-y-2">
        <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-1 text-[11px]">
          <span className="font-bold text-[#666666]">Payment Method</span>
          <span className="font-black text-[#1F1F1F]">{lastOrder.paymentMethod}</span>
        </div>

        {/* Item Breakdown */}
        <div className="space-y-1">
          <h3 className="font-black text-[10px] text-[#1F1F1F] uppercase tracking-wider">Items Ordered</h3>
          <div className="space-y-1 max-h-24 overflow-y-auto pr-0.5 scrollbar-none">
            {lastOrder.items?.map(({ product, quantity }) => (
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
        </div>

        <div className="pt-1 border-t border-[#E5E5E5] flex justify-between items-center text-xs font-black text-[#1F1F1F]">
          <span>Amount Paid</span>
          <span className="text-sm text-[#0C831F]">₹{lastOrder.totalAmount || lastOrder.grandTotal}</span>
        </div>
      </div>

      {/* AI Trust Confirmation Banner */}
      <div className="bg-[#F3F4F6] border border-[#E5E5E5] p-2 rounded-[14px] flex items-center space-x-1.5 text-[10px] text-[#1F1F1F] shadow-2xs">
        <span className="material-symbols-outlined text-[#0C831F] text-base">verified</span>
        <p className="text-[9px] leading-tight">
          <strong className="text-[#0C831F] font-black">AI Guarantee:</strong> Sealed authentic batch verified with 7-day returns.
        </p>
      </div>

      {/* Primary Action Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full bg-[#0C831F] hover:bg-[#0A701A] text-white font-black text-xs py-2.5 rounded-xl shadow-2xs transition-all active:scale-95 text-center"
        >
          Continue Shopping →
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
