import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/client';
import ProductCard from '../components/Common/ProductCard';

export const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data || []);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const subCategories = ['All', ...new Set(products.map((p) => p.subCategory).filter(Boolean))];

  const filteredProducts =
    selectedSubCategory === 'All'
      ? products
      : products.filter((p) => p.subCategory === selectedSubCategory);

  return (
    <div className="bg-[#F8F8F8] text-[#1F1F1F] pb-14 font-sans">
      {/* Header (Blinkit Official Header with Solid Soft Yellow #F8C537 Bar) */}
      <div className="bg-[#F8C537] p-3 space-y-2.5 rounded-b-2xl border-b border-amber-300 shadow-2xs">
        {/* Status Bar emulation */}
        <div className="flex items-center justify-between text-[11px] text-[#1F1F1F] font-bold px-0.5">
          <span>22:02</span>
          <div className="flex items-center space-x-1 text-[10px]">
            <span>4G</span>
            <span className="material-symbols-outlined text-xs">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-xs">battery_full</span>
          </div>
        </div>

        {/* Delivery Time, Address Banner & Right Action Icons */}
        <div className="flex items-start justify-between pt-0.5">
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#1F1F1F]/70 uppercase tracking-wider block">
              Blinkit in
            </span>
            <h1 className="text-2xl font-black tracking-tight text-[#1F1F1F] leading-none">
              17 minutes
            </h1>
            <div className="flex items-center space-x-1 text-[11px] font-semibold text-[#1F1F1F] pt-0.5 cursor-pointer hover:text-black">
              <span className="font-extrabold text-[#1F1F1F]">HOME</span>
              <span>-</span>
              <span className="truncate max-w-[170px]">Sector 49, Gurgaon</span>
              <span className="material-symbols-outlined text-xs text-[#1F1F1F]">arrow_drop_down</span>
            </div>
          </div>

          {/* Right Header Wallet & Profile Icons */}
          <div className="flex items-center space-x-1.5 pt-1">
            <div className="bg-[#FFFFFF]/90 border border-amber-300 px-2 py-0.5 rounded-full flex items-center space-x-1 text-[11px] font-extrabold text-[#1F1F1F] shadow-2xs">
              <span className="material-symbols-outlined text-xs text-[#0C831F]">account_balance_wallet</span>
              <span>₹0</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#FFFFFF]/90 border border-amber-300 flex items-center justify-center text-[#1F1F1F] shadow-2xs">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
          </div>
        </div>

        {/* Search Bar directly underneath */}
        <div className="relative pt-0.5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#2F2F2F]">
            <span className="material-symbols-outlined text-base">search</span>
          </div>
          <input
            type="text"
            readOnly
            placeholder='Search "lipstick", "sunscreen"...'
            className="w-full pl-9 pr-8 py-2 bg-white border border-amber-200 rounded-xl text-xs text-[#1F1F1F] placeholder-[#666666] focus:outline-none cursor-pointer shadow-2xs"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#2F2F2F]">
            <span className="material-symbols-outlined text-base">mic</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-3 space-y-3">
        {/* Promotional AI Banner */}
        <div className="bg-[#F3F4F6] rounded-[16px] px-3.5 py-2.5 border border-[#E5E5E5] text-[#1F1F1F] shadow-2xs relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none text-[#0C831F]">
            <span className="material-symbols-outlined text-6xl">auto_awesome</span>
          </div>
          <div className="relative z-10 space-y-1">
            <div className="flex items-center space-x-1.5">
              <span className="bg-[#F8C537] text-[#1F1F1F] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                Confidence Guarantee
              </span>
              <span className="text-[#0C831F] text-[10px] font-extrabold flex items-center space-x-0.5">
                <span className="material-symbols-outlined text-xs">verified</span>
                <span>AI-powered Confidence Check</span>
              </span>
            </div>
            <h2 className="text-xs font-black tracking-tight leading-tight text-[#1F1F1F]">
              Beauty & Personal Care Catalog
            </h2>
            <p className="text-[#666666] text-[10px] line-clamp-2 leading-tight">
              Instant AI answers on Authenticity, Suitability, Quality, and Returns before you buy.
            </p>
          </div>
        </div>

        {/* Subcategory Filter Pills */}
        {!loading && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {subCategories.map((subCat) => {
              const isSelected = selectedSubCategory === subCat;

              return (
                <button
                  key={subCat}
                  type="button"
                  onClick={() => setSelectedSubCategory(subCat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 border ${
                    isSelected
                      ? 'bg-[#0C831F] text-white border-[#0C831F] shadow-xs font-extrabold'
                      : 'bg-white text-[#1F1F1F] border border-[#E5E5E5] hover:border-gray-400'
                  }`}
                >
                  {subCat} ({subCat === 'All' ? products.length : products.filter(p => p.subCategory === subCat).length})
                </button>
              );
            })}
          </div>
        )}

        {/* Content Section: Products Grid / Skeleton Loader */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-[#1F1F1F] tracking-wider uppercase">
              {selectedSubCategory === 'All' ? 'All Beauty Products' : selectedSubCategory}
            </h3>
            <span className="text-xs text-[#0C831F] font-bold">
              {filteredProducts.length} Items
            </span>
          </div>

          {/* Skeleton cards or Products grid */}
          {loading || filteredProducts.length === 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-white border border-[#E5E5E5] rounded-[16px] p-3 h-48 flex flex-col justify-between animate-pulse"
                >
                  <div className="w-full h-24 bg-[#F8F8F8] rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#F8F8F8] rounded w-3/4"></div>
                    <div className="h-3 bg-[#F8F8F8] rounded w-1/2"></div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#E5E5E5]">
                    <div className="h-4 bg-[#F8F8F8] rounded w-10"></div>
                    <div className="h-6 bg-emerald-100 rounded-lg w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
