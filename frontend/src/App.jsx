import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Common/Header';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50/60 font-sans text-gray-900 antialiased flex flex-col">
          <Header />
          
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<ProductListingPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              {/* Catch-all route */}
              <Route path="*" element={<ProductListingPage />} />
            </Routes>
          </main>

          <footer className="bg-white border-t border-gray-100 py-6 text-center text-xs text-gray-400 space-y-1">
            <p>© 2026 Blinkit Confidence Experience — AI-Native MVP</p>
            <p>Powered by FastAPI + Groq AI (Llama 3.1) + React</p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
