'use client'

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Copy, CheckCircle } from 'lucide-react'
import { ModernCard } from '@/app/components/ui/ModernCard'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
  errorId: string
  copied: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  fallback?: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: '',
      copied: false
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { 
      hasError: true, 
      error: null, 
      errorInfo: null,
      errorId: '',
      copied: false
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = Date.now().toString(36).toUpperCase()
    console.error('Error caught by boundary:', { error, errorInfo, errorId })
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo, errorId)
    }
    
    this.setState({ error, errorInfo, errorId })
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  private logErrorToService = (error: Error, errorInfo: React.ErrorInfo, errorId: string) => {
    // In production, send to error tracking service (Sentry, LogRocket, etc.)
    console.error('Production error logged:', {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    })
  }

  private copyErrorId = () => {
    navigator.clipboard.writeText(this.state.errorId)
    this.setState({ copied: true })
    setTimeout(() => this.setState({ copied: false }), 2000)
  }

  private handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null, 
      errorId: '',
      copied: false 
    })
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
          <ModernCard className="p-8 max-w-2xl w-full">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-red-900/20 border border-red-700/50">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  System Error Detected
                </h2>
                <p className="text-slate-300 mb-4">
                  We've encountered an unexpected error in the Revenue Intelligence Platform.
                  Our technical team has been automatically notified.
                </p>
              </div>

              {/* Error ID for support */}
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Error Reference ID:</p>
                    <p className="text-white font-mono text-sm">{this.state.errorId}</p>
                  </div>
                  <button
                    onClick={this.copyErrorId}
                    className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    title="Copy Error ID"
                  >
                    {this.state.copied ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Development error details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="text-left bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="text-red-400 font-semibold mb-2">Development Error Details:</h3>
                  <p className="text-red-300 text-sm font-mono mb-2">{this.state.error.message}</p>
                  {this.state.error.stack && (
                    <details>
                      <summary className="cursor-pointer text-slate-400 text-sm mb-2">Stack Trace</summary>
                      <pre className="text-xs text-slate-400 overflow-x-auto whitespace-pre-wrap">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                  {this.state.errorInfo?.componentStack && (
                    <details>
                      <summary className="cursor-pointer text-slate-400 text-sm mb-2">Component Stack</summary>
                      <pre className="text-xs text-slate-400 overflow-x-auto whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleRetry}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Operation</span>
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh Page</span>
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
              </div>

              <div className="text-sm text-slate-400 border-t border-slate-700 pt-4 space-y-2">
                <p>If this issue persists, please contact support with the Error Reference ID above.</p>
                <p className="text-xs">H&S Revenue Intelligence Platform • Enterprise Error Handling</p>
              </div>
            </div>
          </ModernCard>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary