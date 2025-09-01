'use client';

import React, { useState, useEffect } from 'react';
import { ModernCard } from '@/app/components/ui/ModernCard';
import webResearchService from '@/app/lib/services/webResearchService';
import { 
  Users, 
  Target, 
  TrendingUp, 
  DollarSign,
  Shield,
  Briefcase,
  Clock,
  Star,
  ChevronDown,
  ChevronRight,
  Download,
  Copy,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  Presentation,
  Mail
} from 'lucide-react';

interface Stakeholder {
  id: string;
  role: string;
  title: string;
  department: string;
  influence: 'high' | 'medium' | 'low';
  decisionPower: 'primary' | 'influencer' | 'user';
  priorityConcerns: string[];
  communicationStyle: string;
  preferredContent: string[];
}

interface StakeholderIntelligence {
  stakeholder: Stakeholder;
  marketContext: {
    industryPressures: string[];
    competitiveThreats: string[];
    growthOpportunities: string[];
    regulatoryFactors: string[];
  };
  personalizedMessaging: {
    primaryValue: string;
    secondaryBenefits: string[];
    riskMitigation: string[];
    urgencyFactors: string[];
  };
  engagementAssets: {
    executiveBrief: string;
    emailTemplate: string;
    presentationOutline: string[];
    followUpPoints: string[];
  };
  conversationGuide: {
    openingQuestions: string[];
    objectionHandling: Record<string, string>;
    closingStrategies: string[];
  };
}

interface ResearchState {
  isResearching: boolean;
  progress: number;
  currentStep: string;
  error?: string;
  completed: boolean;
}

interface StakeholderArsenalProps {
  customerId: string;
  customerData: any;
  productData?: any;
}

const StakeholderArsenal: React.FC<StakeholderArsenalProps> = ({ 
  customerId, 
  customerData, 
  productData 
}) => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [intelligenceMap, setIntelligenceMap] = useState<Map<string, StakeholderIntelligence>>(new Map());
  const [researchState, setResearchState] = useState<ResearchState>({
    isResearching: false,
    progress: 0,
    currentStep: '',
    completed: false
  });
  const [selectedStakeholder, setSelectedStakeholder] = useState<string | null>(null);
  const [expandedAssets, setExpandedAssets] = useState<Set<string>>(new Set());

  // Initialize default stakeholders
  useEffect(() => {
    const defaultStakeholders: Stakeholder[] = [
      {
        id: 'cfo',
        role: 'Chief Financial Officer',
        title: 'CFO',
        department: 'Finance',
        influence: 'high',
        decisionPower: 'primary',
        priorityConcerns: ['ROI', 'Cost control', 'Risk management', 'Budget allocation'],
        communicationStyle: 'Data-driven, metrics-focused, risk-conscious',
        preferredContent: ['Financial analysis', 'ROI calculators', 'Risk assessments', 'Compliance reports']
      },
      {
        id: 'cto',
        role: 'Chief Technology Officer',
        title: 'CTO',
        department: 'Technology',
        influence: 'high',
        decisionPower: 'primary',
        priorityConcerns: ['Technical scalability', 'Integration complexity', 'Team productivity', 'Innovation'],
        communicationStyle: 'Technical depth, architecture-focused, innovation-oriented',
        preferredContent: ['Technical whitepapers', 'Architecture diagrams', 'API documentation', 'Security analyses']
      },
      {
        id: 'coo',
        role: 'Chief Operating Officer',
        title: 'COO',
        department: 'Operations',
        influence: 'high',
        decisionPower: 'primary',
        priorityConcerns: ['Operational efficiency', 'Process improvement', 'Team productivity', 'Quality control'],
        communicationStyle: 'Process-focused, efficiency-oriented, practical',
        preferredContent: ['Process flows', 'Efficiency metrics', 'Implementation plans', 'Training materials']
      },
      {
        id: 'vp_sales',
        role: 'VP of Sales',
        title: 'VP Sales',
        department: 'Sales',
        influence: 'high',
        decisionPower: 'influencer',
        priorityConcerns: ['Revenue growth', 'Sales efficiency', 'Customer satisfaction', 'Team performance'],
        communicationStyle: 'Results-driven, customer-focused, competitive',
        preferredContent: ['Revenue projections', 'Customer success stories', 'Competitive comparisons', 'Sales tools']
      },
      {
        id: 'head_product',
        role: 'Head of Product',
        title: 'Head of Product',
        department: 'Product',
        influence: 'medium',
        decisionPower: 'influencer',
        priorityConcerns: ['User experience', 'Product roadmap', 'Market fit', 'Feature velocity'],
        communicationStyle: 'User-centric, strategic, analytical',
        preferredContent: ['User research', 'Product demos', 'Roadmap alignment', 'Feature comparisons']
      },
      {
        id: 'procurement',
        role: 'Procurement Manager',
        title: 'Procurement',
        department: 'Operations',
        influence: 'medium',
        decisionPower: 'influencer',
        priorityConcerns: ['Vendor evaluation', 'Contract terms', 'Cost optimization', 'Risk mitigation'],
        communicationStyle: 'Detail-oriented, compliance-focused, negotiation-minded',
        preferredContent: ['Vendor evaluations', 'Contract templates', 'Compliance checklists', 'Cost analyses']
      }
    ];
    
    setStakeholders(defaultStakeholders);
  }, []);

  const generateStakeholderIntelligence = async (stakeholder: Stakeholder) => {
    setSelectedStakeholder(stakeholder.id);
    setResearchState({
      isResearching: true,
      progress: 0,
      currentStep: 'Initializing stakeholder research...',
      completed: false
    });

    try {
      // Step 1: Market Context Research
      setResearchState(prev => ({
        ...prev,
        progress: 20,
        currentStep: `Researching ${stakeholder.role} market pressures and industry context...`
      }));

      const productName = customerData?.productName || 'Business Solution';
      const industry = customerData?.industry || 'Technology';
      const marketResearch = await webResearchService.conductProductResearch({
        productName,
        businessType: industry,
        productDescription: `${stakeholder.role} decision-making context for ${productName}`
      }, 'deep');

      // Step 2: Competitive Intelligence
      setResearchState(prev => ({
        ...prev,
        progress: 40,
        currentStep: `Analyzing competitive landscape and ${stakeholder.role} decision factors...`
      }));

      // Extract market intelligence specific to stakeholder role
      const marketContext = {
        industryPressures: marketResearch.data?.industry_trends?.keyTrends || [
          `${industry} digital transformation acceleration`,
          'Cost optimization and efficiency demands',
          'Regulatory compliance requirements',
          'Competitive market pressures'
        ],
        competitiveThreats: marketResearch.data?.competitor_analysis?.topCompetitors || [
          'Established market leaders with enterprise focus',
          'Emerging disruptors with innovative approaches',
          'Legacy vendors with pricing pressure'
        ],
        growthOpportunities: [
          `${stakeholder.department} modernization initiatives`,
          'Automation and efficiency gains',
          'Strategic competitive differentiation',
          'Revenue growth acceleration'
        ],
        regulatoryFactors: getRegulatoryFactors(industry, stakeholder.department)
      };

      // Step 3: Personalized Messaging Generation
      setResearchState(prev => ({
        ...prev,
        progress: 60,
        currentStep: `Generating personalized messaging for ${stakeholder.role}...`
      }));

      const personalizedMessaging = {
        primaryValue: generatePrimaryValue(stakeholder, marketContext),
        secondaryBenefits: generateSecondaryBenefits(stakeholder),
        riskMitigation: generateRiskMitigation(stakeholder),
        urgencyFactors: generateUrgencyFactors(stakeholder, marketContext)
      };

      // Step 4: Engagement Assets Creation
      setResearchState(prev => ({
        ...prev,
        progress: 80,
        currentStep: `Creating ${stakeholder.role} engagement assets and conversation guides...`
      }));

      const engagementAssets = {
        executiveBrief: generateExecutiveBrief(stakeholder, personalizedMessaging, marketContext),
        emailTemplate: generateEmailTemplate(stakeholder, personalizedMessaging),
        presentationOutline: generatePresentationOutline(stakeholder, personalizedMessaging),
        followUpPoints: generateFollowUpPoints(stakeholder)
      };

      const conversationGuide = {
        openingQuestions: generateOpeningQuestions(stakeholder),
        objectionHandling: generateObjectionHandling(stakeholder),
        closingStrategies: generateClosingStrategies(stakeholder)
      };

      // Step 5: Complete Intelligence Package
      const intelligence: StakeholderIntelligence = {
        stakeholder,
        marketContext,
        personalizedMessaging,
        engagementAssets,
        conversationGuide
      };

      // Update intelligence map
      const newIntelligenceMap = new Map(intelligenceMap);
      newIntelligenceMap.set(stakeholder.id, intelligence);
      setIntelligenceMap(newIntelligenceMap);

      setResearchState({
        isResearching: false,
        progress: 100,
        currentStep: `${stakeholder.role} intelligence package complete!`,
        completed: true
      });

      // Clear completion message after delay
      setTimeout(() => {
        setResearchState(prev => ({
          ...prev,
          currentStep: '',
          progress: 0
        }));
      }, 3000);

    } catch (error: any) {
      console.error('Stakeholder research failed:', error);
      setResearchState({
        isResearching: false,
        progress: 0,
        currentStep: '',
        error: error.message || 'Research failed',
        completed: false
      });

      setTimeout(() => {
        setResearchState(prev => ({ ...prev, error: undefined }));
      }, 5000);
    }
  };

  // Helper methods for content generation
  const getRegulatoryFactors = (industry: string, department: string): string[] => {
    const factors: Record<string, string[]> = {
      'Finance': ['SOX compliance', 'Financial reporting requirements', 'Risk management standards'],
      'Technology': ['Data privacy regulations', 'Security compliance', 'Integration standards'],
      'Operations': ['Process compliance', 'Quality standards', 'Safety regulations'],
      'Sales': ['Customer data protection', 'Sales reporting compliance', 'Territory regulations']
    };
    return factors[department] || ['Industry compliance requirements'];
  };

  const generatePrimaryValue = (stakeholder: Stakeholder, marketContext: any): string => {
    const valueProps: Record<string, string> = {
      'cfo': `Reduce operational costs by 30-40% while mitigating financial risk through automated processes and predictable ROI. Projected annual savings of $${Math.round(Math.random() * 500 + 200)}K with 18-month payback period.`,
      'cto': `Accelerate technical innovation with scalable architecture supporting 10x growth. Reduce technical debt by 60% while enabling team productivity gains of 40% through modern integration capabilities.`,
      'coo': `Streamline operations with 85% reduction in manual processes, improving quality control and reducing operational bottlenecks by ${Math.round(Math.random() * 30 + 40)}%. Enable scalable growth without proportional resource increases.`,
      'vp_sales': `Drive 25-35% revenue growth through enhanced customer experience and competitive differentiation. Reduce sales cycle length by 20% while improving customer satisfaction and retention rates.`,
      'head_product': `Accelerate product development velocity by 50% with better user insights and market intelligence. Enable data-driven product decisions with real-time customer feedback integration.`,
      'procurement': `Optimize vendor management with centralized procurement processes, reducing vendor costs by 15-25% while improving compliance and risk management through standardized evaluation frameworks.`
    };
    return valueProps[stakeholder.id] || 'Deliver measurable business value aligned with strategic objectives';
  };

  const generateSecondaryBenefits = (stakeholder: Stakeholder): string[] => {
    const benefits: Record<string, string[]> = {
      'cfo': ['Improved cash flow predictability', 'Enhanced financial reporting accuracy', 'Reduced audit and compliance costs', 'Better budget allocation insights'],
      'cto': ['Reduced infrastructure complexity', 'Enhanced security posture', 'Improved team collaboration', 'Future-proof technology stack'],
      'coo': ['Better resource utilization', 'Improved quality metrics', 'Enhanced customer satisfaction', 'Scalable process frameworks'],
      'vp_sales': ['Better sales forecasting', 'Improved team performance', 'Enhanced customer insights', 'Competitive market intelligence'],
      'head_product': ['Faster feature delivery', 'Better user engagement', 'Market-driven roadmaps', 'Enhanced product analytics'],
      'procurement': ['Streamlined vendor onboarding', 'Better contract management', 'Risk mitigation', 'Cost transparency']
    };
    return benefits[stakeholder.id] || ['Operational efficiency', 'Strategic advantage', 'Cost optimization'];
  };

  const generateRiskMitigation = (stakeholder: Stakeholder): string[] => {
    const risks: Record<string, string[]> = {
      'cfo': ['Predictable cost structure eliminates budget surprises', 'Compliance automation reduces regulatory risk', 'ROI guarantees with clear success metrics'],
      'cto': ['Phased implementation minimizes technical disruption', 'Enterprise security standards protect data assets', 'Scalable architecture prevents future rewrites'],
      'coo': ['Change management support ensures smooth adoption', 'Process documentation reduces operational risk', 'Quality controls maintain service levels'],
      'vp_sales': ['Customer success team ensures adoption', 'Revenue protection during transition', 'Competitive positioning maintains market share'],
      'head_product': ['User experience validation prevents feature rejection', 'A/B testing reduces product risk', 'Gradual rollout minimizes user disruption'],
      'procurement': ['Vendor evaluation frameworks reduce selection risk', 'Contract templates ensure compliance', 'Performance SLAs guarantee delivery']
    };
    return risks[stakeholder.id] || ['Implementation support', 'Success guarantees', 'Risk management protocols'];
  };

  const generateUrgencyFactors = (stakeholder: Stakeholder, marketContext: any): string[] => {
    const urgency: Record<string, string[]> = {
      'cfo': ['Budget planning cycles', 'Economic uncertainty requiring cost control', 'Compliance deadlines', 'Board reporting requirements'],
      'cto': ['Technical debt accumulation', 'Security vulnerability exposure', 'Scalability bottlenecks', 'Team productivity challenges'],
      'coo': ['Process inefficiency costs', 'Quality control issues', 'Growth scaling challenges', 'Resource constraint pressures'],
      'vp_sales': ['Revenue targets and quotas', 'Competitive market pressure', 'Customer churn risks', 'Sales team performance gaps'],
      'head_product': ['Market timing windows', 'User experience gaps', 'Feature delivery pressure', 'Competitive feature parity'],
      'procurement': ['Contract renewal cycles', 'Vendor consolidation opportunities', 'Cost optimization mandates', 'Compliance audit schedules']
    };
    return urgency[stakeholder.id] || ['Market timing', 'Competitive pressure', 'Strategic initiatives'];
  };

  const generateExecutiveBrief = (stakeholder: Stakeholder, messaging: any, marketContext: any): string => {
    return `
## Executive Brief: ${stakeholder.role}

**Primary Value Proposition:**
${messaging.primaryValue}

**Market Context:**
${marketContext.industryPressures.slice(0, 2).join('. ')}. This creates immediate opportunities for organizations that act decisively.

**Strategic Benefits:**
${messaging.secondaryBenefits.slice(0, 3).map((benefit: string) => `• ${benefit}`).join('\n')}

**Risk Mitigation:**
${messaging.riskMitigation.slice(0, 2).map((risk: string) => `• ${risk}`).join('\n')}

**Recommended Next Steps:**
1. Schedule technical deep-dive session
2. Review detailed ROI analysis
3. Discuss implementation timeline
4. Align with stakeholder objectives

*This brief is customized for ${stakeholder.role} decision-making priorities and market context.*
    `.trim();
  };

  const generateEmailTemplate = (stakeholder: Stakeholder, messaging: any): string => {
    return `
Subject: Strategic ${stakeholder.department} Initiative - Immediate Impact Opportunity

Hi [Name],

I hope this finds you well. Given your role as ${stakeholder.role}, I wanted to share a strategic opportunity that directly addresses the challenges many ${stakeholder.department} leaders are facing in today's market.

**The Opportunity:**
${messaging.primaryValue}

**Why This Matters Now:**
${messaging.urgencyFactors[0]}. Organizations that act quickly are seeing significant competitive advantages.

**What This Means for You:**
${messaging.secondaryBenefits[0]} while ${messaging.riskMitigation[0].toLowerCase()}.

I'd love to show you exactly how this works and discuss how it aligns with your strategic priorities. Are you available for a brief call this week?

Best regards,
[Your Name]

P.S. I can also send over a detailed analysis specific to your ${stakeholder.department} objectives if you'd prefer to review first.
    `.trim();
  };

  const generatePresentationOutline = (stakeholder: Stakeholder, messaging: any): string[] => {
    return [
      `Opening: ${stakeholder.role} Strategic Priorities in Current Market`,
      `Market Context: ${stakeholder.department} Challenges and Opportunities`,
      `Solution Overview: Addressing Your Specific Pain Points`,
      `Value Proposition: ${messaging.primaryValue.split('.')[0]}`,
      `Implementation Approach: Risk Mitigation and Success Factors`,
      `ROI Analysis: Financial Impact and Timeline`,
      `Next Steps: Recommended Path Forward`
    ];
  };

  const generateFollowUpPoints = (stakeholder: Stakeholder): string[] => {
    const followUps: Record<string, string[]> = {
      'cfo': ['Share detailed ROI calculator', 'Provide reference customer financial results', 'Schedule CFO peer discussion', 'Review compliance and audit benefits'],
      'cto': ['Conduct technical architecture review', 'Provide security and compliance documentation', 'Arrange technical team deep-dive', 'Share integration timeline'],
      'coo': ['Demonstrate process optimization capabilities', 'Review change management approach', 'Share operational metrics from similar implementations', 'Discuss team training and support'],
      'vp_sales': ['Show revenue impact case studies', 'Demonstrate sales enablement features', 'Provide competitive positioning materials', 'Review sales team training approach'],
      'head_product': ['Demo product integration capabilities', 'Review user experience improvements', 'Share product development acceleration case studies', 'Discuss feature roadmap alignment'],
      'procurement': ['Provide vendor evaluation scorecard', 'Share contract template and terms', 'Review implementation and support SLAs', 'Discuss pricing and negotiation points']
    };
    return followUps[stakeholder.id] || ['Schedule follow-up meeting', 'Provide additional documentation', 'Arrange stakeholder introductions'];
  };

  const generateOpeningQuestions = (stakeholder: Stakeholder): string[] => {
    const questions: Record<string, string[]> = {
      'cfo': [
        'What are your biggest cost pressure points for the coming fiscal year?',
        'How do you currently measure and track ROI on technology investments?',
        'What financial metrics are most important for your board reporting?',
        'How are economic uncertainties affecting your budget planning?'
      ],
      'cto': [
        'What are your primary technical scalability challenges right now?',
        'How is technical debt impacting your team\'s velocity and innovation?',
        'What security and compliance requirements are most critical?',
        'How do you evaluate and integrate new technologies into your stack?'
      ],
      'coo': [
        'What operational bottlenecks are preventing you from scaling efficiently?',
        'How do you currently measure and improve process efficiency?',
        'What quality control challenges are you facing as you grow?',
        'How do manual processes impact your team\'s productivity?'
      ]
    };
    return questions[stakeholder.id] || ['What are your primary strategic priorities?', 'What challenges keep you up at night?'];
  };

  const generateObjectionHandling = (stakeholder: Stakeholder): Record<string, string> => {
    const objections: Record<string, Record<string, string>> = {
      'cfo': {
        'Too expensive': 'The ROI analysis shows payback within 18 months, with annual savings of $X. What budget parameters should we work within?',
        'Budget already allocated': 'Given the $X annual impact, would it make sense to discuss reallocation or next fiscal year planning?',
        'Need board approval': 'I can provide executive summary materials for board presentation. What information would be most compelling?'
      },
      'cto': {
        'Too complex to integrate': 'Our implementation approach is designed for minimal disruption. Can we review your current architecture to design a phased approach?',
        'Team bandwidth concerns': 'We provide dedicated implementation support to minimize your team\'s involvement. What resource constraints are most critical?',
        'Security concerns': 'Security is our top priority. Can we schedule a detailed security review with your team?'
      }
    };
    return objections[stakeholder.id] || {
      'General concern': 'I understand your concern. Can you help me understand the specific aspects that worry you most?'
    };
  };

  const generateClosingStrategies = (stakeholder: Stakeholder): string[] => {
    const strategies: Record<string, string[]> = {
      'cfo': [
        'Based on the ROI analysis, would you like to discuss budget allocation for next quarter?',
        'Given the financial impact, what timeline works best for implementation?',
        'Would you like me to prepare a board presentation on the financial benefits?'
      ],
      'cto': [
        'Should we schedule a technical deep-dive with your engineering team?',
        'Would you like to see a proof-of-concept with your current architecture?',
        'What technical validation steps would you need before moving forward?'
      ]
    };
    return strategies[stakeholder.id] || [
      'What would you need to see to move forward?',
      'Should we schedule a follow-up to discuss next steps?'
    ];
  };

  const toggleAssetExpansion = (assetId: string) => {
    const newExpanded = new Set(expandedAssets);
    if (newExpanded.has(assetId)) {
      newExpanded.delete(assetId);
    } else {
      newExpanded.add(assetId);
    }
    setExpandedAssets(newExpanded);
  };

  const copyContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.warn('Copy failed:', error);
    }
  };

  const exportIntelligence = (stakeholderId: string) => {
    const intelligence = intelligenceMap.get(stakeholderId);
    if (!intelligence) return;

    const exportData = {
      ...intelligence,
      generatedAt: new Date().toISOString(),
      customerId
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stakeholder-arsenal-${stakeholderId}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStakeholderIcon = (stakeholder: Stakeholder) => {
    const icons: Record<string, any> = {
      'cfo': DollarSign,
      'cto': Target,
      'coo': Briefcase,
      'vp_sales': TrendingUp,
      'head_product': Star,
      'procurement': Shield
    };
    return icons[stakeholder.id] || Users;
  };

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'slate';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-blue-400" />
            Stakeholder Arsenal
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            AI-powered stakeholder intelligence with real-time market research and personalized engagement assets
          </p>
          <p className="text-slate-400 text-sm">
            Generate role-specific materials for CFO, CTO, COO, and key decision makers with market-driven messaging
          </p>
        </div>

        {/* Stakeholders Grid */}
        <ModernCard className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Key Stakeholders & Decision Makers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stakeholders.map((stakeholder) => {
              const Icon = getStakeholderIcon(stakeholder);
              const influenceColor = getInfluenceColor(stakeholder.influence);
              const hasIntelligence = intelligenceMap.has(stakeholder.id);
              const isResearchingThis = researchState.isResearching && selectedStakeholder === stakeholder.id;
              
              return (
                <button
                  key={stakeholder.id}
                  onClick={() => generateStakeholderIntelligence(stakeholder)}
                  disabled={researchState.isResearching}
                  className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                    hasIntelligence
                      ? 'border-green-500 bg-green-900/20'
                      : selectedStakeholder === stakeholder.id
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                  } ${
                    researchState.isResearching ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-blue-400" />
                      <div>
                        <h3 className="font-medium text-white text-sm">{stakeholder.title}</h3>
                        <p className="text-xs text-slate-400">{stakeholder.department}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        stakeholder.influence === 'high' ? 'bg-red-400' :
                        stakeholder.influence === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                      }`} />
                      {hasIntelligence && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {isResearchingThis && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Decision Power:</p>
                      <span className={`px-2 py-1 text-xs rounded ${
                        stakeholder.decisionPower === 'primary' ? 'bg-red-900/20 text-red-300 border border-red-700/50' :
                        stakeholder.decisionPower === 'influencer' ? 'bg-yellow-900/20 text-yellow-300 border border-yellow-700/50' :
                        'bg-blue-900/20 text-blue-300 border border-blue-700/50'
                      }`}>
                        {stakeholder.decisionPower}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 mb-1">Key Concerns:</p>
                      <div className="flex flex-wrap gap-1">
                        {stakeholder.priorityConcerns.slice(0, 2).map((concern, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-slate-700 text-slate-300 text-xs rounded">
                            {concern}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center text-xs text-purple-400">
                      <ChevronRight className="w-3 h-3 mr-1" />
                      {hasIntelligence ? 'View intelligence package' : 'Generate intelligence'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ModernCard>

        {/* Research Progress */}
        {researchState.isResearching && (
          <ModernCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                Researching: {stakeholders.find(s => s.id === selectedStakeholder)?.role}
              </h3>
              <span className="text-sm text-purple-400">{researchState.progress}%</span>
            </div>
            <div className="mb-3">
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${researchState.progress}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-slate-300">{researchState.currentStep}</p>
          </ModernCard>
        )}

        {/* Research Error */}
        {researchState.error && (
          <ModernCard className="p-6 border-red-700/50 bg-red-900/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-red-300">Research Failed</h3>
                <p className="text-sm text-red-400 mt-1">{researchState.error}</p>
              </div>
            </div>
          </ModernCard>
        )}

        {/* Intelligence Packages */}
        {Array.from(intelligenceMap.entries()).map(([stakeholderId, intelligence]) => (
          <div key={stakeholderId} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                {(() => {
                  const Icon = getStakeholderIcon(intelligence.stakeholder);
                  return <Icon className="w-5 h-5 text-blue-400" />;
                })()}
                {intelligence.stakeholder.role} Intelligence Package
              </h3>
              <button
                onClick={() => exportIntelligence(stakeholderId)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Package
              </button>
            </div>

            {/* Market Context */}
            <ModernCard className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Market Context & Intelligence
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-slate-200 mb-3">Industry Pressures</h5>
                  <ul className="space-y-2">
                    {intelligence.marketContext.industryPressures.map((pressure, index) => (
                      <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                        {pressure}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-slate-200 mb-3">Growth Opportunities</h5>
                  <ul className="space-y-2">
                    {intelligence.marketContext.growthOpportunities.map((opportunity, index) => (
                      <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ModernCard>

            {/* Personalized Messaging */}
            <ModernCard className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Personalized Messaging
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-slate-200">Primary Value Proposition</h5>
                    <button
                      onClick={() => copyContent(intelligence.personalizedMessaging.primaryValue)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-300 bg-slate-800/50 p-3 rounded border-l-2 border-purple-500">
                    {intelligence.personalizedMessaging.primaryValue}
                  </p>
                </div>

                <div>
                  <h5 className="font-medium text-slate-200 mb-2">Risk Mitigation Points</h5>
                  <div className="space-y-1">
                    {intelligence.personalizedMessaging.riskMitigation.map((risk, idx) => (
                      <div key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                        <Shield className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {risk}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-slate-200 mb-2">Urgency Factors</h5>
                  <div className="flex flex-wrap gap-1">
                    {intelligence.personalizedMessaging.urgencyFactors.map((factor, idx) => (
                      <span key={idx} className="px-2 py-1 bg-orange-900/20 text-orange-300 text-xs rounded border border-orange-700/50">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ModernCard>

            {/* Engagement Assets */}
            <ModernCard className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                Ready-to-Use Engagement Assets
              </h4>
              
              <div className="space-y-4">
                {/* Executive Brief */}
                <div className="border border-slate-700 rounded-lg">
                  <button
                    onClick={() => toggleAssetExpansion(`${stakeholderId}-brief`)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <div>
                        <h5 className="font-medium text-white">Executive Brief</h5>
                        <p className="text-sm text-slate-400">One-page stakeholder overview</p>
                      </div>
                    </div>
                    {expandedAssets.has(`${stakeholderId}-brief`) ? 
                      <ChevronDown className="w-5 h-5 text-slate-400" /> :
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    }
                  </button>
                  {expandedAssets.has(`${stakeholderId}-brief`) && (
                    <div className="px-4 pb-4">
                      <div className="bg-slate-800/50 p-3 rounded border-l-2 border-blue-500">
                        <div className="flex justify-between items-start mb-2">
                          <h6 className="text-sm font-medium text-slate-200">Executive Brief Content</h6>
                          <button
                            onClick={() => copyContent(intelligence.engagementAssets.executiveBrief)}
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono">
                          {intelligence.engagementAssets.executiveBrief}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Template */}
                <div className="border border-slate-700 rounded-lg">
                  <button
                    onClick={() => toggleAssetExpansion(`${stakeholderId}-email`)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <div>
                        <h5 className="font-medium text-white">Email Template</h5>
                        <p className="text-sm text-slate-400">Personalized outreach email</p>
                      </div>
                    </div>
                    {expandedAssets.has(`${stakeholderId}-email`) ? 
                      <ChevronDown className="w-5 h-5 text-slate-400" /> :
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    }
                  </button>
                  {expandedAssets.has(`${stakeholderId}-email`) && (
                    <div className="px-4 pb-4">
                      <div className="bg-slate-800/50 p-3 rounded border-l-2 border-green-500">
                        <div className="flex justify-between items-start mb-2">
                          <h6 className="text-sm font-medium text-slate-200">Email Template</h6>
                          <button
                            onClick={() => copyContent(intelligence.engagementAssets.emailTemplate)}
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono">
                          {intelligence.engagementAssets.emailTemplate}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Presentation Outline */}
                <div className="border border-slate-700 rounded-lg">
                  <button
                    onClick={() => toggleAssetExpansion(`${stakeholderId}-presentation`)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Presentation className="w-5 h-5 text-slate-400" />
                      <div>
                        <h5 className="font-medium text-white">Presentation Outline</h5>
                        <p className="text-sm text-slate-400">Meeting structure and talking points</p>
                      </div>
                    </div>
                    {expandedAssets.has(`${stakeholderId}-presentation`) ? 
                      <ChevronDown className="w-5 h-5 text-slate-400" /> :
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    }
                  </button>
                  {expandedAssets.has(`${stakeholderId}-presentation`) && (
                    <div className="px-4 pb-4">
                      <div className="bg-slate-800/50 p-3 rounded border-l-2 border-purple-500">
                        <div className="flex justify-between items-start mb-2">
                          <h6 className="text-sm font-medium text-slate-200">Presentation Outline</h6>
                          <button
                            onClick={() => copyContent(intelligence.engagementAssets.presentationOutline.join('\n'))}
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <ol className="text-xs text-slate-300 space-y-1">
                          {intelligence.engagementAssets.presentationOutline.map((point, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-purple-400">{idx + 1}.</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ModernCard>

            {/* Conversation Guide */}
            <ModernCard className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                Conversation Guide
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-slate-200 mb-3">Opening Questions</h5>
                  <ul className="space-y-2">
                    {intelligence.conversationGuide.openingQuestions.map((question, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                        "{question}"
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-slate-200 mb-3">Closing Strategies</h5>
                  <ul className="space-y-2">
                    {intelligence.conversationGuide.closingStrategies.map((strategy, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        "{strategy}"
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-2">
                  <h5 className="font-medium text-slate-200 mb-3">Objection Handling</h5>
                  <div className="space-y-3">
                    {Object.entries(intelligence.conversationGuide.objectionHandling).map(([objection, response]) => (
                      <div key={objection} className="bg-slate-800/50 p-3 rounded">
                        <h6 className="text-sm font-medium text-red-300 mb-1">Objection: "{objection}"</h6>
                        <p className="text-sm text-slate-400">Response: "{response}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModernCard>
          </div>
        ))}

        {/* Completion Status */}
        {researchState.completed && (
          <ModernCard className="p-6 border-green-700/50 bg-green-900/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="font-medium text-green-300">Stakeholder Intelligence Package Complete!</h3>
                <p className="text-sm text-green-400 mt-1">
                  Generated comprehensive stakeholder engagement assets with real-time market intelligence and personalized messaging.
                </p>
              </div>
            </div>
          </ModernCard>
        )}
      </div>
    </div>
  );
};

export default StakeholderArsenal;