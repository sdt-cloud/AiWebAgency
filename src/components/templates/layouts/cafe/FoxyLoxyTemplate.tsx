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
  Music, 
  Flame, 
  Image as ImageIcon, 
  ChevronRight, 
  Menu as MenuIcon, 
  X,
  Coffee,
  Sparkles
} from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function FoxyLoxyTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menü kategorilerini dinamik belirle
  const menuCategories = content.menu_items?.map(cat => cat.category) || [];
  const currentCategory = activeCategory || menuCategories[0] || '';

  const activeMenuCategory = content.menu_items?.find(
    cat => cat.category === currentCategory
  );

  return (
    <div className="min-h-screen bg-[#F4F0EA] text-[#3C2F2F] selection:bg-[#D36135] selection:text-white relative">
      {/* Yazı Tiplerini Dinamik Yükleme */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Fredoka:wght@300..700&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
        .font-fredoka { font-family: 'Fredoka', sans-serif; }
      ` }} />

      {/* 1. Üst Duyuru Barı (Zeytin Yeşili) */}
      <div className="bg-[#5B7053] text-[#F4F0EA] py-2 px-6 text-center text-xs tracking-wider font-fredoka font-medium z-50 relative flex justify-center items-center gap-2">
        <Flame size={14} className="text-[#E6A15C] animate-pulse" />
        <span>Hafta İçi 08:00 - 21:00 &bull; Pazar 08:00 - 18:00 &bull; Her Cumartesi Bahçede Ateş Başı Sohbetleri!</span>
      </div>

      {/* 2. Bohem Tasarımlı Header */}
      <header className="sticky top-0 bg-[#F4F0EA]/95 backdrop-blur-md border-b border-[#3C2F2F]/10 z-40 transition-all duration-305">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* Sol: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#D36135] flex items-center justify-center text-white">
              <Coffee size={20} />
            </div>
            <div className="flex flex-col">
              <EditableText
                content={content}
                contentKey="contact.company_name"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                className="text-xl md:text-2xl font-normal font-serif-display tracking-wide text-[#3C2F2F] focus:outline-none focus:ring-0 px-1 rounded block"
              />
              <span className="text-[9px] tracking-widest font-fredoka text-[#5B7053] uppercase font-bold -mt-1">KAHVE &bull; FIRIN &bull; CANTINA</span>
            </div>
          </div>

          {/* Orta: Nav Linkleri */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-fredoka font-bold text-[#3C2F2F]/80">
            <a href="#hikayemiz" className="hover:text-[#D36135] transition-colors">Hikayemiz</a>
            <a href="#etkinlikler" className="hover:text-[#D36135] transition-colors">Etkinlikler</a>
            <a href="#menumuz" className="hover:text-[#D36135] transition-colors">Menümüz</a>
            <a href="#sanat" className="hover:text-[#D36135] transition-colors">Sanat Galeri</a>
            <a href="#iletisim" className="hover:text-[#D36135] transition-colors">İletişim</a>
          </nav>

          {/* Sağ: Sipariş CTA Buton */}
          <div className="hidden md:block">
            <a 
              href="#iletisim" 
              className="px-6 py-2.5 bg-[#D36135] hover:bg-[#5B7053] text-[#F4F0EA] text-xs uppercase font-fredoka font-bold rounded-xl transition-all shadow-md shadow-[#D36135]/20 cursor-pointer"
            >
              Hemen Sipariş Et
            </a>
          </div>

          {/* Mobil Menü Butonu */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-[#3C2F2F] hover:text-[#D36135] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobil Menü */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#F4F0EA] border-t border-[#3C2F2F]/10 px-6 py-6 space-y-4 absolute w-full left-0 shadow-lg font-fredoka text-sm font-bold text-[#3C2F2F]/80">
            <nav className="flex flex-col gap-4">
              <a href="#hikayemiz" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D36135] py-2 border-b border-[#3C2F2F]/5">Hikayemiz</a>
              <a href="#etkinlikler" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D36135] py-2 border-b border-[#3C2F2F]/5">Etkinlikler</a>
              <a href="#menumuz" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D36135] py-2 border-b border-[#3C2F2F]/5">Menümüz</a>
              <a href="#sanat" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D36135] py-2 border-b border-[#3C2F2F]/5">Sanat Galeri</a>
              <a href="#iletisim" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D36135] py-2">İletişim</a>
            </nav>
            <a 
              href="#iletisim" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-3 bg-[#D36135] text-white text-center rounded-xl"
            >
              Hemen Sipariş Et
            </a>
          </div>
        )}
      </header>

      {/* 3. Bohem & Sıcak Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Sol Kolon: Metin */}
        <div className="space-y-6 max-w-xl">
          {content.hero.badge_text && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D36135]/10 border border-[#D36135]/20 text-[#D36135] rounded-full text-xs font-fredoka font-bold uppercase">
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
            className="text-4xl md:text-6xl font-normal font-serif-display text-[#3C2F2F] leading-tight focus:outline-none focus:ring-0 px-1 rounded block"
          />
          
          <EditableText
            content={content}
            contentKey="hero.subtitle"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="text-base md:text-lg font-fredoka text-[#666] leading-relaxed focus:outline-none focus:ring-0 px-1 rounded block"
          />

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a 
              href="#menumuz" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D36135] hover:bg-[#5B7053] text-[#F4F0EA] rounded-2xl font-fredoka font-bold text-sm tracking-wide uppercase transition-all shadow-md shadow-[#D36135]/10 cursor-pointer"
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
              href="#etkinlikler" 
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-[#3C2F2F]/5 text-[#3C2F2F] rounded-2xl font-fredoka font-bold text-sm border border-[#3C2F2F]/10 transition-all cursor-pointer"
            >
              Haftalık Takvim
            </a>
          </div>
        </div>

        {/* Sağ Kolon: Rustik Eskitilmiş Resim Çerçevesi */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#5B7053]/10 rounded-[40px] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
          <div className="border-[12px] border-white shadow-xl rounded-[40px] overflow-hidden bg-white">
            <EditableImage
              content={content}
              contentKey="images.hero_bg"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="w-full h-[350px] md:h-[480px] object-cover"
              alt="Foxy Loxy Victorian House front"
            />
          </div>
        </div>
      </section>

      {/* 4. Etkinlikler Section (Ateş Çukuru & Canlı Müzik) */}
      <section id="etkinlikler" className="bg-[#EFE9DF] border-y border-[#3C2F2F]/10 py-16 md:py-24">
        <div className="container mx-auto px-6 space-y-12">
          {/* Başlık */}
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-[#D36135] text-xs font-fredoka font-bold tracking-widest uppercase">SOSYAL MAHALLE HAFASI</span>
            <h2 className="text-3xl md:text-5xl font-normal font-serif-display">Kültür, Sanat & Ateş Başı Sohbetleri</h2>
            <p className="font-fredoka text-[#666] text-sm">
              Sadece kahve içmeye değil, paylaşmaya geliyoruz. Foxy Loxy her hafta canlı müzik ve sanatsal sergilerle dolup taşar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kart 1: Canlı Müzik */}
            <div className="bg-[#F4F0EA] p-8 border border-[#3C2F2F]/10 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#D36135]/10 flex items-center justify-center text-[#D36135]">
                <Music size={24} />
              </div>
              <h3 className="font-serif-display text-2xl font-bold">Salı Konserleri</h3>
              <p className="font-fredoka text-sm text-[#666] leading-relaxed">
                Her Salı akşamı yerel ve bölgesel müzisyenlerin akustik performansları eşliğinde bahçemizde canlı müzik ziyafeti sunuyoruz.
              </p>
            </div>

            {/* Kart 2: Ateş Çukuru */}
            <div className="bg-[#F4F0EA] p-8 border border-[#3C2F2F]/10 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#5B7053]/10 flex items-center justify-center text-[#5B7053]">
                <Flame size={24} />
              </div>
              <h3 className="font-serif-display text-2xl font-bold">Cumartesi Ateş Başındayız</h3>
              <p className="font-fredoka text-sm text-[#666] leading-relaxed">
                Her Cumartesi arka bahçemizdeki özel tasarım ateş çukurlarını (fire pits) yakarak, samimi sohbetleri ve şarap keyfini ısıtıyoruz.
              </p>
            </div>

            {/* Kart 3: Sanat Resepsiyonu */}
            <div className="bg-[#F4F0EA] p-8 border border-[#3C2F2F]/10 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#E6A15C]/10 flex items-center justify-center text-[#E6A15C]">
                <ImageIcon size={24} />
              </div>
              <h3 className="font-serif-display text-2xl font-bold">İlk Cuma Sergileri</h3>
              <p className="font-fredoka text-sm text-[#666] leading-relaxed">
                Her ayın ilk Cuma akşamı yerel sanatçıların resim, seramik ve fotoğraf sergilerine kapımızı açıyor, açılış resepsiyonları düzenliyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hikayemiz / Konsept Section */}
      <section id="hikayemiz" className="container mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Sol: Görsel */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#D36135]/5 rounded-[40px] -translate-x-4 translate-y-4 -z-10 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
          <div className="border-[12px] border-white shadow-xl rounded-[40px] overflow-hidden bg-white">
            <EditableImage
              content={content}
              contentKey="images.about_img"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="w-full h-[350px] md:h-[450px] object-cover"
              alt="Foxy Loxy Back Courtyard"
            />
          </div>
        </div>

        {/* Sağ: Metin */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[#D36135] text-xs font-fredoka font-bold tracking-widest uppercase block">HİKAYEMİZ</span>
            <h2 className="text-3xl md:text-5xl font-normal font-serif-display leading-tight text-[#3C2F2F]">Mahallemizin Kültür & Lezzet Odağı</h2>
            <div className="w-12 h-0.5 bg-[#5B7053]" />
          </div>

          <EditableText
            content={content}
            contentKey="about"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="text-sm md:text-base font-fredoka text-[#555] leading-relaxed focus:outline-none focus:ring-0 px-1 rounded block"
          />

          <div className="p-6 bg-white border border-[#3C2F2F]/10 rounded-3xl space-y-2">
            <span className="text-[#5B7053] font-fredoka font-bold text-xs uppercase tracking-wide">TEX-MEX ESİNTİLERİ</span>
            <p className="font-fredoka text-xs text-[#666] leading-relaxed">
              Kahve ve zengin pastane ürünlerimizin yanında, el yapımı taze Teksas-Meksika (Tex-Mex) taco çeşitlerimizle gününüze lezzetli bir heyecan katıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Interaktif Tex-Mex & Kahve Menüsü */}
      <section id="menumuz" className="bg-[#EFE9DF]/50 border-t border-[#3C2F2F]/10 py-20 md:py-28">
        <div className="container mx-auto px-6 space-y-12">
          
          {/* Başlık */}
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-[#D36135] text-xs font-fredoka font-bold tracking-widest uppercase">DENEYİMLEYİN</span>
            <h2 className="text-3xl md:text-5xl font-normal font-serif-display text-[#3C2F2F]">Fusion Mutfağımız</h2>
            <p className="font-fredoka text-[#666] text-sm">
              Taze demlenmiş yerel çekirdek kahveler, fırından yeni çıkmış kolache çörekleri ve el yapımı özel cantina tacolarımız.
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
                    className={`px-6 py-2.5 rounded-2xl text-xs font-fredoka font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                      isActive 
                        ? 'bg-[#5B7053] border-[#5B7053] text-[#F4F0EA] shadow-sm' 
                        : 'bg-white border-[#3C2F2F]/10 text-[#3C2F2F] hover:border-[#D36135] hover:text-[#D36135]'
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
                  <div key={itemIdx} className="bg-white p-6 border border-[#3C2F2F]/5 rounded-3xl space-y-2 relative group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-baseline gap-4">
                      <EditableText
                        content={content}
                        contentKey={`${itemPath}.name`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                        className="font-serif-display text-xl font-bold text-[#3C2F2F] group-hover:text-[#D36135] transition-colors focus:outline-none focus:ring-0 px-0.5 rounded block"
                      />
                      <EditableText
                        content={content}
                        contentKey={`${itemPath}.price`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                        className="font-serif-display text-base text-[#D36135] font-bold focus:outline-none focus:ring-0 px-0.5 rounded shrink-0 ml-4"
                      />
                    </div>
                    {item.description !== undefined && (
                      <EditableText
                        content={content}
                        contentKey={`${itemPath}.description`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                        className="font-fredoka text-xs text-[#666] leading-relaxed block focus:outline-none focus:ring-0 px-0.5 rounded"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 7. Sergi Galerisi (Sanat Galeri) */}
      <section id="sanat" className="py-20 bg-white border-t border-[#3C2F2F]/10">
        <div className="container mx-auto px-6 space-y-12">
          {/* Başlık */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[#5B7053] text-xs font-fredoka font-bold tracking-widest uppercase">YEREL SANAT</span>
            <h2 className="text-3xl md:text-5xl font-normal font-serif-display text-[#3C2F2F]">Sanat Köşemiz</h2>
            <div className="w-12 h-0.5 bg-[#D36135] mx-auto my-3" />
            <p className="font-fredoka text-[#666] text-xs leading-relaxed">
              Savannah sanat topluluğunu desteklemekten gurur duyuyoruz. Duvarlarımız her ay farklı bir yerel ressam veya fotoğrafçının eserlerine ev sahipliği yapar.
            </p>
          </div>

          {/* 3'lü Sanat Çerçeveleri Grid (Büyük Görsellik) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-[14px] border-double border-[#3C2F2F]/20 p-2 bg-white shadow-lg text-center space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-64 object-cover" 
                alt="Art piece 1"
              />
              <div className="pb-2">
                <span className="font-serif-display text-lg font-bold block">Bohem Çiçekler</span>
                <p className="font-fredoka text-[10px] text-[#666] uppercase mt-0.5">Yağlı Boya &bull; Selin Yılmaz</p>
              </div>
            </div>

            <div className="border-[14px] border-double border-[#3C2F2F]/20 p-2 bg-white shadow-lg text-center space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-64 object-cover" 
                alt="Art piece 2"
              />
              <div className="pb-2">
                <span className="font-serif-display text-lg font-bold block">Starland Sokakları</span>
                <p className="font-fredoka text-[10px] text-[#666] uppercase mt-0.5">Fotoğraf &bull; Can Öztürk</p>
              </div>
            </div>

            <div className="border-[14px] border-double border-[#3C2F2F]/20 p-2 bg-white shadow-lg text-center space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-64 object-cover" 
                alt="Art piece 3"
              />
              <div className="pb-2">
                <span className="font-serif-display text-lg font-bold block">Soyut Dokunuş</span>
                <p className="font-fredoka text-[10px] text-[#666] uppercase mt-0.5">Akrilik &bull; Elif Karaca</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. İletişim & Lokasyon */}
      <section id="iletisim" className="border-t border-[#3C2F2F]/10 py-20 md:py-28 bg-[#F4F0EA]">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Sol Kolon: Bilgiler */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[#D36135] text-xs font-fredoka font-bold tracking-widest uppercase block">BİZİ ZİYARET EDİN</span>
              <h2 className="text-3xl md:text-5xl font-normal font-serif-display text-[#3C2F2F]">Gelin ve Yerleşin</h2>
              <p className="font-fredoka text-sm text-[#666] leading-relaxed">
                Tarihi evimizde, kitap okuyabileceğiniz sakin odalarımızdan, sosyalleşebileceğiniz ateş başındaki arka bahçemize kadar her köşeyi sizin için hazırladık.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#3C2F2F]/10">
              {/* Adres */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 bg-[#5B7053]/10 text-[#5B7053] rounded-xl flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-fredoka text-[10px] text-[#999] uppercase font-bold tracking-wider">Kafenin Adresi</span>
                  <EditableText
                    content={content}
                    contentKey="contact.address"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-fredoka text-sm text-[#3C2F2F] leading-relaxed block focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 bg-[#5B7053]/10 text-[#5B7053] rounded-xl flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-fredoka text-[10px] text-[#999] uppercase font-bold tracking-wider">Telefon</span>
                  <EditableText
                    content={content}
                    contentKey="contact.phone"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-fredoka text-sm text-[#3C2F2F] block focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>

              {/* E-posta */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 bg-[#5B7053]/10 text-[#5B7053] rounded-xl flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div className="space-y-1">
                  <span className="font-fredoka text-[10px] text-[#999] uppercase font-bold tracking-wider">E-posta</span>
                  <EditableText
                    content={content}
                    contentKey="contact.email"
                    onUpdate={onUpdateContent}
                    isEditMode={isEditMode}
                    className="font-fredoka text-sm text-[#3C2F2F] block focus:outline-none focus:ring-0 px-0.5 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Saatler & Not */}
          <div className="bg-white border border-[#3C2F2F]/10 rounded-3xl p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#3C2F2F]/10">
              <Clock className="text-[#D36135]" size={20} />
              <h3 className="font-serif-display text-2xl font-bold">Kapılarımız Ne Zaman Açık?</h3>
            </div>
            
            <EditableText
              content={content}
              contentKey="contact.hours"
              onUpdate={onUpdateContent}
              isEditMode={isEditMode}
              className="font-fredoka text-sm text-[#666] leading-relaxed block focus:outline-none focus:ring-0 px-1 rounded whitespace-pre-line"
            />

            <div className="p-6 bg-[#D36135]/5 border border-[#D36135]/15 text-xs font-fredoka text-[#666] leading-relaxed rounded-2xl">
              <strong className="text-[#D36135] font-bold block mb-1">Köpek Dostu Bahçe</strong>
              Arka bahçemiz tamamen evcil hayvan dostudur. Dört ayaklı dostlarınızı da yanınızda getirebilir, ateş çukurları etrafında keyif yapabilirsiniz.
            </div>
          </div>

        </div>
      </section>

      {/* 9. Toprak Tonlarında Bohem Footer */}
      <footer className="bg-[#3C2F2F] text-[#F4F0EA] py-16 font-fredoka border-t border-[#3C2F2F]/10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
          
          {/* Logo ve Slogan */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D36135] flex items-center justify-center text-white">
                <Coffee size={16} />
              </div>
              <span className="font-serif-display font-normal text-lg tracking-wide uppercase">{content.contact.company_name}</span>
            </div>
            <p className="text-[#F4F0EA]/70 leading-relaxed max-w-sm">
              Kahveci, Taze Fırın ve Tex-Mex kantinini tek bir bohem mahalle oturma odasında bir araya getiren samimi lezzet ve sanat eviniz.
            </p>
          </div>

          {/* Linkler */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#E6A15C] uppercase tracking-wider">Hızlı Navigasyon</h4>
            <div className="flex flex-col gap-2 text-[#F4F0EA]/70">
              <a href="#hikayemiz" className="hover:text-white transition-colors">Hikayemiz</a>
              <a href="#etkinlikler" className="hover:text-white transition-colors">Etkinlikler</a>
              <a href="#menumuz" className="hover:text-white transition-colors">Menümüz</a>
              <a href="#sanat" className="hover:text-white transition-colors">Sanat Galeri</a>
              <a href="#iletisim" className="hover:text-white transition-colors">Ziyaret & İletişim</a>
            </div>
          </div>

          {/* Sosyal Medya ve Telif */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#E6A15C] uppercase tracking-wider">Takip Edin</h4>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center hover:bg-[#D36135] hover:border-[#D36135] hover:text-white transition-all"><Globe size={12} /></a>
              <a href="#" className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center hover:bg-[#D36135] hover:border-[#D36135] hover:text-white transition-all"><Globe size={12} /></a>
            </div>
            <p className="text-[10px] text-[#F4F0EA]/50">
              &copy; 2026 {content.contact.company_name} &bull; Tüm Hakları Saklıdır.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
