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
  Sparkles
} from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function GingerWhiteTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menü kategorilerini dinamik olarak belirle
  const menuCategories = content.menu_items?.map(cat => cat.category) || [];
  const currentCategory = activeCategory || menuCategories[0] || '';

  const activeMenuCategory = content.menu_items?.find(
    cat => cat.category === currentCategory
  );

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
          <span>DOĞAL MALZEMELER, SIFIR PLASTİK VE BOLCA SEVGİYLE</span>
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
            <a href="#hikayemiz" className="hover:text-[#c4a265] transition-colors">Hikayemiz</a>
            <a href="#menumuz" className="hover:text-[#c4a265] transition-colors">Menümüz</a>
            <a href="#degerlerimiz" className="hover:text-[#c4a265] transition-colors">Değerlerimiz</a>
            <a href="#iletisim" className="hover:text-[#c4a265] transition-colors">İletişim</a>
          </nav>

          {/* CTA Buton */}
          <div className="hidden md:block">
            <a 
              href="#iletisim" 
              className="px-6 py-2.5 bg-[#212121] hover:bg-[#c4a265] text-white text-xs tracking-wider uppercase font-quicksand font-bold rounded-full transition-all hover:shadow-lg shadow-[#c4a265]/20 cursor-pointer"
            >
              Tıkla Gel Al
            </a>
          </div>

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
          <div className="md:hidden bg-[#faf6f0] border-t border-[#e6e2da] px-6 py-6 space-y-4 animate-fade-in absolute w-full left-0 shadow-lg">
            <nav className="flex flex-col gap-4 font-quicksand font-bold text-[#212121]/80">
              <a 
                href="#hikayemiz" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#c4a265] py-1 border-b border-[#e6e2da]/50"
              >
                Hikayemiz
              </a>
              <a 
                href="#menumuz" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#c4a265] py-1 border-b border-[#e6e2da]/50"
              >
                Menümüz
              </a>
              <a 
                href="#degerlerimiz" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#c4a265] py-1 border-b border-[#e6e2da]/50"
              >
                Değerlerimiz
              </a>
              <a 
                href="#iletisim" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#c4a265] py-1"
              >
                İletişim
              </a>
            </nav>
            <a 
              href="#iletisim" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-3 bg-[#212121] text-white text-center rounded-xl text-sm font-quicksand font-bold"
            >
              Tıkla Gel Al
            </a>
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
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Değer 1 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#c4a265]/10 border border-[#c4a265]/20 flex items-center justify-center text-[#c4a265]">
              <Heart size={22} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-ovo text-lg font-semibold">Yerel Malzemeler</h3>
              <p className="font-quicksand text-sm text-[#666] leading-relaxed">
                Tüm yumurta, un ve süt ürünlerimizi doğrudan yerel çiftliklerden taze temin ediyor, el yapımı üretiyoruz.
              </p>
            </div>
          </div>

          {/* Değer 2 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#c4a265]/10 border border-[#c4a265]/20 flex items-center justify-center text-[#c4a265]">
              <ShieldCheck size={22} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-ovo text-lg font-semibold">Çevre Dostu Mutfak</h3>
              <p className="font-quicksand text-sm text-[#666] leading-relaxed">
                Sıfır plastik hedefiyle çalışıyoruz; tüm ambalajlarımızı kompostlanabilir ve geri dönüştürülebilir kağıt malzemelerden seçiyoruz.
              </p>
            </div>
          </div>

          {/* Değer 3 */}
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#c4a265]/10 border border-[#c4a265]/20 flex items-center justify-center text-[#c4a265]">
              <Coffee size={22} />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-ovo text-lg font-semibold">Nitelikli Artisan Çekirdekler</h3>
              <p className="font-quicksand text-sm text-[#666] leading-relaxed">
                En iyi kavurma evlerinin Red Brick harmanlarını kullanıyor, her fincanda eşsiz aromalı artisan kahveler demliyoruz.
              </p>
            </div>
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
            <span className="text-[#c4a265] text-xs font-quicksand font-bold tracking-[0.2em] uppercase block">BİZ KİMİZ?</span>
            <h2 className="text-3xl md:text-5xl font-normal font-ovo leading-tight">Yıllardır Mahallenin En Samimi Köşesindeyiz</h2>
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
              <span className="text-2xl md:text-3xl font-ovo font-normal text-[#c4a265]">2009</span>
              <p className="font-quicksand text-xs text-[#666] uppercase font-bold tracking-wide mt-1">Kuruluş Yılı</p>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-ovo font-normal text-[#c4a265]">%100</span>
              <p className="font-quicksand text-xs text-[#666] uppercase font-bold tracking-wide mt-1">Katkısız & El Yapımı</p>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-ovo font-normal text-[#c4a265]">100K+</span>
              <p className="font-quicksand text-xs text-[#666] uppercase font-bold tracking-wide mt-1">Mutlu Misafir</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Menü Section */}
      <section id="menumuz" className="bg-[#f5ebd6]/30 border-t border-[#e6e2da] py-20 md:py-28">
        <div className="container mx-auto px-6 space-y-12">
          {/* Başlık Alanı */}
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-[#c4a265] text-xs font-quicksand font-bold tracking-[0.2em] uppercase">TAZE & DOĞAL</span>
            <h2 className="text-3xl md:text-5xl font-normal font-ovo text-[#212121]">El Yapımı Menümüzü Keşfedin</h2>
            <div className="w-12 h-0.5 bg-[#c4a265] mx-auto my-4" />
            <p className="font-quicksand text-[#666] text-sm">
              Mutfağımızda her sabah özenle hazırlanan taze kahvaltılıklar, ekşi mayalı tostlar ve artisan kahve çeşitlerimiz.
            </p>
          </div>

          {/* Menü Kategorileri Tab Bar */}
          {menuCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {menuCategories.map((catName) => {
                const isActive = catName === currentCategory;
                return (
                  <button
                    key={catName}
                    onClick={() => setActiveCategory(catName)}
                    className={`px-6 py-2.5 rounded-full text-xs font-quicksand font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                      isActive 
                        ? 'bg-[#212121] border-[#212121] text-white shadow-md' 
                        : 'bg-white/60 border-[#e6e2da] text-[#212121] hover:border-[#c4a265] hover:text-[#c4a265]'
                    }`}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>
          )}

          {/* Menü Ürünleri Listesi */}
          {activeMenuCategory && activeMenuCategory.items && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl mx-auto pt-6">
              {activeMenuCategory.items.map((item, itemIdx) => {
                const itemPath = `menu_items.${content.menu_items?.indexOf(activeMenuCategory)}.items.${itemIdx}`;
                
                return (
                  <div key={itemIdx} className="group border-b border-[#e6e2da]/70 pb-5 space-y-1">
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
          )}
        </div>
      </section>

      {/* 7. İletişim & Konum Section */}
      <section id="iletisim" className="container mx-auto px-6 py-20 md:py-28 border-t border-[#e6e2da]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Sol Kolon: Bilgiler */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#c4a265] text-xs font-quicksand font-bold tracking-[0.2em] uppercase block">BİZE ULAŞIN</span>
              <h2 className="text-3xl md:text-5xl font-normal font-ovo text-[#212121]">Masanız Her Zaman Hazır</h2>
              <p className="font-quicksand text-sm text-[#666] leading-relaxed">
                Ginger & White ruhunu yaşamak için rezervasyona gerek yok! Sizleri kapıda güler yüzle karşılıyor ve boşalan ilk masaya alıyoruz. Dilerseniz hemen gelip paket servisinizi teslim alabilirsiniz.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#e6e2da]">
              {/* Adres */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#c4a265]/10 flex items-center justify-center text-[#c4a265]">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-quicksand text-xs text-[#999] uppercase font-bold tracking-wider">Adresimiz</span>
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
                  <span className="font-quicksand text-xs text-[#999] uppercase font-bold tracking-wider">Telefon Numarası</span>
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
                  <span className="font-quicksand text-xs text-[#999] uppercase font-bold tracking-wider">E-posta Adresi</span>
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
              <h3 className="font-ovo text-xl font-semibold">Çalışma Saatlerimiz</h3>
            </div>
            
            <EditableText
              content={content}
              contentKey="contact.hours"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="font-quicksand text-sm text-[#555] leading-relaxed block focus:outline-none focus:ring-1 focus:ring-[#c4a265] px-1 rounded whitespace-pre-line"
            />

            <div className="p-5 bg-[#c4a265]/10 rounded-2xl border border-[#c4a265]/20 space-y-2">
              <span className="font-quicksand text-xs text-[#c4a265] uppercase font-bold tracking-wider">Önemli Not</span>
              <p className="font-quicksand text-xs text-[#555] leading-relaxed">
                Tüm yiyeceklerimizi paket servis olarak Click & Collect (Tıkla Gel Al) üzerinden telefonla veya gelip sipariş vererek anında alabilirsiniz.
              </p>
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
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Nitelikli artisan kahve kültürünü, en kaliteli yerel malzemeler ve bolca sevgi ile harmanlayarak mahallenize taşıyoruz.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#c4a265] tracking-wide text-xs uppercase">Navigasyon</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <a href="#hikayemiz" className="hover:text-white transition-colors">Hikayemiz</a>
              <a href="#menumuz" className="hover:text-white transition-colors">Menümüz</a>
              <a href="#degerlerimiz" className="hover:text-white transition-colors">Değerlerimiz</a>
              <a href="#iletisim" className="hover:text-white transition-colors">İletişim & Konum</a>
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
    </div>
  );
}
