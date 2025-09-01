'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, ArrowRight, FileText, TrendingUp, Users, Target } from 'lucide-react';

// TypeScript Interfaces
interface AssessmentResultData {
  overallScore: number;
  buyerScore: number;
  techScore: number;
  qualification: string;
}

interface AssessmentGeneratedContent {
  buyerGap: number;
  icp: string;
  tbp: string;
}

interface AssessmentUserInfo {
  company: string;
  email: string;
}

interface AssessmentData {
  results: AssessmentResultData;
  generatedContent: AssessmentGeneratedContent;
  userInfo: AssessmentUserInfo;
  questionTimings: number[];
}

interface AssessmentResultsProps {
  customerId?: string;
  initialData?: AssessmentData;
  onComplete?: (data: AssessmentData) => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  customerId,
  initialData,
  onComplete
}) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(initialData || null);
  const [loading, setLoading] = useState<boolean>(!initialData);

  // Load assessment data from sessionStorage or API
  useEffect(() => {
    if (initialData) {
      setAssessmentData(initialData);
      setLoading(false);
      return;
    }

    const loadAssessmentData = () => {
      try {
        console.log('🔍 AssessmentResults Debug:');
        console.log('📦 All sessionStorage keys:', Object.keys(sessionStorage));
        console.log('📊 Looking for assessmentResults...');
        
        // First try sessionStorage from assessment app
        const storedResults = sessionStorage.getItem('assessmentResults');
        console.log('📄 Stored results found:', !!storedResults);
        
        if (storedResults) {
          console.log('📄 Raw stored results:', storedResults.substring(0, 200) + '...');
          const data = JSON.parse(storedResults) as AssessmentData;
          console.log('✅ Assessment data loaded from sessionStorage');
          setAssessmentData(data);
          setLoading(false);
          if (onComplete) onComplete(data);
          return;
        }

        console.log('⚠️ No assessment data found in sessionStorage, using mock data for demo');
        
        // Fallback to mock data for demo purposes
        const mockData: AssessmentData = {
          results: {
            overallScore: 72,
            buyerScore: 68,
            techScore: 76,
            qualification: 'Promising'
          },
          generatedContent: {
            buyerGap: 45,
            icp: 'Comprehensive ICP analysis showing enterprise SaaS companies with 100-500 employees...',
            tbp: 'Target buyer personas including technical decision makers and business stakeholders...'
          },
          userInfo: {
            company: 'TechCorp',
            email: 'founder@techcorp.com'
          },
          questionTimings: []
        };
        
        console.log('🎭 Mock assessment data loaded:', mockData);
        setAssessmentData(mockData);
        setLoading(false);
        if (onComplete) onComplete(mockData);
      } catch (error) {
        console.error('Error loading assessment data:', error);
        setLoading(false);
      }
    };

    loadAssessmentData();
  }, [customerId, initialData, onComplete]);

  const getTopChallenge = (): string => {
    if (!assessmentData) return 'business growth';
    const { results } = assessmentData;
    
    if (results.buyerScore < results.techScore) {
      return 'buyer understanding';
    } else {
      return 'technical value translation';
    }
  };

  const handleLinkedInShare = () => {
    if (!assessmentData) return;
    
    const { results, userInfo } = assessmentData;
    const company = userInfo?.company || 'my company';
    const challenge = getTopChallenge();
    
    const linkedInText = `🎯 Just completed my Revenue Readiness Assessment: ${results.overallScore}% score!

As a technical founder at ${company}, I discovered my primary challenge is ${challenge}.

The assessment identified specific gaps in my buyer understanding and technical value translation - exactly the systematic intelligence I need to scale from $2M to $10M+ ARR.

Ready to transform technical capabilities into strategic enterprise partnerships. 

#TechnicalFounder #RevenueIntelligence #B2BSales #StartupGrowth`;

    const encodedText = encodeURIComponent(linkedInText);
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`;
    window.open(linkedInUrl, '_blank');
  };

  const handlePDFDownload = () => {
    if (!assessmentData) return;
    
    // Simulate PDF download - would integrate with actual PDF library
    const { results, userInfo } = assessmentData;
    const reportData = {
      company: userInfo?.company || 'N/A',
      date: new Date().toLocaleDateString(),
      overallScore: results.overallScore,
      buyerScore: results.buyerScore,
      techScore: results.techScore,
      qualification: results.qualification
    };
    
    console.log('Generating PDF report:', reportData);
    alert('PDF download would be generated here with actual PDF library integration');
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-900/20 border-green-600';
    if (score >= 60) return 'bg-yellow-900/20 border-yellow-600';
    return 'bg-red-900/20 border-red-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-white">Loading assessment results...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!assessmentData) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Assessment Data</h3>
            <p className="text-gray-400">No assessment results found. Please complete an assessment first.</p>
          </div>
        </div>
      </div>
    );
  }

  const { results, generatedContent, userInfo } = assessmentData;

  const sections = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'scores', label: 'Detailed Scores', icon: Target },
    { id: 'recommendations', label: 'Recommendations', icon: ArrowRight },
    { id: 'content', label: 'Generated Content', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Assessment Results</h2>
            <p className="text-gray-400 mt-1">
              {userInfo.company} • Overall Score: {results.overallScore}%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePDFDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={handleLinkedInShare}
              className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share on LinkedIn
            </button>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-lg border ${getScoreBgColor(results.overallScore)}`}>
                <h3 className="text-lg font-semibold text-white mb-2">Overall Score</h3>
                <div className={`text-3xl font-bold ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore}%
                </div>
                <p className="text-sm text-gray-400 mt-2">Qualification: {results.qualification}</p>
              </div>
              
              <div className={`p-6 rounded-lg border ${getScoreBgColor(results.buyerScore)}`}>
                <h3 className="text-lg font-semibold text-white mb-2">Buyer Understanding</h3>
                <div className={`text-3xl font-bold ${getScoreColor(results.buyerScore)}`}>
                  {results.buyerScore}%
                </div>
                <p className="text-sm text-gray-400 mt-2">Market alignment</p>
              </div>
              
              <div className={`p-6 rounded-lg border ${getScoreBgColor(results.techScore)}`}>
                <h3 className="text-lg font-semibold text-white mb-2">Technical Translation</h3>
                <div className={`text-3xl font-bold ${getScoreColor(results.techScore)}`}>
                  {results.techScore}%
                </div>
                <p className="text-sm text-gray-400 mt-2">Value communication</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'scores' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Detailed Score Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Overall Revenue Readiness</span>
                <span className={`font-bold ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${results.overallScore >= 80 ? 'bg-green-500' : results.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${results.overallScore}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'recommendations' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-400 mt-0.5" />
                <p className="text-gray-300">
                  Focus on improving your buyer understanding by developing detailed customer personas
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-400 mt-0.5" />
                <p className="text-gray-300">
                  Create better technical value translation materials for non-technical stakeholders
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-blue-400 mt-0.5" />
                <p className="text-gray-300">
                  Develop systematic processes for revenue intelligence gathering
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'content' && (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Generated ICP Analysis</h3>
              <p className="text-gray-300 leading-relaxed">{generatedContent.icp}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Target Buyer Personas</h3>
              <p className="text-gray-300 leading-relaxed">{generatedContent.tbp}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AssessmentResults;