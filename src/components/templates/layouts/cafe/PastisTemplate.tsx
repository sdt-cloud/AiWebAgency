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
  Star
} from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function PastisTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSpecialTab, setSelectedSpecialTab] = useState<'sea' | 'meat' | 'dessert'>('sea');

  // Menü kategorilerini dinamik belirle
  const menuCategories = content.menu_items?.map(cat => cat.category) || [];
  const currentCategory = activeCategory || menuCategories[0] || '';

  const activeMenuCategory = content.menu_items?.find(
    cat => cat.category === currentCategory
  );

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
        <span>KLASİK FRANSIZ BİSTROSU & MEATPACKING RUHU İSTANBUL'DA</span>
      </div>

      {/* 2. Fransız Tipi İnce Çizgili Header */}
      <header className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#0a0101]/10 z-40 transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          {/* Sol: Sosyal / Dil */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-archivo tracking-widest text-[#0a0101]/60">
            <a href="#" className="hover:text-[#c10230] transition-colors"><Globe size={14} /></a>
            <span>PARIS &bull; NEW YORK</span>
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
            <span className="text-[9px] tracking-[0.3em] font-archivo uppercase text-[#c10230] font-black mt-0.5">BISTRO & BAR</span>
          </div>

          {/* Sağ: Nav Linkleri */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-archivo font-bold uppercase tracking-widest">
            <a href="#hikayemiz" className="hover:text-[#c10230] transition-colors">Hikayemiz</a>
            <a href="#ayna-spesiyalleri" className="hover:text-[#c10230] transition-colors">Özel Ayna</a>
            <a href="#menumuz" className="hover:text-[#c10230] transition-colors">Menü</a>
            <a href="#galeri" className="hover:text-[#c10230] transition-colors">Galeri</a>
            <a href="#iletisim" className="hover:text-[#c10230] transition-colors">İletişim</a>
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
          <div className="md:hidden bg-[#FAFAFA] border-t border-[#0a0101]/10 px-6 py-6 space-y-4 absolute w-full left-0 shadow-lg font-archivo font-bold text-xs uppercase tracking-widest text-[#0a0101]">
            <nav className="flex flex-col gap-4">
              <a href="#hikayemiz" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c10230] py-2 border-b border-[#0a0101]/5">Hikayemiz</a>
              <a href="#ayna-spesiyalleri" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c10230] py-2 border-b border-[#0a0101]/5">Özel Ayna</a>
              <a href="#menumuz" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c10230] py-2 border-b border-[#0a0101]/5">Menü</a>
              <a href="#galeri" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c10230] py-2 border-b border-[#0a0101]/5">Galeri</a>
              <a href="#iletisim" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c10230] py-2">İletişim</a>
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
              <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase block">NEW YORK &bull; SOHO &bull; PARIS</span>
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
                Rezervasyon
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
            <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase">GÜNLÜK SPESİYALLER</span>
            <h2 className="text-3xl md:text-5xl font-normal font-playfair">Nostaljik Aynadaki Lezzetler</h2>
            <p className="font-archivo text-[#666] text-sm max-w-xl mx-auto">
              Bistromuzun ikonik altın varaklı aynasında, şefimizin o güne özel hazırladığı Fransız klasikleri yer alır. Görmek istediğiniz kategoriyi seçin.
            </p>
          </div>

          {/* Ayna Tab Değiştirici */}
          <div className="flex justify-center gap-4 border-b border-[#0a0101]/10 pb-4 max-w-md mx-auto">
            <button 
              onClick={() => setSelectedSpecialTab('sea')} 
              className={`font-archivo text-xs font-bold uppercase tracking-widest pb-2 border-b-2 cursor-pointer transition-all ${
                selectedSpecialTab === 'sea' ? 'border-[#c10230] text-[#c10230]' : 'border-transparent text-[#666] hover:text-[#0a0101]'
              }`}
            >
              Deniz Ürünleri
            </button>
            <button 
              onClick={() => setSelectedSpecialTab('meat')} 
              className={`font-archivo text-xs font-bold uppercase tracking-widest pb-2 border-b-2 cursor-pointer transition-all ${
                selectedSpecialTab === 'meat' ? 'border-[#c10230] text-[#c10230]' : 'border-transparent text-[#666] hover:text-[#0a0101]'
              }`}
            >
              Et Klasikleri
            </button>
            <button 
              onClick={() => setSelectedSpecialTab('dessert')} 
              className={`font-archivo text-xs font-bold uppercase tracking-widest pb-2 border-b-2 cursor-pointer transition-all ${
                selectedSpecialTab === 'dessert' ? 'border-[#c10230] text-[#c10230]' : 'border-transparent text-[#666] hover:text-[#0a0101]'
              }`}
            >
              Tatlı & Kapanış
            </button>
          </div>

          {/* Altın Çerçeveli Ayna Tasarımı */}
          <div className="relative mx-auto max-w-xl border-[16px] border-double border-[#c4a265] bg-[#ece6dc] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* Ayna Parlama Efekti */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            {/* Elle Yazılmış Yazı Karakteri Alanı */}
            <div className="font-handwritten text-4xl md:text-5xl text-[#2F1D13] space-y-8 py-4 select-none">
              {selectedSpecialTab === 'sea' && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="hover:scale-105 transition-transform duration-300">Huîtres de Saison (Taze İstridye) &bull; ₺290</p>
                    <span className="text-lg font-archivo text-[#666] tracking-widest uppercase block">Mevsimlik istiridye, mignonette sosu ile</span>
                  </div>
                  <div className="space-y-1">
                    <p className="hover:scale-105 transition-transform duration-300">Moules Frites &bull; ₺390</p>
                    <span className="text-lg font-archivo text-[#666] tracking-widest uppercase block">Sarımsak, beyaz şarap sosunda midye ve çıtır patates</span>
                  </div>
                </div>
              )}
              {selectedSpecialTab === 'meat' && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="hover:scale-105 transition-transform duration-300">Steak Tartare Maison &bull; ₺460</p>
                    <span className="text-lg font-archivo text-[#666] tracking-widest uppercase block">Özel dana kıyması, kapari ve çiğ yumurta sarısı ile</span>
                  </div>
                  <div className="space-y-1">
                    <p className="hover:scale-105 transition-transform duration-300">Entrecôte Gratinée &bull; ₺850</p>
                    <span className="text-lg font-archivo text-[#666] tracking-widest uppercase block">Kuru dinlendirilmiş antrikot, otlu tereyağı ve frites</span>
                  </div>
                </div>
              )}
              {selectedSpecialTab === 'dessert' && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="hover:scale-105 transition-transform duration-300">Crème Brûlée Classique &bull; ₺190</p>
                    <span className="text-lg font-archivo text-[#666] tracking-widest uppercase block">Karamelize şeker kabuklu vanilyalı krema</span>
                  </div>
                  <div className="space-y-1">
                    <p className="hover:scale-105 transition-transform duration-300">Profiteroles Au Chocolat &bull; ₺210</p>
                    <span className="text-lg font-archivo text-[#666] tracking-widest uppercase block">Sıcak çikolata soslu dondurmalı profiterol</span>
                  </div>
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
              <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.25em] uppercase block">MEATPACKING KLASİĞİ</span>
              <h2 className="text-3xl md:text-5xl font-normal font-playfair leading-tight">Paris Şıklığı ile Manhattan Ruhu</h2>
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
                <span className="font-playfair text-3xl font-bold text-[#c10230]">1999</span>
                <p className="text-[10px] uppercase text-[#666] tracking-wider font-bold">İlk Açılış Yılı (NYC)</p>
              </div>
              <div className="space-y-1">
                <span className="font-playfair text-3xl font-bold text-[#c10230]">Zinc Bar</span>
                <p className="text-[10px] uppercase text-[#666] tracking-wider font-bold">Özel Çinko Bar Tasarımı</p>
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
            <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase">BISTRO LEZZETLERİ</span>
            <h2 className="text-3xl md:text-5xl font-normal font-playfair text-[#0a0101]">Ana Menümüzü İnceleyin</h2>
            <p className="font-archivo text-[#666] text-sm">
              Geleneksel Fransız mutfağının en seçkin klasikleri, en taze yerel malzemeler ile hazırlanıyor.
            </p>
          </div>

          {/* Kategori Tabları */}
          {menuCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {menuCategories.map((catName) => {
                const isActive = catName === currentCategory;
                return (
                  <button
                    key={catName}
                    onClick={() => setActiveCategory(catName)}
                    className={`px-8 py-3.5 text-xs font-archivo font-bold uppercase tracking-[0.2em] transition-all border-b-2 cursor-pointer ${
                      isActive 
                        ? 'border-[#c10230] text-[#c10230] bg-[#c10230]/5' 
                        : 'border-transparent text-[#666] hover:text-[#0a0101]'
                    }`}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>
          )}

          {/* Menü Listesi */}
          {activeMenuCategory && activeMenuCategory.items && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 max-w-4xl mx-auto pt-6">
              {activeMenuCategory.items.map((item, itemIdx) => {
                const itemPath = `menu_items.${content.menu_items?.indexOf(activeMenuCategory)}.items.${itemIdx}`;
                
                return (
                  <div key={itemIdx} className="group pb-4 border-b border-[#0a0101]/10 flex flex-col space-y-1.5">
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
          )}
        </div>
      </section>

      {/* 7. Görsel Sayısı Yüksek 6'lı Masonry Galeri (Zengin Görsellik Talebini Karşılayan Alan) */}
      <section id="galeri" className="py-20 bg-[#f5efe6] border-b border-[#0a0101]/10">
        <div className="container mx-auto px-6 md:px-12 space-y-12">
          {/* Başlık */}
          <div className="text-center space-y-2">
            <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase">GÖRSEL BAKIŞ</span>
            <h2 className="text-3xl md:text-5xl font-normal font-playfair text-[#0a0101]">Bistrodan Kareler</h2>
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
              <div className="absolute inset-0 bg-[#0a0101]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase">
                <Camera size={18} className="mr-2" /> Çinko Bar
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
              <div className="absolute inset-0 bg-[#0a0101]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase">
                <Camera size={18} className="mr-2" /> Patates Kızartması
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
              <div className="absolute inset-0 bg-[#0a0101]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase">
                <Camera size={18} className="mr-2" /> Deniz Mahsülleri
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
              <div className="absolute inset-0 bg-[#0a0101]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase">
                <Camera size={18} className="mr-2" /> Masa Düzeni
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
              <div className="absolute inset-0 bg-[#0a0101]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase">
                <Camera size={18} className="mr-2" /> Kırmızı Koltuklar
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
              <div className="absolute inset-0 bg-[#0a0101]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-archivo tracking-widest uppercase">
                <Camera size={18} className="mr-2" /> Artisan Kahve
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. İletişim & Rezervasyon Bilgileri */}
      <section id="iletisim" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Sol Kolon: Bilgiler */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#c10230] text-xs font-archivo font-black tracking-[0.2em] uppercase block">REZERVASYON & İLETİŞİM</span>
              <h2 className="text-3xl md:text-5xl font-normal font-playfair text-[#0a0101]">Akşam Yemeğinde Buluşalım</h2>
              <p className="font-archivo text-sm text-[#666] leading-relaxed">
                Pastis NYC bistrosunun büyülü akşam atmosferinde yerinizi şimdiden ayırtın. Akşam yemeği servislerimiz için rezervasyon yapılması önemle rica olunur. Gün içi öğle ve brunch servislerinde ise kapıda karşılama ile misafir ağırlamaktayız.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#0a0101]/10">
              {/* Adres */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 border border-[#0a0101]/10 flex items-center justify-center text-[#c10230]">
                  <MapPin size={16} />
                </div>
                <div className="space-y-1">
                  <span className="font-archivo text-[10px] text-[#999] uppercase font-bold tracking-wider">Bistronun Konumu</span>
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
                  <span className="font-archivo text-[10px] text-[#999] uppercase font-bold tracking-wider">Rezervasyon Telefonu</span>
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
                  <span className="font-archivo text-[10px] text-[#999] uppercase font-bold tracking-wider">E-posta</span>
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
              <h3 className="font-playfair text-2xl font-normal">Açılış Saatlerimiz</h3>
            </div>
            
            <EditableText
              content={content}
              contentKey="contact.hours"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="font-archivo text-sm text-[#333] leading-relaxed block focus:outline-none focus:ring-0 px-1 rounded whitespace-pre-line"
            />

            <div className="p-6 bg-white border border-[#0a0101]/10 text-xs font-archivo text-[#666] leading-relaxed">
              <strong className="text-[#0a0101] font-bold block mb-1">Grup Davetleri & Özel Rezervasyon</strong>
              12 kişi ve üzerindeki gruplarınız ve özel bistro kapatma etkinlikleriniz için lütfen en az 48 saat öncesinden event@pastisnyc.com üzerinden bizimle iletişime geçiniz.
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
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Klasik Fransız bistrosu deneyimini Meatpacking District nostaljisiyle harmanlayan, Paris ve New York esintili zamansız lezzet durağınız.
            </p>
          </div>

          {/* Menü Linkleri */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#c10230] uppercase tracking-widest">Navigasyon</h4>
            <div className="flex flex-col gap-2 text-slate-400">
              <a href="#hikayemiz" className="hover:text-white transition-colors">Hikayemiz</a>
              <a href="#ayna-spesiyalleri" className="hover:text-white transition-colors">Özel Ayna</a>
              <a href="#menumuz" className="hover:text-white transition-colors">Menümüz</a>
              <a href="#galeri" className="hover:text-white transition-colors">Galeri</a>
              <a href="#iletisim" className="hover:text-white transition-colors">Rezervasyon & İletişim</a>
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
    </div>
  );
}
