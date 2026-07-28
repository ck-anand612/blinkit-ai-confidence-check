import React from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';

export const AIConfidenceSheet = ({ isOpen, onClose, product, summaryData, loading, error, onRetry }) => {
  if (!isOpen) return null;

  const compatibilityScore = product?.rating ? Math.round(product.rating * 20) : null;
  const hasContext = product?.concernContext;

  return (
    <>
      {/* Scrim / Dimmer */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-surface-container-lowest z-50 rounded-t-[28px] flex flex-col transform transition-transform duration-300 ease-in-out translate-y-0`}
      >
        {/* Grabber Area & Header */}
        <div className="px-4 pt-4 pb-4 relative flex flex-col items-center border-b border-surface-container-high">
          <div className="w-8 h-1 bg-surface-variant rounded-full mb-6"></div>
          <div className="flex items-center justify-between w-full relative">
            <button 
              aria-label="Close sheet" 
              className="text-on-surface p-2 -ml-2 hover:bg-surface-container-low rounded-full transition-colors flex items-center justify-center focus:outline-none" 
              onClick={onClose}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 400" }}>close</span>
            </button>
            <h2 className="font-headline-md text-headline-md text-on-surface absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              AI Confidence Details
            </h2>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="px-4 py-6 overflow-y-auto max-h-[70vh]">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner label="Generating AI confidence summary..." />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-2xl flex items-center justify-between">
              <span>Unable to generate confidence summary right now. Please try again.</span>
              <button onClick={onRetry} className="font-bold underline ml-2 text-red-800">
                Retry
              </button>
            </div>
          ) : summaryData ? (
            <>
              {/* Compatibility Score Section */}
              {compatibilityScore && (
                <div className="flex items-center justify-between bg-surface-container-low rounded-[16px] p-4 mb-8 border border-surface-variant/50">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Overall Confidence Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display-lg text-display-lg text-blinkit-green">{compatibilityScore}%</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">Match</span>
                    </div>
                  </div>
                  <div className="bg-secondary-container/30 text-blinkit-green px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-blinkit-green/20">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="font-label-sm text-label-sm font-bold">High Match</span>
                  </div>
                </div>
              )}

              {/* AI Explanation Section */}
              <div className="mb-8">
                <h3 className="font-title-lg text-title-lg text-on-surface mb-2">AI Explanation</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {summaryData.summary}
                </p>
              </div>

              {/* Verified Trust Signals */}
              <div className="space-y-6 mb-4">
                {hasContext?.authenticity && (
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0 bg-secondary/10 p-1.5 rounded-full text-blinkit-green">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 400" }}>verified</span>
                    </div>
                    <div>
                      <h3 className="font-title-lg text-title-lg text-on-surface mb-1">Authenticity Analysis</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {hasContext.authenticity}
                      </p>
                    </div>
                  </div>
                )}
                
                {hasContext?.suitability && (
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0 bg-secondary/10 p-1.5 rounded-full text-blinkit-green">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 400" }}>face_retouching_natural</span>
                    </div>
                    <div>
                      <h3 className="font-title-lg text-title-lg text-on-surface mb-1">Skin Suitability</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {hasContext.suitability}
                      </p>
                    </div>
                  </div>
                )}
                
                {hasContext?.quality && (
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0 bg-secondary/10 p-1.5 rounded-full text-blinkit-green">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 400" }}>thumb_up</span>
                    </div>
                    <div>
                      <h3 className="font-title-lg text-title-lg text-on-surface mb-1">Value for Money</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {hasContext.quality}
                      </p>
                    </div>
                  </div>
                )}
                
                {hasContext?.returns && (
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0 bg-secondary/10 p-1.5 rounded-full text-blinkit-green">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 400" }}>assignment_return</span>
                    </div>
                    <div>
                      <h3 className="font-title-lg text-title-lg text-on-surface mb-1">Return Eligibility</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {hasContext.returns}
                      </p>
                    </div>
                  </div>
                )}

                {product?.tags && product.tags.length > 0 && (
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0 bg-secondary/10 p-1.5 rounded-full text-blinkit-green">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 400" }}>science</span>
                    </div>
                    <div>
                      <h3 className="font-title-lg text-title-lg text-on-surface mb-1">Ingredient Highlights</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {product.tags.join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>

        {/* Sticky Footer Action - Add to Cart CTA */}
        <div className="p-4 bg-surface-container-lowest border-t border-surface-container-high pb-safe-area relative z-10 flex justify-between items-center gap-4">
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md text-on-background">₹{product?.price}</span>
          </div>
          <button 
            className="flex-1 bg-blinkit-yellow text-on-primary-fixed font-title-lg text-title-lg rounded-[12px] py-3 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm"
            onClick={onClose}
          >
            <span>Got it, Add to Cart</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AIConfidenceSheet;
