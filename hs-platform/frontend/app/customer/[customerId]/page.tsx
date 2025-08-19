import { Suspense } from 'react';
import CustomerRedirectClient from './CustomerRedirectClient';

// Generate static params for known customer IDs
export async function generateStaticParams() {
  return [
    { customerId: 'CUST_2' },
    { customerId: 'CUST_4' },
  ];
}

export default function CustomerRedirectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <CustomerRedirectClient />
    </Suspense>
  );
}