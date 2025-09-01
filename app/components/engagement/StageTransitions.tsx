'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Trophy, Zap, Target, CheckCircle, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * StageTransitions - Smooth transitions between engagement stages
 * 
 * Features:
 * - Animated stage transitions
 * - Celebration effects for milestones
 * - Contextual messaging
 * - Mobile-optimized animations
 * - Progress celebration
 * - Motivational feedback
 */

export interface TransitionConfig {
  from: string;
  to: string;
  message: string;
  celebration: 'none' | 'subtle' | 'confetti' | 'fireworks';
  duration: number;
}

export interface StageTransitionsProps {
  currentStage: string;
  nextStage?: string;
  onTransitionComplete?: () => void;
  showTransition: boolean;
  className?: string;
}

// Predefined transition configurations
const transitionConfigs: Record<string, TransitionConfig> = {
  'discovery_to_activation': {
    from: 'discovery',
    to: 'activation',
    message: 'Great exploration! Time to activate your first insights.',
    celebration: 'subtle',
    duration: 2000
  },
  'activation_to_value': {
    from: 'activation',
    to: 'value_realization',
    message: 'Excellent progress! Let\'s unlock real business value.',
    celebration: 'confetti',
    duration: 3000
  },
  'value_to_mastery': {
    from: 'value_realization',
    to: 'mastery',
    message: 'You\'re crushing it! Welcome to platform mastery.',
    celebration: 'fireworks',
    duration: 3500
  }
};

const StageTransitions: React.FC<StageTransitionsProps> = ({
  currentStage,
  nextStage,
  onTransitionComplete,
  showTransition,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');
  const [celebrationType, setCelebrationType] = useState<'none' | 'subtle' | 'confetti' | 'fireworks'>('none');

  // Get transition configuration
  const getTransitionConfig = () => {
    const key = `${currentStage}_to_${nextStage}`;
    return transitionConfigs[key] || {
      from: currentStage,
      to: nextStage || '',
      message: 'Moving forward...',
      celebration: 'none',
      duration: 2000
    };
  };

  // Trigger celebration effects
  const triggerCelebration = (type: string) => {
    switch (type) {
      case 'subtle':
        // Subtle particle effect
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#3B82F6', '#8B5CF6'],
          ticks: 100
        });
        break;

      case 'confetti':
        // Standard confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']
        });
        break;

      case 'fireworks':
        // Fireworks effect
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
          return Math.random() * (max - min) + min;
        };

        const interval: any = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#3B82F6', '#8B5CF6', '#10B981']
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#F59E0B', '#EF4444', '#EC4899']
          });
        }, 250);
        break;
    }
  };

  // Handle transition animation
  useEffect(() => {
    if (showTransition && nextStage && !isAnimating) {
      setIsAnimating(true);
      const config = getTransitionConfig();
      setDisplayMessage(config.message);
      setCelebrationType(config.celebration);

      // Trigger celebration after a short delay
      setTimeout(() => {
        if (config.celebration !== 'none') {
          triggerCelebration(config.celebration);
        }
      }, 500);

      // Complete transition
      setTimeout(() => {
        setIsAnimating(false);
        if (onTransitionComplete) {
          onTransitionComplete();
        }
      }, config.duration);
    }
  }, [showTransition, nextStage, currentStage, isAnimating, onTransitionComplete]);

  // Stage icons mapping
  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'discovery':
        return <Sparkles className="w-8 h-8" />;
      case 'activation':
        return <Target className="w-8 h-8" />;
      case 'value_realization':
        return <Zap className="w-8 h-8" />;
      case 'mastery':
        return <Trophy className="w-8 h-8" />;
      default:
        return <Rocket className="w-8 h-8" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const progressVariants = {
    initial: { width: '0%' },
    animate: {
      width: '100%',
      transition: {
        duration: 2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <AnimatePresence>
      {showTransition && isAnimating && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm ${className}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="relative max-w-md w-full mx-4"
            variants={itemVariants}
          >
            {/* Transition Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
              {/* Stage Icons */}
              <motion.div
                className="flex items-center justify-center space-x-8 mb-6"
                variants={itemVariants}
              >
                <div className="text-blue-400">
                  {getStageIcon(currentStage)}
                </div>

                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                >
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </motion.div>

                <motion.div
                  className="text-purple-400"
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                >
                  {nextStage && getStageIcon(nextStage)}
                </motion.div>
              </motion.div>

              {/* Message */}
              <motion.div
                className="text-center mb-6"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  Level Up! 🎉
                </h3>
                <p className="text-gray-300">
                  {displayMessage}
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="relative h-2 bg-gray-700 rounded-full overflow-hidden"
                variants={itemVariants}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>

              {/* Achievement Badges */}
              {celebrationType !== 'none' && (
                <motion.div
                  className="mt-6 flex justify-center space-x-3"
                  variants={itemVariants}
                >
                  <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Achievement Unlocked</span>
                  </div>
                </motion.div>
              )}

              {/* Motivational Tips */}
              <motion.div
                className="mt-6 p-4 bg-gray-800/50 rounded-lg"
                variants={itemVariants}
              >
                <p className="text-xs text-gray-400 text-center">
                  💡 Pro tip: {getMotivationalTip(nextStage || '')}
                </p>
              </motion.div>
            </div>

            {/* Floating Elements */}
            {celebrationType === 'subtle' && (
              <motion.div
                className="absolute -inset-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    initial={{
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                      opacity: 0
                    }}
                    animate={{
                      y: [-20, -100],
                      opacity: [0, 1, 0],
                      transition: {
                        duration: 2,
                        delay: i * 0.2,
                        ease: 'easeOut'
                      }
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper function for motivational tips
const getMotivationalTip = (stage: string): string => {
  const tips: Record<string, string> = {
    activation: 'Complete your ICP Analysis to unlock powerful insights',
    value_realization: 'Export your resources to share value with stakeholders',
    mastery: 'Integrate with your CRM for seamless workflow automation',
    default: 'Keep exploring to unlock new capabilities'
  };
  
  return tips[stage] || tips.default;
};

// Mini transition component for subtle stage changes
export const MiniTransition: React.FC<{
  show: boolean;
  message: string;
  icon?: ReactNode;
}> = ({ show, message, icon }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl flex items-center space-x-3">
            {icon || <CheckCircle className="w-5 h-5 text-green-400" />}
            <span className="text-sm text-white">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StageTransitions;