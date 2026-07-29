import React, { useRef } from 'react';

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

export const AIConfidenceCheck = ({
  product,
  activeConcern = 'authenticity',
  onConcernChange,
  concernSummary,
  loading = false,
  onOpenSheet
}) => {
  const tabsScrollRef = useRef(null);

  if (!product) return null;

  // Base rating score calculation
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

  const getEvidenceCards = () => {
    const context = product.concernContext || {};
    const trust = product.trustSignals || {};

    switch (activeConcern) {
      case 'authenticity':
        return [
          {
            icon: 'verified_user',
            title: 'Official Supply Chain',
            detail: trust.authenticity || `${product.brand} authorized Indian distributor import.`,
            badge: 'Verified Brand'
          },
          {
            icon: 'qr_code_scanner',
            title: 'Batch Code Verification',
            detail: context.authenticity || 'Unique batch code matches global brand registry.',
            badge: 'Trackable'
          },
          {
            icon: 'ac_unit',
            title: 'Storage & Handling',
            detail: 'Stored in temperature-controlled dark store for 10-minute dispatch.',
            badge: 'Temp Controlled'
          }
        ];

      case 'suitability':
        return [
          {
            icon: 'spa',
            title: 'Suitable For',
            detail: context.suitability || 'Ideal for Oily, Combination & Acne-prone skin types.',
            badge: 'High Match'
          },
          {
            icon: 'do_not_disturb_on',
            title: 'Formulation Safety',
            detail: 'Dermatologically tested, fragrance-free & non-comedogenic.',
            badge: 'Safe Formula'
          },
          {
            icon: 'schedule',
            title: 'Usage Guide',
            detail: 'Suitable for daily morning/evening routine. Patch test recommended.',
            badge: 'Daily Use'
          }
        ];

      case 'quality':
        return [
          {
            icon: 'science',
            title: 'Active Ingredients',
            detail: product.tags ? product.tags.join(' • ') : 'High-purity dermatological grade ingredients.',
            badge: 'Key Actives'
          },
          {
            icon: 'thumb_up',
            title: 'Clinical Efficacy',
            detail: context.quality || 'Formulated to European dermatological safety standards.',
            badge: 'Dermatologist Pick'
          },
          {
            icon: 'payments',
            title: 'Value Assessment',
            detail: 'High concentration per ml ensuring 60+ days of effective daily usage.',
            badge: 'Best Value'
          }
        ];

      case 'returns':
        return [
          {
            icon: 'assignment_return',
            title: 'Return Window',
            detail: trust.returnPolicy || '7-day easy return window for unopened packaging.',
            badge: '7 Days Return'
          },
          {
            icon: 'published_with_changes',
            title: 'Eligible Conditions',
            detail: context.returns || 'Full refund or instant replacement if package arrives unsealed or damaged.',
            badge: 'Instant Refund'
          },
          {
            icon: 'bolt',
            title: '1-Hour SLA',
            detail: 'Replacement item dispatched within 60 minutes from dark store.',
            badge: 'Fast SLA'
          }
        ];

      default:
        return [];
    }
  };

  const evidenceCards = getEvidenceCards().slice(0, 3);
  const formattedRecommendation = formatConciseRecommendation(concernSummary, activeConcern, product);

  const scores = [
    { label: 'Authenticity', value: authenticityScore },
    { label: 'Skin Match', value: skinMatchScore },
    { label: 'Quality', value: qualityScore },
    { label: 'Returns', value: returnsScore },
  ];

  return (
    <section className="px-4 py-3 space-y-3 bg-[#F8F8F8]">
      {/* 1. Header & Trust Dashboard */}
      <div className="bg-[#F3F4F6] text-[#1F1F1F] rounded-[16px] p-3.5 border border-[#E5E5E5] shadow-xs space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#0C831F] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <h2 className="font-extrabold text-xs text-[#0C831F] uppercase tracking-wider">
              Purchase Confidence
            </h2>
          </div>
          <div className="bg-[#0C831F] text-white px-2.5 py-0.5 rounded-full font-black text-xs shadow-xs flex items-center gap-1">
            <span>{baseScore}%</span>
            <span className="text-[9px] font-extrabold uppercase tracking-tight">Score</span>
          </div>
        </div>

        {/* 4-Dimension Score Breakdown with Progress Bars */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          {scores.map((scoreItem, index) => (
            <div key={index} className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl p-2 space-y-1 shadow-2xs">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-[#666666]">{scoreItem.label}</span>
                <span className="text-[#0C831F] font-black">{scoreItem.value}%</span>
              </div>
              <div className="w-full bg-[#F8F8F8] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0C831F] h-full rounded-full transition-all duration-500"
                  style={{ width: `${scoreItem.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Concern Tabs (Horizontally Scrollable with Arrow Controls) */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-black text-[#666666] uppercase tracking-wider block">
          Select concern for instant AI analysis:
        </span>

        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => {
              if (tabsScrollRef.current) {
                tabsScrollRef.current.scrollBy({ left: -140, behavior: 'smooth' });
              }
            }}
            className="w-6 h-6 rounded-full bg-white border border-[#E5E5E5] text-[#1F1F1F] shadow-xs flex items-center justify-center shrink-0 mr-1 hover:bg-[#F3F4F6] cursor-pointer"
            title="Previous tab"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          <div ref={tabsScrollRef} className="flex items-center space-x-2 overflow-x-auto pb-1 flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            {concernTabs.map((tab) => {
              const isActive = activeConcern === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onConcernChange && onConcernChange(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                    isActive
                      ? 'bg-[#0C831F] text-white border-[#0C831F] font-black shadow-xs scale-105'
                      : 'bg-[#FFFFFF] text-[#1F1F1F] border border-[#E5E5E5] hover:border-gray-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]" style={{ color: isActive ? '#FFFFFF' : '#2F2F2F' }}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              if (tabsScrollRef.current) {
                tabsScrollRef.current.scrollBy({ left: 140, behavior: 'smooth' });
              }
            }}
            className="w-6 h-6 rounded-full bg-white border border-[#E5E5E5] text-[#1F1F1F] shadow-xs flex items-center justify-center shrink-0 ml-1 hover:bg-[#F3F4F6] cursor-pointer"
            title="Next tab"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      {/* 3. Structured Evidence Cards (Horizontally Scrollable) */}
      <div className="flex space-x-2 overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
        {evidenceCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#FFFFFF] rounded-[16px] border border-[#E5E5E5] p-3 shadow-2xs space-y-1 hover:border-gray-300 transition-colors shrink-0 w-[260px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#0C831F] text-base">
                  {card.icon}
                </span>
                <h4 className="font-bold text-[11px] text-[#1F1F1F] truncate">{card.title}</h4>
              </div>
              <span className="bg-[#F3F4F6] text-[#0C831F] text-[9px] font-black px-1.5 py-0.5 rounded-md border border-[#E5E5E5] shrink-0">
                {card.badge}
              </span>
            </div>
            <p className="text-[11px] text-[#666666] leading-snug pl-6 whitespace-normal">
              {card.detail}
            </p>
          </div>
        ))}
      </div>

      {/* 4. AI Recommendation Box */}
      <div className="bg-[#F3F4F6] border border-[#E5E5E5] rounded-[16px] p-3 space-y-1 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-[#0C831F] uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">psychology</span>
            Blinkit AI Recommendation
          </span>
          {loading && (
            <span className="text-[9px] text-[#0C831F] font-bold animate-pulse">
              Updating AI rationale...
            </span>
          )}
        </div>
        <p className="text-xs text-[#1F1F1F] font-medium leading-relaxed whitespace-pre-line">
          {formattedRecommendation}
        </p>
      </div>

      {/* 5. See All Evidence Link */}
      {onOpenSheet && (
        <div className="text-right pt-0.5">
          <button
            type="button"
            onClick={onOpenSheet}
            className="text-xs font-black text-[#0C831F] hover:underline inline-flex items-center gap-1"
          >
            <span>See all evidence</span>
            <span>→</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default AIConfidenceCheck;
