import { NextRequest, NextResponse } from 'next/server';
import { withAuth, verifyCustomerAccess, AuthUser } from '../../../middleware/auth';

// Mock milestones data
const getMockMilestones = (customerId: string) => ({
  customerId,
  milestones: [
    {
      id: 'milestone-1',
      name: 'Complete ICP Analysis',
      description: 'Define and analyze your Ideal Customer Profile',
      status: 'completed',
      completedAt: new Date(Date.now() - 86400000).toISOString(),
      points: 100,
      category: 'analysis'
    },
    {
      id: 'milestone-2', 
      name: 'Calculate Cost of Inaction',
      description: 'Quantify the financial impact of delayed decisions',
      status: 'completed',
      completedAt: new Date(Date.now() - 172800000).toISOString(),
      points: 150,
      category: 'financial'
    },
    {
      id: 'milestone-3',
      name: 'Build Business Case',
      description: 'Create a compelling business case for stakeholders',
      status: 'in_progress',
      progress: 45,
      points: 200,
      category: 'strategy'
    },
    {
      id: 'milestone-4',
      name: 'Export Comprehensive Report',
      description: 'Generate and export full analysis documentation',
      status: 'pending',
      points: 50,
      category: 'reporting'
    }
  ],
  totalPoints: 500,
  earnedPoints: 250,
  nextMilestone: {
    id: 'milestone-3',
    name: 'Build Business Case',
    remainingSteps: 3
  }
});

/**
 * GET /api/progress/[customerId]/milestones
 * Get customer milestones
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
      
      // Get milestones data
      const milestonesData = getMockMilestones(customerId);
      
      return NextResponse.json({
        success: true,
        data: milestonesData,
        timestamp: new Date().toISOString()
      });
      
    } catch (error: any) {
      console.error('Milestones API error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch milestones',
          details: error.message
        },
        { status: 500 }
      );
    }
  });
}