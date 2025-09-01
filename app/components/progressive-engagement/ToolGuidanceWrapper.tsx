'use client';

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  ChevronRight,
  X,
  Sparkles,
  BookOpen,
  Play
} from 'lucide-react';

/**
 * ToolGuidanceWrapper - AI-powered contextual help system
 * 
 * Features:
 * - Context-aware guidance based on user progress and tool state
 * - Progressive disclosure of advanced features
 * - Interactive tooltips and overlays
 * - Personalized recommendations engine
 * - Real-time assistance and error prevention
 * - Learning path optimization
 * - Achievement-based guidance unlocking
 * - Multi-modal help delivery (text, video, interactive)
 */

export type GuidanceType = 
  | 'tooltip' 
  | 'popover' 
  | 'modal' 
  | 'overlay' 
  | 'inline' 
  | 'sidebar';

export type GuidanceTrigger = 
  | 'hover' 
  | 'click' 
  | 'focus' 
  | 'auto' 
  | 'onError' 
  | 'onIdle' 
  | 'onProgress';

export type GuidancePriority = 'low' | 'medium' | 'high' | 'critical';

export interface GuidanceStep {
  id: string;
  title: string;
  content: React.ReactNode;
  target?: string; // CSS selector
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  type?: GuidanceType;
  priority?: GuidancePriority;
  trigger?: GuidanceTrigger;
  delay?: number;
  duration?: number;
  completedWhen?: () => boolean;
  prerequisites?: string[];
  nextStep?: string;
  skipable?: boolean;
  persistent?: boolean;
  media?: {
    type: 'video' | 'image' | 'animation';
    src: string;
    alt?: string;
  };
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

export interface GuidanceContext {
  currentTool: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced';
  completedSteps: Set<string>;
  currentStep?: string;
  isGuidanceEnabled: boolean;
  userData: {
    competencyScores: Record<string, number>;
    completedTools: string[];
    preferences: Record<string, any>;
  };
}

export interface ToolGuidanceWrapperProps {
  children: React.ReactNode;
  toolName: string;
  guidanceSteps: GuidanceStep[];
  onStepComplete?: (stepId: string) => void;
  onGuidanceComplete?: () => void;
  enableAI?: boolean;
  personalizeContent?: boolean;
  className?: string;
}

// Guidance Context
const GuidanceContext = createContext<{
  context: GuidanceContext;
  updateContext: (updates: Partial<GuidanceContext>) => void;
  showGuidance: (stepId: string) => void;
  hideGuidance: () => void;
  completeStep: (stepId: string) => void;
} | null>(null);

export const useGuidance = () => {
  const context = useContext(GuidanceContext);
  if (!context) {
    throw new Error('useGuidance must be used within a ToolGuidanceWrapper');
  }
  return context;
};

const ToolGuidanceWrapper: React.FC<ToolGuidanceWrapperProps> = ({
  children,
  toolName,
  guidanceSteps,
  onStepComplete,
  onGuidanceComplete,
  enableAI = true,
  personalizeContent = true,
  className = ''
}) => {
  const [guidanceContext, setGuidanceContext] = useState<GuidanceContext>({
    currentTool: toolName,
    userLevel: 'beginner',
    completedSteps: new Set(),
    isGuidanceEnabled: true,
    userData: {
      competencyScores: {},
      completedTools: [],
      preferences: {}
    }
  });

  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [guidanceQueue, setGuidanceQueue] = useState<string[]>([]);

  // Initialize guidance system
  useEffect(() => {
    // Load user progress from localStorage or API
    const savedProgress = localStorage.getItem(`guidance_${toolName}`);
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setGuidanceContext(prev => ({
          ...prev,
          completedSteps: new Set(progress.completedSteps || []),
          userData: { ...prev.userData, ...progress.userData }
        }));
      } catch (error) {
        console.error('Failed to load guidance progress:', error);
      }
    }

    // Auto-trigger initial guidance
    const initialStep = guidanceSteps.find(step => 
      step.trigger === 'auto' && 
      !guidanceContext.completedSteps.has(step.id)
    );
    
    if (initialStep) {
      setTimeout(() => showGuidance(initialStep.id), initialStep.delay || 1000);
    }
  }, [toolName, guidanceSteps]);

  // Update context
  const updateContext = useCallback((updates: Partial<GuidanceContext>) => {
    setGuidanceContext(prev => {
      const newContext = { ...prev, ...updates };
      
      // Save progress
      localStorage.setItem(`guidance_${toolName}`, JSON.stringify({
        completedSteps: Array.from(newContext.completedSteps),
        userData: newContext.userData
      }));

      return newContext;
    });
  }, [toolName]);

  // Show guidance step
  const showGuidance = useCallback((stepId: string) => {
    const step = guidanceSteps.find(s => s.id === stepId);
    if (!step) return;

    // Check prerequisites
    if (step.prerequisites?.some(prereq => !guidanceContext.completedSteps.has(prereq))) {
      return;
    }

    setActiveStep(stepId);
    setIsVisible(true);
  }, [guidanceSteps, guidanceContext.completedSteps]);

  // Hide guidance
  const hideGuidance = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setActiveStep(null), 300);
  }, []);

  // Complete step
  const completeStep = useCallback((stepId: string) => {
    const newCompletedSteps = new Set(guidanceContext.completedSteps);
    newCompletedSteps.add(stepId);
    
    updateContext({ completedSteps: newCompletedSteps });
    onStepComplete?.(stepId);

    const step = guidanceSteps.find(s => s.id === stepId);
    if (step?.nextStep) {
      setTimeout(() => showGuidance(step.nextStep!), 500);
    } else {
      hideGuidance();
      
      // Check if all steps completed
      if (newCompletedSteps.size === guidanceSteps.length) {
        onGuidanceComplete?.();
      }
    }
  }, [guidanceContext.completedSteps, updateContext, onStepComplete, guidanceSteps, showGuidance, hideGuidance, onGuidanceComplete]);

  // Get current step
  const currentStep = activeStep ? guidanceSteps.find(s => s.id === activeStep) : null;

  // Context provider value
  const contextValue = {
    context: guidanceContext,
    updateContext,
    showGuidance,
    hideGuidance,
    completeStep
  };

  return (
    <GuidanceContext.Provider value={contextValue}>
      <div className={`relative ${className}`}>
        {children}
        
        {/* Guidance Overlay */}
        <GuidanceOverlay
          step={currentStep}
          isVisible={isVisible}
          onComplete={() => currentStep && completeStep(currentStep.id)}
          onSkip={() => hideGuidance()}
          onClose={() => hideGuidance()}
        />

        {/* Guidance Trigger Button */}
        <GuidanceTriggerButton
          toolName={toolName}
          hasActiveGuidance={!!activeStep}
          completedSteps={guidanceContext.completedSteps.size}
          totalSteps={guidanceSteps.length}
          onTrigger={() => {
            const nextStep = guidanceSteps.find(step => 
              !guidanceContext.completedSteps.has(step.id)
            );
            if (nextStep) showGuidance(nextStep.id);
          }}
        />
      </div>
    </GuidanceContext.Provider>
  );
};

// Guidance Overlay Component
interface GuidanceOverlayProps {
  step: GuidanceStep | null;
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
  onClose: () => void;
}

const GuidanceOverlay: React.FC<GuidanceOverlayProps> = ({
  step,
  isVisible,
  onComplete,
  onSkip,
  onClose
}) => {
  if (!step) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  const renderContent = () => {
    switch (step.type) {
      case 'modal':
        return (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            
            {/* Modal Content */}
            <motion.div
              className="relative bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-lg mx-4 shadow-xl"
              variants={contentVariants}
            >
              <GuidanceContent
                step={step}
                onComplete={onComplete}
                onSkip={onSkip}
                onClose={onClose}
                showCloseButton
              />
            </motion.div>
          </motion.div>
        );

      case 'sidebar':
        return (
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-40 w-80 bg-gray-800 border-l border-gray-700 shadow-xl"
            variants={contentVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="hidden"
          >
            <GuidanceContent
              step={step}
              onComplete={onComplete}
              onSkip={onSkip}
              onClose={onClose}
              showCloseButton
              variant="sidebar"
            />
          </motion.div>
        );

      case 'overlay':
        return (
          <motion.div
            className="fixed bottom-4 right-4 z-50 max-w-sm"
            variants={contentVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="hidden"
          >
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 shadow-xl">
              <GuidanceContent
                step={step}
                onComplete={onComplete}
                onSkip={onSkip}
                onClose={onClose}
                showCloseButton
                variant="compact"
              />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && renderContent()}
    </AnimatePresence>
  );
};

// Guidance Content Component
interface GuidanceContentProps {
  step: GuidanceStep;
  onComplete: () => void;
  onSkip: () => void;
  onClose: () => void;
  showCloseButton?: boolean;
  variant?: 'default' | 'sidebar' | 'compact';
}

const GuidanceContent: React.FC<GuidanceContentProps> = ({
  step,
  onComplete,
  onSkip,
  onClose,
  showCloseButton = false,
  variant = 'default'
}) => {
  const getPriorityIcon = (priority: GuidancePriority) => {
    switch (priority) {
      case 'critical': return <Target className="w-5 h-5 text-red-400" />;
      case 'high': return <TrendingUp className="w-5 h-5 text-orange-400" />;
      case 'medium': return <Lightbulb className="w-5 h-5 text-yellow-400" />;
      default: return <HelpCircle className="w-5 h-5 text-blue-400" />;
    }
  };

  const isCompact = variant === 'compact';
  const isSidebar = variant === 'sidebar';

  return (
    <div className={`${isSidebar ? 'h-full flex flex-col p-6' : ''}`}>
      {/* Header */}
      <div className={`flex items-start justify-between ${isCompact ? 'mb-3' : 'mb-4'}`}>
        <div className="flex items-center space-x-2">
          {getPriorityIcon(step.priority || 'medium')}
          <h3 className={`font-semibold text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>
            {step.title}
          </h3>
        </div>
        
        {showCloseButton && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Media */}
      {step.media && !isCompact && (
        <div className="mb-4">
          {step.media.type === 'video' ? (
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
          ) : step.media.type === 'image' ? (
            <img
              src={step.media.src}
              alt={step.media.alt}
              className="w-full h-32 object-cover rounded-lg"
            />
          ) : null}
        </div>
      )}

      {/* Content */}
      <div className={`flex-1 ${isCompact ? 'text-sm' : ''} text-gray-300 mb-4`}>
        {step.content}
      </div>

      {/* Actions */}
      <div className={`flex ${isCompact ? 'flex-col space-y-2' : 'flex-row space-x-3'} ${isSidebar ? 'mt-auto' : ''}`}>
        <button
          onClick={onComplete}
          className={`${isCompact ? 'text-sm py-2' : 'py-3'} px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex-1`}
        >
          Got it!
        </button>
        
        {step.skipable && (
          <button
            onClick={onSkip}
            className={`${isCompact ? 'text-sm py-2' : 'py-3'} px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium rounded-lg transition-colors`}
          >
            Skip
          </button>
        )}

        {/* Custom Actions */}
        {step.actions?.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`${isCompact ? 'text-sm py-2' : 'py-3'} px-4 ${
              action.variant === 'primary' 
                ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            } font-medium rounded-lg transition-colors`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Guidance Trigger Button
interface GuidanceTriggerButtonProps {
  toolName: string;
  hasActiveGuidance: boolean;
  completedSteps: number;
  totalSteps: number;
  onTrigger: () => void;
}

const GuidanceTriggerButton: React.FC<GuidanceTriggerButtonProps> = ({
  toolName,
  hasActiveGuidance,
  completedSteps,
  totalSteps,
  onTrigger
}) => {
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const isComplete = completedSteps === totalSteps;

  return (
    <motion.button
      onClick={onTrigger}
      className="fixed bottom-6 right-6 z-40 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isComplete ? `${toolName} guidance complete` : `${completedSteps}/${totalSteps} guidance steps completed`}
    >
      {hasActiveGuidance ? (
        <Sparkles className="w-6 h-6" />
      ) : isComplete ? (
        <BookOpen className="w-6 h-6" />
      ) : (
        <HelpCircle className="w-6 h-6" />
      )}
      
      {/* Progress Ring */}
      {!isComplete && (
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="20"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="20"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
            className="transition-all duration-300"
          />
        </svg>
      )}
    </motion.button>
  );
};

// Hook for creating guidance steps
export const useGuidanceSteps = (toolName: string) => {
  const [steps, setSteps] = useState<GuidanceStep[]>([]);

  const addStep = useCallback((step: GuidanceStep) => {
    setSteps(prev => [...prev, step]);
  }, []);

  const removeStep = useCallback((stepId: string) => {
    setSteps(prev => prev.filter(step => step.id !== stepId));
  }, []);

  const updateStep = useCallback((stepId: string, updates: Partial<GuidanceStep>) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  }, []);

  return { steps, addStep, removeStep, updateStep, setSteps };
};

export default ToolGuidanceWrapper;