'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement waitlist signup logic
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-semibold text-white">H&S Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl mb-6 block">🚀</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Revenue Intelligence
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Platform
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Systematic Performance Analysis for Technical Founders
            </p>
            <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto">
              Professional revenue optimization and business intelligence platform trusted by technical founders to unlock growth potential.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:-translate-y-1 shadow-lg"
            >
              Join Waitlist
            </button>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-600 hover:bg-slate-700 hover:border-slate-500 transition-all"
            >
              Learn More
            </button>
          </div>
          
          <p className="text-slate-500 text-sm">
            Trusted by <span className="text-blue-400 font-semibold">150+ technical founders</span>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gradient-to-b from-transparent to-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Transform Revenue Intelligence
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for technical founders to accelerate revenue growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-3">ICP Analysis</h3>
              <p className="text-slate-400">
                AI-powered customer profiling & segmentation to identify your ideal customers
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-white mb-3">Cost Calculator</h3>
              <p className="text-slate-400">
                Financial impact analysis of delayed decision-making and missed opportunities
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-3">Business Case</h3>
              <p className="text-slate-400">
                Automated proposals & ROI documentation for stakeholder buy-in
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-3">Progress Tracking</h3>
              <p className="text-slate-400">
                Real-time milestone tracking and achievement monitoring
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Results from Technical Founders
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30">
              <p className="text-slate-300 mb-4 text-lg">
                "Increased deal closure rate by 35%"
              </p>
              <div className="text-slate-400">
                <p className="font-medium">Sarah Chen</p>
                <p className="text-sm">CTO @ TechFlow</p>
              </div>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30">
              <p className="text-slate-300 mb-4 text-lg">
                "Reduced sales cycle time by 40%"
              </p>
              <div className="text-slate-400">
                <p className="font-medium">Mike Rodriguez</p>
                <p className="text-sm">Founder @ CloudOps</p>
              </div>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/30">
              <p className="text-slate-300 mb-4 text-lg">
                "Generated $2.3M additional revenue"
              </p>
              <div className="text-slate-400">
                <p className="font-medium">Alex Kim</p>
                <p className="text-sm">VP Engineering @ DataCore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA Section */}
      <section id="waitlist" className="px-6 py-20 bg-gradient-to-t from-slate-800/50 to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Revenue?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join 150+ technical founders already using H&S Platform to accelerate growth
          </p>
          
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitted}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isSubmitted ? 'Added!' : 'Join Waitlist'}
            </button>
          </form>
          
          <div className="text-slate-500 text-sm space-y-1">
            <p>✓ Early access priority</p>
            <p>✓ Exclusive founder resources</p>
            <p>✓ No spam, unsubscribe anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-semibold text-white">H&S Platform</span>
          </div>
          <p className="text-slate-400 mb-4">
            Revenue Intelligence Platform for Technical Founders
          </p>
          <div className="flex justify-center gap-6 text-slate-400">
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <span>•</span>
            <a href="mailto:support@platform.andru-ai.com" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
