'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Lightbulb, Target, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';

interface BusinessCaseBuilderProps {
  initialData?: any;
  onBusinessCaseReady?: (data: BusinessCaseData) => void;
  customerData?: any;
}

interface BusinessCaseData {
  companyName: string;
  projectTitle: string;
  requestedAmount: string;
  expectedROI: string;
  currentChallenges: string;
  businessImpact: string;
  urgencyFactors: string;
  solutionOverview: string;
  keyFeatures: string;
  implementationApproach: string;
  currentStateCosts: string;
  solutionCosts: string;
  expectedSavings: string;
  paybackPeriod: string;
  successMetrics: string;
  timeline: string;
}

const BusinessCaseBuilder: React.FC<BusinessCaseBuilderProps> = ({
  initialData,
  onBusinessCaseReady,
  customerData
}) => {
  const [activeTemplate, setActiveTemplate] = useState<string>('pilot');
  const [formData, setFormData] = useState<BusinessCaseData>({
    companyName: '',
    projectTitle: '',
    requestedAmount: '',
    expectedROI: '',
    currentChallenges: '',
    businessImpact: '',
    urgencyFactors: '',
    solutionOverview: '',
    keyFeatures: '',
    implementationApproach: '',
    currentStateCosts: '',
    solutionCosts: '',
    expectedSavings: '',
    paybackPeriod: '',
    successMetrics: '',
    timeline: ''
  });

  const templates = {
    pilot: {
      name: 'Pilot Program',
      description: 'Test implementation with limited scope',
      duration: '3-6 months',
      investment: '$50K-$150K'
    },
    fullDeployment: {
      name: 'Full Deployment',
      description: 'Enterprise-wide implementation',
      duration: '6-12 months',
      investment: '$250K-$1M'
    },
    expansion: {
      name: 'Expansion Phase',
      description: 'Scale existing successful pilot',
      duration: '4-8 months',
      investment: '$150K-$500K'
    }
  };

  const handleInputChange = (field: keyof BusinessCaseData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const autoPopulateFromAnalysis = () => {
    // Simulate auto-population from ICP and Cost Calculator data
    const autoData: Partial<BusinessCaseData> = {
      projectTitle: `${formData.companyName} Digital Transformation Initiative`,
      currentChallenges: 'Manual processes leading to inefficiencies, lack of real-time insights, competitive disadvantage',
      businessImpact: 'Revenue growth limited by operational constraints, customer satisfaction declining, market share at risk',
      urgencyFactors: 'Competitors gaining advantage, customer expectations increasing, regulatory requirements pending',
      solutionOverview: 'Comprehensive digital platform with AI-powered automation and analytics',
      keyFeatures: 'Automated workflows, real-time dashboard, predictive analytics, CRM integration',
      implementationApproach: 'Phased rollout with pilot team, training program, continuous optimization',
      currentStateCosts: '1250000',
      solutionCosts: '250000',
      expectedSavings: '875000',
      paybackPeriod: '8',
      expectedROI: '250',
      successMetrics: 'Revenue growth 20%, efficiency gain 35%, customer satisfaction 90%+',
      timeline: 'Month 1-2: Setup, Month 3-4: Implementation, Month 5-6: Optimization'
    };

    setFormData(prev => ({ ...prev, ...autoData }));
  };

  const handleSubmit = () => {
    if (onBusinessCaseReady) {
      onBusinessCaseReady(formData);
    }
  };

  const sections = [
    { id: 'executive', label: 'Executive Summary', icon: FileText },
    { id: 'problem', label: 'Problem Statement', icon: Target },
    { id: 'solution', label: 'Proposed Solution', icon: Lightbulb },
    { id: 'financial', label: 'Financial Analysis', icon: DollarSign },
    { id: 'success', label: 'Success Metrics', icon: CheckCircle }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Business Case Builder</h2>
        <p className="text-gray-400">Create compelling business cases for stakeholder approval</p>
      </div>

      {/* Template Selection */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Select Template</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(templates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => setActiveTemplate(key)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                activeTemplate === key
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-gray-600 bg-gray-900 hover:border-gray-500'
              }`}
            >
              <h4 className="font-medium text-white">{template.name}</h4>
              <p className="text-sm text-gray-400 mt-1">{template.description}</p>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-gray-500">Duration: {template.duration}</p>
                <p className="text-xs text-gray-500">Investment: {template.investment}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form Builder */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Business Case Details</h3>
          <button
            onClick={autoPopulateFromAnalysis}
            disabled={!formData.companyName}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Auto-fill from Analysis
          </button>
        </div>

        <div className="space-y-6">
          {/* Executive Summary */}
          <div>
            <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Executive Summary
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Acme Corporation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Digital Transformation Initiative"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Requested Amount ($)
                </label>
                <input
                  type="text"
                  value={formData.requestedAmount}
                  onChange={(e) => handleInputChange('requestedAmount', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="250000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expected ROI (%)
                </label>
                <input
                  type="text"
                  value={formData.expectedROI}
                  onChange={(e) => handleInputChange('expectedROI', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="250"
                />
              </div>
            </div>
          </div>

          {/* Problem Statement */}
          <div>
            <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Problem Statement
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Challenges
                </label>
                <textarea
                  value={formData.currentChallenges}
                  onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  rows={3}
                  placeholder="Describe current challenges..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Impact
                </label>
                <textarea
                  value={formData.businessImpact}
                  onChange={(e) => handleInputChange('businessImpact', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  rows={3}
                  placeholder="Quantify business impact..."
                />
              </div>
            </div>
          </div>

          {/* Solution Overview */}
          <div>
            <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Proposed Solution
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Solution Overview
                </label>
                <textarea
                  value={formData.solutionOverview}
                  onChange={(e) => handleInputChange('solutionOverview', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  rows={3}
                  placeholder="Describe the proposed solution..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Generate Business Case Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCaseBuilder;