import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { site_id, content, token } = body;

    if (!site_id || !content || !token) {
      return NextResponse.json(
        { error: 'site_id, content, and token parameters are required.' },
        { status: 400 }
      );
    }

    // Update site content in DB after validating token
    console.log(`API Update Site: Updating site content for ID ${site_id}`);
    const updatedSite = await db.updateSiteContent(site_id, content, token);

    return NextResponse.json({
      success: true,
      site: updatedSite,
    });
  } catch (error: any) {
    console.error('API Update Site route error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
