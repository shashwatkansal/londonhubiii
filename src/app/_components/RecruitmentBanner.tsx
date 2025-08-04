'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { getAllSiteSettings } from '@/lib/siteSettings';
import * as SETTINGS from '@/lib/settings';

const RecruitmentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissed = sessionStorage.getItem('recruitmentBannerDismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    // Load site settings
    getAllSiteSettings().then((data) => {
      setSiteSettings(data);
      setLoading(false);
      // Check if recruitment is enabled
      if (data.recruitment_banner_enabled === 'true' && !dismissed) {
        setIsVisible(true);
      }
    });
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('recruitmentBannerDismissed', 'true');
  };

  if (loading || !isVisible || isDismissed) {
    return null;
  }

  const bannerText = siteSettings.recruitment_banner_text || '🎉 Recruitment is now OPEN! Join us in shaping the future.';
  const recruitmentUrl = siteSettings.recruitment_url || SETTINGS.HUB_CONFIG.APPLICATION_URL;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
            <div className="relative">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(270deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)',
                  backgroundSize: '200% 100%',
                }}
              />
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center flex-1">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <HiSparkles className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-yellow-300" />
                    </motion.div>
                    
                    <p className="text-sm sm:text-base font-medium flex-1">
                      <span className="hidden sm:inline">{bannerText}</span>
                      <span className="sm:hidden">🎉 Recruitment is OPEN!</span>
                    </p>
                    
                    <Link
                      href={recruitmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 sm:ml-6"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-blue-600 text-sm sm:text-base font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        Apply Now
                        <FiArrowRight className="ml-1 sm:ml-2 h-4 w-4" />
                      </motion.button>
                    </Link>
                  </div>
                  
                  <button
                    onClick={handleDismiss}
                    className="ml-3 sm:ml-4 p-1.5 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Dismiss banner"
                  >
                    <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecruitmentBanner;