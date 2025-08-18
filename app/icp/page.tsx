'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ICPAnalysisForm } from '@/components/icp/ICPAnalysisForm';
import { ICPResults } from '@/components/icp/ICPResults';
import { ICPHistory } from '@/components/icp/ICPHistory';
import { useCustomerICP, useTrackAction } from '@/lib/hooks/useAPI';

export default function ICPPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<'analysis' | 'results' | 'history'>('analysis');

  const trackAction = useTrackAction();
  
  useEffect(() => {
    const id = auth.getCustomerId();
    if (!id || !auth.isAuthenticated()) {
      router.push('/login');
    } else {
      setCustomerId(id);
      // Track page view
      trackAction.mutate({
        customerId: id,
        action: 'page_view',
        metadata: { page: 'icp_analysis' }
      });
    }
  }, [router, trackAction]);

  const { data: icpData, isLoading } = useCustomerICP(customerId);

  if (!customerId) {
    return null;
  }

  const tabs = [
    { id: 'analysis', name: 'Analysis', description: 'Create new ICP analysis' },
    { id: 'results', name: 'Results', description: 'View your ICP insights' },
    { id: 'history', name: 'History', description: 'Previous analyses' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Ideal Customer Profile Analysis
          </h1>
          <p className="text-gray-600 mt-2">
            Identify and analyze your most valuable customer segments using AI-powered insights
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div>
                  <div>{tab.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{tab.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'analysis' && (
            <ICPAnalysisForm 
              customerId={customerId}
              onSuccess={() => setActiveTab('results')}
            />
          )}
          
          {activeTab === 'results' && (
            <ICPResults 
              customerId={customerId}
              icpData={icpData?.data}
              isLoading={isLoading}
            />
          )}
          
          {activeTab === 'history' && (
            <ICPHistory customerId={customerId} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}