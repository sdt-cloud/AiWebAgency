import React from 'react';
import { Phone, MapPin, Mail, Clock, Utensils, Star, Flame } from 'lucide-react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

interface RestaurantTemplateProps {
  content: any;
  themeConfig: {
    primary: string;
    secondary: string;
    fontFamily: string;
  };
  isEditMode: boolean;
  onUpdateContent: (newContent: any) => void;
}

export default function RestaurantTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: RestaurantTemplateProps) {
  const primaryColor = themeConfig.primary || '#b45309';
  const secondaryColor = themeConfig.secondary || '#f59e0b';

  const updateField = (section: string, field: string, value: any) => {
    const updated = { ...content };
    if (section) {
      updated[section] = { ...updated[section], [field]: value };
    }
    onUpdateContent(updated);
  };

  const updateService = (index: number, field: string, value: any) => {
    const updated = { ...content };
    const services = [...updated.services];
    services[index] = { ...services[index], [field]: value };
    updated.services = services;
    onUpdateContent(updated);
  };

  const updateTestimonial = (index: number, field: string, value: any) => {
    const updated = { ...content };
    const testimonials = [...updated.testimonials];
    testimonials[index] = { ...testimonials[index], [field]: value };
    updated.testimonials = testimonials;
    onUpdateContent(updated);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800" style={{ fontFamily: themeConfig.fontFamily || 'Georgia, serif' }}>
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-orange-100/50 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold flex items-center gap-2" style={{ color: primaryColor }}>
          <Utensils size={26} />
          <span>{content.contact.company_name || 'Gurme Lezzetler'}</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold text-stone-600">
          <a href="#about" className="hover:text-amber-700 transition-colors">Hakkımızda</a>
          <a href="#menu" className="hover:text-amber-700 transition-colors">Öne Çıkanlar</a>
          <a href="#testimonials" className="hover:text-amber-700 transition-colors">Yorumlar</a>
          <a
            href={`tel:${content.contact.phone}`}
            className="px-5 py-2 text-white rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryColor }}
          >
            <Phone size={14} />
            <span>Rezervasyon</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider border border-amber-200/50">
            <Flame size={14} className="text-amber-600 animate-pulse" />
            <span>Sıcak & Taze Günlük Lezzetler</span>
          </div>
          <EditableText
            text={content.hero.title}
            isEditMode={isEditMode}
            onChange={(val) => updateField('hero', 'title', val)}
            tagName="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 leading-tight"
          />
          <EditableText
            text={content.hero.subtitle}
            isEditMode={isEditMode}
            onChange={(val) => updateField('hero', 'subtitle', val)}
            tagName="p"
            className="text-lg text-stone-600 font-normal leading-relaxed max-w-lg"
          />
          <div className="pt-4">
            <a
              href={`tel:${content.contact.phone}`}
              className="px-8 py-3 text-white rounded-full hover:scale-105 transition-transform flex items-center gap-3 font-semibold shadow-lg shadow-amber-700/20 w-fit cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Phone size={18} />
              <EditableText
                text={content.hero.cta_text}
                isEditMode={isEditMode}
                onChange={(val) => updateField('hero', 'cta_text', val)}
              />
            </a>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-amber-200/30 rounded-3xl rotate-3 scale-105 -z-10"></div>
          <EditableImage
            src={content.images?.hero_bg || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"}
            alt="Hero Background"
            isEditMode={isEditMode}
            onChange={(val) => updateField('images', 'hero_bg', val)}
            className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
          />
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="bg-white py-20 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <EditableImage
              src={content.images?.about_img || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600"}
              alt="About"
              isEditMode={isEditMode}
              onChange={(val) => updateField('images', 'about_img', val)}
              className="rounded-3xl shadow-md w-full h-[320px] object-cover"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-black text-stone-900 flex items-center gap-2">
              <Utensils className="text-amber-700" size={26} />
              <span>Hikayemiz</span>
            </h2>
            <EditableText
              text={content.about}
              isEditMode={isEditMode}
              onChange={(val) => {
                const updated = { ...content };
                updated.about = val;
                onUpdateContent(updated);
              }}
              tagName="p"
              className="text-stone-600 leading-relaxed text-lg"
            />
          </div>
        </div>
      </section>

      {/* Menu/Features Section */}
      <section id="menu" className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-black text-stone-900">En Çok Tercih Edilenler</h2>
          <p className="text-stone-500 font-sans text-sm">Geleneksel tariflerle taze taze hazırlanan, dükkanımızın imza lezzetleri.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.services.map((service: any, index: number) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
                <Utensils size={28} />
              </div>
              <EditableText
                text={service.title}
                isEditMode={isEditMode}
                onChange={(val) => updateService(index, 'title', val)}
                tagName="h3"
                className="text-xl font-bold text-stone-900"
              />
              <EditableText
                text={service.description}
                isEditMode={isEditMode}
                onChange={(val) => updateService(index, 'description', val)}
                tagName="p"
                className="text-stone-500 text-sm leading-relaxed"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-amber-950 text-amber-50 py-20 px-6">
        <div className="max-w-7xl mx-auto md:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black mb-4">Lezzet Eleştirmenleri (Müşterilerimiz)</h2>
            <p className="text-amber-200/80 font-sans text-sm">Ziyaretçilerimizin bizim hakkımızda Google Haritalar'da paylaştığı bazı görüşler.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.testimonials.map((test: any, index: number) => (
              <div key={index} className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-6">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <EditableText
                  text={test.text}
                  isEditMode={isEditMode}
                  onChange={(val) => updateTestimonial(index, 'text', val)}
                  tagName="p"
                  className="italic text-amber-100/90 leading-relaxed"
                />
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-amber-200 uppercase">
                    {test.name ? test.name.charAt(0) : 'M'}
                  </div>
                  <div>
                    <EditableText
                      text={test.name}
                      isEditMode={isEditMode}
                      onChange={(val) => updateTestimonial(index, 'name', val)}
                      tagName="h4"
                      className="font-bold text-white text-sm"
                    />
                    <p className="text-xs text-amber-300/60 font-sans">Google Yorumu</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-7xl mx-auto md:px-12 grid md:grid-cols-2 gap-12 border-b border-stone-800 pb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Utensils size={28} className="text-amber-500" />
              <span>{content.contact.company_name || 'Gurme Lezzetler'}</span>
            </h2>
            <p className="text-stone-500 max-w-sm">Dükkanımıza gelin veya bizi arayarak yerinizi ayırtın. Sıcak bir akşamda enfes tatları kaçırmayın.</p>
            <a
              href={`tel:${content.contact.phone}`}
              className="px-6 py-3 text-white rounded-full hover:opacity-90 transition-opacity font-semibold inline-flex items-center gap-2 text-sm w-fit cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Phone size={16} />
              <span>Arayın: {content.contact.phone}</span>
            </a>
          </div>

          <div className="space-y-4 text-sm">
            <h3 className="text-white font-bold text-lg mb-4">Ulaşım & Saatler</h3>
            
            <div className="flex items-start gap-3">
              <MapPin className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-stone-500 font-sans font-medium">Adres:</span>
                <EditableText
                  text={content.contact.address}
                  isEditMode={isEditMode}
                  onChange={(val) => updateField('contact', 'address', val)}
                  tagName="span"
                  className="text-stone-300"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-stone-500 font-sans font-medium">E-posta:</span>
                <EditableText
                  text={content.contact.email}
                  isEditMode={isEditMode}
                  onChange={(val) => updateField('contact', 'email', val)}
                  tagName="span"
                  className="text-stone-300"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-stone-500 font-sans font-medium">Çalışma Saatleri:</span>
                <EditableText
                  text={content.contact.hours}
                  isEditMode={isEditMode}
                  onChange={(val) => updateField('contact', 'hours', val)}
                  tagName="span"
                  className="text-stone-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600 font-sans">
          <p>© {new Date().getFullYear()} {content.contact.company_name || 'Gurme Lezzetler'}. Tüm Hakları Saklıdır.</p>
          <p>AI Web Builder ile Tasarlanmıştır.</p>
        </div>
      </footer>
    </div>
  );
}
