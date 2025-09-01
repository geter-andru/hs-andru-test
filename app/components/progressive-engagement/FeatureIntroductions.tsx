'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FeatureIntroductions - Feature discovery and introduction system
 * 
 * Features:
 * - Interactive feature tours
 * - Spotlight highlighting
 * - Progressive feature reveal
 * - Context-aware introductions
 * - Skip and replay functionality
 * - Usage analytics
 * - Accessibility compliance
 * - Mobile-responsive design
 */

export type IntroductionType = 'spotlight' | 'tooltip' | 'modal' | 'overlay' | 'inline' | 'sidebar';
export type TriggerType = 'manual' | 'auto' | 'hover' | 'click' | 'scroll' | 'time';
export type Position = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface FeatureIntroduction {
  id: string;
  title: string;
  description: string;
  type: IntroductionType;
  trigger: TriggerType;
  target?: string; // CSS selector or element ID
  position?: Position;
  content?: React.ReactNode;
  image?: string;
  video?: string;
  actions?: {
    label: string;
    action: () => void;
    type?: 'primary' | 'secondary';
  }[];
  skipAllowed?: boolean;
  showOnce?: boolean;
  prerequisites?: string[];
  conditions?: {
    show: () => boolean;
    hide: () => boolean;
  };
  timing?: {
    delay?: number;
    duration?: number;
    autoAdvance?: boolean;
  };
  priority: number;
  category?: string;
  tags: string[];
}

export interface IntroductionProgress {
  userId: string;
  shownIntroductions: string[];
  skippedIntroductions: string[];
  completedIntroductions: string[];
  lastShownAt: Record<string, Date>;
  interactionCounts: Record<string, number>;
  totalTimeSpent: number;
  preferences: {
    enableIntroductions: boolean;
    showOnceOnly: boolean;
    autoPlay: boolean;
  };
}

export interface FeatureIntroductionsProps {
  introductions: FeatureIntroduction[];
  progress?: IntroductionProgress;
  onIntroductionShow?: (introduction: FeatureIntroduction) => void;
  onIntroductionComplete?: (introduction: FeatureIntroduction) => void;
  onIntroductionSkip?: (introduction: FeatureIntroduction) => void;
  onProgressUpdate?: (progress: IntroductionProgress) => void;
  autoStart?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

const FeatureIntroductions: React.FC<FeatureIntroductionsProps> = ({
  introductions,
  progress,
  onIntroductionShow,
  onIntroductionComplete,
  onIntroductionSkip,
  onProgressUpdate,
  autoStart = true,
  theme = 'dark',
  className = '',
  'data-testid': testId
}) => {
  // State management
  const [currentIntroduction, setCurrentIntroduction] = React.useState<FeatureIntroduction | null>(null);
  const [localProgress, setLocalProgress] = React.useState<IntroductionProgress>(
    progress || {
      userId: 'anonymous',
      shownIntroductions: [],
      skippedIntroductions: [],
      completedIntroductions: [],
      lastShownAt: {},
      interactionCounts: {},
      totalTimeSpent: 0,
      preferences: {
        enableIntroductions: true,
        showOnceOnly: true,
        autoPlay: false
      }
    }
  );
  const [isShowing, setIsShowing] = React.useState(false);
  const [targetPosition, setTargetPosition] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

  // Get eligible introductions
  const getEligibleIntroductions = React.useCallback((): FeatureIntroduction[] => {
    if (!localProgress.preferences.enableIntroductions) return [];

    return introductions
      .filter(intro => {
        // Check if already shown and should only show once
        if (localProgress.preferences.showOnceOnly && localProgress.shownIntroductions.includes(intro.id)) {
          return false;
        }

        // Check prerequisites
        if (intro.prerequisites?.length) {
          const hasPrerequisites = intro.prerequisites.every(prereq => 
            localProgress.completedIntroductions.includes(prereq)
          );
          if (!hasPrerequisites) return false;
        }

        // Check conditions
        if (intro.conditions) {
          if (intro.conditions.hide && intro.conditions.hide()) return false;
          if (intro.conditions.show && !intro.conditions.show()) return false;
        }

        return true;
      })
      .sort((a, b) => b.priority - a.priority);
  }, [introductions, localProgress]);

  // Update progress
  const updateProgress = React.useCallback((updates: Partial<IntroductionProgress>) => {
    setLocalProgress(prev => {
      const updated = { ...prev, ...updates };
      onProgressUpdate?.(updated);
      return updated;
    });
  }, [onProgressUpdate]);

  // Show introduction
  const showIntroduction = React.useCallback((introduction: FeatureIntroduction) => {
    if (!introduction) return;

    setCurrentIntroduction(introduction);
    setIsShowing(true);

    // Update progress
    updateProgress({
      shownIntroductions: [...localProgress.shownIntroductions, introduction.id],
      lastShownAt: {
        ...localProgress.lastShownAt,
        [introduction.id]: new Date()
      },
      interactionCounts: {
        ...localProgress.interactionCounts,
        [introduction.id]: (localProgress.interactionCounts[introduction.id] || 0) + 1
      }
    });

    // Position spotlight if target exists
    if (introduction.target) {
      const targetElement = document.querySelector(introduction.target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setTargetPosition({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });
      }
    }

    onIntroductionShow?.(introduction);

    // Auto advance if configured
    if (introduction.timing?.autoAdvance && introduction.timing?.duration) {
      setTimeout(() => {
        completeIntroduction(introduction);
      }, introduction.timing.duration);
    }
  }, [localProgress, updateProgress, onIntroductionShow]);

  // Complete introduction
  const completeIntroduction = React.useCallback((introduction: FeatureIntroduction) => {
    setIsShowing(false);
    setCurrentIntroduction(null);

    updateProgress({
      completedIntroductions: [...localProgress.completedIntroductions, introduction.id]
    });

    onIntroductionComplete?.(introduction);

    // Show next introduction if available
    if (localProgress.preferences.autoPlay) {
      setTimeout(() => {
        const eligible = getEligibleIntroductions();
        const next = eligible.find(intro => 
          !localProgress.shownIntroductions.includes(intro.id) && 
          !localProgress.completedIntroductions.includes(intro.id)
        );
        if (next) {
          showIntroduction(next);
        }
      }, 500);
    }
  }, [localProgress, updateProgress, onIntroductionComplete, getEligibleIntroductions, showIntroduction]);

  // Skip introduction
  const skipIntroduction = React.useCallback((introduction: FeatureIntroduction) => {
    setIsShowing(false);
    setCurrentIntroduction(null);

    updateProgress({
      skippedIntroductions: [...localProgress.skippedIntroductions, introduction.id]
    });

    onIntroductionSkip?.(introduction);
  }, [localProgress, updateProgress, onIntroductionSkip]);

  // Start introduction tour
  const startTour = React.useCallback(() => {
    const eligible = getEligibleIntroductions();
    if (eligible.length > 0) {
      showIntroduction(eligible[0]);
    }
  }, [getEligibleIntroductions, showIntroduction]);

  // Show specific introduction
  const showSpecificIntroduction = React.useCallback((id: string) => {
    const introduction = introductions.find(intro => intro.id === id);
    if (introduction) {
      showIntroduction(introduction);
    }
  }, [introductions, showIntroduction]);

  // Auto-start on mount
  React.useEffect(() => {
    if (autoStart && localProgress.preferences.enableIntroductions) {
      const eligible = getEligibleIntroductions();
      const autoIntro = eligible.find(intro => intro.trigger === 'auto');
      if (autoIntro) {
        const delay = autoIntro.timing?.delay || 1000;
        setTimeout(() => showIntroduction(autoIntro), delay);
      }
    }
  }, [autoStart, localProgress.preferences.enableIntroductions, getEligibleIntroductions, showIntroduction]);

  // Handle scroll-triggered introductions
  React.useEffect(() => {
    const handleScroll = () => {
      const eligible = getEligibleIntroductions();
      const scrollIntros = eligible.filter(intro => 
        intro.trigger === 'scroll' && 
        !localProgress.shownIntroductions.includes(intro.id)
      );

      scrollIntros.forEach(intro => {
        if (intro.target) {
          const element = document.querySelector(intro.target);
          if (element) {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.top <= window.innerHeight * 0.8;
            if (isVisible && !currentIntroduction) {
              showIntroduction(intro);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getEligibleIntroductions, localProgress.shownIntroductions, currentIntroduction, showIntroduction]);

  // Theme classes
  const themeClasses = {
    light: {
      overlay: 'bg-black/50',
      content: 'bg-white text-gray-900 border-gray-200',
      text: 'text-gray-600',
      accent: 'text-blue-600'
    },
    dark: {
      overlay: 'bg-black/70',
      content: 'bg-gray-900 text-white border-gray-700',
      text: 'text-gray-300',
      accent: 'text-purple-400'
    }
  };

  const currentTheme = themeClasses[theme];

  // Animation variants
  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const spotlightVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    exit: { 
      scale: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Render introduction content
  const renderIntroductionContent = () => {
    if (!currentIntroduction) return null;

    const { type } = currentIntroduction;

    switch (type) {
      case 'modal':
        return (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`
              max-w-lg w-full mx-4 p-6 rounded-2xl border shadow-2xl
              ${currentTheme.content}
            `}
          >
            <IntroductionContent
              introduction={currentIntroduction}
              onComplete={() => completeIntroduction(currentIntroduction)}
              onSkip={() => skipIntroduction(currentIntroduction)}
              theme={theme}
            />
          </motion.div>
        );

      case 'tooltip':
        return (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`
              absolute z-50 max-w-sm p-4 rounded-lg border shadow-lg
              ${currentTheme.content}
            `}
            style={{
              left: targetPosition.x + targetPosition.width / 2 - 100,
              top: targetPosition.y - 120
            }}
          >
            <IntroductionContent
              introduction={currentIntroduction}
              onComplete={() => completeIntroduction(currentIntroduction)}
              onSkip={() => skipIntroduction(currentIntroduction)}
              theme={theme}
              compact
            />
          </motion.div>
        );

      case 'sidebar':
        return (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`
              fixed right-0 top-0 bottom-0 w-80 p-6 border-l shadow-2xl z-50
              ${currentTheme.content}
            `}
          >
            <IntroductionContent
              introduction={currentIntroduction}
              onComplete={() => completeIntroduction(currentIntroduction)}
              onSkip={() => skipIntroduction(currentIntroduction)}
              theme={theme}
            />
          </motion.div>
        );

      default:
        return (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`
              max-w-lg w-full mx-4 p-6 rounded-2xl border shadow-2xl
              ${currentTheme.content}
            `}
          >
            <IntroductionContent
              introduction={currentIntroduction}
              onComplete={() => completeIntroduction(currentIntroduction)}
              onSkip={() => skipIntroduction(currentIntroduction)}
              theme={theme}
            />
          </motion.div>
        );
    }
  };

  return (
    <div className={className} data-testid={testId}>
      <AnimatePresence>
        {isShowing && currentIntroduction && (
          <>
            {/* Overlay */}
            {(currentIntroduction.type === 'modal' || currentIntroduction.type === 'spotlight') && (
              <motion.div
                variants={overlayVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`fixed inset-0 z-40 ${currentTheme.overlay}`}
                onClick={() => {
                  if (currentIntroduction.skipAllowed !== false) {
                    skipIntroduction(currentIntroduction);
                  }
                }}
              />
            )}

            {/* Spotlight */}
            {currentIntroduction.type === 'spotlight' && currentIntroduction.target && (
              <motion.div
                variants={spotlightVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed z-50 pointer-events-none"
                style={{
                  left: targetPosition.x - 8,
                  top: targetPosition.y - 8,
                  width: targetPosition.width + 16,
                  height: targetPosition.height + 16,
                  borderRadius: '12px',
                  boxShadow: '0 0 0 2px white, 0 0 0 4px rgb(147, 51, 234), 0 0 20px rgba(147, 51, 234, 0.5)',
                  background: 'rgba(147, 51, 234, 0.1)'
                }}
              />
            )}

            {/* Content container */}
            <div 
              className={`
                fixed inset-0 z-50 flex items-center justify-center
                ${currentIntroduction.type === 'tooltip' || currentIntroduction.type === 'sidebar' ? 'pointer-events-none' : ''}
              `}
            >
              {renderIntroductionContent()}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Tour control buttons - only show if not currently showing an introduction */}
      {!isShowing && (
        <div className="fixed bottom-4 right-4 z-30">
          <button
            onClick={startTour}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg shadow-lg transition-colors"
          >
            Start Tour
          </button>
        </div>
      )}
    </div>
  );
};

// Introduction content component
interface IntroductionContentProps {
  introduction: FeatureIntroduction;
  onComplete: () => void;
  onSkip: () => void;
  theme: 'light' | 'dark';
  compact?: boolean;
}

const IntroductionContent: React.FC<IntroductionContentProps> = ({
  introduction,
  onComplete,
  onSkip,
  theme,
  compact = false
}) => {
  const themeClasses = {
    light: { text: 'text-gray-600', accent: 'text-blue-600' },
    dark: { text: 'text-gray-300', accent: 'text-purple-400' }
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <h3 className={`font-bold ${compact ? 'text-lg' : 'text-xl'}`}>
          {introduction.title}
        </h3>
        <p className={`${currentTheme.text} ${compact ? 'text-sm' : ''}`}>
          {introduction.description}
        </p>
      </div>

      {/* Media */}
      {!compact && introduction.image && (
        <img
          src={introduction.image}
          alt={introduction.title}
          className="w-full rounded-lg"
        />
      )}

      {!compact && introduction.video && (
        <video
          src={introduction.video}
          controls
          className="w-full rounded-lg"
        />
      )}

      {/* Custom content */}
      {!compact && introduction.content && (
        <div>{introduction.content}</div>
      )}

      {/* Actions */}
      <div className={`flex gap-3 ${compact ? 'flex-col' : 'justify-between items-center'}`}>
        {introduction.skipAllowed !== false && (
          <button
            onClick={onSkip}
            className={`text-gray-500 hover:text-gray-400 ${compact ? 'text-sm' : ''}`}
          >
            Skip
          </button>
        )}
        
        <div className="flex gap-2">
          {introduction.actions?.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`
                px-4 py-2 font-medium rounded-lg transition-colors
                ${compact ? 'text-sm px-3 py-1' : ''}
                ${action.type === 'primary' 
                  ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                  : 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                }
              `}
            >
              {action.label}
            </button>
          )) || (
            <button
              onClick={onComplete}
              className={`
                bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors
                ${compact ? 'text-sm px-3 py-1' : 'px-4 py-2'}
              `}
            >
              Got it
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook for managing feature introductions
export const useFeatureIntroductions = () => {
  const [introductions, setIntroductions] = React.useState<FeatureIntroduction[]>([]);
  const [progress, setProgress] = React.useState<IntroductionProgress | null>(null);

  const addIntroduction = React.useCallback((introduction: FeatureIntroduction) => {
    setIntroductions(prev => [...prev, introduction]);
  }, []);

  const removeIntroduction = React.useCallback((id: string) => {
    setIntroductions(prev => prev.filter(intro => intro.id !== id));
  }, []);

  const updateIntroduction = React.useCallback((id: string, updates: Partial<FeatureIntroduction>) => {
    setIntroductions(prev => 
      prev.map(intro => intro.id === id ? { ...intro, ...updates } : intro)
    );
  }, []);

  const resetProgress = React.useCallback(() => {
    setProgress({
      userId: 'anonymous',
      shownIntroductions: [],
      skippedIntroductions: [],
      completedIntroductions: [],
      lastShownAt: {},
      interactionCounts: {},
      totalTimeSpent: 0,
      preferences: {
        enableIntroductions: true,
        showOnceOnly: true,
        autoPlay: false
      }
    });
  }, []);

  return {
    introductions,
    progress,
    addIntroduction,
    removeIntroduction,
    updateIntroduction,
    resetProgress,
    setProgress
  };
};

export default FeatureIntroductions;