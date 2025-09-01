'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart3, Calendar, Target } from 'lucide-react';

interface BaselineMetric {
  id: string;
  name: string;
  baselineValue: number;
  currentValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'sales' | 'marketing' | 'customer' | 'operational';
}

interface BaselineComparisonProps {
  customerId?: string;
  initialMetrics?: BaselineMetric[];
  onMetricsUpdate?: (metrics: BaselineMetric[]) => void;
}

const BaselineComparisonDashboard: React.FC<BaselineComparisonProps> = ({
  customerId,
  initialMetrics,
  onMetricsUpdate
}) => {
  const [metrics, setMetrics] = useState<BaselineMetric[]>(initialMetrics || []);
  const [loading, setLoading] = useState(!initialMetrics);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('3months');

  useEffect(() => {
    if (!initialMetrics) {
      // Load or generate baseline comparison data
      const mockMetrics: BaselineMetric[] = [
        {
          id: 'revenue',
          name: 'Monthly Recurring Revenue',
          baselineValue: 45000,
          currentValue: 67500,
          unit: '$',
          trend: 'up',
          category: 'sales'
        },
        {
          id: 'conversion_rate',
          name: 'Lead Conversion Rate',
          baselineValue: 12.5,
          currentValue: 18.2,
          unit: '%',
          trend: 'up',
          category: 'sales'
        },
        {
          id: 'customer_acquisition',
          name: 'Customer Acquisition Cost',
          baselineValue: 850,
          currentValue: 680,
          unit: '$',
          trend: 'up',
          category: 'marketing'
        },
        {
          id: 'churn_rate',
          name: 'Monthly Churn Rate',
          baselineValue: 5.2,
          currentValue: 3.1,
          unit: '%',
          trend: 'up',
          category: 'customer'
        },
        {
          id: 'sales_cycle',
          name: 'Average Sales Cycle',
          baselineValue: 90,
          currentValue: 75,
          unit: 'days',
          trend: 'up',
          category: 'operational'
        },
        {
          id: 'deal_size',
          name: 'Average Deal Size',
          baselineValue: 25000,
          currentValue: 32000,
          unit: '$',
          trend: 'up',
          category: 'sales'
        }
      ];
      
      setMetrics(mockMetrics);
      setLoading(false);
      if (onMetricsUpdate) {
        onMetricsUpdate(mockMetrics);
      }
    }
  }, [initialMetrics, onMetricsUpdate]);

  const calculateImprovement = (baseline: number, current: number, isLowerBetter: boolean = false): number => {
    if (baseline === 0) return 0;
    const change = ((current - baseline) / baseline) * 100;
    return isLowerBetter ? -change : change;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string): string => {
    switch (trend) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const categories = [
    { id: 'all', label: 'All Metrics' },
    { id: 'sales', label: 'Sales' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'customer', label: 'Customer' },
    { id: 'operational', label: 'Operational' }
  ];

  const timeRanges = [
    { id: '1month', label: '1 Month' },
    { id: '3months', label: '3 Months' },
    { id: '6months', label: '6 Months' },
    { id: '1year', label: '1 Year' }
  ];

  const filteredMetrics = selectedCategory === 'all' 
    ? metrics 
    : metrics.filter(metric => metric.category === selectedCategory);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-white">Loading baseline comparison...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-7 h-7" />
              Baseline Comparison Dashboard
            </h2>
            <p className="text-gray-400 mt-1">Track progress against your baseline metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-300">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">Category:</span>
          <div className="flex bg-gray-900 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">Time Range:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white text-sm"
          >
            {timeRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMetrics.map((metric) => {
          const isLowerBetter = metric.id === 'customer_acquisition' || metric.id === 'churn_rate' || metric.id === 'sales_cycle';
          const improvement = calculateImprovement(metric.baselineValue, metric.currentValue, isLowerBetter);
          
          return (
            <div key={metric.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-white">{metric.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{metric.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-gray-400">Baseline</span>
                    <div className="text-lg text-gray-300">
                      {metric.unit === '$' && '$'}{metric.baselineValue.toLocaleString()}{metric.unit !== '$' && metric.unit}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">Current</span>
                    <div className="text-xl font-bold text-white">
                      {metric.unit === '$' && '$'}{metric.currentValue.toLocaleString()}{metric.unit !== '$' && metric.unit}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Improvement</span>
                    <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                      {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        improvement > 0 ? 'bg-green-500' : improvement < 0 ? 'bg-red-500' : 'bg-gray-500'
                      }`}
                      style={{ 
                        width: `${Math.min(Math.abs(improvement), 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-900/20 to-green-900/20 border border-blue-600/30 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 text-blue-400 mt-1" />
          <div>
            <h4 className="font-medium text-white mb-2">Performance Summary</h4>
            <p className="text-gray-300 text-sm">
              You've shown significant improvement across {filteredMetrics.filter(m => m.trend === 'up').length} out of {filteredMetrics.length} tracked metrics. 
              {filteredMetrics.filter(m => m.trend === 'up').length > filteredMetrics.length / 2 
                ? ' Keep up the excellent progress!' 
                : ' Focus on the underperforming areas to accelerate growth.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaselineComparisonDashboard;