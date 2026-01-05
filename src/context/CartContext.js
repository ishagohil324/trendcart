import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from Firebase when user logs in
  useEffect(() => {
    if (currentUser) {
      loadCartFromFirebase();
    } else {
      setCartItems([]);
    }
  }, [currentUser]);

  // Save cart to Firebase whenever it changes
  useEffect(() => {
    if (currentUser && cartItems.length > 0) {
      saveCartToFirebase();
    }
  }, [cartItems, currentUser]);

  const loadCartFromFirebase = async () => {
    try {
      const cartDoc = await getDoc(doc(db, 'carts', currentUser.uid));
      if (cartDoc.exists()) {
        setCartItems(cartDoc.data().items || []);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCartToFirebase = async () => {
    try {
      await setDoc(doc(db, 'carts', currentUser.uid), {
        items: cartItems,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    setCartItems([]);
    if (currentUser) {
      try {
        await setDoc(doc(db, 'carts', currentUser.uid), {
          items: [],
          updatedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};