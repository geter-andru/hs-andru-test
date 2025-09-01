import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  // Check if Supabase environment variables are properly configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey || 
      supabaseUrl.includes('your_supabase_') || 
      supabaseKey.includes('your_supabase_')) {
    // Return a mock client for development
    return {
      auth: {
        signInWithOAuth: async () => ({ data: null, error: new Error('Supabase not configured for development') }),
        signOut: async () => ({ error: new Error('Supabase not configured for development') }),
        getUser: async () => ({ data: { user: null }, error: null })
      }
    } as any;
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}