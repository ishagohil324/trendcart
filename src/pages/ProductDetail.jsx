import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus, ZoomIn } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isLiked, setIsLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button onClick={() => navigate('/products')} className="text-purple-600">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const sizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 mb-6"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <motion.div
              className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Zoom Icon */}
              <motion.div
                className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsZoomed(true)}
              >
                <ZoomIn size={24} className="text-purple-600" />
              </motion.div>

              {/* Sale Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                SALE
              </div>

              {/* Like Button */}
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  size={24}
                  className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}
                />
              </motion.button>
            </motion.div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-500"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={product.image}
                    alt={`Thumbnail ${i}`}
                    className="w-full h-20 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category */}
            <div className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wide">
              {product.category}
            </div>

            {/* Name */}
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating} (120 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-4">
              <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                ₹{product.price}
              </span>
              <span className="text-2xl text-gray-400 line-through">
                ₹{(product.price * 1.5).toFixed(0)}
              </span>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                33% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {['Fashion', 'Sports'].includes(product.category) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Select Size
                </h3>
                <div className="flex space-x-3">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg font-semibold ${
                        selectedSize === size
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minus size={20} />
                </motion.button>
                <span className="text-2xl font-bold text-gray-800 dark:text-white w-12 text-center">
                  {quantity}
                </span>
                <motion.button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus size={20} />
                </motion.button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex space-x-4">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-pink-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart size={24} />
                <span>Add to Cart</span>
              </motion.button>

              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={24} className={isLiked ? 'fill-current text-red-500' : ''} />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl mb-2">🚚</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Free Delivery</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔒</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Secure Payment</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">↩️</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md cursor-pointer"
                  whileHover={{ y: -8, shadow: '0 20px 30px rgba(0,0,0,0.2)' }}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-bold">
                      ₹{relatedProduct.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Added to Cart Notification */}
        <AnimatePresence>
          {showAddedToCart && (
            <motion.div
              className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 z-50"
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <ShoppingCart size={24} />
              <span className="font-semibold">Added to cart!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoomed Image Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductDetail;