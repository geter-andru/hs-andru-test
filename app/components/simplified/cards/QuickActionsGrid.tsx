'use client'

import React from 'react';

interface QuickActionsGridProps {
  className?: string;
}

const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🎯</span>
          </div>
          <div>
            <div className="text-sm font-medium text-white">ICP Analysis</div>
            <div className="text-xs text-gray-400">Quick assessment</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">💰</span>
          </div>
          <div>
            <div className="text-sm font-medium text-white">Cost Calculator</div>
            <div className="text-xs text-gray-400">ROI analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsGrid;