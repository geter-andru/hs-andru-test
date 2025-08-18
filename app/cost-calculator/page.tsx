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

  const trackAction = useTrackAction();
  const { data: costHistory } = useCostHistory(customerId);
  
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
        metadata: { page: 'cost_calculator' }
      });
    }
  }, [router, trackAction]);

  if (!customerId) {
    return null;
  }

  const tabs = [
    { id: 'calculator', name: 'Calculator', description: 'Calculate cost of inaction' },
    { id: 'results', name: 'Results', description: 'View calculation results' },
    { id: 'history', name: 'History', description: 'Previous calculations' },
  ];

  const handleCalculationComplete = (results: any) => {
    setCurrentResults(results);
    setActiveTab('results');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Cost of Inaction Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Calculate the true financial impact of delayed decision-making and missed opportunities
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