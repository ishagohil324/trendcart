import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';

const OrderTracker = ({ orderDetails }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { 
      id: 1, 
      name: 'Order Placed', 
      icon: Package, 
      description: 'Your order has been confirmed',
      time: orderDetails?.placedTime || 'Just now'
    },
    { 
      id: 2, 
      name: 'Processing', 
      icon: Clock, 
      description: 'We are preparing your order',
      time: '2 hours ago'
    },
    { 
      id: 3, 
      name: 'Shipped', 
      icon: Truck, 
      description: 'Your order is on the way',
      time: '1 day ago'
    },
    { 
      id: 4, 
      name: 'Out for Delivery', 
      icon: MapPin, 
      description: 'Order will arrive today',
      time: 'Today'
    },
    { 
      id: 5, 
      name: 'Delivered', 
      icon: CheckCircle, 
      description: 'Order delivered successfully',
      time: 'Pending'
    }
  ];

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 3000); // Change step every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Order ID Card */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-lg mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-2">Track Your Order</h2>
        <p className="text-purple-100">Order ID: #{orderDetails?.orderId || 'TRC' + Date.now()}</p>
        <p className="text-purple-100">Estimated Delivery: 3-5 Business Days</p>
      </motion.div>

      {/* Animated Truck */}
      <div className="relative h-24 mb-12 overflow-hidden">
        <motion.div
          className="absolute"
          initial={{ x: '-10%' }}
          animate={{ x: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            <Truck size={48} className="text-purple-600" />
          </motion.div>
        </motion.div>

        {/* Track Line */}
        <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStep;
          const isActive = index === currentStep;

          return (
            <motion.div
              key={step.id}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Icon */}
              <motion.div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: isActive ? Infinity : 0, duration: 1 }}
              >
                <Icon
                  size={24}
                  className={isCompleted ? 'text-white' : 'text-gray-400'}
                />
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <motion.div
                  className={`p-4 rounded-xl ${
                    isCompleted
                      ? 'bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800'
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                  animate={isActive ? { boxShadow: ['0 0 0 0 rgba(147, 51, 234, 0)', '0 0 0 10px rgba(147, 51, 234, 0)'] } : {}}
                  transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-lg ${
                      isCompleted ? 'text-purple-700 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {step.time}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    isCompleted ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="mt-2 flex items-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-purple-600 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                        In Progress...
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Delivery Info */}
      <motion.div
        className="mt-8 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">
          Delivery Address
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {orderDetails?.address || '123 Main Street, Mumbai, 400001'}
        </p>
      </motion.div>
    </div>
  );
};

export default OrderTracker;