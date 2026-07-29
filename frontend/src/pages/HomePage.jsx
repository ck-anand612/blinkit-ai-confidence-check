import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/client';
import ProductCard from '../components/Common/ProductCard';

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Beauty');

  const categories = [
    { name: 'All', icon: 'grid_view' },
    { name: 'Grocery', icon: 'shopping_basket' },
    { name: 'Electronics', icon: 'headphones' },
    { name: 'Beauty', icon: 'auto_awesome' },
    { name: 'Decor', icon: 'chair' },
    { name: 'Kids', icon: 'child_care' },
  ];

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

  const handleCategoryClick = (categoryName) => {
    if (categoryName === 'Beauty') {
      setSelectedCategory('Beauty');
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white pb-20 font-sans">
      {/* Header (Blinkit Dark Maroon #2B0D0D) */}
      <div className="bg-gradient-to-b from-[#2B0D0D] via-[#1E0909] to-[#121212] p-4 space-y-5 rounded-b-3xl border-b border-white/10">
        {/* Status Bar emulation */}
        <div className="flex items-center justify-between text-xs text-[#B8B8B8] font-semibold px-1 pt-0.5">
          <span>22:02</span>
          <div className="flex items-center space-x-1.5 text-[11px]">
            <span>4G</span>
            <span className="material-symbols-outlined text-sm">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-sm">battery_full</span>
          </div>
        </div>

        {/* Compact Delivery Section (Primary: Delivery Time, Address Below) */}
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold text-[#B8B8B8] uppercase tracking-wider block">
              Blinkit in
            </span>
            <h1 className="text-3xl font-black tracking-tight text-white leading-none">
              17 minutes
            </h1>
            <div className="flex items-center space-x-1 text-xs font-medium text-[#B8B8B8] pt-1 cursor-pointer hover:text-white">
              <span className="font-bold text-white">HOME</span>
              <span>•</span>
              <span className="truncate max-w-[190px]">Sector 49, Gurgaon</span>
              <span className="material-symbols-outlined text-sm text-[#B8B8B8]">arrow_drop_down</span>
            </div>
          </div>

          {/* Right Header Action Icons */}
          <div className="flex items-center space-x-2">
            <div className="bg-[#1A1A1A] border border-white/10 px-2.5 py-1 rounded-full flex items-center space-x-1 text-xs font-bold text-[#F8C537]">
              <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
              <span>₹0</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-base">person</span>
            </div>
          </div>
        </div>

        {/* Search Bar directly underneath */}
        <div className="relative pt-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B8B8B8]">
            <span className="material-symbols-outlined text-lg">search</span>
          </div>
          <input
            type="text"
            readOnly
            placeholder='Search "birthday gift", "lipstick", "sunscreen"...'
            className="w-full pl-10 pr-10 py-2.5 bg-[#1A1A1A] border border-white/10 rounded-2xl text-xs text-white placeholder-[#B8B8B8] focus:outline-none cursor-pointer"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#B8B8B8]">
            <span className="material-symbols-outlined text-lg">mic</span>
          </div>
        </div>

        {/* Categories: Circular Icon Buttons with Yellow Active Highlight (#F8C537) */}
        <div className="pt-2">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-none px-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => handleCategoryClick(cat.name)}
                  className="flex flex-col items-center space-y-1.5 shrink-0 px-1.5 group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#F8C537] text-[#121212] shadow-lg scale-105'
                        : 'bg-[#1E1E1E] text-[#B8B8B8] border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                  </div>
                  <span
                    className={`text-[11px] font-bold transition-colors ${
                      isSelected ? 'text-white' : 'text-[#B8B8B8]'
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Feed Content */}
      <div className="p-4 space-y-5">
        {/* AI Banner (~30% reduced height, dark gradient with yellow #F8C537 & green #18C37E accents) */}
        <div className="max-h-[140px] bg-gradient-to-r from-[#1E1E1E] via-[#2A1D10] to-[#142A22] rounded-2xl px-4 py-3 border border-white/10 text-white shadow-lg relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-7xl">auto_awesome</span>
          </div>
          <div className="relative z-10 space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="bg-[#F8C537] text-[#121212] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                AI Confidence Check
              </span>
              <span className="text-[#18C37E] text-[11px] font-bold flex items-center space-x-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                <span>Instant AI Analysis</span>
              </span>
            </div>
            <h2 className="text-sm font-black tracking-tight leading-tight">
              Shop Beauty with 100% AI Confidence
            </h2>
            <p className="text-[#B8B8B8] text-[11px] line-clamp-2 leading-tight">
              Tap any item below for instant AI compatibility, authenticity & returns verification.
            </p>
          </div>
        </div>

        {/* Product Feed Section ("Frequently bought") */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-white tracking-wider uppercase">
              Frequently bought
            </h3>
            <span className="text-xs text-[#F8C537] font-bold cursor-pointer hover:underline">
              See all
            </span>
          </div>

          {/* Skeleton cards (#1E1E1E placeholders) or Product Grid */}
          {loading || products.length === 0 ? (
            <div className="grid grid-cols-2 gap-3.5">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-[#1E1E1E] border border-white/10 rounded-2xl p-3 h-48 flex flex-col justify-between animate-pulse"
                >
                  <div className="w-full h-24 bg-[#2A2A2A] rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#2A2A2A] rounded w-3/4"></div>
                    <div className="h-3 bg-[#2A2A2A] rounded w-1/2"></div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <div className="h-4 bg-[#2A2A2A] rounded w-10"></div>
                    <div className="h-6 bg-[#18C37E]/20 rounded-lg w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
