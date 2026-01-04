import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

const PaymentGateway = ({ amount, onSuccess, orderDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Simulated Razorpay payment (In real app, use actual Razorpay SDK)
  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Call success callback after animation
      setTimeout(() => {
        onSuccess({
          paymentId: 'pay_' + Math.random().toString(36).substr(2, 9),
          orderId: orderDetails.orderId,
          amount: amount
        });
      }, 2000);
    }, 2000);

    /* 
    REAL RAZORPAY INTEGRATION (Uncomment for production):
    
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Get from Razorpay Dashboard
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "TrendCart",
      description: "Order Payment",
      order_id: orderDetails.orderId,
      handler: function (response) {
        setPaymentSuccess(true);
        onSuccess(response);
      },
      prefill: {
        name: orderDetails.name,
        email: orderDetails.email,
        contact: orderDetails.phone
      },
      theme: {
        color: "#9333ea"
      }
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    */
  };

  if (paymentSuccess) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Payment Successful! 🎉
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your order has been placed successfully
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Payment Summary */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Payment Summary
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span>₹{amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="border-t dark:border-gray-700 pt-2 flex justify-between text-xl font-bold text-gray-800 dark:text-white">
            <span>Total</span>
            <span>₹{amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <Lock size={16} />
          <span>Secure Payment Gateway</span>
        </div>
      </motion.div>

      {/* Payment Button */}
      <motion.button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
        } text-white`}
        whileHover={!isProcessing ? { scale: 1.02 } : {}}
        whileTap={!isProcessing ? { scale: 0.98 } : {}}
      >
        {isProcessing ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <CreditCard size={24} />
            <span>Pay ₹{amount.toFixed(2)}</span>
          </>
        )}
      </motion.button>

      {/* Payment Methods */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          We accept
        </p>
        <div className="flex justify-center space-x-4 text-gray-400">
          <div className="text-2xl">💳</div>
          <div className="text-2xl">📱</div>
          <div className="text-2xl">🏦</div>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Cards • UPI • Net Banking
        </p>
      </div>

      {/* Test Mode Notice */}
      <motion.div
        className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-sm text-yellow-800 dark:text-yellow-400 text-center">
          🧪 <strong>Test Mode:</strong> No real payment will be processed
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentGateway;