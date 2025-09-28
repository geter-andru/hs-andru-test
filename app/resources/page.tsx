'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/src/shared/hooks/useSupabaseAuth';
import { EnterpriseNavigationV2 } from '@/src/shared/components/layout/EnterpriseNavigationV2';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { ResourceGrid } from '@/src/features/resources/ResourceGrid';
import { ResourceGenerationForm } from '@/src/features/resources/ResourceGenerationForm';

// Types for Resources Library
interface Resource {
  id: string;
  title: string;
  description: string;
  tier: 1 | 2 | 3;
  category: string;
  status: 'available' | 'locked' | 'generating';
  lastUpdated: string;
  accessCount: number;
}

interface ResourceTier {
  id: 1 | 2 | 3;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const RESOURCE_TIERS: ResourceTier[] = [
  {
    id: 1,
    name: 'Core',
    description: 'Essential buyer intelligence and foundational frameworks',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: FileText
  },
  {
    id: 2,
    name: 'Advanced',
    description: 'Advanced methodologies and systematic implementation',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    icon: Sparkles
  },
  {
    id: 3,
    name: 'Strategic',
    description: 'Sophisticated strategic frameworks for market leadership',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    icon: CheckCircle
  }
];

// Mock data for initial implementation
const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Product-Development-Revenue Analysis',
    description: 'Comprehensive PDR framework for technical founders',
    tier: 1,
    category: 'buyer_intelligence',
    status: 'available',
    lastUpdated: '2025-01-27',
    accessCount: 12
  },
  {
    id: '2',
    title: 'Target Buyer Persona Template',
    description: 'Detailed buyer psychology mapping framework',
    tier: 1,
    category: 'buyer_intelligence',
    status: 'available',
    lastUpdated: '2025-01-26',
    accessCount: 8
  },
  {
    id: '3',
    title: 'Advanced Sales Methodologies',
    description: 'Systematic prospecting and qualification frameworks',
    tier: 2,
    category: 'sales_frameworks',
    status: 'locked',
    lastUpdated: '2025-01-25',
    accessCount: 0
  },
  {
    id: '4',
    title: 'Strategic Market Positioning',
    description: 'Enterprise-level market analysis and positioning strategies',
    tier: 3,
    category: 'strategic_planning',
    status: 'locked',
    lastUpdated: '2025-01-24',
    accessCount: 0
  }
];

export default function ResourcesPage() {
  const { user, loading: authLoading } = useSupabaseAuth();
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenerationForm, setShowGenerationForm] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Handle resource click
  const handleResourceClick = (resource: Resource) => {
    console.log('Resource clicked:', resource);
    // TODO: Implement resource detail modal or navigation
  };

  // Handle generate new resource
  const handleGenerateResource = () => {
    setShowGenerationForm(true);
  };

  // Handle form submission
  const handleFormSubmit = async (request: any) => {
    setIsGenerating(true);
    try {
      // TODO: Implement resource generation API call
      console.log('Generating resource with request:', request);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Close form and show success
      setShowGenerationForm(false);
      
      // TODO: Add the new resource to the list
      console.log('Resource generated successfully');
    } catch (error) {
      console.error('Failed to generate resource:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show not authenticated state
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EnterpriseNavigationV2 />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Resources Library
              </h1>
              <p className="text-gray-600">
                AI-powered resources to accelerate your revenue growth
              </p>
            </div>
            <button
              onClick={handleGenerateResource}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Generate Resource
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <ResourceGrid
          resources={resources}
          tiers={RESOURCE_TIERS}
          onResourceClick={handleResourceClick}
          onGenerateResource={handleGenerateResource}
          isLoading={isLoading}
        />

        {/* Resource Generation Form */}
        <ResourceGenerationForm
          customerId={user?.id || ''}
          onGenerate={handleFormSubmit}
          onClose={() => setShowGenerationForm(false)}
          isOpen={showGenerationForm}
          isLoading={isGenerating}
        />
      </div>
    </div>
  );
}