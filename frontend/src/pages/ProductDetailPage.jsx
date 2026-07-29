import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct, getConfidenceCheck } from '../api/client';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import TrustSignals from '../components/TrustSignals/TrustSignals';
import AIConfidenceCheck from '../components/AIConfidenceCheck/AIConfidenceCheck';
import AIConfidenceSheet from '../components/AIConfidenceCheck/AIConfidenceSheet';
import AddToCartCTA from '../components/AddToCartCTA/AddToCartCTA';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import SimilarProducts from '../components/SimilarProducts/SimilarProducts';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // AI Confidence State Management
  const [activeConcern, setActiveConcern] = useState('authenticity');
  const [confidenceCache, setConfidenceCache] = useState({});
  const [concernLoading, setConcernLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProduct(id);
        setProduct(data);
        // Pre-fetch initial concern (authenticity)
        fetchConcernSummary(id, 'authenticity');
      } catch (err) {
        console.error('Error fetching product:', err);
        if (err.response && err.response.status === 404) {
          setError('Product not found.');
        } else {
          setError('Failed to load product details.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchConcernSummary = async (productId, concernKey) => {
    if (confidenceCache[concernKey]) return;
    try {
      setConcernLoading(true);
      const res = await getConfidenceCheck(productId, concernKey);
      setConfidenceCache(prev => ({ ...prev, [concernKey]: res.summary }));
    } catch (err) {
      console.error(`Error fetching confidence check for ${concernKey}:`, err);
    } finally {
      setConcernLoading(false);
    }
  };

  const handleConcernChange = (newConcern) => {
    setActiveConcern(newConcern);
    if (product && product.id) {
      fetchConcernSummary(product.id, newConcern);
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center h-full bg-[#F8F8F8] text-[#1F1F1F]">
        <LoadingSpinner label="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#FFFFFF] rounded-[16px] p-6 border border-[#E5E5E5] text-center space-y-3 max-w-lg mx-auto my-8 shadow-xs text-[#1F1F1F]">
        <div className="text-3xl">🔍</div>
        <h2 className="text-base font-bold text-[#1F1F1F]">{error || 'Product Not Found'}</h2>
        <Link
          to="/"
          className="inline-block bg-[#0C831F] text-white font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-[#0A701A] transition-colors shadow-xs"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F8F8] text-[#1F1F1F] font-sans pb-14 relative">
      {/* Top Header Bar */}
      <header className="bg-[#FFFFFF] sticky top-0 z-40 flex items-center justify-between px-3.5 h-10 w-full border-b border-[#E5E5E5] shadow-2xs">
        <button 
          className="material-symbols-outlined text-[#2F2F2F] hover:bg-[#F3F4F6] p-1 rounded-full transition-colors text-base"
          onClick={() => navigate('/')}
        >
          arrow_back
        </button>
        <span className="text-xs font-extrabold text-[#1F1F1F] truncate max-w-[200px]">
          {product.name}
        </span>
        <div className="flex items-center gap-1.5 text-[#2F2F2F]">
          <button className="material-symbols-outlined text-sm hover:bg-[#F3F4F6] p-1 rounded-full">share</button>
        </div>
      </header>

      <main className="bg-[#F8F8F8] overflow-hidden relative space-y-2">
        {/* 1. Product Header (Hero Image, Info & Delivery Badge) */}
        <ProductHeader product={product} />

        {/* 2. Trust Signals Badges */}
        <TrustSignals showBadges={true} showDescription={false} />

        {/* 3. Purchase Confidence Engine */}
        <AIConfidenceCheck 
          product={product} 
          activeConcern={activeConcern}
          onConcernChange={handleConcernChange}
          concernSummary={confidenceCache[activeConcern]}
          loading={concernLoading}
          onOpenSheet={() => setIsSheetOpen(true)}
        />

        {/* 4. Similar Products */}
        <SimilarProducts currentProduct={product} />
      </main>

      {/* 5. Add to Cart Call To Action (Sticky Footer) */}
      <AddToCartCTA product={product} price={product.price} />

      {/* 6. AI Evidence Full-Screen View INSIDE Mobile Frame */}
      <AIConfidenceSheet 
        isOpen={isSheetOpen} 
        onClose={() => setIsSheetOpen(false)} 
        product={product}
        activeConcern={activeConcern}
        onConcernChange={handleConcernChange}
        concernSummary={confidenceCache[activeConcern]}
        loading={concernLoading}
      />
    </div>
  );
};

export default ProductDetailPage;
