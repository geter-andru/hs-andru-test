'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { LogIn, Shield, Check } from 'lucide-react'

// TypeScript interfaces
interface GoogleUser {
  email: string
  name: string
  picture?: string
}

interface CustomerData {
  customerId: string
  email: string
  name: string
  [key: string]: any
}

interface GoogleSignInProps {
  onSignInSuccess?: (data: any) => void
  onSignInError?: (error: any) => void
}

// Extend Window interface for Google APIs
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, options: any) => void
          prompt: (callback?: (notification: any) => void) => void
        }
      }
    }
  }
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSignInSuccess, onSignInError }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoaded, setGoogleLoaded] = useState(false)

  // Look up customer by email in Airtable
  const lookupCustomerByEmail = async (email: string): Promise<CustomerData | null> => {
    try {
      // Import airtableService
      const { airtableService } = await import('../../lib/services/airtableService')
      
      // Search for customer by email
      const customerData = await airtableService.getCustomerByEmail(email)
      
      if (customerData) {
        return customerData
      }

      // If no customer found, create a new customer record
      return await createNewCustomer(email)
      
    } catch (error) {
      console.error('Customer lookup error:', error)
      // Return null if lookup fails - user can still sign in
      return null
    }
  }

  // Create new customer record for first-time Google sign-ins
  const createNewCustomer = async (email: string): Promise<CustomerData | null> => {
    try {
      // Import airtableService
      const { airtableService } = await import('../../lib/services/airtableService')
      
      // Create new customer using airtableService
      const googleUser: GoogleUser = {
        email,
        name: email.split('@')[0], // Use email prefix as default name
      }
      
      console.log('GoogleSignIn: Creating new customer for:', email)
      const newCustomer = await airtableService.createCustomer(googleUser)
      
      if (newCustomer) {
        console.log('GoogleSignIn: New customer created:', newCustomer.customerId)
        return newCustomer
      }
      
      return null
      
    } catch (error) {
      console.error('GoogleSignIn: Error creating new customer:', error)
      return null
    }
  }

  // Handle Google Sign-In response
  const handleCredentialResponse = useCallback(async (response: any) => {
    console.log('GoogleSignIn: Credential response received')
    console.log('GoogleSignIn: Response details:', response)
    setIsLoading(true)
    
    try {
      // Decode JWT token to get user info
      const credential = response.credential
      const base64Url = credential.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      
      const userInfo = JSON.parse(jsonPayload)
      console.log('GoogleSignIn: Decoded user info:', userInfo)
      
      // Look up customer by email
      const customerData = await lookupCustomerByEmail(userInfo.email)
      
      if (customerData) {
        console.log('GoogleSignIn: Customer found/created:', customerData.customerId)
        
        // Store user session
        const sessionData = {
          customerId: customerData.customerId,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          authMethod: 'google',
          timestamp: new Date().toISOString()
        }
        
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('userSession', JSON.stringify(sessionData))
        }
        
        // Success callback with customer data
        if (onSignInSuccess) {
          onSignInSuccess({
            customerData,
            userInfo,
            redirectUrl: `/customer/${customerData.customerId}/simplified/dashboard?token=google-auth`
          })
        }
      } else {
        throw new Error('Failed to create or find customer record')
      }
      
    } catch (error) {
      console.error('GoogleSignIn: Sign-in processing failed:', error)
      if (onSignInError) {
        onSignInError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }, [onSignInSuccess, onSignInError])

  // Initialize Google Sign-In
  useEffect(() => {
    const loadGoogleScript = async () => {
      try {
        console.log('GoogleSignIn: Loading Google Script...')
        
        // Check if already loaded
        if (window.google?.accounts) {
          console.log('GoogleSignIn: Google already loaded')
          setGoogleLoaded(true)
          return
        }

        // Load Google Script dynamically
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        
        script.onload = () => {
          console.log('GoogleSignIn: Google script loaded successfully')
          
          if (window.google?.accounts) {
            // Initialize Google Sign-In
            window.google.accounts.id.initialize({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              callback: handleCredentialResponse,
              auto_select: false,
              cancel_on_tap_outside: true,
            })

            // Render the Google button directly for better reliability
            const buttonContainer = document.getElementById('google-signin-button')
            if (buttonContainer) {
              console.log('GoogleSignIn: Rendering Google native button...')
              window.google.accounts.id.renderButton(buttonContainer, {
                theme: 'outline',
                size: 'large',
                type: 'standard',
                shape: 'rectangular',
                text: 'signin_with',
                logo_alignment: 'left',
                width: '100%'
              })
            }

            console.log('GoogleSignIn: Google initialized successfully')
            setGoogleLoaded(true)
          }
        }
        
        script.onerror = (error) => {
          console.error('GoogleSignIn: Failed to load Google script:', error)
          if (onSignInError) {
            onSignInError('Failed to load Google Sign-In service')
          }
        }
        
        document.head.appendChild(script)
        
      } catch (error) {
        console.error('GoogleSignIn: Failed to initialize Google Sign-In:', error)
        if (onSignInError) {
          onSignInError('Failed to initialize Google Sign-In')
        }
      }
    }

    loadGoogleScript()
  }, [handleCredentialResponse, onSignInError])

  // Trigger Google Sign-In popup
  const handleSignIn = () => {
    console.log('=== GOOGLE SIGN-IN DEBUG ===')
    console.log('GoogleSignIn: Sign-in button clicked')
    console.log('GoogleSignIn: Google loaded:', googleLoaded)
    console.log('GoogleSignIn: Google available:', !!window.google?.accounts)
    console.log('GoogleSignIn: Client ID from env:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
    console.log('GoogleSignIn: Window.google object:', window.google)
    
    if (!googleLoaded) {
      console.error('GoogleSignIn: Google not loaded yet')
      alert('Google Sign-In is still loading. Please wait a moment and try again.')
      return
    }

    if (!window.google?.accounts) {
      console.error('GoogleSignIn: Google accounts API not available')
      alert('Google Sign-In service is not available. Please refresh the page.')
      if (onSignInError) {
        onSignInError('Google Sign-In not ready. Please refresh the page.')
      }
      return
    }

    setIsLoading(true)
    
    try {
      console.log('GoogleSignIn: Triggering Google prompt...')
      window.google.accounts.id.prompt((notification) => {
        console.log('GoogleSignIn: Prompt notification:', notification)
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('GoogleSignIn: Prompt was not displayed or skipped')
          setIsLoading(false)
        }
      })
    } catch (error) {
      console.error('GoogleSignIn: Error triggering prompt:', error)
      setIsLoading(false)
      if (onSignInError) {
        onSignInError('Failed to show Google Sign-In prompt')
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Debug Info */}
      <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
        <div>Client ID: {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? 'Configured' : 'Missing'}</div>
        <div>Google Loaded: {googleLoaded ? 'Yes' : 'No'}</div>
        <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      </div>

      {/* Google Sign-In Native Button Container */}
      <div id="google-signin-button" className="w-full" />

      {/* Fallback Manual Button */}
      <button
        onClick={handleSignIn}
        disabled={!googleLoaded || isLoading}
        className={`w-full bg-white text-gray-700 border border-gray-300 rounded-lg px-6 py-3 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center justify-center gap-3 ${
          (!googleLoaded || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span>
          {isLoading ? 'Signing in...' : 'Continue with Google (Manual)'}
        </span>
        {isLoading && <LogIn className="w-4 h-4 animate-spin" />}
      </button>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Secure OAuth 2.0 authentication</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-green-500" />
          <span>Links to your existing customer profile</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-green-500" />
          <span>No passwords to remember</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center border-t pt-3 mt-4">
        <p>For sales demos, admin access is still available via direct URL</p>
      </div>
    </div>
  )
}

export default GoogleSignIn