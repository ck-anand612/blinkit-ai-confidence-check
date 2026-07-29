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
    <div className="group bg-[#FFFFFF] rounded-[16px] border border-[#E5E5E5] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative">
      {/* Category Tag */}
      <div className="absolute top-2 left-2 z-10">
        <span className="bg-[#F3F4F6] text-[#0C831F] font-extrabold text-[9px] px-2 py-0.5 rounded-md border border-[#E5E5E5]">
          {product.subCategory || product.subcategory || 'Blinkit'}
        </span>
      </div>

      {/* Image container clickable to product detail */}
      <Link to={`/products/${product.id}`} className="w-full h-32 bg-[#F8F8F8] flex items-center justify-center p-2.5 overflow-hidden relative">
        <img
          src={getProductImageUrl(product)}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
          onLoad={(e) => handleImageLoadCheck(e, product.name)}
          onError={(e) => handleImageLoadError(e, product.name)}
        />
      </Link>

      {/* Product Content */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <Link to={`/products/${product.id}`} className="block">
          <span className="text-[9px] font-bold text-[#666666] uppercase tracking-wider block mb-0.5 truncate">
            {product.brand}
          </span>
          <h3 className="text-xs font-bold text-[#1F1F1F] line-clamp-2 leading-tight group-hover:text-[#0C831F] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between mt-auto">
          <div>
            <span className="text-[9px] text-[#666666] font-medium block">Price</span>
            <span className="text-xs font-black text-[#1F1F1F]">₹{product.price}</span>
          </div>

          <div className="flex items-center space-x-1">
            {quantity > 0 ? (
              <div className="flex items-center bg-[#0C831F] text-white rounded-lg px-2 py-1 space-x-1.5 text-xs font-bold shadow-xs">
                <button
                  type="button"
                  onClick={(e) => handleQtyClick(e, -1)}
                  className="hover:bg-black/20 px-1 rounded transition-colors"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={(e) => handleQtyClick(e, 1)}
                  className="hover:bg-black/20 px-1 rounded transition-colors"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddClick}
                className="bg-[#0C831F] hover:bg-[#0A701A] text-white text-xs font-extrabold px-3 py-1 rounded-lg transition-all duration-150 active:scale-95 shadow-xs"
              >
                ADD
              </button>
            )}

            <Link
              to={`/products/${product.id}`}
              className="bg-[#FFFFFF] border border-[#E5E5E5] hover:bg-[#F3F4F6] text-[#1F1F1F] text-xs font-semibold px-2 py-1 rounded-lg transition-colors"
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
