import React from 'react';

export const TrustSignals = ({ showBadges = true, showDescription = true, description }) => {
  return (
    <section className="px-margin-mobile py-sm">
      {showBadges && (
        <div className="flex gap-4 overflow-x-auto hide-scroll pb-2">
          <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg shrink-0 border border-surface-variant">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="font-label-sm text-label-sm text-on-background">Brand Verified</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg shrink-0 border border-surface-variant">
            <span className="material-symbols-outlined text-primary-container">qr_code_scanner</span>
            <span className="font-label-sm text-label-sm text-on-background">Batch Verified</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg shrink-0 border border-surface-variant">
            <span className="material-symbols-outlined text-on-surface-variant">ac_unit</span>
            <span className="font-label-sm text-label-sm text-on-background">Temp-Controlled Storage</span>
          </div>
        </div>
      )}
      
      {showDescription && description && (
        <div className={showBadges ? "mt-lg pb-xl" : "pt-2 pb-xl"}>
          <h3 className="font-title-lg text-title-lg text-on-background mb-2 font-bold">Description</h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </section>
  );
};

export default TrustSignals;
