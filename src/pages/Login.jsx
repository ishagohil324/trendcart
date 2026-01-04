import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';




const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, signup, currentUser } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Eyes follow cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // Track mouse for eyes
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate eye position
  const getEyePosition = (eyeRef) => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    
    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;
    
    const angle = Math.atan2(
      mousePosition.y - eyeCenterY,
      mousePosition.x - eyeCenterX
    );
    
    const distance = Math.min(eye.width / 4, 10);
    
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
  };

  const leftEyePos = getEyePosition(leftEyeRef);
  const rightEyePos = getEyePosition(rightEyeRef);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        await signup(formData.email, formData.password, formData.name);
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 overflow-hidden relative flex items-center justify-center">
      
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3 + particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          
          {/* Cartoon Characters with Eyes */}
 {/* Cartoon Character */}
<motion.div
  className="hidden lg:block"
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  <motion.div
    className="relative flex flex-col items-center"
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
    {/* Head */}
    <div className="w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center relative">

      {/* Eyes */}
{/* Eyes */}
<div className="flex gap-10 absolute top-24">

  {/* Left Eye */}
  <div
    ref={leftEyeRef}
    className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden"
  >
    {!isPasswordFocused ? (
      <motion.div
        className="w-5 h-5 bg-gray-900 rounded-full"
        animate={{
          x: leftEyePos.x,
          y: leftEyePos.y
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    ) : (
      <motion.div
        className="w-8 h-1 bg-gray-900 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      />
    )}
  </div>

  {/* Right Eye */}
  <div
    ref={rightEyeRef}
    className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden"
  >
    {!isPasswordFocused ? (
      <motion.div
        className="w-5 h-5 bg-gray-900 rounded-full"
        animate={{
          x: rightEyePos.x,
          y: rightEyePos.y
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    ) : (
      <motion.div
        className="w-8 h-1 bg-gray-900 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      />
    )}
  </div>

</div>


      {/* Mouth */}
      <motion.div
        className="absolute bottom-16 w-20 h-10 border-b-4 border-white rounded-full"
        animate={{
          scaleX: isPasswordFocused ? 0.6 : 1
        }}
      />
    </div>

    {/* Body */}
    <div className="w-32 h-40 bg-gradient-to-b from-purple-500 to-pink-500 rounded-b-full -mt-10" />
  </motion.div>
</motion.div>


          {/* Login Form */}
          <motion.div
            className="w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              
              {/* Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold text-white mb-2">
                  {isSignup ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-purple-200">
                  {isSignup ? 'Join TrendCart today!' : 'Login to continue shopping'}
                </p>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name (only for signup) */}
                {isSignup && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required={isSignup}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" size={20} />
<input
  type={showPassword ? 'text' : 'password'}
  name="password"
  value={formData.password}
  onChange={handleChange}
  onFocus={() => setIsPasswordFocused(true)}
  onBlur={() => setIsPasswordFocused(false)}
  placeholder="Password"
  required
  className="w-full pl-12 pr-12 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
/>

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-white/30" />
                <span className="px-4 text-purple-200 text-sm">or</span>
                <div className="flex-1 border-t border-white/30" />
              </div>

              {/* Google Login */}
              <motion.button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-white text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-100 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </motion.button>

              {/* Toggle Sign up/Login */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;