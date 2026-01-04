import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <User className="mr-2 text-purple-600" size={20} />
          Personal Information
        </h3>
        
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="9876543210"
                maxLength="10"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <MapPin className="mr-2 text-purple-600" size={20} />
          Shipping Address
        </h3>
        
        <div className="space-y-4">
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Street Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="123 Main Street, Apartment 4B"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* City & Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Mumbai"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="400001"
                maxLength="6"
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <CreditCard className="mr-2 text-purple-600" size={20} />
          Payment Method
        </h3>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600"
            />
            <span className="text-gray-700 dark:text-gray-300">Credit/Debit Card</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={formData.paymentMethod === 'upi'}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600"
            />
            <span className="text-gray-700 dark:text-gray-300">UPI</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === 'cod'}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600"
            />
            <span className="text-gray-700 dark:text-gray-300">Cash on Delivery</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue to Payment
      </motion.button>
    </motion.form>
  );
};

export default CheckoutForm;