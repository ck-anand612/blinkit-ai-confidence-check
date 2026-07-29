import React, { useRef } from 'react';

export const TrustSignals = ({ showBadges = true, showDescription = false, description }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 py-2.5 bg-[#F8F8F8] relative">
      {showBadges && (
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#E5E5E5] text-[#1F1F1F] shadow-xs flex items-center justify-center hover:bg-[#F3F4F6] transition-opacity cursor-pointer"
            title="Scroll left"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          {/* Scrollable Badges Container */}
          <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-none pb-1 px-1">
            <div className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded-xl shrink-0 border border-[#E5E5E5] shadow-xs">
              <span className="material-symbols-outlined text-[#0C831F] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-xs font-bold text-[#1F1F1F]">Brand Verified</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded-xl shrink-0 border border-[#E5E5E5] shadow-xs">
              <span className="material-symbols-outlined text-[#0C831F] text-base">
                qr_code_scanner
              </span>
              <span className="text-xs font-bold text-[#1F1F1F]">Batch Verified</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded-xl shrink-0 border border-[#E5E5E5] shadow-xs">
              <span className="material-symbols-outlined text-[#0C831F] text-base">
                ac_unit
              </span>
              <span className="text-xs font-bold text-[#1F1F1F]">Temp-Controlled</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded-xl shrink-0 border border-[#E5E5E5] shadow-xs">
              <span className="material-symbols-outlined text-[#0C831F] text-base">
                local_shipping
              </span>
              <span className="text-xs font-bold text-[#1F1F1F]">10-Min Dispatch</span>
            </div>
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#E5E5E5] text-[#1F1F1F] shadow-xs flex items-center justify-center hover:bg-[#F3F4F6] transition-opacity cursor-pointer"
            title="Scroll right"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
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
