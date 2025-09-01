'use client';

import React, { useState, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Check, 
  Star, 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign,
  Award,
  ChevronRight,
  Zap,
  Clock,
  AlertCircle
} from 'lucide-react';

/**
 * EnhancedTabNavigation - Progressive tool unlocking system
 * 
 * Features:
 * - Competency-based tab unlocking
 * - Progress tracking and visualization
 * - Dynamic tab states (locked, unlocked, completed, premium)
 * - Achievement-based unlocking conditions
 * - Interactive unlock animations
 * - Customizable unlock requirements
 * - Tool mastery progression
 * - Visual progress indicators
 */

export type TabState = 
  | 'locked' 
  | 'unlocked' 
  | 'in_progress' 
  | 'completed' 
  | 'premium' 
  | 'mastered';

export type UnlockConditionType = 
  | 'completion' 
  | 'score' 
  | 'time_spent' 
  | 'actions_completed' 
  | 'competency_level'
  | 'payment'
  | 'achievement';

export interface UnlockCondition {
  type: UnlockConditionType;
  value: number | string | boolean;
  description: string;
  completed?: boolean;
}

export interface TabDefinition {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  state: TabState;
  unlockConditions?: UnlockCondition[];
  prerequisites?: string[]; // Other tab IDs that must be completed first
  estimatedTime?: number; // In minutes
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  value?: string; // Value proposition (e.g., "$50K+ revenue impact")
  badge?: string; // Achievement badge
  content?: React.ReactNode;
  onUnlock?: () => void;
  onComplete?: () => void;
  premium?: boolean;
}

export interface TabProgress {
  tabId: string;
  completionPercentage: number;
  timeSpent: number; // In minutes
  lastAccessed: Date;
  actionHistory: Array<{
    action: string;
    timestamp: Date;
  }>;
}

export interface EnhancedTabNavigationProps {
  tabs: TabDefinition[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  progress?: Record<string, TabProgress>;
  onProgressUpdate?: (tabId: string, progress: Partial<TabProgress>) => void;
  showProgressBar?: boolean;
  showUnlockAnimation?: boolean;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'compact' | 'cards';
}

// Tab Context for managing state across components
interface TabContextValue {
  tabs: TabDefinition[];
  activeTab: string;
  progress: Record<string, TabProgress>;
  setTabState: (tabId: string, state: TabState) => void;
  checkUnlockConditions: (tabId: string) => boolean;
  unlockTab: (tabId: string) => void;
}

const TabContext = createContext<TabContextValue | null>(null);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within EnhancedTabNavigation');
  }
  return context;
};

const EnhancedTabNavigation: React.FC<EnhancedTabNavigationProps> = ({
  tabs: initialTabs,
  activeTab,
  onTabChange,
  progress = {},
  onProgressUpdate,
  showProgressBar = true,
  showUnlockAnimation = true,
  className = '',
  orientation = 'horizontal',
  variant = 'default'
}) => {
  const [tabs, setTabs] = useState(initialTabs);
  const [unlockedTabs, setUnlockedTabs] = useState<Set<string>>(
    new Set(initialTabs.filter(tab => tab.state !== 'locked').map(tab => tab.id))
  );

  // Check if tab can be unlocked based on conditions
  const checkUnlockConditions = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab?.unlockConditions) return true;

    return tab.unlockConditions.every(condition => {
      switch (condition.type) {
        case 'completion':
          const prerequisiteTab = condition.value as string;
          const prereqProgress = progress[prerequisiteTab];
          return prereqProgress?.completionPercentage >= 100;

        case 'score':
          const tabProgress = progress[tabId];
          return (tabProgress?.completionPercentage || 0) >= (condition.value as number);

        case 'time_spent':
          const timeProgress = progress[tabId];
          return (timeProgress?.timeSpent || 0) >= (condition.value as number);

        case 'competency_level':
          // This would integrate with your competency system
          return true; // Placeholder

        case 'payment':
          // This would integrate with your payment system
          return condition.completed || false;

        case 'achievement':
          // This would integrate with your achievement system
          return condition.completed || false;

        default:
          return false;
      }
    });
  }, [tabs, progress]);

  // Set tab state
  const setTabState = useCallback((tabId: string, state: TabState) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, state } : tab
    ));
  }, []);

  // Unlock tab with animation
  const unlockTab = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab || unlockedTabs.has(tabId)) return;

    setUnlockedTabs(prev => new Set([...prev, tabId]));
    setTabState(tabId, 'unlocked');
    tab.onUnlock?.();
  }, [tabs, unlockedTabs, setTabState]);

  // Context value
  const contextValue: TabContextValue = {
    tabs,
    activeTab,
    progress,
    setTabState,
    checkUnlockConditions,
    unlockTab
  };

  // Calculate overall progress
  const overallProgress = tabs.length > 0 
    ? tabs.reduce((acc, tab) => acc + (progress[tab.id]?.completionPercentage || 0), 0) / tabs.length
    : 0;

  // Get layout classes
  const layoutClasses = {
    horizontal: 'flex flex-col',
    vertical: 'flex flex-row'
  };

  const tabListClasses = {
    horizontal: {
      default: 'flex border-b border-gray-700 overflow-x-auto',
      compact: 'flex space-x-1 p-1 bg-gray-800 rounded-lg',
      cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'
    },
    vertical: {
      default: 'flex flex-col space-y-1 w-64 border-r border-gray-700 pr-4',
      compact: 'flex flex-col space-y-1 w-48',
      cards: 'flex flex-col space-y-4 w-80'
    }
  };

  return (
    <TabContext.Provider value={contextValue}>
      <div className={`${layoutClasses[orientation]} ${className}`}>
        {/* Overall Progress Bar */}
        {showProgressBar && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Overall Progress</span>
              <span className="text-sm text-blue-400">{Math.round(overallProgress)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Tab List */}
        <div className={tabListClasses[orientation][variant]}>
          {tabs.map((tab, index) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              canAccess={unlockedTabs.has(tab.id) || tab.state !== 'locked'}
              progress={progress[tab.id]}
              variant={variant}
              orientation={orientation}
              showUnlockAnimation={showUnlockAnimation}
              onClick={() => {
                if (unlockedTabs.has(tab.id) || tab.state !== 'locked') {
                  onTabChange(tab.id);
                }
              }}
            />
          ))}
        </div>

        {/* Tab Content */}
        <div className={`flex-1 ${orientation === 'horizontal' ? 'mt-6' : 'ml-6'}`}>
          <AnimatePresence mode="wait">
            {tabs.map(tab => 
              tab.id === activeTab && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab.content}
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </TabContext.Provider>
  );
};

// Tab Button Component
interface TabButtonProps {
  tab: TabDefinition;
  isActive: boolean;
  canAccess: boolean;
  progress?: TabProgress;
  variant: 'default' | 'compact' | 'cards';
  orientation: 'horizontal' | 'vertical';
  showUnlockAnimation: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  tab,
  isActive,
  canAccess,
  progress,
  variant,
  orientation,
  showUnlockAnimation,
  onClick
}) => {
  const { checkUnlockConditions, unlockTab } = useTabContext();
  
  // Check if tab should be unlocked
  React.useEffect(() => {
    if (!canAccess && checkUnlockConditions(tab.id)) {
      unlockTab(tab.id);
    }
  }, [canAccess, checkUnlockConditions, tab.id, unlockTab]);

  const getStateIcon = () => {
    switch (tab.state) {
      case 'locked':
        return <Lock className="w-4 h-4 text-gray-500" />;
      case 'completed':
        return <Check className="w-4 h-4 text-green-400" />;
      case 'mastered':
        return <Star className="w-4 h-4 text-yellow-400" />;
      case 'premium':
        return <Award className="w-4 h-4 text-purple-400" />;
      default:
        return tab.icon;
    }
  };

  const getStateColor = () => {
    if (!canAccess) return 'text-gray-500 border-gray-700';
    if (isActive) return 'text-white border-blue-500 bg-blue-500/10';
    
    switch (tab.state) {
      case 'completed':
        return 'text-green-400 border-green-500/30 hover:border-green-500';
      case 'mastered':
        return 'text-yellow-400 border-yellow-500/30 hover:border-yellow-500';
      case 'premium':
        return 'text-purple-400 border-purple-500/30 hover:border-purple-500';
      default:
        return 'text-gray-300 border-gray-700 hover:border-gray-600 hover:text-white';
    }
  };

  if (variant === 'cards') {
    return (
      <motion.div
        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
          canAccess ? 'hover:shadow-lg' : 'cursor-not-allowed opacity-50'
        } ${getStateColor()}`}
        onClick={canAccess ? onClick : undefined}
        whileHover={canAccess ? { scale: 1.02 } : {}}
        whileTap={canAccess ? { scale: 0.98 } : {}}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getStateIcon()}
            <span className="font-medium">{tab.label}</span>
          </div>
          
          {tab.badge && (
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
              {tab.badge}
            </span>
          )}
        </div>

        {tab.description && (
          <p className="text-sm text-gray-400 mb-3">{tab.description}</p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          {tab.estimatedTime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{tab.estimatedTime}min</span>
            </div>
          )}
          
          {tab.value && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>{tab.value}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {progress && (
          <div className="mt-3 w-full bg-gray-800 rounded-full h-1">
            <div
              className="bg-blue-500 h-1 rounded-full transition-all"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>
        )}

        {/* Unlock Conditions */}
        {!canAccess && tab.unlockConditions && (
          <div className="mt-3 text-xs">
            <div className="flex items-center space-x-1 text-gray-500 mb-1">
              <Lock className="w-3 h-3" />
              <span>Unlock requirements:</span>
            </div>
            {tab.unlockConditions.slice(0, 2).map((condition, index) => (
              <div key={index} className="text-gray-600">
                • {condition.description}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  // Default and compact variants
  return (
    <motion.button
      className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-all ${
        variant === 'compact' ? 'rounded-lg px-3 py-2' : ''
      } ${getStateColor()} ${!canAccess ? 'cursor-not-allowed' : ''}`}
      onClick={canAccess ? onClick : undefined}
      disabled={!canAccess}
      whileHover={canAccess ? { scale: 1.02 } : {}}
      whileTap={canAccess ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center space-x-2">
        {getStateIcon()}
        <span>{tab.label}</span>
      </div>

      {/* Progress Indicator */}
      {progress && progress.completionPercentage > 0 && (
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span className="text-xs">{Math.round(progress.completionPercentage)}%</span>
        </div>
      )}

      {/* Value Badge */}
      {tab.value && canAccess && (
        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
          {tab.value}
        </span>
      )}

      {/* Lock Indicator */}
      {!canAccess && (
        <Lock className="w-3 h-3 text-gray-500 ml-auto" />
      )}
    </motion.button>
  );
};

// Hook for managing tab progress
export const useTabProgress = (initialProgress: Record<string, TabProgress> = {}) => {
  const [progress, setProgress] = useState(initialProgress);

  const updateProgress = useCallback((tabId: string, updates: Partial<TabProgress>) => {
    setProgress(prev => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        ...updates,
        tabId
      }
    }));
  }, []);

  const markComplete = useCallback((tabId: string) => {
    updateProgress(tabId, { 
      completionPercentage: 100,
      lastAccessed: new Date()
    });
  }, [updateProgress]);

  const addAction = useCallback((tabId: string, action: string) => {
    setProgress(prev => {
      const currentProgress = prev[tabId] || { 
        tabId, 
        completionPercentage: 0, 
        timeSpent: 0, 
        lastAccessed: new Date(),
        actionHistory: []
      };
      
      return {
        ...prev,
        [tabId]: {
          ...currentProgress,
          actionHistory: [
            ...currentProgress.actionHistory,
            { action, timestamp: new Date() }
          ],
          lastAccessed: new Date()
        }
      };
    });
  }, []);

  return {
    progress,
    setProgress,
    updateProgress,
    markComplete,
    addAction
  };
};

// Default tab definitions for common tools
export const createDefaultTabs = (userLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): TabDefinition[] => [
  {
    id: 'icp-analysis',
    label: 'ICP Analysis',
    icon: <Target className="w-4 h-4" />,
    description: 'Define your ideal customer profile',
    state: 'unlocked',
    estimatedTime: 15,
    difficulty: 'beginner',
    value: '$50K+ impact',
    badge: 'Foundation'
  },
  {
    id: 'cost-calculator',
    label: 'Cost Calculator',
    icon: <DollarSign className="w-4 h-4" />,
    description: 'Calculate the cost of inaction',
    state: 'locked',
    unlockConditions: [
      {
        type: 'completion',
        value: 'icp-analysis',
        description: 'Complete ICP Analysis first'
      }
    ],
    estimatedTime: 10,
    difficulty: 'beginner',
    value: '$100K+ savings'
  },
  {
    id: 'business-case',
    label: 'Business Case',
    icon: <TrendingUp className="w-4 h-4" />,
    description: 'Build compelling business cases',
    state: 'locked',
    unlockConditions: [
      {
        type: 'completion',
        value: 'cost-calculator',
        description: 'Complete Cost Calculator first'
      }
    ],
    estimatedTime: 20,
    difficulty: 'intermediate',
    value: '$250K+ impact'
  },
  {
    id: 'advanced-analytics',
    label: 'Advanced Analytics',
    icon: <Zap className="w-4 h-4" />,
    description: 'Deep dive into performance metrics',
    state: 'premium',
    premium: true,
    unlockConditions: [
      {
        type: 'payment',
        value: true,
        description: 'Upgrade to Premium'
      }
    ],
    estimatedTime: 30,
    difficulty: 'advanced',
    value: '$500K+ optimization'
  }
];

export default EnhancedTabNavigation;