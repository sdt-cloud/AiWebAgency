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
  Utensils, 
  ChevronRight, 
  Menu as MenuIcon, 
  X,
  Compass,
  Award,
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

export default function HouseCafeTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddNavDropdown, setShowAddNavDropdown] = useState(false);
  const [activeFooterModal, setActiveFooterModal] = useState<'hakkimizda' | 'gizlilik' | 'iletisim' | null>(null);

  const defaultNavLinks = [
    { name: 'Konsept', url: '#konsept' },
    { name: 'Menümüz', url: '#menumuz' },
    { name: 'Şubelerimiz', url: '#subelerimiz' },
    { name: 'İletişim', url: '#iletisim' }
  ];
  const navLinks = content.nav_links || defaultNavLinks;

  // Menü kategorileri
  const menuItems = content.menu_items || [];
  const activeMenuCategory = menuItems[activeCategoryIndex] || menuItems[0];

  const halfLength = Math.ceil(navLinks.length / 2);
  const leftNavLinks = navLinks.slice(0, halfLength);
  const rightNavLinks = navLinks.slice(halfLength);

  return (
    <div className="min-h-screen bg-[#F6F3EF] text-[#2F1D13] selection:bg-[#e93c37] selection:text-white relative">
      {/* Yazı Tiplerini Dinamik Yükleme */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-dmsans { font-family: 'DM Sans', sans-serif; }
      ` }} />

      {/* 1. Üst Duyuru Barı */}
      <div className="bg-[#e93c37] text-white py-2 px-6 text-center text-[10px] md:text-xs tracking-[0.2em] font-dmsans font-bold uppercase z-50 relative flex justify-center items-center gap-2">
        <Award size={14} className="animate-spin-slow" />
        <span>YAZ SEZONU MENÜMÜZ YAYINLANDI — TAZELİK VE DOĞALLIK BİR ARADA</span>
      </div>

      {/* 2. Çağdaş Geometrik Header */}
      <header className="sticky top-0 bg-[#F6F3EF]/95 backdrop-blur-md border-b border-[#DDDAD7] z-40">
        <div className="container mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          
          {/* Sol: Menü Linkleri (Masaüstü) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-dmsans font-black uppercase tracking-[0.2em]">
            {leftNavLinks.map((link, index) => {
              const globalIndex = index;
              return (
                <div key={globalIndex} className="flex items-center gap-1 group/nav relative">
                  <a href={link.url} className="hover:text-[#e93c37] transition-colors shrink-0">
                    <EditableText
                      content={content}
                      contentKey={`nav_links.${globalIndex}.name`}
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      className="focus:outline-none focus:ring-0 px-0.5 rounded"
                    />
                  </a>
                  {isEditMode && navLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newLinks = navLinks.filter((_, i) => i !== globalIndex);
                        onUpdateContent({
                          ...content,
                          nav_links: newLinks
                        });
                      }}
                      className="text-red-500 hover:text-red-700 opacity-0 group-hover/nav:opacity-100 transition-opacity cursor-pointer shrink-0"
                      title="Sil"
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Orta: Logo */}
          <div className="flex flex-col items-center select-none text-center">
            <div className="flex items-center gap-1.5 justify-center">
              <EditableText
                content={content}
                contentKey="contact.company_name"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="text-2xl md:text-3xl font-black tracking-[0.15em] font-cormorant text-[#2F1D13] uppercase focus:outline-none focus:ring-0 px-1 rounded block"
              />
              <span className="w-1.5 h-1.5 bg-[#e93c37] shrink-0 mt-2 block" />
            </div>
            <span className="text-[8px] tracking-[0.4em] font-dmsans uppercase text-[#8D8C8C] mt-0.5">LEZZETE AÇILAN KAPI</span>
          </div>

          {/* Sağ: İletişim / Şubeler Linkleri (Masaüstü) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-dmsans font-black uppercase tracking-[0.2em]">
            {rightNavLinks.map((link, index) => {
              const globalIndex = halfLength + index;
              return (
                <div key={globalIndex} className="flex items-center gap-1 group/nav relative">
                  <a href={link.url} className="hover:text-[#e93c37] transition-colors shrink-0">
                    <EditableText
                      content={content}
                      contentKey={`nav_links.${globalIndex}.name`}
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      className="focus:outline-none focus:ring-0 px-0.5 rounded"
                    />
                  </a>
                  {isEditMode && navLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newLinks = navLinks.filter((_, i) => i !== globalIndex);
                        onUpdateContent({
                          ...content,
                          nav_links: newLinks
                        });
                      }}
                      className="text-red-500 hover:text-red-700 opacity-0 group-hover/nav:opacity-100 transition-opacity cursor-pointer shrink-0"
                      title="Sil"
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </div>
              );
            })}

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
                  <div className="absolute top-6 right-0 bg-white border border-[#DDDAD7] shadow-xl rounded-lg py-2 w-48 z-50 text-left normal-case tracking-normal">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 mb-1">
                      Bölüm Seçin
                    </div>
                    {[
                      { name: 'Konsept', url: '#konsept' },
                      { name: 'Menümüz', url: '#menumuz' },
                      { name: 'Şubelerimiz', url: '#subelerimiz' },
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
            className="md:hidden p-2 text-[#2F1D13] hover:text-[#e93c37] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobil Menü */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#F6F3EF] border-t border-[#DDDAD7] px-6 py-6 space-y-4 absolute w-full left-0 shadow-lg z-50">
            <nav className="flex flex-col gap-4 font-dmsans font-bold text-xs uppercase tracking-widest text-[#2F1D13]">
              {navLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#e93c37] py-2 border-b border-[#DDDAD7] block"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* 3. Premium Minimalist Hero Section */}
      <section className="container mx-auto px-6 md:px-12 py-16 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Sol 7 Kolon: Başlık ve Büyük Fotoğraf */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="w-10 h-0.5 bg-[#e93c37]" />
            <EditableText
              content={content}
              contentKey="hero.title"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="text-4xl md:text-7xl font-normal font-cormorant text-[#2F1D13] leading-[1.1] focus:outline-none focus:ring-0 px-1 rounded block"
            />
          </div>
          
          <EditableText
            content={content}
            contentKey="hero.subtitle"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="text-base md:text-lg font-dmsans text-[#8D8C8C] leading-relaxed max-w-xl focus:outline-none focus:ring-0 px-1 rounded block"
          />

          <div className="pt-2">
            <a 
              href="#menumuz" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#e93c37] hover:bg-[#2F1D13] text-white font-dmsans font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-none cursor-pointer"
            >
              <EditableText
                content={content}
                contentKey="hero.cta_text"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Sağ 5 Kolon: Kahraman Görseli */}
        <div className="lg:col-span-5 relative">
          <div className="border border-[#DDDAD7] p-3 bg-white shadow-sm">
            <EditableImage
              content={content}
              contentKey="images.hero_bg"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-none"
              alt="The House Cafe Hero"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#2F1D13] text-white p-6 hidden md:block">
            <p className="font-cormorant italic text-lg text-[#F6F3EF]">"Ev sıcaklığında çağdaş lezzetler."</p>
          </div>
        </div>
      </section>

      {/* 4. Autoban Stili 4'lü Promo Grid */}
      <section className="bg-white border-y border-[#DDDAD7] py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {content.services?.map((service, serviceIdx) => {
              // Yönlendirme linkleri
              const urls = ['#menumuz', '#subelerimiz', '#konsept', '#iletisim'];
              const targetUrl = urls[serviceIdx % urls.length] || '#';

              return (
                <a 
                  key={serviceIdx} 
                  href={targetUrl} 
                  className="relative group overflow-hidden block aspect-square border border-[#DDDAD7] p-2 bg-[#F6F3EF]"
                >
                  <div className="w-full h-full relative overflow-hidden">
                    <EditableImage 
                      content={content}
                      contentKey={`images.gallery.${serviceIdx}`}
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={service.title}
                    />
                    <div className="absolute inset-0 bg-[#2F1D13]/60 group-hover:bg-[#e93c37]/90 transition-colors duration-500 flex flex-col justify-end p-6 text-white space-y-2 text-left">
                      <h3 className="font-cormorant text-2xl font-bold">
                        <EditableText
                          content={content}
                          contentKey={`services.${serviceIdx}.title`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                        />
                      </h3>
                      <div className="font-dmsans text-[10px] tracking-widest uppercase text-white/80">
                        <EditableText
                          content={content}
                          contentKey={`services.${serviceIdx}.description`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                        />
                      </div>
                    </div>
                    {isEditMode && content.services && content.services.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const newServices = content.services?.filter((_, i) => i !== serviceIdx) || [];
                          onUpdateContent({
                            ...content,
                            services: newServices
                          });
                        }}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md z-30 transition-all cursor-pointer"
                        title="Bu Promoyu Sil"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </a>
              );
            })}

            {/* Yeni Promo Ekleme Kartı (Maks 5) */}
            {isEditMode && (!content.services || content.services.length < 5) && (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#DDDAD7] aspect-square p-6 hover:border-[#e93c37] transition-colors bg-[#F6F3EF]">
                <button
                  type="button"
                  onClick={() => {
                    const newServices = [
                      ...(content.services || []),
                      { title: 'Yeni Hizmet', description: 'Açıklama Yazın', icon: 'coffee' }
                    ];
                    onUpdateContent({
                      ...content,
                      services: newServices
                    });
                  }}
                  className="flex flex-col items-center gap-2 text-xs font-bold font-dmsans uppercase tracking-widest text-[#2F1D13] hover:text-[#e93c37] transition-colors cursor-pointer"
                >
                  <PlusCircle size={28} className="text-[#e93c37] animate-pulse" />
                  <span>Promo Kartı Ekle</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Konsept / Hikayemiz Section */}
      <section id="konsept" className="container mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Sol: Metinler */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[#e93c37] text-xs font-dmsans font-bold tracking-[0.25em] uppercase block">EVİMİZDE HİSSEDİN</span>
              <h2 className="text-3xl md:text-5xl font-normal font-cormorant leading-tight">Mevsimlik Tazelik ve Zamansız Sıcaklık</h2>
              <div className="w-16 h-0.5 bg-[#2F1D13]" />
            </div>
            
            <EditableText
              content={content}
              contentKey="about"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="text-base font-dmsans text-[#8D8C8C] leading-relaxed focus:outline-none focus:ring-0 px-1 rounded block"
            />

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l border-[#DDDAD7] pl-4 space-y-1">
                <span className="font-cormorant text-2xl font-bold text-[#e93c37]">16+ Şube</span>
                <p className="font-dmsans text-[10px] uppercase text-[#8D8C8C] tracking-wide">Yurt İçi & Yurt Dışı</p>
              </div>
              <div className="border-l border-[#DDDAD7] pl-4 space-y-1">
                <span className="font-cormorant text-2xl font-bold text-[#e93c37]">Autoban</span>
                <p className="font-dmsans text-[10px] uppercase text-[#8D8C8C] tracking-wide">İç Mimari & Mobilya</p>
              </div>
            </div>
          </div>

          {/* Sağ: İkili Görsel Kolajı */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 border border-[#DDDAD7] p-2 bg-white">
              <EditableImage
                content={content}
                contentKey="images.about_img"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-[280px] object-cover rounded-none"
                alt="Autoban Interior"
              />
            </div>
            <div className="col-span-4 border border-[#DDDAD7] p-2 bg-white self-end">
              <EditableImage 
                content={content}
                contentKey="images.gallery.4"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-[180px] object-cover" 
                alt="Teşvikiye Street"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. Interaktif Menü Section */}
      <section id="menumuz" className="bg-[#fcfbf9] border-t border-[#DDDAD7] py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 space-y-12">
          
          {/* Başlık */}
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-[#e93c37] text-xs font-dmsans font-bold tracking-[0.2em] uppercase">TAZELİK VE TAT</span>
            <h2 className="text-3xl md:text-5xl font-normal font-cormorant text-[#2F1D13]">Özel Menü Seçeneklerimiz</h2>
            <p className="font-dmsans text-[#8D8C8C] text-sm">
              Dünya lezzetlerini geleneksel Türk aile tarifleriyle buluşturarak her damak zevkine uygun zengin bir gastronomi deneyimi tasarladık.
            </p>
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
                      className={`px-8 py-3 rounded-none text-xs font-dmsans font-bold uppercase tracking-[0.15em] transition-all border cursor-pointer ${
                        isActive 
                          ? 'bg-[#e93c37] border-[#e93c37] text-white' 
                          : 'bg-white border-[#DDDAD7] text-[#2F1D13] hover:border-[#e93c37] hover:text-[#e93c37]'
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
                  className="flex items-center gap-1 px-4 py-2 border-2 border-dashed border-[#DDDAD7] hover:border-[#e93c37] text-xs font-bold font-dmsans uppercase tracking-widest text-[#2F1D13] hover:text-[#e93c37] transition-colors cursor-pointer"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto pt-6">
                {activeMenuCategory.items.map((item, itemIdx) => {
                  const itemPath = `menu_items.${activeCategoryIndex}.items.${itemIdx}`;
                  
                  return (
                    <div key={itemIdx} className="group border-b border-[#DDDAD7] pb-4 flex justify-between items-start gap-4 relative">
                      <div className="space-y-1 pr-6 flex-1 text-left">
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.name`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-cormorant text-xl font-bold group-hover:text-[#e93c37] transition-colors focus:outline-none focus:ring-0 px-0.5 rounded block"
                        />
                        {item.description !== undefined && (
                          <EditableText
                            content={content}
                            contentKey={`${itemPath}.description`}
                            onUpdate={onUpdateContent}
                            isEditMode={isEditMode}
                            className="font-dmsans text-xs text-[#8D8C8C] leading-relaxed block focus:outline-none focus:ring-0 px-0.5 rounded"
                          />
                        )}
                      </div>
                      <EditableText
                        content={content}
                        contentKey={`${itemPath}.price`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                        className="font-cormorant italic text-base text-[#e93c37] font-semibold focus:outline-none focus:ring-0 px-0.5 rounded shrink-0"
                      />

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
                        { name: 'Yeni Ürün/İçecek', description: 'Ürün açıklaması buraya yazılır.', price: '₺150' }
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
                    className="flex items-center gap-2 px-6 py-3 bg-[#e93c37] hover:bg-[#e93c37]/90 text-white font-dmsans font-bold text-xs tracking-widest uppercase transition-all cursor-pointer"
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

      {/* 7. Şubelerimiz Section */}
      <section id="subelerimiz" className="container mx-auto px-6 md:px-12 py-20 md:py-28 border-t border-[#DDDAD7]">
        <div className="space-y-12">
          {/* Başlık */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[#e93c37] text-xs font-dmsans font-bold tracking-[0.2em] uppercase">NEREDEYİZ?</span>
              <h2 className="text-3xl md:text-5xl font-normal font-cormorant">Öne Çıkan Şubelerimiz</h2>
            </div>
            <p className="font-dmsans text-sm text-[#8D8C8C] max-w-md">
              İstanbul Havalimanı'ndan Alaçatı sokaklarına, Bakü kıyılarından Teşvikiye'deki ilk evimize kadar 16'yı aşkın noktada sizi bekliyoruz.
            </p>
          </div>

          {/* Şube Kartları Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.branches || [
              { name: 'Teşvikiye (Atiye Sokak)', address: 'Atiye Sk. No:8 Teşvikiye, Şişli / İstanbul', phone: '0212 258 84 41', badge: 'MERKEZ' },
              { name: 'Ortaköy (Boğaz Manzarası)', address: 'Salhane Sk. No: 1 Ortaköy, Beşiktaş / İstanbul', phone: '0212 227 26 81', badge: '' },
              { name: 'Alaçatı (Yazlık Esinti)', address: 'Kemalpaşa Cd. No:114 Alaçatı, Çeşme / İzmir', phone: '0232 716 95 35', badge: '' }
            ]).map((branch, branchIdx) => (
              <div key={branchIdx} className="border border-[#DDDAD7] bg-white p-3 space-y-4 relative group/branch">
                <EditableImage 
                  content={content}
                  contentKey={`images.gallery.${5 + branchIdx}`}
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                  className="w-full h-48 object-cover" 
                  alt={branch.name}
                />
                <div className="space-y-1.5 px-2 pb-2 text-left">
                  <h3 className="font-cormorant text-xl font-bold flex justify-between gap-2">
                    <EditableText
                      content={content}
                      contentKey={`branches.${branchIdx}.name`}
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      className="focus:outline-none focus:ring-0 px-0.5 rounded block"
                    />
                    {branch.badge && (
                      <span className="text-[9px] px-2 py-0.5 bg-[#e93c37]/10 text-[#e93c37] font-dmsans font-bold uppercase tracking-wider self-center rounded-none shrink-0">
                        <EditableText
                          content={content}
                          contentKey={`branches.${branchIdx}.badge`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                        />
                      </span>
                    )}
                  </h3>
                  <div className="font-dmsans text-xs text-[#8D8C8C] leading-relaxed">
                    <EditableText
                      content={content}
                      contentKey={`branches.${branchIdx}.address`}
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      multiline
                    />
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-xs text-[#2F1D13] font-bold">
                    <Phone size={12} className="text-[#e93c37] shrink-0" />
                    <EditableText
                      content={content}
                      contentKey={`branches.${branchIdx}.phone`}
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      className="focus:outline-none focus:ring-0 px-0.5 rounded"
                    />
                  </div>
                </div>
                {isEditMode && (content.branches?.length || 3) > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const defaultBranches = [
                        { name: 'Teşvikiye (Atiye Sokak)', address: 'Atiye Sk. No:8 Teşvikiye, Şişli / İstanbul', phone: '0212 258 84 41', badge: 'MERKEZ' },
                        { name: 'Ortaköy (Boğaz Manzarası)', address: 'Salhane Sk. No: 1 Ortaköy, Beşiktaş / İstanbul', phone: '0212 227 26 81', badge: '' },
                        { name: 'Alaçatı (Yazlık Esinti)', address: 'Kemalpaşa Cd. No:114 Alaçatı, Çeşme / İzmir', phone: '0232 716 95 35', badge: '' }
                      ];
                      const currentBranches = content.branches || defaultBranches;
                      const newBranches = currentBranches.filter((_, i) => i !== branchIdx);
                      onUpdateContent({
                        ...content,
                        branches: newBranches
                      });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md z-30 transition-all cursor-pointer opacity-0 group-hover/branch:opacity-100"
                    title="Şubeyi Sil"
                  >
                    <Trash2 size={10} />
                  </button>
                )}
              </div>
            ))}

            {isEditMode && (content.branches?.length || 3) < 4 && (
              <div className="border-2 border-dashed border-[#DDDAD7] bg-white p-6 flex flex-col items-center justify-center min-h-[250px] hover:border-[#e93c37] transition-colors">
                <button
                  type="button"
                  onClick={() => {
                    const defaultBranches = [
                      { name: 'Teşvikiye (Atiye Sokak)', address: 'Atiye Sk. No:8 Teşvikiye, Şişli / İstanbul', phone: '0212 258 84 41', badge: 'MERKEZ' },
                      { name: 'Ortaköy (Boğaz Manzarası)', address: 'Salhane Sk. No: 1 Ortaköy, Beşiktaş / İstanbul', phone: '0212 227 26 81', badge: '' },
                      { name: 'Alaçatı (Yazlık Esinti)', address: 'Kemalpaşa Cd. No:114 Alaçatı, Çeşme / İzmir', phone: '0232 716 95 35', badge: '' }
                    ];
                    const currentBranches = content.branches || defaultBranches;
                    const newBranches = [
                      ...currentBranches,
                      { name: 'Yeni Şube', address: 'Şube adresi yazın', phone: '0212 000 00 00', badge: 'YENİ' }
                    ];
                    onUpdateContent({
                      ...content,
                      branches: newBranches
                    });
                  }}
                  className="flex flex-col items-center gap-2 text-xs font-bold font-dmsans uppercase tracking-widest text-[#2F1D13] hover:text-[#e93c37] transition-colors cursor-pointer"
                >
                  <PlusCircle size={28} className="text-[#e93c37] animate-pulse" />
                  <span>Yeni Şube Ekle</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. İletişim Bilgileri Section */}
      <section id="iletisim" className="border-t border-[#DDDAD7] py-20 md:py-28 bg-[#faf6f0]">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Sol: İletişim Form Metni */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#e93c37] text-xs font-dmsans font-bold tracking-[0.2em] uppercase block">MERKEZ OFİS</span>
              <h2 className="text-3xl md:text-5xl font-normal font-cormorant">Bizimle İletişime Geçin</h2>
              <p className="font-dmsans text-sm text-[#8D8C8C] leading-relaxed">
                Her türlü öneri, catering talebi, iş başvurusu ve franchise talepleriniz için bize telefon numaramızdan veya e-posta adresimizden doğrudan ulaşabilirsiniz.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#DDDAD7]">
              {/* Adres */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 border border-[#DDDAD7] bg-white flex items-center justify-center text-[#e93c37]">
                  <MapPin size={16} />
                </div>
                <div className="space-y-1">
                  <span className="font-dmsans text-[10px] text-[#8D8C8C] uppercase font-bold tracking-wider">Genel Merkez Adresi</span>
                  <EditableText
                    content={content}
                    contentKey="contact.address"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-dmsans text-sm text-[#2F1D13] leading-relaxed block focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 border border-[#DDDAD7] bg-white flex items-center justify-center text-[#e93c37]">
                  <Phone size={16} />
                </div>
                <div className="space-y-1">
                  <span className="font-dmsans text-[10px] text-[#8D8C8C] uppercase font-bold tracking-wider">Telefon</span>
                  <EditableText
                    content={content}
                    contentKey="contact.phone"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-dmsans text-sm text-[#2F1D13] block focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>

              {/* E-posta */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 border border-[#DDDAD7] bg-white flex items-center justify-center text-[#e93c37]">
                  <Mail size={16} />
                </div>
                <div className="space-y-1">
                  <span className="font-dmsans text-[10px] text-[#8D8C8C] uppercase font-bold tracking-wider">E-posta</span>
                  <EditableText
                    content={content}
                    contentKey="contact.email"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-dmsans text-sm text-[#2F1D13] block focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sağ: Çalışma Saatleri Kartı */}
          <div className="border border-[#DDDAD7] bg-white p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#DDDAD7]">
              <Clock className="text-[#e93c37]" size={20} />
              <h3 className="font-cormorant text-2xl font-bold">Açılış & Kapanış Saatleri</h3>
            </div>
            
            <EditableText
              content={content}
              contentKey="contact.hours"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="font-dmsans text-sm text-[#8D8C8C] leading-relaxed block focus:outline-none focus:ring-0 px-1 rounded whitespace-pre-line"
            />

            <div className="p-6 bg-[#F6F3EF] border border-[#DDDAD7] text-xs font-dmsans text-[#8D8C8C] leading-relaxed">
              <strong className="text-[#2F1D13] font-bold block mb-1">Franchise & Yatırım Ortaklığı</strong>
              Markamızı kendi şehrinize taşımak veya kurumsal iş birlikleri planlamak için franchise@thehousecafe.com adresine detaylı taleplerinizi iletebilirsiniz.
            </div>
          </div>

        </div>
      </section>

      {/* 9. Minimalist Koyu Kömür Footer */}
      <footer className="bg-[#1C191E] text-[#F6F3EF] py-16 border-t border-white/5 font-dmsans">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
          
          {/* Logo ve Slogan */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-cormorant font-black text-xl tracking-widest uppercase">{content.contact.company_name}</span>
              <span className="w-1.5 h-1.5 bg-[#e93c37]" />
            </div>
            <p className="text-[#8D8C8C] leading-relaxed max-w-sm">
              2002'den bu yana geleneksel tatları modern çizgilerle buluşturan, Autoban Studio imzalı özgün mekânlarda ev konforunu sunan restoran zinciri.
            </p>
            <div className="pt-2 text-[9px] text-[#8D8C8C]/50 uppercase tracking-widest font-black">
              DESIGN BY AUTOBAN STUDIO &copy; 2002-2026
            </div>
          </div>

          {/* Linkler */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#e93c37] uppercase tracking-wider">Hızlı Navigasyon</h4>
            <div className="flex flex-col gap-2 text-[#8D8C8C] text-left">
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
                İletişim & Lokasyon
              </a>
            </div>
          </div>

          {/* Takip Edin */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#e93c37] uppercase tracking-wider">Bizi Takip Edin</h4>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-[#e93c37] hover:border-[#e93c37] hover:text-white transition-all"><Globe size={12} /></a>
              <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:bg-[#e93c37] hover:border-[#e93c37] hover:text-white transition-all"><Globe size={12} /></a>
            </div>
            <p className="text-[10px] text-[#8D8C8C]/70">
              Telif Hakkı &copy; 2026 {content.contact.company_name} A.Ş. — Tüm Hakları Saklıdır.
            </p>
          </div>

        </div>
      </footer>

      {/* Footer Modalı (Tüm sitelerde aynı genel metinler) */}
      {activeFooterModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative">
            <button
              type="button"
              onClick={() => setActiveFooterModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {activeFooterModal === 'hakkimizda' && (
              <div className="space-y-4 font-dmsans text-left">
                <h3 className="font-cormorant text-2xl font-bold border-b pb-2 text-[#2F1D13]">{content.contact.company_name} &bull; Hakkımızda</h3>
                <div className="space-y-3 text-sm text-[#8D8C8C] leading-relaxed">
                  <p>
                    İşletmemiz, en kaliteli hammaddeler ve taze malzemelerle hazırlanan eşsiz lezzetleri, sıcak ve samimi bir kafe atmosferinde sunmak amacıyla yola çıkmıştır. Geleneksel misafirperverlik anlayışını çağdaş gastronomi kültürü ve zengin fırın lezzetleriyle harmanlayarak, her misafirimizin kapımızdan mutlu ayrılmasını hedefliyoruz.
                  </p>
                  <p>
                    Günün her saatinde taze çekirdeklerden demlenen kahvelerimiz, fırınımızdan yeni çıkmış sıcak çöreklerimiz ve güler yüzlü ekibimizle sizlere en iyi hizmeti sunmak için buradayız.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'gizlilik' && (
              <div className="space-y-4 font-dmsans text-left">
                <h3 className="font-cormorant text-2xl font-bold border-b pb-2 text-[#2F1D13]">Gizlilik Politikası</h3>
                <div className="text-xs text-[#8D8C8C] leading-relaxed space-y-3 overflow-y-auto max-h-[60vh] pr-2">
                  <p className="font-semibold text-[#2F1D13]">1. Veri Sorumlusu ve Amacı</p>
                  <p>
                    Bu web sitesi üzerinden bizimle paylaştığınız kişisel verileriniz (isim, e-posta, telephone gibi iletişim bilgileri), yalnızca rezervasyon taleplerinizi almak, hizmetlerimizle ilgili bilgilendirme yapmak ve iletişim formları üzerinden taleplerinize yanıt vermek amacıyla işlenir.
                  </p>
                  <p className="font-semibold text-[#2F1D13]">2. Verilerin Saklanması ve Paylaşımı</p>
                  <p>
                    Kişisel verileriniz, yasal süreler ve işleme amaçlarının gerektirdiği süre boyunca güvenli yerel sunucularda saklanır. Verileriniz, yasal zorunluluklar hariç olmak üzere, üçüncü şahıslarla asla paylaşılmaz, satılmaz veya ticari amaçla kullanılmaz.
                  </p>
                  <p className="font-semibold text-[#2F1D13]">3. Çerezler (Cookies)</p>
                  <p>
                    Web sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezleri kullanabilir. Tarayıcı ayarlarınızdan çerezleri dilediğiniz gibi engelleyebilir veya silebilirsiniz.
                  </p>
                  <p className="font-semibold text-[#2F1D13]">4. Haklarınız</p>
                  <p>
                    Kişisel verilerinizin silinmesini, güncellenmesini veya işlenip işlenmediğini öğrenmeyi dilediğiniz zaman talep edebilirsiniz. Bilgi talepleri için lütfen iletişim kanallarımız üzerinden bizimle irtibata geçin.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'iletisim' && (
              <div className="space-y-4 font-dmsans text-left">
                <h3 className="font-cormorant text-2xl font-bold border-b pb-2 text-[#2F1D13]">İletişim Bilgileri</h3>
                <div className="space-y-3 text-sm text-[#8D8C8C]">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#e93c37] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#2F1D13]">Adresimiz</p>
                      <p>{content.contact.address || 'Kafemiz Adresi'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={16} className="text-[#e93c37] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#2F1D13]">Telefon</p>
                      <p>{content.contact.phone || '0212 000 00 00'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={16} className="text-[#e93c37] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#2F1D13]">E-posta</p>
                      <p>{content.contact.email || 'info@kafemiz.com'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-[#e93c37] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#2F1D13]">Çalışma Saatleri</p>
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
                className="px-5 py-2 bg-[#e93c37] text-white hover:bg-[#e93c37]/90 text-xs font-semibold tracking-wider uppercase cursor-pointer"
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
