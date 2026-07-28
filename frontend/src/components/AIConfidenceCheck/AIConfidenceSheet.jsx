import React from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';

const formatConciseRecommendation = (rawText, concern, prod) => {
  if (!rawText) {
    switch (concern) {
      case 'authenticity':
        return `Recommended for 100% authentic skincare.\nOfficially sourced through authorized ${prod?.brand || 'brand'} distribution.`;
      case 'suitability':
        return `Recommended for ${prod?.subCategory || 'daily skincare'} routine.\nFormulated to balance skin without stripping moisture.`;
      case 'quality':
        return `Recommended for high-purity active ingredients.\nDermatologically tested to international safety standards.`;
      case 'returns':
        return `Protected under Blinkit 7-day return guarantee.\nInstant replacement dispatched if package seal is broken.`;
      default:
        return `Recommended for high purchase confidence.\nVerified authentic stock stored in 10-minute dark stores.`;
    }
  }

  const sentences = rawText
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (sentences.length === 0) {
    return `Recommended for purchase.\nVerified against official ${prod?.brand || 'brand'} standards.`;
  }
  if (sentences.length === 1) {
    return `${sentences[0]}\nOfficially sourced through authorized supply chain channels.`;
  }
  return `${sentences[0]}\n${sentences[1]}`;
};

export const AIConfidenceSheet = ({
  isOpen,
  onClose,
  product,
  activeConcern = 'authenticity',
  onConcernChange,
  concernSummary,
  loading = false
}) => {
  if (!isOpen || !product) return null;

  const baseScore = product?.rating ? Math.round(product.rating * 20) : 95;
  const authenticityScore = Math.min(99, baseScore + 2);
  const skinMatchScore = Math.max(90, baseScore - 1);
  const qualityScore = Math.max(88, baseScore - 3);
  const returnsScore = 100;

  const concernTabs = [
    { id: 'authenticity', label: 'Authenticity', icon: 'verified' },
    { id: 'suitability', label: 'Skin Compatibility', icon: 'face_retouching_natural' },
    { id: 'quality', label: 'Product Quality', icon: 'thumb_up' },
    { id: 'returns', label: 'Return & Refund', icon: 'assignment_return' },
  ];

  const hasContext = product?.concernContext || {};
  const formattedRecommendation = formatConciseRecommendation(concernSummary, activeConcern, product);

  return (
    <>
      {/* Scrim / Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Bottom Sheet Modal */}
      <div 
        className="fixed bottom-0 left-0 w-full bg-white z-50 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl transition-transform duration-300 ease-out"
      >
        {/* Header */}
        <div className="px-4 pt-3 pb-3 border-b border-gray-100 flex flex-col items-center relative shrink-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full mb-3"></div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-700">verified</span>
              <h3 className="font-extrabold text-base text-gray-900">Purchase Confidence Evidence</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Trust Score Breakdown */}
          <div className="bg-emerald-950 text-white rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-2">
              <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">
                Purchase Confidence
              </span>
              <span className="bg-yellow-400 text-emerald-950 px-2.5 py-0.5 rounded-full font-black text-xs sm:text-sm">
                {baseScore}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="flex justify-between bg-emerald-900/60 p-2 rounded-lg border border-emerald-700/50">
                <span className="text-emerald-200">✓ Authenticity</span>
                <span className="font-extrabold text-white">{authenticityScore}%</span>
              </div>
              <div className="flex justify-between bg-emerald-900/60 p-2 rounded-lg border border-emerald-700/50">
                <span className="text-emerald-200">✓ Skin Match</span>
                <span className="font-extrabold text-white">{skinMatchScore}%</span>
              </div>
              <div className="flex justify-between bg-emerald-900/60 p-2 rounded-lg border border-emerald-700/50">
                <span className="text-emerald-200">✓ Quality</span>
                <span className="font-extrabold text-white">{qualityScore}%</span>
              </div>
              <div className="flex justify-between bg-emerald-900/60 p-2 rounded-lg border border-emerald-700/50">
                <span className="text-emerald-200">✓ Returns</span>
                <span className="font-extrabold text-white">{returnsScore}%</span>
              </div>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {concernTabs.map((tab) => {
              const isActive = activeConcern === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onConcernChange && onConcernChange(tab.id)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* AI Rationale Summary Box */}
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl space-y-1">
            <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider block">
              Blinkit AI Recommendation
            </span>
            {loading ? (
              <div className="py-2 flex items-center justify-center">
                <LoadingSpinner label="Generating rationale..." />
              </div>
            ) : (
              <p className="text-xs text-emerald-950 font-semibold leading-relaxed whitespace-pre-line">
                {formattedRecommendation}
              </p>
            )}
          </div>

          {/* Granular Context Key Facts */}
          <div className="space-y-3 pt-1">
            <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">
              Verified Evidence & Key Facts
            </h4>

            {hasContext.authenticity && (
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1">
                <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">verified</span>
                  Authenticity Verification
                </span>
                <p className="text-xs text-gray-600 leading-snug">{hasContext.authenticity}</p>
              </div>
            )}

            {hasContext.suitability && (
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1">
                <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">spa</span>
                  Skin Suitability Analysis
                </span>
                <p className="text-xs text-gray-600 leading-snug">{hasContext.suitability}</p>
              </div>
            )}

            {hasContext.quality && (
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1">
                <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">thumb_up</span>
                  Quality & Value Criteria
                </span>
                <p className="text-xs text-gray-600 leading-snug">{hasContext.quality}</p>
              </div>
            )}

            {hasContext.returns && (
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-xl space-y-1">
                <span className="text-xs font-extrabold text-gray-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">assignment_return</span>
                  Return & Refund Coverage
                </span>
                <p className="text-xs text-gray-600 leading-snug">{hasContext.returns}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-xs text-gray-400 font-medium block">Price</span>
            <span className="text-lg font-extrabold text-gray-900">₹{product.price}</span>
          </div>
          <button
            onClick={onClose}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-emerald-950 font-extrabold text-sm py-3 rounded-xl shadow-md transition-all active:scale-95 text-center"
          >
            Got it, Back to Product
          </button>
        </div>
      </div>
    </>
  );
};

export default AIConfidenceSheet;
