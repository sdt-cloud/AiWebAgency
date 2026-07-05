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
  Award
} from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function HouseCafeTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menü kategorilerini dinamik belirle
  const menuCategories = content.menu_items?.map(cat => cat.category) || [];
  const currentCategory = activeCategory || menuCategories[0] || '';

  const activeMenuCategory = content.menu_items?.find(
    cat => cat.category === currentCategory
  );

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
            <a href="#konsept" className="hover:text-[#e93c37] transition-colors">Konsept</a>
            <a href="#menumuz" className="hover:text-[#e93c37] transition-colors">Menümüz</a>
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
            <a href="#subelerimiz" className="hover:text-[#e93c37] transition-colors">Şubelerimiz</a>
            <a href="#iletisim" className="hover:text-[#e93c37] transition-colors">İletişim</a>
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
          <div className="md:hidden bg-[#F6F3EF] border-t border-[#DDDAD7] px-6 py-6 space-y-4 absolute w-full left-0 shadow-lg">
            <nav className="flex flex-col gap-4 font-dmsans font-bold text-xs uppercase tracking-widest text-[#2F1D13]">
              <a 
                href="#konsept" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#e93c37] py-2 border-b border-[#DDDAD7]"
              >
                Konsept
              </a>
              <a 
                href="#menumuz" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#e93c37] py-2 border-b border-[#DDDAD7]"
              >
                Menümüz
              </a>
              <a 
                href="#subelerimiz" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#e93c37] py-2 border-b border-[#DDDAD7]"
              >
                Şubelerimiz
              </a>
              <a 
                href="#iletisim" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#e93c37] py-2"
              >
                İletişim
              </a>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Promo 1 */}
            <a href="#menumuz" className="relative group overflow-hidden block aspect-square border border-[#DDDAD7] p-2 bg-[#F6F3EF]">
              <div className="w-full h-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Menu"
                />
                <div className="absolute inset-0 bg-[#2F1D13]/60 group-hover:bg-[#e93c37]/90 transition-colors duration-500 flex flex-col justify-end p-6 text-white space-y-2">
                  <h3 className="font-cormorant text-2xl font-bold">Mevsimsel Menü</h3>
                  <p className="font-dmsans text-[10px] tracking-widest uppercase text-white/80">Lezzeti Keşfet</p>
                </div>
              </div>
            </a>

            {/* Promo 2 */}
            <a href="#subelerimiz" className="relative group overflow-hidden block aspect-square border border-[#DDDAD7] p-2 bg-[#F6F3EF]">
              <div className="w-full h-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Branches"
                />
                <div className="absolute inset-0 bg-[#2F1D13]/60 group-hover:bg-[#e93c37]/90 transition-colors duration-500 flex flex-col justify-end p-6 text-white space-y-2">
                  <h3 className="font-cormorant text-2xl font-bold">Şubelerimiz</h3>
                  <p className="font-dmsans text-[10px] tracking-widest uppercase text-white/80">Bize Yakın Konumlar</p>
                </div>
              </div>
            </a>

            {/* Promo 3 */}
            <a href="#konsept" className="relative group overflow-hidden block aspect-square border border-[#DDDAD7] p-2 bg-[#F6F3EF]">
              <div className="w-full h-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Concept"
                />
                <div className="absolute inset-0 bg-[#2F1D13]/60 group-hover:bg-[#e93c37]/90 transition-colors duration-500 flex flex-col justify-end p-6 text-white space-y-2">
                  <h3 className="font-cormorant text-2xl font-bold">Tasarım Felsefesi</h3>
                  <p className="font-dmsans text-[10px] tracking-widest uppercase text-white/80">Hikayemizi Oku</p>
                </div>
              </div>
            </a>

            {/* Promo 4 */}
            <a href="#iletisim" className="relative group overflow-hidden block aspect-square border border-[#DDDAD7] p-2 bg-[#F6F3EF]">
              <div className="w-full h-full relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt="Catering"
                />
                <div className="absolute inset-0 bg-[#2F1D13]/60 group-hover:bg-[#e93c37]/90 transition-colors duration-500 flex flex-col justify-end p-6 text-white space-y-2">
                  <h3 className="font-cormorant text-2xl font-bold">Davet & Catering</h3>
                  <p className="font-dmsans text-[10px] tracking-widest uppercase text-white/80">Sizinle Birlikteyiz</p>
                </div>
              </div>
            </a>

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
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80" 
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
          {menuCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {menuCategories.map((catName) => {
                const isActive = catName === currentCategory;
                return (
                  <button
                    key={catName}
                    onClick={() => setActiveCategory(catName)}
                    className={`px-8 py-3 rounded-none text-xs font-dmsans font-bold uppercase tracking-[0.15em] transition-all border cursor-pointer ${
                      isActive 
                        ? 'bg-[#e93c37] border-[#e93c37] text-white' 
                        : 'bg-white border-[#DDDAD7] text-[#2F1D13] hover:border-[#e93c37] hover:text-[#e93c37]'
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto pt-6">
              {activeMenuCategory.items.map((item, itemIdx) => {
                const itemPath = `menu_items.${content.menu_items?.indexOf(activeMenuCategory)}.items.${itemIdx}`;
                
                return (
                  <div key={itemIdx} className="group border-b border-[#DDDAD7] pb-4 flex justify-between items-start gap-4">
                    <div className="space-y-1">
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
                  </div>
                );
              })}
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
            {/* Şube 1 */}
            <div className="border border-[#DDDAD7] bg-white p-3 space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-48 object-cover" 
                alt="Teşvikiye"
              />
              <div className="space-y-1.5 px-2 pb-2">
                <h3 className="font-cormorant text-xl font-bold flex justify-between">
                  <span>Teşvikiye (Atiye Sokak)</span>
                  <span className="text-xs px-2 py-0.5 bg-[#e93c37]/10 text-[#e93c37] font-dmsans font-bold uppercase tracking-wider self-center rounded-none">MERKEZ</span>
                </h3>
                <p className="font-dmsans text-xs text-[#8D8C8C] leading-relaxed">
                  Atiye Sk. No:8 Teşvikiye, Şişli / İstanbul
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#2F1D13] font-bold">
                  <Phone size={12} className="text-[#e93c37]" />
                  <span>0212 258 84 41</span>
                </div>
              </div>
            </div>

            {/* Şube 2 */}
            <div className="border border-[#DDDAD7] bg-white p-3 space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-48 object-cover" 
                alt="Ortaköy"
              />
              <div className="space-y-1.5 px-2 pb-2">
                <h3 className="font-cormorant text-xl font-bold">Ortaköy (Boğaz Manzarası)</h3>
                <p className="font-dmsans text-xs text-[#8D8C8C] leading-relaxed">
                  Salhane Sk. No: 1 Ortaköy, Beşiktaş / İstanbul
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#2F1D13] font-bold">
                  <Phone size={12} className="text-[#e93c37]" />
                  <span>0212 227 26 81</span>
                </div>
              </div>
            </div>

            {/* Şube 3 */}
            <div className="border border-[#DDDAD7] bg-white p-3 space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-48 object-cover" 
                alt="Alaçatı"
              />
              <div className="space-y-1.5 px-2 pb-2">
                <h3 className="font-cormorant text-xl font-bold">Alaçatı (Yazlık Esinti)</h3>
                <p className="font-dmsans text-xs text-[#8D8C8C] leading-relaxed">
                  Kemalpaşa Cd. No:114 Alaçatı, Çeşme / İzmir
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#2F1D13] font-bold">
                  <Phone size={12} className="text-[#e93c37]" />
                  <span>0232 716 95 35</span>
                </div>
              </div>
            </div>
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
            <div className="flex flex-col gap-2 text-[#8D8C8C]">
              <a href="#konsept" className="hover:text-white transition-colors">Konsept</a>
              <a href="#menumuz" className="hover:text-white transition-colors">Menümüz</a>
              <a href="#subelerimiz" className="hover:text-white transition-colors">Şubelerimiz</a>
              <a href="#iletisim" className="hover:text-white transition-colors">İletişim & Lokasyon</a>
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
    </div>
  );
}
