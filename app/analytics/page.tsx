'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api/client';
import DashboardLayout from '@/app/components/layout/DashboardLayout';
import AdvancedAnalyticsDashboard from '@/app/components/analytics/AdvancedAnalyticsDashboard';

export default function AnalyticsPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string | undefined>();

  useEffect(() => {
    const id = auth.getCustomerId();
    if (!id || !auth.isAuthenticated()) {
      router.push('/login');
    } else {
      setCustomerId(id);
    }
  }, [router]);

  if (!customerId) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with AI Gradient */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-10"></div>
            <div className="relative p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                <h1 className="text-3xl font-bold text-white">
                  Advanced Analytics
                </h1>
              </div>
              <p className="text-white mt-2">
                AI-powered insights and predictive analytics
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-xs text-white">Live Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white">AI Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-xs text-white">Real-time Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Analytics Dashboard */}
        <AdvancedAnalyticsDashboard customerId={customerId} />
      </div>
    </DashboardLayout>
  );
}