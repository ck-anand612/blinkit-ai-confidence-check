import React from 'react';
import { getProductImageUrl, handleImageLoadError, handleImageLoadCheck } from '../../utils/imageUtils';

export const ProductHeader = ({ product }) => {
  if (!product) return null;

  return (
    <>
      {/* Hero Image Gallery */}
      <section className="relative w-full h-[320px] bg-[#FFFFFF] border-b border-[#E5E5E5] overflow-hidden flex justify-center items-center">
        <img
          src={getProductImageUrl(product)}
          alt={product.name}
          className="max-h-full max-w-full object-contain p-4"
          onLoad={(e) => handleImageLoadCheck(e, product.name)}
          onError={(e) => handleImageLoadError(e, product.name)}
        />
        {/* Pagination Dots overlay */}
        <div className="absolute bottom-3 left-0 w-full flex justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0C831F]"></span>
          <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
          <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
        </div>
      </section>

      {/* Product Header Info */}
      <section className="px-4 py-3 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h1 className="text-base font-bold text-[#1F1F1F] leading-snug mb-0.5 pt-4">
              {product.name}
            </h1>
            <p className="text-xs font-semibold text-[#666666] mb-1.5">
              by {product.brand} {product.size ? `| ${product.size}` : ''}
            </p>
            {product.description && (
              <p className="text-xs text-[#666666] leading-relaxed mb-2">
                {product.description}
              </p>
            )}
          </div>
          <button className="material-symbols-outlined text-[#2F2F2F] p-2 hover:bg-[#F3F4F6] rounded-full transition-colors shrink-0">
            favorite_border
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 bg-[#F3F4F6] border border-[#E5E5E5] w-fit px-3 py-1 rounded-lg">
          <span className="material-symbols-outlined text-[#0C831F] text-[18px]">schedule</span>
          <span className="text-xs font-extrabold text-[#1F1F1F]">12 mins</span>
          <span className="text-xs text-[#666666]">Delivery</span>
        </div>
      </section>
    </>
  );
};

export default ProductHeader;
