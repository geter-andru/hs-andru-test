'use client';

import { useState, useEffect } from 'react';
import ModernCard from '@/app/components/ui/ModernCard';
import ModernCircularProgress from '@/app/components/ui/ModernCircularProgress';

interface AdvancedAnalyticsDashboardProps {
  customerId: string;
}

export function AdvancedAnalyticsDashboard({ customerId }: AdvancedAnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState({
    revenueImpact: 250000,
    conversionRate: 68,
    engagementScore: 85,
    competencyProgress: 72,
    toolUtilization: 91,
    predictionAccuracy: 89
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [customerId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <ModernCard key={index} className="animate-pulse">
            <div className="h-48 bg-slate-700 rounded-lg"></div>
          </ModernCard>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: 'Revenue Impact',
      value: `$${(analyticsData.revenueImpact / 1000).toFixed(0)}K`,
      progress: Math.min((analyticsData.revenueImpact / 500000) * 100, 100),
      color: 'green' as const,
      trend: '+23%'
    },
    {
      title: 'Conversion Rate',
      value: `${analyticsData.conversionRate}%`,
      progress: analyticsData.conversionRate,
      color: 'purple' as const,
      trend: '+12%'
    },
    {
      title: 'Engagement Score',
      value: `${analyticsData.engagementScore}/100`,
      progress: analyticsData.engagementScore,
      color: 'blue' as const,
      trend: '+8%'
    },
    {
      title: 'Competency Progress',
      value: `${analyticsData.competencyProgress}%`,
      progress: analyticsData.competencyProgress,
      color: 'red' as const,
      trend: '+15%'
    },
    {
      title: 'Tool Utilization',
      value: `${analyticsData.toolUtilization}%`,
      progress: analyticsData.toolUtilization,
      color: 'purple' as const,
      trend: '+5%'
    },
    {
      title: 'Prediction Accuracy',
      value: `${analyticsData.predictionAccuracy}%`,
      progress: analyticsData.predictionAccuracy,
      color: 'orange' as const,
      trend: '+18%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <ModernCard key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{metric.title}</h3>
              <span className={`text-sm text-${metric.color}-400 bg-${metric.color}-400/10 px-2 py-1 rounded-lg`}>
                {metric.trend}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <ModernCircularProgress
                percentage={metric.progress}
                size={80}
                strokeWidth={8}
                color={metric.color}
              />
              <div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-slate-400">Current Performance</div>
              </div>
            </div>
          </ModernCard>
        ))}
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModernCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <h3 className="text-xl font-semibold text-white">AI Predictions</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
              <span className="text-white">Next Month Revenue</span>
              <span className="text-emerald-400 font-semibold">+$45K</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
              <span className="text-white">Conversion Likelihood</span>
              <span className="text-purple-400 font-semibold">89%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
              <span className="text-white">Competency Completion</span>
              <span className="text-blue-400 font-semibold">12 days</span>
            </div>
          </div>
        </ModernCard>

        <ModernCard className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
            <h3 className="text-xl font-semibold text-white">Optimization Recommendations</h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-emerald-500">
              <div className="text-white font-medium">Focus on ICP Refinement</div>
              <div className="text-slate-400 text-sm">Expected +15% conversion improvement</div>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-purple-500">
              <div className="text-white font-medium">Expand Stakeholder Arsenal</div>
              <div className="text-slate-400 text-sm">Projected +$23K revenue impact</div>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-blue-500">
              <div className="text-white font-medium">Increase Tool Usage</div>
              <div className="text-slate-400 text-sm">Estimated +8% efficiency gain</div>
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Detailed Charts Section */}
      <ModernCard className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          <h3 className="text-xl font-semibold text-white">Performance Trends</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">$287K</div>
            <div className="text-slate-400 mb-4">Total Revenue Impact</div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-4/5"></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">143</div>
            <div className="text-slate-400 mb-4">Qualified Opportunities</div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-3/4"></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">92%</div>
            <div className="text-slate-400 mb-4">Platform Utilization</div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-5/6"></div>
            </div>
          </div>
        </div>
      </ModernCard>
    </div>
  );
}

export default AdvancedAnalyticsDashboard;