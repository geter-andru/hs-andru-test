interface SessionData {
  user: {
    email: string;
    googleId: string;
    name?: string;
  };
  customerData: any;
  isAuthenticated: boolean;
  loginTime: string;
}

interface AuthValidationResult {
  valid: boolean;
  error?: string;
  user?: any;
  customerData?: any;
  authMethod?: string;
}

interface CustomerValidationResult {
  valid: boolean;
  customerData?: any;
  error?: string;
}

export const authService = {
  // Validate Google authentication session
  async validateGoogleSession(sessionData: SessionData): Promise<AuthValidationResult> {
    try {
      if (!sessionData || !sessionData.user || !sessionData.isAuthenticated) {
        return {
          valid: false,
          error: 'Invalid session data'
        };
      }

      const { user, customerData } = sessionData;

      // Validate Google token is still valid (basic check)
      if (!user.email || !user.googleId) {
        return {
          valid: false,
          error: 'Invalid Google user data'
        };
      }

      return {
        valid: true,
        user,
        customerData,
        authMethod: 'google'
      };
    } catch (error: any) {
      return {
        valid: false,
        error: error.message
      };
    }
  },

  // Get current authentication state
  getCurrentAuth(): { isAuthenticated: boolean; [key: string]: any } {
    if (typeof window === 'undefined') {
      return { isAuthenticated: false };
    }

    try {
      const sessionData = sessionStorage.getItem('authSession');
      if (!sessionData) {
        return { isAuthenticated: false };
      }

      const parsed = JSON.parse(sessionData);
      
      // Check if session is expired (24 hours)
      const loginTime = new Date(parsed.loginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        this.signOut();
        return { isAuthenticated: false };
      }

      return {
        isAuthenticated: true,
        ...parsed
      };
    } catch (error) {
      console.error('Error getting current auth:', error);
      return { isAuthenticated: false };
    }
  },

  // Sign out user
  signOut(): void {
    if (typeof window === 'undefined') return;
    
    sessionStorage.removeItem('authSession');
    
    // Sign out from Google if available
    if ((window as any).google?.accounts?.id) {
      (window as any).google.accounts.id.disableAutoSelect();
    }
  },

  // Validate customer credentials (including admin) - Legacy method for backward compatibility
  async validateCredentials(customerId: string, accessToken: string): Promise<CustomerValidationResult> {
    try {
      if (!customerId || !accessToken) {
        return { 
          valid: false, 
          error: 'Missing customer ID or access token' 
        };
      }

      // Check for admin credentials
      if (customerId === 'dru78DR9789SDF862' && accessToken === 'admin-demo-token-2025') {
        try {
          // Try to load from Airtable first to get actual customer name
          // Note: airtableService would need to be imported and adapted
          // For now, fall back to mock data
          const adminData = await this.loadAdminUser();
          return {
            valid: true,
            customerData: adminData
          };
        } catch (error: any) {
          // Fall back to mock data if Airtable fails
          console.log('Admin Airtable load failed, using mock data:', error.message);
          const adminData = await this.loadAdminUser();
          return {
            valid: true,
            customerData: adminData
          };
        }
      }

      // Regular customer validation via Airtable
      try {
        // Note: This would need actual airtableService integration
        // const customerData = await airtableService.getCustomerAssets(customerId, accessToken);
        // For now, return basic validation
        return {
          valid: false,
          error: 'Customer validation not implemented'
        };
      } catch (error: any) {
        return {
          valid: false,
          error: `Validation failed: ${error.message}`
        };
      }
    } catch (error: any) {
      return {
        valid: false,
        error: `Authentication error: ${error.message}`
      };
    }
  },

  // Check if user is admin based on customer ID
  isAdmin(customerId: string): boolean {
    return customerId === 'dru78DR9789SDF862';
  },

  // Load admin user mock data
  async loadAdminUser(): Promise<any> {
    return {
      customerId: 'dru78DR9789SDF862',
      customerName: 'H&S Platform Admin',
      companyName: 'H&S Revenue Intelligence',
      email: 'admin@hs-platform.com',
      isAdmin: true,
      accessLevel: 'full',
      // Mock ICP data
      icpAnalysis: {
        completed: true,
        score: 8.5,
        lastUpdated: new Date().toISOString(),
        data: {
          companySize: "Enterprise (1,000+ employees)",
          industryVerticals: "Technology, SaaS, Financial Services",
          annualRevenue: "$100M - $1B+",
          geographicMarkets: "North America, Europe, Asia-Pacific",
          decisionMakers: "CTO, VP Engineering, Chief Revenue Officer"
        }
      },
      // Mock Cost Calculator data
      costCalculator: {
        completed: true,
        totalCost: 2400000,
        lastUpdated: new Date().toISOString(),
        data: {
          costOfInaction: {
            lostRevenue: 1800000,
            inefficiencyLoss: 600000
          },
          recommendations: "Immediate implementation recommended"
        }
      },
      // Mock Business Case data
      businessCase: {
        completed: true,
        roiProjection: 340,
        lastUpdated: new Date().toISOString(),
        data: {
          investmentRequired: 150000,
          projectedReturn: 510000,
          paybackPeriod: "8 months"
        }
      },
      // Mock competency data
      competencyProgress: {
        currentLevel: 4,
        totalPoints: 12500,
        completedActions: 15,
        milestones: [
          {
            name: "Customer Intelligence Foundation",
            completed: true,
            points: 2500
          },
          {
            name: "Revenue Operations Specialist", 
            completed: true,
            points: 5000
          },
          {
            name: "Strategic Revenue Architect",
            completed: true,
            points: 5000
          },
          {
            name: "Revenue Intelligence Expert",
            completed: false,
            points: 0,
            required: 15000
          }
        ]
      },
      // Tool access permissions
      toolAccess: {
        icpAnalysis: true,
        costCalculator: true,
        businessCaseBuilder: true,
        advancedAnalytics: true,
        exportFeatures: true
      },
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
  },

  // Store authentication session
  storeAuthSession(sessionData: any): void {
    if (typeof window === 'undefined') return;
    
    try {
      sessionStorage.setItem('authSession', JSON.stringify({
        ...sessionData,
        loginTime: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error storing auth session:', error);
    }
  },

  // Clear authentication session
  clearAuthSession(): void {
    if (typeof window === 'undefined') return;
    
    sessionStorage.removeItem('authSession');
  },

  // Check if session is valid and not expired
  isSessionValid(): boolean {
    const auth = this.getCurrentAuth();
    return auth.isAuthenticated;
  },

  // Get current session data (alias for getCurrentAuth)
  getCurrentSession(): { isAuthenticated: boolean; [key: string]: any } | null {
    const auth = this.getCurrentAuth();
    return auth.isAuthenticated ? auth : null;
  },

  // Set current session data (alias for storeAuthSession)
  setCurrentSession(sessionData: any): void {
    this.storeAuthSession(sessionData);
  },

  // Extract credentials from URL parameters or request
  extractCredentials(searchParams: URLSearchParams): { customerId: string; accessToken: string } | null {
    const customerId = searchParams.get('customerId') || '';
    const accessToken = searchParams.get('token') || '';
    
    if (!customerId || !accessToken) {
      return null;
    }
    
    return { customerId, accessToken };
  },

  // Generate new session from validated credentials
  async generateSession(customerId: string, customerData: any): Promise<any> {
    const sessionData = {
      customerId,
      customerData,
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    this.storeAuthSession(sessionData);
    return sessionData;
  },

  // Refresh existing session
  async refreshSession(): Promise<void> {
    const currentAuth = this.getCurrentAuth();
    if (currentAuth.isAuthenticated && currentAuth.customerId) {
      const refreshedData = {
        ...currentAuth,
        lastAccessed: new Date().toISOString()
      };
      this.storeAuthSession(refreshedData);
    }
  }
};

export default authService;