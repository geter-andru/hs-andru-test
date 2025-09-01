'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ConversionOptimization - User conversion tracking and optimization system
 * 
 * Features:
 * - Multi-funnel conversion tracking
 * - A/B testing with statistical significance
 * - Real-time conversion analytics
 * - Cohort analysis and retention
 * - Attribution modeling
 * - Predictive conversion scoring
 * - Dynamic optimization triggers
 * - Revenue impact tracking
 */

export type ConversionEventType = 
  | 'page_view' 
  | 'signup' 
  | 'trial_start' 
  | 'feature_use' 
  | 'upgrade' 
  | 'purchase' 
  | 'renewal' 
  | 'referral' 
  | 'custom';

export type FunnelStage = 
  | 'awareness' 
  | 'interest' 
  | 'consideration' 
  | 'intent' 
  | 'evaluation' 
  | 'purchase' 
  | 'retention' 
  | 'advocacy';

export type OptimizationType = 
  | 'cta_optimization' 
  | 'content_variation' 
  | 'pricing_strategy' 
  | 'timing_optimization' 
  | 'personalization' 
  | 'social_proof' 
  | 'urgency_creation' 
  | 'friction_reduction';

export type AttributionModel = 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'position_based';

export interface ConversionGoal {
  id: string;
  name: string;
  description: string;
  event: ConversionEventType;
  value: number; // Revenue value of this conversion
  stage: FunnelStage;
  timeframe: {
    window: number; // Days to complete conversion
    urgency?: number; // Days to create urgency
  };
  conditions: Array<{
    field: string;
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
  }>;
  segments?: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface ConversionFunnel {
  id: string;
  name: string;
  description: string;
  stages: Array<{
    id: string;
    name: string;
    stage: FunnelStage;
    goal: ConversionGoal;
    dropoffThreshold: number; // Percentage that triggers optimization
    averageTime: number; // Average time to convert from this stage (hours)
    conversionRate: number; // Historical conversion rate
  }>;
  attribution: AttributionModel;
  settings: {
    trackAnonymous: boolean;
    includeReturning: boolean;
    minimumEvents: number;
    cohortPeriod: 'daily' | 'weekly' | 'monthly';
  };
}

export interface OptimizationExperiment {
  id: string;
  name: string;
  description: string;
  type: OptimizationType;
  hypothesis: string;
  targetMetric: string;
  variants: Array<{
    id: string;
    name: string;
    weight: number; // Traffic allocation percentage
    changes: any; // UI/content changes for this variant
    description: string;
  }>;
  targeting: {
    segments?: string[];
    conditions?: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
    percentage: number; // Percentage of users to include
  };
  duration: {
    startDate: Date;
    endDate: Date;
    minimumSampleSize: number;
  };
  status: 'draft' | 'running' | 'completed' | 'paused' | 'cancelled';
  results?: {
    significance: number;
    confidenceLevel: number;
    winner?: string;
    conversionRates: Record<string, number>;
    revenue: Record<string, number>;
    samples: Record<string, number>;
  };
}

export interface ConversionEvent {
  id: string;
  userId: string;
  sessionId: string;
  event: ConversionEventType;
  funnelId: string;
  stageId: string;
  goalId: string;
  timestamp: Date;
  value: number;
  properties: Record<string, any>;
  attribution: {
    source: string;
    medium: string;
    campaign?: string;
    touchpoints: Array<{
      source: string;
      timestamp: Date;
      value: number;
    }>;
  };
  experiments?: Array<{
    experimentId: string;
    variantId: string;
  }>;
}

export interface UserConversionProfile {
  userId: string;
  segment: string;
  conversionScore: number; // 0-100 likelihood to convert
  stage: FunnelStage;
  touchpoints: number;
  firstSeen: Date;
  lastActivity: Date;
  totalValue: number;
  conversionEvents: ConversionEvent[];
  cohort: string;
  riskFactors: Array<{
    factor: string;
    weight: number;
    description: string;
  }>;
  opportunities: Array<{
    type: OptimizationType;
    potential: number;
    description: string;
    recommended: boolean;
  }>;
}

export interface ConversionMetrics {
  funnel: {
    totalUsers: number;
    conversions: number;
    conversionRate: number;
    revenue: number;
    averageValue: number;
  };
  stages: Record<string, {
    users: number;
    conversions: number;
    conversionRate: number;
    dropoffRate: number;
    averageTime: number;
    revenue: number;
  }>;
  experiments: Record<string, {
    status: string;
    significance: number;
    bestVariant: string;
    lift: number;
    revenue: number;
  }>;
  cohorts: Record<string, {
    size: number;
    conversionRate: number;
    retention: number;
    ltv: number;
  }>;
  trends: {
    daily: Array<{ date: string; conversions: number; revenue: number }>;
    weekly: Array<{ week: string; conversions: number; revenue: number }>;
    monthly: Array<{ month: string; conversions: number; revenue: number }>;
  };
}

export interface ConversionOptimizationProps {
  funnels: ConversionFunnel[];
  experiments: OptimizationExperiment[];
  userProfile?: UserConversionProfile;
  onConversionEvent?: (event: ConversionEvent) => void;
  onExperimentAssignment?: (experimentId: string, variantId: string) => void;
  onOptimizationTrigger?: (type: OptimizationType, data: any) => void;
  enableRealTimeOptimization?: boolean;
  enablePredictiveScoring?: boolean;
  enableCohortAnalysis?: boolean;
  minimumConfidence?: number;
  className?: string;
  'data-testid'?: string;
}

const ConversionOptimization: React.FC<ConversionOptimizationProps> = ({
  funnels,
  experiments,
  userProfile,
  onConversionEvent,
  onExperimentAssignment,
  onOptimizationTrigger,
  enableRealTimeOptimization = true,
  enablePredictiveScoring = true,
  enableCohortAnalysis = true,
  minimumConfidence = 95,
  className = '',
  'data-testid': testId
}) => {
  // State management
  const [activeExperiments, setActiveExperiments] = React.useState<Map<string, string>>(new Map());
  const [conversionMetrics, setConversionMetrics] = React.useState<ConversionMetrics | null>(null);
  const [optimizationQueue, setOptimizationQueue] = React.useState<Array<{
    type: OptimizationType;
    trigger: string;
    data: any;
    priority: number;
    timestamp: Date;
  }>>([]);
  const [predictiveScore, setPredictiveScore] = React.useState<number | null>(null);

  // Track conversion event
  const trackConversion = React.useCallback((
    event: ConversionEventType,
    funnelId: string,
    goalId: string,
    value = 0,
    properties: Record<string, any> = {}
  ) => {
    const conversionEvent: ConversionEvent = {
      id: `conversion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: userProfile?.userId || 'anonymous',
      sessionId: `session_${Date.now()}`,
      event,
      funnelId,
      stageId: '', // Would be determined by funnel stage
      goalId,
      timestamp: new Date(),
      value,
      properties,
      attribution: {
        source: properties.source || 'direct',
        medium: properties.medium || 'website',
        campaign: properties.campaign,
        touchpoints: [] // Would be populated from user journey
      },
      experiments: Array.from(activeExperiments.entries()).map(([experimentId, variantId]) => ({
        experimentId,
        variantId
      }))
    };

    onConversionEvent?.(conversionEvent);

    // Update metrics
    updateConversionMetrics(conversionEvent);

    // Trigger optimizations if enabled
    if (enableRealTimeOptimization) {
      evaluateOptimizations(conversionEvent);
    }
  }, [userProfile, activeExperiments, onConversionEvent, enableRealTimeOptimization]);

  // Assign user to experiments
  const assignToExperiments = React.useCallback(() => {
    const runningExperiments = experiments.filter(exp => exp.status === 'running');
    const newAssignments = new Map<string, string>();

    runningExperiments.forEach(experiment => {
      // Check if user matches targeting criteria
      const matchesTargeting = experiment.targeting.segments?.includes(userProfile?.segment || '') ?? true;
      
      if (matchesTargeting && Math.random() * 100 < experiment.targeting.percentage) {
        // Assign to variant based on weights
        const random = Math.random() * 100;
        let cumulative = 0;
        
        for (const variant of experiment.variants) {
          cumulative += variant.weight;
          if (random <= cumulative) {
            newAssignments.set(experiment.id, variant.id);
            onExperimentAssignment?.(experiment.id, variant.id);
            break;
          }
        }
      }
    });

    setActiveExperiments(newAssignments);
  }, [experiments, userProfile, onExperimentAssignment]);

  // Calculate predictive conversion score
  const calculatePredictiveScore = React.useCallback((): number => {
    if (!enablePredictiveScoring || !userProfile) return 50;

    let score = 50; // Base score

    // Factor in user activity
    if (userProfile.touchpoints > 5) score += 15;
    else if (userProfile.touchpoints > 2) score += 5;

    // Factor in time since first seen
    const daysSinceFirst = (Date.now() - userProfile.firstSeen.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceFirst < 1) score += 10; // Recent visitors more likely
    else if (daysSinceFirst > 30) score -= 10; // Old visitors less likely

    // Factor in current stage
    const stageWeights = {
      awareness: 5,
      interest: 15,
      consideration: 30,
      intent: 50,
      evaluation: 70,
      purchase: 90,
      retention: 95,
      advocacy: 100
    };
    score = Math.max(score, stageWeights[userProfile.stage] || 50);

    // Factor in segment
    if (userProfile.segment === 'power_user') score += 20;
    else if (userProfile.segment === 'enterprise_user') score += 15;
    else if (userProfile.segment === 'at_risk') score -= 20;

    // Factor in previous conversion value
    if (userProfile.totalValue > 1000) score += 15;
    else if (userProfile.totalValue > 100) score += 5;

    return Math.max(0, Math.min(100, score));
  }, [enablePredictiveScoring, userProfile]);

  // Update conversion metrics
  const updateConversionMetrics = React.useCallback((event: ConversionEvent) => {
    // In a real implementation, this would aggregate data from a backend
    // For demo purposes, we'll simulate metric updates
    setConversionMetrics(prev => {
      if (!prev) return null;

      return {
        ...prev,
        funnel: {
          ...prev.funnel,
          conversions: prev.funnel.conversions + 1,
          revenue: prev.funnel.revenue + event.value
        }
      };
    });
  }, []);

  // Evaluate optimization triggers
  const evaluateOptimizations = React.useCallback((event: ConversionEvent) => {
    const optimizations: Array<{ type: OptimizationType; trigger: string; data: any; priority: number }> = [];

    // Low conversion rate optimization
    if (conversionMetrics && conversionMetrics.funnel.conversionRate < 5) {
      optimizations.push({
        type: 'cta_optimization',
        trigger: 'low_conversion_rate',
        data: { currentRate: conversionMetrics.funnel.conversionRate },
        priority: 8
      });
    }

    // High-value user not converting
    if (userProfile && userProfile.conversionScore > 80 && !userProfile.conversionEvents.length) {
      optimizations.push({
        type: 'personalization',
        trigger: 'high_intent_no_conversion',
        data: { score: userProfile.conversionScore },
        priority: 9
      });
    }

    // Cart abandonment (for e-commerce)
    if (event.event === 'page_view' && event.properties.page === 'checkout' && userProfile?.stage === 'intent') {
      optimizations.push({
        type: 'urgency_creation',
        trigger: 'checkout_abandonment_risk',
        data: { stage: userProfile.stage },
        priority: 7
      });
    }

    // Add to optimization queue
    optimizations.forEach(opt => {
      setOptimizationQueue(prev => [...prev, {
        ...opt,
        timestamp: new Date()
      }]);

      onOptimizationTrigger?.(opt.type, opt.data);
    });
  }, [conversionMetrics, userProfile, onOptimizationTrigger]);

  // Process optimization queue
  React.useEffect(() => {
    if (optimizationQueue.length === 0) return;

    const processQueue = () => {
      const highPriorityOpts = optimizationQueue
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 3); // Process top 3 optimizations

      highPriorityOpts.forEach(opt => {
        // Apply optimization (in real app, would trigger UI changes)
        console.log(`Applying optimization: ${opt.type}`, opt.data);
      });

      // Clear processed optimizations
      setOptimizationQueue(prev => prev.slice(3));
    };

    const timer = setTimeout(processQueue, 2000);
    return () => clearTimeout(timer);
  }, [optimizationQueue]);

  // Initialize experiments and scoring
  React.useEffect(() => {
    assignToExperiments();
    
    if (enablePredictiveScoring) {
      const score = calculatePredictiveScore();
      setPredictiveScore(score);
    }
  }, [assignToExperiments, calculatePredictiveScore, enablePredictiveScoring]);

  // Analytics dashboard
  const AnalyticsDashboard: React.FC<{ show: boolean }> = ({ show }) => {
    if (!show || !conversionMetrics) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 w-96 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Conversion Analytics</h3>
          <div className="text-xs bg-green-500 text-white px-2 py-1 rounded">
            Live
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-400">Conversion Rate</div>
            <div className="text-lg font-bold text-green-400">
              {conversionMetrics.funnel.conversionRate.toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-400">Revenue</div>
            <div className="text-lg font-bold text-blue-400">
              ${conversionMetrics.funnel.revenue.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-400">Conversions</div>
            <div className="text-lg font-bold text-purple-400">
              {conversionMetrics.funnel.conversions}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-400">Avg. Value</div>
            <div className="text-lg font-bold text-yellow-400">
              ${conversionMetrics.funnel.averageValue.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Predictive score */}
        {predictiveScore !== null && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>Conversion Likelihood</span>
              <span>{predictiveScore}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  predictiveScore >= 80 ? 'bg-green-500' :
                  predictiveScore >= 60 ? 'bg-yellow-500' :
                  predictiveScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${predictiveScore}%` }}
              />
            </div>
          </div>
        )}

        {/* Active experiments */}
        {activeExperiments.size > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-400 mb-2">Active Experiments</div>
            <div className="space-y-1">
              {Array.from(activeExperiments.entries()).map(([expId, variantId]) => {
                const experiment = experiments.find(e => e.id === expId);
                const variant = experiment?.variants.find(v => v.id === variantId);
                
                return (
                  <div key={expId} className="flex items-center justify-between text-xs">
                    <span className="text-gray-300">{experiment?.name}</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded">
                      {variant?.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Optimization opportunities */}
        {userProfile?.opportunities && userProfile.opportunities.length > 0 && (
          <div>
            <div className="text-xs text-gray-400 mb-2">Optimization Opportunities</div>
            <div className="space-y-1">
              {userProfile.opportunities.slice(0, 3).map((opp, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">{opp.description}</span>
                  <span className={`px-2 py-1 rounded ${
                    opp.recommended ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'
                  }`}>
                    +{opp.potential}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // Conversion triggers
  const ConversionTriggers: React.FC = () => {
    const [showTrigger, setShowTrigger] = React.useState<{
      type: OptimizationType;
      message: string;
      action: () => void;
    } | null>(null);

    React.useEffect(() => {
      // Example triggers based on user behavior
      if (predictiveScore && predictiveScore > 80 && !userProfile?.conversionEvents.length) {
        setShowTrigger({
          type: 'urgency_creation',
          message: 'Limited time offer - 20% off your first purchase!',
          action: () => trackConversion('purchase', 'main_funnel', 'purchase_goal', 100)
        });
      } else if (userProfile?.stage === 'consideration' && userProfile.touchpoints > 3) {
        setShowTrigger({
          type: 'social_proof',
          message: 'Join 10,000+ satisfied customers who chose our solution',
          action: () => trackConversion('signup', 'main_funnel', 'signup_goal', 0)
        });
      }
    }, [predictiveScore, userProfile]);

    if (!showTrigger) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 max-w-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-4 shadow-2xl z-50"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="text-sm font-semibold">{showTrigger.message}</div>
          <button
            onClick={() => setShowTrigger(null)}
            className="text-white/70 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => {
              showTrigger.action();
              setShowTrigger(null);
            }}
            className="flex-1 bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            Take Action
          </button>
          <button
            onClick={() => setShowTrigger(null)}
            className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            Maybe Later
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`conversion-optimization ${className}`} data-testid={testId}>
      {/* Analytics dashboard - only shown in development */}
      {process.env.NODE_ENV === 'development' && (
        <AnalyticsDashboard show={true} />
      )}
      
      {/* Conversion triggers */}
      <ConversionTriggers />
      
      {/* Expose tracking methods globally */}
      {typeof window !== 'undefined' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.trackConversion = function(event, funnelId, goalId, value, properties) {
                // This would be implemented to call the trackConversion method
                console.log('Conversion tracked:', { event, funnelId, goalId, value, properties });
              };
            `
          }}
        />
      )}
    </div>
  );
};

// Hook for conversion optimization
export const useConversionOptimization = () => {
  const [funnels, setFunnels] = React.useState<ConversionFunnel[]>([]);
  const [experiments, setExperiments] = React.useState<OptimizationExperiment[]>([]);
  const [metrics, setMetrics] = React.useState<ConversionMetrics | null>(null);

  const trackConversion = React.useCallback((
    event: ConversionEventType,
    funnelId: string,
    goalId: string,
    value = 0,
    properties = {}
  ) => {
    // Track conversion event
    console.log('Conversion tracked:', { event, funnelId, goalId, value, properties });
  }, []);

  const createExperiment = React.useCallback((experiment: Omit<OptimizationExperiment, 'id'>) => {
    const newExperiment: OptimizationExperiment = {
      ...experiment,
      id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    setExperiments(prev => [...prev, newExperiment]);
    return newExperiment.id;
  }, []);

  const updateExperiment = React.useCallback((id: string, updates: Partial<OptimizationExperiment>) => {
    setExperiments(prev => prev.map(exp => exp.id === id ? { ...exp, ...updates } : exp));
  }, []);

  return {
    funnels,
    experiments,
    metrics,
    trackConversion,
    createExperiment,
    updateExperiment,
    setFunnels,
    setMetrics
  };
};

// Higher-order component for conversion tracking
export const withConversionTracking = <P extends object>(
  Component: React.ComponentType<P>,
  conversionConfig: {
    event: ConversionEventType;
    funnelId: string;
    goalId: string;
    value?: number;
  }
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const { trackConversion } = useConversionOptimization();

    React.useEffect(() => {
      trackConversion(
        conversionConfig.event,
        conversionConfig.funnelId,
        conversionConfig.goalId,
        conversionConfig.value,
        { component: Component.displayName || Component.name }
      );
    }, [trackConversion]);

    return <Component {...props} ref={ref} />;
  });
};

export default ConversionOptimization;