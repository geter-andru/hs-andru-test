'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntegratedIntelligenceRevealProps {
  onRevealComplete?: () => void;
}

const IntegratedIntelligenceReveal: React.FC<IntegratedIntelligenceRevealProps> = ({
  onRevealComplete
}) => {
  const [currentReveal, setCurrentReveal] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  const reveals = [
    {
      title: 'AI-Powered Market Analysis',
      description: 'Real-time insights into market trends and opportunities',
      icon: '📊'
    },
    {
      title: 'Competitive Intelligence',
      description: 'Stay ahead with automated competitor tracking',
      icon: '🎯'
    },
    {
      title: 'Revenue Optimization',
      description: 'Maximize your revenue potential with data-driven strategies',
      icon: '💰'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentReveal < reveals.length - 1) {
        setCurrentReveal(prev => prev + 1);
      } else {
        setIsRevealing(true);
        onRevealComplete?.();
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentReveal, reveals.length, onRevealComplete]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Integrated Intelligence Reveal
      </h3>
      
      <div className="space-y-4">
        {reveals.map((reveal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: index <= currentReveal ? 1 : 0.3,
              x: index <= currentReveal ? 0 : -20
            }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-lg border ${
              index <= currentReveal 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-gray-600 bg-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{reveal.icon}</span>
              <div>
                <h4 className="text-white font-medium">{reveal.title}</h4>
                <p className="text-gray-400 text-sm">{reveal.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isRevealing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <div className="text-green-400 font-semibold">
            🎉 Intelligence Integration Complete!
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IntegratedIntelligenceReveal;
