'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Activity, 
  Clock, 
  Target, 
  Award, 
  BarChart3,
  Calendar,
  Zap,
  Users,
  FileText
} from 'lucide-react';
import ModernCard from '../ui/ModernCard';

/**
 * EngagementMetrics - User progress tracking and analytics
 * 
 * Features:
 * - Real-time engagement tracking
 * - Progress visualization
 * - Activity heatmaps
 * - Milestone tracking
 * - Performance analytics
 * - Export-ready metrics
 */

export interface EngagementData {
  userId: string;
  totalActions: number;
  completedStages: number;
  activeTime: number; // in minutes
  lastActive: Date;
  streakDays: number;
  topActions: Array<{ action: string; count: number }>;
  milestones: Array<{ name: string; date: Date; value: number }>;
  weeklyActivity: Array<{ day: string; actions: number }>;
  conversionMetrics: {
    discoveryToActivation: number;
    activationToValue: number;
    valueToMastery: number;
  };
}

export interface EngagementMetricsProps {
  data: EngagementData;
  showDetails?: boolean;
  compactView?: boolean;
  onExport?: (data: EngagementData) => void;
  className?: string;
}

const EngagementMetrics: React.FC<EngagementMetricsProps> = ({
  data,
  showDetails = true,
  compactView = false,
  onExport,
  className = ''
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('overview');
  const [animatedValues, setAnimatedValues] = useState({
    totalActions: 0,
    completedStages: 0,
    activeTime: 0,
    streakDays: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const duration = 1000;
    const steps = 20;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues({
        totalActions: Math.floor(data.totalActions * progress),
        completedStages: Math.floor(data.completedStages * progress),
        activeTime: Math.floor(data.activeTime * progress),
        streakDays: Math.floor(data.streakDays * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [data]);

  // Calculate engagement score
  const engagementScore = useMemo(() => {
    const actionScore = Math.min(data.totalActions / 100, 1) * 25;
    const stageScore = (data.completedStages / 4) * 25;
    const timeScore = Math.min(data.activeTime / 240, 1) * 25;
    const streakScore = Math.min(data.streakDays / 30, 1) * 25;
    
    return Math.round(actionScore + stageScore + timeScore + streakScore);
  }, [data]);

  // Get engagement level
  const getEngagementLevel = (score: number) => {
    if (score >= 90) return { level: 'Power User', color: 'text-purple-400', bg: 'bg-purple-400/20' };
    if (score >= 70) return { level: 'Advanced', color: 'text-blue-400', bg: 'bg-blue-400/20' };
    if (score >= 50) return { level: 'Active', color: 'text-green-400', bg: 'bg-green-400/20' };
    if (score >= 30) return { level: 'Engaged', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
    return { level: 'Explorer', color: 'text-gray-400', bg: 'bg-gray-400/20' };
  };

  const engagementLevel = getEngagementLevel(engagementScore);

  // Format time display
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Key metrics cards
  const keyMetrics = [
    {
      label: 'Total Actions',
      value: animatedValues.totalActions,
      icon: <Activity className="w-4 h-4" />,
      color: 'text-blue-400',
      trend: '+12%'
    },
    {
      label: 'Stages Complete',
      value: `${animatedValues.completedStages}/4`,
      icon: <Target className="w-4 h-4" />,
      color: 'text-green-400',
      trend: null
    },
    {
      label: 'Active Time',
      value: formatTime(animatedValues.activeTime),
      icon: <Clock className="w-4 h-4" />,
      color: 'text-yellow-400',
      trend: '+25%'
    },
    {
      label: 'Day Streak',
      value: animatedValues.streakDays,
      icon: <Zap className="w-4 h-4" />,
      color: 'text-purple-400',
      trend: '🔥'
    }
  ];

  if (compactView) {
    return (
      <ModernCard className={className} padding="compact">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${engagementLevel.bg}`}>
              <Award className={`w-5 h-5 ${engagementLevel.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Engagement Score</p>
              <p className="text-2xl font-bold text-white">{engagementScore}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {keyMetrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="text-right">
                <p className="text-xs text-gray-400">{metric.label}</p>
                <p className={`text-lg font-semibold ${metric.color}`}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ModernCard>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Engagement Score Header */}
      <ModernCard>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Engagement Analytics</h3>
            <div className="flex items-center space-x-3">
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${engagementLevel.bg}`}>
                <Award className={`w-4 h-4 ${engagementLevel.color}`} />
                <span className={`text-sm font-medium ${engagementLevel.color}`}>
                  {engagementLevel.level}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                Score: {engagementScore}/100
              </span>
            </div>
          </div>
          {onExport && (
            <button
              onClick={() => onExport(data)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Export
            </button>
          )}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={metric.color}>{metric.icon}</div>
                {metric.trend && (
                  <span className="text-xs text-green-400">{metric.trend}</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
              <p className="text-xl font-semibold text-white">{metric.value}</p>
            </motion.div>
          ))}
        </div>
      </ModernCard>

      {showDetails && (
        <>
          {/* Activity Heatmap */}
          <ModernCard>
            <h4 className="text-sm font-semibold text-white mb-4">Weekly Activity</h4>
            <div className="space-y-3">
              {data.weeklyActivity.map((day, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-xs text-gray-400 w-12">{day.day}</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-6 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.actions / 20) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs text-gray-300 w-8 text-right">
                    {day.actions}
                  </span>
                </div>
              ))}
            </div>
          </ModernCard>

          {/* Top Actions */}
          <ModernCard>
            <h4 className="text-sm font-semibold text-white mb-4">Most Used Features</h4>
            <div className="space-y-2">
              {data.topActions.slice(0, 5).map((action, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-300 font-mono">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-white">
                      {action.action.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-blue-400">
                    {action.count}x
                  </span>
                </div>
              ))}
            </div>
          </ModernCard>

          {/* Conversion Funnel */}
          <ModernCard>
            <h4 className="text-sm font-semibold text-white mb-4">Journey Progress</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Discovery → Activation</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-green-400"
                      style={{ width: `${data.conversionMetrics.discoveryToActivation}%` }}
                    />
                  </div>
                  <span className="text-xs text-green-400">
                    {data.conversionMetrics.discoveryToActivation}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Activation → Value</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-blue-400"
                      style={{ width: `${data.conversionMetrics.activationToValue}%` }}
                    />
                  </div>
                  <span className="text-xs text-blue-400">
                    {data.conversionMetrics.activationToValue}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Value → Mastery</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-purple-400"
                      style={{ width: `${data.conversionMetrics.valueToMastery}%` }}
                    />
                  </div>
                  <span className="text-xs text-purple-400">
                    {data.conversionMetrics.valueToMastery}%
                  </span>
                </div>
              </div>
            </div>
          </ModernCard>

          {/* Recent Milestones */}
          <ModernCard>
            <h4 className="text-sm font-semibold text-white mb-4">Recent Milestones</h4>
            <div className="space-y-2">
              {data.milestones.slice(0, 3).map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <div>
                      <p className="text-sm text-white">{milestone.name}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(milestone.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-yellow-400">
                    +{milestone.value}
                  </span>
                </div>
              ))}
            </div>
          </ModernCard>
        </>
      )}
    </div>
  );
};

export default EngagementMetrics;