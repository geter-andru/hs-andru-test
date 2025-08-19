'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api/client';
import { EnterpriseNavigationV2 } from '@/components/navigation/EnterpriseNavigationV2';
import { EnterpriseDashboard } from '@/components/dashboard/EnterpriseDashboard';
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
    <EnterpriseNavigationV2>
      <EnterpriseDashboard />
    </EnterpriseNavigationV2>
  );
}