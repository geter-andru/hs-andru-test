'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * PersonalizationEngine - Adaptive user experience system
 * 
 * Features:
 * - ML-powered user behavior analysis
 * - Dynamic content personalization
 * - Adaptive UI/UX modifications
 * - Preference learning and prediction
 * - A/B testing integration
 * - Real-time personalization updates
 * - Privacy-compliant data handling
 * - Cross-session personalization
 */

export type PersonalizationType = 
  | 'content' 
  | 'ui_layout' 
  | 'navigation' 
  | 'recommendations' 
  | 'notifications' 
  | 'timing' 
  | 'complexity' 
  | 'visual_theme';

export type UserSegment = 
  | 'new_user' 
  | 'power_user' 
  | 'casual_user' 
  | 'enterprise_user' 
  | 'developer' 
  | 'business_user' 
  | 'at_risk' 
  | 'champion';

export type LearningModel = 'collaborative_filtering' | 'content_based' | 'hybrid' | 'deep_learning' | 'reinforcement';
export type PersonalizationStrategy = 'aggressive' | 'moderate' | 'conservative' | 'experimental';

export interface UserPreference {
  id: string;
  type: PersonalizationType;
  category: string;
  preference: any; // Flexible type for different preference data
  confidence: number; // 0-100, how confident we are in this preference
  source: 'explicit' | 'implicit' | 'inferred' | 'default';
  lastUpdated: Date;
  weight: number; // How important this preference is
  context?: {
    timeOfDay?: string;
    device?: string;
    location?: string;
    sessionType?: string;
  };
}

export interface BehaviorPattern {
  id: string;
  pattern: string;
  frequency: number;
  contexts: string[];
  outcomes: {
    positive: number;
    negative: number;
    neutral: number;
  };
  confidence: number;
  lastObserved: Date;
  predictivePower: number; // How well this pattern predicts user behavior
}

export interface PersonalizationRule {
  id: string;
  name: string;
  description: string;
  condition: (profile: UserProfile) => boolean;
  action: {
    type: PersonalizationType;
    modifications: any;
    priority: number;
  };
  active: boolean;
  performance: {
    impressions: number;
    interactions: number;
    conversions: number;
    satisfactionScore: number;
  };
  abTest?: {
    variant: string;
    splitRatio: number;
    startDate: Date;
    endDate?: Date;
  };
}

export interface UserProfile {
  userId: string;
  segment: UserSegment;
  preferences: UserPreference[];
  behaviorPatterns: BehaviorPattern[];
  demographics?: {
    age?: number;
    location?: string;
    industry?: string;
    role?: string;
    company?: string;
    teamSize?: number;
  };
  technographics: {
    devices: string[];
    browsers: string[];
    preferredLanguage: string;
    timezone: string;
    accessPatterns: {
      peakHours: number[];
      activeWeekdays: number[];
      sessionDuration: number;
      pagesPerSession: number;
    };
  };
  psychographics: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    riskTolerance: 'low' | 'medium' | 'high';
    decisionSpeed: 'fast' | 'moderate' | 'deliberate';
    informationPreference: 'summary' | 'detailed' | 'comprehensive';
    socialInfluence: 'independent' | 'collaborative' | 'authority_driven';
  };
  goals: Array<{
    id: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    progress: number;
    deadline?: Date;
  }>;
  satisfactionScore: number;
  churnRisk: number;
  lifetimeValue: number;
  lastActive: Date;
}

export interface PersonalizationResult {
  modifications: Array<{
    type: PersonalizationType;
    element: string;
    changes: any;
    confidence: number;
    reasoning: string;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    type: 'content' | 'feature' | 'action';
    priority: number;
    confidence: number;
    metadata?: any;
  }>;
  experiments: Array<{
    id: string;
    name: string;
    variant: string;
    modifications: any;
  }>;
}

export interface PersonalizationEngineProps {
  userProfile: UserProfile;
  rules: PersonalizationRule[];
  strategy?: PersonalizationStrategy;
  model?: LearningModel;
  enableRealTime?: boolean;
  enableABTesting?: boolean;
  privacyMode?: 'strict' | 'balanced' | 'permissive';
  onPersonalizationUpdate?: (result: PersonalizationResult) => void;
  onPreferenceUpdate?: (preference: UserPreference) => void;
  onBehaviorDetected?: (pattern: BehaviorPattern) => void;
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const PersonalizationEngine: React.FC<PersonalizationEngineProps> = ({
  userProfile,
  rules,
  strategy = 'moderate',
  model = 'hybrid',
  enableRealTime = true,
  enableABTesting = true,
  privacyMode = 'balanced',
  onPersonalizationUpdate,
  onPreferenceUpdate,
  onBehaviorDetected,
  children,
  className = '',
  'data-testid': testId
}) => {
  // State management
  const [personalizationResult, setPersonalizationResult] = React.useState<PersonalizationResult | null>(null);
  const [activeExperiments, setActiveExperiments] = React.useState<Map<string, any>>(new Map());
  const [behaviorQueue, setBehaviorQueue] = React.useState<Array<{ action: string; context: any; timestamp: Date }>>([]);

  // Personalization processing
  const processPersonalization = React.useCallback(() => {
    const modifications: PersonalizationResult['modifications'] = [];
    const recommendations: PersonalizationResult['recommendations'] = [];
    const experiments: PersonalizationResult['experiments'] = [];

    // Apply personalization rules
    rules
      .filter(rule => rule.active && rule.condition(userProfile))
      .sort((a, b) => b.action.priority - a.action.priority)
      .forEach(rule => {
        // Apply rule modifications
        modifications.push({
          type: rule.action.type,
          element: rule.name,
          changes: rule.action.modifications,
          confidence: rule.performance.satisfactionScore,
          reasoning: rule.description
        });

        // Handle A/B testing
        if (enableABTesting && rule.abTest) {
          experiments.push({
            id: rule.id,
            name: rule.name,
            variant: rule.abTest.variant,
            modifications: rule.action.modifications
          });
        }
      });

    // Generate ML-powered recommendations
    const mlRecommendations = generateRecommendations(userProfile, model);
    recommendations.push(...mlRecommendations);

    // Apply strategy-specific filtering
    const filteredResult = applyStrategy({
      modifications,
      recommendations,
      experiments
    }, strategy);

    return filteredResult;
  }, [userProfile, rules, strategy, model, enableABTesting]);

  // Generate ML recommendations
  const generateRecommendations = React.useCallback((
    profile: UserProfile, 
    modelType: LearningModel
  ): PersonalizationResult['recommendations'] => {
    const recommendations: PersonalizationResult['recommendations'] = [];

    switch (modelType) {
      case 'collaborative_filtering':
        // Find similar users and recommend based on their preferences
        if (profile.segment === 'power_user' && profile.satisfactionScore > 80) {
          recommendations.push({
            id: 'advanced_features',
            title: 'Advanced Features Available',
            description: 'Based on your usage patterns, you might benefit from our advanced features',
            type: 'feature',
            priority: 8,
            confidence: 85,
            metadata: { segment: profile.segment, trigger: 'power_user_pattern' }
          });
        }
        break;

      case 'content_based':
        // Recommend based on content similarity and past interactions
        profile.preferences
          .filter(pref => pref.confidence > 70 && pref.type === 'content')
          .forEach(pref => {
            recommendations.push({
              id: `content_${pref.id}`,
              title: 'Recommended Content',
              description: `Content similar to what you've engaged with previously`,
              type: 'content',
              priority: 6,
              confidence: pref.confidence,
              metadata: { preferenceId: pref.id, category: pref.category }
            });
          });
        break;

      case 'hybrid':
        // Combine multiple approaches
        const hybridRecs = [
          ...generateRecommendations(profile, 'collaborative_filtering'),
          ...generateRecommendations(profile, 'content_based')
        ];
        recommendations.push(...hybridRecs.slice(0, 5)); // Limit to top 5
        break;

      case 'deep_learning':
        // Simulate deep learning recommendations
        if (profile.churnRisk > 60) {
          recommendations.push({
            id: 'retention_action',
            title: 'Stay Connected',
            description: 'We have some features that might re-engage your interest',
            type: 'action',
            priority: 9,
            confidence: profile.churnRisk,
            metadata: { trigger: 'churn_prevention' }
          });
        }
        break;

      case 'reinforcement':
        // Recommendations based on reward optimization
        const highValueActions = profile.behaviorPatterns
          .filter(pattern => pattern.outcomes.positive > pattern.outcomes.negative)
          .sort((a, b) => b.predictivePower - a.predictivePower)
          .slice(0, 3);

        highValueActions.forEach(pattern => {
          recommendations.push({
            id: `reinforcement_${pattern.id}`,
            title: 'Recommended Action',
            description: `This action has worked well for you in the past`,
            type: 'action',
            priority: 7,
            confidence: pattern.confidence,
            metadata: { patternId: pattern.id, pattern: pattern.pattern }
          });
        });
        break;
    }

    return recommendations;
  }, []);

  // Apply personalization strategy
  const applyStrategy = React.useCallback((
    result: PersonalizationResult,
    strategyType: PersonalizationStrategy
  ): PersonalizationResult => {
    const { modifications, recommendations, experiments } = result;

    switch (strategyType) {
      case 'aggressive':
        // Apply all high-confidence personalizations immediately
        return {
          modifications: modifications.filter(m => m.confidence >= 60),
          recommendations: recommendations.filter(r => r.confidence >= 60),
          experiments: experiments
        };

      case 'moderate':
        // Apply personalizations with good confidence, limit experiments
        return {
          modifications: modifications.filter(m => m.confidence >= 70),
          recommendations: recommendations.filter(r => r.confidence >= 70).slice(0, 3),
          experiments: experiments.slice(0, 2)
        };

      case 'conservative':
        // Only apply high-confidence personalizations
        return {
          modifications: modifications.filter(m => m.confidence >= 80),
          recommendations: recommendations.filter(r => r.confidence >= 85).slice(0, 2),
          experiments: enableABTesting ? experiments.slice(0, 1) : []
        };

      case 'experimental':
        // Prioritize experiments and new approaches
        return {
          modifications: modifications.slice(0, 2), // Fewer standard modifications
          recommendations: recommendations,
          experiments: experiments // All experiments
        };

      default:
        return result;
    }
  }, [enableABTesting]);

  // Track user behavior
  const trackBehavior = React.useCallback((action: string, context: any = {}) => {
    if (privacyMode === 'strict') return;

    setBehaviorQueue(prev => [...prev, {
      action,
      context,
      timestamp: new Date()
    }]);

    // Process behavior patterns
    if (onBehaviorDetected) {
      const pattern = analyzePattern(action, context, userProfile.behaviorPatterns);
      if (pattern) {
        onBehaviorDetected(pattern);
      }
    }
  }, [privacyMode, userProfile.behaviorPatterns, onBehaviorDetected]);

  // Analyze behavior patterns
  const analyzePattern = React.useCallback((
    action: string,
    context: any,
    existingPatterns: BehaviorPattern[]
  ): BehaviorPattern | null => {
    // Simple pattern detection - in real implementation would use ML
    const existingPattern = existingPatterns.find(p => p.pattern === action);
    
    if (existingPattern) {
      return {
        ...existingPattern,
        frequency: existingPattern.frequency + 1,
        lastObserved: new Date(),
        contexts: [...new Set([...existingPattern.contexts, JSON.stringify(context)])]
      };
    } else if (existingPatterns.filter(p => p.pattern === action).length === 0) {
      // New pattern detected
      return {
        id: `pattern_${Date.now()}`,
        pattern: action,
        frequency: 1,
        contexts: [JSON.stringify(context)],
        outcomes: { positive: 0, negative: 0, neutral: 1 },
        confidence: 30,
        lastObserved: new Date(),
        predictivePower: 10
      };
    }

    return null;
  }, []);

  // Update personalization
  const updatePersonalization = React.useCallback(() => {
    const result = processPersonalization();
    setPersonalizationResult(result);
    onPersonalizationUpdate?.(result);
  }, [processPersonalization, onPersonalizationUpdate]);

  // Process behavior queue
  React.useEffect(() => {
    if (behaviorQueue.length === 0) return;

    const processQueue = async () => {
      // Process behaviors in batches
      const batch = behaviorQueue.slice(0, 10);
      setBehaviorQueue(prev => prev.slice(10));

      // Analyze patterns and update preferences
      batch.forEach(({ action, context }) => {
        // Update implicit preferences based on behavior
        const preference: UserPreference = {
          id: `implicit_${Date.now()}_${Math.random()}`,
          type: 'content',
          category: context.category || 'general',
          preference: { action, context },
          confidence: 40,
          source: 'implicit',
          lastUpdated: new Date(),
          weight: 0.5,
          context
        };

        onPreferenceUpdate?.(preference);
      });

      // Update personalization if significant behavior changes detected
      if (batch.length >= 5) {
        updatePersonalization();
      }
    };

    const timer = setTimeout(processQueue, 2000);
    return () => clearTimeout(timer);
  }, [behaviorQueue, onPreferenceUpdate, updatePersonalization]);

  // Initial personalization and periodic updates
  React.useEffect(() => {
    updatePersonalization();

    if (enableRealTime) {
      const interval = setInterval(updatePersonalization, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [updatePersonalization, enableRealTime]);

  // Apply visual modifications to children
  const applyPersonalizedModifications = React.useCallback((children: React.ReactNode) => {
    if (!personalizationResult) return children;

    // Apply UI modifications
    const uiModifications = personalizationResult.modifications.filter(m => m.type === 'ui_layout');
    const visualModifications = personalizationResult.modifications.filter(m => m.type === 'visual_theme');

    // Clone children and apply modifications
    let modifiedChildren = children;

    // Apply theme modifications
    if (visualModifications.length > 0) {
      const themeChanges = visualModifications.reduce((acc, mod) => ({...acc, ...mod.changes}), {});
      
      if (themeChanges.colorScheme === 'high_contrast' && userProfile.psychographics.learningStyle === 'visual') {
        modifiedChildren = React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              className: `${child.props.className || ''} high-contrast-theme`
            });
          }
          return child;
        });
      }
    }

    return modifiedChildren;
  }, [personalizationResult, userProfile.psychographics]);

  // Personalization provider context
  const PersonalizationContext = React.createContext({
    trackBehavior,
    recommendations: personalizationResult?.recommendations || [],
    userProfile,
    activeExperiments
  });

  // Enhanced children with personalization
  const enhancedChildren = React.useMemo(() => {
    return applyPersonalizedModifications(children);
  }, [children, applyPersonalizedModifications]);

  return (
    <PersonalizationContext.Provider value={{
      trackBehavior,
      recommendations: personalizationResult?.recommendations || [],
      userProfile,
      activeExperiments
    }}>
      <div 
        className={`personalization-engine ${className}`} 
        data-testid={testId}
        data-user-segment={userProfile.segment}
        data-strategy={strategy}
      >
        {enhancedChildren}
        
        {/* Recommendation overlay */}
        {personalizationResult?.recommendations && personalizationResult.recommendations.length > 0 && (
          <RecommendationOverlay 
            recommendations={personalizationResult.recommendations} 
            userProfile={userProfile}
          />
        )}
        
        {/* A/B test tracker */}
        {enableABTesting && personalizationResult?.experiments && (
          <ABTestTracker 
            experiments={personalizationResult.experiments}
            onExperimentView={(experimentId) => trackBehavior('experiment_view', { experimentId })}
          />
        )}
      </div>
    </PersonalizationContext.Provider>
  );
};

// Recommendation overlay component
interface RecommendationOverlayProps {
  recommendations: PersonalizationResult['recommendations'];
  userProfile: UserProfile;
}

const RecommendationOverlay: React.FC<RecommendationOverlayProps> = ({
  recommendations,
  userProfile
}) => {
  const [showRecommendations, setShowRecommendations] = React.useState(false);
  const [dismissedRecommendations, setDismissedRecommendations] = React.useState<Set<string>>(new Set());

  const topRecommendations = recommendations
    .filter(rec => !dismissedRecommendations.has(rec.id))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);

  React.useEffect(() => {
    // Show recommendations based on user behavior
    if (userProfile.psychographics.informationPreference === 'summary' && topRecommendations.length > 0) {
      const timer = setTimeout(() => setShowRecommendations(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [topRecommendations.length, userProfile.psychographics.informationPreference]);

  if (!showRecommendations || topRecommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-20 right-4 w-80 bg-gray-900 border border-purple-500 rounded-xl shadow-2xl z-50 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-white text-sm">Personalized for You</h3>
        <button
          onClick={() => setShowRecommendations(false)}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-2">
        {topRecommendations.map((rec) => (
          <div key={rec.id} className="p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-white text-sm">{rec.title}</h4>
              <span className="text-xs text-purple-400">{rec.confidence}%</span>
            </div>
            <p className="text-xs text-gray-300 mb-2">{rec.description}</p>
            <div className="flex gap-2">
              <button className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 rounded transition-colors">
                Try it
              </button>
              <button
                onClick={() => setDismissedRecommendations(prev => new Set(prev).add(rec.id))}
                className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// A/B test tracker component
interface ABTestTrackerProps {
  experiments: PersonalizationResult['experiments'];
  onExperimentView: (experimentId: string) => void;
}

const ABTestTracker: React.FC<ABTestTrackerProps> = ({
  experiments,
  onExperimentView
}) => {
  React.useEffect(() => {
    experiments.forEach(exp => {
      onExperimentView(exp.id);
    });
  }, [experiments, onExperimentView]);

  // Only visible in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 border border-blue-500 rounded-lg p-2 text-xs z-50">
      <div className="text-blue-400 font-semibold mb-1">Active A/B Tests:</div>
      {experiments.map(exp => (
        <div key={exp.id} className="text-gray-300">
          {exp.name}: {exp.variant}
        </div>
      ))}
    </div>
  );
};

// Hook for using personalization
export const usePersonalization = () => {
  const context = React.useContext(React.createContext({
    trackBehavior: () => {},
    recommendations: [] as PersonalizationResult['recommendations'],
    userProfile: {} as UserProfile,
    activeExperiments: new Map()
  }));

  return context;
};

// Higher-order component for personalization
export const withPersonalization = <P extends object>(
  Component: React.ComponentType<P>,
  personalizationType: PersonalizationType
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const { trackBehavior, userProfile } = usePersonalization();

    React.useEffect(() => {
      trackBehavior('component_view', { 
        component: Component.displayName || Component.name,
        type: personalizationType 
      });
    }, [trackBehavior]);

    return <Component {...props} ref={ref} />;
  });
};

export default PersonalizationEngine;