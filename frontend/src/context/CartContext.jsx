import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('blinkit_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastOrder, setLastOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('blinkit_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('blinkit_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (orderDetails) => {
    const order = {
      orderId: `BLINK-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cartItems],
      totalAmount: cartTotal + (cartTotal >= 500 || cartTotal === 0 ? 0 : 25) + (cartTotal > 0 ? 5 : 0),
      address: orderDetails?.address || 'Flat 402, Sunshine Apartments, Bellandur, Bengaluru',
      paymentMethod: orderDetails?.paymentMethod || 'UPI (Google Pay)',
      createdAt: new Date().toISOString()
    };
    setLastOrder(order);
    try {
      localStorage.setItem('blinkit_last_order', JSON.stringify(order));
    } catch (e) {
      console.error('Failed to save last order:', e);
    }
    clearCart();
    return order;
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryCharge = cartTotal >= 500 || cartTotal === 0 ? 0 : 25;
  const handlingFee = cartTotal > 0 ? 5 : 0;
  const grandTotal = cartTotal + deliveryCharge + handlingFee;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
      deliveryCharge,
      handlingFee,
      grandTotal,
      placeOrder,
      lastOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
