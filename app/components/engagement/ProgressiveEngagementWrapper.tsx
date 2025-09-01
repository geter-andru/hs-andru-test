'use client';

import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lock, CheckCircle, Sparkles, TrendingUp, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * ProgressiveEngagementWrapper - Main orchestration component for user journey
 * 
 * Features:
 * - Stage-based progression system
 * - Automatic progress tracking
 * - Contextual content unlocking
 * - Smooth stage transitions
 * - Analytics integration ready
 * - Mobile-optimized experience
 */

export interface EngagementStage {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  requiredActions: string[];
  completedActions: string[];
  unlocked: boolean;
  completed: boolean;
  order: number;
}

export interface ProgressiveEngagementProps {
  children: ReactNode;
  userId?: string;
  initialStage?: string;
  onStageChange?: (stage: EngagementStage) => void;
  onProgressUpdate?: (progress: number) => void;
  className?: string;
}

// Default engagement stages for H&S Platform
const defaultStages: EngagementStage[] = [
  {
    id: 'discovery',
    name: 'Discovery',
    description: 'Explore platform capabilities',
    icon: <Sparkles className="w-5 h-5" />,
    requiredActions: ['view_dashboard', 'explore_tools'],
    completedActions: [],
    unlocked: true,
    completed: false,
    order: 1
  },
  {
    id: 'activation',
    name: 'Activation',
    description: 'Complete your first analysis',
    icon: <Target className="w-5 h-5" />,
    requiredActions: ['complete_icp', 'run_cost_calculator'],
    completedActions: [],
    unlocked: false,
    completed: false,
    order: 2
  },
  {
    id: 'value_realization',
    name: 'Value Realization',
    description: 'Generate business insights',
    icon: <TrendingUp className="w-5 h-5" />,
    requiredActions: ['create_business_case', 'export_resources', 'share_results'],
    completedActions: [],
    unlocked: false,
    completed: false,
    order: 3
  },
  {
    id: 'mastery',
    name: 'Mastery',
    description: 'Advanced platform utilization',
    icon: <CheckCircle className="w-5 h-5" />,
    requiredActions: ['complete_10_analyses', 'integrate_crm', 'automate_workflow'],
    completedActions: [],
    unlocked: false,
    completed: false,
    order: 4
  }
];

const ProgressiveEngagementWrapper: React.FC<ProgressiveEngagementProps> = ({
  children,
  userId,
  initialStage = 'discovery',
  onStageChange,
  onProgressUpdate,
  className = ''
}) => {
  const [stages, setStages] = useState<EngagementStage[]>(defaultStages);
  const [currentStage, setCurrentStage] = useState<string>(initialStage);
  const [overallProgress, setOverallProgress] = useState(0);
  const [showProgressHint, setShowProgressHint] = useState(false);
  const router = useRouter();

  // Calculate overall progress
  const calculateProgress = useCallback(() => {
    const totalActions = stages.reduce((acc, stage) => acc + stage.requiredActions.length, 0);
    const completedActions = stages.reduce((acc, stage) => acc + stage.completedActions.length, 0);
    return totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
  }, [stages]);

  // Update stage progress
  const updateStageProgress = useCallback((stageId: string, action: string) => {
    setStages(prevStages => {
      const updatedStages = prevStages.map(stage => {
        if (stage.id === stageId) {
          const completedActions = [...new Set([...stage.completedActions, action])];
          const completed = completedActions.length === stage.requiredActions.length;
          
          return {
            ...stage,
            completedActions,
            completed
          };
        }
        return stage;
      });

      // Unlock next stage if current is completed
      const currentStageIndex = updatedStages.findIndex(s => s.id === stageId);
      if (currentStageIndex !== -1 && updatedStages[currentStageIndex].completed) {
        if (currentStageIndex + 1 < updatedStages.length) {
          updatedStages[currentStageIndex + 1].unlocked = true;
        }
      }

      return updatedStages;
    });
  }, []);

  // Track user actions
  const trackAction = useCallback((action: string) => {
    const stage = stages.find(s => s.id === currentStage);
    if (stage && stage.requiredActions.includes(action)) {
      updateStageProgress(currentStage, action);
    }
  }, [currentStage, stages, updateStageProgress]);

  // Handle stage navigation
  const navigateToStage = useCallback((stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (stage && stage.unlocked) {
      setCurrentStage(stageId);
      if (onStageChange) {
        onStageChange(stage);
      }
    }
  }, [stages, onStageChange]);

  // Update overall progress when stages change
  useEffect(() => {
    const progress = calculateProgress();
    setOverallProgress(progress);
    if (onProgressUpdate) {
      onProgressUpdate(progress);
    }
  }, [stages, calculateProgress, onProgressUpdate]);

  // Auto-advance to next unlocked stage when current is completed
  useEffect(() => {
    const current = stages.find(s => s.id === currentStage);
    if (current && current.completed) {
      const nextStage = stages.find(s => s.order === current.order + 1 && s.unlocked);
      if (nextStage) {
        setTimeout(() => {
          navigateToStage(nextStage.id);
          setShowProgressHint(true);
          setTimeout(() => setShowProgressHint(false), 3000);
        }, 1000);
      }
    }
  }, [stages, currentStage, navigateToStage]);

  // Expose tracking function to children
  const contextValue = {
    trackAction,
    currentStage,
    stages,
    overallProgress
  };

  return (
    <div className={`relative ${className}`}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Stage Navigator */}
      <div className="sticky top-4 z-40 mb-6">
        <motion.div
          className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Your Journey</h3>
            <span className="text-xs text-gray-400">{overallProgress}% Complete</span>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <button
                  onClick={() => navigateToStage(stage.id)}
                  disabled={!stage.unlocked}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap
                    transition-all duration-200
                    ${currentStage === stage.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : stage.completed
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : stage.unlocked
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      : 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-800'
                    }
                  `}
                >
                  <div className="flex items-center">
                    {stage.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : stage.unlocked ? (
                      stage.icon
                    ) : (
                      <Lock className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  <span className="font-medium">{stage.name}</span>
                  {stage.completed && (
                    <span className="text-xs text-green-400">✓</span>
                  )}
                </button>

                {index < stages.length - 1 && (
                  <ChevronRight className={`
                    w-4 h-4 flex-shrink-0
                    ${stages[index + 1].unlocked ? 'text-gray-400' : 'text-gray-600'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Current Stage Details */}
          <AnimatePresence mode="wait">
            {stages.find(s => s.id === currentStage) && (
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 pt-3 border-t border-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-400">
                      {stages.find(s => s.id === currentStage)?.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {stages.find(s => s.id === currentStage)?.requiredActions.map(action => (
                        <span
                          key={action}
                          className={`
                            text-xs px-2 py-1 rounded-full
                            ${stages.find(s => s.id === currentStage)?.completedActions.includes(action)
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-800 text-gray-400'
                            }
                          `}
                        >
                          {action.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">Stage Progress</span>
                    <div className="text-lg font-semibold text-white">
                      {stages.find(s => s.id === currentStage)?.completedActions.length || 0}/
                      {stages.find(s => s.id === currentStage)?.requiredActions.length || 0}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Hint */}
        <AnimatePresence>
          {showProgressHint && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
            >
              <div className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>New stage unlocked!</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content with Context Provider */}
      <EngagementContext.Provider value={contextValue}>
        <div className="relative">
          {children}
        </div>
      </EngagementContext.Provider>
    </div>
  );
};

// Context for child components to access engagement tracking
export const EngagementContext = React.createContext<{
  trackAction: (action: string) => void;
  currentStage: string;
  stages: EngagementStage[];
  overallProgress: number;
}>({
  trackAction: () => {},
  currentStage: 'discovery',
  stages: defaultStages,
  overallProgress: 0
});

// Hook for child components to use engagement tracking
export const useEngagement = () => {
  const context = React.useContext(EngagementContext);
  if (!context) {
    throw new Error('useEngagement must be used within ProgressiveEngagementWrapper');
  }
  return context;
};

export default ProgressiveEngagementWrapper;