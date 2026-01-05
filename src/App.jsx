import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Navbar />
                <CartDrawer />
                
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </div>
            </Router>
          </CartProvider>
        </WishlistProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;