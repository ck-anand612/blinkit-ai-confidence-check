import React, { useState } from 'react';

export const AddToCartCTA = ({ price }) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-[768px] md:left-1/2 md:-translate-x-1/2 bg-surface-container-lowest border-t border-surface-variant px-margin-mobile py-4 z-40 flex items-center justify-between" style={{ boxShadow: '0 -4px 12px rgba(0,0,0,0.05)' }}>
      <div className="flex flex-col">
        {/* Mock original price for visual parity with design */}
        <span className="font-label-sm text-label-sm text-on-surface-variant line-through">₹{Math.round(price * 1.2)}</span>
        <span className="font-headline-md text-headline-md text-on-background">₹{price}</span>
      </div>
      <div className="flex flex-col items-end relative">
        <button
          onClick={handleAddToCart}
          className={`bg-[#f7d002] text-[#6b5900] font-label-lg text-label-lg font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-sm border border-[#e6c100] ${
            added ? 'scale-[0.99] bg-emerald-700 text-white border-emerald-700' : 'active:scale-95'
          }`}
        >
          <span>{added ? '✓ Added to Cart!' : 'ADD TO CART'}</span>
          {!added && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )}
        </button>
        {added && (
          <p className="text-[10px] text-emerald-600 font-semibold absolute -top-8 right-0 bg-white px-3 py-1.5 rounded-full shadow-md border border-emerald-100 whitespace-nowrap animate-fadeIn">
            Demo UI action triggered (Cart checkout out of scope)
          </p>
        )}
      </div>
    </div>
  );
};

export default AddToCartCTA;

