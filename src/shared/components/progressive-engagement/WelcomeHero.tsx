'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeHeroProps {
  customerName?: string;
  company?: string;
  onGetStarted?: () => void;
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({ 
  customerName = 'User', 
  company = 'Your Company',
  onGetStarted 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        Welcome, {customerName}
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Transform your {company} with AI-powered insights and systematic scaling
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onGetStarted}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default WelcomeHero;
