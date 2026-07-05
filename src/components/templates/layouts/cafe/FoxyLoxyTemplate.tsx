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
  Menu as MenuIcon, 
  X,
  Coffee,
  Flame,
  Calendar,
  UtensilsCrossed,
  Cookie,
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

export default function FoxyLoxyTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddNavDropdown, setShowAddNavDropdown] = useState(false);
  const [activeFooterModal, setActiveFooterModal] = useState<'hakkimizda' | 'gizlilik' | 'iletisim' | null>(null);
  const companyName = content.contact.company_name || 'Kafemiz';

  const defaultNavLinks = [
    { name: 'Ana Sayfa', url: '#welcome' },
    { name: 'Merhaba', url: '#howdy' },
    { name: 'Özellikler', url: '#foxy-is' },
    { name: 'Arka Bahçe', url: '#courtyard' },
    { name: 'Menü', url: '#menumuz' },
    { name: 'Etkinlikler', url: '#live-music' },
    { name: 'İletişim', url: '#iletisim' }
  ];
  const navLinks = content.nav_links || defaultNavLinks;

  // Menü kategorileri (Index tabanlı state yönetimi)
  const menuItems = content.menu_items || [];
  const activeMenuCategory = menuItems[activeCategoryIndex] || menuItems[0];

  return (
    <div className="min-h-screen bg-white text-[#222222] font-sans selection:bg-[#222222] selection:text-white relative font-inter">
      {/* Google Fonts - Lora (Georgia alternatifi Serif) & Inter (Proxima Nova alternatifi Sans-Serif) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .font-lora { font-family: 'Lora', Georgia, serif; }
        .font-inter { font-family: 'Inter', Helvetica, Arial, sans-serif; }
      ` }} />

      {/* Squarespace Duyuru Barı */}
      <div className="bg-[#222222] text-white py-3 px-6 text-center text-xs tracking-[0.15em] font-inter font-semibold uppercase z-50 relative">
        <EditableText
          content={content}
          contentKey="contact.hours"
          onUpdate={onUpdateContent}
          isEditMode={isEditMode}
        />
      </div>

      {/* Squarespace Temiz Header (Centered Logo) */}
      <header className="bg-white border-b border-black/5 sticky top-0 z-40 transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex flex-col items-center">
          {/* Logo Görseli / Metni */}
          <div className="text-center mb-3">
            <a href="#welcome" className="inline-block">
              <span className="text-3xl md:text-4xl font-normal font-lora tracking-[0.2em] text-[#222222] uppercase">
                {content.contact.company_name}
              </span>
            </a>
            <span className="text-[10px] tracking-[0.4em] font-inter uppercase text-[#666666] font-bold block mt-1">
              <EditableText
                content={content}
                contentKey="hero.badge_text"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </span>
          </div>

          {/* Navigasyon Linkleri */}
          <div className="w-full flex items-center justify-between md:justify-center border-t border-black/5 pt-3 relative">
            <nav className="hidden md:flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-inter font-bold uppercase tracking-[0.2em] text-[#222222]/80">
              {navLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-1 group/nav relative">
                  <a href={link.url} className="hover:text-black transition-colors shrink-0">
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
                    Link Ekle
                  </button>
                  {showAddNavDropdown && (
                    <div className="absolute top-6 left-0 bg-white border border-slate-200 shadow-xl rounded-lg py-2 w-48 z-50 text-left normal-case tracking-normal">
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 mb-1">
                        Sayfa Bölümü Seçin
                      </div>
                      {[
                        { name: 'Ana Sayfa', url: '#welcome' },
                        { name: 'Merhaba', url: '#howdy' },
                        { name: 'Özellikler', url: '#foxy-is' },
                        { name: 'Arka Bahçe', url: '#courtyard' },
                        { name: 'Menü', url: '#menumuz' },
                        { name: 'Etkinlikler', url: '#live-music' },
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
            <div className="md:hidden w-full flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#666]">Navigasyon</span>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="p-2 text-[#222] hover:text-black transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobil Menü Listesi */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-black/5 px-6 py-6 space-y-4 absolute w-full left-0 shadow-lg font-inter text-xs font-bold uppercase tracking-widest text-[#222]/80 z-50">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="hover:text-black py-2 border-b border-black/5 block"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* SIFIRDAN BİREBİR STACKED BÖLÜMLER */}

      {/* Bölüm 1: Hoş Geldiniz (#welcome) - Tam Genişlik Arka Plan ve Üst Bilgi Kartı */}
      <section id="welcome" className="relative min-h-[80vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        {/* Arka Plan Resmi */}
        <div className="absolute inset-0 z-0">
          <EditableImage
            content={content}
            contentKey="images.hero_bg"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="w-full h-full object-cover opacity-60"
            alt="Foxy Loxy Welcome Hero"
          />
        </div>

        {/* Squarespace Translucent Kartı (Birebir Tasarım) */}
        <div className="relative z-10 mx-6 bg-white/95 max-w-xl p-8 md:p-14 text-center border border-black/5 shadow-2xl flex flex-col items-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-normal font-lora tracking-wide text-[#222] leading-tight uppercase">
            {content.contact.company_name}
          </h1>
          <div className="w-16 h-[1px] bg-black/20" />
          <EditableText
            content={content}
            contentKey="hero.subtitle"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="text-sm md:text-base font-inter text-[#444] leading-relaxed tracking-wide focus:outline-none focus:ring-0 px-1 rounded block"
          />
          <div className="pt-4 w-full">
            <a 
              href="#menumuz" 
              className="inline-block w-full md:w-auto px-8 py-4 bg-black hover:bg-black/85 text-white font-inter font-bold text-xs tracking-[0.2em] uppercase transition-all rounded-none cursor-pointer"
            >
              <EditableText
                content={content}
                contentKey="hero.cta_text"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Bölüm 2: Merhaba (#howdy) - Split Görsel & Text */}
      <section id="howdy" className="py-20 md:py-28 bg-[#fafafa] border-b border-black/5">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          
          {/* Sol: Dikey Görsel */}
          <div className="md:col-span-5 bg-white border border-black/5 p-3 shadow-md">
            <EditableImage
              content={content}
              contentKey="images.about_img"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="w-full h-[400px] md:h-[480px] object-cover"
              alt="Foxy Coffee Details"
            />
          </div>

          {/* Sağ: Merhaba Açıklama */}
          <div className="md:col-span-7 space-y-6 text-left">
            <span className="text-[10px] tracking-[0.3em] font-inter uppercase text-[#666] font-bold block">
              <EditableText
                content={content}
                contentKey="about_badge"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </span>
            <h2 className="text-3xl md:text-5xl font-normal font-lora text-[#222]">
              <EditableText
                content={content}
                contentKey="about_title"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </h2>
            <div className="w-16 h-[2px] bg-black/80" />
            
            <EditableText
              content={content}
              contentKey="about"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="text-sm md:text-base font-inter text-[#555] leading-relaxed focus:outline-none focus:ring-0 px-1 rounded block"
            />

            <div className="pt-4">
              <a 
                href="#menumuz" 
                className="inline-block px-8 py-3.5 bg-transparent hover:bg-black text-[#222] hover:text-white font-inter font-bold text-xs tracking-widest uppercase border border-black transition-all rounded-none cursor-pointer"
              >
                <EditableText
                  content={content}
                  contentKey="about_cta_text"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Bölüm 3: Foxy Nedir? (#foxy-is) - 4 Sütunlu Özellikler */}
      <section id="foxy-is" className="py-20 md:py-28 bg-white border-b border-black/5">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-inter uppercase text-[#666] font-bold block">ÖZELLİKLERİMİZ</span>
            <h2 className="text-3xl md:text-4xl font-normal font-lora text-[#222] uppercase tracking-wider">{companyName} Nedir?</h2>
            <div className="w-12 h-[1px] bg-black/20 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {content.services?.map((service, index) => {
              // İkon seçimi
              let IconComponent = Coffee;
              if (service.icon === 'utensils') IconComponent = UtensilsCrossed;
              else if (service.icon === 'cookie') IconComponent = Cookie;
              else if (service.icon === 'coffee') IconComponent = Coffee;
              else if (service.icon === 'flame') IconComponent = Flame;

              return (
                <div key={index} className="text-center space-y-4 flex flex-col items-center relative group/item border border-dashed border-transparent hover:border-black/10 p-4 rounded-lg">
                  {/* Sütun Silme Butonu (Düzenleme modunda ve en az 1 sütun varken) */}
                  {isEditMode && content.services && content.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newServices = content.services?.filter((_, i) => i !== index) || [];
                        onUpdateContent({
                          ...content,
                          services: newServices
                        });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md z-30 transition-all cursor-pointer"
                      title="Bu Sütunu Sil"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}

                  <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center text-[#222] bg-[#fafafa]">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="font-lora text-xl font-normal text-zinc-800">
                    <EditableText
                      content={content}
                      contentKey={`services.${index}.title`}
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                    />
                  </h3>
                  <div className="font-inter text-xs text-[#666] leading-relaxed max-w-xs">
                    <EditableText
                      content={content}
                      contentKey={`services.${index}.description`}
                      onUpdate={onUpdateContent}
                      isEditMode={isEditMode}
                      multiline
                    />
                  </div>
                </div>
              );
            })}

            {/* Yeni Özellik Ekleme Kartı (Maksimum 5 öğe sınırıyla sadece düzenleme modunda) */}
            {isEditMode && (!content.services || content.services.length < 5) && (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-xl p-6 min-h-[160px] hover:border-black/30 transition-colors">
                <button
                  type="button"
                  onClick={() => {
                    // Ekleyeceğimiz yeni sütunun ikonu sıradaki boş ikon olsun
                    const icons = ['utensils', 'cookie', 'coffee', 'flame'];
                    const nextIcon = icons[(content.services?.length || 0) % icons.length];
                    const newServices = [
                      ...(content.services || []),
                      {
                        title: 'Yeni Özellik',
                        description: 'Özellik açıklamasını düzenlemek için tıklayın.',
                        icon: nextIcon
                      }
                    ];
                    onUpdateContent({
                      ...content,
                      services: newServices
                    });
                  }}
                  className="flex flex-col items-center gap-2 text-xs font-bold font-inter uppercase tracking-widest text-[#666] hover:text-black transition-colors cursor-pointer"
                >
                  <PlusCircle size={28} className="text-indigo-600 animate-pulse" />
                  <span>Yeni Sütun Ekle</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bölüm 4: Arka Bahçe (#courtyard) - Tam Genişlik Arka Plan ve Bilgi Paneli */}
      <section id="courtyard" className="relative min-h-[60vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        {/* Arka Plan Resmi */}
        <div className="absolute inset-0 z-0">
          <EditableImage
            content={content}
            contentKey="images.services_img"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="w-full h-full object-cover opacity-60"
            alt="Courtyard Background"
          />
        </div>

        {/* Squarespace Translucent Bilgi Paneli */}
        <div className="relative z-10 mx-6 bg-white/95 max-w-xl p-8 md:p-12 text-center border border-black/5 shadow-2xl flex flex-col items-center space-y-4">
          <span className="text-[10px] tracking-[0.3em] font-inter uppercase text-[#666] font-bold block">
            <EditableText
              content={content}
              contentKey="courtyard_badge"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
            />
          </span>
          <h2 className="text-2xl md:text-3xl font-normal font-lora text-[#222] uppercase tracking-wide">
            <EditableText
              content={content}
              contentKey="courtyard_title"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
            />
          </h2>
          <div className="w-12 h-[1px] bg-black/20" />
          <div className="text-xs md:text-sm font-inter text-[#555] leading-relaxed tracking-wide">
            <EditableText
              content={content}
              contentKey="courtyard_description"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              multiline
            />
          </div>
        </div>
      </section>

      {/* Bölüm 5: Çevrimiçi Menü & Detaylar (#menumuz) */}
      <section id="menumuz" className="py-20 md:py-28 bg-[#fafafa] border-b border-black/5">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-inter uppercase text-[#666] font-bold block">
              <EditableText
                content={content}
                contentKey="menu_badge"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </span>
            <h2 className="text-3xl md:text-4xl font-normal font-lora text-[#222] uppercase">
              <EditableText
                content={content}
                contentKey="menu_title"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </h2>
            <div className="w-12 h-[1px] bg-black/20 mx-auto" />
          </div>

          {/* Kategori Seçiciler (Modern Minimalist Squarespace Stili) */}
          {menuItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 items-center">
              {menuItems.map((cat, idx) => {
                const isActive = idx === activeCategoryIndex;
                return (
                  <div key={idx} className="flex items-center gap-1 group/cat relative">
                    <button
                      type="button"
                      onClick={() => setActiveCategoryIndex(idx)}
                      className={`px-5 py-2.5 text-xs font-inter font-bold uppercase tracking-widest border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-black border-black text-white' 
                          : 'bg-white border-black/10 text-[#444] hover:border-black hover:text-black'
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
                  className="flex items-center gap-1 px-4 py-2 border-2 border-dashed border-black/10 hover:border-black/30 text-xs font-bold font-inter uppercase tracking-widest text-[#666] hover:text-black transition-colors cursor-pointer"
                >
                  <PlusCircle size={12} />
                  Kategori Ekle
                </button>
              )}
            </div>
          )}

          {/* Menü İçerikleri */}
          {activeMenuCategory && activeMenuCategory.items && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto pt-6">
                {activeMenuCategory.items.map((item, itemIdx) => {
                  const itemPath = `menu_items.${activeCategoryIndex}.items.${itemIdx}`;
                  
                  return (
                    <div key={itemIdx} className="bg-white p-6 border border-black/5 flex flex-col space-y-2 group hover:border-black/25 transition-all relative">
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
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md z-30 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                          title="Bu Ürünü Sil"
                        >
                          <Trash2 size={10} />
                        </button>
                      )}

                      <div className="flex justify-between items-baseline gap-4">
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.name`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-lora text-lg font-normal text-[#222] group-hover:text-black transition-colors focus:outline-none focus:ring-0 px-0.5 rounded block"
                        />
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.price`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-lora italic text-sm text-[#222] font-semibold focus:outline-none focus:ring-0 px-0.5 rounded shrink-0 ml-4"
                        />
                      </div>
                      {item.description !== undefined && (
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.description`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-inter text-xs text-[#666] leading-relaxed block focus:outline-none focus:ring-0 px-0.5 rounded"
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
                    className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-black/85 text-white font-inter font-bold text-xs tracking-widest uppercase transition-all cursor-pointer"
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

      {/* Bölüm 6: Konser & Müzik Etkinlikleri (#live-music) */}
      <section id="live-music" className="py-20 md:py-28 bg-white border-b border-black/5">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Sol Kolon: Metin */}
          <div className="md:col-span-7 space-y-6 text-left">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#222] bg-[#fafafa]">
              <Calendar size={18} />
            </div>
            <h2 className="text-3xl md:text-5xl font-normal font-lora text-[#222]">
              <EditableText
                content={content}
                contentKey="events_title"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </h2>
            <div className="w-16 h-[2px] bg-black/80" />
            <div className="font-inter text-sm md:text-base text-[#555] leading-relaxed">
              <EditableText
                content={content}
                contentKey="events_description"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                multiline
              />
            </div>
            <div className="pt-4">
              <a 
                href="#iletisim"
                className="inline-block px-8 py-3.5 bg-black hover:bg-black/85 text-white font-inter font-bold text-xs tracking-[0.15em] uppercase transition-all rounded-none cursor-pointer"
              >
                <EditableText
                  content={content}
                  contentKey="events_cta_text"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                />
              </a>
            </div>
          </div>

          {/* Sağ Kolon: Resim */}
          <div className="md:col-span-5 bg-white border border-black/5 p-3 shadow-md">
            <EditableImage
              content={content}
              contentKey="images.gallery.0"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="w-full h-[320px] object-cover"
              alt="Live acoustic performance in courtyard"
            />
          </div>

        </div>
      </section>

      {/* Bölüm 7: Galeri (#cafe-images) - Squarespace 4'lü Kare Izgara */}
      <section id="cafe-images" className="py-12 bg-[#fafafa] border-b border-black/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Foto 1 */}
            <div className="aspect-square overflow-hidden bg-zinc-200 border border-black/5 relative group">
              <EditableImage
                content={content}
                contentKey="images.gallery.1"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt="Kahve Kupası"
              />
            </div>

            {/* Foto 2 */}
            <div className="aspect-square overflow-hidden bg-zinc-200 border border-black/5 relative group">
              <EditableImage
                content={content}
                contentKey="images.gallery.2"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt="Fırından Kurabiyeler"
              />
            </div>

            {/* Foto 3 */}
            <div className="aspect-square overflow-hidden bg-zinc-200 border border-black/5 relative group">
              <EditableImage
                content={content}
                contentKey="images.gallery.3"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt="Taze Kahve Çekirdekleri"
              />
            </div>

            {/* Foto 4 */}
            <div className="aspect-square overflow-hidden bg-zinc-200 border border-black/5 relative group">
              <EditableImage
                content={content}
                contentKey="images.gallery.4"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt="Taco Tabağı"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Bölüm 8: İletişim, Saatler & Adres (#iletisim) */}
      <section id="iletisim" className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left font-inter text-xs">
            
            {/* Çalışma Saatleri */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#222] font-bold uppercase tracking-widest border-b border-black/10 pb-3">
                <Clock size={14} />
                <span>ÇALIŞMA SAATLERİ</span>
              </div>
              <EditableText
                content={content}
                contentKey="contact.hours"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="text-gray-600 leading-relaxed block focus:outline-none focus:ring-0 px-0.5 rounded whitespace-pre-line"
              />
            </div>

            {/* İletişim */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#222] font-bold uppercase tracking-widest border-b border-black/10 pb-3">
                <Phone size={14} />
                <span>İLETİŞİM BİLGİLERİ</span>
              </div>
              <div className="space-y-2 text-gray-600 leading-relaxed">
                <div className="flex items-center justify-center md:justify-start gap-1">
                  <span>Tel:</span>
                  <EditableText
                    content={content}
                    contentKey="contact.phone"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
                <div className="flex items-center justify-center md:justify-start gap-1">
                  <span>E-posta:</span>
                  <EditableText
                    content={content}
                    contentKey="contact.email"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Konum */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#222] font-bold uppercase tracking-widest border-b border-black/10 pb-3">
                <MapPin size={14} />
                <span>BİSTRO KONUMU</span>
              </div>
              <EditableText
                content={content}
                contentKey="contact.address"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="text-gray-600 leading-relaxed block focus:outline-none focus:ring-0 px-0.5 rounded"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Bölüm 9: Squarespace Footer (İnce Çizgilerle Ayrılmış Alt Başlıklar) */}
      <footer className="bg-[#fafafa] border-t border-black/5 py-16 text-center text-xs font-inter">
        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.25em] text-[#666] font-bold uppercase block">
              <EditableText
                content={content}
                contentKey="footer_locations_title"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </span>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 pt-2">
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveFooterModal('hakkimizda'); }}
                className="text-[#222] hover:text-[#c10230] font-bold uppercase tracking-widest border-b border-transparent hover:border-black/20 pb-0.5 transition-all"
              >
                <EditableText
                  content={content}
                  contentKey="footer_link_text_1"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                />
              </a>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveFooterModal('gizlilik'); }}
                className="text-[#222] hover:text-[#c10230] font-bold uppercase tracking-widest border-b border-transparent hover:border-black/20 pb-0.5 transition-all"
              >
                <EditableText
                  content={content}
                  contentKey="footer_link_text_2"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                />
              </a>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveFooterModal('iletisim'); }}
                className="text-[#222] hover:text-[#c10230] font-bold uppercase tracking-widest border-b border-transparent hover:border-black/20 pb-0.5 transition-all"
              >
                <EditableText
                  content={content}
                  contentKey="footer_link_text_3"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                />
              </a>
            </div>
          </div>

          <div className="w-16 h-[1px] bg-black/10 mx-auto pt-4" />

          <div className="text-[10px] text-[#999] tracking-wider">
            &copy; 2026 {content.contact.company_name} &bull; Squarespace Altyapısıyla Klonlanmıştır.
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
              <div className="space-y-4 font-inter text-left">
                <h3 className="font-lora text-2xl font-bold border-b pb-2 text-[#222]">Hakkımızda</h3>
                <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                  <p>
                    İşletmemiz, en kaliteli hammaddeler ve taze malzemelerle hazırlanan eşsiz lezzetleri, sıcak ve samimi bir kafe atmosferinde sunmak amacıyla yola çıkmıştır. Nesillerdir süregelen misafirperverlik anlayışını modern nitelikli kahve kültürü ve zengin fırın lezzetleriyle harmanlayarak, her misafirimizin kapımızdan mutlu ayrılmasını hedefliyoruz.
                  </p>
                  <p>
                    Günün her saatinde taze çekirdeklerden demlenen kahvelerimiz, fırınımızdan yeni çıkmış sıcak çöreklerimiz ve güler yüzlü ekibimizle sizlere en iyi hizmeti sunmak için buradayız.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'gizlilik' && (
              <div className="space-y-4 font-inter text-left">
                <h3 className="font-lora text-2xl font-bold border-b pb-2 text-[#222]">Gizlilik Politikası</h3>
                <div className="text-xs text-slate-600 leading-relaxed space-y-3 overflow-y-auto max-h-[60vh] pr-2">
                  <p className="font-semibold">1. Veri Sorumlusu ve Amacı</p>
                  <p>
                    Bu web sitesi üzerinden bizimle paylaştığınız kişisel verileriniz (isim, e-posta, telefon gibi iletişim bilgileri), yalnızca rezervasyon taleplerinizi almak, hizmetlerimizle ilgili bilgilendirme yapmak ve iletişim formları üzerinden taleplerinize yanıt vermek amacıyla işlenir.
                  </p>
                  <p className="font-semibold">2. Verilerin Saklanması ve Paylaşımı</p>
                  <p>
                    Kişisel verileriniz, yasal süreler ve işleme amaçlarının gerektirdiği süre boyunca güvenli yerel sunucularda saklanır. Verileriniz, yasal zorunluluklar hariç olmak üzere, üçüncü şahıslarla asla paylaşılmaz, satılmaz veya ticari amaçla kullanılmaz.
                  </p>
                  <p className="font-semibold">3. Çerezler (Cookies)</p>
                  <p>
                    Web sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezleri kullanabilir. Tarayıcı ayarlarınızdan çerezleri dilediğiniz gibi engelleyebilir veya silebilirsiniz.
                  </p>
                  <p className="font-semibold">4. Haklarınız</p>
                  <p>
                    Kişisel verilerinizin silinmesini, güncellenmesini veya işlenip işlenmediğini öğrenmeyi dilediğiniz zaman talep edebilirsiniz. Bilgi talepleri için lütfen iletişim kanallarımız üzerinden bizimle irtibata geçin.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'iletisim' && (
              <div className="space-y-4 font-inter text-left">
                <h3 className="font-lora text-2xl font-bold border-b pb-2 text-[#222]">İletişim Bilgileri</h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Adresimiz</p>
                      <p>{content.contact.address || 'Kafemiz Adresi'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Telefon</p>
                      <p>{content.contact.phone || '0212 000 00 00'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">E-posta</p>
                      <p>{content.contact.email || 'info@kafemiz.com'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Çalışma Saatleri</p>
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
                className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-xs font-semibold tracking-wider uppercase cursor-pointer"
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
