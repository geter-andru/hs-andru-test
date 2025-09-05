'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CompellingAspectDemoProps {
  aspects?: string[];
  onAspectSelect?: (aspect: string) => void;
}

const CompellingAspectDemo: React.FC<CompellingAspectDemoProps> = ({
  aspects = [
    'AI-Powered Insights',
    'Systematic Scaling',
    'Revenue Intelligence',
    'Competitive Analysis'
  ],
  onAspectSelect
}) => {
  const [selectedAspect, setSelectedAspect] = useState<string | null>(null);

  const handleAspectClick = (aspect: string) => {
    setSelectedAspect(aspect);
    onAspectSelect?.(aspect);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        Choose Your Focus Area
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aspects.map((aspect, index) => (
          <motion.button
            key={aspect}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAspectClick(aspect)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedAspect === aspect
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-600 bg-gray-700 hover:border-gray-500'
            }`}
          >
            <div className="text-white font-medium">{aspect}</div>
            <div className="text-gray-400 text-sm mt-1">
              Click to explore this area
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CompellingAspectDemo;
