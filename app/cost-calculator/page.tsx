'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { unifiedAuth } from '@/lib/auth/unified-auth';
import { SimplifiedCostCalculator } from '@/src/features/cost-business-case';

export default function CostCalculatorPage() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState<any>(null);
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await unifiedAuth.isAuthenticated();
      const id = await unifiedAuth.getCustomerId();
      const customer = await unifiedAuth.getCurrentUser();
      
      if (!id || !isAuth) {
        router.push('/login');
      } else {
        setCustomerId(id);
        setCustomerData(customer);
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-red-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading cost calculator...</p>
        </div>
      </div>
    );
  }

  if (!customerId || !customerData) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load customer data</p>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <SimplifiedCostCalculator 
      customerId={customerId} 
      customerData={customerData}
    />
  );
}