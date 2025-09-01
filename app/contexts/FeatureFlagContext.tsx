'use client'

import React, { createContext, useContext } from 'react';

// TypeScript interfaces
interface FeatureFlagContextType {
  isFeatureEnabled: (featureKey: string) => boolean;
  isEnabled: (featureKey: string) => boolean;
}

const FeatureFlagContext = createContext<FeatureFlagContextType>({
  isFeatureEnabled: () => false,
  isEnabled: () => false
});

export const useFeatureFlags = () => {
  return useContext(FeatureFlagContext);
};

// Provider component
export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isFeatureEnabled = (featureKey: string) => {
    // Stub implementation - always return true for now
    return true;
  };

  const isEnabled = (featureKey: string) => {
    // Alias for isFeatureEnabled
    return isFeatureEnabled(featureKey);
  };

  return (
    <FeatureFlagContext.Provider value={{ isFeatureEnabled, isEnabled }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export default FeatureFlagContext;