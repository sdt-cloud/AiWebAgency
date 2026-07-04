import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getPresetForCategory } from '@/components/templates/template-registry';

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

    // 3. Get appropriate preset based on category
    console.log(`API Generate: Generating site for ${lead.name} using template registry`);
    
    const preset = getPresetForCategory(lead.category || '');
    
    // Türkçe karakterleri temizleyip boşlukları silerek kurumsal e-posta türetelim
    const normalizedDomain = lead.name
      .toLowerCase()
      .trim()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, ''); // Sayı ve harfler dışındaki tüm karakterleri (boşluklar dahil) sil
    
    const dynamicEmail = `info@${normalizedDomain || 'isletme'}.com`;

    // Yalnızca şirket adı, telefon, adres gibi spesifik verileri lead'den al,
    // gerisini template'in varsayılan, kaliteli hazır içeriğinden (mock_data) kullan.
    const customContent = {
      ...preset.defaultContent,
      hero: {
        ...preset.defaultContent.hero,
        title: `${lead.name} - ${preset.defaultContent.hero.title}`
      },
      contact: {
        ...preset.defaultContent.contact,
        company_name: lead.name,
        phone: lead.phone || preset.defaultContent.contact.phone,
        address: lead.address || preset.defaultContent.contact.address,
        email: dynamicEmail, // Dinamik üretilen kurumsal mail
      }
    };

    // 4. Save generated site configuration to DB
    const savedSite = await db.saveSite({
      lead_id: lead.id,
      template_name: preset.template_name,
      theme_config: preset.defaultTheme,
      content: customContent,
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
