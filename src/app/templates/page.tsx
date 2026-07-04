'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Eye, 
  Edit3, 
  Layout, 
  Grid, 
  Sparkles, 
  Coffee, 
  Scissors, 
  Stethoscope, 
  Briefcase, 
  AlertTriangle, 
  Car 
} from 'lucide-react';
import { getAllPresets } from '@/components/templates/template-registry';

// Kategorileri ve onlara karşılık gelen şık ikonları tanımlayalım
const CATEGORY_META = [
  { id: 'all', label: 'Tüm Şablonlar', icon: Grid, color: 'text-indigo-400 bg-indigo-500/10' },
  { id: 'Kafe & Restoran', label: 'Kafe & Restoran', icon: Coffee, color: 'text-amber-400 bg-amber-500/10' },
  { id: 'Berber & Güzellik', label: 'Berber & Güzellik', icon: Scissors, color: 'text-pink-400 bg-pink-500/10' },
  { id: 'Diş & Sağlık', label: 'Sağlık & Medikal', icon: Stethoscope, color: 'text-cyan-400 bg-cyan-500/10' },
  { id: 'Hukuk & Kurumsal', label: 'Kurumsal & Hukuk', icon: Briefcase, color: 'text-blue-400 bg-blue-500/10' },
  { id: 'Acil Servis', label: 'Acil & Saha Hizmetleri', icon: AlertTriangle, color: 'text-red-400 bg-red-500/10' },
  { id: 'Oto & Hizmet', label: 'Oto & Ev Hizmetleri', icon: Car, color: 'text-emerald-400 bg-emerald-500/10' }
];

// İnce kategorileri ana filtre gruplarına eşleyen yardımcı fonksiyon
export function mapPresetToDashboardCategory(presetCategory: string): string {
  switch (presetCategory) {
    case 'Kafe & Restoran':
    case 'Pastane & Fırın':
      return 'Kafe & Restoran';
    case 'Berber & Kuaför':
    case 'Güzellik Salonu & SPA':
    case 'Fotoğrafçı':
      return 'Berber & Güzellik';
    case 'Diş Kliniği':
    case 'Eczane':
    case 'Veteriner':
      return 'Diş & Sağlık';
    case 'Avukat & Hukuk':
    case 'Emlak & Gayrimenkul':
      return 'Hukuk & Kurumsal';
    case 'Çilingir':
    case 'Tesisatçı & Tadilat':
    case 'Elektrikçi':
      return 'Acil Servis';
    case 'Oto Yıkama':
    case 'Oto Tamir & Servis':
      return 'Oto & Hizmet';
    default:
      return 'Oto & Hizmet';
  }
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Tüm şablon tanımlarını kayıt defterinden alalım
  const allPresets = useMemo(() => {
    return getAllPresets();
  }, []);

  // Arama sorgusuna ve seçilen kategoriye göre şablonları filtreleyelim
  const filteredPresets = useMemo(() => {
    return allPresets.filter(preset => {
      const dbCategory = mapPresetToDashboardCategory(preset.category);
      const matchesCategory = selectedCategory === 'all' || dbCategory === selectedCategory;
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        preset.displayName.toLowerCase().includes(searchLower) ||
        preset.template_name.toLowerCase().includes(searchLower) ||
        preset.category.toLowerCase().includes(searchLower) ||
        preset.layoutStyle.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [allPresets, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans select-none">
      
      {/* Üst Header / Navigasyon */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-slate-700"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-400" />
                <h1 className="text-xl font-bold tracking-tight text-white">Şablon Kütüphanesi</h1>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">Sistemdeki 31 adet hazır şablon havuzunu yönetin, önizleyin ve varsayılan içeriklerini düzenleyin.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              Havuzda {allPresets.length} Şablon
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow flex flex-col gap-8">
        
        {/* Arama ve Filtreleme Alanı */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
          {/* Arama Kutusu */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Şablon adı, stili veya kategori ara..."
              className="w-full pl-12 pr-6 py-3 bg-slate-900/60 border border-slate-800 rounded-2xl focus:outline-none focus:border-indigo-500/80 text-sm text-slate-200 placeholder-slate-500 transition-colors"
            />
          </div>

          {/* Kategori Filtre Butonları */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {CATEGORY_META.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                    isSelected 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-650/30' 
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <Icon size={14} className={isSelected ? 'text-white' : ''} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Şablon Kart Izgarası */}
        {filteredPresets.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-3xl p-12 bg-slate-900/10">
            <Layout size={48} className="text-slate-600 mb-4" />
            <h3 className="text-lg font-bold mb-1">Şablon Bulunamadı</h3>
            <p className="text-slate-400 text-sm max-w-sm text-center">Arama kriterlerinize veya kategori seçiminize uygun bir şablon mevcut değil.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPresets.map((preset) => {
              // Kategorisine göre ikon ve renk stili seçelim
              const dashboardCategory = mapPresetToDashboardCategory(preset.category);
              const catMeta = CATEGORY_META.find(c => c.id === dashboardCategory) || CATEGORY_META[0];
              const Icon = catMeta.icon;
              const imageUrl = preset.defaultContent.images?.hero_bg || preset.defaultContent.images?.about_img || '';
              
              return (
                <div 
                  key={preset.template_name} 
                  className="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-950/10 transition-all duration-300 backdrop-blur-sm"
                >
                  
                  {/* Kart Görsel Alanı */}
                  <div className="aspect-video relative bg-slate-950 flex flex-col justify-between p-5 overflow-hidden">
                    {/* Şablon Görsel Önizlemesi */}
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={imageUrl} 
                        alt={preset.displayName} 
                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-700 pointer-events-none" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-900" />
                    )}

                    {/* Karartma Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />
                    
                    {/* Kategori Etiketi */}
                    <div className="flex justify-between items-start z-10">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${catMeta.color}`}>
                        <Icon size={10} />
                        {preset.category}
                      </div>
                      <div className="text-[10px] font-mono px-2 py-0.5 bg-slate-800/80 rounded text-slate-400">
                        {preset.layoutStyle}
                      </div>
                    </div>

                    {/* Şablon Teknik İsmi */}
                    <div className="z-10 mt-auto flex justify-between items-end">
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded">ID: {preset.template_name}</span>
                      <span className="text-[10px] font-mono text-slate-200 bg-slate-950/80 px-2 py-0.5 rounded" style={{ color: preset.defaultTheme.primary }}>
                        {preset.defaultTheme.fontFamily.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Kart İçerik Bilgisi */}
                  <div className="p-5 flex-grow flex flex-col justify-between border-t border-slate-850 bg-slate-900/10">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                        {preset.displayName}
                      </h3>
                      <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {preset.defaultContent.hero.subtitle}
                      </p>
                    </div>

                    {/* Aksiyon Butonları */}
                    <div className="grid grid-cols-2 gap-2 mt-5">
                      <Link
                        href={`/preview/preset_${preset.template_name}`}
                        target="_blank"
                        className="flex items-center justify-center gap-1.5 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all border border-slate-750 cursor-pointer"
                      >
                        <Eye size={14} />
                        Önizle
                      </Link>
                      <Link
                        href={`/preview/preset_${preset.template_name}?token=preset_token`}
                        target="_blank"
                        className="flex items-center justify-center gap-1.5 py-2 bg-indigo-650/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-950/20 cursor-pointer"
                      >
                        <Edit3 size={14} />
                        Düzenle
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-850 py-6 bg-slate-900/20 text-center shrink-0">
        <p className="text-slate-500 text-xs">© 2026 AI Web Agency System — Şablon Havuz Yönetim Arayüzü</p>
      </footer>

    </div>
  );
}
