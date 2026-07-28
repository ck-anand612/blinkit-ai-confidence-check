import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/client';
import ProductCard from '../components/Common/ProductCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';

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
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const subCategories = ['All', ...new Set(products.map((p) => p.subCategory))];

  const filteredProducts =
    selectedSubCategory === 'All'
      ? products
      : products.filter((p) => p.subCategory === selectedSubCategory);

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-amber-400 text-gray-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Beauty & Personal Care
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            AI-Native Confidence Store
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Select any product to experience instant, AI-verified answers on Authenticity, Suitability, Quality, and Returns before you buy.
          </p>
        </div>
      </div>

      {/* Promotional AI Banner */}
      <div className="bg-primary-container rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center gap-4 shadow-sm border border-primary-container/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="material-symbols-outlined text-8xl">neurology</span>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm shrink-0 relative z-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
        </div>
        <div className="flex-1 relative z-10 text-center md:text-left">
          <h3 className="font-title-lg text-title-lg text-on-primary-container font-bold mb-1">
            New: AI Purchase Confidence
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Not sure if a premium beauty product is right for you? Tap any item below to see instant AI-verified analysis of skin compatibility, authenticity, and value.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      {!loading && !error && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {subCategories.map((subCat) => (
            <button
              key={subCat}
              onClick={() => setSelectedSubCategory(subCat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 border ${
                selectedSubCategory === subCat
                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {subCat} ({subCat === 'All' ? products.length : products.filter(p => p.subCategory === subCat).length})
            </button>
          ))}
        </div>
      )}

      {/* Content State */}
      {loading && <LoadingSpinner label="Loading Blinkit Beauty catalog..." />}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-700 space-y-2">
          <p className="font-semibold text-sm">{error}</p>
          <p className="text-xs text-red-500">Make sure the FastAPI backend is running</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
