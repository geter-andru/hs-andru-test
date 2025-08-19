// React Hook for Workflow Progress Management
import { useState, useEffect, useCallback } from 'react';
import AirtableWorkflowManager from '../utils/airtableWorkflow';

export const useWorkflowProgress = (customerId) => {
  const [workflowData, setWorkflowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toolStartTime, setToolStartTime] = useState(null);

  // Load initial workflow data
  const loadWorkflow = useCallback(async () => {
    if (!customerId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await AirtableWorkflowManager.loadCustomerWorkflow(customerId);
      setWorkflowData(data);
    } catch (err) {
      console.error('Failed to load workflow:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  // Update workflow progress
  const updateProgress = useCallback(async (progressUpdate) => {
    if (!customerId) return;
    
    try {
      await AirtableWorkflowManager.updateWorkflowProgress(customerId, progressUpdate);
      
      // Refresh local data
      setWorkflowData(prev => ({
        ...prev,
        workflowProgress: { ...prev.workflowProgress, ...progressUpdate }
      }));
    } catch (err) {
      console.error('Failed to update progress:', err);
      setError(err.message);
    }
  }, [customerId]);

  // Complete a tool workflow
  const completeTool = useCallback(async (toolName, toolData = {}) => {
    if (!customerId) return;
    
    try {
      // Track time spent if tool was started
      if (toolStartTime) {
        const timeSpent = Math.round((Date.now() - toolStartTime) / 1000); // in seconds
        await AirtableWorkflowManager.trackToolTime(customerId, toolName, timeSpent);
        setToolStartTime(null);
      }
      
      // Complete the tool
      await AirtableWorkflowManager.completeToolWorkflow(customerId, toolName, toolData);
      
      // Refresh workflow data
      await loadWorkflow();
      
      return { success: true };
    } catch (err) {
      console.error('Failed to complete tool:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [customerId, toolStartTime, loadWorkflow]);

  // Start tool timer
  const startTool = useCallback((toolName) => {
    setToolStartTime(Date.now());
    updateProgress({ last_active_tool: toolName });
  }, [updateProgress]);

  // Update user preferences
  const updatePreferences = useCallback(async (preferencesUpdate) => {
    if (!customerId) return;
    
    try {
      await AirtableWorkflowManager.updateUserPreferences(customerId, preferencesUpdate);
      
      setWorkflowData(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, ...preferencesUpdate }
      }));
    } catch (err) {
      console.error('Failed to update preferences:', err);
      setError(err.message);
    }
  }, [customerId]);

  // Track export
  const trackExport = useCallback(async (exportType, format) => {
    if (!customerId) return;
    
    try {
      await AirtableWorkflowManager.trackExport(customerId, exportType, format);
      await loadWorkflow(); // Refresh to get updated export history
    } catch (err) {
      console.error('Failed to track export:', err);
      setError(err.message);
    }
  }, [customerId, loadWorkflow]);

  // Get workflow status for navigation
  const getWorkflowStatus = useCallback(() => {
    if (!workflowData) return null;
    return AirtableWorkflowManager.getWorkflowStatus(workflowData.workflowProgress);
  }, [workflowData]);

  // Initialize workflow on mount
  useEffect(() => {
    if (customerId) {
      loadWorkflow();
    }
  }, [loadWorkflow, customerId]);

  // Initialize customer workflow if needed
  const initializeWorkflow = useCallback(async () => {
    if (!customerId) return;
    
    try {
      await AirtableWorkflowManager.initializeCustomerWorkflow(customerId);
      await loadWorkflow();
    } catch (err) {
      console.error('Failed to initialize workflow:', err);
      setError(err.message);
    }
  }, [customerId, loadWorkflow]);

  return {
    // Data
    workflowData,
    workflowProgress: workflowData?.workflowProgress,
    userPreferences: workflowData?.userPreferences,
    usageAnalytics: workflowData?.usageAnalytics,
    customerData: workflowData?.customerData,
    
    // Status
    loading,
    error,
    workflowStatus: getWorkflowStatus(),
    
    // Actions
    updateProgress,
    completeTool,
    startTool,
    updatePreferences,
    trackExport,
    loadWorkflow,
    initializeWorkflow,
    
    // Helper methods
    clearError: () => setError(null),
    refreshWorkflow: loadWorkflow
  };
};