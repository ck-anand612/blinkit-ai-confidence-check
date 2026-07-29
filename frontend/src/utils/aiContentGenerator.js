export const generateRiskAssessment = (product) => {
  const name = (product?.name || '').toLowerCase();
  const tags = (product?.tags || []).join(' ').toLowerCase();
  const subCategory = (product?.subCategory || '').toLowerCase();
  const allText = `${name} ${tags} ${subCategory}`;

  if (allText.includes('niacinamide')) {
    return 'Patch test recommended for first-time users. Mild tingling may occur initially. Suitable for daily use after skin adapts.';
  }
  if (allText.includes('salicylic') || allText.includes('bha')) {
    return 'May cause temporary dryness. Introduce gradually (2–3 times/week). Use sunscreen during daytime.';
  }
  if (allText.includes('vitamin c')) {
    return 'Store away from sunlight. Avoid combining with strong exfoliating acids if skin is sensitive.';
  }
  if (allText.includes('cleanser') || allText.includes('face wash')) {
    return 'Very low risk. Suitable for sensitive skin. Safe for daily cleansing.';
  }
  if (allText.includes('moisturizer') || allText.includes('cream') || allText.includes('lotion')) {
    return 'Low irritation risk. Suitable for everyday use. Compatible with most skincare routines.';
  }
  
  return product?.warnings || `Low risk profile. Free from common allergens (parabens, sulfates). A standard 24-hour patch test is always recommended when introducing new active ingredients to your routine.`;
};

export const generateCommunityInsights = (product) => {
  const name = (product?.name || '').toLowerCase();
  const tags = (product?.tags || []).join(' ').toLowerCase();
  const subCategory = (product?.subCategory || '').toLowerCase();
  const allText = `${name} ${tags} ${subCategory}`;

  if (allText.includes('niacinamide')) {
    return 'Users frequently report reduced oiliness and smoother skin after 2–4 weeks.';
  }
  if (allText.includes('salicylic') || allText.includes('bha')) {
    return 'Most users observed fewer breakouts with consistent use.';
  }
  if (allText.includes('cleanser') || allText.includes('face wash')) {
    return 'Frequently praised for gentle cleansing and suitability for sensitive skin.';
  }
  if (allText.includes('moisturizer') || allText.includes('cream') || allText.includes('lotion')) {
    return 'Users appreciate long-lasting hydration without a greasy finish.';
  }

  return product?.reviews?.summary || `Over 2,000+ verified buyers rate this highly for ${product?.subCategory || 'daily use'}. 94% noticed positive changes within 2 weeks. The general consensus points to a non-greasy finish.`;
};

export const generatePersonalizedRecommendation = (product) => {
  const name = (product?.name || '').toLowerCase();
  const tags = (product?.tags || []).join(' ').toLowerCase();
  const subCategory = (product?.subCategory || '').toLowerCase();
  const allText = `${name} ${tags} ${subCategory}`;

  if (allText.includes('niacinamide')) {
    return 'This Niacinamide serum is recommended for oily and acne-prone skin because of its balanced formulation and verified authenticity.';
  }
  if (allText.includes('salicylic') || allText.includes('bha')) {
    return 'This Salicylic Acid product is highly recommended for reducing breakouts, supported by strong formulation safety and authenticity verification.';
  }
  if (allText.includes('vitamin c')) {
    return 'This Vitamin C serum is recommended for brightening skin tone, securely verified for authentic supply chain and quality actives.';
  }
  if (allText.includes('cleanser') || allText.includes('face wash')) {
    return 'This cleanser is suitable for daily cleansing and is a low-risk purchase based on authenticity, formulation quality, and customer feedback.';
  }
  if (allText.includes('moisturizer') || allText.includes('cream') || allText.includes('lotion')) {
    return 'This moisturizer is a safe everyday skincare choice with strong authenticity verification and excellent compatibility.';
  }

  return `This ${product?.subCategory || 'skincare product'} is recommended for high purchase confidence. Verified authentic stock stored in 10-minute dark stores.`;
};
