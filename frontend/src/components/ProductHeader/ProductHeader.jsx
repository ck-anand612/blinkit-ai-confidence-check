import React from 'react';

export const ProductHeader = ({ product }) => {
  if (!product) return null;

  return (
    <>
      {/* Hero Image Gallery */}
      <section className="relative w-full h-[450px] bg-surface-container-low overflow-hidden snap-x snap-mandatory flex hide-scroll">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : ''}
          alt={product.name}
          className="w-full h-full object-cover shrink-0 snap-center"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%239ca3af'%3ENo Image Available%3C/text%3E%3C/svg%3E";
          }}
        />
        {/* Pagination Dots overlay (simplified for MVP) */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-on-background opacity-100"></span>
          <span className="w-2 h-2 rounded-full bg-on-background opacity-40"></span>
          <span className="w-2 h-2 rounded-full bg-on-background opacity-40"></span>
        </div>
      </section>

      {/* Product Header Info */}
      <section className="px-margin-mobile py-lg border-b border-surface-variant">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background mb-1">
              {product.name}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              by {product.brand} | {product.size || 'Standard'}
            </p>
          </div>
          <button className="material-symbols-outlined text-outline p-2 hover:bg-surface-container-low rounded-full transition-colors">
            favorite_border
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 bg-surface-container-low w-fit px-3 py-1.5 rounded-md">
          <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
          <span className="font-label-lg text-label-lg text-on-background">12 mins</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant ml-1">Delivery</span>
        </div>
      </section>
    </>
  );
};

export default ProductHeader;

