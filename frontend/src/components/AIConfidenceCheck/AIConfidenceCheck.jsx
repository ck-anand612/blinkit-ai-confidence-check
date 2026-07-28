import React from 'react';

export const AIConfidenceCheck = ({ product, onViewDetails }) => {
  // Derive score from rating
  const compatibilityScore = product?.rating ? Math.round(product.rating * 20) : null;
  const hasContext = product?.concernContext;

  return (
    <section className="px-margin-mobile py-md">
      <div className="bg-gradient-to-br from-surface-container-lowest to-[#fff9e6] border border-[#f5e396] rounded-xl p-md flex flex-col gap-3 relative overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 text-[#b08d00]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
          <span className="font-label-lg text-label-lg font-bold">AI Confidence Check</span>
        </div>
        
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-1">
            <p className="font-headline-md text-headline-md text-secondary">High Compatibility</p>
            {/* Display Trust Dimensions dynamically */}
            <ul className="font-body-sm text-body-sm text-on-surface-variant mt-2 space-y-1">
              {hasContext?.authenticity && <li>✓ Authenticity</li>}
              {hasContext?.suitability && <li>✓ Skin Suitability</li>}
              {hasContext?.quality && <li>✓ Value for Money</li>}
              {hasContext?.returns && <li>✓ Return Eligibility</li>}
            </ul>
          </div>
          
          {compatibilityScore && (
            <div className="w-12 h-12 rounded-full border-4 border-secondary flex items-center justify-center bg-surface-container-lowest shrink-0 ml-2">
              <span className="font-label-lg text-label-lg text-secondary font-bold">{compatibilityScore}%</span>
            </div>
          )}
        </div>
        
        <button 
          type="button"
          className="font-label-lg text-label-lg text-[#b08d00] text-left mt-2 hover:underline inline-block w-fit cursor-pointer pointer-events-auto relative z-50"
          onClick={() => {
            if (onViewDetails) onViewDetails();
          }}
        >
          View Details
        </button>
      </div>
    </section>
  );
};

export default AIConfidenceCheck;
