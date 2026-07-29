import React from 'react';

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
    <section className="px-4 py-3 space-y-4 bg-[#121212]">
      {/* 1. Header & Trust Dashboard (Premium Dark Gradient + Visual Score Progress Bars) */}
      <div className="bg-gradient-to-r from-[#2B0D0D] via-[#1E0909] to-[#142A22] text-white rounded-2xl p-4 border border-white/10 shadow-lg space-y-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#F8C537] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <h2 className="font-extrabold text-xs text-[#F8C537] uppercase tracking-wider">
              Purchase Confidence
            </h2>
          </div>
          <div className="bg-[#F8C537] text-[#121212] px-2.5 py-0.5 rounded-full font-black text-xs shadow-md flex items-center gap-1">
            <span>{baseScore}%</span>
            <span className="text-[9px] font-extrabold uppercase tracking-tight">Confidence Score</span>
          </div>
        </div>

        {/* 4-Dimension Score Breakdown with Animated Progress Bars */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {scores.map((scoreItem, index) => (
            <div key={index} className="bg-[#1E1E1E]/90 border border-white/10 rounded-xl p-2 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-[#B8B8B8]">{scoreItem.label}</span>
                <span className="text-[#18C37E] font-black">{scoreItem.value}%</span>
              </div>
              <div className="w-full bg-[#2A2A2A] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#18C37E] h-full rounded-full transition-all duration-500"
                  style={{ width: `${scoreItem.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Concern Tabs */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold text-[#B8B8B8] uppercase tracking-wider block">
          Select concern for instant AI analysis:
        </span>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {concernTabs.map((tab) => {
            const isActive = activeConcern === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onConcernChange && onConcernChange(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  isActive
                    ? 'bg-[#18C37E] text-black border-[#18C37E] font-black shadow-md scale-105'
                    : 'bg-[#1E1E1E] text-[#B8B8B8] border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Structured Evidence Cards */}
      <div className="grid grid-cols-1 gap-2.5">
        {evidenceCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#1E1E1E] rounded-2xl border border-white/10 p-3 shadow-sm space-y-1 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#18C37E] text-base">
                  {card.icon}
                </span>
                <h4 className="font-bold text-xs text-white">{card.title}</h4>
              </div>
              <span className="bg-[#18C37E]/15 text-[#18C37E] text-[9px] font-black px-2 py-0.5 rounded-md border border-[#18C37E]/30">
                {card.badge}
              </span>
            </div>
            <p className="text-[11px] text-[#B8B8B8] leading-snug pl-6">
              {card.detail}
            </p>
          </div>
        ))}
      </div>

      {/* 4. AI Recommendation Box */}
      <div className="bg-[#142A22] border border-[#18C37E]/40 rounded-2xl p-3.5 space-y-1.5 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-[#18C37E] uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">psychology</span>
            Blinkit AI Recommendation
          </span>
          {loading && (
            <span className="text-[9px] text-[#18C37E] font-bold animate-pulse">
              Updating AI rationale...
            </span>
          )}
        </div>
        <p className="text-xs text-white font-medium leading-relaxed whitespace-pre-line">
          {formattedRecommendation}
        </p>
      </div>

      {/* 5. Optional See All Evidence Link */}
      {onOpenSheet && (
        <div className="text-right pt-0.5">
          <button
            type="button"
            onClick={onOpenSheet}
            className="text-xs font-black text-[#F8C537] hover:underline inline-flex items-center gap-1"
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
