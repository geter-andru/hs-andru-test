import { NextRequest, NextResponse } from 'next/server';
import { withAuth, verifyCustomerAccess, AuthUser } from '../../../middleware/auth';

// Mock insights data
const getMockInsights = (customerId: string) => ({
  customerId,
  insights: [
    {
      id: 'insight-1',
      type: 'recommendation',
      priority: 'high',
      title: 'Complete Your Business Case',
      description: 'You\'re 45% through the Business Case Builder. Completing it will unlock advanced export options.',
      actionUrl: '/business-case',
      estimatedTime: '15 minutes'
    },
    {
      id: 'insight-2',
      type: 'opportunity',
      priority: 'medium',
      title: 'Export Your ICP Analysis',
      description: 'Your ICP analysis is complete. Export it to share with stakeholders or integrate with your CRM.',
      actionUrl: '/export',
      estimatedTime: '2 minutes'
    },
    {
      id: 'insight-3',
      type: 'tip',
      priority: 'low',
      title: 'Refine Your Cost Calculations',
      description: 'Adding more detail to your cost calculations can increase stakeholder buy-in by 40%.',
      actionUrl: '/cost-calculator',
      estimatedTime: '10 minutes'
    }
  ],
  statistics: {
    toolsUsed: 2,
    totalTools: 3,
    completionRate: 67,
    averageTimePerTool: '25 minutes',
    lastActive: new Date().toISOString()
  },
  recommendations: {
    nextBestAction: 'Complete Business Case Builder',
    estimatedImpact: 'High',
    timeToComplete: '15 minutes',
    potentialValue: '$50,000+ in faster decision making'
  }
});

/**
 * GET /api/progress/[customerId]/insights
 * Get progress insights and recommendations
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { customerId: string } }
) {
  return withAuth(request, async (req: NextRequest, user: AuthUser) => {
    try {
      const { customerId } = params;
      
      // Verify access
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
      
      // Get insights data
      const insightsData = getMockInsights(customerId);
      
      return NextResponse.json({
        success: true,
        data: insightsData,
        timestamp: new Date().toISOString()
      });
      
    } catch (error: any) {
      console.error('Insights API error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch insights',
          details: error.message
        },
        { status: 500 }
      );
    }
  });
}