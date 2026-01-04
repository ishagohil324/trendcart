import React from 'react';
import { ShoppingCart, Moon, Sun, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              TrendCart
            </span>
          </motion.div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              />
            </div>
          </div>

          {/* Right Icons */}
          const { currentUser } = useAuth();
const navigate = useNavigate();
<div className="flex items-center space-x-4">
  
  {/* Theme Toggle */}
  <motion.button
    onClick={toggleTheme}
    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {isDark ? (
      <Sun className="text-yellow-500" size={24} />
    ) : (
      <Moon className="text-gray-700" size={24} />
    )}
  </motion.button>

  {/* User Profile or Login */}
  {currentUser ? (
    <motion.button
      onClick={() => navigate('/dashboard')}
      className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      whileHover={{ scale: 1.05 }}
    >
      {currentUser.photoURL ? (
        <img src={currentUser.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
      ) : (
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm">
          {currentUser.displayName?.[0] || 'U'}
        </div>
      )}
      <span className="hidden md:inline text-gray-700 dark:text-white">
        {currentUser.displayName?.split(' ')[0] || 'User'}
      </span>
    </motion.button>
  ) : (
    <motion.button
      onClick={() => navigate('/login')}
      className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Login
    </motion.button>
  )}

  {/* Cart Button */}
  <motion.button
    onClick={() => setIsCartOpen(true)}
    className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <ShoppingCart className="text-gray-700 dark:text-white" size={24} />
    {cartCount > 0 && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
      >
        {cartCount}
      </motion.span>
    )}
  </motion.button>
</div>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;