// Cost-Business-Case Feature - Barrel Exports
// Preserves all original functionality and dependencies

// Cost Calculator Components
export { default as CostCalculatorForm } from './cost-calculator/CostCalculatorForm';
export { default as CostHistory } from './cost-calculator/CostHistory';
export { default as CostResults } from './cost-calculator/CostResults';
export { default as SimplifiedCostCalculator } from './cost-calculator/SimplifiedCostCalculator';

// Business Case Components
export { default as SimplifiedBusinessCaseBuilder } from './business-case/SimplifiedBusinessCaseBuilder';

// Re-export types if any are defined in the components
export type * from './cost-calculator/CostCalculatorForm';
export type * from './cost-calculator/CostResults';
export type * from './business-case/SimplifiedBusinessCaseBuilder';