'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProgressiveDisclosure - Information revelation system
 * 
 * Features:
 * - Layered information disclosure
 * - Expandable content sections
 * - Context-aware reveals
 * - User-controlled pacing
 * - Smart content organization
 * - Analytics and tracking
 * - Accessibility compliance
 * - Mobile-responsive design
 */

export type DisclosureLevel = 'summary' | 'overview' | 'detailed' | 'expert' | 'comprehensive';
export type RevealTrigger = 'click' | 'hover' | 'scroll' | 'time' | 'progress' | 'auto';
export type ContentType = 'text' | 'list' | 'media' | 'interactive' | 'data' | 'custom';
export type DisclosureVariant = 'accordion' | 'tabs' | 'modal' | 'inline' | 'sidebar' | 'overlay';

export interface ContentLayer {
  id: string;
  level: DisclosureLevel;
  title: string;
  summary: string;
  content: React.ReactNode;
  type: ContentType;
  estimatedReadTime?: number;
  complexity?: 'simple' | 'medium' | 'complex';
  prerequisites?: string[];
  tags: string[];
  metadata?: {
    wordCount?: number;
    mediaCount?: number;
    interactiveElements?: number;
    difficulty?: number;
  };
}

export interface DisclosureSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
  description?: string;
  layers: ContentLayer[];
  trigger: RevealTrigger;
  variant: DisclosureVariant;
  defaultExpanded?: boolean;
  allowMultiple?: boolean;
  showProgress?: boolean;
  analytics?: {
    trackViews: boolean;
    trackTime: boolean;
    trackInteractions: boolean;
  };
  conditions?: {
    show: () => boolean;
    expand: () => boolean;
  };
  priority: number;
}

export interface UserInteraction {
  sectionId: string;
  layerId?: string;
  action: 'view' | 'expand' | 'collapse' | 'complete' | 'skip';
  timestamp: Date;
  timeSpent?: number;
  level?: DisclosureLevel;
}

export interface DisclosureProgress {
  userId: string;
  viewedSections: string[];
  expandedSections: string[];
  completedLayers: string[];
  currentLevel: DisclosureLevel;
  interactions: UserInteraction[];
  totalTimeSpent: number;
  sectionTimeSpent: Record<string, number>;
  preferences: {
    defaultLevel: DisclosureLevel;
    autoExpand: boolean;
    showAllLevels: boolean;
    skipSeen: boolean;
  };
}

export interface ProgressiveDisclosureProps {
  sections: DisclosureSection[];
  progress?: DisclosureProgress;
  onInteraction?: (interaction: UserInteraction) => void;
  onProgressUpdate?: (progress: DisclosureProgress) => void;
  onLevelChange?: (level: DisclosureLevel) => void;
  allowLevelSelection?: boolean;
  showAnalytics?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

const ProgressiveDisclosure: React.FC<ProgressiveDisclosureProps> = ({
  sections,
  progress,
  onInteraction,
  onProgressUpdate,
  onLevelChange,
  allowLevelSelection = true,
  showAnalytics = false,
  theme = 'dark',
  className = '',
  'data-testid': testId
}) => {
  // State management
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(new Set());
  const [expandedLayers, setExpandedLayers] = React.useState<Set<string>>(new Set());
  const [currentLevel, setCurrentLevel] = React.useState<DisclosureLevel>(
    progress?.currentLevel || 'overview'
  );
  const [localProgress, setLocalProgress] = React.useState<DisclosureProgress>(
    progress || {
      userId: 'anonymous',
      viewedSections: [],
      expandedSections: [],
      completedLayers: [],
      currentLevel: 'overview',
      interactions: [],
      totalTimeSpent: 0,
      sectionTimeSpent: {},
      preferences: {
        defaultLevel: 'overview',
        autoExpand: false,
        showAllLevels: false,
        skipSeen: false
      }
    }
  );

  // Level hierarchy
  const levelOrder: DisclosureLevel[] = ['summary', 'overview', 'detailed', 'expert', 'comprehensive'];
  const currentLevelIndex = levelOrder.indexOf(currentLevel);

  // Track interaction
  const trackInteraction = React.useCallback((interaction: Omit<UserInteraction, 'timestamp'>) => {
    const fullInteraction: UserInteraction = {
      ...interaction,
      timestamp: new Date()
    };

    setLocalProgress(prev => {
      const updated = {
        ...prev,
        interactions: [...prev.interactions, fullInteraction]
      };
      onProgressUpdate?.(updated);
      return updated;
    });

    onInteraction?.(fullInteraction);
  }, [onInteraction, onProgressUpdate]);

  // Update progress
  const updateProgress = React.useCallback((updates: Partial<DisclosureProgress>) => {
    setLocalProgress(prev => {
      const updated = { ...prev, ...updates };
      onProgressUpdate?.(updated);
      return updated;
    });
  }, [onProgressUpdate]);

  // Toggle section expansion
  const toggleSection = React.useCallback((sectionId: string) => {
    const isCurrentlyExpanded = expandedSections.has(sectionId);
    const newExpandedSections = new Set(expandedSections);

    if (isCurrentlyExpanded) {
      newExpandedSections.delete(sectionId);
      trackInteraction({ sectionId, action: 'collapse' });
    } else {
      newExpandedSections.add(sectionId);
      trackInteraction({ sectionId, action: 'expand' });
      
      // Mark section as viewed
      if (!localProgress.viewedSections.includes(sectionId)) {
        updateProgress({
          viewedSections: [...localProgress.viewedSections, sectionId]
        });
      }
    }

    setExpandedSections(newExpandedSections);

    updateProgress({
      expandedSections: Array.from(newExpandedSections)
    });
  }, [expandedSections, trackInteraction, localProgress.viewedSections, updateProgress]);

  // Toggle layer expansion
  const toggleLayer = React.useCallback((layerId: string, sectionId: string) => {
    const isCurrentlyExpanded = expandedLayers.has(layerId);
    const newExpandedLayers = new Set(expandedLayers);

    if (isCurrentlyExpanded) {
      newExpandedLayers.delete(layerId);
    } else {
      newExpandedLayers.add(layerId);
      
      // Track layer view
      trackInteraction({ 
        sectionId, 
        layerId, 
        action: 'view',
        level: sections.find(s => s.id === sectionId)?.layers.find(l => l.id === layerId)?.level
      });
    }

    setExpandedLayers(newExpandedLayers);
  }, [expandedLayers, sections, trackInteraction]);

  // Change disclosure level
  const changeLevel = React.useCallback((level: DisclosureLevel) => {
    setCurrentLevel(level);
    updateProgress({ currentLevel: level });
    onLevelChange?.(level);

    // Auto-expand relevant layers
    if (localProgress.preferences.autoExpand) {
      const newExpandedLayers = new Set(expandedLayers);
      sections.forEach(section => {
        section.layers.forEach(layer => {
          const layerIndex = levelOrder.indexOf(layer.level);
          const targetIndex = levelOrder.indexOf(level);
          if (layerIndex <= targetIndex) {
            newExpandedLayers.add(layer.id);
          }
        });
      });
      setExpandedLayers(newExpandedLayers);
    }
  }, [expandedLayers, sections, localProgress.preferences.autoExpand, updateProgress, onLevelChange, levelOrder]);

  // Get filtered layers for current level
  const getVisibleLayers = React.useCallback((sectionLayers: ContentLayer[]): ContentLayer[] => {
    if (localProgress.preferences.showAllLevels) {
      return sectionLayers;
    }

    return sectionLayers.filter(layer => {
      const layerIndex = levelOrder.indexOf(layer.level);
      return layerIndex <= currentLevelIndex;
    });
  }, [localProgress.preferences.showAllLevels, currentLevelIndex, levelOrder]);

  // Calculate reading progress
  const calculateProgress = React.useCallback((section: DisclosureSection): number => {
    const visibleLayers = getVisibleLayers(section.layers);
    const completedLayers = visibleLayers.filter(layer => 
      localProgress.completedLayers.includes(layer.id)
    ).length;
    
    return visibleLayers.length > 0 ? (completedLayers / visibleLayers.length) * 100 : 0;
  }, [getVisibleLayers, localProgress.completedLayers]);

  // Theme classes
  const themeClasses = {
    light: {
      container: 'bg-white text-gray-900',
      section: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
      layer: 'bg-white border-gray-100',
      text: 'text-gray-600',
      accent: 'text-blue-600'
    },
    dark: {
      container: 'bg-gray-900 text-white',
      section: 'bg-gray-800 border-gray-700 hover:bg-gray-750',
      layer: 'bg-gray-800/50 border-gray-600',
      text: 'text-gray-300',
      accent: 'text-purple-400'
    }
  };

  const currentTheme = themeClasses[theme];

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

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const layerVariants = {
    initial: { opacity: 0, height: 0 },
    animate: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        opacity: { delay: 0.1 }
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  const levelColors = {
    summary: 'bg-green-500',
    overview: 'bg-blue-500',
    detailed: 'bg-purple-500',
    expert: 'bg-orange-500',
    comprehensive: 'bg-red-500'
  };

  return (
    <motion.div
      className={`space-y-6 ${currentTheme.container} ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      data-testid={testId}
    >
      {/* Level selector */}
      {allowLevelSelection && (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 w-full">
            Information Level
          </h3>
          {levelOrder.map((level, index) => (
            <button
              key={level}
              onClick={() => changeLevel(level)}
              disabled={index > currentLevelIndex + 1} // Progressive unlocking
              className={`
                px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${level === currentLevel 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : index <= currentLevelIndex + 1
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                }
              `}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Analytics summary */}
      {showAnalytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-800/20 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {localProgress.viewedSections.length}
            </div>
            <div className="text-sm text-gray-400">Sections Viewed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {localProgress.completedLayers.length}
            </div>
            <div className="text-sm text-gray-400">Layers Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {Math.floor(localProgress.totalTimeSpent / 60)}m
            </div>
            <div className="text-sm text-gray-400">Time Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {Math.round(
                sections.reduce((acc, section) => acc + calculateProgress(section), 0) / sections.length
              )}%
            </div>
            <div className="text-sm text-gray-400">Overall Progress</div>
          </div>
        </div>
      )}

      {/* Disclosure sections */}
      <div className="space-y-4">
        {sections
          .sort((a, b) => b.priority - a.priority)
          .filter(section => !section.conditions?.show || section.conditions.show())
          .map((section) => {
            const isExpanded = expandedSections.has(section.id);
            const visibleLayers = getVisibleLayers(section.layers);
            const progress = calculateProgress(section);

            return (
              <motion.div
                key={section.id}
                variants={sectionVariants}
                className={`
                  border rounded-xl overflow-hidden transition-all duration-200
                  ${currentTheme.section}
                `}
              >
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-80 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {section.icon && (
                      <div className="text-2xl flex-shrink-0">
                        {section.icon}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold mb-1">{section.title}</h3>
                      {section.description && (
                        <p className={`text-sm ${currentTheme.text}`}>
                          {section.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-400">
                          {visibleLayers.length} layer{visibleLayers.length !== 1 ? 's' : ''}
                        </span>
                        {section.showProgress && progress > 0 && (
                          <span className="text-xs text-green-400">
                            {progress.toFixed(0)}% complete
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {section.showProgress && (
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                    
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                {/* Section content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      variants={layerVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="border-t border-gray-700"
                    >
                      <div className="p-6 space-y-4">
                        {visibleLayers.map((layer) => {
                          const isLayerExpanded = expandedLayers.has(layer.id);
                          const isCompleted = localProgress.completedLayers.includes(layer.id);

                          return (
                            <div
                              key={layer.id}
                              className={`
                                border rounded-lg overflow-hidden transition-all duration-200
                                ${currentTheme.layer}
                              `}
                            >
                              {/* Layer header */}
                              <button
                                onClick={() => toggleLayer(layer.id, section.id)}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${levelColors[layer.level]}`} />
                                  <div>
                                    <h4 className="font-semibold">{layer.title}</h4>
                                    <p className={`text-sm ${currentTheme.text} mt-1`}>
                                      {layer.summary}
                                    </p>
                                    <div className="flex items-center space-x-3 mt-2">
                                      <span className={`text-xs px-2 py-1 rounded ${levelColors[layer.level]} text-white`}>
                                        {layer.level}
                                      </span>
                                      {layer.estimatedReadTime && (
                                        <span className="text-xs text-gray-400">
                                          {layer.estimatedReadTime}min read
                                        </span>
                                      )}
                                      {layer.complexity && (
                                        <span className={`
                                          text-xs px-2 py-1 rounded
                                          ${layer.complexity === 'simple' ? 'bg-green-900/20 text-green-400' : ''}
                                          ${layer.complexity === 'medium' ? 'bg-yellow-900/20 text-yellow-400' : ''}
                                          ${layer.complexity === 'complex' ? 'bg-red-900/20 text-red-400' : ''}
                                        `}>
                                          {layer.complexity}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  {isCompleted && (
                                    <div className="text-green-400">
                                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )}
                                  
                                  <motion.div
                                    animate={{ rotate: isLayerExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  </motion.div>
                                </div>
                              </button>

                              {/* Layer content */}
                              <AnimatePresence>
                                {isLayerExpanded && (
                                  <motion.div
                                    variants={layerVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="border-t border-gray-600"
                                  >
                                    <div className="p-4">
                                      {layer.content}
                                      
                                      {/* Layer completion button */}
                                      {!isCompleted && (
                                        <div className="mt-4 pt-4 border-t border-gray-600">
                                          <button
                                            onClick={() => {
                                              updateProgress({
                                                completedLayers: [...localProgress.completedLayers, layer.id]
                                              });
                                              trackInteraction({
                                                sectionId: section.id,
                                                layerId: layer.id,
                                                action: 'complete',
                                                level: layer.level
                                              });
                                            }}
                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors text-sm"
                                          >
                                            Mark as Complete
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
};

// Hook for managing progressive disclosure
export const useProgressiveDisclosure = () => {
  const [sections, setSections] = React.useState<DisclosureSection[]>([]);
  const [progress, setProgress] = React.useState<DisclosureProgress | null>(null);

  const addSection = React.useCallback((section: DisclosureSection) => {
    setSections(prev => [...prev, section]);
  }, []);

  const removeSection = React.useCallback((id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
  }, []);

  const updateSection = React.useCallback((id: string, updates: Partial<DisclosureSection>) => {
    setSections(prev =>
      prev.map(section => section.id === id ? { ...section, ...updates } : section)
    );
  }, []);

  const resetProgress = React.useCallback(() => {
    setProgress({
      userId: 'anonymous',
      viewedSections: [],
      expandedSections: [],
      completedLayers: [],
      currentLevel: 'overview',
      interactions: [],
      totalTimeSpent: 0,
      sectionTimeSpent: {},
      preferences: {
        defaultLevel: 'overview',
        autoExpand: false,
        showAllLevels: false,
        skipSeen: false
      }
    });
  }, []);

  return {
    sections,
    progress,
    addSection,
    removeSection,
    updateSection,
    resetProgress,
    setProgress
  };
};

export default ProgressiveDisclosure;