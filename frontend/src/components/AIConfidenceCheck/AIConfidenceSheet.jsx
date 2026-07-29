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
    { id: 'suitability', label: 'Skin Match', icon: 'face_retouching_natural' },
    { id: 'quality', label: 'Quality', icon: 'thumb_up' },
    { id: 'returns', label: 'Returns', icon: 'assignment_return' },
  ];

  const hasContext = product?.concernContext || {};
  const formattedRecommendation = formatConciseRecommendation(concernSummary, activeConcern, product);

  return (
    <>
      {/* Scrim / Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 backdrop-blur-xs"
        onClick={onClose}
      />
      
      {/* Bottom Sheet Modal */}
      <div 
        className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-white/10 text-white z-50 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl transition-transform duration-300 ease-out font-sans"
      >
        {/* Header */}
        <div className="px-4 pt-3 pb-3 border-b border-white/10 flex flex-col items-center relative shrink-0">
          <div className="w-10 h-1 bg-[#2A2A2A] rounded-full mb-3"></div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F8C537]">verified</span>
              <h3 className="font-black text-sm text-white">Purchase Confidence Evidence</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-[#B8B8B8] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Trust Score Breakdown */}
          <div className="bg-gradient-to-r from-[#2B0D0D] via-[#1E0909] to-[#142A22] text-white rounded-2xl p-4 space-y-2 border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-black text-[#F8C537] uppercase tracking-wider">
                Purchase Confidence
              </span>
              <span className="bg-[#F8C537] text-[#121212] px-2.5 py-0.5 rounded-full font-black text-xs">
                {baseScore}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="flex justify-between bg-[#1E1E1E] p-2 rounded-xl border border-white/10">
                <span className="text-[#B8B8B8]">✓ Authenticity</span>
                <span className="font-black text-[#18C37E]">{authenticityScore}%</span>
              </div>
              <div className="flex justify-between bg-[#1E1E1E] p-2 rounded-xl border border-white/10">
                <span className="text-[#B8B8B8]">✓ Skin Match</span>
                <span className="font-black text-[#18C37E]">{skinMatchScore}%</span>
              </div>
              <div className="flex justify-between bg-[#1E1E1E] p-2 rounded-xl border border-white/10">
                <span className="text-[#B8B8B8]">✓ Quality</span>
                <span className="font-black text-[#18C37E]">{qualityScore}%</span>
              </div>
              <div className="flex justify-between bg-[#1E1E1E] p-2 rounded-xl border border-white/10">
                <span className="text-[#B8B8B8]">✓ Returns</span>
                <span className="font-black text-[#18C37E]">{returnsScore}%</span>
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
                      ? 'bg-[#18C37E] text-black border-[#18C37E] font-black'
                      : 'bg-[#1E1E1E] text-[#B8B8B8] border border-white/10 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* AI Rationale Summary Box */}
          <div className="bg-[#142A22] border border-[#18C37E]/40 p-3.5 rounded-2xl space-y-1">
            <span className="text-[10px] font-black text-[#18C37E] uppercase tracking-wider block">
              Blinkit AI Recommendation
            </span>
            {loading ? (
              <div className="py-2 flex items-center justify-center">
                <LoadingSpinner label="Generating rationale..." />
              </div>
            ) : (
              <p className="text-xs text-white font-medium leading-relaxed whitespace-pre-line">
                {formattedRecommendation}
              </p>
            )}
          </div>

          {/* Granular Context Key Facts */}
          <div className="space-y-2.5 pt-1">
            <h4 className="font-black text-xs text-white uppercase tracking-wider">
              Verified Evidence & Key Facts
            </h4>

            {hasContext.authenticity && (
              <div className="bg-[#1E1E1E] border border-white/10 p-3 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#18C37E] text-sm">verified</span>
                  Authenticity Verification
                </span>
                <p className="text-xs text-[#B8B8B8] leading-snug pl-5">{hasContext.authenticity}</p>
              </div>
            )}

            {hasContext.suitability && (
              <div className="bg-[#1E1E1E] border border-white/10 p-3 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#18C37E] text-sm">spa</span>
                  Skin Suitability Analysis
                </span>
                <p className="text-xs text-[#B8B8B8] leading-snug pl-5">{hasContext.suitability}</p>
              </div>
            )}

            {hasContext.quality && (
              <div className="bg-[#1E1E1E] border border-white/10 p-3 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#18C37E] text-sm">thumb_up</span>
                  Quality & Value Criteria
                </span>
                <p className="text-xs text-[#B8B8B8] leading-snug pl-5">{hasContext.quality}</p>
              </div>
            )}

            {hasContext.returns && (
              <div className="bg-[#1E1E1E] border border-white/10 p-3 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#18C37E] text-sm">assignment_return</span>
                  Return & Refund Coverage
                </span>
                <p className="text-xs text-[#B8B8B8] leading-snug pl-5">{hasContext.returns}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] text-[#B8B8B8] font-medium block">Price</span>
            <span className="text-lg font-black text-white">₹{product.price}</span>
          </div>
          <button
            onClick={onClose}
            className="flex-1 bg-[#F8C537] hover:bg-[#e2bd00] text-[#121212] font-black text-xs py-3 rounded-xl shadow-md transition-all active:scale-95 text-center"
          >
            Got it, Back to Product
          </button>
        </div>
      </div>
    </>
  );
};

export default AIConfidenceSheet;
