'use client';

import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertCircle, Clock, Target, TrendingUp } from 'lucide-react';

interface ReadinessArea {
  id: string;
  name: string;
  status: 'ready' | 'needs_improvement' | 'not_ready';
  score: number;
  requirements: ReadinessRequirement[];
}

interface ReadinessRequirement {
  id: string;
  name: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface CompetencyReadinessProps {
  customerId?: string;
  competencyData?: any;
  onReadinessUpdate?: (readiness: ReadinessArea[]) => void;
}

const CompetencyReadiness: React.FC<CompetencyReadinessProps> = ({
  customerId,
  competencyData,
  onReadinessUpdate
}) => {
  const [readinessAreas, setReadinessAreas] = useState<ReadinessArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize readiness assessment
    const mockReadiness: ReadinessArea[] = [
      {
        id: 'sales_readiness',
        name: 'Sales Readiness',
        status: 'needs_improvement',
        score: 65,
        requirements: [
          { id: 'value_prop', name: 'Clear Value Proposition', completed: true, priority: 'high' },
          { id: 'sales_process', name: 'Defined Sales Process', completed: false, priority: 'high' },
          { id: 'objection_handling', name: 'Objection Handling Framework', completed: false, priority: 'medium' },
          { id: 'competitive_analysis', name: 'Competitive Analysis', completed: true, priority: 'medium' }
        ]
      },
      {
        id: 'market_readiness',
        name: 'Market Readiness',
        status: 'ready',
        score: 85,
        requirements: [
          { id: 'market_research', name: 'Market Research Complete', completed: true, priority: 'high' },
          { id: 'target_segments', name: 'Target Segments Defined', completed: true, priority: 'high' },
          { id: 'pricing_strategy', name: 'Pricing Strategy', completed: true, priority: 'medium' },
          { id: 'go_to_market', name: 'Go-to-Market Plan', completed: false, priority: 'low' }
        ]
      },
      {
        id: 'product_readiness',
        name: 'Product Readiness',
        status: 'needs_improvement',
        score: 70,
        requirements: [
          { id: 'feature_complete', name: 'Core Features Complete', completed: true, priority: 'high' },
          { id: 'documentation', name: 'Documentation Ready', completed: true, priority: 'high' },
          { id: 'support_system', name: 'Support System', completed: false, priority: 'medium' },
          { id: 'integration_ready', name: 'Integration Ready', completed: false, priority: 'medium' }
        ]
      },
      {
        id: 'team_readiness',
        name: 'Team Readiness',
        status: 'not_ready',
        score: 45,
        requirements: [
          { id: 'sales_training', name: 'Sales Team Training', completed: false, priority: 'high' },
          { id: 'technical_support', name: 'Technical Support Ready', completed: false, priority: 'high' },
          { id: 'customer_success', name: 'Customer Success Process', completed: true, priority: 'medium' },
          { id: 'marketing_assets', name: 'Marketing Assets Ready', completed: false, priority: 'medium' }
        ]
      }
    ];

    setReadinessAreas(mockReadiness);
    setLoading(false);
    
    if (onReadinessUpdate) {
      onReadinessUpdate(mockReadiness);
    }
  }, [onReadinessUpdate]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'needs_improvement':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'not_ready':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'ready':
        return 'text-green-400';
      case 'needs_improvement':
        return 'text-yellow-400';
      case 'not_ready':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBgColor = (status: string): string => {
    switch (status) {
      case 'ready':
        return 'bg-green-900/20 border-green-600';
      case 'needs_improvement':
        return 'bg-yellow-900/20 border-yellow-600';
      case 'not_ready':
        return 'bg-red-900/20 border-red-600';
      default:
        return 'bg-gray-900/20 border-gray-600';
    }
  };

  const calculateOverallReadiness = (): number => {
    if (readinessAreas.length === 0) return 0;
    const totalScore = readinessAreas.reduce((sum, area) => sum + area.score, 0);
    return Math.round(totalScore / readinessAreas.length);
  };

  const getReadyCount = (): number => {
    return readinessAreas.filter(area => area.status === 'ready').length;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-white">Assessing readiness...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="w-7 h-7" />
              Competency Readiness Assessment
            </h2>
            <p className="text-gray-400 mt-1">Evaluate your readiness across key business areas</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-400">{calculateOverallReadiness()}%</div>
            <div className="text-sm text-gray-400">Overall Readiness</div>
          </div>
        </div>
      </div>

      {/* Readiness Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">Ready</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {readinessAreas.filter(a => a.status === 'ready').length}
          </div>
        </div>
        
        <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Needs Work</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {readinessAreas.filter(a => a.status === 'needs_improvement').length}
          </div>
        </div>
        
        <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium text-red-400">Not Ready</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {readinessAreas.filter(a => a.status === 'not_ready').length}
          </div>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Total Areas</span>
          </div>
          <div className="text-2xl font-bold text-white">{readinessAreas.length}</div>
        </div>
      </div>

      {/* Detailed Readiness Areas */}
      <div className="space-y-4">
        {readinessAreas.map((area) => (
          <div key={area.id} className={`border rounded-lg p-6 ${getStatusBgColor(area.status)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(area.status)}
                <h3 className="text-lg font-semibold text-white">{area.name}</h3>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bold ${getStatusColor(area.status)}`}>
                  {area.score}%
                </div>
                <div className="text-xs text-gray-400 capitalize">
                  {area.status.replace('_', ' ')}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {area.requirements.map((req) => (
                <div key={req.id} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                  {req.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${req.completed ? 'text-gray-300' : 'text-white'}`}>
                    {req.name}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ml-auto ${
                    req.priority === 'high' ? 'bg-red-900/30 text-red-400' :
                    req.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-gray-900/30 text-gray-400'
                  }`}>
                    {req.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600/30 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-blue-400 mt-1" />
          <div>
            <h4 className="font-medium text-white mb-2">Next Steps</h4>
            <p className="text-gray-300 text-sm mb-3">
              You have {getReadyCount()} out of {readinessAreas.length} areas ready. 
              Focus on high-priority requirements in the remaining areas to improve your overall readiness score.
            </p>
            <div className="text-xs text-gray-400">
              Recommendation: Start with areas marked as "Not Ready" and focus on high-priority requirements first.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetencyReadiness;