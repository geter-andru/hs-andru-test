'use client'

import React, { useEffect, useState, ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { Session } from '@supabase/supabase-js'

// TypeScript interfaces
interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
      
      // If no session, redirect to login
      if (!session) {
        redirect('/login')
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
      
      // If no session, redirect to login
      if (!session) {
        redirect('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!session) {
    // This will be handled by the redirect above, but kept for safety
    return null
  }

  // User is authenticated, render protected content
  return <>{children}</>
}

export default ProtectedRoute