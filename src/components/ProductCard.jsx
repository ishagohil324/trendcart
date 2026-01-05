import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = React.useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    addToCart(product);
  };



  return (
    
    <motion.div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group relative cursor-pointer"
      whileHover={{ y: -8, shadow: "0 20px 30px rgba(0,0,0,0.2)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Like Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:scale-110 transition-transform"
      >
        <Heart
          size={20}
          className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.button
            onClick={handleAddToCart}
            className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-purple-600 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <Star className="fill-yellow-400 text-yellow-400" size={16} />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {product.rating}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            (120 reviews)
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ₹{product.price}
            </span>
          </div>
          <motion.button
            onClick={handleAddToCart}
            className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>

      {/* Sale Badge */}
      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
        SALE
      </div>
    </motion.div>
  );
};

export default ProductCard;