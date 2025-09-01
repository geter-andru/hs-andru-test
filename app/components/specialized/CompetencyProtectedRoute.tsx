'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Lock, AlertTriangle, Target, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

interface CompetencyAccessStatus {
  hasAccess: boolean;
  reason?: string;
  progress?: {
    required: number;
    completed: number;
    nextRequirement?: string;
  };
}

interface CompetencyProtectedRouteProps {
  children: React.ReactNode;
  requiredTool: string;
  className?: string;
}

interface ToolConfig {
  name: string;
  icon: string;
  level: string;
  competency: string;
  description: string;
  foundationTool: string;
  foundationRoute: string;
}

interface CompetencyRequirementMessageProps {
  accessStatus: CompetencyAccessStatus;
  requiredTool: string;
  customerId: string;
}

const CompetencyProtectedRoute: React.FC<CompetencyProtectedRouteProps> = ({ 
  children, 
  requiredTool, 
  className = '' 
}) => {
  const router = useRouter();
  const params = useParams();
  const customerId = params?.customerId as string;
  
  const [accessStatus, setAccessStatus] = useState<CompetencyAccessStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      if (!customerId || !requiredTool) {
        setError('Missing required parameters');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Mock competency service for development
        // In production, replace with actual competency service
        const mockToolAccess = await getMockToolAccessStatus(customerId, requiredTool);
        
        if (mockToolAccess) {
          setAccessStatus(mockToolAccess);
        } else {
          setError('Unable to validate access');
        }
      } catch (err) {
        console.error('Error checking competency access:', err);
        setError('Access validation failed');
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [customerId, requiredTool]);

  // Loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <LoadingSpinner message="Validating methodology access..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="max-w-md w-full text-center">
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Access Validation Error</h3>
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Access granted
  if (accessStatus?.hasAccess) {
    return <div className={className}>{children}</div>;
  }

  // Access denied - show competency requirement
  return (
    <div className={className}>
      <CompetencyRequirementMessage 
        accessStatus={accessStatus!} 
        requiredTool={requiredTool}
        customerId={customerId}
      />
    </div>
  );
};

const CompetencyRequirementMessage: React.FC<CompetencyRequirementMessageProps> = ({ 
  accessStatus, 
  requiredTool,
  customerId
}) => {
  const router = useRouter();

  const getToolConfig = (toolName: string): ToolConfig => {
    const configs: Record<string, ToolConfig> = {
      'cost-calculator': {
        name: 'Cost of Inaction Calculator',
        icon: '📊',
        level: 'Developing Level',
        competency: 'Value Quantification',
        description: 'Advanced revenue impact analysis methodology',
        foundationTool: 'ICP Analysis',
        foundationRoute: 'icp'
      },
      'business-case': {
        name: 'Business Case Builder',
        icon: '📋',
        level: 'Proficient Level',
        competency: 'Strategic Development',
        description: 'Executive business case development framework',
        foundationTool: 'Cost Calculator',
        foundationRoute: 'cost-calculator'
      }
    };
    return configs[toolName] || configs['cost-calculator'];
  };

  const toolConfig = getToolConfig(requiredTool);
  const progress = accessStatus?.progress || { required: 0, completed: 0 };
  const progressPercent = progress.required > 0 ? (progress.completed / progress.required) * 100 : 0;

  const handleFoundationNavigation = () => {
    router.push(`/customer/${customerId}/dashboard/${toolConfig.foundationRoute}`);
  };

  const handleReturnToFoundation = () => {
    router.push(`/customer/${customerId}/dashboard/icp`);
  };

  return (
    <div className="flex items-center justify-center min-h-[600px] p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 border-b border-gray-700 p-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{toolConfig.icon}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {toolConfig.name}
                </h2>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">
                    {toolConfig.level} • {toolConfig.competency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Professional Rationale */}
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">
                    Methodology Access Framework
                  </h3>
                  <p className="text-blue-200 leading-relaxed mb-3">
                    {toolConfig.description} requires demonstrated competency in foundational methodologies to ensure effective utilization and optimal results.
                  </p>
                  <div className="text-sm text-blue-300">
                    <strong>Professional Rationale:</strong> {accessStatus?.reason || 'Foundation competency development required'}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Requirements */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Competency Development Progress
              </h4>
              
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Progress to Access</span>
                  <span className="text-white font-semibold">
                    {progress.completed}/{progress.required} completed
                  </span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  />
                </div>
                
                {progress.nextRequirement && (
                  <p className="text-sm text-gray-400">
                    <strong>Next Step:</strong> {progress.nextRequirement}
                  </p>
                )}
              </div>
            </div>

            {/* Action Guidance */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleFoundationNavigation}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 min-h-[44px] touch-manipulation"
                aria-label={`Continue with ${toolConfig.foundationTool}`}
              >
                <span>Continue with {toolConfig.foundationTool}</span>
                <Target className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleReturnToFoundation}
                className="flex-1 py-3 px-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 disabled:cursor-not-allowed text-gray-300 font-medium rounded-lg transition-colors duration-200 min-h-[44px] touch-manipulation"
                aria-label="Return to foundation tools"
              >
                Return to Foundation
              </button>
            </div>

            {/* Professional Development Note */}
            <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-400">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-400 text-lg">💡</div>
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-1">
                    Professional Development Approach
                  </h5>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    This systematic methodology progression ensures mastery of each business analysis component, 
                    building expertise that translates to more effective strategic outcomes and executive engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock service for development - replace with actual service
const getMockToolAccessStatus = async (customerId: string, requiredTool: string): Promise<CompetencyAccessStatus> => {
  // Admin bypass for development
  if (customerId === 'dru78DR9789SDF862') {
    return {
      hasAccess: true,
      reason: 'Admin access granted'
    };
  }

  // Mock competency logic
  const mockProgress = {
    'cost-calculator': {
      hasAccess: false,
      reason: 'Complete ICP Analysis methodology development to unlock advanced value quantification tools',
      progress: {
        required: 3,
        completed: 1,
        nextRequirement: 'Complete comprehensive ICP analysis session'
      }
    },
    'business-case': {
      hasAccess: false,
      reason: 'Master Cost Calculator methodology to access executive business case development',
      progress: {
        required: 5,
        completed: 2,
        nextRequirement: 'Complete cost impact analysis session'
      }
    }
  };

  return mockProgress[requiredTool] || {
    hasAccess: false,
    reason: 'Foundation competency development required'
  };
};

export default CompetencyProtectedRoute;
export type { CompetencyProtectedRouteProps, CompetencyAccessStatus, ToolConfig };