'use client';

import React, { useState } from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  ArrowRight, 
  ChevronRight, 
  Menu as MenuIcon, 
  X,
  Compass,
  Sparkles,
  Camera,
  Star,
  PlusCircle,
  Trash2
} from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function PastisTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddNavDropdown, setShowAddNavDropdown] = useState(false);
  const [activeFooterModal, setActiveFooterModal] = useState<'hakkimizda' | 'gizlilik' | 'iletisim' | null>(null);
  const [selectedSpecialTabIdx, setSelectedSpecialTabIdx] = useState<number>(0);

  const defaultNavLinks = [
    { name: 'Hikayemiz', url: '#hikayemiz' },
    { name: 'Özel Ayna', url: '#ayna-spesiyalleri' },
    { name: 'Menü', url: '#menumuz' },
    { name: 'Galeri', url: '#galeri' },
    { name: 'İletişim', url: '#iletisim' }
  ];
  const navLinks = content.nav_links || defaultNavLinks;

  // Menü kategorileri
  const menuItems = content.menu_items || [];
  const activeMenuCategory = menuItems[activeCategoryIndex] || menuItems[0];

  const activeSpecialCategory = ((content.services as any[]) || [])[selectedSpecialTabIdx] || ((content.services as any[]) || [])[0];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0a0101] selection:bg-[#c10230] selection:text-white relative">
      {/* Yazı Tiplerini Dinamik Yükleme */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Archivo:ital,wght@0,100..900;1,100..900&family=Alex+Brush&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-archivo { font-family: 'Archivo', sans-serif; }
        .font-handwritten { font-family: 'Alex Brush', cursive; }
      ` }} />

      {/* 1. Üst Duyuru Barı (Bistro Kırmızısı) */}
      <div className="bg-[#c10230] text-white py-2.5 px-6 text-center text-[10px] md:text-xs tracking-[0.25em] font-archivo font-bold uppercase z-50 relative flex justify-center items-center gap-2">
        <Sparkles size={12} className="animate-pulse" />
        <EditableText
          content={content}
          contentKey="hero.announcement_text"
          onUpdate={onUpdateContent}
          isEditMode={isEditMode}
          fallback="KLASİK FRANSIZ BİSTROSU & MEATPACKING RUHU İSTANBUL'DA"
          className="focus:outline-none focus:ring-0"
        />
      </div>

      {/* 2. Fransız Tipi İnce Çizgili Header */}
      <header className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#0a0101]/10 z-40 transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          {/* Sol: Sosyal / Dil */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-archivo tracking-widest text-[#0a0101]/60">
            <a href="#" className="hover:text-[#c10230] transition-colors"><Globe size={14} /></a>
            <span>
              <EditableText content={content} contentKey="hero.location_tag" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="PARIS • NEW YORK" className="focus:outline-none focus:ring-0" />
            </span>
          </div>

          {/* Orta: Logo */}
          <div className="text-center flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <EditableText
                content={content}
                contentKey="contact.company_name"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="text-3xl md:text-4xl font-normal font-playfair tracking-[0.05em] text-[#0a0101] uppercase focus:outline-none focus:ring-0 px-1 rounded block"
              />
            </div>
            <span className="text-[9px] tracking-[0.3em] font-archivo uppercase text-[#c10230] font-black mt-0.5">
              <EditableText content={content} contentKey="contact.company_subtitle" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="BISTRO & BAR" className="focus:outline-none focus:ring-0" />
            </span>
          </div>

          {/* Sağ: Nav Linkleri */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-archivo font-bold uppercase tracking-widest">
            {navLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-1 group/nav relative">
                <a href={link.url} className="hover:text-[#c10230] transition-colors shrink-0">
                  <EditableText
                    content={content}
                    contentKey={`nav_links.${index}.name`}
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </a>
                {isEditMode && navLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newLinks = navLinks.filter((_, i) => i !== index);
                      onUpdateContent({
                        ...content,
                        nav_links: newLinks
                      });
                    }}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover/nav:opacity-100 transition-opacity cursor-pointer shrink-0 ml-0.5"
                    title="Sil"
                  >
                    <Trash2 size={11} />
                  </button>
                )}
              </div>
            ))}

            {isEditMode && navLinks.length < 10 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAddNavDropdown(!showAddNavDropdown)}
                  className="text-indigo-600 hover:text-indigo-800 text-[10px] font-bold tracking-widest uppercase cursor-pointer ml-4 flex items-center gap-1"
                >
                  <PlusCircle size={12} />
                  Ekle
                </button>
                {showAddNavDropdown && (
                  <div className="absolute top-6 right-0 bg-white border border-[#0a0101]/10 shadow-xl rounded-lg py-2 w-48 z-50 text-left normal-case tracking-normal">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 mb-1">
                      Bölüm Seçin
                    </div>
                    {[
                      { name: 'Hikayemiz', url: '#hikayemiz' },
                      { name: 'Özel Ayna', url: '#ayna-spesiyalleri' },
                      { name: 'Menü', url: '#menumuz' },
                      { name: 'Galeri', url: '#galeri' },
                      { name: 'İletişim', url: '#iletisim' }
                    ].map((item) => (
                      <button
                        key={item.url}
                        type="button"
                        onClick={() => {
                          const newLinks = [
                            ...navLinks,
                            { name: item.name, url: item.url }
                          ];
                          onUpdateContent({
                            ...content,
                            nav_links: newLinks
                          });
                          setShowAddNavDropdown(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobil Menü Butonu */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-[#0a0101] hover:text-[#c10230] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobil Menü */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FAFAFA] border-t border-[#0a0101]/10 px-6 py-6 space-y-4 absolute w-full left-0 shadow-lg font-archivo font-bold text-xs uppercase tracking-widest text-[#0a0101] z-50">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="hover:text-[#c10230] py-2 border-b border-[#0a0101]/5 block"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* 3. Canlı & Görsel Açıdan Zengin Hero Section */}
      <section className="relative overflow-hidden bg-[#f5efe6] py-16 md:py-28 border-b border-[#0a0101]/10">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Sol Kolon: Başlık ve Giriş */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase block">
                <EditableText content={content} contentKey="hero.badge_text" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="NEW YORK • SOHO • PARIS" className="focus:outline-none focus:ring-0" />
              </span>
              <EditableText
                content={content}
                contentKey="hero.title"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="text-4xl md:text-6xl font-normal font-playfair text-[#0a0101] leading-tight focus:outline-none focus:ring-0 px-1 rounded block"
              />
            </div>
            
            <EditableText
              content={content}
              contentKey="hero.subtitle"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="text-sm md:text-base font-archivo text-[#333] leading-relaxed focus:outline-none focus:ring-0 px-1 rounded block"
            />

            <div className="pt-4 flex gap-4">
              <a 
                href="#menumuz" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#c10230] hover:bg-[#0a0101] text-white font-archivo font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-none cursor-pointer"
              >
                <EditableText
                  content={content}
                  contentKey="hero.cta_text"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                />
                <ChevronRight size={14} />
              </a>
              <a 
                href="#iletisim" 
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-[#0a0101]/5 text-[#0a0101] font-archivo font-bold text-xs tracking-widest uppercase border border-[#0a0101] transition-all cursor-pointer"
              >
                <EditableText content={content} contentKey="hero.cta_secondary" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Rezervasyon" className="focus:outline-none focus:ring-0" />
              </a>
            </div>
          </div>

          {/* Sağ Kolon: Çiftli Görsel Kolajı (Görsel Sayısını Zenginleştiren Yapı) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-center">
            {/* Büyük Sol Resim */}
            <div className="col-span-8 border-4 border-white shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <EditableImage
                content={content}
                contentKey="images.hero_bg"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-[320px] md:h-[450px] object-cover"
                alt="Pastis Interior"
              />
            </div>
            {/* Küçük Sağ Resim */}
            <div className="col-span-4 border-4 border-white shadow-xl translate-y-8 rotate-[4deg] hover:rotate-0 transition-transform duration-500">
              <EditableImage
                content={content}
                contentKey="images.services_img"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-[220px] md:h-[280px] object-cover"
                alt="Pastis Food"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Altın Ayna Kara Tahta Spesiyalleri (Son Derece Özgün & İnteraktif) */}
      <section id="ayna-spesiyalleri" className="py-20 bg-white border-b border-[#0a0101]/10">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl space-y-12">
          <div className="space-y-3">
            <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase">
              <EditableText content={content} contentKey="specials_badge" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="GÜNLÜK SPESİYALLER" className="focus:outline-none focus:ring-0" />
            </span>
            <h2 className="text-3xl md:text-5xl font-normal font-playfair">
              <EditableText content={content} contentKey="specials_title" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Nostaljik Aynadaki Lezzetler" className="focus:outline-none focus:ring-0" />
            </h2>
            <p className="font-archivo text-[#666] text-sm max-w-xl mx-auto">
              Bistromuzun ikonik altın varaklı aynasında, şefimizin o güne özel hazırladığı Fransız klasikleri yer alır. Görmek istediğiniz kategoriyi seçin.
            </p>
          </div>

          {/* Ayna Tab Değiştirici */}
          <div className="flex flex-wrap justify-center gap-4 border-b border-[#0a0101]/10 pb-4 max-w-lg mx-auto items-center">
            {((content.services as any[]) || []).map((tab, idx) => {
              const isActive = idx === selectedSpecialTabIdx;
              return (
                <div key={idx} className="flex items-center gap-1 group/spec relative">
                  <button 
                    onClick={() => setSelectedSpecialTabIdx(idx)} 
                    className={`font-archivo text-xs font-bold uppercase tracking-widest pb-2 border-b-2 cursor-pointer transition-all ${
                      isActive ? 'border-[#c10230] text-[#c10230]' : 'border-transparent text-[#666] hover:text-[#0a0101]'
                    }`}
                  >
                    <EditableText
                      content={content}
                      contentKey={`services.${idx}.title`}
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                    />
                  </button>
                  {isEditMode && ((content.services as any[]) || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newServices = ((content.services as any[]) || []).filter((_, i) => i !== idx);
                        onUpdateContent({
                          ...content,
                          services: newServices
                        });
                        setSelectedSpecialTabIdx(0);
                      }}
                      className="text-red-500 hover:text-red-700 cursor-pointer p-0.5"
                      title="Sekmeyi Sil"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              );
            })}

            {isEditMode && ((content.services as any[]) || []).length < 5 && (
              <button
                type="button"
                onClick={() => {
                  const newServices = [
                    ...((content.services as any[]) || []),
                    {
                      title: 'Yeni Sekme',
                      items: [
                        { name: 'Yeni Spesiyal', description: 'Spesiyal açıklaması', price: '₺200' }
                      ]
                    }
                  ];
                  onUpdateContent({
                    ...content,
                    services: newServices
                  });
                  setSelectedSpecialTabIdx(newServices.length - 1);
                }}
                className="flex items-center gap-1 text-[10px] font-bold font-archivo uppercase tracking-wider text-[#666] hover:text-[#c10230] transition-colors cursor-pointer border border-dashed border-[#666]/30 px-2 py-0.5"
              >
                <PlusCircle size={10} />
                Ekle
              </button>
            )}
          </div>

          {/* Altın Çerçeveli Ayna Tasarımı */}
          <div className="relative mx-auto max-w-xl border-[16px] border-double border-[#c4a265] bg-[#ece6dc] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* Ayna Parlama Efekti */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            {/* Elle Yazılmış Yazı Karakteri Alanı */}
            <div className="font-handwritten text-3xl md:text-4xl text-[#2F1D13] space-y-8 py-4 select-none text-left">
              {activeSpecialCategory && activeSpecialCategory.items && (
                <div className="space-y-6">
                  {activeSpecialCategory.items.map((item: any, itemIdx: number) => {
                    const itemPath = `services.${selectedSpecialTabIdx}.items.${itemIdx}`;
                    return (
                      <div key={itemIdx} className="space-y-1 relative group/specitem pr-6">
                        <div className="flex justify-between items-baseline gap-2">
                          <p className="hover:scale-101 transition-transform duration-300 flex-1 leading-tight">
                            <EditableText
                              content={content}
                              contentKey={`${itemPath}.name`}
                              onUpdate={onUpdateContent}
                              isEditMode={isEditMode}
                            />
                          </p>
                          <span className="shrink-0 italic text-2xl font-bold">
                            &bull; 
                            <EditableText
                              content={content}
                              contentKey={`${itemPath}.price`}
                              onUpdate={onUpdateContent}
                              isEditMode={isEditMode}
                            />
                          </span>
                        </div>
                        <span className="text-sm font-archivo text-[#666] tracking-widest uppercase block">
                          <EditableText
                            content={content}
                            contentKey={`${itemPath}.description`}
                            onUpdate={onUpdateContent}
                            isEditMode={isEditMode}
                          />
                        </span>

                        {isEditMode && activeSpecialCategory.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updatedItems = activeSpecialCategory.items.filter((_: any, i: number) => i !== itemIdx);
                              const updatedServices = ((content.services as any[]) || []).map((spec: any, i: number) => {
                                if (i === selectedSpecialTabIdx) {
                                  return { ...spec, items: updatedItems };
                                }
                                return spec;
                              });
                              onUpdateContent({
                                ...content,
                                services: updatedServices
                              });
                            }}
                            className="absolute right-0 top-1 text-red-500 hover:text-red-700 cursor-pointer opacity-0 group-hover/specitem:opacity-100 transition-opacity"
                            title="Spesiyali Sil"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {isEditMode && (
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const updatedItems = [
                            ...activeSpecialCategory.items,
                            { name: 'Yeni Ayna Spesiyali', description: 'Açıklama giriniz', price: '₺250' }
                          ];
                          const updatedServices = ((content.services as any[]) || []).map((spec: any, i: number) => {
                            if (i === selectedSpecialTabIdx) {
                              return { ...spec, items: updatedItems };
                            }
                            return spec;
                          });
                          onUpdateContent({
                            ...content,
                            services: updatedServices
                          });
                        }}
                        className="flex items-center gap-1 text-xs font-archivo text-white bg-[#c10230] px-3 py-1.5 uppercase font-bold tracking-wider hover:bg-[#c10230]/90 transition-colors cursor-pointer"
                      >
                        <PlusCircle size={12} />
                        Aynaya Ürün Ekle
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#0a0101]/10 font-archivo text-[10px] tracking-widest text-[#666] uppercase">
              * Günlük ürünler taze av durumuna göre değişmektedir.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hikayemiz / Konsept Section */}
      <section id="hikayemiz" className="bg-[#f5efe6] py-20 md:py-28 border-b border-[#0a0101]/10">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Sol: Hikaye İçeriği */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.25em] uppercase block">
                <EditableText content={content} contentKey="about_badge" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="MEATPACKING KLASİĞİ" className="focus:outline-none focus:ring-0" />
              </span>
              <h2 className="text-3xl md:text-5xl font-normal font-playfair leading-tight">
                <EditableText content={content} contentKey="about_title" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Paris Şıklığı ile Manhattan Ruhu" className="focus:outline-none focus:ring-0" />
              </h2>
              <div className="w-12 h-1 bg-[#c10230]" />
            </div>

            <EditableText
              content={content}
              contentKey="about"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="text-sm md:text-base font-archivo text-[#333] leading-relaxed focus:outline-none focus:ring-0 px-1 rounded block"
            />

            <div className="pt-4 border-t border-[#0a0101]/10 flex gap-12 font-archivo">
              <div className="space-y-1">
                <span className="font-playfair text-3xl font-bold text-[#c10230]">
                  <EditableText content={content} contentKey="stats.0.value" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="1999" className="focus:outline-none focus:ring-0" />
                </span>
                <p className="text-[10px] uppercase text-[#666] tracking-wider font-bold">
                  <EditableText content={content} contentKey="stats.0.label" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="İlk Açılış Yılı (NYC)" className="focus:outline-none focus:ring-0" />
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-playfair text-3xl font-bold text-[#c10230]">
                  <EditableText content={content} contentKey="stats.1.value" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Zinc Bar" className="focus:outline-none focus:ring-0" />
                </span>
                <p className="text-[10px] uppercase text-[#666] tracking-wider font-bold">
                  <EditableText content={content} contentKey="stats.1.label" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Özel Çinko Bar Tasarımı" className="focus:outline-none focus:ring-0" />
                </p>
              </div>
            </div>
          </div>

          {/* Sağ: İki Resimli Kolaj */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#c10230]/5 -translate-x-4 -translate-y-4 -z-10 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            <EditableImage
              content={content}
              contentKey="images.about_img"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="w-full h-[380px] md:h-[480px] object-cover border-2 border-[#0a0101]/10 shadow-lg"
              alt="Pastis Ambience"
            />
          </div>

        </div>
      </section>

      {/* 6. Zengin Fransız Menüsü Section */}
      <section id="menumuz" className="py-20 md:py-28 bg-white border-b border-[#0a0101]/10">
        <div className="container mx-auto px-6 md:px-12 space-y-12">
          
          {/* Başlık */}
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase">
              <EditableText content={content} contentKey="menu_badge" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="BİSTRO LEZZETLERİ" className="focus:outline-none focus:ring-0" />
            </span>
            <h2 className="text-3xl md:text-5xl font-normal font-playfair text-[#0a0101]">
              <EditableText content={content} contentKey="menu_title" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Ana Menümüzü İnceleyin" className="focus:outline-none focus:ring-0" />
            </h2>
            <div className="font-archivo text-[#666] text-sm">
              <EditableText content={content} contentKey="menu_description" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Geleneksel Fransız mutfağının en seçkin klasikleri, en taze yerel malzemeler ile hazırlanıyor." className="focus:outline-none focus:ring-0" />
            </div>
          </div>

          {/* Kategori Tabları */}
          {menuItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 items-center">
              {menuItems.map((cat, idx) => {
                const isActive = idx === activeCategoryIndex;
                return (
                  <div key={idx} className="flex items-center gap-1 group/cat relative">
                    <button
                      type="button"
                      onClick={() => setActiveCategoryIndex(idx)}
                      className={`px-8 py-3.5 text-xs font-archivo font-bold uppercase tracking-[0.2em] transition-all border-b-2 cursor-pointer ${
                        isActive 
                          ? 'border-[#c10230] text-[#c10230] bg-[#c10230]/5' 
                          : 'border-transparent text-[#666] hover:text-[#0a0101]'
                      }`}
                    >
                      <EditableText
                        content={content}
                        contentKey={`menu_items.${idx}.category`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                        className="focus:outline-none focus:ring-0"
                      />
                    </button>

                    {/* Kategori Silme Butonu */}
                    {isEditMode && menuItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newMenuItems = menuItems.filter((_, i) => i !== idx);
                          onUpdateContent({
                            ...content,
                            menu_items: newMenuItems
                          });
                          setActiveCategoryIndex(0);
                        }}
                        className="text-red-500 hover:text-red-700 cursor-pointer p-1 shrink-0"
                        title="Kategoriyi Sil"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Kategori Ekleme Butonu (Maks 6) */}
              {isEditMode && menuItems.length < 6 && (
                <button
                  type="button"
                  onClick={() => {
                    const newMenuItems = [
                      ...menuItems,
                      {
                        category: 'YENİ KATEGORİ',
                        items: [
                          { name: 'Yeni Ürün', description: 'Ürün açıklaması', price: '₺100' }
                        ]
                      }
                    ];
                    onUpdateContent({
                      ...content,
                      menu_items: newMenuItems
                    });
                    setActiveCategoryIndex(newMenuItems.length - 1);
                  }}
                  className="flex items-center gap-1 px-4 py-2 border-2 border-dashed border-[#0a0101]/10 text-xs font-bold font-archivo uppercase tracking-widest text-[#666] hover:text-black transition-colors cursor-pointer"
                >
                  <PlusCircle size={12} />
                  Kategori Ekle
                </button>
              )}
            </div>
          )}

          {/* Menü Listesi */}
          {activeMenuCategory && activeMenuCategory.items && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 max-w-4xl mx-auto pt-6">
                {activeMenuCategory.items.map((item, itemIdx) => {
                  const itemPath = `menu_items.${activeCategoryIndex}.items.${itemIdx}`;
                  
                  return (
                    <div key={itemIdx} className="group pb-4 border-b border-[#0a0101]/10 flex flex-col space-y-1.5 relative pr-6 text-left">
                      {/* Ürün Silme Butonu */}
                      {isEditMode && activeMenuCategory.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedItems = activeMenuCategory.items.filter((_, i) => i !== itemIdx);
                            const updatedMenuItems = menuItems.map((cat, i) => {
                              if (i === activeCategoryIndex) {
                                return { ...cat, items: updatedItems };
                              }
                              return cat;
                            });
                            onUpdateContent({
                              ...content,
                              menu_items: updatedMenuItems
                            });
                          }}
                          className="absolute right-0 top-1 text-red-500 hover:text-red-700 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Bu Ürünü Sil"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}

                      <div className="flex justify-between items-baseline gap-4">
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.name`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-playfair text-xl font-normal group-hover:text-[#c10230] transition-colors focus:outline-none focus:ring-0 px-0.5 rounded block"
                        />
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.price`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-playfair italic text-base text-[#c10230] font-bold focus:outline-none focus:ring-0 px-0.5 rounded shrink-0 ml-4"
                        />
                      </div>
                      {item.description !== undefined && (
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.description`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-archivo text-xs text-[#666] leading-relaxed block focus:outline-none focus:ring-0 px-0.5 rounded"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Ürün Ekleme Butonu */}
              {isEditMode && (
                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      const updatedItems = [
                        ...activeMenuCategory.items,
                        { name: 'Yeni Ürün/Yemek', description: 'Ürün açıklaması buraya yazılır.', price: '₺250' }
                      ];
                      const updatedMenuItems = menuItems.map((cat, i) => {
                        if (i === activeCategoryIndex) {
                          return { ...cat, items: updatedItems };
                        }
                        return cat;
                      });
                      onUpdateContent({
                        ...content,
                        menu_items: updatedMenuItems
                      });
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-[#c10230] hover:bg-[#c10230]/90 text-white font-archivo font-bold text-xs tracking-widest uppercase transition-all cursor-pointer"
                  >
                    <PlusCircle size={14} />
                    Bu Kategoriye Ürün Ekle
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 7. Görsel Sayısı Yüksek 6'lı Masonry Galeri (Zengin Görsellik Talebini Karşılayan Alan) */}
      <section id="galeri" className="py-20 bg-[#f5efe6] border-b border-[#0a0101]/10">
        <div className="container mx-auto px-6 md:px-12 space-y-12">
          {/* Başlık */}
          <div className="text-center space-y-2">
            <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase">GÖRSEL BAKIŞ</span>
            <h2 className="text-3xl md:text-5xl font-normal font-playfair text-[#0a0101]">
              <EditableText
                content={content}
                contentKey="images.gallery_title"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                fallback="Bistrodan Kareler"
                className="focus:outline-none focus:ring-0"
              />
            </h2>
            <div className="w-10 h-0.5 bg-[#c10230] mx-auto my-3" />
          </div>

          {/* Galeri Izgarası */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Foto 1 */}
            <div className="overflow-hidden border-4 border-white shadow-md relative group aspect-[4/3] bg-slate-200">
              <EditableImage
                content={content}
                contentKey="images.gallery.0"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Pastis Zinc Bar"
              />
              <div className={`absolute inset-0 bg-[#0a0101]/60 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase pointer-events-none ${
                isEditMode ? 'opacity-100 bg-[#0a0101]/75' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <Camera size={18} className="mr-2 shrink-0" />
                <div className="pointer-events-auto">
                  <EditableText
                    content={content}
                    contentKey="images.gallery_captions.0"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    fallback="Çinko Bar"
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Foto 2 */}
            <div className="overflow-hidden border-4 border-white shadow-md relative group aspect-[4/3] bg-slate-200">
              <EditableImage
                content={content}
                contentKey="images.gallery.1"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="French Fries"
              />
              <div className={`absolute inset-0 bg-[#0a0101]/60 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase pointer-events-none ${
                isEditMode ? 'opacity-100 bg-[#0a0101]/75' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <Camera size={18} className="mr-2 shrink-0" />
                <div className="pointer-events-auto">
                  <EditableText
                    content={content}
                    contentKey="images.gallery_captions.1"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    fallback="Patates Kızartması"
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Foto 3 */}
            <div className="overflow-hidden border-4 border-white shadow-md relative group aspect-[4/3] bg-slate-200">
              <EditableImage
                content={content}
                contentKey="images.gallery.2"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Seafood specials"
              />
              <div className={`absolute inset-0 bg-[#0a0101]/60 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase pointer-events-none ${
                isEditMode ? 'opacity-100 bg-[#0a0101]/75' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <Camera size={18} className="mr-2 shrink-0" />
                <div className="pointer-events-auto">
                  <EditableText
                    content={content}
                    contentKey="images.gallery_captions.2"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    fallback="Deniz Mahsülleri"
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Foto 4 */}
            <div className="overflow-hidden border-4 border-white shadow-md relative group aspect-[4/3] bg-slate-200">
              <EditableImage
                content={content}
                contentKey="images.gallery.3"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Table Setup"
              />
              <div className={`absolute inset-0 bg-[#0a0101]/60 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase pointer-events-none ${
                isEditMode ? 'opacity-100 bg-[#0a0101]/75' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <Camera size={18} className="mr-2 shrink-0" />
                <div className="pointer-events-auto">
                  <EditableText
                    content={content}
                    contentKey="images.gallery_captions.3"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    fallback="Masa Düzeni"
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Foto 5 */}
            <div className="overflow-hidden border-4 border-white shadow-md relative group aspect-[4/3] bg-slate-200">
              <EditableImage
                content={content}
                contentKey="images.gallery.4"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Lounge red banquettes"
              />
              <div className={`absolute inset-0 bg-[#0a0101]/60 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase pointer-events-none ${
                isEditMode ? 'opacity-100 bg-[#0a0101]/75' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <Camera size={18} className="mr-2 shrink-0" />
                <div className="pointer-events-auto">
                  <EditableText
                    content={content}
                    contentKey="images.gallery_captions.4"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    fallback="Kırmızı Koltuklar"
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Foto 6 */}
            <div className="overflow-hidden border-4 border-white shadow-md relative group aspect-[4/3] bg-slate-200">
              <EditableImage
                content={content}
                contentKey="images.gallery.5"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Espresso"
              />
              <div className={`absolute inset-0 bg-[#0a0101]/60 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase pointer-events-none ${
                isEditMode ? 'opacity-100 bg-[#0a0101]/75' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <Camera size={18} className="mr-2 shrink-0" />
                <div className="pointer-events-auto">
                  <EditableText
                    content={content}
                    contentKey="images.gallery_captions.5"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    fallback="Artisan Kahve"
                    className="focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. İletişim & Rezervasyon Bilgileri */}
      <section id="iletisim" className="py-20 md:py-28 bg-white text-left">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Sol Kolon: Bilgiler */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase block">
                <EditableText
                  content={content}
                  contentKey="contact.section_badge"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                  fallback="REZERVASYON & İLETİŞİM"
                  className="focus:outline-none focus:ring-0"
                />
              </span>
              <h2 className="text-3xl md:text-5xl font-normal font-playfair text-[#0a0101]">
                <EditableText
                  content={content}
                  contentKey="contact.section_title"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                  fallback="Akşam Yemeğinde Buluşalım"
                  className="focus:outline-none focus:ring-0"
                />
              </h2>
              <div className="font-archivo text-sm text-[#666] leading-relaxed">
                <EditableText
                  content={content}
                  contentKey="contact.section_description"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                  fallback="Pastis NYC bistrosunun büyülü akşam atmosferinde yerinizi şimdiden ayırtın. Akşam yemeği servislerimiz için rezervasyon yapılması önemle rica olunur. Gün içi öğle ve brunch servislerinde ise kapıda karşılama ile misafir ağırlamaktayız."
                  multiline
                  className="focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#0a0101]/10">
              {/* Adres */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 border border-[#0a0101]/10 flex items-center justify-center text-[#c10230]">
                  <MapPin size={16} />
                </div>
                <div className="space-y-1">
                  <span className="font-archivo text-[10px] text-[#999] uppercase font-bold tracking-wider">
                    <EditableText
                      content={content}
                      contentKey="contact.address_label"
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      fallback="Bistronun Konumu"
                      className="focus:outline-none focus:ring-0"
                    />
                  </span>
                  <EditableText
                    content={content}
                    contentKey="contact.address"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-archivo text-sm text-[#0a0101] leading-relaxed block focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 border border-[#0a0101]/10 flex items-center justify-center text-[#c10230]">
                  <Phone size={16} />
                </div>
                <div className="space-y-1">
                  <span className="font-archivo text-[10px] text-[#999] uppercase font-bold tracking-wider">
                    <EditableText
                      content={content}
                      contentKey="contact.phone_label"
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      fallback="Rezervasyon Telefonu"
                      className="focus:outline-none focus:ring-0"
                    />
                  </span>
                  <EditableText
                    content={content}
                    contentKey="contact.phone"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-archivo text-sm text-[#0a0101] block focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>

              {/* E-posta */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 border border-[#0a0101]/10 flex items-center justify-center text-[#c10230]">
                  <Mail size={16} />
                </div>
                <div className="space-y-1">
                  <span className="font-archivo text-[10px] text-[#999] uppercase font-bold tracking-wider">
                    <EditableText
                      content={content}
                      contentKey="contact.email_label"
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      fallback="E-posta"
                      className="focus:outline-none focus:ring-0"
                    />
                  </span>
                  <EditableText
                    content={content}
                    contentKey="contact.email"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-archivo text-sm text-[#0a0101] block focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Çalışma Saatleri */}
          <div className="border border-[#0a0101]/10 bg-[#f5efe6] p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#0a0101]/10">
              <Clock className="text-[#c10230]" size={20} />
              <h3 className="font-playfair text-2xl font-normal">
                <EditableText
                  content={content}
                  contentKey="contact.hours_title"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                  fallback="Açılış Saatlerimiz"
                  className="focus:outline-none focus:ring-0"
                />
              </h3>
            </div>
            
            <EditableText
              content={content}
              contentKey="contact.hours"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="font-archivo text-sm text-[#333] leading-relaxed block focus:outline-none focus:ring-0 px-1 rounded whitespace-pre-line"
            />

            <div className="p-6 bg-white border border-[#0a0101]/10 text-xs font-archivo text-[#666] leading-relaxed">
              <strong className="text-[#0a0101] font-bold block mb-1">
                <EditableText
                  content={content}
                  contentKey="contact.group_bookings_title"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                  fallback="Grup Davetleri & Özel Rezervasyon"
                  className="focus:outline-none focus:ring-0"
                />
              </strong>
              <EditableText
                content={content}
                contentKey="contact.group_bookings_description"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                fallback="12 kişi ve üzerindeki gruplarınız ve özel bistro kapatma etkinlikleriniz için lütfen en az 48 saat öncesinden event@pastisnyc.com üzerinden bizimle iletişime geçiniz."
                multiline
                className="focus:outline-none focus:ring-0 block mt-1"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 9. Klasik Paris-New York Stili Siyah Footer */}
      <footer className="bg-[#0a0101] text-white py-16 border-t border-white/10 font-archivo">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
          
          {/* Logo ve Slogan */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-baseline gap-1">
              <span className="font-playfair font-normal text-2xl tracking-wide uppercase">{content.contact.company_name}</span>
              <span className="text-[#c10230] font-black text-lg">&bull;</span>
            </div>
            <div className="text-slate-400 leading-relaxed max-w-sm">
              <EditableText content={content} contentKey="footer_slogan" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Klasik Fransız bistrosu deneyimini Meatpacking District nostaljisiyle harmanlayan, Paris ve New York esintili zamansız lezzet durağınız." className="focus:outline-none focus:ring-0" />
            </div>
          </div>

          {/* Menü Linkleri */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#c10230] uppercase tracking-widest">Navigasyon</h4>
            <div className="flex flex-col gap-2 text-slate-400 text-left">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveFooterModal('hakkimizda'); }}
                className="hover:text-white transition-colors"
              >
                Hakkımızda
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveFooterModal('gizlilik'); }}
                className="hover:text-white transition-colors"
              >
                Gizlilik Politikası
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveFooterModal('iletisim'); }}
                className="hover:text-white transition-colors"
              >
                Rezervasyon & İletişim
              </a>
            </div>
          </div>

          {/* Sosyal Medya ve Telif */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#c10230] uppercase tracking-widest">Takip Edin</h4>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-[#c10230] hover:border-[#c10230] hover:text-white transition-all"><Globe size={12} /></a>
              <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-[#c10230] hover:border-[#c10230] hover:text-white transition-all"><Globe size={12} /></a>
            </div>
            <p className="text-[10px] text-slate-500 pt-2">
              &copy; 2026 {content.contact.company_name} &bull; Tüm Hakları Saklıdır.
            </p>
          </div>

        </div>
      </footer>

      {/* Footer Modalı (Tüm sitelerde aynı genel metinler) */}
      {activeFooterModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAFAFA] text-slate-800 rounded-none border border-[#0a0101]/20 max-w-lg w-full p-6 md:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative font-archivo">
            <button
              type="button"
              onClick={() => setActiveFooterModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {activeFooterModal === 'hakkimizda' && (
              <div className="space-y-4 text-left">
                <h3 className="font-playfair text-2xl font-bold border-b pb-2 text-[#0a0101] uppercase tracking-wide">{content.contact.company_name} &bull; Hakkımızda</h3>
                <div className="space-y-3 text-sm text-[#333] leading-relaxed">
                  <p>
                    Bistromuz, klasik Fransız mutfağının asırlık lezzet geleneklerini, Manhattan Meatpacking District’in ikonik retro ruhu ile birleştiren benzersiz bir gastronomik deneyim alanıdır. Şefimizin günlük taze malzemeler ve geleneksel pişirme yöntemleriyle hazırladığı spesiyallerimizle, Paris sokaklarındaki o sıcak bistro samimiyetini sofralarınıza taşıyoruz.
                  </p>
                  <p>
                    Özenle seçilmiş şarap kavımız, taş fırından taze çıkan baget ekmeklerimiz ve döküm tavalarda cızırdayan antrikot lezzetlerimizle, her masada yeni bir hikayeye hayat veriyoruz.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'gizlilik' && (
              <div className="space-y-4 text-left">
                <h3 className="font-playfair text-2xl font-bold border-b pb-2 text-[#0a0101] uppercase tracking-wide">Gizlilik Politikası</h3>
                <div className="text-xs text-[#666] leading-relaxed space-y-3 overflow-y-auto max-h-[60vh] pr-2">
                  <p className="font-semibold text-[#0a0101]">1. Veri Sorumlusu ve Amacı</p>
                  <p>
                    Bu web sitesi üzerinden bizimle paylaştığınız kişisel verileriniz (isim, e-posta, telefon gibi iletişim bilgileri), yalnızca rezervasyon taleplerinizi almak, hizmetlerimizle ilgili bilgilendirme yapmak ve iletişim formları üzerinden taleplerinize yanıt vermek amacıyla işlenir.
                  </p>
                  <p className="font-semibold text-[#0a0101]">2. Verilerin Saklanması ve Paylaşımı</p>
                  <p>
                    Kişisel verileriniz, yasal süreler ve işleme amaçlarının gerektirdiği süre boyunca güvenli yerel sunucularda saklanır. Verileriniz, yasal zorunluluklar hariç olmak üzere, üçüncü şahıslarla asla paylaşılmaz, satılmaz veya ticari amaçla kullanılmaz.
                  </p>
                  <p className="font-semibold text-[#0a0101]">3. Çerezler (Cookies)</p>
                  <p>
                    Web sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezleri kullanabilir. Tarayıcı ayarlarınızdan çerezleri dilediğiniz gibi engelleyebilir veya silebilirsiniz.
                  </p>
                  <p className="font-semibold text-[#0a0101]">4. Haklarınız</p>
                  <p>
                    Kişisel verilerinizin silinmesini, güncellenmesini veya işlenip işlenmediğini öğrenmeyi dilediğiniz zaman talep edebilirsiniz. Bilgi talepleri için lütfen iletişim kanallarımız üzerinden bizimle irtibata geçin.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'iletisim' && (
              <div className="space-y-4 text-left">
                <h3 className="font-playfair text-2xl font-bold border-b pb-2 text-[#0a0101] uppercase tracking-wide">İletişim Bilgileri</h3>
                <div className="space-y-3 text-sm text-[#333]">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#c10230] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0a0101]">Adresimiz</p>
                      <p>{content.contact.address || 'Bistromuz Adresi'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={16} className="text-[#c10230] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0a0101]">Telefon</p>
                      <p>{content.contact.phone || '0212 000 00 00'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={16} className="text-[#c10230] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0a0101]">E-posta</p>
                      <p>{content.contact.email || 'info@bistromuz.com'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-[#c10230] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0a0101]">Çalışma Saatleri</p>
                      <p>{content.contact.hours || 'Her Gün Açık'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6 border-t pt-4">
              <button
                type="button"
                onClick={() => setActiveFooterModal(null)}
                className="px-5 py-2 bg-[#c10230] text-white hover:bg-[#c10230]/90 text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
