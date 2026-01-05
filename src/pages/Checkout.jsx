import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/CheckoutForm';
import PaymentGateway from '../components/PaymentGateway';
import { ArrowLeft, Package } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser) {
      // Redirect to login with return URL
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [currentUser, navigate]);

  // Check if cart is empty
  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  // If not logged in, show nothing (will redirect)
  if (!currentUser) {
    return null;
  }

  const handleFormSubmit = (formData) => {
    const order = {
      ...formData,
      orderId: 'TRC' + Date.now(),
      items: cartItems,
      total: cartTotal,
      placedTime: new Date().toLocaleString(),
      userId: currentUser.uid,
      userEmail: currentUser.email
    };
    setOrderDetails(order);
    setStep(2);
  };

  const handlePaymentSuccess = (paymentData) => {
    const finalOrder = {
      ...orderDetails,
      ...paymentData,
      status: 'placed'
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(finalOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    clearCart();
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <motion.button
          onClick={() => step === 1 ? navigate(-1) : setStep(1)}
          className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 mb-6"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </motion.button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                1
              </div>
              <span className="ml-2 font-semibold hidden sm:inline">Shipping</span>
            </div>
            
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700" />
            
            <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                2
              </div>
              <span className="ml-2 font-semibold hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Shipping Information
                </h2>
                <CheckoutForm onSubmit={handleFormSubmit} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Payment
                </h2>
                <PaymentGateway
                  amount={cartTotal}
                  onSuccess={handlePaymentSuccess}
                  orderDetails={orderDetails}
                />
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white pt-2 border-t dark:border-gray-700">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;