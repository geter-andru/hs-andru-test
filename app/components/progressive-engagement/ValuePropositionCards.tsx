'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * ValuePropositionCards - Value demonstration cards system
 * 
 * Features:
 * - Dynamic value proposition display
 * - ROI calculations and projections
 * - Interactive value discovery
 * - Personalized recommendations
 * - A/B testing support
 * - Conversion tracking
 * - Social proof integration
 * - Mobile-responsive design
 */

export type ValueMetric = 'time' | 'cost' | 'revenue' | 'efficiency' | 'risk' | 'satisfaction';
export type ValueFormat = 'currency' | 'percentage' | 'hours' | 'days' | 'multiplier' | 'score';
export type CardVariant = 'primary' | 'secondary' | 'highlight' | 'minimal' | 'detailed';
export type CardSize = 'small' | 'medium' | 'large';

export interface ValueCalculation {
  metric: ValueMetric;
  format: ValueFormat;
  current: number;
  improved: number;
  period: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
  confidence: number;
  source: string;
}

export interface SocialProof {
  type: 'testimonial' | 'statistic' | 'case_study' | 'award' | 'certification';
  content: string;
  attribution?: string;
  avatar?: string;
  company?: string;
  role?: string;
  verified?: boolean;
}

export interface ValueProposition {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  calculations: ValueCalculation[];
  socialProof?: SocialProof[];
  features: string[];
  benefits: string[];
  callToAction: {
    primary: string;
    secondary?: string;
  };
  tags: string[];
  priority: number;
  targetAudience?: string[];
  personalizedFor?: string;
}

export interface ValuePropositionCardsProps {
  propositions: ValueProposition[];
  onCardClick?: (proposition: ValueProposition) => void;
  onCTAClick?: (proposition: ValueProposition, ctaType: 'primary' | 'secondary') => void;
  variant?: CardVariant;
  size?: CardSize;
  showCalculations?: boolean;
  showSocialProof?: boolean;
  maxCards?: number;
  sortByValue?: boolean;
  personalizeFor?: string;
  trackInteractions?: boolean;
  className?: string;
  'data-testid'?: string;
}

const ValuePropositionCards: React.FC<ValuePropositionCardsProps> = ({
  propositions,
  onCardClick,
  onCTAClick,
  variant = 'primary',
  size = 'medium',
  showCalculations = true,
  showSocialProof = true,
  maxCards = 6,
  sortByValue = true,
  personalizeFor,
  trackInteractions = false,
  className = '',
  'data-testid': testId
}) => {
  // Format value calculations
  const formatValue = (calculation: ValueCalculation): string => {
    const { format, improved, current } = calculation;
    const difference = improved - current;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(Math.abs(difference));
      case 'percentage':
        const percentChange = ((improved - current) / current) * 100;
        return `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`;
      case 'hours':
        return `${Math.abs(difference).toFixed(1)} hours`;
      case 'days':
        return `${Math.abs(difference).toFixed(1)} days`;
      case 'multiplier':
        const multiplier = improved / current;
        return `${multiplier.toFixed(1)}x`;
      case 'score':
        return `${Math.abs(difference).toFixed(1)} points`;
      default:
        return Math.abs(difference).toFixed(1);
    }
  };

  // Calculate total value impact
  const calculateTotalValue = (proposition: ValueProposition): number => {
    return proposition.calculations.reduce((total, calc) => {
      const impact = Math.abs(calc.improved - calc.current);
      const weight = calc.confidence / 100;
      
      // Normalize different metrics to comparable scale
      let normalizedImpact = impact;
      if (calc.format === 'currency') {
        normalizedImpact = impact / 1000; // Scale down currency
      } else if (calc.format === 'percentage') {
        normalizedImpact = impact * 10; // Scale up percentages
      }
      
      return total + (normalizedImpact * weight);
    }, 0);
  };

  // Filter and sort propositions
  const filteredPropositions = React.useMemo(() => {
    let filtered = propositions;

    // Filter by personalization
    if (personalizeFor) {
      filtered = filtered.filter(prop => 
        !prop.targetAudience || 
        prop.targetAudience.includes(personalizeFor) ||
        prop.personalizedFor === personalizeFor
      );
    }

    // Sort by value if requested
    if (sortByValue) {
      filtered = filtered.sort((a, b) => {
        const valueA = calculateTotalValue(a);
        const valueB = calculateTotalValue(b);
        return valueB - valueA; // Descending order
      });
    } else {
      // Sort by priority
      filtered = filtered.sort((a, b) => b.priority - a.priority);
    }

    // Limit number of cards
    return filtered.slice(0, maxCards);
  }, [propositions, personalizeFor, sortByValue, maxCards]);

  // Handle interactions
  const handleCardClick = (proposition: ValueProposition) => {
    if (trackInteractions) {
      // Track card view
      console.log(`Value card viewed: ${proposition.id}`);
    }
    onCardClick?.(proposition);
  };

  const handleCTAClick = (e: React.MouseEvent, proposition: ValueProposition, ctaType: 'primary' | 'secondary') => {
    e.stopPropagation();
    if (trackInteractions) {
      // Track CTA click
      console.log(`Value CTA clicked: ${proposition.id} - ${ctaType}`);
    }
    onCTAClick?.(proposition, ctaType);
  };

  // Card styling variants
  const getCardClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300 cursor-pointer';
    
    const variantClasses = {
      primary: 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500',
      secondary: 'bg-gray-800 border border-gray-600 hover:border-gray-500',
      highlight: 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500 shadow-lg',
      minimal: 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800',
      detailed: 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600'
    };

    const sizeClasses = {
      small: 'p-4 rounded-lg',
      medium: 'p-6 rounded-xl',
      large: 'p-8 rounded-2xl'
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };

  const valueVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: 0.3
      }
    }
  };

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      data-testid={testId}
    >
      {filteredPropositions.map((proposition, index) => (
        <motion.div
          key={proposition.id}
          variants={cardVariants}
          whileHover="hover"
          className={getCardClasses()}
          onClick={() => handleCardClick(proposition)}
          data-testid={`value-card-${proposition.id}`}
        >
          {/* Card header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {proposition.icon && (
                <div className="flex-shrink-0 text-2xl">
                  {proposition.icon}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {proposition.title}
                </h3>
                {proposition.subtitle && (
                  <p className="text-sm text-purple-300">
                    {proposition.subtitle}
                  </p>
                )}
              </div>
            </div>
            {proposition.personalizedFor && (
              <div className="flex-shrink-0">
                <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                  Personalized
                </span>
              </div>
            )}
          </div>

          {/* Hero image */}
          {proposition.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={proposition.image}
                alt={proposition.title}
                className="w-full h-32 object-cover"
              />
            </div>
          )}

          {/* Description */}
          <p className="text-gray-300 mb-6 line-clamp-3">
            {proposition.description}
          </p>

          {/* Value calculations */}
          {showCalculations && proposition.calculations.length > 0 && (
            <div className="mb-6 space-y-3">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Value Impact
              </h4>
              {proposition.calculations.slice(0, 3).map((calc, calcIndex) => (
                <motion.div
                  key={calcIndex}
                  variants={valueVariants}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                >
                  <div>
                    <p className="text-sm text-gray-300 capitalize">
                      {calc.metric} Improvement
                    </p>
                    <p className="text-xs text-gray-500">
                      Per {calc.period} • {calc.confidence}% confidence
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">
                      {calc.improved > calc.current ? '+' : ''}{formatValue(calc)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Key benefits */}
          {proposition.benefits.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Key Benefits
              </h4>
              <ul className="space-y-1">
                {proposition.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 flex-shrink-0"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social proof */}
          {showSocialProof && proposition.socialProof && proposition.socialProof.length > 0 && (
            <div className="mb-6">
              {proposition.socialProof.slice(0, 1).map((proof, proofIndex) => (
                <div key={proofIndex} className="bg-gray-800/30 p-3 rounded-lg">
                  {proof.type === 'testimonial' && (
                    <div>
                      <p className="text-sm text-gray-300 italic mb-2">
                        "{proof.content}"
                      </p>
                      {proof.attribution && (
                        <div className="flex items-center space-x-2">
                          {proof.avatar && (
                            <img
                              src={proof.avatar}
                              alt={proof.attribution}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <div>
                            <p className="text-xs text-gray-400">
                              {proof.attribution}
                            </p>
                            {proof.company && (
                              <p className="text-xs text-gray-500">
                                {proof.role} at {proof.company}
                              </p>
                            )}
                          </div>
                          {proof.verified && (
                            <div className="text-blue-400">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {proof.type === 'statistic' && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {proof.content}
                      </div>
                      {proof.attribution && (
                        <p className="text-xs text-gray-400">
                          {proof.attribution}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {proposition.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-1">
              {proposition.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Call to action */}
          <div className="space-y-3">
            <button
              onClick={(e) => handleCTAClick(e, proposition, 'primary')}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {proposition.callToAction.primary}
            </button>
            {proposition.callToAction.secondary && (
              <button
                onClick={(e) => handleCTAClick(e, proposition, 'secondary')}
                className="w-full py-2 px-4 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-colors duration-200"
              >
                {proposition.callToAction.secondary}
              </button>
            )}
          </div>

          {/* Priority indicator */}
          {proposition.priority > 8 && (
            <div className="absolute top-4 right-4">
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Priority
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Hook for value proposition management
export const useValuePropositions = () => {
  const [propositions, setPropositions] = React.useState<ValueProposition[]>([]);
  const [personalizedFor, setPersonalizedFor] = React.useState<string>('');
  const [interactions, setInteractions] = React.useState<Record<string, number>>({});

  const addProposition = React.useCallback((proposition: ValueProposition) => {
    setPropositions(prev => [...prev, proposition]);
  }, []);

  const removeProposition = React.useCallback((id: string) => {
    setPropositions(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateProposition = React.useCallback((id: string, updates: Partial<ValueProposition>) => {
    setPropositions(prev => 
      prev.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  }, []);

  const trackInteraction = React.useCallback((propositionId: string) => {
    setInteractions(prev => ({
      ...prev,
      [propositionId]: (prev[propositionId] || 0) + 1
    }));
  }, []);

  const getTopPerformingPropositions = React.useCallback((limit = 5) => {
    return [...propositions]
      .sort((a, b) => (interactions[b.id] || 0) - (interactions[a.id] || 0))
      .slice(0, limit);
  }, [propositions, interactions]);

  return {
    propositions,
    personalizedFor,
    interactions,
    setPersonalizedFor,
    addProposition,
    removeProposition,
    updateProposition,
    trackInteraction,
    getTopPerformingPropositions
  };
};

export default ValuePropositionCards;