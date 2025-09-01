import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { authenticatedFetch } from '../middleware/api-auth';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const TOKEN_COOKIE_NAME = 'hs_access_token';
const REFRESH_TOKEN_COOKIE_NAME = 'hs_refresh_token';
const CUSTOMER_ID_COOKIE_NAME = 'hs_customer_id';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE_NAME);
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          Cookies.set(TOKEN_COOKIE_NAME, accessToken, { expires: 1 }); // 1 day expiry
          
          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        Cookies.remove(TOKEN_COOKIE_NAME);
        Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
        Cookies.remove(CUSTOMER_ID_COOKIE_NAME);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 429) {
      // Only show rate limit error for non-tracking requests
      if (!error.config?.url?.includes('/track')) {
        toast.error('Rate limit exceeded. Please wait before trying again.');
      }
    } else if (error.response?.status === 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You do not have permission to perform this action.');
    }

    return Promise.reject(error);
  }
);

// Mock customer data for static export - Enhanced with React SPA compatibility
const MOCK_CUSTOMERS = {
  'CUST_2': {
    id: 'CUST_2',
    customerId: 'CUST_2',
    name: 'Demo Customer',
    customerName: 'Demo Customer',
    email: 'demo@example.com', // @production-approved
    company: 'Demo Company Inc.',
    status: 'active',
    isAdmin: false,
    demoMode: false,
    hasPersonalizedICP: true,
    hasDetailedAnalysis: false,
    paymentStatus: 'Completed'
  },
  'CUST_4': {
    id: 'CUST_4',
    customerId: 'CUST_4',
    name: 'Admin Demo',
    customerName: 'Platform Administrator',
    email: 'admin@example.com', // @production-approved
    company: 'H&S Revenue Intelligence',
    status: 'admin',
    isAdmin: true,
    demoMode: true,
    hasPersonalizedICP: true,
    hasDetailedAnalysis: true,
    adminAccess: true,
    paymentStatus: 'Completed'
  },
  // Enhanced admin ID from React SPA
  'dru78DR9789SDF862': {
    id: 'dru78DR9789SDF862',
    customerId: 'dru78DR9789SDF862',
    name: 'Geter',
    customerName: 'Geter',
    email: 'geter@hs-platform.com',
    company: 'H&S Platform',
    status: 'admin',
    isAdmin: true,
    demoMode: true,
    hasPersonalizedICP: true,
    hasDetailedAnalysis: true,
    adminAccess: true,
    paymentStatus: 'Completed'
  }
};

// Auth functions - Enhanced with React SPA compatibility
export const auth = {
  // Enhanced login with token support from React SPA
  async login(customerId: string, accessToken?: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Enhanced admin authentication from React SPA
      if (customerId === 'dru78DR9789SDF862' || 
          (customerId === 'CUST_4' && accessToken === 'admin-demo-token-2025')) {
        const adminCustomer = MOCK_CUSTOMERS['dru78DR9789SDF862'];
        const token = accessToken || `admin_token_${Date.now()}`;
        
        // Store admin tokens
        Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 1 });
        Cookies.set(REFRESH_TOKEN_COOKIE_NAME, `refresh_${token}`, { expires: 7 });
        Cookies.set(CUSTOMER_ID_COOKIE_NAME, customerId, { expires: 7 });
        
        return { success: true, data: adminCustomer };
      }

      // Test user authentication from React SPA
      if (customerId === 'CUST_02' && accessToken === 'test-token-123456') {
        const testCustomer = MOCK_CUSTOMERS['CUST_2']; // Use CUST_2 for CUST_02
        
        // Store test tokens
        Cookies.set(TOKEN_COOKIE_NAME, accessToken, { expires: 1 });
        Cookies.set(REFRESH_TOKEN_COOKIE_NAME, `refresh_${accessToken}`, { expires: 7 });
        Cookies.set(CUSTOMER_ID_COOKIE_NAME, customerId, { expires: 7 });
        
        return { success: true, data: testCustomer };
      }
      
      // Check if customer exists in mock data
      const customer = MOCK_CUSTOMERS[customerId as keyof typeof MOCK_CUSTOMERS];
      
      if (!customer) {
        return {
          success: false,
          error: 'Customer not found. Please check your Customer ID.'
        };
      }
      
      // Generate mock tokens for regular customers
      const token = accessToken || `mock_token_${customerId}_${Date.now()}`;
      const refreshToken = `mock_refresh_${customerId}_${Date.now()}`;
      
      // Store tokens in cookies
      Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 1 });
      Cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, { expires: 7 });
      Cookies.set(CUSTOMER_ID_COOKIE_NAME, customerId, { expires: 7 });
      
      return { success: true, data: customer };
    } catch (error: any) {
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  },

  logout() {
    Cookies.remove(TOKEN_COOKIE_NAME);
    Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
    Cookies.remove(CUSTOMER_ID_COOKIE_NAME);
    window.location.href = '/login';
  },

  getCustomerId(): string | undefined {
    return Cookies.get(CUSTOMER_ID_COOKIE_NAME);
  },

  isAuthenticated(): boolean {
    return !!Cookies.get(TOKEN_COOKIE_NAME);
  },

  // Enhanced admin detection from React SPA
  isAdmin(): boolean {
    const customerId = this.getCustomerId();
    return customerId === 'dru78DR9789SDF862' || customerId === 'CUST_4';
  },

  // Get current customer data with admin enhancement
  getCurrentCustomer(): any | null {
    const customerId = this.getCustomerId();
    if (!customerId) return null;
    
    // Return enhanced customer data
    const customer = MOCK_CUSTOMERS[customerId as keyof typeof MOCK_CUSTOMERS];
    return customer || null;
  },

  // Admin access validation from React SPA
  hasAdminAccess(): boolean {
    const customer = this.getCurrentCustomer();
    return customer?.isAdmin === true && customer?.adminAccess === true;
  },

  // Payment status check with admin bypass
  hasCompletedPayment(): boolean {
    const customer = this.getCurrentCustomer();
    // Admin users always have access
    if (customer?.isAdmin) return true;
    return customer?.paymentStatus === 'Completed';
  },
};

// Enhanced Customer API functions with service integration
export const customerAPI = {
  async getCustomer(customerId: string) {
    try {
      // Use Airtable service for now, will switch to API later
      const { airtableService } = await import('../services/airtableService');
      return await airtableService.getCustomerAssets(customerId);
    } catch (error) {
      console.error('Failed to get customer:', error);
      throw error;
    }
  },

  async getICP(customerId: string) {
    try {
      const { airtableService } = await import('../services/airtableService');
      const customerAssets = await airtableService.getCustomerAssets(customerId);
      return customerAssets.icpContent;
    } catch (error) {
      console.error('Failed to get ICP:', error);
      throw error;
    }
  },

  async generateAIICP(customerId: string, data: any) {
    try {
      // Simulate AI ICP generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      const { airtableService } = await import('../services/airtableService');
      
      // Save generation progress
      await airtableService.saveUserProgress(customerId, 'icp_generation', {
        inputData: data,
        status: 'completed',
        generatedAt: new Date().toISOString()
      });
      
      return {
        success: true,
        data: airtableService['getMockICPContent']?.() || {},
        message: 'ICP generated successfully'
      };
    } catch (error) {
      console.error('Failed to generate AI ICP:', error);
      throw error;
    }
  },

  async updateCustomer(customerId: string, data: any) {
    try {
      const { airtableService } = await import('../services/airtableService');
      const success = await airtableService.updateCustomerAssets(customerId, data);
      
      if (!success) {
        throw new Error('Failed to update customer data');
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Failed to update customer:', error);
      throw error;
    }
  },
};

// Enhanced Cost Calculator API functions with service integration
export const costCalculatorAPI = {
  async calculate(data: any) {
    try {
      // Simulate calculation process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const {
        currentRevenue,
        targetGrowthRate,
        averageDealSize,
        salesCycleLength,
        conversionRate,
        churnRate,
        timeframe
      } = data;

      // Convert and validate inputs
      const revenue = parseFloat(currentRevenue) || 0;
      const growth = parseFloat(targetGrowthRate) / 100;
      const dealSize = parseFloat(averageDealSize) || 0;
      const cycle = parseInt(salesCycleLength) || 90;
      const conversion = parseFloat(conversionRate) / 100;
      const churn = parseFloat(churnRate) / 100;
      const months = parseInt(timeframe) || 12;

      // Calculate metrics
      const currentMonthlyRevenue = revenue / 12;
      const targetMonthlyGrowth = currentMonthlyRevenue * growth / 12;
      
      const missedGrowthRevenue = targetMonthlyGrowth * months * (months + 1) / 2;
      const inefficiencyLoss = revenue * 0.12;
      const churnImpact = revenue * churn;
      const extendedSalesCycleCost = Math.max(0, (cycle - 60) * dealSize * 0.02);
      
      const totalCostOfInaction = missedGrowthRevenue + inefficiencyLoss + churnImpact + extendedSalesCycleCost;

      return {
        success: true,
        data: {
          totalCostOfInaction: Math.round(totalCostOfInaction),
          monthlyImpact: Math.round(totalCostOfInaction / months),
          breakdown: {
            missedGrowthRevenue: Math.round(missedGrowthRevenue),
            inefficiencyLoss: Math.round(inefficiencyLoss),
            churnImpact: Math.round(churnImpact),
            salesCycleCost: Math.round(extendedSalesCycleCost)
          },
          inputData: data,
          calculatedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Failed to calculate cost:', error);
      throw error;
    }
  },

  async calculateWithAI(data: any) {
    try {
      // Enhanced AI calculation with industry analysis
      const basicResult = await this.calculate(data);
      
      // Simulate AI enhancement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        ...basicResult,
        data: {
          ...basicResult.data,
          aiInsights: {
            industryComparison: 'Above average risk factors identified',
            recommendations: [
              'Prioritize revenue optimization initiatives',
              'Implement process automation to reduce inefficiencies',
              'Focus on customer retention programs'
            ],
            confidenceScore: 0.87
          }
        }
      };
    } catch (error) {
      console.error('Failed to calculate with AI:', error);
      throw error;
    }
  },

  async save(data: any) {
    try {
      const { airtableService } = await import('../services/airtableService');
      const customerId = data.customerId || auth.getCustomerId();
      
      if (!customerId) {
        throw new Error('Customer ID required to save calculation');
      }
      
      const success = await airtableService.saveUserProgress(customerId, 'cost_calculation', {
        calculationData: data,
        savedAt: new Date().toISOString()
      });
      
      return { success, data };
    } catch (error) {
      console.error('Failed to save calculation:', error);
      throw error;
    }
  },

  async getHistory(customerId: string) {
    try {
      const { airtableService } = await import('../services/airtableService');
      const progress = await airtableService.getUserProgress(customerId, 'cost_calculation');
      
      return {
        success: true,
        data: progress ? [progress] : []
      };
    } catch (error) {
      console.error('Failed to get calculation history:', error);
      throw error;
    }
  },

  async compare(data: any) {
    try {
      // Simulate scenario comparison
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const scenarios = ['conservative', 'realistic', 'aggressive'];
      const results = scenarios.map(scenario => ({
        scenario,
        multiplier: scenario === 'conservative' ? 0.8 : scenario === 'aggressive' ? 1.3 : 1.0,
        totalCost: Math.round((data.totalCostOfInaction || 0) * (scenario === 'conservative' ? 0.8 : scenario === 'aggressive' ? 1.3 : 1.0))
      }));
      
      return { success: true, data: results };
    } catch (error) {
      console.error('Failed to compare scenarios:', error);
      throw error;
    }
  },
};

// Enhanced Business Case API functions with service integration  
export const businessCaseAPI = {
  async generate(data: any) {
    try {
      // Simulate business case generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { airtableService } = await import('../services/airtableService');
      const customerId = data.customerId || auth.getCustomerId();
      
      if (!customerId) {
        throw new Error('Customer ID required to generate business case');
      }
      
      // Get mock business case content
      const businessCaseContent = airtableService['getMockBusinessCaseContent']?.() || {};
      
      // Save generation progress
      await airtableService.saveUserProgress(customerId, 'business_case_generation', {
        templateType: data.template || 'pilot',
        inputData: data,
        status: 'completed',
        generatedAt: new Date().toISOString()
      });
      
      return {
        success: true,
        data: {
          ...businessCaseContent,
          customizations: {
            companyName: data.companyName,
            projectTitle: data.projectTitle,
            selectedTemplate: data.template || 'pilot'
          },
          generatedAt: new Date().toISOString()
        },
        message: 'Business case generated successfully'
      };
    } catch (error) {
      console.error('Failed to generate business case:', error);
      throw error;
    }
  },

  async save(data: any) {
    try {
      const { airtableService } = await import('../services/airtableService');
      const customerId = data.customerId || auth.getCustomerId();
      
      if (!customerId) {
        throw new Error('Customer ID required to save business case');
      }
      
      const success = await airtableService.saveUserProgress(customerId, 'business_case_builder', {
        formData: data.formData,
        activeTemplate: data.activeTemplate,
        savedAt: new Date().toISOString()
      });
      
      return { success, data };
    } catch (error) {
      console.error('Failed to save business case:', error);
      throw error;
    }
  },

  async getTemplates() {
    try {
      // Return business case templates
      return {
        success: true,
        data: [
          {
            id: 'pilot',
            name: 'Pilot Program Proposal',
            description: 'Test implementation with limited scope and budget',
            duration: '3-6 months',
            investment: '$25,000-$75,000',
            keyPoints: [
              'Low-risk evaluation period',
              'Measurable success criteria', 
              'Clear path to full implementation',
              'Stakeholder buy-in development'
            ]
          },
          {
            id: 'fullImplementation',
            name: 'Full Implementation Business Case',
            description: 'Enterprise-wide transformation initiative',
            duration: '6-18 months',
            investment: '$100,000-$500,000',
            keyPoints: [
              'Comprehensive transformation',
              'Long-term value creation',
              'Competitive advantage development',
              'Organizational change management'
            ]
          },
          {
            id: 'expansion',
            name: 'Expansion Phase Proposal',
            description: 'Scale successful pilot to additional areas',
            duration: '4-8 months',
            investment: '$50,000-$200,000',
            keyPoints: [
              'Proven concept scaling',
              'Accelerated implementation',
              'Risk mitigation from pilot learnings',
              'ROI multiplication opportunity'
            ]
          }
        ]
      };
    } catch (error) {
      console.error('Failed to get templates:', error);
      throw error;
    }
  },

  async export(data: any, format: 'pdf' | 'ppt' | 'email' = 'pdf') {
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        data: {
          format,
          downloadUrl: `/api/business-case/export/${data.id}?format=${format}`,
          filename: `business-case-${data.companyName || 'export'}.${format}`,
          exportedAt: new Date().toISOString()
        },
        message: `Business case exported as ${format.toUpperCase()}`
      };
    } catch (error) {
      console.error('Failed to export business case:', error);
      throw error;
    }
  },

  async customize(data: any) {
    const response = await apiClient.post('/api/business-case/customize', data);
    return response.data;
  },

  async getHistory(customerId: string) {
    const response = await apiClient.get(`/api/business-case/${customerId}/history`);
    return response.data;
  },
};

// Progress API functions - Using Express backend with authentication bridge
export const progressAPI = {
  async getProgress(customerId: string) {
    try {
      // Use Express backend with authentication bridge
      const response = await authenticatedFetch(`/api/progress/${customerId}`, {
        method: 'GET',
      }, customerId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorData.error || 'Unknown error'}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to get progress:', error);
      throw error;
    }
  },

  async trackAction(customerId: string, action: string, metadata?: any) {
    try {
      const response = await authenticatedFetch(`/api/progress/${customerId}/track`, {
        method: 'POST',
        body: JSON.stringify({ action, metadata }),
      }, customerId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorData.error || 'Unknown error'}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to track action:', error);
      throw error;
    }
  },

  async getMilestones(customerId: string) {
    try {
      const response = await authenticatedFetch(`/api/progress/${customerId}/milestones`, {
        method: 'GET',
      }, customerId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorData.error || 'Unknown error'}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to get milestones:', error);
      throw error;
    }
  },

  async getInsights(customerId: string) {
    try {
      const response = await authenticatedFetch(`/api/progress/${customerId}/insights`, {
        method: 'GET',
      }, customerId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorData.error || 'Unknown error'}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to get insights:', error);
      throw error;
    }
  },

  async completeMilestone(customerId: string, milestoneId: string, metadata?: any) {
    try {
      const response = await authenticatedFetch(
        `/api/progress/${customerId}/milestones/${milestoneId}/complete`,
        {
          method: 'POST',
          body: JSON.stringify({ metadata }),
        }, customerId
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorData.error || 'Unknown error'}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to complete milestone:', error);
      throw error;
    }
  },
};

// Export API functions
export const exportAPI = {
  async exportICP(data: any) {
    const response = await apiClient.post('/api/export/icp', data);
    return response.data;
  },

  async exportCostCalculator(data: any) {
    const response = await apiClient.post('/api/export/cost-calculator', data);
    return response.data;
  },

  async exportBusinessCase(data: any) {
    const response = await apiClient.post('/api/export/business-case', data);
    return response.data;
  },

  async exportComprehensive(data: any) {
    const response = await apiClient.post('/api/export/comprehensive', data);
    return response.data;
  },

  async getExportStatus(exportId: string) {
    const response = await apiClient.get(`/api/export/status/${exportId}`);
    return response.data;
  },

  async getExportHistory(customerId: string) {
    const response = await apiClient.get(`/api/export/history/${customerId}`);
    return response.data;
  },
};

// Webhook API functions
export const webhookAPI = {
  async triggerAutomation(customerId: string, automationType: string, data?: any) {
    const response = await apiClient.post('/api/webhooks/trigger', {
      customerId,
      automationType,
      data,
    });
    return response.data;
  },

  async getAutomationStatus() {
    const response = await apiClient.get('/api/webhooks/status');
    return response.data;
  },
};

export default apiClient;