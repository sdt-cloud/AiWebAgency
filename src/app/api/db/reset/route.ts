import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    console.log('API Reset: Database clear triggered.');
    
    // Veritabanındaki tüm verileri temizleyen metodu çalıştır
    await db.resetDatabase();

    return NextResponse.json({
      success: true,
      message: 'Veritabanı başarıyla sıfırlandı. Tüm adaylar ve şablonlar temizlendi.',
    });
  } catch (error: any) {
    console.error('API Reset error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
