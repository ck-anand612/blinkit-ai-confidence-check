import React from 'react';

export const TrustSignals = ({ showBadges = true, showDescription = true, description }) => {
  return (
    <section className="px-4 py-3 bg-[#121212]">
      {showBadges && (
        <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-1">
          <div className="flex items-center gap-1.5 bg-[#1E1E1E] px-3 py-2 rounded-xl shrink-0 border border-white/10">
            <span className="material-symbols-outlined text-[#18C37E] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="text-xs font-bold text-white">Brand Verified</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1E1E1E] px-3 py-2 rounded-xl shrink-0 border border-white/10">
            <span className="material-symbols-outlined text-[#F8C537] text-base">
              qr_code_scanner
            </span>
            <span className="text-xs font-bold text-white">Batch Verified</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1E1E1E] px-3 py-2 rounded-xl shrink-0 border border-white/10">
            <span className="material-symbols-outlined text-[#B8B8B8] text-base">
              ac_unit
            </span>
            <span className="text-xs font-bold text-white">Temp-Controlled</span>
          </div>
        </div>
      )}
      
      {showDescription && description && (
        <div className={showBadges ? "mt-4 pb-4" : "pt-2 pb-4"}>
          <h3 className="text-xs font-black text-white tracking-wider uppercase mb-1.5">Description</h3>
          <p className="text-xs text-[#B8B8B8] leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </section>
  );
};

export default TrustSignals;
