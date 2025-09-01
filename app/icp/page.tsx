'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { unifiedAuth } from '@/lib/auth/unified-auth';
import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { ICPAnalysisForm } from '@/app/components/icp/ICPAnalysisForm';
import { ICPResults } from '@/app/components/icp/ICPResults';
import { ICPHistory } from '@/app/components/icp/ICPHistory';
import { useCustomerICP, useTrackAction } from '@/lib/hooks/useAPI';

export default function ICPPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<'analysis' | 'results' | 'history'>('analysis');
  const [hasTrackedPageView, setHasTrackedPageView] = useState(false);

  const trackAction = useTrackAction();
  
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await unifiedAuth.isAuthenticated();
      const id = await unifiedAuth.getCustomerId();
      
      if (!id || !isAuth) {
        router.push('/login');
      } else {
        setCustomerId(id);
        // Track page view only once per session
        if (!hasTrackedPageView) {
          setHasTrackedPageView(true);
          trackAction.mutate({
            customerId: id,
            action: 'page_view',
            metadata: { page: 'icp_analysis' }
          });
        }
      }
    };

    checkAuth();
  }, [router, hasTrackedPageView, trackAction]);

  const { data: icpData, isLoading } = useCustomerICP(customerId);

  if (!customerId) {
    return null;
  }

  const workflowSteps = [
    { 
      id: 'analysis', 
      name: 'Qualify Prospect', 
      description: 'Rate a new company', 
      title: 'Company Analysis',
      active: activeTab === 'analysis',
      completed: activeTab === 'results' || activeTab === 'history'
    },
    { 
      id: 'results', 
      name: 'Qualification Results', 
      description: 'View prospect scores', 
      title: 'Prospect Score',
      active: activeTab === 'results',
      completed: activeTab === 'history'
    },
    { 
      id: 'history', 
      name: 'Previous Qualifications', 
      description: 'Past prospect ratings', 
      title: 'History & Insights',
      active: activeTab === 'history',
      completed: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Gradient */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-5"></div>
            <div className="relative p-6 rounded-2xl border border-slate-700">
              <h1 className="text-3xl font-bold text-white mb-2">
                Prospect Qualification Tool
              </h1>
              <p className="text-white">
                Rate any company 1-100 for sales fit in 30 seconds
              </p>
            </div>
          </div>
        </div>

        {/* Workflow Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white">
              {workflowSteps.filter(s => s.completed).length} of {workflowSteps.length} steps completed
            </span>
            <span className="text-sm text-white">Progress</span>
          </div>
          <div className="flex items-center justify-between">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step.active ? 'bg-blue-500 ring-4 ring-blue-500/30' : 
                step.completed ? 'bg-emerald-500' : 'bg-slate-600'
              }`} />
            ))}
          </div>
        </div>

        {/* Workflow Step Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {workflowSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.id as any)}
              className={`
                relative bg-slate-800 border-2 rounded-2xl p-6 transition-all duration-300 text-left
                ${step.active ? 'border-blue-500 shadow-lg shadow-blue-500/20 transform -translate-y-1' : 'border-slate-700'}
                ${step.completed ? 'bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 border-emerald-500' : ''}
                hover:transform hover:-translate-y-1 hover:shadow-xl hover:border-purple-500/50
              `}
            >
              {/* Step number indicator */}
              <div className={`absolute -top-3 -left-3 w-6 h-6 text-white text-xs font-bold rounded-full flex items-center justify-center ${
                step.completed ? 'bg-emerald-500' : 
                step.active ? 'bg-blue-500' : 'bg-slate-600'
              }`}>
                {step.completed ? '✓' : index + 1}
              </div>
              
              {/* Card content */}
              <div className="space-y-3">
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-white">{step.description}</p>
                {step.active && (
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </div>
            </button>
          ))}
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