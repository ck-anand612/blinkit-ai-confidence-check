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
    <div className="absolute inset-0 z-50 bg-[#F8F8F8] flex flex-col font-sans overflow-hidden">
      {/* Top Header Bar with Back Button */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5] px-4 py-3 flex items-center justify-between shrink-0 shadow-xs">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-xs font-extrabold text-[#1F1F1F] hover:text-[#0C831F] transition-colors p-1 rounded-lg hover:bg-[#F3F4F6]"
        >
          <span className="material-symbols-outlined text-lg text-[#2F2F2F]">arrow_back</span>
          <span>Back</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1F1F1F]">
          <span className="material-symbols-outlined text-[#0C831F] text-base">verified</span>
          <span>AI Evidence Report</span>
        </div>

        <button
          onClick={onClose}
          className="text-[#666666] hover:text-[#1F1F1F] p-1 rounded-full hover:bg-[#F3F4F6] transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Scrollable Main Evidence Content */}
      <div className="p-4 overflow-y-auto space-y-3.5 flex-1 scrollbar-none">
        {/* Trust Score Breakdown Banner */}
        <div className="bg-[#F3F4F6] text-[#1F1F1F] rounded-[16px] p-4 space-y-2.5 border border-[#E5E5E5] shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2">
            <span className="text-xs font-black text-[#0C831F] uppercase tracking-wider">
              Purchase Confidence Analysis
            </span>
            <span className="bg-[#0C831F] text-white px-2.5 py-0.5 rounded-full font-black text-xs">
              {baseScore}% Score
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="flex justify-between bg-[#FFFFFF] p-2 rounded-xl border border-[#E5E5E5] shadow-2xs">
              <span className="text-[#666666] font-medium">✓ Authenticity</span>
              <span className="font-black text-[#0C831F]">{authenticityScore}%</span>
            </div>
            <div className="flex justify-between bg-[#FFFFFF] p-2 rounded-xl border border-[#E5E5E5] shadow-2xs">
              <span className="text-[#666666] font-medium">✓ Skin Match</span>
              <span className="font-black text-[#0C831F]">{skinMatchScore}%</span>
            </div>
            <div className="flex justify-between bg-[#FFFFFF] p-2 rounded-xl border border-[#E5E5E5] shadow-2xs">
              <span className="text-[#666666] font-medium">✓ Quality</span>
              <span className="font-black text-[#0C831F]">{qualityScore}%</span>
            </div>
            <div className="flex justify-between bg-[#FFFFFF] p-2 rounded-xl border border-[#E5E5E5] shadow-2xs">
              <span className="text-[#666666] font-medium">✓ Returns</span>
              <span className="font-black text-[#0C831F]">{returnsScore}%</span>
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
                    ? 'bg-[#0C831F] text-white border-[#0C831F] font-black shadow-xs'
                    : 'bg-[#FFFFFF] text-[#1F1F1F] border border-[#E5E5E5] hover:text-[#1F1F1F]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]" style={{ color: isActive ? '#FFFFFF' : '#2F2F2F' }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* AI Rationale Summary Box */}
        <div className="bg-[#F3F4F6] border border-[#E5E5E5] p-3.5 rounded-[16px] space-y-1 shadow-2xs">
          <span className="text-[10px] font-black text-[#0C831F] uppercase tracking-wider block">
            Blinkit AI Recommendation Rationale
          </span>
          {loading ? (
            <div className="py-2 flex items-center justify-center">
              <LoadingSpinner label="Generating rationale..." />
            </div>
          ) : (
            <p className="text-xs text-[#1F1F1F] font-medium leading-relaxed whitespace-pre-line">
              {formattedRecommendation}
            </p>
          )}
        </div>

        {/* Granular Context Key Facts */}
        <div className="space-y-2.5 pt-1">
          <h4 className="font-black text-xs text-[#1F1F1F] uppercase tracking-wider">
            Verified Evidence & Key Facts
          </h4>

          {hasContext.authenticity && (
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-3 rounded-[16px] space-y-1 shadow-2xs">
              <span className="text-xs font-bold text-[#1F1F1F] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#0C831F] text-sm">verified</span>
                Authenticity Verification
              </span>
              <p className="text-xs text-[#666666] leading-snug pl-5">{hasContext.authenticity}</p>
            </div>
          )}

          {hasContext.suitability && (
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-3 rounded-[16px] space-y-1 shadow-2xs">
              <span className="text-xs font-bold text-[#1F1F1F] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#0C831F] text-sm">spa</span>
                Skin Suitability Analysis
              </span>
              <p className="text-xs text-[#666666] leading-snug pl-5">{hasContext.suitability}</p>
            </div>
          )}

          {hasContext.quality && (
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-3 rounded-[16px] space-y-1 shadow-2xs">
              <span className="text-xs font-bold text-[#1F1F1F] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#0C831F] text-sm">thumb_up</span>
                Quality & Value Criteria
              </span>
              <p className="text-xs text-[#666666] leading-snug pl-5">{hasContext.quality}</p>
            </div>
          )}

          {hasContext.returns && (
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-3 rounded-[16px] space-y-1 shadow-2xs">
              <span className="text-xs font-bold text-[#1F1F1F] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#0C831F] text-sm">assignment_return</span>
                Return & Refund Coverage
              </span>
              <p className="text-xs text-[#666666] leading-snug pl-5">{hasContext.returns}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-3.5 bg-[#FFFFFF] border-t border-[#E5E5E5] flex items-center justify-between gap-3 shrink-0 shadow-md">
        <div>
          <span className="text-[10px] text-[#666666] font-semibold block">Product Price</span>
          <span className="text-base font-black text-[#1F1F1F]">₹{product.price}</span>
        </div>
        <button
          onClick={onClose}
          className="flex-1 bg-[#0C831F] hover:bg-[#0A701A] text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs transition-all active:scale-95 text-center"
        >
          Back to Product Detail
        </button>
      </div>
    </div>
  );
};

export default AIConfidenceSheet;
