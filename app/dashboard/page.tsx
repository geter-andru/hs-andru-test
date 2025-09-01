'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, getCurrentUser } from '@/lib/supabase/client';
import { auth } from '@/lib/api/client';
import SimplifiedDashboard from '@/app/components/dashboard/SimplifiedDashboard';
import { useCustomer, useProgress, useMilestones, useProgressInsights } from '@/lib/hooks/useAPI';

export default function DashboardPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check Supabase auth first (client-side only)
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!error && session?.user) {
          // Use Supabase user ID as customer ID
          const userId = session.user.id;
          console.log('✅ Dashboard - Supabase user authenticated:', { 
            userId, 
            email: session.user.email 
          });
          setCustomerId(userId);
          setCustomerData({
            id: userId,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email,
            isSupabaseUser: true
          });
          return;
        }

        // Fallback to legacy auth
        const id = auth.getCustomerId();
        if (!id || !auth.isAuthenticated()) {
          router.push('/login?redirectTo=/dashboard/');
        } else {
          setCustomerId(id);
          const customer = auth.getCurrentCustomer();
          setCustomerData(customer);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login?redirectTo=/dashboard/');
      }
    };

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const userId = session.user.id;
        setCustomerId(userId);
        setCustomerData({
          id: userId,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email,
          isSupabaseUser: true
        });
      } else if (event === 'SIGNED_OUT') {
        router.push('/login?redirectTo=/dashboard/');
      }
    });

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Skip API calls for Supabase users to prevent failures
  const isSupabaseUser = customerData?.isSupabaseUser;
  const { data: customer, isLoading: customerLoading } = useCustomer(isSupabaseUser ? undefined : customerId);
  const { data: progress, isLoading: progressLoading } = useProgress(isSupabaseUser ? undefined : customerId);
  const { data: milestones, isLoading: milestonesLoading } = useMilestones(isSupabaseUser ? undefined : customerId);
  const { data: insights, isLoading: insightsLoading } = useProgressInsights(isSupabaseUser ? undefined : customerId);

  if (!customerId) {
    return null;
  }

  const isLoading = customerLoading || progressLoading || milestonesLoading || insightsLoading;

  // Enhanced dashboard routing based on customer type
  const shouldUseSimplifiedDashboard = true; // For now, default to enhanced React SPA dashboard

  if (shouldUseSimplifiedDashboard) {
    return (
      <SimplifiedDashboard 
        customerId={customerId} 
        customerData={customerData}
      />
    );
  }

  // Fallback to simplified dashboard (this code path is not reached due to shouldUseSimplifiedDashboard = true)
  return (
    <SimplifiedDashboard 
      customerId={customerId} 
      customerData={customerData}
    />
  );
}