'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MilestoneUnlocking - Systematic Revenue Scaling Progression System
 * 
 * Features:
 * - ARR-based milestone tracking ($2M → $10M journey)
 * - Professional competency progression
 * - Resource quality improvements at each level
 * - Feature unlocking based on business readiness
 * - Progress visualization for board reporting
 * - Integration with systematic scaling services
 * - ROI correlation tracking
 * - Personalized scaling paths based on industry
 */

export type MilestoneType = 'arr_growth' | 'competency' | 'resource_generation' | 'team_scaling' | 'market_expansion' | 'professional_development' | 'systematic_improvement';
export type UnlockCondition = 'arr_threshold' | 'competency_level' | 'team_size' | 'resource_quality' | 'roi_achievement' | 'time_in_stage';
export type RewardType = 'advanced_feature' | 'resource_access' | 'export_format' | 'integration' | 'analytics' | 'automation' | 'priority_support';
export type MilestoneStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'claimed';

export interface MilestoneReward {
  id: string;
  type: RewardType;
  name: string;
  description: string;
  value?: number | string;
  icon?: React.ReactNode;
  image?: string;
  businessImpact: 'foundational' | 'growth_enabling' | 'scale_accelerating' | 'market_leading' | 'industry_defining';
  metadata?: {
    featureId?: string;
    resourceId?: string;
    integrationId?: string;
    accessLevel?: string;
    estimatedROI?: number;
    timeToValue?: number;
  };
}

export interface MilestoneRequirement {
  id: string;
  condition: UnlockCondition;
  target: number;
  current: number;
  unit: string;
  description: string;
  operator?: 'gte' | 'lte' | 'eq' | 'between';
  businessContext?: string;
  timeframe?: {
    duration: number;
    unit: 'week' | 'month' | 'quarter' | 'year';
  };
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  type: MilestoneType;
  status: MilestoneStatus;
  icon?: React.ReactNode;
  image?: string;
  requirements: MilestoneRequirement[];
  rewards: MilestoneReward[];
  priority: number;
  category?: string;
  prerequisites?: string[];
  unlockMessage?: string;
  progressIndicator?: 'subtle' | 'prominent' | 'executive' | 'board_ready';
  boardReportMessage?: string;
  timeToAchieve?: number;
  scalingStage: 'early_scaling' | 'rapid_scaling' | 'mature_scaling' | 'market_leader';
  tags: string[];
  metadata?: {
    arrImpact?: number;
    competencyPoints?: number;
    unlockDate?: Date;
    completedDate?: Date;
    isStrategic?: boolean;
    requiresTeamAlignment?: boolean;
    nextQuarterTarget?: Date;
  };
}

export interface UserProgress {
  userId: string;
  completedMilestones: string[];
  inProgressMilestones: string[];
  unlockedFeatures: string[];
  currentARR: string;
  targetARR: string;
  competencyLevels: Record<string, number>;
  scalingVelocity: number;
  professionalCredibility: number;
  nextMilestoneARR: string;
  milestoneStats: {
    totalCompleted: number;
    totalAvailable: number;
    completionRate: number;
    averageCompletionTime: number;
  };
  lastActivity: Date;
}

export interface MilestoneUnlockingProps {
  milestones: Milestone[];
  userProgress: UserProgress;
  onMilestoneComplete?: (milestone: Milestone) => void;
  onRewardClaim?: (reward: MilestoneReward, milestone: Milestone) => void;
  onProgressUpdate?: (progress: UserProgress) => void;
  enableCelebrations?: boolean;
  enableSocialSharing?: boolean;
  enableNotifications?: boolean;
  showProgress?: boolean;
  groupByCategory?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

const MilestoneUnlocking: React.FC<MilestoneUnlockingProps> = ({
  milestones,
  userProgress,
  onMilestoneComplete,
  onRewardClaim,
  onProgressUpdate,
  enableCelebrations = true,
  enableSocialSharing = false,
  enableNotifications = true,
  showProgress = true,
  groupByCategory = true,
  theme = 'dark',
  className = '',
  'data-testid': testId
}) => {
  // State management
  const [celebratingMilestone, setCelebratingMilestone] = React.useState<Milestone | null>(null);
  const [showMilestoneModal, setShowMilestoneModal] = React.useState<Milestone | null>(null);
  const [claimingReward, setClaimingReward] = React.useState<string | null>(null);

  // Check milestone completion
  const checkMilestoneCompletion = React.useCallback((milestone: Milestone): boolean => {
    return milestone.requirements.every(req => {
      switch (req.operator || 'gte') {
        case 'gte':
          return req.current >= req.target;
        case 'lte':
          return req.current <= req.target;
        case 'eq':
          return req.current === req.target;
        case 'between':
          // Assuming target is the upper bound and some metadata contains lower bound
          return req.current >= (req.target * 0.8) && req.current <= req.target;
        default:
          return req.current >= req.target;
      }
    });
  }, []);

  // Get milestone progress percentage
  const getMilestoneProgress = React.useCallback((milestone: Milestone): number => {
    if (milestone.status === 'completed') return 100;
    
    const totalProgress = milestone.requirements.reduce((acc, req) => {
      const progress = Math.min(100, (req.current / req.target) * 100);
      return acc + progress;
    }, 0);
    
    return Math.floor(totalProgress / milestone.requirements.length);
  }, []);

  // Update milestone status
  const updateMilestoneStatus = React.useCallback(() => {
    milestones.forEach(milestone => {
      if (milestone.status === 'completed') return;
      
      const isCompleted = checkMilestoneCompletion(milestone);
      
      if (isCompleted && milestone.status !== 'completed') {
        // Update milestone status
        milestone.status = 'completed';
        milestone.metadata = {
          ...milestone.metadata,
          completedDate: new Date()
        };
        
        // Update user progress
        const updatedProgress: UserProgress = {
          ...userProgress,
          completedMilestones: [...userProgress.completedMilestones, milestone.id],
          inProgressMilestones: userProgress.inProgressMilestones.filter(id => id !== milestone.id),
          totalPoints: userProgress.totalPoints + (milestone.metadata?.totalPoints || 0),
          experience: userProgress.experience + (milestone.metadata?.experiencePoints || 0)
        };
        
        onProgressUpdate?.(updatedProgress);
        onMilestoneComplete?.(milestone);
        
        // Show celebration
        if (enableCelebrations) {
          setCelebratingMilestone(milestone);
        }
        
        // Show notification
        if (enableNotifications && 'Notification' in window) {
          new Notification(`Milestone Unlocked: ${milestone.title}`, {
            body: milestone.description,
            icon: '/milestone-icon.png'
          });
        }
      } else if (!isCompleted && milestone.status === 'locked') {
        // Check if milestone should be available
        const hasPrerequisites = !milestone.prerequisites?.length || 
          milestone.prerequisites.every(prereq => userProgress.completedMilestones.includes(prereq));
        
        if (hasPrerequisites) {
          milestone.status = 'available';
        }
      } else if (!isCompleted && milestone.status === 'available') {
        // Check if milestone is in progress
        const hasProgress = milestone.requirements.some(req => req.current > 0);
        if (hasProgress && !userProgress.inProgressMilestones.includes(milestone.id)) {
          milestone.status = 'in_progress';
          const updatedProgress: UserProgress = {
            ...userProgress,
            inProgressMilestones: [...userProgress.inProgressMilestones, milestone.id]
          };
          onProgressUpdate?.(updatedProgress);
        }
      }
    });
  }, [milestones, userProgress, checkMilestoneCompletion, onProgressUpdate, onMilestoneComplete, enableCelebrations, enableNotifications]);

  // Claim reward
  const claimReward = React.useCallback(async (reward: MilestoneReward, milestone: Milestone) => {
    if (userProgress.claimedRewards.includes(reward.id)) return;
    
    setClaimingReward(reward.id);
    
    try {
      // Update user progress
      const updatedProgress: UserProgress = {
        ...userProgress,
        claimedRewards: [...userProgress.claimedRewards, reward.id]
      };
      
      onProgressUpdate?.(updatedProgress);
      onRewardClaim?.(reward, milestone);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to claim reward:', error);
    } finally {
      setClaimingReward(null);
    }
  }, [userProgress, onProgressUpdate, onRewardClaim]);

  // Group milestones by category
  const groupedMilestones = React.useMemo(() => {
    if (!groupByCategory) {
      return { 'All Milestones': milestones };
    }

    return milestones.reduce((groups, milestone) => {
      const category = milestone.category || 'General';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(milestone);
      return groups;
    }, {} as Record<string, Milestone[]>);
  }, [milestones, groupByCategory]);

  // Check for milestone updates
  React.useEffect(() => {
    updateMilestoneStatus();
  }, [updateMilestoneStatus]);

  // Get status styling
  const getStatusClasses = (status: MilestoneStatus) => {
    switch (status) {
      case 'locked':
        return 'bg-gray-800/50 border-gray-700 text-gray-500';
      case 'available':
        return 'bg-blue-900/20 border-blue-600 text-blue-300';
      case 'in_progress':
        return 'bg-purple-900/20 border-purple-500 text-purple-300';
      case 'completed':
        return 'bg-green-900/20 border-green-500 text-green-300';
      case 'claimed':
        return 'bg-yellow-900/20 border-yellow-500 text-yellow-300';
      default:
        return 'bg-gray-800 border-gray-600 text-white';
    }
  };

  // Get difficulty colors
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Get rarity colors
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  // Share milestone
  const shareMilestone = React.useCallback((milestone: Milestone) => {
    if (!enableSocialSharing) return;
    
    const message = milestone.shareMessage || `I just unlocked the "${milestone.title}" milestone!`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: `Milestone Unlocked: ${milestone.title}`,
        text: message,
        url: url
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${message} ${url}`);
    }
  }, [enableSocialSharing]);

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const milestoneVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    hover: {
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  const celebrationVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className={`space-y-8 ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      data-testid={testId}
    >
      {/* Progress overview */}
      {showProgress && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Your Progress</h2>
            <div className="text-right">
              <div className="text-sm text-gray-400">Level {userProgress.level}</div>
              <div className="text-2xl font-bold text-purple-400">{userProgress.totalPoints} pts</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {userProgress.milestoneStats.totalCompleted}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {userProgress.inProgressMilestones.length}
              </div>
              <div className="text-sm text-gray-400">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(userProgress.milestoneStats.completionRate)}%
              </div>
              <div className="text-sm text-gray-400">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {Object.values(userProgress.longestStreaks).reduce((max, streak) => Math.max(max, streak), 0)}
              </div>
              <div className="text-sm text-gray-400">Best Streak</div>
            </div>
          </div>
          
          {/* Level progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Experience</span>
              <span>{userProgress.experience} / {userProgress.nextLevelExperience}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(userProgress.experience / userProgress.nextLevelExperience) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Milestones by category */}
      {Object.entries(groupedMilestones).map(([category, categoryMilestones]) => (
        <div key={category} className="space-y-4">
          {groupByCategory && (
            <div className="border-b border-gray-700 pb-2">
              <h3 className="text-xl font-semibold text-white">{category}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {categoryMilestones.filter(m => m.status === 'completed').length} of {categoryMilestones.length} completed
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryMilestones
              .sort((a, b) => b.priority - a.priority)
              .map((milestone) => {
                const progress = getMilestoneProgress(milestone);
                const canClaim = milestone.status === 'completed' && 
                  milestone.rewards.some(r => !userProgress.claimedRewards.includes(r.id));

                return (
                  <motion.div
                    key={milestone.id}
                    variants={milestoneVariants}
                    whileHover="hover"
                    className={`
                      relative p-6 rounded-xl border transition-all duration-200 cursor-pointer
                      ${getStatusClasses(milestone.status)}
                    `}
                    onClick={() => setShowMilestoneModal(milestone)}
                  >
                    {/* Milestone header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {milestone.icon && (
                          <div className="text-2xl flex-shrink-0">
                            {milestone.icon}
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-lg">{milestone.title}</h4>
                          <p className={`text-sm capitalize ${getDifficultyColor(milestone.difficulty)}`}>
                            {milestone.difficulty} • {milestone.estimatedTime || 0}min
                          </p>
                        </div>
                      </div>
                      
                      {milestone.status === 'completed' && (
                        <div className="text-green-400">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Milestone description */}
                    <p className="text-sm mb-4 line-clamp-2">
                      {milestone.description}
                    </p>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in_progress' ? 'bg-purple-500' :
                            'bg-gray-600'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Requirements preview */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-1">Requirements:</p>
                      <div className="space-y-1">
                        {milestone.requirements.slice(0, 2).map((req, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span className="text-gray-300">{req.description}</span>
                            <span className={req.current >= req.target ? 'text-green-400' : 'text-gray-400'}>
                              {req.current} / {req.target}
                            </span>
                          </div>
                        ))}
                        {milestone.requirements.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{milestone.requirements.length - 2} more...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rewards preview */}
                    {milestone.rewards.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-400 mb-2">Rewards:</p>
                        <div className="flex flex-wrap gap-1">
                          {milestone.rewards.slice(0, 3).map((reward) => (
                            <span
                              key={reward.id}
                              className={`
                                inline-block px-2 py-1 text-xs rounded
                                ${getRarityColor(reward.rarity)} bg-current bg-opacity-20
                              `}
                            >
                              {reward.name}
                            </span>
                          ))}
                          {milestone.rewards.length > 3 && (
                            <span className="inline-block px-2 py-1 text-xs bg-gray-700 text-gray-400 rounded">
                              +{milestone.rewards.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    {canClaim && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const unclaimedReward = milestone.rewards.find(r => 
                            !userProgress.claimedRewards.includes(r.id)
                          );
                          if (unclaimedReward) {
                            claimReward(unclaimedReward, milestone);
                          }
                        }}
                        disabled={claimingReward !== null}
                        className="w-full py-2 px-4 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                      >
                        {claimingReward ? 'Claiming...' : 'Claim Reward'}
                      </button>
                    )}

                    {milestone.status === 'completed' && enableSocialSharing && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareMilestone(milestone);
                        }}
                        className="absolute top-4 right-12 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                      </button>
                    )}
                  </motion.div>
                );
              })}
          </div>
        </div>
      ))}

      {/* Milestone detail modal */}
      <AnimatePresence>
        {showMilestoneModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowMilestoneModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{showMilestoneModal.title}</h3>
                <button
                  onClick={() => setShowMilestoneModal(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-300 mb-6">{showMilestoneModal.description}</p>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Requirements</h4>
                <div className="space-y-2">
                  {showMilestoneModal.requirements.map((req, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-300">{req.description}</p>
                        <p className="text-xs text-gray-500">{req.unit}</p>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${req.current >= req.target ? 'text-green-400' : 'text-gray-400'}`}>
                          {req.current} / {req.target}
                        </div>
                        <div className="w-16 h-2 bg-gray-700 rounded-full mt-1">
                          <div 
                            className={`h-2 rounded-full ${req.current >= req.target ? 'bg-green-500' : 'bg-purple-500'}`}
                            style={{ width: `${Math.min(100, (req.current / req.target) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards */}
              {showMilestoneModal.rewards.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Rewards</h4>
                  <div className="space-y-2">
                    {showMilestoneModal.rewards.map((reward) => {
                      const isClaimed = userProgress.claimedRewards.includes(reward.id);
                      return (
                        <div key={reward.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {reward.icon && <div className="text-xl">{reward.icon}</div>}
                            <div>
                              <p className={`font-medium ${isClaimed ? 'text-green-400' : 'text-white'}`}>
                                {reward.name}
                              </p>
                              <p className="text-sm text-gray-400">{reward.description}</p>
                              <span className={`text-xs px-2 py-1 rounded ${getRarityColor(reward.rarity)} bg-current bg-opacity-20`}>
                                {reward.rarity}
                              </span>
                            </div>
                          </div>
                          {isClaimed && (
                            <div className="text-green-400">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tags */}
              {showMilestoneModal.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {showMilestoneModal.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration animation */}
      <AnimatePresence>
        {celebratingMilestone && enableCelebrations && (
          <motion.div
            variants={celebrationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setCelebratingMilestone(null)}
          >
            <div className="text-center text-white max-w-md p-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Milestone Unlocked!</h2>
              <h3 className="text-xl text-yellow-400 mb-4">{celebratingMilestone.title}</h3>
              <p className="text-gray-300 mb-6">{celebratingMilestone.unlockMessage || celebratingMilestone.description}</p>
              <button
                onClick={() => setCelebratingMilestone(null)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Hook for milestone tracking
export const useMilestoneTracking = () => {
  const [milestones, setMilestones] = React.useState<Milestone[]>([]);
  const [userProgress, setUserProgress] = React.useState<UserProgress | null>(null);

  const updateProgress = React.useCallback((updates: Partial<UserProgress>) => {
    setUserProgress(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const addMilestone = React.useCallback((milestone: Milestone) => {
    setMilestones(prev => [...prev, milestone]);
  }, []);

  const updateMilestone = React.useCallback((id: string, updates: Partial<Milestone>) => {
    setMilestones(prev => 
      prev.map(milestone => milestone.id === id ? { ...milestone, ...updates } : milestone)
    );
  }, []);

  const completeMilestone = React.useCallback((milestoneId: string) => {
    setMilestones(prev =>
      prev.map(milestone => 
        milestone.id === milestoneId 
          ? { ...milestone, status: 'completed' as MilestoneStatus }
          : milestone
      )
    );
  }, []);

  return {
    milestones,
    userProgress,
    updateProgress,
    addMilestone,
    updateMilestone,
    completeMilestone,
    setUserProgress
  };
};

export default MilestoneUnlocking;