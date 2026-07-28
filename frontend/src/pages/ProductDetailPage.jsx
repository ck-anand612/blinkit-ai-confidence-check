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
      <div className="py-12 flex justify-center items-center h-screen bg-background">
        <LoadingSpinner label="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-surface-container-lowest rounded-3xl p-8 border border-surface-variant text-center space-y-4 max-w-lg mx-auto my-12 shadow-sm">
        <div className="text-4xl">🔍</div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">{error || 'Product Not Found'}</h2>
        <Link
          to="/"
          className="inline-block bg-primary text-on-primary font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
        >
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-28 md:pb-0 relative">
      {/* Top Navigation (Mobile Focus) */}
      <header className="bg-surface sticky top-0 z-50 flex items-center justify-between px-margin-mobile h-14 w-full shadow-sm md:hidden">
        <div className="flex items-center gap-4 text-on-surface">
          <button 
            className="material-symbols-outlined hover:bg-surface-container-low transition-colors duration-200 ease-in-out p-1 rounded-full"
            onClick={() => navigate('/')}
          >
            arrow_back
          </button>
        </div>
        <div className="flex items-center gap-4 text-on-surface">
          <button className="material-symbols-outlined hover:bg-surface-container-low transition-colors duration-200 ease-in-out p-1 rounded-full">share</button>
          <button className="material-symbols-outlined hover:bg-surface-container-low transition-colors duration-200 ease-in-out p-1 rounded-full">search</button>
        </div>
      </header>

      <main className="max-w-screen-md mx-auto bg-surface-container-lowest md:mt-8 md:rounded-xl md:shadow-md overflow-hidden relative">
        {/* 1. Product Header (Hero Image, Info & Delivery Badge) */}
        <ProductHeader product={product} />

        {/* 2. Trust Signals Badges (Brand Verified, Batch Verified, Temp-Controlled) */}
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

        {/* 4. Product Description */}
        <TrustSignals showBadges={false} showDescription={true} description={product.description} />

        {/* 5. Real Similar Products */}
        <SimilarProducts currentProduct={product} />
      </main>

      {/* 5. Add to Cart Call To Action (Sticky Footer) */}
      <AddToCartCTA product={product} price={product.price} />

      {/* Optional Extended Evidence Bottom Sheet */}
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
