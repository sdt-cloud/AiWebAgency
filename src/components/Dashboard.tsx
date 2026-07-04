'use client';

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Database, ShieldAlert, BarChart3, Layout, Users, CheckCircle, FileText, Trash2, MessageSquare, AlertCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import LeadTable from './LeadTable';
import PreviewFrame from './PreviewFrame';
import { turkeyData, turkeyCategories } from '@/lib/turkey-data';

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState('İstanbul');
  const [selectedDistrict, setSelectedDistrict] = useState('Kadıköy');
  const [selectedCategory, setSelectedCategory] = useState('Çilingir');
  const [isScanning, setIsScanning] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [searchStats, setSearchStats] = useState<any | null>(null);
  const [apiStatus, setApiStatus] = useState<{
    database: 'supabase' | 'local_file';
    gemini: 'real' | 'mock';
    google_maps: 'real' | 'free';
    search_providers: string[];
  }>({
    database: 'local_file',
    gemini: 'mock',
    google_maps: 'free',
    search_providers: ['Overpass (OSM)', 'Nominatim (OSM)'],
  });

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    // Automatically set district to first district of the new city
    const cityObj = turkeyData.find(c => c.name === cityName);
    if (cityObj && cityObj.districts.length > 0) {
      setSelectedDistrict(cityObj.districts[0]);
    }
  };

  const currentCityObj = turkeyData.find(c => c.name === selectedCity);
  const availableDistricts = currentCityObj ? currentCityObj.districts : [];

  // 1. Fetch leads and status on mount
  useEffect(() => {
    fetchLeads();
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      if (res.ok && data.success) {
        setApiStatus({
          database: data.database,
          gemini: data.gemini,
          google_maps: data.google_maps,
          search_providers: data.search_providers || [],
        });
      }
    } catch (err) {
      console.error('Error fetching system status:', err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  // 2. Scan Google Maps for leads
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const location = `${selectedDistrict}, ${selectedCity}`;
    const keyword = selectedCategory;

    setIsScanning(true);
    setSearchStats(null);

    try {
      const res = await fetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, keyword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSearchStats({
          scanned: data.scanned_count,
          filtered: data.filtered_count,
          processed: data.processed_leads.length,
          source: data.source || '',
          message: data.message || '',
        });
        
        // Sadece arama sonucundaki adayları göster
        setSearchResults(data.processed_leads);
        
        // Arka planda genel listeyi de güncelle
        await fetchLeads();
      } else {
        alert(data.error || 'Arama sırasında bir hata oluştu.');
      }
    } catch (err) {
      console.error('Error searching leads:', err);
      alert('Sistem bağlantı hatası oluştu.');
    } finally {
      setIsScanning(false);
    }
  };

  // 3. Generate site via AI
  const handleGenerate = async (leadId: string) => {
    setGeneratingId(leadId);
    try {
      const res = await fetch('/api/leads/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh leads list
        const refreshedRes = await fetch('/api/leads');
        const refreshedData = await refreshedRes.json();
        if (refreshedRes.ok && refreshedData.success) {
          setLeads(refreshedData.leads);
          
          // Arama sonuçları aktifse oradaki durumu da güncelle
          if (searchResults) {
            const updatedSearch = searchResults.map((sl: any) => {
              const match = refreshedData.leads.find((l: any) => l.id === sl.id);
              return match || sl;
            });
            setSearchResults(updatedSearch);
          }

          // Find the generated lead in new list and select it to show preview
          const newlyGenerated = refreshedData.leads.find((l: any) => l.id === leadId);
          if (newlyGenerated) {
            setSelectedLead(newlyGenerated);
          }
        }
      } else {
        alert(data.error || 'Tasarım oluşturulurken bir hata oluştu.');
      }
    } catch (err) {
      console.error('Error generating website:', err);
      alert('Sistem bağlantı hatası.');
    } finally {
      setGeneratingId(null);
    }
  };

  // 4. Update status of lead
  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId, status: newStatus }),
      });

      if (res.ok) {
        // Update local state
        setLeads(prev =>
          prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        
        // Update search results state if active
        if (searchResults) {
          setSearchResults(prev =>
            prev ? prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l)) : null
          );
        }

        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prev: any) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // 5. Reset Database
  const [isResetting, setIsResetting] = useState(false);
  const handleResetDatabase = async () => {
    if (!window.confirm('DİKKAT: Veritabanındaki tüm taranan adaylar ve üretilen web siteleri KALICI OLARAK silinecektir. Bu işlem geri alınamaz. Emin misiniz?')) {
      return;
    }

    setIsResetting(true);
    try {
      const res = await fetch('/api/db/reset', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(data.message || 'Veritabanı sıfırlandı.');
        setLeads([]);
        setSearchResults(null);
        setSelectedLead(null);
      } else {
        alert(data.error || 'Sıfırlama başarısız.');
      }
    } catch (err) {
      console.error('Error resetting database:', err);
      alert('Sıfırlama sırasında bağlantı hatası oluştu.');
    } finally {
      setIsResetting(false);
    }
  };

  // Count stats
  const totalLeads = leads.length;
  const readySites = leads.filter(l => l.status === 'ready' || l.status === 'contacted' || l.status === 'change_requested' || l.status === 'accepted' || l.status === 'rejected').length;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length;
  const changeRequestedLeads = leads.filter(l => l.status === 'change_requested').length;
  const acceptedLeads = leads.filter(l => l.status === 'accepted').length;
  const rejectedLeads = leads.filter(l => l.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-indigo-500/25">
            <Sparkles size={20} className="fill-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight">AI Agent Web Agency</h1>
            <p className="text-[10px] text-indigo-300 font-semibold tracking-wider uppercase">Otomatik Satış & Tasarım Paneli</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${
            apiStatus.database === 'supabase'
              ? 'bg-emerald-950 text-emerald-300 border-emerald-800/50'
              : 'bg-indigo-950 text-indigo-300 border-indigo-900/50'
          }`}>
            <Database size={12} />
            <span className="font-semibold">
              {apiStatus.database === 'supabase' ? 'Supabase Bulut DB' : 'Yerel Dosya DB (local_db)'}
            </span>
          </div>

          <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border ${
            apiStatus.gemini === 'real'
              ? 'bg-emerald-950 text-emerald-300 border-emerald-800/50'
              : 'bg-amber-950 text-amber-300 border-amber-900/50 animate-pulse'
          }`}>
            <Sparkles size={12} />
            <span className="font-semibold">
              {apiStatus.gemini === 'real' ? 'Gemini AI Aktif' : 'Gemini Simülasyon'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border bg-emerald-950 text-emerald-300 border-emerald-800/50">
            <Search size={12} />
            <span className="font-semibold">
              Harita: {apiStatus.search_providers.join(' → ')}
            </span>
          </div>

          <Link
            href="/templates"
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border bg-slate-800 hover:bg-slate-700 text-slate-350 border-slate-700/80 transition-colors cursor-pointer"
          >
            <Layout size={12} />
            <span className="font-semibold">Şablon Havuzu</span>
          </Link>

          <button
            onClick={handleResetDatabase}
            disabled={isResetting}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border bg-rose-950 hover:bg-rose-900 text-rose-300 border-rose-800/50 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Trash2 size={12} />
            <span className="font-semibold">{isResetting ? 'Sıfırlanıyor...' : 'Verileri Sıfırla'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Mock Mode Alert - Only show if Gemini is mocked */}
          {apiStatus.gemini === 'mock' && (
            <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-2xl flex gap-3 text-amber-800">
              <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold">Geliştirici Uyarı Paneli:</span>
                <p className="text-amber-700 leading-relaxed">
                  • Gemini API anahtarınız eksik veya geçersiz. AI ile web sitesi tasarımı simüle ediliyor.
                  Gerçek modda çalışmak için `.env.local` dosyasına geçerli `GEMINI_API_KEY` girin ve sunucuyu yeniden başlatın.
                </p>
              </div>
            </div>
          )}

          {/* Stats Funnel */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Taranan Adaylar */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                <Users size={16} />
              </div>
              <div>
                <h4 className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Taranan Adaylar</h4>
                <div className="text-lg font-black text-slate-800 leading-none mt-0.5">{totalLeads}</div>
              </div>
            </div>
            
            {/* Tasarlanan Siteler */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <FileText size={16} />
              </div>
              <div>
                <h4 className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Tasarım Hazır</h4>
                <div className="text-lg font-black text-indigo-700 leading-none mt-0.5">{readySites}</div>
              </div>
            </div>

            {/* Teklif İletilenler */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <MessageSquare size={16} />
              </div>
              <div>
                <h4 className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Teklif İletildi</h4>
                <div className="text-lg font-black text-blue-700 leading-none mt-0.5">{contactedLeads}</div>
              </div>
            </div>

            {/* Revize İstendi */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertCircle size={16} />
              </div>
              <div>
                <h4 className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Revize İstendi</h4>
                <div className="text-lg font-black text-amber-700 leading-none mt-0.5">{changeRequestedLeads}</div>
              </div>
            </div>

            {/* Satış Yapıldı */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ThumbsUp size={16} />
              </div>
              <div>
                <h4 className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Satış Yapıldı</h4>
                <div className="text-lg font-black text-emerald-700 leading-none mt-0.5">{acceptedLeads}</div>
              </div>
            </div>

            {/* Reddedildi */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <ThumbsDown size={16} />
              </div>
              <div>
                <h4 className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Reddedildi</h4>
                <div className="text-lg font-black text-rose-700 leading-none mt-0.5">{rejectedLeads}</div>
              </div>
            </div>
          </div>

          {/* Search Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <Search size={16} className="text-indigo-600" />
              <span>İşletme Arama Motoru (Çoklu Kaynak)</span>
            </h3>

            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">İl (Şehir)</label>
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium cursor-pointer"
                >
                  {turkeyData.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">İlçe</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium cursor-pointer"
                >
                  {availableDistricts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">İşletme Sektörü</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium cursor-pointer"
                >
                  {turkeyCategories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isScanning}
                className="py-2 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer disabled:opacity-50 h-[38px]"
              >
                {isScanning ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Taranıyor...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Haritayı Tara</span>
                  </>
                )}
              </button>
            </form>

            {/* Scan stats notification */}
            {searchStats && (
              <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl text-xs text-indigo-800 flex justify-between items-center">
                <span>
                  {searchStats.message ? searchStats.message : (<>
                    Arama tamamlandı ({searchStats.source}). <strong>{searchStats.scanned}</strong> işletme tarandı.
                    Sitesi olmayan <strong>{searchStats.filtered}</strong> aday bulundu ve <strong>{searchStats.processed}</strong> yeni aday panele eklendi.
                  </>)}
                </span>
                <button 
                  onClick={() => setSearchStats(null)} 
                  className="text-indigo-400 hover:text-indigo-600 font-bold px-2 cursor-pointer"
                >
                  X
                </button>
              </div>
            )}
          </div>

          {/* Leads list table */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-800 text-sm">
                {searchResults ? 'Arama Sonuçları' : 'Tüm Müşteri Adayları'}
              </h3>
              {searchResults && (
                <button
                  onClick={() => setSearchResults(null)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Tüm Adayları Göster
                </button>
              )}
            </div>
            <LeadTable
              leads={searchResults || leads}
              onGenerate={handleGenerate}
              onViewPreview={(lead) => setSelectedLead(lead)}
              generatingId={generatingId}
              selectedLeadId={selectedLead?.id}
            />
          </div>
        </div>

        {/* Sidebar site preview */}
        {selectedLead && (
          <PreviewFrame
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </div>
  );
}
