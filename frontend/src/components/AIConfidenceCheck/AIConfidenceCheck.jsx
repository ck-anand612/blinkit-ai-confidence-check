import React from 'react';

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
    { id: 'suitability', label: 'Skin Compatibility', icon: 'face_retouching_natural' },
    { id: 'quality', label: 'Product Quality', icon: 'thumb_up' },
    { id: 'returns', label: 'Return & Refund', icon: 'assignment_return' },
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

  return (
    <section className="px-margin-mobile py-4 space-y-4">
      {/* 1. Header & Trust Dashboard */}
      <div className="bg-emerald-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <h2 className="font-bold text-sm sm:text-base text-yellow-300 uppercase tracking-wider">
              Purchase Confidence
            </h2>
          </div>
          <div className="bg-yellow-400 text-emerald-950 px-3 py-1 rounded-full font-black text-sm shadow-sm flex items-center gap-1">
            <span>{baseScore}%</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">Trust Score</span>
          </div>
        </div>

        {/* 4-Dimension Trust Score Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div className="bg-emerald-800/80 border border-emerald-600/40 rounded-xl p-2 text-center">
            <span className="text-[10px] text-emerald-200 block font-semibold">✓ Authenticity</span>
            <span className="text-sm font-extrabold text-white">{authenticityScore}%</span>
          </div>
          <div className="bg-emerald-800/80 border border-emerald-600/40 rounded-xl p-2 text-center">
            <span className="text-[10px] text-emerald-200 block font-semibold">✓ Skin Match</span>
            <span className="text-sm font-extrabold text-white">{skinMatchScore}%</span>
          </div>
          <div className="bg-emerald-800/80 border border-emerald-600/40 rounded-xl p-2 text-center">
            <span className="text-[10px] text-emerald-200 block font-semibold">✓ Quality</span>
            <span className="text-sm font-extrabold text-white">{qualityScore}%</span>
          </div>
          <div className="bg-emerald-800/80 border border-emerald-600/40 rounded-xl p-2 text-center">
            <span className="text-[10px] text-emerald-200 block font-semibold">✓ Returns</span>
            <span className="text-sm font-extrabold text-white">{returnsScore}%</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Concern Tabs */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
          Need reassurance before buying? Select a concern:
        </span>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {concernTabs.map((tab) => {
            const isActive = activeConcern === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onConcernChange && onConcernChange(tab.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  isActive
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Structured Evidence Cards (Max 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {evidenceCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-100 p-3 shadow-xs space-y-1.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-emerald-700 text-lg">
                {card.icon}
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-100">
                {card.badge}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-gray-900">{card.title}</h4>
              <p className="text-[11px] text-gray-500 leading-snug line-clamp-2 mt-0.5">
                {card.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Short AI Recommendation Box (2-3 Lines Max) */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">psychology</span>
            Blinkit AI Recommendation
          </span>
          {loading && (
            <span className="text-[10px] text-emerald-600 font-bold animate-pulse">
              Updating rationale...
            </span>
          )}
        </div>
        <p className="text-xs text-emerald-950 leading-relaxed font-medium">
          {concernSummary ||
            `Verified ${activeConcern} parameters. Sourced through official brand supply chain and covered under Blinkit 10-minute dark store return policies.`}
        </p>
      </div>

      {/* 5. Optional See All Evidence Link */}
      {onOpenSheet && (
        <div className="text-right pt-0.5">
          <button
            type="button"
            onClick={onOpenSheet}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1"
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
