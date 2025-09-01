import { NextRequest, NextResponse } from 'next/server';
import { withAuth, verifyCustomerAccess, AuthUser } from '../../../middleware/auth';

/**
 * POST /api/progress/[customerId]/track
 * Track a customer action or event
 */
export async function POST(
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
            details: 'You can only track actions for your own account'
          },
          { status: 403 }
        );
      }
      
      // Parse request body
      const body = await req.json();
      const { action, metadata } = body;
      
      // Validate required fields
      if (!action) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation error',
            details: 'Action is required'
          },
          { status: 400 }
        );
      }
      
      // TODO: Save action to database (Supabase or Airtable)
      // For now, just acknowledge the action
      const trackedAction = {
        id: `action-${Date.now()}`,
        customerId,
        action,
        metadata: metadata || {},
        timestamp: new Date().toISOString(),
        processed: true
      };
      
      // Check if any milestones were triggered
      const milestonesTriggered = [];
      
      // Example milestone trigger logic
      if (action === 'completed_icp_analysis') {
        milestonesTriggered.push({
          id: 'milestone-1',
          name: 'Complete ICP Analysis',
          points: 100
        });
      }
      
      return NextResponse.json({
        success: true,
        data: {
          action: trackedAction,
          milestonesTriggered,
          totalPoints: milestonesTriggered.reduce((sum, m) => sum + m.points, 0)
        },
        timestamp: new Date().toISOString()
      });
      
    } catch (error: any) {
      console.error('Track action API error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to track action',
          details: error.message
        },
        { status: 500 }
      );
    }
  });
}