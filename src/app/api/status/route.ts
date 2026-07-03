import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { gemini } from '@/lib/gemini';
import { placesSearchStatus } from '@/lib/places-search';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    database: db.isMock ? 'local_file' : 'supabase',
    gemini: gemini.isMock ? 'mock' : 'real',
    google_maps: placesSearchStatus.hasGoogleKey ? 'real' : 'free',
    search_providers: placesSearchStatus.providers,
  });
}
