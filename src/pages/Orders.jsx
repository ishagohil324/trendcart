import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import OrderTracker from '../components/OrderTracker';
import { Package, ArrowLeft } from 'lucide-react';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Get orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
    
    // Auto-select the latest order
    if (savedOrders.length > 0 && !selectedOrder) {
      setSelectedOrder(savedOrders[savedOrders.length - 1]);
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            No orders yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start shopping to see your orders here
          </p>
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 mb-6"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </motion.button>

        <motion.h1
          className="text-4xl font-bold text-gray-800 dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Orders
        </motion.h1>

        {/* Order Tracker */}
        {selectedOrder && (
          <OrderTracker orderDetails={selectedOrder} />
        )}

        {/* Order List */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            All Orders
          </h2>
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.orderId}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md cursor-pointer border-2 ${
                  selectedOrder?.orderId === order.orderId
                    ? 'border-purple-500'
                    : 'border-transparent'
                }`}
                onClick={() => setSelectedOrder(order)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
                      Order #{order.orderId}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Placed on {order.placedTime}
                    </p>
                    <div className="space-y-1">
                      {order.items.map(item => (
                        <p key={item.id} className="text-sm text-gray-700 dark:text-gray-300">
                          {item.name} x {item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      ₹{order.total.toFixed(2)}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                      {order.status || 'Processing'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;