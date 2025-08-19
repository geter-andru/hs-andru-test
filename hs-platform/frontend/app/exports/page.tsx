'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/api/client';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ExportCenter } from '@/components/dashboard/ExportCenter';

export default function ExportsPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [exportStage, setExportStage] = useState(0); // Track export workflow stage

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

  const handleExport = (format: string, options: any) => {
    console.log('Exporting:', format, options);
    // Here you would implement the actual export logic
    // For now, we'll just log the action
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Materials Gradient */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl opacity-10"></div>
            <div className="relative p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                <h1 className="text-3xl font-bold text-white">
                  Sales Materials Library
                </h1>
              </div>
              <p className="text-white mt-2">
                Ready-to-use materials for any prospect or sales situation
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-xs text-white">Executive Ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-xs text-white">Customizable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-xs text-white">Multi-format</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Workflow Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white">
              {exportStage} of 4 export steps completed
            </span>
            <span className="text-sm text-white">Export Progress</span>
          </div>
          <div className="flex items-center justify-between">
            {[0,1,2,3,4].map(step => (
              <div key={step} className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step <= exportStage ? 'bg-pink-500 ring-4 ring-pink-500/30' : 'bg-slate-600'
              }`} />
            ))}
          </div>
        </div>

        {/* Export Center */}
        <ExportCenter 
          customerId={customerId}
          onExport={handleExport}
        />
      </div>
    </DashboardLayout>
  );
}