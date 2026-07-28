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
      <section className="px-margin-mobile py-md bg-surface-container-low mb-24 md:mb-0">
        <h3 className="font-title-lg text-title-lg text-on-background mb-4">Similar Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-surface-container-lowest rounded-xl p-3 shadow-sm border border-surface-variant animate-pulse h-56 flex flex-col justify-between">
              <div className="w-full h-28 bg-surface-variant rounded-md"></div>
              <div className="h-4 bg-surface-variant rounded w-3/4"></div>
              <div className="h-4 bg-surface-variant rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (similarList.length === 0) return null;

  return (
    <section className="px-margin-mobile py-md bg-surface-container-low mb-24 md:mb-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title-lg text-title-lg text-on-background font-bold">Similar Products</h3>
        <span className="text-xs text-on-surface-variant font-medium">Based on {currentProduct?.brand || 'Category'}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {similarList.map(item => (
          <div 
            key={item.id}
            className="bg-surface-container-lowest rounded-xl p-3 shadow-sm border border-surface-variant flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <Link 
              to={`/products/${item.id}`} 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="block flex-1 flex flex-col"
            >
              <div className="w-full h-32 bg-gray-50 rounded-lg p-2 flex items-center justify-center overflow-hidden mb-2">
                <img
                  src={getProductImageUrl(item)}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  onLoad={(e) => handleImageLoadCheck(e, item.name)}
                  onError={(e) => handleImageLoadError(e, item.name)}
                />
              </div>

              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                {item.brand}
              </span>
              <h4 className="font-label-sm text-label-sm text-on-background line-clamp-2 mb-2 font-medium group-hover:text-emerald-700 transition-colors">
                {item.name}
              </h4>
            </Link>

            <div className="pt-2 border-t border-surface-variant flex items-center justify-between mt-auto">
              <span className="font-title-md text-title-md font-bold text-on-background">
                ₹{item.price}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => addToCart(item, 1)}
                  className="bg-emerald-50 hover:bg-emerald-700 text-emerald-700 hover:text-white text-[11px] font-bold px-2 py-1 rounded transition-colors"
                >
                  + Add
                </button>
                <Link
                  to={`/products/${item.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-2xs transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
