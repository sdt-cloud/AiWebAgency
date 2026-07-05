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
  Coffee, 
  Heart, 
  ShieldCheck, 
  ChevronRight, 
  Menu as MenuIcon, 
  X,
  Sparkles,
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

export default function GingerWhiteTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddNavDropdown, setShowAddNavDropdown] = useState(false);
  const [activeFooterModal, setActiveFooterModal] = useState<'hakkimizda' | 'gizlilik' | 'iletisim' | null>(null);

  const defaultNavLinks = [
    { name: 'Hikayemiz', url: '#hikayemiz' },
    { name: 'Menümüz', url: '#menumuz' },
    { name: 'Değerlerimiz', url: '#degerlerimiz' },
    { name: 'İletişim', url: '#iletisim' }
  ];
  const navLinks = content.nav_links || defaultNavLinks;

  const menuItems = content.menu_items || [];
  const activeMenuCategory = menuItems[activeCategoryIndex] || menuItems[0];

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#212121] selection:bg-[#c4a265] selection:text-white relative">
      {/* Yazı Tiplerini Dinamik Yükleme */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Quicksand:wght@300..700&display=swap');
        .font-ovo { font-family: 'Playfair Display', serif; }
        .font-quicksand { font-family: 'Quicksand', sans-serif; }
      ` }} />

      {/* 1. Üst Duyuru Barı */}
      <div className="bg-[#212121] text-white py-2.5 px-4 text-center text-xs tracking-[0.15em] font-quicksand font-medium uppercase border-b border-[#e6e2da]/10 z-50 relative flex justify-between items-center container mx-auto rounded-b-xl shadow-sm">
        <div className="flex gap-4 lap-hide">
          <a href="#" className="hover:text-[#c4a265] transition-colors"><Globe size={14} /></a>
          <a href="#" className="hover:text-[#c4a265] transition-colors"><Globe size={14} /></a>
        </div>
        <div className="mx-auto flex items-center gap-1.5 text-[10px] md:text-xs">
          <Sparkles size={12} className="text-[#c4a265] animate-pulse" />
          <EditableText
            content={content}
            contentKey="hero.announcement_text"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            fallback="DOĞAL MALZEMELER, SIFIR PLASTİK VE BOLCA SEVGİYLE"
            className="focus:outline-none focus:ring-0"
          />
        </div>
        <div className="w-14 lap-hide"></div>
      </div>

      {/* 2. Yapışkan Header / Navigasyon */}
      <header className="sticky top-0 bg-[#faf6f0]/95 backdrop-blur-md border-b border-[#e6e2da] z-40 transition-all duration-305">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          {/* Logo alanı */}
          <div className="flex items-center gap-2">
            <Coffee size={24} className="text-[#c4a265]" />
            <EditableText
              content={content}
              contentKey="contact.company_name"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="text-xl md:text-2xl font-bold tracking-[0.1em] font-ovo text-[#212121] uppercase focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-1 rounded"
            />
          </div>

          {/* Masaüstü Nav Linkleri */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-quicksand font-bold text-[#212121]/80">
            {navLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-1 group/nav relative">
                <a href={link.url} className="hover:text-[#c4a265] transition-colors shrink-0">
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
                  className="text-indigo-600 hover:text-indigo-800 text-xs font-bold tracking-wider uppercase cursor-pointer ml-4 flex items-center gap-1"
                >
                  <PlusCircle size={12} />
                  Ekle
                </button>
                {showAddNavDropdown && (
                  <div className="absolute top-6 right-0 bg-white border border-[#e6e2da] shadow-xl rounded-lg py-2 w-48 z-50 text-left normal-case tracking-normal">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 mb-1">
                      Bölüm Seçin
                    </div>
                    {[
                      { name: 'Hikayemiz', url: '#hikayemiz' },
                      { name: 'Menümüz', url: '#menumuz' },
                      { name: 'Değerlerimiz', url: '#degerlerimiz' },
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
            className="md:hidden p-2 text-[#212121] hover:text-[#c4a265] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobil Menü */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#faf6f0] border-t border-[#e6e2da] px-6 py-6 space-y-4 animate-fade-in absolute w-full left-0 shadow-lg z-50">
            <nav className="flex flex-col gap-4 font-quicksand font-bold text-[#212121]/80">
              {navLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#c4a265] py-1 border-b border-[#e6e2da]/50 block"
                >
                  {link.name}
                </a>
              ))}
            </nav>

          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Sol İçerik */}
        <div className="space-y-6 max-w-xl">
          {content.hero.badge_text && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#c4a265]/10 border border-[#c4a265]/20 text-[#c4a265] rounded-full text-xs font-quicksand font-bold tracking-wide uppercase">
              <Sparkles size={12} />
              <EditableText
                content={content}
                contentKey="hero.badge_text"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </div>
          )}
          
          <EditableText
            content={content}
            contentKey="hero.title"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="text-4xl md:text-6xl font-normal font-ovo text-[#212121] leading-tight focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-1 rounded block"
          />
          
          <EditableText
            content={content}
            contentKey="hero.subtitle"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="text-lg font-quicksand text-[#666] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-1 rounded block"
          />

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a 
              href="#menumuz" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#212121] hover:bg-[#c4a265] text-white rounded-full font-quicksand font-bold text-sm tracking-wide uppercase transition-all hover:shadow-lg shadow-[#c4a265]/10 cursor-pointer"
            >
              <EditableText
                content={content}
                contentKey="hero.cta_text"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
              <ChevronRight size={16} />
            </a>
            <a 
              href="#hikayemiz" 
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-[#212121]/5 text-[#212121] rounded-full font-quicksand font-bold text-sm border border-[#e6e2da] transition-all cursor-pointer"
            >
              Hikayemiz
            </a>
          </div>
        </div>

        {/* Sağ Asimetrik Resim */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#c4a265]/5 rounded-tr-[100px] rounded-bl-[100px] translate-x-3 translate-y-3 -z-10 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500" />
          <EditableImage
            content={content}
            contentKey="images.hero_bg"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="w-full h-[350px] md:h-[480px] object-cover rounded-tr-[100px] rounded-bl-[100px] border-2 border-[#e6e2da] shadow-md relative"
            alt="Ginger & White Hero Image"
          />
        </div>
      </section>

      {/* 4. Değerlerimiz Section */}
      <section id="degerlerimiz" className="bg-[#fcfbf9] border-y border-[#e6e2da] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {content.services?.map((service, serviceIdx) => {
              // İkon eşleştirmesi
              const renderIcon = (iconName: string) => {
                switch (iconName) {
                  case 'heart': return <Heart size={22} />;
                  case 'shield':
                  case 'shield-check': return <ShieldCheck size={22} />;
                  case 'coffee': return <Coffee size={22} />;
                  default: return <Coffee size={22} />;
                }
              };

              return (
                <div key={serviceIdx} className="flex gap-4 items-start relative group/service p-2">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#c4a265]/10 border border-[#c4a265]/20 flex items-center justify-center text-[#c4a265]">
                    {renderIcon(service.icon)}
                  </div>
                  <div className="space-y-1.5 text-left flex-1">
                    <h3 className="font-ovo text-lg font-semibold">
                      <EditableText
                        content={content}
                        contentKey={`services.${serviceIdx}.title`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                      />
                    </h3>
                    <div className="font-quicksand text-sm text-[#666] leading-relaxed">
                      <EditableText
                        content={content}
                        contentKey={`services.${serviceIdx}.description`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                        multiline
                      />
                    </div>
                  </div>
                  {isEditMode && content.services && content.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newServices = content.services?.filter((_, i) => i !== serviceIdx) || [];
                        onUpdateContent({
                          ...content,
                          services: newServices
                        });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md z-30 transition-all cursor-pointer opacity-0 group-hover/service:opacity-100"
                      title="Bu Değeri Sil"
                    >
                      <Trash2 size={10} />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Yeni Değer Ekleme Kartı (Maks 5) */}
            {isEditMode && (!content.services || content.services.length < 5) && (
              <div className="flex items-center justify-center border-2 border-dashed border-[#e6e2da] rounded-2xl p-6 hover:border-[#c4a265] transition-colors min-h-[100px]">
                <button
                  type="button"
                  onClick={() => {
                    const defaultIcons = ['heart', 'shield-check', 'coffee'];
                    const nextIcon = defaultIcons[(content.services?.length || 0) % defaultIcons.length];
                    const newServices = [
                      ...(content.services || []),
                      { title: 'Yeni Özellik', description: 'Özellik açıklamasını yazınız.', icon: nextIcon }
                    ];
                    onUpdateContent({
                      ...content,
                      services: newServices
                    });
                  }}
                  className="flex items-center gap-2 text-xs font-bold font-quicksand uppercase tracking-wider text-[#212121] hover:text-[#c4a265] transition-colors cursor-pointer"
                >
                  <PlusCircle size={20} className="text-[#c4a265] animate-pulse" />
                  <span>Yeni Özellik Ekle</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Hikayemiz Section */}
      <section id="hikayemiz" className="container mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Sol Görsel */}
        <div className="relative group md:order-1 order-2">
          <div className="absolute inset-0 bg-[#c4a265]/5 rounded-tl-[100px] rounded-br-[100px] -translate-x-3 translate-y-3 -z-10 group-hover:-translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500" />
          <EditableImage
            content={content}
            contentKey="images.about_img"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="w-full h-[350px] md:h-[450px] object-cover rounded-tl-[100px] rounded-br-[100px] border-2 border-[#e6e2da] shadow-md relative"
            alt="Ginger & White Story Image"
          />
        </div>

        {/* Sağ Metin */}
        <div className="space-y-6 md:order-2 order-1">
          <div className="space-y-2">
            <span className="text-[#c4a265] text-xs font-quicksand font-bold tracking-[0.2em] uppercase block">
              <EditableText
                content={content}
                contentKey="about_badge"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                fallback="BİZ KİMİZ?"
                className="focus:outline-none focus:ring-0"
              />
            </span>
            <h2 className="text-3xl md:text-5xl font-normal font-ovo leading-tight">
              <EditableText
                content={content}
                contentKey="about_title"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                fallback="Yıllardır Mahallenin En Samimi Köşesindeyiz"
                className="focus:outline-none focus:ring-0"
              />
            </h2>
          </div>
          
          <EditableText
            content={content}
            contentKey="about"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="text-base font-quicksand text-[#555] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-1 rounded block"
          />

          <div className="pt-2 border-t border-[#e6e2da] flex gap-8">
            <div>
              <span className="text-2xl md:text-3xl font-ovo font-normal text-[#c4a265]">
                <EditableText content={content} contentKey="stats.0.value" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="2009" className="focus:outline-none focus:ring-0" />
              </span>
              <p className="font-quicksand text-xs text-[#666] uppercase font-bold tracking-wide mt-1">
                <EditableText content={content} contentKey="stats.0.label" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Kuruluş Yılı" className="focus:outline-none focus:ring-0" />
              </p>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-ovo font-normal text-[#c4a265]">
                <EditableText content={content} contentKey="stats.1.value" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="%100" className="focus:outline-none focus:ring-0" />
              </span>
              <p className="font-quicksand text-xs text-[#666] uppercase font-bold tracking-wide mt-1">
                <EditableText content={content} contentKey="stats.1.label" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Katkısız & El Yapımı" className="focus:outline-none focus:ring-0" />
              </p>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-ovo font-normal text-[#c4a265]">
                <EditableText content={content} contentKey="stats.2.value" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="100K+" className="focus:outline-none focus:ring-0" />
              </span>
              <p className="font-quicksand text-xs text-[#666] uppercase font-bold tracking-wide mt-1">
                <EditableText content={content} contentKey="stats.2.label" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Mutlu Misafir" className="focus:outline-none focus:ring-0" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Menü Section */}
      <section id="menumuz" className="bg-[#f5ebd6]/30 border-t border-[#e6e2da] py-20 md:py-28">
        <div className="container mx-auto px-6 space-y-12">
          {/* Başlık Alanı */}
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-[#c4a265] text-xs font-quicksand font-bold tracking-[0.2em] uppercase">
              <EditableText content={content} contentKey="menu_badge" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="TAZE & DOĞAL" className="focus:outline-none focus:ring-0" />
            </span>
            <h2 className="text-3xl md:text-5xl font-normal font-ovo text-[#212121]">
              <EditableText content={content} contentKey="menu_title" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="El Yapımı Menümüzü Keşfedin" className="focus:outline-none focus:ring-0" />
            </h2>
            <div className="w-12 h-0.5 bg-[#c4a265] mx-auto my-4" />
            <div className="font-quicksand text-[#666] text-sm">
              <EditableText content={content} contentKey="menu_description" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Mutfağımızda her sabah özenle hazırlanan taze kahvaltılıklar, ekşi mayalı tostlar ve artisan kahve çeşitlerimiz." className="focus:outline-none focus:ring-0" />
            </div>
          </div>

          {/* Menü Kategorileri Tab Bar */}
          {menuItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 items-center">
              {menuItems.map((cat, idx) => {
                const isActive = idx === activeCategoryIndex;
                return (
                  <div key={idx} className="flex items-center gap-1 group/cat relative">
                    <button
                      type="button"
                      onClick={() => setActiveCategoryIndex(idx)}
                      className={`px-6 py-2.5 rounded-full text-xs font-quicksand font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                        isActive 
                          ? 'bg-[#212121] border-[#212121] text-white shadow-md' 
                          : 'bg-white/60 border-[#e6e2da] text-[#212121] hover:border-[#c4a265] hover:text-[#c4a265]'
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
                  className="flex items-center gap-1 px-4 py-2 border-2 border-dashed border-[#e6e2da] rounded-full text-xs font-bold font-quicksand uppercase tracking-wider text-[#212121] hover:text-[#c4a265] transition-colors cursor-pointer"
                >
                  <PlusCircle size={12} />
                  Kategori Ekle
                </button>
              )}
            </div>
          )}

          {/* Menü Ürünleri Listesi */}
          {activeMenuCategory && activeMenuCategory.items && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl mx-auto pt-6">
                {activeMenuCategory.items.map((item, itemIdx) => {
                  const itemPath = `menu_items.${activeCategoryIndex}.items.${itemIdx}`;
                  
                  return (
                    <div key={itemIdx} className="group border-b border-[#e6e2da]/70 pb-5 space-y-1 relative pr-6 text-left">
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

                      <div className="flex justify-between items-baseline">
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.name`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-ovo text-base font-semibold group-hover:text-[#c4a265] transition-colors focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-0.5 rounded"
                        />
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.price`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-ovo italic text-sm text-[#c4a265] font-semibold focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-0.5 rounded ml-4 shrink-0"
                        />
                      </div>
                      {item.description !== undefined && (
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.description`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-quicksand text-xs text-[#666] leading-relaxed block focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-0.5 rounded"
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
                        { name: 'Yeni Ürün/İçecek', description: 'Ürün açıklaması buraya yazılır.', price: '₺120' }
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
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#212121] hover:bg-[#c4a265] text-white font-quicksand font-bold text-xs tracking-wider uppercase rounded-full transition-all cursor-pointer shadow-md"
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

      {/* 7. İletişim & Konum Section */}
      <section id="iletisim" className="container mx-auto px-6 py-20 md:py-28 border-t border-[#e6e2da]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Sol Kolon: Bilgiler */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#c4a265] text-xs font-quicksand font-bold tracking-[0.2em] uppercase block">
                <EditableText content={content} contentKey="contact.section_badge" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="BİZE ULAŞIN" className="focus:outline-none focus:ring-0" />
              </span>
              <h2 className="text-3xl md:text-5xl font-normal font-ovo text-[#212121]">
                <EditableText content={content} contentKey="contact.section_title" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Masanız Her Zaman Hazır" className="focus:outline-none focus:ring-0" />
              </h2>
              <div className="font-quicksand text-sm text-[#666] leading-relaxed">
                <EditableText content={content} contentKey="contact.section_description" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Ginger & White ruhunu yaşamak için rezervasyona gerek yok! Sizleri kapıda güler yüzle karşılıyor ve boşalan ilk masaya alıyoruz. Dilerseniz hemen gelip paket servisinizi teslim alabilirsiniz." className="focus:outline-none focus:ring-0" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#e6e2da]">
              {/* Adres */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#c4a265]/10 flex items-center justify-center text-[#c4a265]">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-quicksand text-xs text-[#999] uppercase font-bold tracking-wider">
                    <EditableText content={content} contentKey="contact.address_label" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Adresimiz" className="focus:outline-none focus:ring-0" />
                  </span>
                  <EditableText
                    content={content}
                    contentKey="contact.address"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-quicksand text-sm text-[#212121] leading-relaxed block focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-0.5 rounded"
                  />
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#c4a265]/10 flex items-center justify-center text-[#c4a265]">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-quicksand text-xs text-[#999] uppercase font-bold tracking-wider">
                    <EditableText content={content} contentKey="contact.phone_label" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Telefon Numarası" className="focus:outline-none focus:ring-0" />
                  </span>
                  <EditableText
                    content={content}
                    contentKey="contact.phone"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-quicksand text-sm text-[#212121] block focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-0.5 rounded"
                  />
                </div>
              </div>

              {/* E-posta */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#c4a265]/10 flex items-center justify-center text-[#c4a265]">
                  <Mail size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-quicksand text-xs text-[#999] uppercase font-bold tracking-wider">
                    <EditableText content={content} contentKey="contact.email_label" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="E-posta Adresi" className="focus:outline-none focus:ring-0" />
                  </span>
                  <EditableText
                    content={content}
                    contentKey="contact.email"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-quicksand text-sm text-[#212121] block focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-0.5 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Çalışma Saatleri & Uyarı */}
          <div className="bg-[#fcfbf9] border border-[#e6e2da] rounded-3xl p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#e6e2da]">
              <Clock className="text-[#c4a265]" size={22} />
              <h3 className="font-ovo text-xl font-semibold">
                <EditableText content={content} contentKey="contact.hours_title" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Çalışma Saatlerimiz" className="focus:outline-none focus:ring-0" />
              </h3>
            </div>
            
            <EditableText
              content={content}
              contentKey="contact.hours"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="font-quicksand text-sm text-[#555] leading-relaxed block focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-1 rounded whitespace-pre-line"
            />

            <div className="p-5 bg-[#c4a265]/10 rounded-2xl border border-[#c4a265]/20 space-y-2">
              <span className="font-quicksand text-xs text-[#c4a265] uppercase font-bold tracking-wider">
                <EditableText content={content} contentKey="contact.note_title" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Önemli Not" className="focus:outline-none focus:ring-0" />
              </span>
              <div className="font-quicksand text-xs text-[#555] leading-relaxed">
                <EditableText content={content} contentKey="contact.note_description" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Tüm yiyeceklerimizi paket servis olarak Click & Collect (Tıkla Gel Al) üzerinden telefonla veya gelip sipariş vererek anında alabilirsiniz." className="focus:outline-none focus:ring-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Koyu Tema Footer */}
      <footer className="bg-[#212121] text-[#faf6f0] border-t border-[#e6e2da]/10 py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm font-quicksand">
          {/* Logo ve Slogan */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <Coffee size={20} className="text-[#c4a265]" />
              <span className="font-ovo font-bold text-lg tracking-widest uppercase">{content.contact.company_name}</span>
            </div>
            <div className="text-slate-400 text-xs leading-relaxed max-w-sm">
              <EditableText content={content} contentKey="footer_slogan" onUpdate={onUpdateContent} isEditMode={isEditMode} fallback="Nitelikli artisan kahve kültürünü, en kaliteli yerel malzemeler ve bolca sevgi ile harmanlayarak mahallenize taşıyoruz." className="focus:outline-none focus:ring-0" />
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#c4a265] tracking-wide text-xs uppercase">Navigasyon</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400 text-left">
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
                İletişim & Konum
              </a>
            </div>
          </div>

          {/* Sosyal Medya ve Telif */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#c4a265] tracking-wide text-xs uppercase">Bizi Takip Edin</h4>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:bg-[#c4a265] hover:border-[#c4a265] hover:text-[#212121] transition-all"><Globe size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:bg-[#c4a265] hover:border-[#c4a265] hover:text-[#212121] transition-all"><Globe size={14} /></a>
            </div>
            <p className="text-[10px] text-slate-500 pt-2">
              &copy; 2026 {content.contact.company_name} — Tüm Hakları Saklıdır.
            </p>
          </div>
        </div>
      </footer>

      {/* Footer Modalı (Tüm sitelerde aynı genel metinler) */}
      {activeFooterModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf6f0] text-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 border border-[#e6e2da] shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative font-quicksand">
            <button
              type="button"
              onClick={() => setActiveFooterModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {activeFooterModal === 'hakkimizda' && (
              <div className="space-y-4 text-left">
                <h3 className="font-ovo text-2xl font-bold border-b pb-2 text-[#212121] uppercase tracking-wide">{content.contact.company_name} &bull; Hakkımızda</h3>
                <div className="space-y-3 text-sm text-[#555] leading-relaxed">
                  <p>
                    Kafemiz, nitelikli artisan kahve kültürünü, en taze yerel malzemelerle el yapımı olarak hazırlanan fırın lezzetleriyle buluşturarak mahallenin en sıcak köşesi olma amacıyla yola çıkmıştır. Londra sokaklarının samimi havası ve zengin kahve menümüzle her misafirimize huzurlu bir dinlenme noktası sunuyoruz.
                  </p>
                  <p>
                    Güne başlarken kokusuyla sizi saran taze kruvasanlarımız, fırından yeni çıkmış frostingli havuçlu kekimiz ve şeflerimizin özenle hazırladığı ekşi mayalı özel tostlarımızla günün her anında sizinleyiz.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'gizlilik' && (
              <div className="space-y-4 text-left">
                <h3 className="font-ovo text-2xl font-bold border-b pb-2 text-[#212121] uppercase tracking-wide">Gizlilik Politikası</h3>
                <div className="text-xs text-[#666] leading-relaxed space-y-3 overflow-y-auto max-h-[60vh] pr-2">
                  <p className="font-semibold text-[#212121]">1. Veri Sorumlusu ve Amacı</p>
                  <p>
                    Bu web sitesi üzerinden bizimle paylaştığınız kişisel verileriniz (isim, e-posta, telefon gibi iletişim bilgileri), yalnızca rezervasyon taleplerinizi almak, hizmetlerimizle ilgili bilgilendirme yapmak ve iletişim formları üzerinden taleplerinize yanıt vermek amacıyla işlenir.
                  </p>
                  <p className="font-semibold text-[#212121]">2. Verilerin Saklanması ve Paylaşımı</p>
                  <p>
                    Kişisel verileriniz, yasal süreler ve işleme amaçlarının gerektirdiği süre boyunca güvenli yerel sunucularda saklanır. Verileriniz, yasal zorunluluklar hariç olmak üzere, üçüncü şahıslarla asla paylaşılmaz, satılmaz veya ticari amaçla kullanılmaz.
                  </p>
                  <p className="font-semibold text-[#212121]">3. Çerezler (Cookies)</p>
                  <p>
                    Web sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezleri kullanabilir. Tarayıcı ayarlarınızdan çerezleri dilediğiniz gibi engelleyebilir veya silebilirsiniz.
                  </p>
                  <p className="font-semibold text-[#212121]">4. Haklarınız</p>
                  <p>
                    Kişisel verilerinizin silinmesini, güncellenmesini veya işlenip işlenmediğini öğrenmeyi dilediğiniz zaman talep edebilirsiniz. Bilgi talepleri için lütfen iletişim kanallarımız üzerinden bizimle irtibata geçin.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'iletisim' && (
              <div className="space-y-4 text-left">
                <h3 className="font-ovo text-2xl font-bold border-b pb-2 text-[#212121] uppercase tracking-wide">İletişim Bilgileri</h3>
                <div className="space-y-3 text-sm text-[#555]">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#c4a265] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#212121]">Adresimiz</p>
                      <p>{content.contact.address || 'Kafemiz Adresi'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={16} className="text-[#c4a265] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#212121]">Telefon</p>
                      <p>{content.contact.phone || '0212 000 00 00'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={16} className="text-[#c4a265] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#212121]">E-posta</p>
                      <p>{content.contact.email || 'info@kafemiz.com'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-[#c4a265] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#212121]">Çalışma Saatleri</p>
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
                className="px-5 py-2 bg-[#212121] text-white hover:bg-[#212121]/90 text-xs font-semibold tracking-wider uppercase rounded-full cursor-pointer"
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
