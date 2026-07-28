import React from 'react';
import { Link } from 'react-router-dom';
import { getBrandedFallbackImage } from '../../utils/imageUtils';
import { useCart } from '../../context/useCart';

export const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQtyClick = (e, delta) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, delta);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Category Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-emerald-50 text-emerald-700 font-semibold text-[11px] px-2.5 py-1 rounded-full border border-emerald-100">
          {product.subCategory || product.subcategory || 'Blinkit Fresh'}
        </span>
      </div>

      {/* Image container clickable to product detail */}
      <Link to={`/products/${product.id}`} className="w-full h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden relative">
        <img
          src={product.images && product.images.length > 0 && product.images[0] ? product.images[0] : getBrandedFallbackImage(product.name)}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getBrandedFallbackImage(product.name);
          }}
        />
      </Link>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <Link to={`/products/${product.id}`} className="block">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            {product.brand}
          </span>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 font-medium block">Price</span>
            <span className="text-base font-extrabold text-gray-900">₹{product.price}</span>
          </div>

          <div className="flex items-center space-x-2">
            {quantity > 0 ? (
              <div className="flex items-center bg-emerald-700 text-white rounded-lg px-2 py-1 space-x-2 text-xs font-bold shadow-sm">
                <button
                  type="button"
                  onClick={(e) => handleQtyClick(e, -1)}
                  className="hover:bg-emerald-800 px-1 rounded transition-colors"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={(e) => handleQtyClick(e, 1)}
                  className="hover:bg-emerald-800 px-1 rounded transition-colors"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddClick}
                className="bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-600 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all duration-200"
              >
                ADD
              </button>
            )}

            <Link
              to={`/products/${product.id}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
