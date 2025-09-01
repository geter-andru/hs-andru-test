'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBar,
  Cog,
  Lightbulb,
  TrendingUp,
  Users2,
  Target,
  Brain,
  Sparkles,
} from 'lucide-react';
import { CustomerInsightsPanel } from './CustomerInsightsPanel';
import { PredictiveAnalytics } from './PredictiveAnalytics';
import { RevenueForecast } from './RevenueForecast';
import { CustomerSegmentation } from './CustomerSegmentation';
import { CompetitiveIntelligence } from './CompetitiveIntelligence';
import { RecommendationEngine } from './RecommendationEngine';

interface AdvancedAnalyticsDashboardProps {
  customerId: string;
}

type AnalyticsView = 'overview' | 'insights' | 'prediction' | 'forecast' | 'segments' | 'competitive' | 'recommendations';

export function AdvancedAnalyticsDashboard({ customerId }: AdvancedAnalyticsDashboardProps) {
  const [activeView, setActiveView] = useState<AnalyticsView>('overview');
  const [isLoading, setIsLoading] = useState(false);

  const analyticsViews = [
    {
      id: 'overview',
      name: 'Overview',
      icon: ChartBar,
      description: 'Comprehensive analytics overview',
      color: 'bg-blue-500',
    },
    {
      id: 'insights',
      name: 'AI Insights',
      icon: Brain,
      description: 'AI-powered customer insights',
      color: 'bg-purple-500',
    },
    {
      id: 'prediction',
      name: 'Predictions',
      icon: Target,
      description: 'Deal closure predictions',
      color: 'bg-green-500',
    },
    {
      id: 'forecast',
      name: 'Revenue Forecast',
      icon: TrendingUp,
      description: 'Revenue forecasting & trends',
      color: 'bg-indigo-500',
    },
    {
      id: 'segments',
      name: 'Segmentation',
      icon: Users2,
      description: 'Customer cohort analysis',
      color: 'bg-orange-500',
    },
    {
      id: 'competitive',
      name: 'Competitive Intel',
      icon: Lightbulb,
      description: 'Market intelligence',
      color: 'bg-red-500',
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      icon: Sparkles,
      description: 'Automated suggestions',
      color: 'bg-pink-500',
    },
  ] as const;

  const handleViewChange = (view: AnalyticsView) => {
    setActiveView(view);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'insights':
        return <CustomerInsightsPanel customerId={customerId} />;
      case 'prediction':
        return <PredictiveAnalytics customerId={customerId} />;
      case 'forecast':
        return <RevenueForecast customerId={customerId} />;
      case 'segments':
        return <CustomerSegmentation customerId={customerId} />;
      case 'competitive':
        return <CompetitiveIntelligence customerId={customerId} />;
      case 'recommendations':
        return <RecommendationEngine customerId={customerId} />;
      default:
        return <AnalyticsOverview customerId={customerId} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Navigation */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
            <Cog className="h-4 w-4 mr-2" />
            Configure
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {analyticsViews.map((view, index) => {
            const IconComponent = view.icon;
            const isActive = activeView === view.id;

            return (
              <motion.button
                key={view.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleViewChange(view.id as AnalyticsView)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className={`p-2 rounded-lg ${view.color} bg-opacity-10`}>
                    <IconComponent className={`h-5 w-5 ${view.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
                <h3 className={`font-medium text-sm ${
                  isActive ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {view.name}
                </h3>
                <p className={`text-xs mt-1 ${
                  isActive ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {view.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active View Content */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {renderActiveView()}
      </motion.div>
    </div>
  );
}

// Overview Component
function AnalyticsOverview({ customerId }: { customerId: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">98%</div>
            <div className="text-sm text-gray-600">AI Confidence</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">$2.4M</div>
            <div className="text-sm text-gray-600">Predicted Revenue</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">15</div>
            <div className="text-sm text-gray-600">Active Insights</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">8.7</div>
            <div className="text-sm text-gray-600">Optimization Score</div>
          </div>
        </div>
      </div>

      {/* Recent AI Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent AI Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Generated revenue forecast', time: '2 minutes ago', status: 'completed' },
            { action: 'Analyzed customer segments', time: '15 minutes ago', status: 'completed' },
            { action: 'Updated deal predictions', time: '1 hour ago', status: 'completed' },
            { action: 'Competitive analysis refresh', time: '3 hours ago', status: 'processing' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'
                }`} />
                <span className="text-sm text-gray-700">{activity.action}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Opportunities */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Opportunities</h3>
        <div className="space-y-4">
          {[
            {
              title: 'Enterprise Expansion',
              description: 'High-value customer segment showing 85% expansion potential',
              impact: 'High',
              value: '$750K',
            },
            {
              title: 'Product Upsell',
              description: 'Premium features adoption opportunity identified',
              impact: 'Medium',
              value: '$125K',
            },
            {
              title: 'Market Penetration',
              description: 'Untapped segment with 92% compatibility score',
              impact: 'High',
              value: '$320K',
            },
          ].map((opportunity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">{opportunity.value}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    opportunity.impact === 'High' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {opportunity.impact} Impact
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Model Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Performance</h3>
        <div className="space-y-4">
          {[
            { model: 'Deal Prediction', accuracy: 92, lastTrained: '2 days ago' },
            { model: 'Lead Scoring', accuracy: 88, lastTrained: '1 day ago' },
            { model: 'Revenue Forecast', accuracy: 94, lastTrained: '6 hours ago' },
            { model: 'Customer Segmentation', accuracy: 91, lastTrained: '3 days ago' },
          ].map((model, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{model.model}</div>
                <div className="text-sm text-gray-500">Updated {model.lastTrained}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-blue-600">{model.accuracy}%</div>
                <div className="text-xs text-gray-500">Accuracy</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}