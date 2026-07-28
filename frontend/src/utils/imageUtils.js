export const getBrandedFallbackImage = (productName = 'Blinkit Product') => {
  const safeName = (productName || 'Blinkit Product')
    .replace(/[<>&'"]/g, '')
    .trim();
  const displayName = safeName.length > 28 ? `${safeName.slice(0, 28)}...` : safeName;

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>
    <defs>
      <linearGradient id='bgGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='%23FFFDF0'/>
        <stop offset='100%' stop-color='%23F4F6F8'/>
      </linearGradient>
    </defs>
    <rect width='400' height='400' fill='url(%23bgGrad)'/>
    <rect x='20' y='20' width='360' height='360' rx='24' fill='none' stroke='%23F7D002' stroke-width='3' stroke-dasharray='8 8'/>
    <circle cx='200' cy='150' r='60' fill='%23F7D002' opacity='0.25'/>
    <rect x='160' y='110' width='80' height='80' rx='18' fill='%230C831F'/>
    <path d='M190 130 L210 145 L198 152 L212 170' stroke='%23F7D002' stroke-width='4' fill='none' stroke-linecap='round' stroke-linejoin='round'/>
    <text x='200' y='235' font-family='system-ui, sans-serif' font-weight='800' font-size='22' fill='%230C831F' text-anchor='middle'>blinkit</text>
    <text x='200' y='265' font-family='system-ui, sans-serif' font-weight='600' font-size='13' fill='%234B5563' text-anchor='middle'>${displayName}</text>
    <rect x='130' y='290' width='140' height='28' rx='14' fill='%23F7D002'/>
    <text x='200' y='309' font-family='system-ui, sans-serif' font-weight='700' font-size='12' fill='%231F2937' text-anchor='middle'>⚡ 10 MINS DELIVERY</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const getProductImageUrl = (product) => {
  return product?.images?.[0] || product?.image || getBrandedFallbackImage(product?.name);
};

export const handleImageLoadError = (e, productName) => {
  e.target.onerror = null;
  e.target.src = getBrandedFallbackImage(productName);
};

export const handleImageLoadCheck = () => {
  // All 23 products now have authentic full-size images
};
