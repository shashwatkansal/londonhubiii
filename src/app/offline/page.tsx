"use client";
import { motion } from "framer-motion";
import { FiWifiOff, FiRefreshCw, FiHome } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

export default function OfflinePage() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    
    // Check if we're back online
    if (navigator.onLine) {
      // Try to navigate to the previous page or home
      window.location.href = document.referrer || '/';
    } else {
      // Still offline
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Animated WiFi Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <FiWifiOff className="w-24 h-24 mx-auto text-gray-400" />
        </motion.div>
        
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          You&apos;re Offline
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          It looks like you&apos;ve lost your internet connection. Please check your connection and try again.
        </p>

        <div className="space-y-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500"
          >
            Some features may be limited while offline
          </motion.p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiRefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </button>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <FiHome className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </div>

        {/* Offline tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 bg-white rounded-lg shadow-md max-w-sm"
        >
          <h2 className="font-semibold text-gray-800 mb-3">While you wait:</h2>
          <ul className="text-left text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Check your WiFi or mobile data connection
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Move closer to your router
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Restart your device if the problem persists
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-300 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl" />
      </div>
    </div>
  );
}