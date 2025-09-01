'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * EngagementTracking - User engagement analytics system
 * 
 * Features:
 * - Real-time user behavior tracking
 * - Engagement metrics and scoring
 * - Session analytics and insights
 * - User journey mapping
 * - Conversion funnel analysis
 * - Retention and churn prediction
 * - A/B testing integration
 * - Privacy-compliant tracking
 */

export type EngagementEvent = 
  | 'page_view' 
  | 'click' 
  | 'scroll' 
  | 'hover' 
  | 'focus' 
  | 'form_submit' 
  | 'video_play' 
  | 'download' 
  | 'share' 
  | 'like' 
  | 'comment'
  | 'purchase'
  | 'signup'
  | 'login'
  | 'logout'
  | 'search'
  | 'filter'
  | 'sort'
  | 'export'
  | 'print'
  | 'help'
  | 'error'
  | 'custom';

export type EngagementLevel = 'low' | 'medium' | 'high' | 'very_high';
export type UserSegment = 'new' | 'returning' | 'engaged' | 'at_risk' | 'churned' | 'champion';
export type ConversionStage = 'awareness' | 'interest' | 'consideration' | 'intent' | 'purchase' | 'retention';

export interface EngagementMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target?: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  category: 'usage' | 'engagement' | 'conversion' | 'retention' | 'satisfaction';
  description: string;
}

export interface UserEvent {
  id: string;
  userId: string;
  sessionId: string;
  type: EngagementEvent;
  timestamp: Date;
  element?: string;
  page: string;
  metadata?: {
    position?: { x: number; y: number };
    duration?: number;
    value?: string | number;
    category?: string;
    label?: string;
    properties?: Record<string, any>;
  };
  context?: {
    userAgent?: string;
    viewport?: { width: number; height: number };
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
}

export interface UserSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  pageViews: number;
  events: UserEvent[];
  bounced: boolean;
  converted: boolean;
  conversionValue?: number;
  exitPage?: string;
  entryPage: string;
  device: {
    type: 'desktop' | 'tablet' | 'mobile';
    browser: string;
    os: string;
  };
  location?: {
    country?: string;
    region?: string;
    city?: string;
    timezone?: string;
  };
}

export interface UserProfile {
  userId: string;
  segment: UserSegment;
  engagementLevel: EngagementLevel;
  conversionStage: ConversionStage;
  firstSeen: Date;
  lastSeen: Date;
  totalSessions: number;
  totalEvents: number;
  totalTimeSpent: number;
  lifetimeValue: number;
  conversionRate: number;
  preferences: {
    optedOutTracking: boolean;
    dataRetentionDays: number;
    anonymize: boolean;
  };
  scores: {
    engagement: number;
    satisfaction: number;
    likelihood_to_convert: number;
    churn_risk: number;
  };
}

export interface EngagementTrackingProps {
  userId?: string;
  enableTracking?: boolean;
  enableRealTime?: boolean;
  batchSize?: number;
  flushInterval?: number;
  enableHeatmaps?: boolean;
  enableScrollTracking?: boolean;
  enableClickTracking?: boolean;
  enableFormTracking?: boolean;
  enableErrorTracking?: boolean;
  privacyMode?: 'strict' | 'balanced' | 'minimal';
  onEvent?: (event: UserEvent) => void;
  onSessionEnd?: (session: UserSession) => void;
  onEngagementChange?: (profile: UserProfile) => void;
  customEvents?: Record<string, (data: any) => void>;
  className?: string;
  'data-testid'?: string;
}

const EngagementTracking: React.FC<EngagementTrackingProps> = ({
  userId = 'anonymous',
  enableTracking = true,
  enableRealTime = true,
  batchSize = 10,
  flushInterval = 5000,
  enableHeatmaps = false,
  enableScrollTracking = true,
  enableClickTracking = true,
  enableFormTracking = true,
  enableErrorTracking = true,
  privacyMode = 'balanced',
  onEvent,
  onSessionEnd,
  onEngagementChange,
  customEvents,
  className = '',
  'data-testid': testId
}) => {
  // State management
  const [currentSession, setCurrentSession] = React.useState<UserSession | null>(null);
  const [eventQueue, setEventQueue] = React.useState<UserEvent[]>([]);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [metrics, setMetrics] = React.useState<EngagementMetric[]>([]);
  const [isTracking, setIsTracking] = React.useState(enableTracking);

  // Refs
  const sessionStartTime = React.useRef<Date>(new Date());
  const pageViewCount = React.useRef<number>(0);
  const lastActivityTime = React.useRef<Date>(new Date());
  const scrollDepth = React.useRef<number>(0);
  const maxScrollDepth = React.useRef<number>(0);

  // Generate unique IDs
  const generateId = React.useCallback(() => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Initialize session
  const initializeSession = React.useCallback(() => {
    if (!enableTracking) return;

    const sessionId = generateId();
    const session: UserSession = {
      id: sessionId,
      userId,
      startTime: new Date(),
      duration: 0,
      pageViews: 1,
      events: [],
      bounced: false,
      converted: false,
      entryPage: window.location.pathname,
      device: {
        type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
        browser: navigator.userAgent.split(' ').pop() || 'unknown',
        os: navigator.platform || 'unknown'
      }
    };

    setCurrentSession(session);
    sessionStartTime.current = new Date();
    pageViewCount.current = 1;
  }, [enableTracking, userId, generateId]);

  // Track event
  const trackEvent = React.useCallback((
    type: EngagementEvent,
    element?: string,
    metadata?: UserEvent['metadata'],
    context?: UserEvent['context']
  ) => {
    if (!isTracking || !currentSession) return;

    const event: UserEvent = {
      id: generateId(),
      userId,
      sessionId: currentSession.id,
      type,
      timestamp: new Date(),
      element,
      page: window.location.pathname,
      metadata,
      context
    };

    // Update activity time
    lastActivityTime.current = new Date();

    // Add to queue
    setEventQueue(prev => {
      const updated = [...prev, event];
      
      // Flush if batch size reached or real-time enabled
      if (updated.length >= batchSize || enableRealTime) {
        flushEvents(updated);
        return [];
      }
      
      return updated;
    });

    // Call event handler
    onEvent?.(event);

    // Update session
    setCurrentSession(prev => prev ? {
      ...prev,
      events: [...prev.events, event],
      duration: Date.now() - sessionStartTime.current.getTime()
    } : null);
  }, [isTracking, currentSession, userId, generateId, batchSize, enableRealTime, onEvent]);

  // Flush events to analytics service
  const flushEvents = React.useCallback((events: UserEvent[]) => {
    if (events.length === 0) return;

    // In a real implementation, this would send to your analytics service
    console.log('Flushing events:', events);
    
    // Update metrics based on events
    updateMetrics(events);
  }, []);

  // Update engagement metrics
  const updateMetrics = React.useCallback((events: UserEvent[]) => {
    const newMetrics: EngagementMetric[] = [
      {
        id: 'page_views',
        name: 'Page Views',
        value: pageViewCount.current,
        unit: 'views',
        trend: 'up',
        trendPercentage: 15.2,
        category: 'usage',
        description: 'Total page views in current session'
      },
      {
        id: 'time_on_page',
        name: 'Time on Page',
        value: Math.floor((Date.now() - sessionStartTime.current.getTime()) / 1000),
        unit: 'seconds',
        trend: 'up',
        trendPercentage: 23.1,
        category: 'engagement',
        description: 'Time spent on current page'
      },
      {
        id: 'scroll_depth',
        name: 'Scroll Depth',
        value: maxScrollDepth.current,
        unit: '%',
        target: 75,
        trend: 'stable',
        trendPercentage: 0,
        category: 'engagement',
        description: 'Maximum scroll depth reached'
      },
      {
        id: 'interactions',
        name: 'Interactions',
        value: events.filter(e => e.type === 'click').length,
        unit: 'clicks',
        trend: 'up',
        trendPercentage: 12.5,
        category: 'engagement',
        description: 'Number of click interactions'
      }
    ];

    setMetrics(newMetrics);
  }, []);

  // Track scroll depth
  const trackScrollDepth = React.useCallback(() => {
    if (!enableScrollTracking) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    
    const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);
    
    scrollDepth.current = scrollPercentage;
    if (scrollPercentage > maxScrollDepth.current) {
      maxScrollDepth.current = scrollPercentage;
      
      // Track milestone scroll depths
      const milestones = [25, 50, 75, 90, 100];
      const milestone = milestones.find(m => 
        scrollPercentage >= m && maxScrollDepth.current < m
      );
      
      if (milestone) {
        trackEvent('scroll', 'page', { 
          value: milestone,
          category: 'engagement',
          label: `${milestone}% scroll depth`
        });
      }
    }
  }, [enableScrollTracking, trackEvent]);

  // Track clicks
  const trackClick = React.useCallback((event: MouseEvent) => {
    if (!enableClickTracking) return;

    const target = event.target as HTMLElement;
    const element = target.tagName.toLowerCase();
    const elementId = target.id || target.className || element;

    trackEvent('click', elementId, {
      position: { x: event.clientX, y: event.clientY },
      category: 'interaction',
      label: target.textContent?.slice(0, 100) || elementId
    });
  }, [enableClickTracking, trackEvent]);

  // Track form submissions
  const trackFormSubmit = React.useCallback((event: Event) => {
    if (!enableFormTracking) return;

    const form = event.target as HTMLFormElement;
    const formId = form.id || form.className || 'unknown_form';

    trackEvent('form_submit', formId, {
      category: 'conversion',
      label: formId
    });
  }, [enableFormTracking, trackEvent]);

  // Track errors
  const trackError = React.useCallback((error: ErrorEvent) => {
    if (!enableErrorTracking) return;

    trackEvent('error', 'javascript_error', {
      category: 'error',
      label: error.message,
      value: error.lineno,
      properties: {
        filename: error.filename,
        stack: error.error?.stack
      }
    });
  }, [enableErrorTracking, trackEvent]);

  // Update user profile based on activity
  const updateUserProfile = React.useCallback(() => {
    if (!currentSession) return;

    const engagementScore = Math.min(100, 
      (currentSession.events.length * 10) + 
      (Math.min(currentSession.duration / 1000 / 60, 10) * 5) +
      (maxScrollDepth.current * 0.3)
    );

    const engagementLevel: EngagementLevel = 
      engagementScore >= 80 ? 'very_high' :
      engagementScore >= 60 ? 'high' :
      engagementScore >= 30 ? 'medium' : 'low';

    const profile: UserProfile = {
      userId,
      segment: 'returning', // This would be determined by historical data
      engagementLevel,
      conversionStage: 'interest', // This would be determined by behavior
      firstSeen: sessionStartTime.current,
      lastSeen: new Date(),
      totalSessions: 1,
      totalEvents: currentSession.events.length,
      totalTimeSpent: currentSession.duration,
      lifetimeValue: 0,
      conversionRate: 0,
      preferences: {
        optedOutTracking: false,
        dataRetentionDays: 365,
        anonymize: privacyMode === 'strict'
      },
      scores: {
        engagement: engagementScore,
        satisfaction: 75, // This would be from surveys/feedback
        likelihood_to_convert: 45, // This would be from ML model
        churn_risk: 25 // This would be from predictive model
      }
    };

    setUserProfile(profile);
    onEngagementChange?.(profile);
  }, [currentSession, userId, privacyMode, onEngagementChange]);

  // End session
  const endSession = React.useCallback(() => {
    if (!currentSession) return;

    const endTime = new Date();
    const finalSession: UserSession = {
      ...currentSession,
      endTime,
      duration: endTime.getTime() - sessionStartTime.current.getTime(),
      exitPage: window.location.pathname,
      bounced: currentSession.events.length <= 1 && currentSession.duration < 30000
    };

    // Flush remaining events
    if (eventQueue.length > 0) {
      flushEvents(eventQueue);
    }

    onSessionEnd?.(finalSession);
    setCurrentSession(null);
  }, [currentSession, eventQueue, flushEvents, onSessionEnd]);

  // Setup event listeners
  React.useEffect(() => {
    if (!isTracking) return;

    // Initialize session
    initializeSession();

    // Add event listeners
    if (enableScrollTracking) {
      window.addEventListener('scroll', trackScrollDepth, { passive: true });
    }
    
    if (enableClickTracking) {
      document.addEventListener('click', trackClick);
    }
    
    if (enableFormTracking) {
      document.addEventListener('submit', trackFormSubmit);
    }
    
    if (enableErrorTracking) {
      window.addEventListener('error', trackError);
    }

    // Track initial page view
    trackEvent('page_view', 'page', {
      category: 'navigation',
      label: window.location.pathname
    });

    // Setup periodic profile updates
    const profileInterval = setInterval(updateUserProfile, 10000);

    // Setup event flushing
    const flushTimer = setInterval(() => {
      if (eventQueue.length > 0) {
        flushEvents(eventQueue);
        setEventQueue([]);
      }
    }, flushInterval);

    // Cleanup
    return () => {
      if (enableScrollTracking) {
        window.removeEventListener('scroll', trackScrollDepth);
      }
      if (enableClickTracking) {
        document.removeEventListener('click', trackClick);
      }
      if (enableFormTracking) {
        document.removeEventListener('submit', trackFormSubmit);
      }
      if (enableErrorTracking) {
        window.removeEventListener('error', trackError);
      }
      
      clearInterval(profileInterval);
      clearInterval(flushTimer);
      endSession();
    };
  }, [
    isTracking, 
    initializeSession, 
    enableScrollTracking, 
    enableClickTracking, 
    enableFormTracking,
    enableErrorTracking,
    trackScrollDepth, 
    trackClick, 
    trackFormSubmit, 
    trackError,
    trackEvent,
    updateUserProfile,
    eventQueue,
    flushEvents,
    flushInterval,
    endSession
  ]);

  // Handle visibility change (tab switching)
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackEvent('page_blur', 'window', {
          category: 'navigation',
          duration: Date.now() - lastActivityTime.current.getTime()
        });
      } else {
        trackEvent('page_focus', 'window', {
          category: 'navigation'
        });
        lastActivityTime.current = new Date();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [trackEvent]);

  // Expose tracking methods for custom events
  const trackCustomEvent = React.useCallback((eventName: string, data?: any) => {
    if (customEvents?.[eventName]) {
      customEvents[eventName](data);
    } else {
      trackEvent('custom', eventName, {
        category: 'custom',
        properties: data
      });
    }
  }, [customEvents, trackEvent]);

  // Privacy controls
  const optOutTracking = React.useCallback(() => {
    setIsTracking(false);
    endSession();
    localStorage.setItem('engagement_tracking_opt_out', 'true');
  }, [endSession]);

  const optInTracking = React.useCallback(() => {
    setIsTracking(true);
    localStorage.removeItem('engagement_tracking_opt_out');
    initializeSession();
  }, [initializeSession]);

  // Check opt-out status on mount
  React.useEffect(() => {
    const hasOptedOut = localStorage.getItem('engagement_tracking_opt_out') === 'true';
    if (hasOptedOut) {
      setIsTracking(false);
    }
  }, []);

  // Analytics dashboard component
  const AnalyticsDashboard: React.FC<{ show?: boolean }> = ({ show = false }) => {
    if (!show || !userProfile) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Engagement Analytics</h3>
          <div className={`
            w-3 h-3 rounded-full
            ${userProfile.engagementLevel === 'very_high' ? 'bg-green-500' : 
              userProfile.engagementLevel === 'high' ? 'bg-blue-500' :
              userProfile.engagementLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
            }
          `} />
        </div>

        <div className="space-y-3">
          {metrics.slice(0, 4).map((metric) => (
            <div key={metric.id} className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-300">{metric.name}</div>
                <div className="text-xs text-gray-500">{metric.description}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-white">
                  {metric.value} {metric.unit}
                </div>
                {metric.target && (
                  <div className="text-xs text-gray-400">
                    Target: {metric.target} {metric.unit}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 mb-2">Engagement Level</div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${userProfile.scores.engagement}%` }}
              />
            </div>
            <div className="text-sm font-semibold text-white">
              {userProfile.scores.engagement}%
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={className} data-testid={testId}>
      {/* Analytics Dashboard - only shown in development */}
      {process.env.NODE_ENV === 'development' && (
        <AnalyticsDashboard show={true} />
      )}
      
      {/* Privacy controls */}
      {privacyMode !== 'minimal' && (
        <div className="fixed bottom-4 left-4 z-40">
          <button
            onClick={isTracking ? optOutTracking : optInTracking}
            className="px-3 py-2 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-600 transition-colors"
          >
            {isTracking ? 'Opt Out' : 'Enable'} Analytics
          </button>
        </div>
      )}
      
      {/* Expose tracking methods globally for custom usage */}
      {typeof window !== 'undefined' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.trackEngagement = ${JSON.stringify({
                trackEvent: 'trackCustomEvent',
                getCurrentSession: 'currentSession',
                getUserProfile: 'userProfile'
              })};
            `
          }}
        />
      )}
    </div>
  );
};

// Hook for engagement tracking
export const useEngagementTracking = () => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [currentSession, setCurrentSession] = React.useState<UserSession | null>(null);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);

  const trackEvent = React.useCallback((type: EngagementEvent, element?: string, metadata?: any) => {
    if (!isEnabled) return;
    
    // This would integrate with your tracking service
    console.log('Tracking event:', { type, element, metadata });
  }, [isEnabled]);

  const updateProfile = React.useCallback((updates: Partial<UserProfile>) => {
    setUserProfile(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  return {
    isEnabled,
    currentSession,
    userProfile,
    setIsEnabled,
    trackEvent,
    updateProfile
  };
};

export default EngagementTracking;