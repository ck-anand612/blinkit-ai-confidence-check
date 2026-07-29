import React from 'react';
import { Link } from 'react-router-dom';
import { getProductImageUrl, handleImageLoadError, handleImageLoadCheck } from '../../utils/imageUtils';
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
    <div className="group bg-[#1E1E1E] rounded-2xl border border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Category Tag */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <span className="bg-[#18C37E]/15 text-[#18C37E] font-semibold text-[10px] px-2 py-0.5 rounded-full border border-[#18C37E]/30 backdrop-blur-sm">
          {product.subCategory || product.subcategory || 'Blinkit'}
        </span>
      </div>

      {/* Image container clickable to product detail */}
      <Link to={`/products/${product.id}`} className="w-full h-36 bg-[#1A1A1A] flex items-center justify-center p-3 overflow-hidden relative">
        <img
          src={getProductImageUrl(product)}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onLoad={(e) => handleImageLoadCheck(e, product.name)}
          onError={(e) => handleImageLoadError(e, product.name)}
        />
      </Link>

      {/* Product Content */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-3">
        <Link to={`/products/${product.id}`} className="block">
          <span className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider block mb-0.5">
            {product.brand}
          </span>
          <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-[#F8C537] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#B8B8B8] font-medium block">Price</span>
            <span className="text-sm font-black text-white">₹{product.price}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            {quantity > 0 ? (
              <div className="flex items-center bg-[#18C37E] text-black rounded-lg px-2 py-1 space-x-1.5 text-xs font-black shadow-sm">
                <button
                  type="button"
                  onClick={(e) => handleQtyClick(e, -1)}
                  className="hover:bg-black/10 px-1 rounded transition-colors"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={(e) => handleQtyClick(e, 1)}
                  className="hover:bg-black/10 px-1 rounded transition-colors"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddClick}
                className="bg-[#18C37E] hover:bg-[#15b072] text-black text-xs font-black px-3 py-1 rounded-lg shadow-sm transition-all duration-200"
              >
                ADD
              </button>
            )}

            <Link
              to={`/products/${product.id}`}
              className="bg-[#2A2A2A] hover:bg-[#333333] text-[#B8B8B8] hover:text-white text-xs font-bold px-2 py-1 rounded-lg transition-colors"
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
