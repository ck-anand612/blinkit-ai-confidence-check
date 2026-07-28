import React from 'react';

export const TrustSignals = ({ description }) => {
  return (
    <section className="px-margin-mobile py-sm">
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
      
      {description && (
        <div className="mt-lg pb-xl">
          <h3 className="font-title-lg text-title-lg text-on-background mb-2">Description</h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </section>
  );
};

export default TrustSignals;

