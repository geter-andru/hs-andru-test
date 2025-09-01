'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Unlock, Award, TrendingUp, Star, ChevronRight, Sparkles } from 'lucide-react';

interface ToolConfig {
  name: string;
  icon: string;
  level: string;
  levelBadge: string;
  color: string;
  competency: string;
  achievement: string;
  description: string;
  capabilities: string[];
  professionalMessage: string;
  nextStep: string;
  celebrationMessage: string;
}

interface ToolUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedTool: string;
  competencyAchieved?: string;
  onNavigateToTool?: (tool: string) => void;
  className?: string;
}

interface ModalState {
  isOpen: boolean;
  unlockedTool: string | null;
  competencyAchieved: string | null;
}

const ToolUnlockModal: React.FC<ToolUnlockModalProps> = ({ 
  isOpen, 
  onClose, 
  unlockedTool, 
  competencyAchieved,
  onNavigateToTool,
  className = '' 
}) => {
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'visible'>('entering');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti animation (using CSS animations since canvas-confetti is external)
      const triggerCelebration = () => {
        // Create celebration effect with CSS animations
        const celebrationDuration = 2000;
        
        setTimeout(() => {
          setAnimationPhase('visible');
          setShowContent(true);
        }, 300);

        return () => {
          // Cleanup celebration effects if needed
        };
      };

      setAnimationPhase('entering');
      setShowContent(false);
      
      const cleanup = triggerCelebration();
      
      return cleanup;
    }
  }, [isOpen]);

  if (!isOpen || !unlockedTool) return null;

  const getToolConfig = (): ToolConfig => {
    const configs: Record<string, ToolConfig> = {
      'cost-calculator': {
        name: 'Cost of Inaction Calculator',
        icon: '📊',
        level: 'Developing Level',
        levelBadge: 'Level 2',
        color: 'green',
        competency: 'Value Quantification',
        achievement: 'Customer Analysis Foundation Mastered',
        description: 'Advanced revenue impact analysis methodology now accessible',
        capabilities: [
          'Multi-scenario cost modeling',
          'Risk-adjusted impact calculations', 
          'Competitive positioning analysis',
          'Executive summary generation'
        ],
        professionalMessage: 'Your demonstrated customer analysis proficiency qualifies you for advanced value articulation methodologies.',
        nextStep: 'Begin quantifying business impact with sophisticated financial modeling tools.',
        celebrationMessage: 'Outstanding Professional Achievement!'
      },
      'business-case': {
        name: 'Business Case Builder',
        icon: '📋',
        level: 'Proficient Level',
        levelBadge: 'Level 3',
        color: 'purple',
        competency: 'Strategic Development',
        achievement: 'Value Articulation Mastery Achieved',
        description: 'Executive strategic development framework now accessible',
        capabilities: [
          'Comprehensive business case templates',
          'ROI projection modeling',
          'Risk mitigation frameworks',
          'Implementation roadmap generation'
        ],
        professionalMessage: 'Your proven value quantification expertise enables access to executive-level strategic development tools.',
        nextStep: 'Create comprehensive business cases with pilot-to-contract progression frameworks.',
        celebrationMessage: 'Exceptional Strategic Competency!'
      }
    };
    return configs[unlockedTool] || configs['cost-calculator'];
  };

  const toolConfig = getToolConfig();

  const handleNavigate = () => {
    if (onNavigateToTool) {
      onNavigateToTool(unlockedTool);
    }
    onClose();
  };

  const getColorClasses = (color: string) => {
    const colorMaps = {
      green: {
        border: 'border-green-600',
        gradient: 'from-green-600 to-green-500',
        bg: 'from-green-900/80 to-green-800/80',
        text: 'text-green-400',
        bgSecondary: 'bg-green-900/20',
        borderSecondary: 'border-green-700',
        button: 'from-green-600 to-green-500 hover:from-green-700 hover:to-green-600'
      },
      purple: {
        border: 'border-purple-600',
        gradient: 'from-purple-600 to-purple-500', 
        bg: 'from-purple-900/80 to-purple-800/80',
        text: 'text-purple-400',
        bgSecondary: 'bg-purple-900/20',
        borderSecondary: 'border-purple-700',
        button: 'from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600'
      }
    };
    return colorMaps[color as keyof typeof colorMaps] || colorMaps.green;
  };

  const colors = getColorClasses(toolConfig.color);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${className}`}>
        <div 
          className={`bg-gray-900 border-2 ${colors.border} rounded-xl shadow-2xl max-w-2xl w-full transform transition-all duration-500 ${
            animationPhase === 'entering' ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="unlock-modal-title"
        >
          {/* Glowing Border Effect */}
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.gradient} opacity-20 blur-xl`} />

          {/* Content Container */}
          <div className="relative">
            {/* Header with Gradient */}
            <div className={`bg-gradient-to-r ${colors.bg} rounded-t-xl border-b border-gray-700 p-6`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Achievement Badge */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className={`w-24 h-24 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center shadow-lg animate-pulse`}>
                    <div className="text-4xl" role="img" aria-label={toolConfig.name}>
                      {toolConfig.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                  </div>
                </div>
              </div>

              {/* Celebration Message */}
              <div className="text-center">
                <h2 id="unlock-modal-title" className="text-2xl font-bold text-white mb-2">
                  {toolConfig.celebrationMessage}
                </h2>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-lg font-semibold text-yellow-400">
                    {toolConfig.achievement}
                  </span>
                </div>
                <p className={`${colors.text} font-medium`}>
                  {toolConfig.competency} Competency Unlocked
                </p>
              </div>
            </div>

            {/* Body Content */}
            {showContent && (
              <div className="p-6 space-y-6">
                {/* Unlock Announcement */}
                <div className={`${colors.bgSecondary} border ${colors.borderSecondary} rounded-lg p-4`}>
                  <div className="flex items-center space-x-3">
                    <Unlock className={`w-6 h-6 ${colors.text}`} />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {toolConfig.name} Now Available
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {toolConfig.description}
                      </p>
                    </div>
                    <div className={`px-3 py-1 ${colors.bgSecondary} border ${colors.borderSecondary} rounded-full`}>
                      <span className={`text-sm font-semibold ${colors.text}`}>
                        {toolConfig.levelBadge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Professional Rationale */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-300 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
                    Professional Development Achievement
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {toolConfig.professionalMessage}
                  </p>
                </div>

                {/* New Capabilities */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    New Methodologies Available
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {toolConfig.capabilities.map((capability, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <ChevronRight className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                        <p className="text-sm text-gray-400">{capability}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">
                    Recommended Next Steps
                  </h4>
                  <p className="text-blue-200 text-sm">
                    {toolConfig.nextStep}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleNavigate}
                    className={`flex-1 py-3 px-4 bg-gradient-to-r ${colors.button} text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 min-h-[44px] touch-manipulation`}
                    aria-label={`Access ${toolConfig.name}`}
                  >
                    <span>Access {toolConfig.name}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 disabled:cursor-not-allowed text-gray-300 font-medium rounded-lg transition-colors duration-200 min-h-[44px] touch-manipulation"
                    aria-label="Continue later"
                  >
                    Continue Later
                  </button>
                </div>

                {/* Professional Note */}
                <div className="text-center pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    This achievement reflects your professional development in {toolConfig.competency.toLowerCase()}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Hook for managing unlock modal
export const useToolUnlockModal = () => {
  const router = useRouter();
  
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    unlockedTool: null,
    competencyAchieved: null
  });

  const showUnlockModal = (tool: string, competency?: string) => {
    setModalState({
      isOpen: true,
      unlockedTool: tool,
      competencyAchieved: competency || null
    });
  };

  const hideModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  const navigateToTool = (tool: string) => {
    // Extract customer ID from current path
    const currentPath = window.location.pathname;
    const customerMatch = currentPath.match(/\/customer\/([^\/]+)/);
    const customerId = customerMatch ? customerMatch[1] : 'default';
    
    // Navigate to the unlocked tool
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const toolPath = `/customer/${customerId}/dashboard/${tool}${token ? `?token=${token}` : ''}`;
    
    router.push(toolPath);
  };

  return {
    modalState,
    showUnlockModal,
    hideModal,
    navigateToTool
  };
};

export default ToolUnlockModal;
export type { ToolUnlockModalProps, ToolConfig, ModalState };