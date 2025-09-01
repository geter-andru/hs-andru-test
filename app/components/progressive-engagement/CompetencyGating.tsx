'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CompetencyGating - Skill-based access control system
 * 
 * Features:
 * - Multi-dimensional competency assessment
 * - Skill-based feature gating and unlocking
 * - Adaptive learning path recommendations
 * - Competency verification and certification
 * - Progress tracking across skill domains
 * - Peer comparison and benchmarking
 * - Remediation and skill gap analysis
 * - Professional development planning
 */

export type CompetencyLevel = 'novice' | 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
export type SkillDomain = 'technical' | 'business' | 'communication' | 'leadership' | 'analytical' | 'creative' | 'domain_specific';
export type AssessmentType = 'self_assessment' | 'peer_review' | 'manager_review' | 'skills_test' | 'project_based' | 'certification' | 'ai_evaluation';
export type GatingStrategy = 'strict' | 'progressive' | 'adaptive' | 'collaborative' | 'time_based';

export interface SkillMetric {
  id: string;
  name: string;
  domain: SkillDomain;
  level: CompetencyLevel;
  score: number; // 0-100
  confidence: number; // 0-100
  lastAssessed: Date;
  assessmentType: AssessmentType;
  trend: 'improving' | 'stable' | 'declining';
  trendData: Array<{ date: Date; score: number }>;
  benchmarks: {
    industry: number;
    peer: number;
    role: number;
  };
  certifications?: Array<{
    name: string;
    issuer: string;
    date: Date;
    expiryDate?: Date;
    credentialId?: string;
  }>;
}

export interface CompetencyRequirement {
  id: string;
  skillId: string;
  minLevel: CompetencyLevel;
  minScore: number;
  weight: number; // Importance weighting 0-1
  critical: boolean; // Must meet this requirement
  description: string;
  justification?: string;
  alternatives?: string[]; // Alternative skills that can substitute
}

export interface GatedFeature {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  category: string;
  requirements: CompetencyRequirement[];
  strategy: GatingStrategy;
  unlockMessage?: string;
  remediationPlan?: {
    title: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
      estimatedTime: number;
      resources: string[];
    }>;
    estimatedDuration: number;
  };
  metadata?: {
    businessValue: 'low' | 'medium' | 'high' | 'critical';
    complexity: 'simple' | 'moderate' | 'complex' | 'expert';
    riskLevel: 'low' | 'medium' | 'high';
    userDemand: number;
    successRate: number;
  };
}

export interface UserCompetencyProfile {
  userId: string;
  overallLevel: CompetencyLevel;
  overallScore: number;
  skills: SkillMetric[];
  strengths: string[];
  developmentAreas: string[];
  careerGoals: string[];
  learningPreferences: {
    style: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    pace: 'self_paced' | 'structured' | 'intensive';
    format: 'online' | 'in_person' | 'hybrid';
  };
  assessmentHistory: Array<{
    date: Date;
    type: AssessmentType;
    skillId: string;
    score: number;
    assessor?: string;
    notes?: string;
  }>;
  developmentPlan: {
    goals: Array<{
      skillId: string;
      targetLevel: CompetencyLevel;
      targetScore: number;
      deadline: Date;
      priority: 'low' | 'medium' | 'high';
    }>;
    activities: Array<{
      title: string;
      type: 'course' | 'project' | 'mentoring' | 'practice' | 'certification';
      skillIds: string[];
      estimatedTime: number;
      status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
    }>;
  };
}

export interface CompetencyGatingProps {
  features: GatedFeature[];
  userProfile: UserCompetencyProfile;
  availableSkills: SkillMetric[];
  onFeatureRequest?: (feature: GatedFeature, missingRequirements: CompetencyRequirement[]) => void;
  onAssessmentRequest?: (skillId: string, type: AssessmentType) => void;
  onRemediationStart?: (feature: GatedFeature) => void;
  onProfileUpdate?: (profile: UserCompetencyProfile) => void;
  showRecommendations?: boolean;
  showBenchmarks?: boolean;
  enableSelfAssessment?: boolean;
  allowOverrides?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  'data-testid'?: string;
}

const CompetencyGating: React.FC<CompetencyGatingProps> = ({
  features,
  userProfile,
  availableSkills,
  onFeatureRequest,
  onAssessmentRequest,
  onRemediationStart,
  onProfileUpdate,
  showRecommendations = true,
  showBenchmarks = true,
  enableSelfAssessment = true,
  allowOverrides = false,
  theme = 'dark',
  className = '',
  'data-testid': testId
}) => {
  // State management
  const [selectedFeature, setSelectedFeature] = React.useState<GatedFeature | null>(null);
  const [showAssessmentModal, setShowAssessmentModal] = React.useState<string | null>(null);
  const [showDevelopmentPlan, setShowDevelopmentPlan] = React.useState(false);
  const [assessmentScores, setAssessmentScores] = React.useState<Record<string, number>>({});

  // Competency level values for calculations
  const levelValues: Record<CompetencyLevel, number> = {
    novice: 0,
    beginner: 20,
    intermediate: 40,
    advanced: 60,
    expert: 80,
    master: 100
  };

  // Get skill by ID
  const getSkill = React.useCallback((skillId: string): SkillMetric | undefined => {
    return userProfile.skills.find(skill => skill.id === skillId) || 
           availableSkills.find(skill => skill.id === skillId);
  }, [userProfile.skills, availableSkills]);

  // Check if user meets competency requirement
  const meetsRequirement = React.useCallback((requirement: CompetencyRequirement): boolean => {
    const skill = getSkill(requirement.skillId);
    if (!skill) return false;

    const levelMet = levelValues[skill.level] >= levelValues[requirement.minLevel];
    const scoreMet = skill.score >= requirement.minScore;

    return levelMet && scoreMet;
  }, [getSkill, levelValues]);

  // Check feature access
  const hasFeatureAccess = React.useCallback((feature: GatedFeature): boolean => {
    const { requirements, strategy } = feature;

    switch (strategy) {
      case 'strict':
        return requirements.every(req => meetsRequirement(req));
      
      case 'progressive':
        // Must meet all critical requirements + 70% of non-critical
        const criticalMet = requirements.filter(req => req.critical).every(req => meetsRequirement(req));
        const nonCritical = requirements.filter(req => !req.critical);
        const nonCriticalMet = nonCritical.filter(req => meetsRequirement(req)).length;
        return criticalMet && (nonCritical.length === 0 || nonCriticalMet / nonCritical.length >= 0.7);
      
      case 'adaptive':
        // Weighted scoring system
        const totalWeight = requirements.reduce((sum, req) => sum + req.weight, 0);
        const metWeight = requirements.reduce((sum, req) => {
          return sum + (meetsRequirement(req) ? req.weight : 0);
        }, 0);
        return metWeight / totalWeight >= 0.75;
      
      case 'collaborative':
        // Must meet 60% of requirements but can have peer assistance
        const metCount = requirements.filter(req => meetsRequirement(req)).length;
        return metCount / requirements.length >= 0.6;
      
      case 'time_based':
        // Requirements ease over time (not implemented in this example)
        return requirements.every(req => meetsRequirement(req));
      
      default:
        return requirements.every(req => meetsRequirement(req));
    }
  }, [meetsRequirement]);

  // Get missing requirements for a feature
  const getMissingRequirements = React.useCallback((feature: GatedFeature): CompetencyRequirement[] => {
    return feature.requirements.filter(req => !meetsRequirement(req));
  }, [meetsRequirement]);

  // Get skill gap analysis
  const getSkillGaps = React.useCallback((): Array<{ skill: SkillMetric; gap: number; priority: 'high' | 'medium' | 'low' }> => {
    const gaps = userProfile.skills.map(skill => {
      const benchmarkScore = Math.max(skill.benchmarks.industry, skill.benchmarks.peer, skill.benchmarks.role);
      const gap = benchmarkScore - skill.score;
      
      let priority: 'high' | 'medium' | 'low' = 'low';
      if (gap > 20) priority = 'high';
      else if (gap > 10) priority = 'medium';
      
      return { skill, gap, priority };
    }).filter(item => item.gap > 0);

    return gaps.sort((a, b) => b.gap - a.gap);
  }, [userProfile.skills]);

  // Get recommended features
  const getRecommendedFeatures = React.useCallback((): GatedFeature[] => {
    return features
      .filter(feature => !hasFeatureAccess(feature))
      .map(feature => {
        const missingReqs = getMissingRequirements(feature);
        const totalGap = missingReqs.reduce((sum, req) => {
          const skill = getSkill(req.skillId);
          const gap = skill ? Math.max(0, req.minScore - skill.score) : req.minScore;
          return sum + gap;
        }, 0);
        
        return { feature, totalGap, missingCount: missingReqs.length };
      })
      .sort((a, b) => a.totalGap - b.totalGap)
      .slice(0, 5)
      .map(item => item.feature);
  }, [features, hasFeatureAccess, getMissingRequirements, getSkill]);

  // Handle self-assessment
  const handleSelfAssessment = React.useCallback((skillId: string, score: number) => {
    setAssessmentScores(prev => ({ ...prev, [skillId]: score }));
    
    // Update user profile
    const updatedSkills = userProfile.skills.map(skill => {
      if (skill.id === skillId) {
        const newLevel = Object.entries(levelValues).find(([_, value]) => value <= score)?.[0] as CompetencyLevel || 'novice';
        return {
          ...skill,
          score,
          level: newLevel,
          lastAssessed: new Date(),
          assessmentType: 'self_assessment' as AssessmentType,
          trend: score > skill.score ? 'improving' as const : score < skill.score ? 'declining' as const : 'stable' as const
        };
      }
      return skill;
    });

    const updatedProfile = {
      ...userProfile,
      skills: updatedSkills,
      overallScore: Math.round(updatedSkills.reduce((sum, skill) => sum + skill.score, 0) / updatedSkills.length)
    };

    onProfileUpdate?.(updatedProfile);
  }, [userProfile, levelValues, onProfileUpdate]);

  // Get level color
  const getLevelColor = (level: CompetencyLevel) => {
    switch (level) {
      case 'novice': return 'text-red-400';
      case 'beginner': return 'text-orange-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-blue-400';
      case 'expert': return 'text-purple-400';
      case 'master': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  // Get domain icon
  const getDomainIcon = (domain: SkillDomain) => {
    switch (domain) {
      case 'technical':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" /></svg>;
      case 'business':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" /></svg>;
      case 'communication':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>;
      case 'leadership':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>;
      case 'analytical':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>;
      case 'creative':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" /></svg>;
      default:
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
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

  const skillGaps = getSkillGaps();
  const recommendedFeatures = showRecommendations ? getRecommendedFeatures() : [];

  return (
    <motion.div
      className={`space-y-8 ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      data-testid={testId}
    >
      {/* Competency overview */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Competency Profile</h2>
          <div className="text-right">
            <div className={`text-sm ${getLevelColor(userProfile.overallLevel)}`}>
              {userProfile.overallLevel.toUpperCase()}
            </div>
            <div className="text-2xl font-bold text-purple-400">{userProfile.overallScore}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {features.filter(f => hasFeatureAccess(f)).length}
            </div>
            <div className="text-sm text-gray-400">Accessible Features</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {userProfile.skills.filter(s => s.level === 'expert' || s.level === 'master').length}
            </div>
            <div className="text-sm text-gray-400">Expert Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {skillGaps.length}
            </div>
            <div className="text-sm text-gray-400">Skill Gaps</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {userProfile.developmentPlan.activities.filter(a => a.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-400">Completed Training</div>
          </div>
        </div>
      </div>

      {/* Skill gaps */}
      {skillGaps.length > 0 && (
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Priority Skill Gaps</h3>
          <div className="space-y-3">
            {skillGaps.slice(0, 5).map(({ skill, gap, priority }) => (
              <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-gray-400">
                    {getDomainIcon(skill.domain)}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{skill.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-400">
                        Score: {skill.score}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`
                    text-sm font-medium px-2 py-1 rounded
                    ${priority === 'high' ? 'bg-red-900/20 text-red-400' : 
                      priority === 'medium' ? 'bg-yellow-900/20 text-yellow-400' : 
                      'bg-blue-900/20 text-blue-400'
                    }
                  `}>
                    Gap: {gap} pts
                  </div>
                  {enableSelfAssessment && (
                    <button
                      onClick={() => setShowAssessmentModal(skill.id)}
                      className="mt-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Self Assess
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended features */}
      {recommendedFeatures.length > 0 && (
        <div className="bg-gray-800/20 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Recommended Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedFeatures.map((feature) => {
              const missingReqs = getMissingRequirements(feature);
              const totalGap = missingReqs.reduce((sum, req) => {
                const skill = getSkill(req.skillId);
                return sum + (skill ? Math.max(0, req.minScore - skill.score) : req.minScore);
              }, 0);
              
              return (
                <motion.div
                  key={feature.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="p-4 bg-gray-800 rounded-lg border border-gray-600 cursor-pointer"
                  onClick={() => setSelectedFeature(feature)}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    {feature.icon && <div className="text-xl">{feature.icon}</div>}
                    <h4 className="font-semibold text-white">{feature.name}</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {missingReqs.length} requirements to meet
                    </span>
                    <span className="text-sm font-medium text-purple-400">
                      {totalGap} point gap
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Gated features */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Feature Access</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const hasAccess = hasFeatureAccess(feature);
            const missingReqs = getMissingRequirements(feature);
            
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover="hover"
                className={`
                  relative p-6 rounded-xl border transition-all duration-200 cursor-pointer
                  ${hasAccess 
                    ? 'bg-green-900/20 border-green-600 text-green-300' 
                    : 'bg-gray-800 border-gray-600 text-white hover:border-gray-500'
                  }
                `}
                onClick={() => setSelectedFeature(feature)}
              >
                {/* Access indicator */}
                <div className="absolute top-4 right-4">
                  {hasAccess ? (
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Feature header */}
                <div className="flex items-center space-x-3 mb-4">
                  {feature.icon && (
                    <div className="text-2xl flex-shrink-0">
                      {feature.icon}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-lg">{feature.name}</h4>
                    <p className="text-sm text-gray-400">{feature.category}</p>
                  </div>
                </div>

                {/* Feature description */}
                <p className="text-sm mb-4 line-clamp-2">
                  {feature.description}
                </p>

                {/* Requirements summary */}
                {!hasAccess && missingReqs.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">Missing requirements:</p>
                    <div className="space-y-1">
                      {missingReqs.slice(0, 2).map((req) => {
                        const skill = getSkill(req.skillId);
                        return (
                          <div key={req.id} className="flex items-center justify-between text-xs">
                            <span className="text-gray-300">{skill?.name || 'Unknown skill'}</span>
                            <span className="text-red-400">
                              {skill?.score || 0} / {req.minScore}
                            </span>
                          </div>
                        );
                      })}
                      {missingReqs.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{missingReqs.length - 2} more...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Strategy indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 capitalize">
                    {feature.strategy} gating
                  </span>
                  {feature.metadata?.businessValue && (
                    <span className={`
                      text-xs px-2 py-1 rounded
                      ${feature.metadata.businessValue === 'critical' ? 'bg-red-900/20 text-red-400' :
                        feature.metadata.businessValue === 'high' ? 'bg-orange-900/20 text-orange-400' :
                        feature.metadata.businessValue === 'medium' ? 'bg-yellow-900/20 text-yellow-400' :
                        'bg-gray-700 text-gray-400'
                      }
                    `}>
                      {feature.metadata.businessValue} value
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                {!hasAccess && (
                  <div className="mt-4 space-y-2">
                    {feature.remediationPlan && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemediationStart?.(feature);
                        }}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors text-sm"
                      >
                        Start Development Plan
                      </button>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFeatureRequest?.(feature, missingReqs);
                      }}
                      className="w-full py-2 px-4 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      Request Access
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Self-assessment modal */}
      <AnimatePresence>
        {showAssessmentModal && enableSelfAssessment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAssessmentModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const skill = getSkill(showAssessmentModal);
                if (!skill) return null;

                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Self Assessment</h3>
                      <button
                        onClick={() => setShowAssessmentModal(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-2">{skill.name}</h4>
                      <p className="text-sm text-gray-300">
                        Current level: <span className={getLevelColor(skill.level)}>{skill.level}</span>
                      </p>
                      <p className="text-sm text-gray-400">Current score: {skill.score}</p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Rate your current skill level (0-100):
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={assessmentScores[skill.id] || skill.score}
                        onChange={(e) => setAssessmentScores(prev => ({
                          ...prev,
                          [skill.id]: parseInt(e.target.value)
                        }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Novice (0)</span>
                        <span className="font-bold text-white">
                          {assessmentScores[skill.id] || skill.score}
                        </span>
                        <span>Master (100)</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowAssessmentModal(null)}
                        className="flex-1 py-2 px-4 border border-gray-600 text-gray-300 font-medium rounded-lg transition-colors hover:border-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          handleSelfAssessment(skill.id, assessmentScores[skill.id] || skill.score);
                          setShowAssessmentModal(null);
                        }}
                        className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors"
                      >
                        Update Assessment
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature detail modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{selectedFeature.name}</h3>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-300 mb-6">{selectedFeature.description}</p>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Requirements</h4>
                <div className="space-y-2">
                  {selectedFeature.requirements.map((req) => {
                    const skill = getSkill(req.skillId);
                    const meets = meetsRequirement(req);
                    
                    return (
                      <div key={req.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {skill && (
                            <div className="text-gray-400">
                              {getDomainIcon(skill.domain)}
                            </div>
                          )}
                          <div>
                            <p className={`font-medium ${meets ? 'text-green-400' : 'text-white'}`}>
                              {skill?.name || 'Unknown skill'}
                            </p>
                            <p className="text-xs text-gray-400">{req.description}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {req.critical && (
                                <span className="text-xs bg-red-900/20 text-red-400 px-2 py-1 rounded">
                                  Critical
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                Weight: {Math.round(req.weight * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${meets ? 'text-green-400' : 'text-red-400'}`}>
                            {skill?.score || 0} / {req.minScore}
                          </div>
                          <div className="text-xs text-gray-400">
                            {skill?.level || 'Unknown'} / {req.minLevel}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Remediation plan */}
              {selectedFeature.remediationPlan && (
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Development Plan</h4>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h5 className="font-medium text-white mb-2">{selectedFeature.remediationPlan.title}</h5>
                    <p className="text-sm text-gray-300 mb-4">{selectedFeature.remediationPlan.description}</p>
                    
                    <div className="space-y-2">
                      {selectedFeature.remediationPlan.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3 p-2 bg-gray-700 rounded">
                          <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center mt-0.5">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-white text-sm">{step.title}</p>
                            <p className="text-xs text-gray-400">{step.description}</p>
                            <p className="text-xs text-purple-400 mt-1">~{step.estimatedTime}min</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-400">
                      Estimated duration: {selectedFeature.remediationPlan.estimatedDuration} hours
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Hook for competency management
export const useCompetencyGating = () => {
  const [userProfile, setUserProfile] = React.useState<UserCompetencyProfile | null>(null);
  const [features, setFeatures] = React.useState<GatedFeature[]>([]);

  const updateProfile = React.useCallback((updates: Partial<UserCompetencyProfile>) => {
    setUserProfile(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const addFeature = React.useCallback((feature: GatedFeature) => {
    setFeatures(prev => [...prev, feature]);
  }, []);

  const updateFeature = React.useCallback((id: string, updates: Partial<GatedFeature>) => {
    setFeatures(prev =>
      prev.map(feature => feature.id === id ? { ...feature, ...updates } : feature)
    );
  }, []);

  return {
    userProfile,
    features,
    setUserProfile,
    updateProfile,
    addFeature,
    updateFeature
  };
};

export default CompetencyGating;