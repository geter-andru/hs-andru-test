'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProgressOverview } from '@/components/dashboard/ProgressOverview';
import { MilestonesCard } from '@/components/dashboard/MilestonesCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { InsightsPanel } from '@/components/dashboard/InsightsPanel';
import { useCustomer, useProgress, useMilestones, useProgressInsights } from '@/lib/hooks/useAPI';

export default function DashboardPage() {
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

  const { data: customer, isLoading: customerLoading } = useCustomer(customerId);
  const { data: progress, isLoading: progressLoading } = useProgress(customerId);
  const { data: milestones, isLoading: milestonesLoading } = useMilestones(customerId);
  const { data: insights, isLoading: insightsLoading } = useProgressInsights(customerId);

  if (!customerId) {
    return null;
  }

  const isLoading = customerLoading || progressLoading || milestonesLoading || insightsLoading;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back{customer?.data?.name ? `, ${customer.data.name}` : ''}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your revenue intelligence overview
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Customer ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{customerId}</span>
          </div>
        </div>

        {/* Progress Overview */}
        <ProgressOverview 
          progress={progress?.data} 
          isLoading={isLoading}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Milestones */}
            <MilestonesCard 
              milestones={milestones?.data} 
              isLoading={milestonesLoading}
              customerId={customerId}
            />

            {/* Recent Activity */}
            <RecentActivity 
              activities={progress?.data?.recentActions}
              isLoading={progressLoading}
            />
          </div>

          {/* Right Column - 1 col */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions customerId={customerId} />

            {/* Insights */}
            <InsightsPanel 
              insights={insights?.data}
              isLoading={insightsLoading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}