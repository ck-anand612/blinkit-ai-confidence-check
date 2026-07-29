import React, { useRef } from 'react';

import { generatePersonalizedRecommendation } from '../../utils/aiContentGenerator';

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


  const formattedRecommendation = generatePersonalizedRecommendation(product);

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
