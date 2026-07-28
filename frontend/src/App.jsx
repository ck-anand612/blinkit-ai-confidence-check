import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Common/Header';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50/60 font-sans text-gray-900 antialiased flex flex-col">
        <Header />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
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
  );
}

export default App;
