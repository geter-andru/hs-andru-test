'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProgressiveToolAccess - Competency-based access control system
 * 
 * Features:
 * - Competency-based tool unlocking
 * - Skill assessment integration
 * - Progress tracking and visualization
 * - Prerequisites and dependency management
 * - Achievement-based access control
 * - Custom unlock animations
 * - Accessibility compliance
 * - Performance optimized
 */

export type ToolStatus = 'locked' | 'preview' | 'unlocked' | 'mastered';
export type CompetencyLevel = 'novice' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type UnlockType = 'competency' | 'achievement' | 'time' | 'manual' | 'purchase';

export interface UnlockRequirement {
  id: string;
  type: UnlockType;
  description: string;
  value: number;
  unit?: string;
  condition?: (user: any) => boolean;
}

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  status: ToolStatus;
  requiredLevel: CompetencyLevel;
  unlockRequirements: UnlockRequirement[];
  prerequisites: string[];
  estimatedTime?: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  path: string;
  tags: string[];
  value: {
    business: number;
    learning: number;
    time: number;
  };
}

export interface UserProgress {
  userId: string;
  competencyLevel: CompetencyLevel;
  completedTools: string[];
  currentStreak: number;
  totalPoints: number;
  achievements: string[];
  skillAssessments: Record<string, number>;
  timeSpent: Record<string, number>;
}

export interface ProgressiveToolAccessProps {
  tools: ToolDefinition[];
  userProgress: UserProgress;
  onToolAccess: (toolId: string) => void;
  onUpgradeRequest?: (toolId: string) => void;
  onPreview?: (toolId: string) => void;
  showPreview?: boolean;
  animateUnlocks?: boolean;
  groupByCategory?: boolean;
  className?: string;
  'data-testid'?: string;
}

const ProgressiveToolAccess: React.FC<ProgressiveToolAccessProps> = ({
  tools,
  userProgress,
  onToolAccess,
  onUpgradeRequest,
  onPreview,
  showPreview = true,
  animateUnlocks = true,
  groupByCategory = true,
  className = '',
  'data-testid': testId
}) => {
  // Competency level hierarchy
  const competencyLevels: CompetencyLevel[] = ['novice', 'beginner', 'intermediate', 'advanced', 'expert'];
  
  // Get competency level index
  const getUserLevelIndex = (level: CompetencyLevel): number => {
    return competencyLevels.indexOf(level);
  };
  
  const getRequiredLevelIndex = (level: CompetencyLevel): number => {
    return competencyLevels.indexOf(level);
  };

  // Check if tool is accessible
  const isToolAccessible = (tool: ToolDefinition): boolean => {
    // Check competency level requirement
    const userLevelIndex = getUserLevelIndex(userProgress.competencyLevel);
    const requiredLevelIndex = getRequiredLevelIndex(tool.requiredLevel);
    
    if (userLevelIndex < requiredLevelIndex) {
      return false;
    }

    // Check prerequisites
    const hasPrerequisites = tool.prerequisites.every(prereqId => 
      userProgress.completedTools.includes(prereqId)
    );
    
    if (!hasPrerequisites) {
      return false;
    }

    // Check unlock requirements
    const meetsRequirements = tool.unlockRequirements.every(req => {
      switch (req.type) {
        case 'competency':
          return userLevelIndex >= req.value;
        case 'achievement':
          return userProgress.achievements.length >= req.value;
        case 'time':
          const totalTime = Object.values(userProgress.timeSpent).reduce((sum, time) => sum + time, 0);
          return totalTime >= req.value;
        case 'manual':
        case 'purchase':
          return userProgress.completedTools.includes(tool.id);
        default:
          return req.condition ? req.condition(userProgress) : false;
      }
    });

    return meetsRequirements;
  };

  // Determine tool status
  const getToolStatus = (tool: ToolDefinition): ToolStatus => {
    if (userProgress.completedTools.includes(tool.id)) {
      const timeSpent = userProgress.timeSpent[tool.id] || 0;
      const skillScore = userProgress.skillAssessments[tool.id] || 0;
      
      // Consider mastered if spent significant time and high skill score
      if (timeSpent >= (tool.estimatedTime || 0) * 2 && skillScore >= 90) {
        return 'mastered';
      }
      return 'unlocked';
    }

    if (isToolAccessible(tool)) {
      return 'unlocked';
    }

    return 'locked';
  };

  // Group tools by category
  const groupedTools = React.useMemo(() => {
    if (!groupByCategory) {
      return { 'All Tools': tools };
    }

    return tools.reduce((groups, tool) => {
      const category = tool.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push({
        ...tool,
        status: getToolStatus(tool)
      });
      return groups;
    }, {} as Record<string, (ToolDefinition & { status: ToolStatus })[]>);
  }, [tools, userProgress, groupByCategory]);

  // Status styling
  const getStatusClasses = (status: ToolStatus) => {
    switch (status) {
      case 'locked':
        return 'bg-gray-800/50 border-gray-700 text-gray-400';
      case 'preview':
        return 'bg-blue-900/20 border-blue-700 text-blue-300 hover:bg-blue-900/30';
      case 'unlocked':
        return 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500';
      case 'mastered':
        return 'bg-green-900/20 border-green-600 text-green-300 hover:bg-green-900/30';
      default:
        return 'bg-gray-800 border-gray-600 text-white';
    }
  };

  // Status icon
  const getStatusIcon = (status: ToolStatus) => {
    switch (status) {
      case 'locked':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        );
      case 'preview':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        );
      case 'unlocked':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'mastered':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Difficulty colors
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Handle tool interaction
  const handleToolClick = (tool: ToolDefinition & { status: ToolStatus }) => {
    switch (tool.status) {
      case 'unlocked':
      case 'mastered':
        onToolAccess(tool.id);
        break;
      case 'preview':
        if (onPreview) {
          onPreview(tool.id);
        }
        break;
      case 'locked':
        if (onUpgradeRequest) {
          onUpgradeRequest(tool.id);
        }
        break;
    }
  };

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

  const cardVariants = {
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

  const unlockVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
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
      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        <div key={category} className="space-y-4">
          {groupByCategory && (
            <div className="border-b border-gray-700 pb-2">
              <h3 className="text-xl font-semibold text-white">{category}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {categoryTools.filter(t => t.status === 'unlocked' || t.status === 'mastered').length} of {categoryTools.length} tools available
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTools.map((tool) => (
              <motion.div
                key={tool.id}
                variants={tool.status === 'unlocked' && animateUnlocks ? unlockVariants : cardVariants}
                whileHover="hover"
                className={`
                  relative p-6 rounded-xl border transition-all duration-200 cursor-pointer
                  ${getStatusClasses(tool.status)}
                `}
                onClick={() => handleToolClick(tool)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToolClick(tool);
                  }
                }}
                aria-label={`${tool.name} - ${tool.status}`}
              >
                {/* Tool header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-2xl">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{tool.name}</h4>
                      <p className={`text-sm capitalize ${getDifficultyColor(tool.difficulty)}`}>
                        {tool.difficulty} • {tool.estimatedTime || 0}min
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(tool.status)}
                  </div>
                </div>

                {/* Tool description */}
                <p className="text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* Tool value indicators */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Business: {tool.value.business}/5</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">Learning: {tool.value.learning}/5</span>
                  </div>
                </div>

                {/* Prerequisites */}
                {tool.prerequisites.length > 0 && tool.status === 'locked' && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-1">Prerequisites:</p>
                    <div className="flex flex-wrap gap-1">
                      {tool.prerequisites.map((prereq) => (
                        <span
                          key={prereq}
                          className={`
                            inline-block px-2 py-1 text-xs rounded
                            ${userProgress.completedTools.includes(prereq) 
                              ? 'bg-green-900/20 text-green-400' 
                              : 'bg-red-900/20 text-red-400'
                            }
                          `}
                        >
                          {tools.find(t => t.id === prereq)?.name || prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Unlock requirements */}
                {tool.status === 'locked' && tool.unlockRequirements.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-1">Requirements:</p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {tool.unlockRequirements.slice(0, 2).map((req, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                          <span>{req.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Progress indicator for mastered tools */}
                {tool.status === 'mastered' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Mastery Progress</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                )}

                {/* Tool tags */}
                {tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action button overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="text-center">
                    {tool.status === 'locked' && (
                      <span className="text-xs text-gray-400">Click to view requirements</span>
                    )}
                    {tool.status === 'preview' && showPreview && (
                      <span className="text-xs text-blue-400">Click for preview</span>
                    )}
                    {(tool.status === 'unlocked' || tool.status === 'mastered') && (
                      <span className="text-xs text-green-400">Click to access</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Summary stats */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">
              {tools.filter(t => getToolStatus(t) === 'unlocked' || getToolStatus(t) === 'mastered').length}
            </div>
            <div className="text-sm text-gray-400">Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {tools.filter(t => getToolStatus(t) === 'mastered').length}
            </div>
            <div className="text-sm text-gray-400">Mastered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {userProgress.totalPoints}
            </div>
            <div className="text-sm text-gray-400">Total Points</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {competencyLevels.indexOf(userProgress.competencyLevel) + 1}/5
            </div>
            <div className="text-sm text-gray-400">Level</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Context for managing tool access state
interface ToolAccessContextValue {
  tools: ToolDefinition[];
  userProgress: UserProgress;
  updateProgress: (progress: Partial<UserProgress>) => void;
  unlockTool: (toolId: string) => void;
  completeTool: (toolId: string, score?: number, timeSpent?: number) => void;
}

export const ToolAccessContext = React.createContext<ToolAccessContextValue | null>(null);

export const useToolAccess = () => {
  const context = React.useContext(ToolAccessContext);
  if (!context) {
    throw new Error('useToolAccess must be used within a ToolAccessProvider');
  }
  return context;
};

export const ToolAccessProvider: React.FC<{
  children: React.ReactNode;
  initialTools: ToolDefinition[];
  initialProgress: UserProgress;
  onProgressChange?: (progress: UserProgress) => void;
}> = ({ children, initialTools, initialProgress, onProgressChange }) => {
  const [tools] = React.useState<ToolDefinition[]>(initialTools);
  const [userProgress, setUserProgress] = React.useState<UserProgress>(initialProgress);

  const updateProgress = React.useCallback((progress: Partial<UserProgress>) => {
    setUserProgress(prev => {
      const updated = { ...prev, ...progress };
      onProgressChange?.(updated);
      return updated;
    });
  }, [onProgressChange]);

  const unlockTool = React.useCallback((toolId: string) => {
    setUserProgress(prev => {
      if (prev.completedTools.includes(toolId)) {
        return prev;
      }
      
      const updated = {
        ...prev,
        completedTools: [...prev.completedTools, toolId]
      };
      onProgressChange?.(updated);
      return updated;
    });
  }, [onProgressChange]);

  const completeTool = React.useCallback((toolId: string, score = 0, timeSpent = 0) => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        completedTools: prev.completedTools.includes(toolId) 
          ? prev.completedTools 
          : [...prev.completedTools, toolId],
        skillAssessments: {
          ...prev.skillAssessments,
          [toolId]: Math.max(score, prev.skillAssessments[toolId] || 0)
        },
        timeSpent: {
          ...prev.timeSpent,
          [toolId]: (prev.timeSpent[toolId] || 0) + timeSpent
        },
        totalPoints: prev.totalPoints + Math.floor(score / 10) * 10
      };
      onProgressChange?.(updated);
      return updated;
    });
  }, [onProgressChange]);

  const value: ToolAccessContextValue = {
    tools,
    userProgress,
    updateProgress,
    unlockTool,
    completeTool
  };

  return (
    <ToolAccessContext.Provider value={value}>
      {children}
    </ToolAccessContext.Provider>
  );
};

export default ProgressiveToolAccess;