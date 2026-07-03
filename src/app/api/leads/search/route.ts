import { NextResponse } from 'next/server';
import { searchPlaces } from '@/lib/places-search';
import { gemini } from '@/lib/gemini';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location, keyword } = body;

    if (!location || !keyword) {
      return NextResponse.json(
        { error: 'Konum ve sektör parametreleri zorunludur.' },
        { status: 400 }
      );
    }

    // 1. Çoklu kaynaklı arama motoru ile işletmeleri bul
    console.log(`API Search: "${keyword}" in "${location}" aranıyor…`);
    const searchResult = await searchPlaces(location, keyword);

    if (searchResult.places.length === 0) {
      return NextResponse.json({
        success: true,
        scanned_count: 0,
        filtered_count: 0,
        processed_leads: [],
        source: searchResult.source,
        message: 'Bu bölgede seçilen kategoride işletme bulunamadı. Farklı bir ilçe veya sektör deneyin.',
      });
    }

    // 2. Web sitesi olmayanları filtrele (hedef müşteriler)
    const noWebsiteBusinesses = searchResult.places.filter(b => !b.has_website);
    console.log(`API Search: ${searchResult.places.length} işletme tarandı (kaynak: ${searchResult.source}), ${noWebsiteBusinesses.length} tanesinin web sitesi yok.`);

    const savedLeads = [];

    // 3. Her adayı işleyip veritabanına kaydet (hız için max 8)
    const leadsToProcess = noWebsiteBusinesses.slice(0, 8);

    for (const biz of leadsToProcess) {
      try {
        // Gemini ile yorum özeti oluştur (yorum varsa)
        let reviewsSummary = 'Müşteri odaklı kaliteli hizmet.';
        if (biz.reviews && biz.reviews.length > 0) {
          console.log(`API Search: ${biz.name} için yorumlar özetleniyor…`);
          reviewsSummary = await gemini.summarizeReviews(biz.name, biz.category, biz.reviews);
        }

        // Veritabanına kaydet
        const savedLead = await db.saveLead({
          name: biz.name,
          category: biz.category,
          address: biz.address,
          phone: biz.phone,
          rating: biz.rating,
          reviews_count: biz.reviews_count,
          reviews_summary: reviewsSummary,
          has_website: false,
          website_url: '',
          place_id: biz.place_id,
        });

        savedLeads.push(savedLead);
      } catch (err) {
        console.error(`İşletme işlenirken hata (${biz.name}):`, err);
      }
    }

    return NextResponse.json({
      success: true,
      scanned_count: searchResult.totalScanned,
      filtered_count: noWebsiteBusinesses.length,
      processed_leads: savedLeads,
      source: searchResult.source,
    });
  } catch (error: any) {
    console.error('API Search route hatası:', error);
    return NextResponse.json({ error: error.message || 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}
