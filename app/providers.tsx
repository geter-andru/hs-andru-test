'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Removed ReactQueryDevtools - unnecessary for this platform
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/app/lib/components/ThemeProvider';
import { UserIntelligenceProvider } from '@/app/lib/contexts/UserIntelligenceContext';
import { SystematicScalingProvider } from '@/src/shared/contexts/SystematicScalingContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserIntelligenceProvider>
          <SystematicScalingProvider>
            {children}
          </SystematicScalingProvider>
        </UserIntelligenceProvider>
      </ThemeProvider>
      {isClient && (
        <>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </>
      )}
    </QueryClientProvider>
  );
}