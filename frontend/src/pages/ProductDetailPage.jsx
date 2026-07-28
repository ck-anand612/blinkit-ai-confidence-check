import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct, getConfidenceCheck } from '../api/client';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import TrustSignals from '../components/TrustSignals/TrustSignals';
import AIConfidenceCheck from '../components/AIConfidenceCheck/AIConfidenceCheck';
import AIConfidenceSheet from '../components/AIConfidenceCheck/AIConfidenceSheet';
import AddToCartCTA from '../components/AddToCartCTA/AddToCartCTA';
import LoadingSpinner from '../components/Common/LoadingSpinner';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // AI Confidence Sheet State
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [sheetLoading, setSheetLoading] = useState(false);
  const [sheetError, setSheetError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProduct(id);
        setProduct(data);
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

  const handleViewDetails = async () => {
    setIsSheetOpen(true);
    if (summaryData || sheetLoading) return;

    setSheetLoading(true);
    setSheetError(false);
    try {
      const data = await getConfidenceCheck(product.id, 'suitability');
      setSummaryData(data);
    } catch (err) {
      console.error('Error fetching confidence check:', err);
      setSheetError(true);
    } finally {
      setSheetLoading(false);
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
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 md:pb-0 relative">
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
        {/* 1. Product Header (Hero Image & Info) */}
        <ProductHeader product={product} />

        {/* 2. Core MVP: AI Confidence Check Card */}
        <AIConfidenceCheck 
          product={product} 
          onViewDetails={handleViewDetails} 
        />

        {/* 3. Static Trust Signals & Description */}
        <TrustSignals description={product.description} />

        {/* Similar Products (Mock) */}
        <section className="px-margin-mobile py-md bg-surface-container-low mb-24 md:mb-0">
          <h3 className="font-title-lg text-title-lg text-on-background mb-4">Similar Products</h3>
          <div className="flex gap-4 overflow-x-auto hide-scroll pb-4">
            <div className="w-32 shrink-0 bg-surface-container-lowest rounded-lg p-2 shadow-sm border border-surface-variant opacity-70">
              <div className="w-full h-32 bg-surface-variant rounded-md mb-2"></div>
              <p className="font-label-sm text-label-sm text-on-background line-clamp-2 mb-1">Coming Soon</p>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Add to Cart Call To Action (Sticky Footer) */}
      <AddToCartCTA price={product.price} />

      {/* AI Confidence Bottom Sheet */}
      <AIConfidenceSheet 
        isOpen={isSheetOpen} 
        onClose={() => setIsSheetOpen(false)} 
        product={product}
        summaryData={summaryData}
        loading={sheetLoading}
        error={sheetError}
        onRetry={handleViewDetails}
      />
    </div>
  );
};

export default ProductDetailPage;


