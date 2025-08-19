'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { CostCalculatorForm } from '@/components/cost-calculator/CostCalculatorForm';
import { CostResults } from '@/components/cost-calculator/CostResults';
import { CostHistory } from '@/components/cost-calculator/CostHistory';
import { useCostHistory, useTrackAction } from '@/lib/hooks/useAPI';

export default function CostCalculatorPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<'calculator' | 'results' | 'history'>('calculator');
  const [currentResults, setCurrentResults] = useState<any>(null);
  const [hasTrackedPageView, setHasTrackedPageView] = useState(false);

  const trackAction = useTrackAction();
  const { data: costHistory } = useCostHistory(customerId);
  
  useEffect(() => {
    const id = auth.getCustomerId();
    if (!id || !auth.isAuthenticated()) {
      router.push('/login');
    } else {
      setCustomerId(id);
      // Track page view only once per session
      if (!hasTrackedPageView) {
        setHasTrackedPageView(true);
        trackAction.mutate({
          customerId: id,
          action: 'page_view',
          metadata: { page: 'cost_calculator' }
        });
      }
    }
  }, [router, hasTrackedPageView, trackAction]); // Include all dependencies but track only once

  if (!customerId) {
    return null;
  }

  const workflowSteps = [
    { 
      id: 'calculator', 
      name: 'Calculate Deal Value', 
      description: 'Create urgency with costs', 
      title: 'Impact Calculator',
      active: activeTab === 'calculator',
      completed: activeTab === 'results' || activeTab === 'history'
    },
    { 
      id: 'results', 
      name: 'Business Case', 
      description: 'Executive presentation', 
      title: 'Financial Impact',
      active: activeTab === 'results',
      completed: activeTab === 'history'
    },
    { 
      id: 'history', 
      name: 'Previous Deals', 
      description: 'Past calculations', 
      title: 'Deal Archive',
      active: activeTab === 'history',
      completed: false
    }
  ];

  const handleCalculationComplete = (results: any) => {
    setCurrentResults(results);
    setActiveTab('results');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Strategic Gradient */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-2xl opacity-10"></div>
            <div className="relative p-6 rounded-2xl border border-slate-700">
              <h1 className="text-3xl font-bold text-white mb-2">
                Deal Value Calculator
              </h1>
              <p className="text-white">
                Show prospects the cost of waiting - create urgency with financial data
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
            <span className="text-sm text-white">Deal Progress</span>
          </div>
          <div className="flex items-center justify-between">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step.active ? 'bg-emerald-500 ring-4 ring-emerald-500/30' : 
                step.completed ? 'bg-blue-500' : 'bg-slate-600'
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
                ${step.active ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 transform -translate-y-1' : 'border-slate-700'}
                ${step.completed ? 'bg-gradient-to-br from-blue-600/20 to-blue-700/20 border-blue-500' : ''}
                hover:transform hover:-translate-y-1 hover:shadow-xl hover:border-purple-500/50
              `}
            >
              {/* Step number indicator */}
              <div className={`absolute -top-3 -left-3 w-6 h-6 text-white text-xs font-bold rounded-full flex items-center justify-center ${
                step.completed ? 'bg-blue-500' : 
                step.active ? 'bg-emerald-500' : 'bg-slate-600'
              }`}>
                {step.completed ? '✓' : index + 1}
              </div>
              
              {/* Card content */}
              <div className="space-y-3">
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-white">{step.description}</p>
                {step.active && (
                  <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'calculator' && (
            <CostCalculatorForm 
              customerId={customerId}
              onCalculationComplete={handleCalculationComplete}
            />
          )}
          
          {activeTab === 'results' && (
            <CostResults 
              customerId={customerId}
              results={currentResults || costHistory?.data?.[0]}
            />
          )}
          
          {activeTab === 'history' && (
            <CostHistory 
              customerId={customerId}
              onViewResults={(results) => {
                setCurrentResults(results);
                setActiveTab('results');
              }}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}