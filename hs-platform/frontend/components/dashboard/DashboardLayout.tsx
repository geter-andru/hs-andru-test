'use client';

import { EnterpriseNavigationV2 } from '@/components/navigation/EnterpriseNavigationV2';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <EnterpriseNavigationV2>
      <div className="p-6 lg:p-8">
        {children}
      </div>
    </EnterpriseNavigationV2>
  );
}