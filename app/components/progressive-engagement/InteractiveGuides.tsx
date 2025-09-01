'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * InteractiveGuides - Step-by-step guidance system
 * 
 * Features:
 * - Interactive step-by-step tutorials
 * - Contextual help and tooltips
 * - Smart element highlighting
 * - Progress tracking and branching
 * - Voice and video guide integration
 * - Adaptive guidance based on user skill
 * - Multi-modal interaction support
 * - Accessibility and keyboard navigation
 */

export type GuideType = 
  | 'tutorial' 
  | 'walkthrough' 
  | 'tooltip' 
  | 'spotlight' 
  | 'checklist' 
  | 'wizard' 
  | 'contextual' 
  | 'progressive';

export type GuidePosition = 
  | 'top' 
  | 'bottom' 
  | 'left' 
  | 'right' 
  | 'center' 
  | 'auto' 
  | 'floating';

export type InteractionType = 
  | 'click' 
  | 'hover' 
  | 'focus' 
  | 'scroll' 
  | 'type' 
  | 'drag' 
  | 'wait' 
  | 'custom';

export type GuideStatus = 'not_started' | 'in_progress' | 'completed' | 'skipped' | 'failed';

export interface GuideAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'skip' | 'back' | 'next' | 'finish';
  action: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  shortcut?: string;
}

export interface GuideStep {
  id: string;
  title: string;
  content: React.ReactNode;
  target?: string; // CSS selector for element to highlight
  position?: GuidePosition;
  type: GuideType;
  actions: GuideAction[];
  validation?: {
    required: boolean;
    validator: () => boolean | Promise<boolean>;
    errorMessage?: string;
    successMessage?: string;
  };
  interaction?: {
    type: InteractionType;
    element?: string;
    value?: any;
    timeout?: number;
  };
  multimedia?: {
    image?: string;
    video?: string;
    audio?: string;
    animation?: React.ReactNode;
  };
  branches?: Array<{
    condition: () => boolean;
    nextStepId: string;
    label?: string;
  }>;
  hints?: Array<{
    trigger: 'time' | 'attempts' | 'hover' | 'manual';
    delay?: number;
    content: string;
  }>;
  metadata?: {
    estimatedTime?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    importance?: 'low' | 'medium' | 'high' | 'critical';
    tags?: string[];
    prerequisites?: string[];
  };
}

export interface GuideFlow {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  category: string;
  steps: GuideStep[];
  settings: {
    allowSkipping: boolean;
    allowBackNavigation: boolean;
    autoProgress: boolean;
    persistProgress: boolean;
    showProgress: boolean;
    adaptToSkill: boolean;
    voiceEnabled: boolean;
  };
  targeting: {
    userSegments?: string[];
    skillLevels?: string[];
    conditions?: Array<() => boolean>;
    triggers?: Array<{
      event: string;
      condition?: () => boolean;
      delay?: number;
    }>;
  };
  analytics: {
    trackSteps: boolean;
    trackTime: boolean;
    trackInteractions: boolean;
    trackDropoff: boolean;
  };
}

export interface GuideProgress {
  guideId: string;
  currentStepId: string;
  completedSteps: string[];
  startedAt: Date;
  lastActiveAt: Date;
  completedAt?: Date;
  timeSpent: number;
  stepTimeSpent: Record<string, number>;
  attempts: Record<string, number>;
  hintsUsed: Record<string, number>;
  interactions: Array<{
    stepId: string;
    action: string;
    timestamp: Date;
    success: boolean;
  }>;
  userData?: Record<string, any>;
}

export interface InteractiveGuidesProps {
  guides: GuideFlow[];
  activeGuideId?: string;
  progress?: Record<string, GuideProgress>;
  onGuideStart?: (guide: GuideFlow) => void;
  onGuideComplete?: (guide: GuideFlow, progress: GuideProgress) => void;
  onGuideSkip?: (guide: GuideFlow, step: GuideStep) => void;
  onStepComplete?: (guide: GuideFlow, step: GuideStep, progress: GuideProgress) => void;
  onProgressUpdate?: (progress: Record<string, GuideProgress>) => void;
  enableVoice?: boolean;
  enableKeyboard?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

const InteractiveGuides: React.FC<InteractiveGuidesProps> = ({
  guides,
  activeGuideId,
  progress = {},
  onGuideStart,
  onGuideComplete,
  onGuideSkip,
  onStepComplete,
  onProgressUpdate,
  enableVoice = false,
  enableKeyboard = true,
  theme = 'dark',
  className = '',
  'data-testid': testId
}) => {
  // State management
  const [activeGuide, setActiveGuide] = React.useState<GuideFlow | null>(
    activeGuideId ? guides.find(g => g.id === activeGuideId) || null : null
  );
  const [currentStep, setCurrentStep] = React.useState<GuideStep | null>(null);
  const [localProgress, setLocalProgress] = React.useState<Record<string, GuideProgress>>(progress);
  const [highlightedElement, setHighlightedElement] = React.useState<HTMLElement | null>(null);
  const [showHint, setShowHint] = React.useState<string | null>(null);
  const [isValidating, setIsValidating] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const [speechSynthesis, setSpeechSynthesis] = React.useState<SpeechSynthesis | null>(null);

  // Initialize speech synthesis
  React.useEffect(() => {
    if (enableVoice && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, [enableVoice]);

  // Get current guide progress
  const getCurrentProgress = React.useCallback((guideId: string): GuideProgress => {
    return localProgress[guideId] || {
      guideId,
      currentStepId: '',
      completedSteps: [],
      startedAt: new Date(),
      lastActiveAt: new Date(),
      timeSpent: 0,
      stepTimeSpent: {},
      attempts: {},
      hintsUsed: {},
      interactions: [],
      userData: {}
    };
  }, [localProgress]);

  // Update guide progress
  const updateProgress = React.useCallback((guideId: string, updates: Partial<GuideProgress>) => {
    setLocalProgress(prev => {
      const updated = {
        ...prev,
        [guideId]: {
          ...prev[guideId],
          ...updates,
          lastActiveAt: new Date()
        }
      };
      onProgressUpdate?.(updated);
      return updated;
    });
  }, [onProgressUpdate]);

  // Start guide
  const startGuide = React.useCallback((guide: GuideFlow) => {
    if (!guide.steps.length) return;

    const firstStep = guide.steps[0];
    const progress = getCurrentProgress(guide.id);
    
    setActiveGuide(guide);
    setCurrentStep(firstStep);
    
    updateProgress(guide.id, {
      currentStepId: firstStep.id,
      startedAt: progress.startedAt || new Date()
    });
    
    onGuideStart?.(guide);
    
    // Speak step content if voice enabled
    if (enableVoice && speechSynthesis) {
      speakText(firstStep.title);
    }
  }, [getCurrentProgress, updateProgress, onGuideStart, enableVoice, speechSynthesis]);

  // Navigate to step
  const navigateToStep = React.useCallback((stepId: string) => {
    if (!activeGuide) return;
    
    const step = activeGuide.steps.find(s => s.id === stepId);
    if (!step) return;
    
    setCurrentStep(step);
    updateProgress(activeGuide.id, { currentStepId: stepId });
    
    // Highlight target element
    if (step.target) {
      const element = document.querySelector(step.target) as HTMLElement;
      if (element) {
        setHighlightedElement(element);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setHighlightedElement(null);
    }
    
    // Reset validation state
    setValidationError(null);
    setShowHint(null);
    
    // Speak step content
    if (enableVoice && speechSynthesis) {
      speakText(step.title);
    }
  }, [activeGuide, updateProgress, enableVoice, speechSynthesis]);

  // Complete step
  const completeStep = React.useCallback(async () => {
    if (!activeGuide || !currentStep) return;
    
    const progress = getCurrentProgress(activeGuide.id);
    
    // Validate step if required
    if (currentStep.validation?.required) {
      setIsValidating(true);
      try {
        const isValid = await currentStep.validation.validator();
        if (!isValid) {
          setValidationError(currentStep.validation.errorMessage || 'Validation failed');
          setIsValidating(false);
          return;
        }
      } catch (error) {
        setValidationError('Validation error occurred');
        setIsValidating(false);
        return;
      }
      setIsValidating(false);
    }
    
    // Mark step as completed
    const updatedProgress = {
      ...progress,
      completedSteps: [...progress.completedSteps, currentStep.id],
      timeSpent: progress.timeSpent + (Date.now() - progress.lastActiveAt.getTime())
    };
    
    updateProgress(activeGuide.id, updatedProgress);
    onStepComplete?.(activeGuide, currentStep, updatedProgress);
    
    // Check for branches
    if (currentStep.branches?.length) {
      const branch = currentStep.branches.find(b => b.condition());
      if (branch) {
        navigateToStep(branch.nextStepId);
        return;
      }
    }
    
    // Navigate to next step or complete guide
    const currentIndex = activeGuide.steps.findIndex(s => s.id === currentStep.id);
    const nextStep = activeGuide.steps[currentIndex + 1];
    
    if (nextStep) {
      navigateToStep(nextStep.id);
    } else {
      // Guide completed
      const finalProgress = {
        ...updatedProgress,
        completedAt: new Date()
      };
      
      updateProgress(activeGuide.id, finalProgress);
      onGuideComplete?.(activeGuide, finalProgress);
      
      setActiveGuide(null);
      setCurrentStep(null);
      setHighlightedElement(null);
    }
  }, [activeGuide, currentStep, getCurrentProgress, updateProgress, onStepComplete, onGuideComplete, navigateToStep]);

  // Skip step
  const skipStep = React.useCallback(() => {
    if (!activeGuide || !currentStep) return;
    
    onGuideSkip?.(activeGuide, currentStep);
    completeStep();
  }, [activeGuide, currentStep, onGuideSkip, completeStep]);

  // Go to previous step
  const goToPreviousStep = React.useCallback(() => {
    if (!activeGuide || !currentStep) return;
    
    const currentIndex = activeGuide.steps.findIndex(s => s.id === currentStep.id);
    const previousStep = activeGuide.steps[currentIndex - 1];
    
    if (previousStep) {
      navigateToStep(previousStep.id);
    }
  }, [activeGuide, currentStep, navigateToStep]);

  // Show hint
  const showStepHint = React.useCallback((hint: string) => {
    if (!activeGuide || !currentStep) return;
    
    setShowHint(hint);
    
    const progress = getCurrentProgress(activeGuide.id);
    updateProgress(activeGuide.id, {
      hintsUsed: {
        ...progress.hintsUsed,
        [currentStep.id]: (progress.hintsUsed[currentStep.id] || 0) + 1
      }
    });
    
    if (enableVoice && speechSynthesis) {
      speakText(hint);
    }
  }, [activeGuide, currentStep, getCurrentProgress, updateProgress, enableVoice, speechSynthesis]);

  // Text-to-speech
  const speakText = React.useCallback((text: string) => {
    if (!speechSynthesis) return;
    
    speechSynthesis.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }, [speechSynthesis]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!enableKeyboard || !currentStep) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
          if (e.ctrlKey || e.metaKey) {
            completeStep();
          }
          break;
        case 'Escape':
          if (activeGuide?.settings.allowSkipping) {
            skipStep();
          }
          break;
        case 'ArrowLeft':
          if (activeGuide?.settings.allowBackNavigation) {
            goToPreviousStep();
          }
          break;
        case 'h':
          if (e.ctrlKey && currentStep.hints?.length) {
            showStepHint(currentStep.hints[0].content);
          }
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [enableKeyboard, currentStep, completeStep, skipStep, goToPreviousStep, showStepHint, activeGuide]);

  // Auto-show hints based on triggers
  React.useEffect(() => {
    if (!currentStep?.hints) return;
    
    currentStep.hints.forEach(hint => {
      if (hint.trigger === 'time' && hint.delay) {
        const timer = setTimeout(() => {
          showStepHint(hint.content);
        }, hint.delay);
        
        return () => clearTimeout(timer);
      }
    });
  }, [currentStep, showStepHint]);

  // Highlight overlay
  const HighlightOverlay: React.FC = () => {
    if (!highlightedElement) return null;
    
    const rect = highlightedElement.getBoundingClientRect();
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 pointer-events-none z-40"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Highlighted area */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute border-2 border-blue-500 rounded-lg shadow-lg"
          style={{
            left: rect.left - 8,
            top: rect.top - 8,
            width: rect.width + 16,
            height: rect.height + 16,
            boxShadow: '0 0 0 2px white, 0 0 0 4px rgb(59, 130, 246), 0 0 20px rgba(59, 130, 246, 0.5)'
          }}
        />
      </motion.div>
    );
  };

  // Guide selector
  const GuideSelector: React.FC = () => {
    const availableGuides = guides.filter(guide => {
      if (guide.targeting.userSegments?.length) {
        // Filter by user segments (would need user context)
        return true; // Simplified for demo
      }
      return true;
    });

    return (
      <div className="fixed bottom-4 right-4 z-30">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 max-w-sm">
          <h3 className="font-semibold text-white mb-3">Available Guides</h3>
          <div className="space-y-2">
            {availableGuides.slice(0, 5).map(guide => {
              const progress = getCurrentProgress(guide.id);
              const isCompleted = progress.completedAt !== undefined;
              const isInProgress = progress.completedSteps.length > 0 && !isCompleted;
              
              return (
                <button
                  key={guide.id}
                  onClick={() => startGuide(guide)}
                  className={`
                    w-full text-left p-3 rounded-lg transition-colors
                    ${isCompleted 
                      ? 'bg-green-900/20 border-green-600 text-green-300' 
                      : isInProgress 
                        ? 'bg-blue-900/20 border-blue-600 text-blue-300'
                        : 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    {guide.icon && <div className="text-lg">{guide.icon}</div>}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{guide.title}</div>
                      <div className="text-xs text-gray-400">{guide.category}</div>
                    </div>
                    {isCompleted && (
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {isInProgress && (
                      <div className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                        {Math.round((progress.completedSteps.length / guides.find(g => g.id === guide.id)!.steps.length) * 100)}%
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Step modal/overlay
  const StepModal: React.FC = () => {
    if (!activeGuide || !currentStep) return null;
    
    const progress = getCurrentProgress(activeGuide.id);
    const stepIndex = activeGuide.steps.findIndex(s => s.id === currentStep.id);
    const progressPercentage = ((stepIndex + 1) / activeGuide.steps.length) * 100;
    
    return (
      <>
        <HighlightOverlay />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-lg">{currentStep.title}</h3>
                <p className="text-sm text-gray-400">{activeGuide.title}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">
                  Step {stepIndex + 1} of {activeGuide.steps.length}
                </div>
                {currentStep.metadata?.estimatedTime && (
                  <div className="text-xs text-purple-400">
                    ~{currentStep.metadata.estimatedTime}min
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            {activeGuide.settings.showProgress && (
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="mb-6">
              <div className="text-gray-300 mb-4">
                {currentStep.content}
              </div>

              {/* Multimedia */}
              {currentStep.multimedia?.image && (
                <img 
                  src={currentStep.multimedia.image} 
                  alt={currentStep.title}
                  className="w-full rounded-lg mb-4"
                />
              )}
              
              {currentStep.multimedia?.video && (
                <video 
                  src={currentStep.multimedia.video}
                  controls
                  className="w-full rounded-lg mb-4"
                />
              )}
              
              {currentStep.multimedia?.animation && (
                <div className="mb-4">
                  {currentStep.multimedia.animation}
                </div>
              )}
            </div>

            {/* Validation error */}
            {validationError && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
                <div className="text-red-400 text-sm">{validationError}</div>
              </div>
            )}

            {/* Hint */}
            {showHint && (
              <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500 rounded-lg">
                <div className="text-blue-300 text-sm">💡 {showHint}</div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                {activeGuide.settings.allowBackNavigation && stepIndex > 0 && (
                  <button
                    onClick={goToPreviousStep}
                    className="px-4 py-2 border border-gray-600 text-gray-300 font-medium rounded-lg transition-colors hover:border-gray-500"
                  >
                    Back
                  </button>
                )}
                
                {activeGuide.settings.allowSkipping && (
                  <button
                    onClick={skipStep}
                    className="px-4 py-2 text-gray-400 font-medium rounded-lg transition-colors hover:text-gray-300"
                  >
                    Skip
                  </button>
                )}
                
                {currentStep.hints?.length > 0 && (
                  <button
                    onClick={() => showStepHint(currentStep.hints![0].content)}
                    className="px-4 py-2 border border-yellow-600 text-yellow-400 font-medium rounded-lg transition-colors hover:border-yellow-500"
                  >
                    Hint
                  </button>
                )}
              </div>
              
              <div className="flex gap-2">
                {currentStep.actions.map(action => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    disabled={action.disabled || isValidating}
                    className={`
                      px-4 py-2 font-semibold rounded-lg transition-colors
                      ${action.type === 'primary' 
                        ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                        : action.type === 'secondary'
                          ? 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                          : 'border border-gray-600 text-gray-300 hover:border-gray-500'
                      }
                      ${(action.disabled || isValidating) ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {action.loading || (isValidating && action.type === 'primary') && (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                      </svg>
                    )}
                    {action.label}
                    {action.shortcut && (
                      <span className="ml-2 text-xs opacity-60">
                        {action.shortcut}
                      </span>
                    )}
                  </button>
                ))}
                
                {/* Default next button if no custom actions */}
                {currentStep.actions.length === 0 && (
                  <button
                    onClick={completeStep}
                    disabled={isValidating}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isValidating && (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                      </svg>
                    )}
                    {stepIndex === activeGuide.steps.length - 1 ? 'Finish' : 'Next'}
                  </button>
                )}
              </div>
            </div>

            {/* Keyboard shortcuts */}
            {enableKeyboard && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-500">
                  Keyboard shortcuts: 
                  <span className="ml-2">Ctrl+Enter: Next</span>
                  {activeGuide.settings.allowSkipping && <span className="ml-2">Esc: Skip</span>}
                  {currentStep.hints?.length > 0 && <span className="ml-2">Ctrl+H: Hint</span>}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </>
    );
  };

  return (
    <div className={`interactive-guides ${className}`} data-testid={testId}>
      <AnimatePresence>
        {/* Guide selector when no active guide */}
        {!activeGuide && <GuideSelector />}
        
        {/* Active step modal */}
        {activeGuide && currentStep && <StepModal />}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing interactive guides
export const useInteractiveGuides = () => {
  const [guides, setGuides] = React.useState<GuideFlow[]>([]);
  const [progress, setProgress] = React.useState<Record<string, GuideProgress>>({});

  const addGuide = React.useCallback((guide: GuideFlow) => {
    setGuides(prev => [...prev, guide]);
  }, []);

  const removeGuide = React.useCallback((guideId: string) => {
    setGuides(prev => prev.filter(g => g.id !== guideId));
  }, []);

  const updateGuide = React.useCallback((guideId: string, updates: Partial<GuideFlow>) => {
    setGuides(prev => prev.map(g => g.id === guideId ? { ...g, ...updates } : g));
  }, []);

  const updateProgress = React.useCallback((guideId: string, updates: Partial<GuideProgress>) => {
    setProgress(prev => ({
      ...prev,
      [guideId]: { ...prev[guideId], ...updates }
    }));
  }, []);

  const resetProgress = React.useCallback((guideId?: string) => {
    if (guideId) {
      setProgress(prev => {
        const { [guideId]: removed, ...rest } = prev;
        return rest;
      });
    } else {
      setProgress({});
    }
  }, []);

  return {
    guides,
    progress,
    addGuide,
    removeGuide,
    updateGuide,
    updateProgress,
    resetProgress,
    setProgress
  };
};

export default InteractiveGuides;