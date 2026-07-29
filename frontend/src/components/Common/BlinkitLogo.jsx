import React from 'react';

export const BlinkitLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center tracking-tighter select-none font-black text-2xl leading-none ${className}`}>
      <span className="text-[#1F1F1F] font-black italic">blink</span>
      <span className="text-[#0C831F] font-black italic">it</span>
    </div>
  );
};

export default BlinkitLogo;
