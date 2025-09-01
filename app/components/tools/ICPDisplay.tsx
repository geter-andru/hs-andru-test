'use client';

import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Users, Zap, ChevronRight, Info } from 'lucide-react';
import ICPFrameworkDisplay from './ICPFrameworkDisplay';
import ProductFeatureParser from './ProductFeatureParser';

interface ICPDisplayProps {
  initialData?: any;
  companyName?: string;
  onICPComplete?: (data: any) => void;
  customerData?: any;
}

const ICPDisplay: React.FC<ICPDisplayProps> = ({
  initialData,
  companyName = '',
  onICPComplete,
  customerData
}) => {
  const [activeTab, setActiveTab] = useState<string>('framework');
  const [icpData, setIcpData] = useState<any>(initialData);
  const [ratingResult, setRatingResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const tabs = [
    { id: 'framework', label: 'ICP Framework', icon: Target },
    { id: 'features', label: 'Product Features', icon: Zap },
    { id: 'analysis', label: 'Analysis', icon: TrendingUp },
    { id: 'personas', label: 'Buyer Personas', icon: Users }
  ];

  const handleFrameworkUpdate = (framework: any) => {
    console.log('Framework updated:', framework);
  };

  const handleFeaturesUpdate = (features: any) => {
    console.log('Features updated:', features);
  };

  const performRating = () => {
    setLoading(true);
    setTimeout(() => {
      const result = {
        score: 85,
        tier: 'A',
        strengths: ['Strong technical fit', 'Clear ROI potential'],
        gaps: ['Integration complexity', 'Change management needs']
      };
      setRatingResult(result);
      setLoading(false);
      if (onICPComplete) {
        onICPComplete(result);
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">ICP Analysis Tool</h2>
        <p className="text-gray-400">Analyze and rate your ideal customer profile</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'framework' && (
          <ICPFrameworkDisplay 
            customerData={customerData}
            onFrameworkUpdate={handleFrameworkUpdate}
          />
        )}

        {activeTab === 'features' && (
          <ProductFeatureParser
            onFeaturesUpdate={handleFeaturesUpdate}
            productName={companyName}
            businessType="B2B"
          />
        )}

        {activeTab === 'analysis' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">ICP Analysis</h3>
            {!ratingResult ? (
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    placeholder="Enter company name..."
                    defaultValue={companyName}
                  />
                </div>
                <button
                  onClick={performRating}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Perform ICP Rating'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 font-medium">ICP Score</span>
                    <span className="text-3xl font-bold text-white">{ratingResult.score}%</span>
                  </div>
                  <div className="text-sm text-gray-400">Tier: {ratingResult.tier}</div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {ratingResult.strengths.map((strength: string, i: number) => (
                        <li key={i} className="text-green-400 text-sm">• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Gaps</h4>
                    <ul className="space-y-1">
                      {ratingResult.gaps.map((gap: string, i: number) => (
                        <li key={i} className="text-yellow-400 text-sm">• {gap}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'personas' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Buyer Personas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {['Decision Maker', 'Technical Evaluator', 'End User', 'Financial Buyer'].map((persona) => (
                <div key={persona} className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">{persona}</h4>
                  <p className="text-sm text-gray-400">
                    Key stakeholder in the buying process with specific needs and concerns.
                  </p>
                  <button className="mt-3 text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1">
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ICPDisplay;