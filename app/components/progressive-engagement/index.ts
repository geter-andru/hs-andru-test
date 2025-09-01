// Progressive Engagement System - Component Exports
// Phase 3F: Complete enterprise-grade progressive engagement system

// Core Progressive Engagement Components
export { default as ToolGuidanceWrapper } from './ToolGuidanceWrapper';
export { default as EnhancedTabNavigation } from './EnhancedTabNavigation';
export { default as ProgressiveToolAccess } from './ProgressiveToolAccess';
export { default as ValuePropositionCards } from './ValuePropositionCards';

// User Journey Components
export { default as OnboardingFlow } from './OnboardingFlow';
export { default as FeatureIntroductions } from './FeatureIntroductions';
export { default as InteractiveGuides } from './InteractiveGuides';

// Content & Information Management
export { default as ProgressiveDisclosure } from './ProgressiveDisclosure';

// Analytics & Tracking
export { default as EngagementTracking } from './EngagementTracking';
export { default as ConversionOptimization } from './ConversionOptimization';

// Achievement & Gamification
export { default as MilestoneUnlocking } from './MilestoneUnlocking';
export { default as CompetencyGating } from './CompetencyGating';

// Personalization & AI
export { default as PersonalizationEngine } from './PersonalizationEngine';

// Type Exports
export type {
  // ToolGuidanceWrapper types
  GuidanceStep,
  GuidanceType,
  GuidanceTrigger,
  GuidanceOptions,
} from './ToolGuidanceWrapper';

export type {
  // EnhancedTabNavigation types
  TabDefinition,
  TabState,
  UnlockCondition,
  TabTheme,
} from './EnhancedTabNavigation';

export type {
  // ProgressiveToolAccess types
  ToolStatus,
  CompetencyLevel,
  UnlockType,
  ToolDefinition,
  UserProgress as ToolAccessUserProgress,
} from './ProgressiveToolAccess';

export type {
  // ValuePropositionCards types
  ValueMetric,
  ValueFormat,
  CardVariant,
  CardSize,
  ValueCalculation,
  SocialProof,
  ValueProposition,
} from './ValuePropositionCards';

export type {
  // OnboardingFlow types
  StepType,
  StepStatus,
  ValidationResult,
  StepAction,
  OnboardingStep,
  OnboardingProgress,
} from './OnboardingFlow';

export type {
  // FeatureIntroductions types
  IntroductionType,
  TriggerType,
  Position,
  FeatureIntroduction,
  IntroductionProgress,
} from './FeatureIntroductions';

export type {
  // ProgressiveDisclosure types
  DisclosureLevel,
  RevealTrigger,
  ContentType,
  DisclosureVariant,
  ContentLayer,
  DisclosureSection,
  UserInteraction,
  DisclosureProgress,
} from './ProgressiveDisclosure';

export type {
  // EngagementTracking types
  EngagementEvent,
  EngagementLevel,
  UserSegment,
  ConversionStage,
  EngagementMetric,
  UserEvent,
  UserSession,
  UserProfile as EngagementUserProfile,
} from './EngagementTracking';

export type {
  // MilestoneUnlocking types
  MilestoneType,
  UnlockCondition as MilestoneUnlockCondition,
  RewardType,
  MilestoneStatus,
  MilestoneReward,
  MilestoneRequirement,
  Milestone,
  UserProgress as MilestoneUserProgress,
} from './MilestoneUnlocking';

export type {
  // CompetencyGating types
  CompetencyLevel as CompetencyGatingLevel,
  SkillDomain,
  AssessmentType,
  GatingStrategy,
  SkillMetric,
  CompetencyRequirement,
  GatedFeature,
  UserCompetencyProfile,
} from './CompetencyGating';

export type {
  // PersonalizationEngine types
  PersonalizationType,
  UserSegment as PersonalizationUserSegment,
  LearningModel,
  PersonalizationStrategy,
  UserPreference,
  BehaviorPattern,
  PersonalizationRule,
  UserProfile as PersonalizationUserProfile,
  PersonalizationResult,
} from './PersonalizationEngine';

export type {
  // InteractiveGuides types
  GuideType,
  GuidePosition,
  InteractionType,
  GuideStatus,
  GuideAction,
  GuideStep,
  GuideFlow,
  GuideProgress,
} from './InteractiveGuides';

export type {
  // ConversionOptimization types
  ConversionEvent as ConversionEventType,
  FunnelStage,
  OptimizationType,
  AttributionModel,
  ConversionGoal,
  ConversionFunnel,
  OptimizationExperiment,
  ConversionEvent,
  UserConversionProfile,
  ConversionMetrics,
} from './ConversionOptimization';

// Hook Exports
export { useToolGuidance } from './ToolGuidanceWrapper';
export { useTabNavigation } from './EnhancedTabNavigation';
export { useToolAccess } from './ProgressiveToolAccess';
export { useValuePropositions } from './ValuePropositionCards';
export { useOnboarding } from './OnboardingFlow';
export { useFeatureIntroductions } from './FeatureIntroductions';
export { useProgressiveDisclosure } from './ProgressiveDisclosure';
export { useEngagementTracking } from './EngagementTracking';
export { useMilestoneTracking } from './MilestoneUnlocking';
export { useCompetencyGating } from './CompetencyGating';
export { usePersonalization } from './PersonalizationEngine';
export { useInteractiveGuides } from './InteractiveGuides';
export { useConversionOptimization } from './ConversionOptimization';

// Higher-Order Components
export { withPersonalization } from './PersonalizationEngine';
export { withConversionTracking } from './ConversionOptimization';

// Context Exports
export { ToolAccessProvider } from './ProgressiveToolAccess';
export { ToolAccessProvider as ToolAccessContextProvider } from './ProgressiveToolAccess';

/**
 * Progressive Engagement System Overview
 * 
 * This system provides a comprehensive suite of components for creating
 * sophisticated user engagement experiences in modern web applications.
 * 
 * Key Features:
 * - 🎯 Progressive tool unlocking based on competency and achievements
 * - 📊 Real-time analytics and conversion optimization
 * - 🎮 Gamification with milestones and rewards
 * - 🤖 AI-powered personalization and recommendations
 * - 📚 Interactive guides and contextual help
 * - 🔄 A/B testing and experimentation framework
 * 
 * Component Categories:
 * 
 * 1. **Access Control & Navigation**
 *    - ProgressiveToolAccess: Competency-based feature gating
 *    - EnhancedTabNavigation: Progressive tab unlocking
 *    - CompetencyGating: Skill-based access control
 * 
 * 2. **User Journey & Onboarding**
 *    - OnboardingFlow: Multi-step user onboarding
 *    - FeatureIntroductions: Interactive feature discovery
 *    - InteractiveGuides: Step-by-step tutorials
 * 
 * 3. **Content & Information**
 *    - ProgressiveDisclosure: Layered information revelation
 *    - ValuePropositionCards: Dynamic value demonstration
 *    - ToolGuidanceWrapper: Contextual help system
 * 
 * 4. **Engagement & Gamification**
 *    - MilestoneUnlocking: Achievement-based progression
 *    - EngagementTracking: User behavior analytics
 *    - ConversionOptimization: Conversion funnel optimization
 * 
 * 5. **Personalization & AI**
 *    - PersonalizationEngine: ML-powered user experience adaptation
 * 
 * Usage Examples:
 * 
 * ```tsx
 * // Basic progressive tool access
 * import { ProgressiveToolAccess, useToolAccess } from './progressive-engagement';
 * 
 * function MyApp() {
 *   const { userProgress } = useToolAccess();
 *   
 *   return (
 *     <ProgressiveToolAccess
 *       tools={tools}
 *       userProgress={userProgress}
 *       onToolAccess={handleToolAccess}
 *     />
 *   );
 * }
 * 
 * // Personalization with conversion tracking
 * import { 
 *   PersonalizationEngine, 
 *   ConversionOptimization,
 *   withConversionTracking 
 * } from './progressive-engagement';
 * 
 * const OptimizedComponent = withConversionTracking(MyComponent, {
 *   event: 'feature_use',
 *   funnelId: 'main_funnel',
 *   goalId: 'feature_adoption'
 * });
 * 
 * function App() {
 *   return (
 *     <PersonalizationEngine userProfile={userProfile} rules={rules}>
 *       <ConversionOptimization funnels={funnels} experiments={experiments}>
 *         <OptimizedComponent />
 *       </ConversionOptimization>
 *     </PersonalizationEngine>
 *   );
 * }
 * ```
 * 
 * All components are built with:
 * - 🔒 TypeScript for type safety
 * - 🎬 Framer Motion for smooth animations
 * - 📱 Mobile-first responsive design
 * - ♿ WCAG 2.1 AA accessibility compliance
 * - 🎨 Consistent design system integration
 * - ⚡ Performance optimization
 * - 🧪 Built-in testing utilities
 */