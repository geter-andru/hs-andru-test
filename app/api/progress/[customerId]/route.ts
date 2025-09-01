import { NextRequest, NextResponse } from 'next/server';
import { withAuth, verifyCustomerAccess, AuthUser } from '../../middleware/auth';

// Mock data for now - will be replaced with real database queries
const getMockProgressData = (customerId: string) => ({
  customerId,
  overallProgress: 65,
  toolsCompleted: 2,
  totalTools: 3,
  currentPhase: 'Business Case Development',
  lastActivity: new Date().toISOString(),
  metrics: {
    icpCompleteness: 85,
    costCalculatorUsage: 100,
    businessCaseProgress: 45
  },
  recentActions: [
    {
      action: 'Completed ICP Analysis',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      impact: 'high'
    },
    {
      action: 'Generated Cost Report',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      impact: 'medium'
    }
  ],
  nextSteps: [
    'Complete Business Case Builder',
    'Export comprehensive report',
    'Schedule stakeholder review'
  ]
});

/**
 * GET /api/progress/[customerId]
 * Get customer progress dashboard data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { customerId: string } }
) {
  return withAuth(request, async (req: NextRequest, user: AuthUser) => {
    try {
      const { customerId } = params;
      
      // Verify the user has access to this customer's data
      if (!verifyCustomerAccess(user, customerId)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Access denied',
            details: 'You can only access your own customer data'
          },
          { status: 403 }
        );
      }
      
      // For now, return mock data
      // TODO: Replace with actual database query to Supabase or Airtable
      const progressData = getMockProgressData(customerId);
      
      return NextResponse.json({
        success: true,
        data: progressData,
        timestamp: new Date().toISOString()
      });
      
    } catch (error: any) {
      console.error('Progress API error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch progress data',
          details: error.message
        },
        { status: 500 }
      );
    }
  });
}