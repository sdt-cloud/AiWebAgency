import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const leads = await db.getLeads();
    const enrichedLeads = [];

    for (const lead of leads) {
      const site = await db.getSiteByLeadId(lead.id);
      enrichedLeads.push({
        ...lead,
        site_id: site?.id || null,
        edit_token: site?.edit_token || null,
        template_name: site?.template_name || null,
      });
    }

    return NextResponse.json({
      success: true,
      leads: enrichedLeads,
    });
  } catch (error: any) {
    console.error('API Get Leads error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, status } = body;

    if (!lead_id || !status) {
      return NextResponse.json(
        { error: 'lead_id and status are required.' },
        { status: 400 }
      );
    }

    await db.updateLeadStatus(lead_id, status);

    return NextResponse.json({
      success: true,
      message: `Lead status updated to ${status}.`,
    });
  } catch (error: any) {
    console.error('API Update Lead status error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
