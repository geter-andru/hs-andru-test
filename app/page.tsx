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
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary font-sans">
      {/* Navigation */}
      <nav className="relative z-sticky px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-semibold text-white">H&S Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/demo/phase-3f" 
              className="text-green-400 hover:text-green-300 transition-normal font-medium bg-green-900/20 px-3 py-1 rounded-md border border-green-500/30"
            >
              🚀 Phase 3F Demo
            </Link>
            <Link 
              href="/login" 
              className="text-text-secondary hover:text-text-primary transition-normal"
            >
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="bg-brand-primary text-text-primary px-lg py-sm rounded-md hover:bg-opacity-90 transition-normal transform hover:-translate-y-0.5"
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
            <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Revenue Intelligence
              <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Platform
              </span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Systematic Performance Analysis for Technical Founders
            </p>
            <p className="text-lg text-text-muted mb-12 max-w-3xl mx-auto">
              Professional revenue optimization and business intelligence platform trusted by technical founders to unlock growth potential.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-primary text-text-primary px-2xl py-lg rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-normal transform hover:-translate-y-1 shadow-lg"
            >
              Join Waitlist
            </button>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-surface text-text-primary px-2xl py-lg rounded-lg font-semibold text-lg border-2 border-surface-hover hover:bg-surface-hover hover:border-opacity-70 transition-normal"
            >
              Learn More
            </button>
          </div>
          
          <p className="text-text-subtle text-sm">
            Trusted by <span className="text-brand-primary font-semibold">150+ technical founders</span>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gradient-to-b from-transparent to-background-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Transform Revenue Intelligence
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Comprehensive tools designed specifically for technical founders to accelerate revenue growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-glass-background backdrop-blur-sm p-6 rounded-lg border border-glass-border hover:border-brand-primary/30 transition-normal">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">ICP Analysis</h3>
              <p className="text-text-muted">
                AI-powered customer profiling & segmentation to identify your ideal customers
              </p>
            </div>
            
            <div className="bg-glass-background backdrop-blur-sm p-6 rounded-lg border border-glass-border hover:border-brand-primary/30 transition-normal">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Cost Calculator</h3>
              <p className="text-text-muted">
                Financial impact analysis of delayed decision-making and missed opportunities
              </p>
            </div>
            
            <div className="bg-glass-background backdrop-blur-sm p-6 rounded-lg border border-glass-border hover:border-brand-primary/30 transition-normal">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Business Case</h3>
              <p className="text-text-muted">
                Automated proposals & ROI documentation for stakeholder buy-in
              </p>
            </div>
            
            <div className="bg-glass-background backdrop-blur-sm p-6 rounded-lg border border-glass-border hover:border-brand-primary/30 transition-normal">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Progress Tracking</h3>
              <p className="text-text-muted">
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
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Results from Technical Founders
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-glass-background backdrop-blur-sm p-6 rounded-lg border border-glass-border">
              <p className="text-text-secondary mb-4 text-lg">
                "Increased deal closure rate by 35%"
              </p>
              <div className="text-text-muted">
                <p className="font-medium">Sarah Chen</p>
                <p className="text-sm">CTO @ TechFlow</p>
              </div>
            </div>
            
            <div className="bg-glass-background backdrop-blur-sm p-6 rounded-lg border border-glass-border">
              <p className="text-text-secondary mb-4 text-lg">
                "Reduced sales cycle time by 40%"
              </p>
              <div className="text-text-muted">
                <p className="font-medium">Mike Rodriguez</p>
                <p className="text-sm">Founder @ CloudOps</p>
              </div>
            </div>
            
            <div className="bg-glass-background backdrop-blur-sm p-6 rounded-lg border border-glass-border">
              <p className="text-text-secondary mb-4 text-lg">
                "Generated $2.3M additional revenue"
              </p>
              <div className="text-text-muted">
                <p className="font-medium">Alex Kim</p>
                <p className="text-sm">VP Engineering @ DataCore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA Section */}
      <section id="waitlist" className="px-6 py-20 bg-gradient-to-t from-background-secondary/50 to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Ready to Transform Your Revenue?
          </h2>
          <p className="text-xl text-text-muted mb-8">
            Join 150+ technical founders already using H&S Platform to accelerate growth
          </p>
          
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-lg py-md rounded-md bg-surface border border-glass-border text-text-primary placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <button
              type="submit"
              disabled={isSubmitted}
              className="bg-brand-primary text-text-primary px-2xl py-md rounded-md font-semibold hover:bg-opacity-90 transition-normal transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isSubmitted ? 'Added!' : 'Join Waitlist'}
            </button>
          </form>
          
          <div className="text-text-subtle text-sm space-y-1">
            <p>✓ Early access priority</p>
            <p>✓ Exclusive founder resources</p>
            <p>✓ No spam, unsubscribe anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-glass-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-semibold text-text-primary">H&S Platform</span>
          </div>
          <p className="text-text-muted mb-4">
            Revenue Intelligence Platform for Technical Founders
          </p>
          <div className="flex justify-center gap-6 text-text-muted">
            <Link href="/login" className="hover:text-text-primary transition-normal">
              Sign In
            </Link>
            <span>•</span>
            <a href="mailto:support@platform.andru-ai.com" className="hover:text-text-primary transition-normal">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
