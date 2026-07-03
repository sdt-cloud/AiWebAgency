import React from 'react';
import { Phone, MapPin, Mail, Clock, ShieldCheck, Heart, Users } from 'lucide-react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

interface ServiceTemplateProps {
  content: any;
  themeConfig: {
    primary: string;
    secondary: string;
    fontFamily: string;
  };
  isEditMode: boolean;
  onUpdateContent: (newContent: any) => void;
}

export default function ServiceTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: ServiceTemplateProps) {
  const primaryColor = themeConfig.primary || '#1d4ed8';
  const secondaryColor = themeConfig.secondary || '#60a5fa';

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
    <div className="min-h-screen bg-slate-50 text-slate-800" style={{ fontFamily: themeConfig.fontFamily || 'Outfit, sans-serif' }}>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold flex items-center gap-2" style={{ color: primaryColor }}>
          <ShieldCheck size={28} />
          <span>{content.contact.company_name || 'Hizmet Noktası'}</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <a href="#about" className="hover:text-blue-600 transition-colors">Hakkımızda</a>
          <a href="#services" className="hover:text-blue-600 transition-colors">Hizmetlerimiz</a>
          <a href="#testimonials" className="hover:text-blue-600 transition-colors">Yorumlar</a>
          <a
            href={`tel:${content.contact.phone}`}
            className="px-4 py-2 text-white rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryColor }}
          >
            <Phone size={16} />
            <span>Hemen Ara</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-24 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto overflow-hidden">
        <div className="flex-1 space-y-6 animate-slide-in-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>Müşteri Memnuniyeti Odaklı Hizmet</span>
          </div>
          <EditableText
            text={content.hero.title}
            isEditMode={isEditMode}
            onChange={(val) => updateField('hero', 'title', val)}
            tagName="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900"
          />
          <EditableText
            text={content.hero.subtitle}
            isEditMode={isEditMode}
            onChange={(val) => updateField('hero', 'subtitle', val)}
            tagName="p"
            className="text-lg text-slate-600 max-w-xl font-normal leading-relaxed"
          />
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href={`tel:${content.contact.phone}`}
              className="px-8 py-3 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform flex items-center gap-3 font-semibold cursor-pointer"
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

        <div className="flex-1 w-full relative animate-zoom-in">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-2xl -rotate-2 scale-105"></div>
          <EditableImage
            src={content.images?.hero_bg || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600"}
            alt="Hero Background"
            isEditMode={isEditMode}
            onChange={(val) => updateField('images', 'hero_bg', val)}
            className="rounded-2xl shadow-xl w-full h-[380px] object-cover relative z-10"
          />
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <EditableImage
              src={content.images?.about_img || "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600"}
              alt="About"
              isEditMode={isEditMode}
              onChange={(val) => updateField('images', 'about_img', val)}
              className="rounded-2xl shadow-lg w-full h-[320px] object-cover"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="text-blue-600" size={28} />
              <span>Biz Kimiz?</span>
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
              className="text-slate-600 leading-relaxed text-lg"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Hizmetlerimiz</h2>
          <p className="text-slate-500">Geniş hizmet yelpazemiz ve garantili işçiliğimiz ile her zaman yanınızdayız.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.services.map((service: any, index: number) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4 relative group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                <ShieldCheck size={24} />
              </div>
              <EditableText
                text={service.title}
                isEditMode={isEditMode}
                onChange={(val) => updateService(index, 'title', val)}
                tagName="h3"
                className="text-xl font-bold text-slate-900"
              />
              <EditableText
                text={service.description}
                isEditMode={isEditMode}
                onChange={(val) => updateService(index, 'description', val)}
                tagName="p"
                className="text-slate-500 text-sm leading-relaxed"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-blue-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto md:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Müşterilerimizin Yorumları</h2>
            <p className="text-blue-200">Google Haritalar üzerinden aldığımız yüksek değerlendirmeler ve görüşler.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.testimonials.map((test: any, index: number) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative space-y-6 hover:bg-white/15 transition-colors">
                <EditableText
                  text={test.text}
                  isEditMode={isEditMode}
                  onChange={(val) => updateTestimonial(index, 'text', val)}
                  tagName="p"
                  className="italic text-blue-50 leading-relaxed"
                />
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-200 uppercase">
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
                    <p className="text-xs text-blue-300">Doğrulanmış Google Yorumu</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto md:px-12 grid md:grid-cols-2 gap-12 border-b border-slate-800 pb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck size={28} className="text-blue-500" />
              <span>{content.contact.company_name || 'Hizmet Noktası'}</span>
            </h2>
            <p className="text-slate-400 max-w-sm">Hemen bize ulaşın, profesyonel hizmetlerimizden yararlanarak sorunlarınızı hızlıca çözelim.</p>
            <div className="flex gap-4">
              <a
                href={`tel:${content.contact.phone}`}
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold inline-flex items-center gap-2 text-sm cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <Phone size={16} />
                <span>Bizi Arayın: {content.contact.phone}</span>
              </a>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <h3 className="text-white font-bold text-lg mb-4">İletişim Bilgileri</h3>
            <div className="flex items-start gap-3">
              <MapPin className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-slate-400 font-medium">Adres:</span>
                <EditableText
                  text={content.contact.address}
                  isEditMode={isEditMode}
                  onChange={(val) => updateField('contact', 'address', val)}
                  tagName="span"
                  className="text-slate-300"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-slate-400 font-medium">E-posta:</span>
                <EditableText
                  text={content.contact.email}
                  isEditMode={isEditMode}
                  onChange={(val) => updateField('contact', 'email', val)}
                  tagName="span"
                  className="text-slate-300"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-slate-400 font-medium">Çalışma Saatleri:</span>
                <EditableText
                  text={content.contact.hours}
                  isEditMode={isEditMode}
                  onChange={(val) => updateField('contact', 'hours', val)}
                  tagName="span"
                  className="text-slate-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {content.contact.company_name || 'Hizmet Noktası'}. Tüm Hakları Saklıdır.</p>
          <p>Yapay Zeka ile Tasarlanmıştır.</p>
        </div>
      </footer>
    </div>
  );
}
