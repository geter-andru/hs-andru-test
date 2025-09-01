'use client'

/**
 * Progressive Engagement Container - Main orchestrator for the redesigned experience
 * 
 * Manages the flow from Welcome → Compelling Aspects → Tool Focus → Integration Reveal
 * Implements the One Focus Rule and progressive disclosure strategy.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeHero from './WelcomeHero';
import CompellingAspectDemo from './CompellingAspectDemo';
import IntegratedIntelligenceReveal from './IntegratedIntelligenceReveal';

// TypeScript interfaces
interface EngagementState {
  currentPhase: string;
  activeToolFocus: string | null;
  toolsCompleted: string[];
  completedData: Record<string, any>;
}

interface ProgressiveEngagementContainerProps {
  customerId: string;
  onToolCompletion?: (toolName: string, completionData: any) => void;
}

type ViewType = 'welcome' | 'aspect_demo' | 'tool_focus' | 'integration';

const ProgressiveEngagementContainer: React.FC<ProgressiveEngagementContainerProps> = ({ 
  customerId, 
  onToolCompletion 
}) => {
  const [currentView, setCurrentView] = useState<ViewType>('welcome');
  const [toolTransition, setToolTransition] = useState<string | null>(null);
  const [completedAnalysisData, setCompletedAnalysisData] = useState<Record<string, any>>({});
  const [engagementState, setEngagementState] = useState<EngagementState>({
    currentPhase: 'welcome',
    activeToolFocus: null,
    toolsCompleted: [],
    completedData: {}
  });
  const [currentAspect, setCurrentAspect] = useState<string | null>(null);

  // Mock progressive engagement hooks functionality
  const showCompellingAspect = (aspectType: string, nextTool?: string) => {
    setCurrentAspect(aspectType);
    setEngagementState(prev => ({
      ...prev,
      activeToolFocus: nextTool || aspectType
    }));
  };

  const trackInteraction = (toolName: string, interactionType: string, data?: any) => {
    console.log('Tracking interaction:', { toolName, interactionType, data });
  };

  const completeToolEngagement = (toolName: string) => {
    setEngagementState(prev => ({
      ...prev,
      toolsCompleted: [...prev.toolsCompleted, toolName]
    }));
  };

  const getEngagementProgress = (): number => {
    const totalSteps = 4; // welcome, aspect_demo, tool_focus, integration
    const currentStep = getCurrentStepNumber();
    return Math.round((currentStep / totalSteps) * 100);
  };

  const getCurrentStepNumber = (): number => {
    switch (currentView) {
      case 'welcome': return 1;
      case 'aspect_demo': return 2;
      case 'tool_focus': return 3;
      case 'integration': return 4;
      default: return 1;
    }
  };

  const canShowIntegration = engagementState.toolsCompleted.length >= 3;

  // Handle engagement start from Welcome Hero
  const handleStartEngagement = (engagementType: string) => {
    if (engagementType === 'strategic_analysis') {
      // Show compelling aspect demo first
      setCurrentView('aspect_demo');
      showCompellingAspect('immediate_rating', 'icp_analysis');
    } else {
      // Direct to specific compelling aspect
      setCurrentView('aspect_demo');  
      showCompellingAspect(engagementType);
    }
  };

  // Handle compelling aspect engagement
  const handleAspectEngagement = (aspectType: string, interactionData?: any) => {
    trackInteraction(getToolNameFromAspect(aspectType), 'aspect_engaged', interactionData);
    
    // Transition to focused tool experience
    setToolTransition(aspectType);
    setTimeout(() => {
      setCurrentView('tool_focus');
      setToolTransition(null);
    }, 500);
  };

  // Handle tool-specific interactions for progressive reveals
  const handleToolInteraction = (toolName: string, interactionType: string, data?: any) => {
    trackInteraction(toolName, interactionType, data);
  };

  // Handle tool completion and progression
  const handleToolProgression = (toolName: string, completionData: any) => {
    // Store completion data for integration
    setCompletedAnalysisData(prev => ({
      ...prev,
      [toolName]: completionData
    }));

    completeToolEngagement(toolName);
    
    // Notify parent component
    onToolCompletion?.(toolName, completionData);

    // Check if all tools completed for integration reveal
    if (canShowIntegration) {
      setCurrentView('integration');
    } else {
      // Return to welcome for next tool selection
      setCurrentView('welcome');
    }
  };

  // Handle advanced access unlock
  const handleAdvancedAccess = (capabilityName: string, accessData?: any) => {
    trackInteraction('advanced_methodologies', 'capability_accessed', {
      capability: capabilityName,
      ...accessData
    });

    // Could integrate with stealth gamification system here
    // to unlock advanced competency features
  };

  // Helper function to map aspect types to tool names
  const getToolNameFromAspect = (aspectType: string): string => {
    const aspectToTool: Record<string, string> = {
      'immediate_rating': 'icp_analysis',
      'financial_impact': 'cost_calculator', 
      'business_case': 'business_case'
    };
    return aspectToTool[aspectType] || 'unknown';
  };

  // Progress indicator (subtle, professional)
  const progressPercentage = getEngagementProgress();

  return (
    <div className="progressive-engagement-container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      {/* Subtle Progress Indicator */}
      <div className="progress-indicator fixed top-0 left-0 right-0 z-40">
        <motion.div
          className="progress-bar h-1 bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="container mx-auto px-6 py-8">
        
        {/* One Focus Rule Implementation - Only show one primary component at a time */}
        <AnimatePresence mode="wait">
          
          {/* Phase 1: Welcome Experience */}
          {currentView === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <WelcomeHero
                customerId={customerId}
                onStartEngagement={handleStartEngagement}
              />
            </motion.div>
          )}

          {/* Phase 2: Compelling Aspect Demo */}
          {currentView === 'aspect_demo' && currentAspect && (
            <motion.div
              key="aspect_demo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <CompellingAspectDemo
                aspectType={currentAspect}
                onEngageWith={handleAspectEngagement}
                customerId={customerId}
              />
            </motion.div>
          )}

          {/* Phase 3: Tool Focus Experience */}
          {currentView === 'tool_focus' && (
            <motion.div
              key="tool_focus"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              {/* Tool Transition Effect */}
              <AnimatePresence>
                {toolTransition && (
                  <motion.div
                    className="tool-transition-overlay fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">✨</div>
                      <div className="text-xl text-white font-semibold">
                        Preparing focused experience...
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Placeholder for Tool-Specific Focus Components */}
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Tool Focus: {engagementState.activeToolFocus}
                </h2>
                <p className="text-gray-300 mb-6">
                  Focused tool experience would be rendered here
                </p>
                <button
                  onClick={() => handleToolProgression(engagementState.activeToolFocus || 'tool', {})}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Complete Tool
                </button>
              </div>
            </motion.div>
          )}

          {/* Phase 4: Integration Reveal */}
          {currentView === 'integration' && canShowIntegration && (
            <motion.div
              key="integration"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <IntegratedIntelligenceReveal
                customerId={customerId}
                completedAnalysisData={completedAnalysisData}
                onAdvancedAccess={handleAdvancedAccess}
              />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Quick Tool Access (Subtle, contextual) */}
        {currentView !== 'welcome' && (
          <motion.div
            className="quick-access fixed bottom-8 right-8 z-30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.7, x: 0 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setCurrentView('welcome')}
              className="bg-gray-800/80 backdrop-blur-sm text-gray-300 hover:text-white p-3 rounded-full border border-gray-600/50 hover:border-gray-500 transition-all duration-200"
              title="Return to overview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* Engagement State Debug (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm text-xs text-gray-300 p-3 rounded-lg border border-gray-600/50 font-mono z-20">
            <div>Phase: {engagementState.currentPhase}</div>
            <div>View: {currentView}</div>
            <div>Tools: {engagementState.toolsCompleted.length}/3</div>
            <div>Progress: {progressPercentage}%</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressiveEngagementContainer;