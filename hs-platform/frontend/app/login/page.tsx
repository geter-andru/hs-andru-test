'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin } from '@/lib/hooks/useAPI';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, UserIcon, KeyIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type AuthMode = 'customer' | 'marketing';

function LoginContent() {
  const [authMode, setAuthMode] = useState<AuthMode>('marketing');
  const [customerId, setCustomerId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [email, setEmail] = useState('');
  const [showTokenField, setShowTokenField] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLogin();

  // Check for URL parameters for direct customer access
  const urlCustomerId = searchParams.get('customerId');
  const urlToken = searchParams.get('token');

  // If URL contains customer params, auto-switch to customer mode
  useEffect(() => {
    if (urlCustomerId && urlToken) {
      setAuthMode('customer');
      setCustomerId(urlCustomerId);
      setAccessToken(urlToken);
      setShowTokenField(true);
    }
  }, [urlCustomerId, urlToken]);

  const handleMarketingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirect to waitlist on landing page
    router.push('/#waitlist');
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (customerId) {
      // For customer token flow, validate token and redirect directly
      if (accessToken) {
        // Store token and customer info for static app
        document.cookie = `hs_access_token=${accessToken}; expires=${new Date(Date.now() + 24*60*60*1000).toUTCString()}; path=/`;
        document.cookie = `hs_customer_id=${customerId}; expires=${new Date(Date.now() + 7*24*60*60*1000).toUTCString()}; path=/`;
        // Direct access to dashboard
        router.push('/dashboard');
      } else {
        // Traditional customer ID login through API
        loginMutation.mutate(customerId);
      }
    }
  };

  const authModeVariants = {
    enter: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">🚀</span>
            <h1 className="text-2xl font-bold text-text-primary">H&S Platform</h1>
          </div>
          <p className="text-text-muted">
            AI-powered Revenue Intelligence
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="bg-glass-background backdrop-blur-sm border border-glass-border rounded-lg p-1 mb-6">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setAuthMode('marketing')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-normal ${
                authMode === 'marketing'
                  ? 'bg-brand-primary text-text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              I'm New Here
            </button>
            <button
              onClick={() => setAuthMode('customer')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-normal ${
                authMode === 'customer'
                  ? 'bg-brand-primary text-text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              Customer Access
            </button>
          </div>
        </div>

        {/* Auth Forms */}
        <div className="bg-glass-background backdrop-blur-sm border border-glass-border rounded-lg p-6">
          <AnimatePresence mode="wait">
            {authMode === 'marketing' ? (
              <motion.div
                key="marketing"
                variants={authModeVariants}
                initial="exit"
                animate="enter"
                exit="exit"
              >
                <div className="text-center mb-6">
                  <UserIcon className="w-12 h-12 text-brand-primary mx-auto mb-3" />
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Welcome to H&S Platform
                  </h2>
                  <p className="text-text-muted text-sm">
                    Join our waitlist to get early access to the most advanced revenue intelligence platform for technical founders.
                  </p>
                </div>

                <form onSubmit={handleMarketingSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-lg py-md border border-glass-border rounded-md bg-surface text-text-primary placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary transition-normal"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-brand-primary text-text-primary py-md px-lg rounded-md font-medium hover:bg-opacity-90 transition-normal flex items-center justify-center space-x-2"
                  >
                    <span>Join Waitlist</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </motion.button>
                </form>

                <div className="mt-6 pt-4 border-t border-glass-border text-center">
                  <p className="text-xs text-text-subtle">
                    Already have customer access?{' '}
                    <button
                      onClick={() => setAuthMode('customer')}
                      className="text-brand-primary hover:text-brand-secondary transition-normal"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="customer"
                variants={authModeVariants}
                initial="exit"
                animate="enter"
                exit="exit"
              >
                <div className="text-center mb-6">
                  <KeyIcon className="w-12 h-12 text-brand-primary mx-auto mb-3" />
                  <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Customer Access
                  </h2>
                  <p className="text-text-muted text-sm">
                    Access your personalized revenue intelligence dashboard.
                  </p>
                </div>

                <form onSubmit={handleCustomerSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="customerId" className="block text-sm font-medium text-text-secondary mb-2">
                      Customer ID
                    </label>
                    <input
                      type="text"
                      id="customerId"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      placeholder="Enter your Customer ID (e.g., CUST_2)"
                      className="w-full px-lg py-md border border-glass-border rounded-md bg-surface text-text-primary placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary transition-normal"
                      required
                      pattern="^CUST_\d+$"
                      title="Customer ID must be in format CUST_XXX"
                    />
                  </div>

                  {showTokenField && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <label htmlFor="accessToken" className="block text-sm font-medium text-text-secondary mb-2">
                        Access Token
                      </label>
                      <input
                        type="text"
                        id="accessToken"
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                        placeholder="Enter your access token"
                        className="w-full px-lg py-md border border-glass-border rounded-md bg-surface text-text-primary placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary transition-normal"
                      />
                    </motion.div>
                  )}

                  <div className="flex items-center text-xs text-text-subtle">
                    <button
                      type="button"
                      onClick={() => setShowTokenField(!showTokenField)}
                      className="text-brand-primary hover:text-brand-secondary transition-normal"
                    >
                      {showTokenField ? 'Hide' : 'Have an'} access token?
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-brand-primary text-text-primary py-md px-lg rounded-md font-medium hover:bg-opacity-90 transition-normal disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span>{loginMutation.isPending ? 'Accessing...' : 'Access Platform'}</span>
                    {!loginMutation.isPending && <ArrowRightIcon className="w-4 h-4" />}
                  </motion.button>
                </form>

                <div className="mt-6 pt-4 border-t border-glass-border">
                  <div className="bg-glass-background border border-glass-border rounded-md p-3">
                    <div className="flex items-start space-x-2">
                      <ExclamationTriangleIcon className="w-4 h-4 text-brand-secondary mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-text-muted">
                        <p className="font-medium text-text-secondary mb-1">Demo Credentials:</p>
                        <p><code className="bg-surface px-1 py-0.5 rounded text-text-primary">CUST_2</code> (Basic Access)</p>
                        <p><code className="bg-surface px-1 py-0.5 rounded text-text-primary">CUST_4</code> (Admin Demo)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-text-subtle">
                    Looking to join our platform?{' '}
                    <button
                      onClick={() => setAuthMode('marketing')}
                      className="text-brand-primary hover:text-brand-secondary transition-normal"
                    >
                      Join waitlist
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="text-sm text-text-muted hover:text-text-secondary transition-normal flex items-center justify-center space-x-1"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-text-subtle">
            Powered by AI • Built for Revenue Teams
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}