'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronRight, Download, FileText, Users, Target,
  BarChart3, Star, CheckCircle, Play, Eye, Award,
  TrendingUp, Zap, Clock, ExternalLink, Brain,
  Heart, MessageCircle, DollarSign, AlertCircle
} from 'lucide-react';

interface ProgressUpdate {
  points: number;
  action: string;
  category: string;
  timestamp: string;
}

interface SectionConfig {
  id: string;
  label: string;
  icon: any;
  description: string;
  points: number;
  timeEstimate: string;
}

interface PracticeScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  timeEstimate: string;
}

interface PersonaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  personaContent?: any;
  onProgressUpdate?: (update: ProgressUpdate) => void;
  className?: string;
}

interface ScenariosContentProps {
  scenarios: PracticeScenario[];
  completedScenarios: Set<string>;
  onScenarioComplete: (scenarioId: string) => void;
}

const PersonaDetailModal: React.FC<PersonaDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  personaContent, 
  onProgressUpdate,
  className = '' 
}) => {
  // Modal state management
  const [activeSection, setActiveSection] = useState('overview');
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set());
  const [completedScenarios, setCompletedScenarios] = useState<Set<string>>(new Set());
  const [totalPointsEarned, setTotalPointsEarned] = useState(0);
  const [achievements, setAchievements] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  // Buyer persona section configuration
  const sectionConfig: SectionConfig[] = [
    {
      id: 'overview',
      label: 'Persona Overview',
      icon: Users,
      description: 'Core demographics and role characteristics',
      points: 15,
      timeEstimate: '4 min read'
    },
    {
      id: 'psychology',
      label: 'Psychology Profile',
      icon: Brain,
      description: 'Motivations, fears, and decision-making patterns',
      points: 25,
      timeEstimate: '6 min read'
    },
    {
      id: 'communication',
      label: 'Communication Style',
      icon: MessageCircle,
      description: 'Preferred channels and messaging approaches',
      points: 20,
      timeEstimate: '5 min read'
    },
    {
      id: 'scenarios',
      label: 'Real-World Scenarios',
      icon: Play,
      description: 'Interactive practice conversations',
      points: 30,
      timeEstimate: '8 min practice'
    },
    {
      id: 'value-drivers',
      label: 'Value Drivers',
      icon: DollarSign,
      description: 'What motivates their buying decisions',
      points: 20,
      timeEstimate: '4 min read'
    }
  ];

  // Practice scenarios for each persona type
  const practiceScenarios: PracticeScenario[] = [
    {
      id: 'initial-discovery',
      title: 'Initial Discovery Call',
      description: 'First conversation to understand needs',
      difficulty: 'Beginner',
      points: 40,
      timeEstimate: '10 minutes'
    },
    {
      id: 'technical-deep-dive',
      title: 'Technical Deep Dive',
      description: 'Addressing technical concerns and integration',
      difficulty: 'Intermediate',
      points: 60,
      timeEstimate: '15 minutes'
    },
    {
      id: 'objection-handling',
      title: 'Objection Handling',
      description: 'Responding to common concerns',
      difficulty: 'Advanced',
      points: 80,
      timeEstimate: '20 minutes'
    }
  ];

  // Handle mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Award progress points for actions
  const awardPoints = useCallback((points: number, action: string, category: string = 'valueCommunication') => {
    setTotalPointsEarned(prev => prev + points);
    
    // Call parent progress update
    if (onProgressUpdate) {
      onProgressUpdate({
        points,
        action,
        category,
        timestamp: new Date().toISOString()
      });
    }

    // Check for achievements
    checkAchievements(points, action);
  }, [onProgressUpdate]);

  // Check for professional achievements
  const checkAchievements = useCallback((points: number, action: string) => {
    const newAchievements = new Set(achievements);

    // Persona Expert Achievement
    if (viewedSections.size === sectionConfig.length && !achievements.has('persona-expert')) {
      newAchievements.add('persona-expert');
      awardPoints(75, 'Persona Expert Achievement');
    }

    // Scenario Master Achievement
    if (completedScenarios.size >= 3 && !achievements.has('scenario-master')) {
      newAchievements.add('scenario-master');
      awardPoints(100, 'Scenario Master Achievement');
    }

    // Communication Specialist Achievement
    if (viewedSections.has('communication') && viewedSections.has('psychology') && !achievements.has('communication-specialist')) {
      newAchievements.add('communication-specialist');
      awardPoints(50, 'Communication Specialist Achievement');
    }

    setAchievements(newAchievements);
  }, [achievements, viewedSections.size, completedScenarios.size, awardPoints, sectionConfig.length]);

  // Handle section navigation with progress tracking
  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    
    // Track section view if not already viewed
    if (!viewedSections.has(sectionId)) {
      const newViewed = new Set(viewedSections);
      newViewed.add(sectionId);
      setViewedSections(newViewed);
      
      // Award points for viewing section
      const section = sectionConfig.find(s => s.id === sectionId);
      if (section) {
        awardPoints(section.points, `Viewed ${section.label}`);
      }
    }
  }, [viewedSections, awardPoints, sectionConfig]);

  // Handle scenario completion
  const handleScenarioComplete = useCallback((scenarioId: string) => {
    const newCompleted = new Set(completedScenarios);
    newCompleted.add(scenarioId);
    setCompletedScenarios(newCompleted);

    // Award points for scenario completion
    const scenario = practiceScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      awardPoints(scenario.points, `Completed ${scenario.title}`);
    }
  }, [completedScenarios, awardPoints]);

  // Handle export actions
  const handleExport = useCallback((format: string) => {
    awardPoints(35, `Exported persona analysis as ${format.toUpperCase()}`);
    console.log(`Exporting persona analysis as ${format}`);
  }, [awardPoints]);

  // Render section content based on active section
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return <PersonaOverviewContent />;
      case 'psychology':
        return <PsychologyProfileContent />;
      case 'communication':
        return <CommunicationStyleContent />;
      case 'scenarios':
        return (
          <ScenariosContent 
            scenarios={practiceScenarios}
            completedScenarios={completedScenarios}
            onScenarioComplete={handleScenarioComplete}
          />
        );
      case 'value-drivers':
        return <ValueDriversContent />;
      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-400">Select a section from the sidebar to continue</div>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`h-full w-full bg-gray-950 ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="persona-modal-title"
        >
          {/* Modal Header */}
          <div className="bg-gray-900 border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
                
                <div>
                  <h1 id="persona-modal-title" className="text-xl font-semibold text-white">
                    Buyer Persona Deep Dive
                  </h1>
                  <p className="text-sm text-gray-400">
                    Advanced stakeholder intelligence and communication mastery
                  </p>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">{totalPointsEarned}</div>
                  <div className="text-xs text-gray-500">Points Earned</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">{viewedSections.size}/{sectionConfig.length}</div>
                  <div className="text-xs text-gray-500">Sections Viewed</div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">{completedScenarios.size}/{practiceScenarios.length}</div>
                  <div className="text-xs text-gray-500">Scenarios Complete</div>
                </div>

                {/* Export Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors min-h-[44px] touch-manipulation"
                    aria-label="Export as PDF"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                  
                  <button
                    onClick={() => handleExport('excel')}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-600/50 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors min-h-[44px] touch-manipulation"
                    aria-label="Export as Excel"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Excel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Content - 80/20 Layout */}
          <div className={`flex h-full ${isMobile ? 'flex-col' : ''}`}>
            {/* Sidebar Navigation - 20% */}
            <div className={`${isMobile ? 'h-auto' : 'w-80 h-full'} bg-gray-900 border-r border-gray-800 overflow-y-auto`}>
              <div className="p-4">
                <h3 className="font-medium text-white mb-4">Navigation</h3>
                
                <div className="space-y-2">
                  {sectionConfig.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    const isViewed = viewedSections.has(section.id);
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSectionChange(section.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all min-h-[44px] touch-manipulation ${
                          isActive ? 'bg-blue-900/50 border-blue-500/50' : 'hover:bg-gray-800'
                        }`}
                        aria-label={`Navigate to ${section.label}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                            <span className={`font-medium ${isActive ? 'text-blue-300' : 'text-gray-300'}`}>
                              {section.label}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {isViewed && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                            <span className="text-xs text-blue-400">+{section.points}</span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-1">{section.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>{section.timeEstimate}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Achievement Summary */}
                {achievements.size > 0 && (
                  <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Professional Achievements</h4>
                    <div className="space-y-1 text-sm text-yellow-300">
                      {achievements.has('persona-expert') && <div>• Persona Expert (+75 points)</div>}
                      {achievements.has('scenario-master') && <div>• Scenario Master (+100 points)</div>}
                      {achievements.has('communication-specialist') && <div>• Communication Specialist (+50 points)</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content - 80% */}
            <div className={`${isMobile ? 'flex-1' : 'flex-1'} overflow-y-auto`}>
              <div className="p-6">
                {renderSectionContent()}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Persona Overview Content Component
const PersonaOverviewContent: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries({
        'technical-decision-maker': {
          name: 'Technical Decision Maker',
          title: 'CTO / VP Engineering',
          color: 'blue',
          icon: BarChart3
        },
        'business-decision-maker': {
          name: 'Business Decision Maker', 
          title: 'CEO / VP Operations',
          color: 'green',
          icon: TrendingUp
        }
      }).map(([key, persona]) => {
        const Icon = persona.icon;
        return (
          <div key={key} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 bg-${persona.color}-600 rounded-full flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{persona.name}</h3>
                <p className="text-gray-400">{persona.title}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Experience:</span>
                  <p className="text-white">8-15 years</p>
                </div>
                <div>
                  <span className="text-gray-400">Team Size:</span>
                  <p className="text-white">25-100 people</p>
                </div>
                <div>
                  <span className="text-gray-400">Budget:</span>
                  <p className="text-white">$500K-2M</p>
                </div>
                <div>
                  <span className="text-gray-400">Industry:</span>
                  <p className="text-white">SaaS/Tech</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// Psychology Profile Content Component
const PsychologyProfileContent: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Brain className="w-6 h-6 text-purple-400 mr-3" />
        Decision-Making Psychology
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-green-400 mb-3">Core Motivations</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Deliver measurable business impact</li>
              <li>• Maintain technical credibility</li>
              <li>• Reduce operational risk</li>
              <li>• Enable team productivity</li>
            </ul>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-3">Decision Patterns</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Consensus-driven approach</li>
              <li>• Data-backed decisions</li>
              <li>• Risk-assessment focused</li>
              <li>• Implementation timeline critical</li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-red-400 mb-3">Primary Concerns</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Technology integration complexity</li>
              <li>• Team adoption and learning curve</li>
              <li>• Budget approval and ROI pressure</li>
              <li>• Vendor reliability and support</li>
            </ul>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-yellow-400 mb-3">Influence Factors</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Peer recommendations</li>
              <li>• Industry best practices</li>
              <li>• Proven case studies</li>
              <li>• Technical validation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Communication Style Content Component
const CommunicationStyleContent: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <MessageCircle className="w-6 h-6 text-blue-400 mr-3" />
        Communication Preferences
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-blue-400 mb-3">Preferred Channels</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Email for detailed information</li>
            <li>• Video calls for demos</li>
            <li>• Slack/Teams for quick updates</li>
            <li>• In-person for final decisions</li>
          </ul>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-3">Messaging Style</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Technical depth with business context</li>
            <li>• Clear ROI and value propositions</li>
            <li>• Specific use cases and examples</li>
            <li>• Implementation timelines</li>
          </ul>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-purple-400 mb-3">Content Preferences</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Technical whitepapers</li>
            <li>• Customer success stories</li>
            <li>• Implementation guides</li>
            <li>• Security documentation</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Scenarios Content Component
const ScenariosContent: React.FC<ScenariosContentProps> = ({ scenarios, completedScenarios, onScenarioComplete }) => (
  <div className="space-y-6">
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Play className="w-6 h-6 text-green-400 mr-3" />
        Practice Scenarios
      </h3>
      
      <div className="space-y-4">
        {scenarios.map((scenario) => {
          const isCompleted = completedScenarios.has(scenario.id);
          
          return (
            <div key={scenario.id} className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-white">{scenario.title}</h4>
                  <p className="text-sm text-gray-400">{scenario.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
                  <span className={`px-2 py-1 rounded text-xs ${
                    scenario.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
                    scenario.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>+{scenario.points} points</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{scenario.timeEstimate}</span>
                  </span>
                </div>
                
                <button
                  onClick={() => onScenarioComplete(scenario.id)}
                  disabled={isCompleted}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[36px] touch-manipulation ${
                    isCompleted 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                  aria-label={isCompleted ? 'Scenario completed' : `Start ${scenario.title} practice`}
                >
                  {isCompleted ? 'Completed' : 'Start Practice'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {completedScenarios.size >= scenarios.length && (
        <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-green-400" />
            <span className="font-medium text-green-400">Professional Mastery</span>
          </div>
          <p className="text-green-300 text-sm">
            Outstanding work! You've completed all practice scenarios. 
            This hands-on experience builds real-world conversation skills.
          </p>
        </div>
      )}
    </div>
  </div>
);

// Value Drivers Content Component
const ValueDriversContent: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <DollarSign className="w-6 h-6 text-green-400 mr-3" />
        Primary Value Drivers
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-green-400 mb-3">Financial Drivers</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Cost reduction through automation</li>
              <li>• Revenue growth from efficiency</li>
              <li>• Risk mitigation value</li>
              <li>• Time-to-market improvement</li>
            </ul>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-3">Operational Drivers</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Process standardization</li>
              <li>• Team productivity gains</li>
              <li>• Quality improvement</li>
              <li>• Scalability enablement</li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-purple-400 mb-3">Strategic Drivers</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Competitive differentiation</li>
              <li>• Innovation capability</li>
              <li>• Market positioning</li>
              <li>• Future-proofing technology</li>
            </ul>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-yellow-400 mb-3">Personal Drivers</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Career advancement opportunities</li>
              <li>• Team satisfaction and retention</li>
              <li>• Professional credibility</li>
              <li>• Work-life balance improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PersonaDetailModal;
export type { 
  PersonaDetailModalProps, 
  ProgressUpdate, 
  SectionConfig, 
  PracticeScenario,
  ScenariosContentProps 
};