import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import BottomNav from './components/Common/BottomNav';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Outer Backdrop (Centered Desktop Layout) */}
        <div className="min-h-screen bg-[#18181B] flex items-center justify-center p-2 sm:p-6 font-sans text-gray-900 antialiased selection:bg-[#F7D002] selection:text-black">
          {/* Standard 6-Inch Mobile Viewport Frame (390px width x 720px height) */}
          <div className="w-full max-w-[390px] h-screen sm:h-[720px] sm:max-h-[720px] bg-[#F8F8F8] sm:rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden border border-[#E5E5E5] sm:border-[6px] sm:border-gray-800">
            {/* Top Phone Camera Notch (Desktop Preview) */}
            <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-black rounded-full z-50 pointer-events-none"></div>

            {/* Scrollable Main Content Container */}
            <main className="flex-1 overflow-y-auto scrollbar-none relative pb-14 bg-[#F8F8F8]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/listing" element={<ProductListingPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                {/* Catch-all route */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            {/* Fixed Bottom Navigation */}
            <BottomNav />
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
