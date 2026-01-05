import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from Firebase when user logs in
  useEffect(() => {
    if (currentUser) {
      loadWishlistFromFirebase();
    } else {
      setWishlistItems([]);
      setIsLoaded(false);
    }
  }, [currentUser]);

  // Save wishlist to Firebase whenever it changes (but only after initial load)
  useEffect(() => {
    if (currentUser && isLoaded && wishlistItems) {
      saveWishlistToFirebase();
    }
  }, [wishlistItems, currentUser, isLoaded]);

  const loadWishlistFromFirebase = async () => {
    try {
      const wishlistDoc = await getDoc(doc(db, 'wishlists', currentUser.uid));
      if (wishlistDoc.exists()) {
        setWishlistItems(wishlistDoc.data().items || []);
      } else {
        setWishlistItems([]);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setIsLoaded(true);
    }
  };

  const saveWishlistToFirebase = async () => {
    try {
      await setDoc(doc(db, 'wishlists', currentUser.uid), {
        items: wishlistItems,
        updatedAt: new Date().toISOString()
      });
      console.log('✅ Wishlist saved to Firebase:', wishlistItems.length, 'items');
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  };

  const addToWishlist = (product) => {
    if (!currentUser) {
      alert('Please login to add items to wishlist');
      return;
    }

    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        // Remove from wishlist if already exists
        console.log('Removing from wishlist:', product.name);
        return prev.filter(item => item.id !== product.id);
      }
      // Add to wishlist
      console.log('Adding to wishlist:', product.name);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};