'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * OnboardingFlow - User onboarding sequence system
 * 
 * Features:
 * - Multi-step onboarding sequences
 * - Progress tracking and persistence
 * - Conditional step logic
 * - Interactive tutorials
 * - Personalized paths
 * - Skip and return functionality
 * - Analytics and completion tracking
 * - Mobile-responsive design
 */

export type StepType = 'welcome' | 'setup' | 'tutorial' | 'verification' | 'completion' | 'custom';
export type StepStatus = 'pending' | 'current' | 'completed' | 'skipped';
export type ValidationResult = { valid: boolean; message?: string };

export interface StepAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'skip' | 'back';
  action: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}

export interface OnboardingStep {
  id: string;
  type: StepType;
  title: string;
  description: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  actions: StepAction[];
  skipAllowed?: boolean;
  required?: boolean;
  estimatedTime?: number;
  validation?: () => ValidationResult | Promise<ValidationResult>;
  onEnter?: () => void | Promise<void>;
  onExit?: () => void | Promise<void>;
  conditions?: {
    show: () => boolean;
    skip: () => boolean;
  };
  metadata?: Record<string, any>;
}

export interface OnboardingProgress {
  userId: string;
  currentStep: number;
  completedSteps: string[];
  skippedSteps: string[];
  startedAt: Date;
  lastActiveAt: Date;
  completedAt?: Date;
  totalTimeSpent: number;
  stepTimeSpent: Record<string, number>;
  interactions: Record<string, number>;
  errors: string[];
}

export interface OnboardingFlowProps {
  steps: OnboardingStep[];
  progress?: OnboardingProgress;
  onStepChange?: (step: OnboardingStep, index: number) => void;
  onComplete?: (progress: OnboardingProgress) => void;
  onSkip?: (step: OnboardingStep, index: number) => void;
  onError?: (error: string, step: OnboardingStep) => void;
  autoSave?: boolean;
  allowBackNavigation?: boolean;
  showProgress?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  steps,
  progress,
  onStepChange,
  onComplete,
  onSkip,
  onError,
  autoSave = true,
  allowBackNavigation = true,
  showProgress = true,
  theme = 'dark',
  className = '',
  'data-testid': testId
}) => {
  // State management
  const [currentStepIndex, setCurrentStepIndex] = React.useState(progress?.currentStep || 0);
  const [localProgress, setLocalProgress] = React.useState<OnboardingProgress>(
    progress || {
      userId: 'anonymous',
      currentStep: 0,
      completedSteps: [],
      skippedSteps: [],
      startedAt: new Date(),
      lastActiveAt: new Date(),
      totalTimeSpent: 0,
      stepTimeSpent: {},
      interactions: {},
      errors: []
    }
  );
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [stepStartTime, setStepStartTime] = React.useState(Date.now());
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);

  // Current step
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Filter steps based on conditions
  const visibleSteps = React.useMemo(() => {
    return steps.filter(step => !step.conditions?.show || step.conditions.show());
  }, [steps]);

  // Update progress
  const updateProgress = React.useCallback((updates: Partial<OnboardingProgress>) => {
    setLocalProgress(prev => {
      const updated = { ...prev, ...updates, lastActiveAt: new Date() };
      if (autoSave) {
        localStorage.setItem('onboarding-progress', JSON.stringify(updated));
      }
      return updated;
    });
  }, [autoSave]);

  // Track time spent on current step
  React.useEffect(() => {
    const interval = setInterval(() => {
      const timeSpent = Date.now() - stepStartTime;
      updateProgress({
        totalTimeSpent: localProgress.totalTimeSpent + 1000,
        stepTimeSpent: {
          ...localProgress.stepTimeSpent,
          [currentStep?.id || '']: (localProgress.stepTimeSpent[currentStep?.id || ''] || 0) + 1000
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStep, stepStartTime, localProgress, updateProgress]);

  // Handle step validation
  const validateCurrentStep = React.useCallback(async (): Promise<boolean> => {
    if (!currentStep?.validation) return true;

    try {
      const result = await currentStep.validation();
      if (!result.valid) {
        setValidationErrors([result.message || 'Validation failed']);
        return false;
      }
      setValidationErrors([]);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Validation error';
      setValidationErrors([errorMessage]);
      onError?.(errorMessage, currentStep);
      return false;
    }
  }, [currentStep, onError]);

  // Navigate to next step
  const goToNextStep = React.useCallback(async () => {
    if (!currentStep) return;

    // Validate current step
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    setIsTransitioning(true);

    try {
      // Call step exit handler
      await currentStep.onExit?.();

      // Mark step as completed
      const updatedProgress = {
        ...localProgress,
        currentStep: Math.min(currentStepIndex + 1, steps.length - 1),
        completedSteps: [...localProgress.completedSteps, currentStep.id]
      };

      updateProgress(updatedProgress);
      
      // Check if onboarding is complete
      if (currentStepIndex === steps.length - 1) {
        const completedProgress = {
          ...updatedProgress,
          completedAt: new Date()
        };
        updateProgress(completedProgress);
        onComplete?.(completedProgress);
        return;
      }

      // Move to next step
      const nextIndex = currentStepIndex + 1;
      const nextStep = steps[nextIndex];
      
      setCurrentStepIndex(nextIndex);
      setStepStartTime(Date.now());
      
      // Call next step enter handler
      await nextStep?.onEnter?.();
      
      onStepChange?.(nextStep, nextIndex);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Navigation error';
      onError?.(errorMessage, currentStep);
      updateProgress({
        errors: [...localProgress.errors, errorMessage]
      });
    } finally {
      setIsTransitioning(false);
    }
  }, [currentStep, currentStepIndex, steps, localProgress, validateCurrentStep, updateProgress, onComplete, onStepChange, onError]);

  // Navigate to previous step
  const goToPreviousStep = React.useCallback(async () => {
    if (!allowBackNavigation || isFirstStep) return;

    setIsTransitioning(true);

    try {
      await currentStep?.onExit?.();
      
      const prevIndex = currentStepIndex - 1;
      const prevStep = steps[prevIndex];
      
      setCurrentStepIndex(prevIndex);
      setStepStartTime(Date.now());
      
      updateProgress({
        currentStep: prevIndex,
        completedSteps: localProgress.completedSteps.filter(id => id !== prevStep.id)
      });
      
      await prevStep?.onEnter?.();
      onStepChange?.(prevStep, prevIndex);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Navigation error';
      onError?.(errorMessage, currentStep);
    } finally {
      setIsTransitioning(false);
    }
  }, [currentStep, currentStepIndex, steps, localProgress, allowBackNavigation, isFirstStep, updateProgress, onStepChange, onError]);

  // Skip current step
  const skipCurrentStep = React.useCallback(async () => {
    if (!currentStep?.skipAllowed) return;

    setIsTransitioning(true);

    try {
      await currentStep.onExit?.();
      
      const updatedProgress = {
        ...localProgress,
        currentStep: Math.min(currentStepIndex + 1, steps.length - 1),
        skippedSteps: [...localProgress.skippedSteps, currentStep.id]
      };
      
      updateProgress(updatedProgress);
      onSkip?.(currentStep, currentStepIndex);
      
      if (currentStepIndex === steps.length - 1) {
        onComplete?.(updatedProgress);
        return;
      }
      
      const nextIndex = currentStepIndex + 1;
      const nextStep = steps[nextIndex];
      
      setCurrentStepIndex(nextIndex);
      setStepStartTime(Date.now());
      
      await nextStep?.onEnter?.();
      onStepChange?.(nextStep, nextIndex);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Skip error';
      onError?.(errorMessage, currentStep);
    } finally {
      setIsTransitioning(false);
    }
  }, [currentStep, currentStepIndex, steps, localProgress, updateProgress, onSkip, onComplete, onStepChange, onError]);

  // Handle action clicks
  const handleActionClick = React.useCallback(async (action: StepAction) => {
    if (action.disabled || action.loading) return;

    updateProgress({
      interactions: {
        ...localProgress.interactions,
        [action.id]: (localProgress.interactions[action.id] || 0) + 1
      }
    });

    try {
      await action.action();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Action error';
      onError?.(errorMessage, currentStep);
    }
  }, [localProgress, updateProgress, onError, currentStep]);

  // Theme classes
  const themeClasses = {
    light: {
      container: 'bg-white text-gray-900',
      card: 'bg-gray-50 border-gray-200',
      text: 'text-gray-600',
      accent: 'text-blue-600'
    },
    dark: {
      container: 'bg-gray-900 text-white',
      card: 'bg-gray-800 border-gray-700',
      text: 'text-gray-300',
      accent: 'text-purple-400'
    }
  };

  const currentTheme = themeClasses[theme];

  // Progress calculation
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: progressPercentage / 100,
      transition: {
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  };

  // Initialize step on mount
  React.useEffect(() => {
    if (currentStep) {
      currentStep.onEnter?.();
      setStepStartTime(Date.now());
    }
  }, []);

  if (!currentStep) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${currentTheme.container}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Onboarding Complete!</h2>
          <p className={currentTheme.text}>Thank you for completing the onboarding process.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`min-h-screen ${currentTheme.container} ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      data-testid={testId}
    >
      {/* Progress bar */}
      {showProgress && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              variants={progressVariants}
              initial="initial"
              animate="animate"
              style={{ transformOrigin: 'left' }}
            />
          </div>
          
          {/* Step indicator */}
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur px-4 py-2 text-center border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium">
              Step {currentStepIndex + 1} of {steps.length}
              {currentStep.estimatedTime && (
                <span className={`ml-2 ${currentTheme.text}`}>
                  • ~{currentStep.estimatedTime}min
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 pt-20 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            {/* Step header */}
            <div className="text-center space-y-4">
              {currentStep.icon && (
                <div className="flex justify-center text-4xl mb-4">
                  {currentStep.icon}
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold">
                {currentStep.title}
              </h1>
              
              <p className={`text-lg ${currentTheme.text} max-w-2xl mx-auto`}>
                {currentStep.description}
              </p>
              
              {currentStep.type && (
                <div className="flex justify-center">
                  <span className={`
                    inline-block px-3 py-1 text-sm font-medium rounded-full
                    ${currentStep.type === 'welcome' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : ''}
                    ${currentStep.type === 'setup' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' : ''}
                    ${currentStep.type === 'tutorial' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' : ''}
                    ${currentStep.type === 'verification' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' : ''}
                    ${currentStep.type === 'completion' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' : ''}
                  `}>
                    {currentStep.type.charAt(0).toUpperCase() + currentStep.type.slice(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Step image */}
            {currentStep.image && (
              <div className="flex justify-center">
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="max-w-md w-full rounded-xl shadow-lg"
                />
              </div>
            )}

            {/* Step content */}
            <div className={`p-6 rounded-xl border ${currentTheme.card} shadow-lg`}>
              {currentStep.content}
            </div>

            {/* Validation errors */}
            {validationErrors.length > 0 && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-semibold text-red-400">Please fix the following:</h4>
                </div>
                <ul className="text-red-300 text-sm space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex gap-3">
                {allowBackNavigation && !isFirstStep && (
                  <button
                    onClick={goToPreviousStep}
                    disabled={isTransitioning}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    Back
                  </button>
                )}
                
                {currentStep.skipAllowed && (
                  <button
                    onClick={skipCurrentStep}
                    disabled={isTransitioning}
                    className="px-6 py-3 text-gray-500 dark:text-gray-400 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    Skip
                  </button>
                )}
              </div>
              
              <div className="flex gap-3">
                {currentStep.actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action)}
                    disabled={action.disabled || action.loading || isTransitioning}
                    className={`
                      px-6 py-3 font-semibold rounded-lg transition-all duration-200 
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${action.type === 'primary' 
                        ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                        : action.type === 'secondary'
                        ? 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                        : action.type === 'skip'
                        ? 'text-gray-500 hover:text-gray-400'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    {action.loading && (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                      </svg>
                    )}
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Hook for onboarding management
export const useOnboarding = () => {
  const [isActive, setIsActive] = React.useState(false);
  const [progress, setProgress] = React.useState<OnboardingProgress | null>(null);

  const startOnboarding = React.useCallback((userId: string) => {
    const newProgress: OnboardingProgress = {
      userId,
      currentStep: 0,
      completedSteps: [],
      skippedSteps: [],
      startedAt: new Date(),
      lastActiveAt: new Date(),
      totalTimeSpent: 0,
      stepTimeSpent: {},
      interactions: {},
      errors: []
    };
    
    setProgress(newProgress);
    setIsActive(true);
    localStorage.setItem('onboarding-progress', JSON.stringify(newProgress));
  }, []);

  const resumeOnboarding = React.useCallback(() => {
    const saved = localStorage.getItem('onboarding-progress');
    if (saved) {
      const savedProgress = JSON.parse(saved);
      setProgress(savedProgress);
      setIsActive(!savedProgress.completedAt);
    }
  }, []);

  const completeOnboarding = React.useCallback(() => {
    setIsActive(false);
    if (progress) {
      const completed = { ...progress, completedAt: new Date() };
      setProgress(completed);
      localStorage.setItem('onboarding-progress', JSON.stringify(completed));
    }
  }, [progress]);

  const resetOnboarding = React.useCallback(() => {
    setProgress(null);
    setIsActive(false);
    localStorage.removeItem('onboarding-progress');
  }, []);

  // Load saved progress on mount
  React.useEffect(() => {
    resumeOnboarding();
  }, [resumeOnboarding]);

  return {
    isActive,
    progress,
    startOnboarding,
    resumeOnboarding,
    completeOnboarding,
    resetOnboarding
  };
};

export default OnboardingFlow;