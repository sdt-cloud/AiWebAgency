import { NextResponse } from 'next/server';
import { gemini } from '@/lib/gemini';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id } = body;

    if (!lead_id) {
      return NextResponse.json(
        { error: 'lead_id is required.' },
        { status: 400 }
      );
    }

    // 1. Fetch lead from database
    const lead = await db.getLeadById(lead_id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    // 2. Update status to 'generating'
    await db.updateLeadStatus(lead_id, 'generating');

    // 3. Call Gemini to generate full website layout, content and styling
    console.log(`API Generate: Generating site for ${lead.name}`);
    const siteConfig = await gemini.generateWebsite(
      lead.name,
      lead.category,
      lead.address,
      lead.phone,
      lead.reviews_summary
    );

    // 4. Save generated site configuration to DB
    const savedSite = await db.saveSite({
      lead_id: lead.id,
      template_name: siteConfig.template_name || 'business',
      theme_config: siteConfig.theme_config || { primary: '#4f46e5', secondary: '#818cf8', fontFamily: 'Inter' },
      content: siteConfig.content,
    });

    // 5. Update lead status to 'ready'
    await db.updateLeadStatus(lead_id, 'ready');

    return NextResponse.json({
      success: true,
      site: savedSite,
    });
  } catch (error: any) {
    console.error('API Generate route error:', error);
    // Hata durumunda lead'i 'generating' durumunda takılı bırakma — 'new'e geri al
    try {
      const body = await request.clone().json().catch(() => ({}));
      if (body.lead_id) {
        await db.updateLeadStatus(body.lead_id, 'new');
      }
    } catch (rollbackErr) {
      console.error('Rollback hatası:', rollbackErr);
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
