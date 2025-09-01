'use client'

import React, { useState, useEffect, ReactNode } from 'react'
import SignUpPage from './SignUpPage'
import { authService } from '../../lib/services/authService'

// TypeScript interfaces
interface User {
  googleId?: string
  email: string
  name: string
  picture?: string
}

interface CustomerData {
  customerId: string
  email: string
  name: string
  isNewUser?: boolean
  demoMode?: boolean
  [key: string]: any
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  customerData: CustomerData | null
  loading: boolean
}

interface AuthenticatedAppProps {
  children?: ReactNode
}

const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    customerData: null,
    loading: true
  })
  const [authError, setAuthError] = useState<string | null>(null)

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        if (typeof window === 'undefined') return
        
        // Check for OAuth callback (when user returns from Google)
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        
        if (code && state) {
          console.log('OAuth callback detected, processing...')
          
          // Verify state matches what we stored
          const storedState = sessionStorage.getItem('googleOAuthState')
          if (state !== storedState) {
            console.error('OAuth state mismatch')
            setAuthError('Authentication failed: Invalid state')
            setAuthState({
              isAuthenticated: false,
              user: null,
              customerData: null,
              loading: false
            })
            return
          }
          
          try {
            // For local development, skip the Netlify function and create a mock user
            // In production, this would go through the Netlify function
            console.log('Processing OAuth callback with code:', code)
            
            let data: any
            
            // Check if we're in local development
            if (window.location.hostname === 'localhost') {
              console.log('Local development detected - using mock authentication')
              
              // Create a mock successful response for local development
              // In production, the Netlify function would validate the code with Google
              data = {
                success: true,
                user: {
                  googleId: 'mock_google_id_' + Date.now(),
                  email: 'demo@example.com', // This would come from Google in production
                  name: 'Demo User',
                  picture: 'https://via.placeholder.com/100'
                },
                customerData: {
                  customerId: 'OAUTH_USER_' + Date.now(),
                  email: 'demo@example.com',
                  name: 'Demo User',
                  isNewUser: true
                }
              }
            } else {
              // In production, send the code to your Netlify function for validation
              const response = await fetch('/.netlify/functions/google-oauth', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, state })
              })
              data = await response.json()
            }
            
            if (data.success) {
              console.log('OAuth authentication successful')
              handleSignInSuccess({
                user: data.user,
                customerData: data.customerData
              })
            } else {
              throw new Error(data.error || 'OAuth authentication failed')
            }
            
          } catch (error) {
            console.error('OAuth processing error:', error)
            setAuthError(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
            setAuthState(prev => ({
              ...prev,
              loading: false
            }))
          }
        } else {
          // No OAuth callback, check for existing session
          console.log('Checking for existing session...')
          
          const session = authService.getCurrentSession()
          if (session) {
            console.log('Existing session found:', session.customerData?.customerId)
            setAuthState({
              isAuthenticated: true,
              user: session.user,
              customerData: session.customerData,
              loading: false
            })
          } else {
            console.log('No existing session found')
            setAuthState(prev => ({
              ...prev,
              loading: false
            }))
          }
        }
      } catch (error) {
        console.error('Auth state check error:', error)
        setAuthError(`Authentication check failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
        setAuthState({
          isAuthenticated: false,
          user: null,
          customerData: null,
          loading: false
        })
      }
    }

    checkAuthState()
  }, [])

  // Handle successful sign-in
  const handleSignInSuccess = (authData: { user: User; customerData: CustomerData }) => {
    console.log('handleSignInSuccess called with:', authData)
    
    // Store session data
    const sessionData = {
      user: authData.user,
      customerData: authData.customerData,
      timestamp: new Date().toISOString()
    }
    
    authService.setCurrentSession(sessionData)
    
    // Mock customer data for demo (in production, this would come from Airtable)
    const customerData: CustomerData = {
      customerId: authData.customerData?.customerId || 'MOCK_CUSTOMER_' + Date.now(),
      email: authData.user.email,
      name: authData.user.name,
      demoMode: true,
      isNewUser: true
    }
    
    setAuthState({
      isAuthenticated: true,
      user: sessionData.user,
      customerData: customerData,
      loading: false
    })
    setAuthError(null)
    
    console.log('User signed in successfully:', sessionData.user?.email)
    console.log('Customer ID:', customerData.customerId)
    
    // Optional: Navigate to dashboard or show welcome message
    if (customerData?.isNewUser) {
      console.log('New user detected - could show onboarding')
    }
  }

  // Handle sign-in errors
  const handleSignInError = (error: any) => {
    const errorMessage = error instanceof Error ? error.message : (typeof error === 'string' ? error : 'Unknown error')
    setAuthError(errorMessage)
    setAuthState(prev => ({
      ...prev,
      loading: false
    }))
    console.error('Sign-in error:', error)
  }

  // Handle sign-out
  const handleSignOut = () => {
    authService.signOut()
    setAuthState({
      isAuthenticated: false,
      user: null,
      customerData: null,
      loading: false
    })
    setAuthError(null)
    console.log('User signed out')
  }

  // Show loading state
  if (authState.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Revenue Intelligence Platform...</p>
        </div>
      </div>
    )
  }

  // Show sign-up page if not authenticated
  if (!authState.isAuthenticated) {
    return (
      <div>
        <SignUpPage 
          onSignInSuccess={handleSignInSuccess}
          onSignInError={handleSignInError}
        />
        {authError && (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
            {authError}
          </div>
        )}
      </div>
    )
  }

  // Show authenticated app with user data
  return (
    <div>
      {/* Pass authenticated state to children or render main app */}
      {children || (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Welcome, {authState.user?.name}!
            </h1>
            <p className="text-gray-400 mb-8">
              Customer ID: {authState.customerData?.customerId}
            </p>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
      
      {authError && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {authError}
        </div>
      )}
    </div>
  )
}

export default AuthenticatedApp