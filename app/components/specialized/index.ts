// Phase 4: Specialized Features Components
export { default as NavigationControls } from './NavigationControls';
export { default as CompetencyProtectedRoute } from './CompetencyProtectedRoute';
export { default as ToolUnlockModal } from './ToolUnlockModal';
export { default as ICPDetailModal } from './ICPDetailModal';
export { default as PersonaDetailModal } from './PersonaDetailModal';
export { default as RealWorldActionTracker } from './RealWorldActionTracker';

// Type exports
export type { NavigationControlsProps } from './NavigationControls';
export type { CompetencyProtectedRouteProps, CompetencyAccessStatus, ToolConfig } from './CompetencyProtectedRoute';
export type { ToolUnlockModalProps, ToolConfig as UnlockToolConfig, ModalState } from './ToolUnlockModal';
export type { ICPDetailModalProps, Company, ProgressUpdate, SectionConfig, CompanyRatingCardProps } from './ICPDetailModal';
export type { PersonaDetailModalProps, ProgressUpdate as PersonaProgressUpdate, SectionConfig as PersonaSectionConfig, PracticeScenario, ScenariosContentProps } from './PersonaDetailModal';
export type { RealWorldActionTrackerProps, CompletedAction, ActionType, ImpactLevel, ProgressUpdate as TrackerProgressUpdate, CompetencyData, Statistics } from './RealWorldActionTracker';