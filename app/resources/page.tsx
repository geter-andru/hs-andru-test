'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/src/shared/hooks/useSupabaseAuth';
import { EnterpriseNavigationV2 } from '@/src/shared/components/layout/EnterpriseNavigationV2';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Lock, 
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

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
    name: 'Core Resources',
    description: 'Essential buyer intelligence and foundational frameworks',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    icon: FileText
  },
  {
    id: 2,
    name: 'Advanced Resources',
    description: 'Advanced methodologies and systematic implementation',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
    icon: Sparkles
  },
  {
    id: 3,
    name: 'Strategic Resources',
    description: 'Sophisticated strategic frameworks for market leadership',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-700',
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
    title: 'Strategic Framework Analysis',
    description: 'Jobs to be Done and compelling events analysis',
    tier: 3,
    category: 'strategic_tools',
    status: 'locked',
    lastUpdated: '2025-01-24',
    accessCount: 0
  }
];

export default function ResourcesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useSupabaseAuth();
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load
    
    if (!user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <EnterpriseNavigationV2>
        <div className="flex items-center justify-center h-64">
          <div className="text-text-muted">Loading...</div>
        </div>
      </EnterpriseNavigationV2>
    );
  }

  if (!user) {
    return null;
  }

  // Filter resources based on search and tier
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === null || resource.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  // Group resources by tier
  const resourcesByTier = RESOURCE_TIERS.map(tier => ({
    ...tier,
    resources: filteredResources.filter(resource => resource.tier === tier.id)
  }));

  const handleGenerateResource = async () => {
    setIsGenerating(true);
    // TODO: Implement actual resource generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <EnterpriseNavigationV2>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Resources Library
            </h1>
            <p className="text-text-muted mt-1">
              AI-powered personalized resources for your revenue intelligence
            </p>
          </div>
          <div className="text-sm text-text-subtle">
            User ID: <span className="font-mono bg-surface px-2 py-1 rounded">{user.id.slice(0, 8)}...</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-surface-hover rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTier(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTier === null
                  ? 'bg-brand-primary text-white'
                  : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              All Tiers
            </button>
            {RESOURCE_TIERS.map(tier => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTier === tier.id
                    ? 'bg-brand-primary text-white'
                    : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                Tier {tier.id}
              </button>
            ))}
          </div>
        </div>

        {/* Generate New Resource Button */}
        <div className="flex justify-end">
          <button
            onClick={handleGenerateResource}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Generate New Resource
              </>
            )}
          </button>
        </div>

        {/* Resources by Tier */}
        <div className="space-y-8">
          {resourcesByTier.map(tier => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: tier.id * 0.1 }}
              className={`${tier.bgColor} ${tier.borderColor} border rounded-xl p-6`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${tier.color} text-white`}>
                  <tier.icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">{tier.name}</h2>
                  <p className="text-text-muted text-sm">{tier.description}</p>
                </div>
              </div>

              {tier.resources.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-text-muted mx-auto mb-3" />
                  <p className="text-text-muted">No resources found in this tier</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tier.resources.map(resource => (
                    <motion.div
                      key={resource.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-text-primary text-sm">{resource.title}</h3>
                        <div className="flex items-center gap-1">
                          {resource.status === 'available' && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                          {resource.status === 'locked' && (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                          {resource.status === 'generating' && (
                            <Clock className="w-4 h-4 text-blue-500 animate-spin" />
                          )}
                        </div>
                      </div>
                      
                      <p className="text-text-muted text-xs mb-3 line-clamp-2">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-text-subtle">
                        <span>{resource.accessCount} accesses</span>
                        <span>{resource.lastUpdated}</span>
                      </div>
                      
                      <div className="mt-3 flex gap-2">
                        {resource.status === 'available' && (
                          <>
                            <button className="flex-1 px-3 py-1 bg-brand-primary text-white text-xs rounded hover:bg-blue-700 transition-colors">
                              View
                            </button>
                            <button className="px-3 py-1 bg-surface text-text-secondary text-xs rounded hover:bg-surface-hover transition-colors">
                              <Download className="w-3 h-3" />
                            </button>
                          </>
                        )}
                        {resource.status === 'locked' && (
                          <button className="w-full px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded cursor-not-allowed">
                            Locked
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No resources found</h3>
            <p className="text-text-muted mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Generate your first resource to get started'}
            </p>
            {!searchQuery && (
              <button
                onClick={handleGenerateResource}
                className="px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Generate First Resource
              </button>
            )}
          </div>
        )}
      </div>
    </EnterpriseNavigationV2>
  );
}