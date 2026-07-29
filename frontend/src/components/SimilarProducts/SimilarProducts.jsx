import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/client';
import { getProductImageUrl, handleImageLoadError, handleImageLoadCheck } from '../../utils/imageUtils';
import { useCart } from '../../context/useCart';

export const SimilarProducts = ({ currentProduct }) => {
  const [similarList, setSimilarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    const fetchSimilar = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        if (!isMounted || !Array.isArray(allProducts)) return;

        // Filter out current product
        const candidates = allProducts.filter(p => p.id !== currentProduct?.id);

        // Sort by category match, subcategory match, or brand match
        const matches = candidates.filter(p => 
          (currentProduct?.category && p.category === currentProduct.category) ||
          (currentProduct?.subCategory && (p.subCategory === currentProduct.subCategory || p.subcategory === currentProduct.subCategory)) ||
          (currentProduct?.brand && p.brand === currentProduct.brand)
        );

        // If not enough matches, fallback to other candidates
        let finalSelection = matches.slice(0, 4);
        if (finalSelection.length < 3) {
          const remaining = candidates.filter(p => !finalSelection.some(f => f.id === p.id));
          finalSelection = [...finalSelection, ...remaining].slice(0, 4);
        }

        setSimilarList(finalSelection);
      } catch (err) {
        console.error('Failed to load similar products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (currentProduct) {
      fetchSimilar();
    }
    return () => {
      isMounted = false;
    };
  }, [currentProduct]);

  if (loading) {
    return (
      <section className="px-4 py-3 bg-[#F8F8F8] mb-20">
        <h3 className="text-sm font-extrabold text-[#1F1F1F] mb-3">Similar Products</h3>
        <div className="flex gap-2.5 overflow-x-auto scrollbar-none">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-32 shrink-0 bg-[#FFFFFF] rounded-[16px] p-2.5 border border-[#E5E5E5] animate-pulse h-48 flex flex-col justify-between">
              <div className="w-full h-24 bg-[#F8F8F8] rounded-md"></div>
              <div className="h-3 bg-[#F8F8F8] rounded w-3/4"></div>
              <div className="h-3 bg-[#F8F8F8] rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (similarList.length === 0) return null;

  return (
    <section className="px-4 py-3 bg-[#F8F8F8] mb-20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-extrabold text-[#1F1F1F]">Similar Products</h3>
        <span className="text-[10px] text-[#666666] font-semibold">Based on {currentProduct?.brand || 'Category'}</span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-2">
        {similarList.slice(0, 5).map(item => (
          <div 
            key={item.id}
            className="w-32 shrink-0 bg-[#FFFFFF] rounded-[16px] p-2.5 shadow-xs border border-[#E5E5E5] flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <Link 
              to={`/products/${item.id}`} 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="block flex-1 flex flex-col"
            >
              <div className="w-full h-24 bg-[#F8F8F8] rounded-lg p-1.5 flex items-center justify-center overflow-hidden mb-1.5">
                <img
                  src={getProductImageUrl(item)}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  onLoad={(e) => handleImageLoadCheck(e, item.name)}
                  onError={(e) => handleImageLoadError(e, item.name)}
                />
              </div>

              <span className="text-[9px] font-bold text-[#666666] uppercase tracking-wider block mb-0.5 truncate">
                {item.brand}
              </span>
              <h4 className="text-[11px] font-bold text-[#1F1F1F] line-clamp-2 leading-tight mb-2 group-hover:text-[#0C831F] transition-colors">
                {item.name}
              </h4>
            </Link>

            <div className="pt-1.5 border-t border-[#E5E5E5] flex items-center justify-between mt-auto">
              <span className="text-xs font-black text-[#1F1F1F]">
                ₹{item.price}
              </span>
              <button
                type="button"
                onClick={() => addToCart(item, 1)}
                className="bg-[#0C831F] hover:bg-[#0A701A] text-white border border-[#0C831F] text-[10px] font-extrabold px-2 py-0.5 rounded transition-colors shadow-2xs"
              >
                + ADD
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
