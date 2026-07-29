import React from 'react';

export const TrustSignals = ({ showBadges = true, showDescription = false, description }) => {
  return (
    <section className="px-4 py-2.5 bg-[#F8F8F8]">
      {showBadges && (
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          <div className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded-xl shrink-0 border border-[#E5E5E5] shadow-xs">
            <span className="material-symbols-outlined text-[#0C831F] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="text-xs font-bold text-[#1F1F1F]">Brand Verified</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded-xl shrink-0 border border-[#E5E5E5] shadow-xs">
            <span className="material-symbols-outlined text-[#2F2F2F] text-base">
              qr_code_scanner
            </span>
            <span className="text-xs font-bold text-[#1F1F1F]">Batch Verified</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded-xl shrink-0 border border-[#E5E5E5] shadow-xs">
            <span className="material-symbols-outlined text-[#2F2F2F] text-base">
              ac_unit
            </span>
            <span className="text-xs font-bold text-[#1F1F1F]">Temp-Controlled</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded-xl shrink-0 border border-[#E5E5E5] shadow-xs">
            <span className="material-symbols-outlined text-[#2F2F2F] text-base">
              local_shipping
            </span>
            <span className="text-xs font-bold text-[#1F1F1F]">10-Min Dispatch</span>
          </div>
        </div>
      )}
      
      {showDescription && description && (
        <div className="bg-[#FFFFFF] rounded-[16px] border border-[#E5E5E5] p-3 shadow-xs mt-2">
          <h3 className="text-xs font-black text-[#1F1F1F] tracking-wider uppercase mb-1">Description</h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </section>
  );
};

export default TrustSignals;
