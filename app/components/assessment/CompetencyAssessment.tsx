'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Users, Target, TrendingUp, Award, ArrowRight } from 'lucide-react';

interface CompetencyArea {
  id: string;
  name: string;
  description: string;
  level: number; // 1-5 scale
  maxLevel: number;
  skills: CompetencySkill[];
}

interface CompetencySkill {
  id: string;
  name: string;
  completed: boolean;
  required: boolean;
}

interface CompetencyAssessmentProps {
  customerId?: string;
  onAssessmentComplete?: (results: CompetencyArea[]) => void;
  initialData?: CompetencyArea[];
}

const CompetencyAssessment: React.FC<CompetencyAssessmentProps> = ({
  customerId,
  onAssessmentComplete,
  initialData
}) => {
  const [competencyAreas, setCompetencyAreas] = useState<CompetencyArea[]>(initialData || []);
  const [currentArea, setCurrentArea] = useState<number>(0);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      // Initialize competency areas
      const mockCompetencyAreas: CompetencyArea[] = [
        {
          id: 'customer_intelligence',
          name: 'Customer Intelligence',
          description: 'Understanding and analyzing customer needs, behaviors, and decision-making processes',
          level: 2,
          maxLevel: 5,
          skills: [
            { id: 'icp_creation', name: 'ICP Creation & Analysis', completed: true, required: true },
            { id: 'buyer_personas', name: 'Buyer Persona Development', completed: true, required: true },
            { id: 'customer_research', name: 'Customer Research Methods', completed: false, required: true },
            { id: 'data_analysis', name: 'Customer Data Analysis', completed: false, required: false },
            { id: 'journey_mapping', name: 'Customer Journey Mapping', completed: false, required: false }
          ]
        },
        {
          id: 'revenue_operations',
          name: 'Revenue Operations',
          description: 'Systematic processes for revenue generation, tracking, and optimization',
          level: 1,
          maxLevel: 5,
          skills: [
            { id: 'sales_process', name: 'Sales Process Design', completed: false, required: true },
            { id: 'pipeline_management', name: 'Pipeline Management', completed: false, required: true },
            { id: 'forecasting', name: 'Revenue Forecasting', completed: false, required: true },
            { id: 'performance_metrics', name: 'Performance Metrics', completed: false, required: false },
            { id: 'automation_tools', name: 'Sales Automation', completed: false, required: false }
          ]
        },
        {
          id: 'technical_translation',
          name: 'Technical Translation',
          description: 'Converting technical features into business value propositions',
          level: 3,
          maxLevel: 5,
          skills: [
            { id: 'value_proposition', name: 'Value Proposition Creation', completed: true, required: true },
            { id: 'technical_docs', name: 'Technical Documentation', completed: true, required: true },
            { id: 'stakeholder_communication', name: 'Stakeholder Communication', completed: true, required: true },
            { id: 'demo_creation', name: 'Demo & Presentation Skills', completed: false, required: false },
            { id: 'competitive_analysis', name: 'Competitive Analysis', completed: false, required: false }
          ]
        },
        {
          id: 'market_intelligence',
          name: 'Market Intelligence',
          description: 'Understanding market dynamics, competition, and positioning strategies',
          level: 2,
          maxLevel: 5,
          skills: [
            { id: 'market_research', name: 'Market Research', completed: true, required: true },
            { id: 'competitive_intel', name: 'Competitive Intelligence', completed: false, required: true },
            { id: 'positioning', name: 'Market Positioning', completed: true, required: true },
            { id: 'trend_analysis', name: 'Trend Analysis', completed: false, required: false },
            { id: 'segmentation', name: 'Market Segmentation', completed: false, required: false }
          ]
        }
      ];

      setCompetencyAreas(mockCompetencyAreas);
      setLoading(false);
    }
  }, [initialData]);

  const handleSkillToggle = (areaId: string, skillId: string) => {
    setCompetencyAreas(prev => prev.map(area => {
      if (area.id === areaId) {
        const updatedSkills = area.skills.map(skill => 
          skill.id === skillId ? { ...skill, completed: !skill.completed } : skill
        );
        
        // Recalculate level based on completed required skills
        const requiredSkills = updatedSkills.filter(s => s.required);
        const completedRequired = requiredSkills.filter(s => s.completed).length;
        const newLevel = Math.max(1, Math.ceil((completedRequired / requiredSkills.length) * area.maxLevel));
        
        return { ...area, skills: updatedSkills, level: newLevel };
      }
      return area;
    }));
  };

  const calculateOverallProgress = (): number => {
    const totalPossible = competencyAreas.reduce((sum, area) => sum + area.maxLevel, 0);
    const currentTotal = competencyAreas.reduce((sum, area) => sum + area.level, 0);
    return Math.round((currentTotal / totalPossible) * 100);
  };

  const handleComplete = () => {
    if (onAssessmentComplete) {
      onAssessmentComplete(competencyAreas);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-white">Loading competency assessment...</span>
          </div>
        </div>
      </div>
    );
  }

  const currentAreaData = competencyAreas[currentArea];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Award className="w-7 h-7" />
              Competency Assessment
            </h2>
            <p className="text-gray-400 mt-1">Evaluate your current skill levels across key competency areas</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">{calculateOverallProgress()}%</div>
            <div className="text-sm text-gray-400">Overall Progress</div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {competencyAreas.map((area, index) => (
          <button
            key={area.id}
            onClick={() => setCurrentArea(index)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              currentArea === index
                ? 'border-blue-500 bg-blue-900/20'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            }`}
          >
            <h3 className="font-medium text-white text-sm">{area.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-lg font-bold text-blue-400">
                {area.level}/{area.maxLevel}
              </div>
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(area.level / area.maxLevel) * 100}%` }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Current Area Details */}
      {currentAreaData && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">{currentAreaData.name}</h3>
            <p className="text-gray-400">{currentAreaData.description}</p>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Current Level:</span>
                <span className="text-lg font-bold text-blue-400">
                  {currentAreaData.level}/{currentAreaData.maxLevel}
                </span>
              </div>
              <div className="flex-1 bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(currentAreaData.level / currentAreaData.maxLevel) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-white flex items-center gap-2">
              <Target className="w-4 h-4" />
              Skills Checklist
            </h4>
            {currentAreaData.skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                <button
                  onClick={() => handleSkillToggle(currentAreaData.id, skill.id)}
                  className="flex-shrink-0"
                >
                  {skill.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
                <div className="flex-1">
                  <span className={`font-medium ${skill.completed ? 'text-white' : 'text-gray-300'}`}>
                    {skill.name}
                  </span>
                  {skill.required && (
                    <span className="ml-2 text-xs bg-red-900/30 text-red-400 px-2 py-0.5 rounded">
                      Required
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentArea(Math.max(0, currentArea - 1))}
          disabled={currentArea === 0}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous Area
        </button>

        <div className="text-sm text-gray-400">
          {currentArea + 1} of {competencyAreas.length} competency areas
        </div>

        {currentArea === competencyAreas.length - 1 ? (
          <button
            onClick={handleComplete}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            Complete Assessment
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentArea(Math.min(competencyAreas.length - 1, currentArea + 1))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Area
          </button>
        )}
      </div>
    </div>
  );
};

export default CompetencyAssessment;