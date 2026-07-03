import React from 'react';
import { db } from '@/lib/db';
import PreviewClientWrapper from '@/components/templates/PreviewClientWrapper';
import { ArrowLeft, MonitorOff } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function PreviewPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { token } = await searchParams;

  try {
    // 1. Fetch site from database
    const site = await db.getSiteById(id);
    
    if (!site) {
      return <SiteNotFound />;
    }

    // 2. Fetch associated lead details
    const lead = await db.getLeadById(site.lead_id);
    if (!lead) {
      return <SiteNotFound />;
    }

    // 3. Verify edit token if provided
    const isTokenValid = token && site.edit_token === token;
    const initialEditMode = !!isTokenValid;

    return (
      <PreviewClientWrapper
        site={site}
        lead={lead}
        initialEditMode={initialEditMode}
        token={isTokenValid ? token : undefined}
      />
    );
  } catch (error) {
    console.error('Error rendering preview page:', error);
    return <SiteError />;
  }
}

function SiteNotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-slate-800 p-8 rounded-3xl max-w-md w-full shadow-2xl border border-slate-700 flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
          <MonitorOff size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Web Sitesi Bulunamadı</h2>
          <p className="text-slate-400 text-sm">
            Aradığınız işletme için henüz bir web sitesi önizlemesi üretilmemiş veya hatalı bir adres girilmiş olabilir.
          </p>
        </div>
        <Link
          href="/"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Yönetim Paneline Dön</span>
        </Link>
      </div>
    </div>
  );
}

function SiteError() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-slate-800 p-8 rounded-3xl max-w-md w-full shadow-2xl border border-slate-700 flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center">
          <MonitorOff size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Bir Hata Oluştu</h2>
          <p className="text-slate-400 text-sm">
            Web sitesi yüklenirken sistemsel bir hata meydana geldi. Lütfen veritabanı bağlantılarını kontrol edin.
          </p>
        </div>
        <Link
          href="/"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Yönetim Paneline Dön</span>
        </Link>
      </div>
    </div>
  );
}
