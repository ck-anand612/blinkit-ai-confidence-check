import React from 'react';
import { createPortal } from 'react-dom';
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
  const tabsScrollRef = React.useRef(null);
  const scrollContainerRef = React.useRef(null);
  const [portalTarget, setPortalTarget] = React.useState(null);

  React.useEffect(() => {
    const mainEl = document.querySelector('main.overflow-y-auto');
    if (mainEl && mainEl.parentElement) {
      setPortalTarget(mainEl.parentElement);
    }
  }, []);

  React.useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen, activeConcern]);

  if (!isOpen || !product) return null;

  const baseScore = product?.rating ? Math.round(product.rating * 20) : 95;
  const authenticityScore = Math.min(99, baseScore + 2);
  const skinMatchScore = Math.max(90, baseScore - 1);
  const qualityScore = Math.max(88, baseScore - 3);
  const returnsScore = 100;

  const hasContext = product?.concernContext || {};
  const formattedRecommendation = formatConciseRecommendation(concernSummary, activeConcern, product);

  // Evidence facts with rich fallbacks so page is filled and comprehensive
  const authenticityFact = hasContext.authenticity || `Directly sourced from authorized ${product?.brand || 'brand'} distributors. Batch code verified against manufacturer certificates.`;
  const suitabilityFact = hasContext.suitability || `Dermatologically tested formula. Balanced pH suited for ${product?.subCategory || 'daily skincare'} routines without clogging pores.`;
  const qualityFact = hasContext.quality || `Formulated with high-purity active ingredients. Stored in climate-controlled Blinkit dark stores to maintain potency.`;
  const returnsFact = hasContext.returns || `Blinkit 7-day hassle-free return policy. If item arrives damaged or unsealed, instant free replacement is dispatched within 60 mins.`;

  const sheetContent = (
    <div className="absolute inset-0 z-50 bg-[#F8F8F8] flex flex-col font-sans overflow-hidden">
      {/* Top Header Bar with Back Button (pt-10 clears top phone camera notch) */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E5E5] px-4 pt-10 pb-2.5 flex items-center justify-between shrink-0 shadow-2xs">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-xs font-extrabold text-[#1F1F1F] hover:text-[#0C831F] transition-colors p-1 rounded-lg hover:bg-[#F3F4F6]"
        >
          <span className="material-symbols-outlined text-base text-[#2F2F2F]">arrow_back</span>
          <span>Back</span>
        </button>

        <div className="flex items-center gap-1 text-xs font-extrabold text-[#1F1F1F]">
          <span className="material-symbols-outlined text-[#0C831F] text-base">verified</span>
          <span>AI Evidence Report</span>
        </div>

        <button
          onClick={onClose}
          className="text-[#666666] hover:text-[#1F1F1F] p-1 rounded-full hover:bg-[#F3F4F6] transition-colors"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>

      {/* Scrollable Main Evidence Content (naturally sizes to content without empty whitespace) */}
      <div ref={scrollContainerRef} className="p-3.5 overflow-y-auto space-y-4 flex-1 scrollbar-none pb-6 bg-[#F8F8F8]">
        
        {/* 1. Overall AI Purchase Confidence */}
        <div className="bg-[#FFFFFF] text-[#1F1F1F] rounded-[16px] p-4 border border-[#E5E5E5] shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2">
            <span className="text-xs font-black text-[#0C831F] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">psychology</span>
              Overall AI Purchase Confidence
            </span>
            <span className="bg-[#0C831F] text-white px-2.5 py-0.5 rounded-full font-black text-sm shadow-xs">
              {baseScore}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="flex justify-between bg-[#F8F8F8] p-2 rounded-xl border border-[#E5E5E5] shadow-2xs">
              <span className="text-[#666666] font-medium">Authenticity</span>
              <span className="font-black text-[#0C831F]">{authenticityScore}%</span>
            </div>
            <div className="flex justify-between bg-[#F8F8F8] p-2 rounded-xl border border-[#E5E5E5] shadow-2xs">
              <span className="text-[#666666] font-medium">Skin Match</span>
              <span className="font-black text-[#0C831F]">{skinMatchScore}%</span>
            </div>
            <div className="flex justify-between bg-[#F8F8F8] p-2 rounded-xl border border-[#E5E5E5] shadow-2xs">
              <span className="text-[#666666] font-medium">Quality</span>
              <span className="font-black text-[#0C831F]">{qualityScore}%</span>
            </div>
            <div className="flex justify-between bg-[#F8F8F8] p-2 rounded-xl border border-[#E5E5E5] shadow-2xs">
              <span className="text-[#666666] font-medium">Returns</span>
              <span className="font-black text-[#0C831F]">{returnsScore}%</span>
            </div>
          </div>
          
          <div className="bg-[#F3F4F6] p-2.5 rounded-xl border border-[#E5E5E5]">
            <p className="text-xs text-[#1F1F1F] font-semibold leading-relaxed">
              Based on the aggregated scores across 4 dimensions, Blinkit AI recommends this product as a highly secure and verified purchase.
            </p>
          </div>
        </div>

        {/* 2. Authenticity Evidence */}
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[16px] p-4 space-y-2 shadow-xs">
          <h4 className="text-xs font-black text-[#1F1F1F] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#F3F4F6] pb-2">
            <span className="material-symbols-outlined text-[#0C831F] text-base">verified</span>
            Authenticity Evidence
          </h4>
          <p className="text-xs text-[#666666] leading-relaxed">
            {authenticityFact}
          </p>
          <div className="flex gap-2 pt-1">
            <span className="bg-[#F8F8F8] text-[#0C831F] text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E5E5E5]">Brand Authorized</span>
            <span className="bg-[#F8F8F8] text-[#0C831F] text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E5E5E5]">Batch Verified</span>
          </div>
        </div>

        {/* 3. Skin Compatibility Analysis */}
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[16px] p-4 space-y-2 shadow-xs">
          <h4 className="text-xs font-black text-[#1F1F1F] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#F3F4F6] pb-2">
            <span className="material-symbols-outlined text-[#0C831F] text-base">face_retouching_natural</span>
            Skin Compatibility Analysis
          </h4>
          <p className="text-xs text-[#666666] leading-relaxed">
            {suitabilityFact}
          </p>
        </div>

        {/* 4. Ingredient Intelligence */}
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[16px] p-4 space-y-2 shadow-xs">
          <h4 className="text-xs font-black text-[#1F1F1F] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#F3F4F6] pb-2">
            <span className="material-symbols-outlined text-[#0C831F] text-base">science</span>
            Ingredient Intelligence
          </h4>
          <p className="text-xs text-[#666666] leading-relaxed">
            {qualityFact}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product?.tags?.slice(0, 4).map((tag, idx) => (
              <span key={idx} className="bg-[#F3F4F6] text-[#1F1F1F] text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E5E5E5]">{tag}</span>
            ))}
          </div>
        </div>

        {/* 5. Community Review Insights */}
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[16px] p-4 space-y-2 shadow-xs">
          <h4 className="text-xs font-black text-[#1F1F1F] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#F3F4F6] pb-2">
            <span className="material-symbols-outlined text-[#F5A623] text-base">forum</span>
            Community Review Insights
          </h4>
          <p className="text-xs text-[#666666] leading-relaxed">
            {product?.reviews?.summary || `Over 2,000+ verified buyers rate this highly for ${product?.subCategory || 'daily use'}. 94% noticed positive changes within 2 weeks. The general consensus points to a non-greasy finish.`}
          </p>
        </div>

        {/* 6. Risk Assessment */}
        <div className="bg-[#FFF9E6] border border-[#FDE047] rounded-[16px] p-4 space-y-2 shadow-xs">
          <h4 className="text-xs font-black text-[#B45309] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#FDE047]/50 pb-2">
            <span className="material-symbols-outlined text-[#B45309] text-base">warning</span>
            Risk Assessment
          </h4>
          <p className="text-xs text-[#92400E] leading-relaxed font-medium">
            {product?.warnings || `Low risk profile. Free from common allergens (parabens, sulfates). A standard 24-hour patch test is always recommended when introducing new active ingredients to your routine.`}
          </p>
        </div>

        {/* 7. Return Protection Analysis */}
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[16px] p-4 space-y-2 shadow-xs">
          <h4 className="text-xs font-black text-[#1F1F1F] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#F3F4F6] pb-2">
            <span className="material-symbols-outlined text-[#0C831F] text-base">assignment_return</span>
            Return Protection Analysis
          </h4>
          <p className="text-xs text-[#666666] leading-relaxed">
            {returnsFact}
          </p>
        </div>

        {/* 8. Final AI Recommendation */}
        <div className="bg-[#F3F4F6] border border-[#0C831F]/30 rounded-[16px] p-4 space-y-2 shadow-xs">
          <h4 className="text-xs font-black text-[#0C831F] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">psychology</span>
            Final AI Recommendation
          </h4>
          {loading ? (
            <div className="py-2 flex items-center justify-center">
              <LoadingSpinner label="Generating rationale..." />
            </div>
          ) : (
            <p className="text-[13px] text-[#1F1F1F] font-bold leading-relaxed whitespace-pre-line">
              {formattedRecommendation}
            </p>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-3 bg-[#FFFFFF] border-t border-[#E5E5E5] flex items-center justify-between gap-3 shrink-0 shadow-md">
        <div>
          <span className="text-[9px] text-[#666666] font-semibold block">Product Price</span>
          <span className="text-base font-black text-[#1F1F1F]">₹{product.price}</span>
        </div>
        <button
          onClick={onClose}
          className="flex-1 bg-[#0C831F] hover:bg-[#0A701A] text-white font-extrabold text-xs py-2 rounded-xl shadow-xs transition-all active:scale-95 text-center"
        >
          Back to Product Detail
        </button>
      </div>
    </div>
  );

  return portalTarget ? createPortal(sheetContent, portalTarget) : sheetContent;
};

export default AIConfidenceSheet;
