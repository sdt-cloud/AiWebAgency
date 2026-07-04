import React from 'react';
import { db } from '@/lib/db';
import PreviewClientWrapper from '@/components/templates/PreviewClientWrapper';
import { ArrowLeft, MonitorOff } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function PreviewPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { token } = await searchParams;

  try {
    // 0. Şablon Havuzu / Taslak Önizleme Kontrolü
    if (id.startsWith('preset_')) {
      const presetName = id.replace('preset_', '');
      const { getPresetByName } = await import('@/components/templates/template-registry');
      const preset = getPresetByName(presetName);
      
      if (!preset) {
        return <SiteNotFound />;
      }
      
      // Varsa kullanıcının önceden özelleştirdiği içeriği al, yoksa varsayılanı kullan
      const customContent = await db.getCustomPreset(presetName);
      const content = customContent || preset.defaultContent;

      const mockSite = {
        id: id,
        lead_id: 'preset_lead_id',
        template_name: preset.template_name,
        theme_config: preset.defaultTheme,
        content: content,
        edit_token: 'preset_token',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const mockLead = {
        id: 'preset_lead_id',
        name: content.contact?.company_name || preset.displayName,
        category: preset.category,
        address: content.contact?.address || '',
        phone: content.contact?.phone || '',
        rating: 5,
        reviews_count: 0,
        reviews_summary: 'Şablon Havuzu varsayılan içeriği.',
        has_website: false,
        website_url: '',
        place_id: 'preset_place',
        status: 'ready' as const,
        created_at: new Date().toISOString(),
      };

      const isTokenValid = token === 'preset_token';

      return (
        <div className="relative flex flex-col min-h-screen">
          {/* Şablon düzenleme modu uyarı barı */}
          <div className="bg-slate-900 text-slate-300 py-3.5 px-6 border-b border-slate-800 flex justify-between items-center text-xs font-semibold shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500" />
              <span className="text-slate-100">ŞABLON HAVUZU DÜZENLEME MODU</span>
              <span className="text-slate-500 font-normal">| Bu sayfada yaptığınız değişiklikler şablon havuzunun varsayılan tasarımını günceller.</span>
            </span>
            <Link href="/templates" className="px-4.5 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded text-slate-200 transition-colors text-xs font-medium cursor-pointer">
              ← Şablon Kütüphanesine Dön
            </Link>
          </div>
          <div className="grow relative">
            <PreviewClientWrapper
              site={mockSite as any}
              lead={mockLead as any}
              initialEditMode={isTokenValid}
              token={isTokenValid ? 'preset_token' : undefined}
            />
          </div>
        </div>
      );
    }

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
