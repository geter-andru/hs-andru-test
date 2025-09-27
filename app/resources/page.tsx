'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Presentation, BarChart3, Users, Target, Clock, ArrowRight, Sparkles, Download, Search, Filter } from 'lucide-react';
import { ModernCard } from '@/src/shared/components/ui/ModernCard';
import { Button } from '@/src/shared/components/ui/Button';
import { Input } from '@/src/shared/components/ui/FormComponents';

interface ResourceFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'available' | 'coming-soon' | 'premium';
  href?: string;
  category: 'guide' | 'template' | 'framework' | 'tool';
}

const resourceFeatures: ResourceFeature[] = [
  {
    id: 'icp-guide',
    title: 'ICP Implementation Guide',
    description: 'Step-by-step guide to implementing your Ideal Customer Profile strategy',
    icon: BookOpen,
    status: 'available',
    href: '/resources/icp-guide',
    category: 'guide'
  },
  {
    id: 'business-case-template',
    title: 'Business Case Template',
    description: 'Executive-ready template for building compelling business cases',
    icon: FileText,
    status: 'available',
    href: '/resources/business-case-template',
    category: 'template'
  },
  {
    id: 'presentation-framework',
    title: 'Presentation Framework',
    description: 'Professional presentation templates for stakeholder buy-in',
    icon: Presentation,
    status: 'available',
    href: '/resources/presentation-framework',
    category: 'framework'
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Real-time analytics and performance tracking tools',
    icon: BarChart3,
    status: 'coming-soon',
    category: 'tool'
  },
  {
    id: 'team-collaboration',
    title: 'Team Collaboration Tools',
    description: 'Tools for managing cross-functional ICP implementation teams',
    icon: Users,
    status: 'premium',
    category: 'tool'
  },
  {
    id: 'goal-tracking',
    title: 'Goal Tracking System',
    description: 'Advanced goal setting and progress tracking capabilities',
    icon: Target,
    status: 'premium',
    category: 'framework'
  }
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredFeatures = resourceFeatures.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || feature.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600 dark:text-green-400';
      case 'coming-soon':
        return 'text-orange-600 dark:text-orange-400';
      case 'premium':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'coming-soon':
        return 'Coming Soon';
      case 'premium':
        return 'Premium';
      default:
        return 'Unknown';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guide':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'template':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'framework':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'tool':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-green-600" />
                Resources Library
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Access comprehensive guides, templates, and frameworks to accelerate your ICP implementation
              </p>
            </div>
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Controls */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="guide">Guides</option>
                <option value="template">Templates</option>
                <option value="framework">Frameworks</option>
                <option value="tool">Tools</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="coming-soon">Coming Soon</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ModernCard className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      feature.status === 'available' ? 'bg-green-100 dark:bg-green-900/20' :
                      feature.status === 'coming-soon' ? 'bg-orange-100 dark:bg-orange-900/20' :
                      'bg-purple-100 dark:bg-purple-900/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        feature.status === 'available' ? 'text-green-600 dark:text-green-400' :
                        feature.status === 'coming-soon' ? 'text-orange-600 dark:text-orange-400' :
                        'text-purple-600 dark:text-purple-400'
                      }`} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(feature.category)}`}>
                        {feature.category}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        feature.status === 'available' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                        feature.status === 'coming-soon' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                      }`}>
                        {getStatusText(feature.status)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-1">
                    {feature.description}
                  </p>

                  <div className="mt-auto">
                    {feature.status === 'available' && feature.href ? (
                      <Button 
                        className="w-full"
                        onClick={() => window.location.href = feature.href!}
                      >
                        Access Resource
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : feature.status === 'premium' ? (
                      <Button 
                        className="w-full"
                        variant="outline"
                        disabled
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Premium Feature
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        variant="outline"
                        disabled
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </ModernCard>
              </motion.div>
            );
          })}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12">
          <ModernCard className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Need Custom Resources?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Generate personalized resources based on your specific ICP and business requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="px-8">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Custom Resources
                </Button>
                <Button variant="outline" className="px-8">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Available
                </Button>
              </div>
            </div>
          </ModernCard>
        </div>
      </div>
    </div>
  );
}