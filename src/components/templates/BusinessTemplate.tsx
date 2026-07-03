import React from 'react';
import { Phone, MapPin, Mail, Clock, Building, CheckCircle, ArrowRight } from 'lucide-react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

interface BusinessTemplateProps {
  content: any;
  themeConfig: {
    primary: string;
    secondary: string;
    fontFamily: string;
  };
  isEditMode: boolean;
  onUpdateContent: (newContent: any) => void;
}

export default function BusinessTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: BusinessTemplateProps) {
  const primaryColor = themeConfig.primary || '#4f46e5';
  const secondaryColor = themeConfig.secondary || '#818cf8';

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
    <div className="min-h-screen bg-slate-50 text-slate-800" style={{ fontFamily: themeConfig.fontFamily || 'Inter, sans-serif' }}>
      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-40 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold flex items-center gap-2" style={{ color: primaryColor }}>
          <Building size={24} />
          <span>{content.contact.company_name || 'Kurumsal Çözümler'}</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <a href="#about" className="hover:text-indigo-600 transition-colors">Hakkımızda</a>
          <a href="#services" className="hover:text-indigo-600 transition-colors">Hizmetlerimiz</a>
          <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Referanslar</a>
          <a
            href={`tel:${content.contact.phone}`}
            className="px-5 py-2 text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryColor }}
          >
            <Phone size={14} />
            <span>Bize Ulaşın</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold uppercase tracking-wider border border-slate-200">
            <CheckCircle size={14} className="text-indigo-600" />
            <span>Profesyonel İş Ortağınız</span>
          </div>
          <EditableText
            text={content.hero.title}
            isEditMode={isEditMode}
            onChange={(val) => updateField('hero', 'title', val)}
            tagName="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight"
          />
          <EditableText
            text={content.hero.subtitle}
            isEditMode={isEditMode}
            onChange={(val) => updateField('hero', 'subtitle', val)}
            tagName="p"
            className="text-lg text-slate-600 max-w-lg font-normal leading-relaxed"
          />
          <div className="pt-4">
            <a
              href={`tel:${content.contact.phone}`}
              className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-semibold w-fit cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <EditableText
                text={content.hero.cta_text}
                isEditMode={isEditMode}
                onChange={(val) => updateField('hero', 'cta_text', val)}
              />
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-25"></div>
          <EditableImage
            src={content.images?.hero_bg || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"}
            alt="Hero Background"
            isEditMode={isEditMode}
            onChange={(val) => updateField('images', 'hero_bg', val)}
            className="rounded-2xl shadow-xl w-full h-[360px] object-cover relative z-10"
          />
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="bg-white py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <EditableImage
              src={content.images?.about_img || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600"}
              alt="About"
              isEditMode={isEditMode}
              onChange={(val) => updateField('images', 'about_img', val)}
              className="rounded-2xl shadow-md w-full h-[300px] object-cover"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Building className="text-indigo-600" size={24} />
              <span>Hakkımızda</span>
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
          <h2 className="text-3xl font-bold text-slate-900">Çözümlerimiz</h2>
          <p className="text-slate-500">Kendi alanında uzmanlaşmış ekibimiz ile işletmeniz için katma değer üretiyoruz.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.services.map((service: any, index: number) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <CheckCircle size={20} />
              </div>
              <EditableText
                text={service.title}
                isEditMode={isEditMode}
                onChange={(val) => updateService(index, 'title', val)}
                tagName="h3"
                className="text-lg font-bold text-slate-900"
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
      <section id="testimonials" className="bg-slate-900 text-slate-300 py-20 px-6">
        <div className="max-w-7xl mx-auto md:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Müşteri Yorumları</h2>
            <p className="text-slate-400">Hizmet verdiğimiz profesyonel kuruluşların değerlendirmeleri.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.testimonials.map((test: any, index: number) => (
              <div key={index} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 space-y-6">
                <EditableText
                  text={test.text}
                  isEditMode={isEditMode}
                  onChange={(val) => updateTestimonial(index, 'text', val)}
                  tagName="p"
                  className="italic text-slate-200 leading-relaxed"
                />
                <div className="flex items-center gap-3 border-t border-slate-700 pt-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-300 uppercase">
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
                    <p className="text-xs text-indigo-400">İş Ortağı</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto md:px-12 grid md:grid-cols-2 gap-12 border-b border-slate-800 pb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Building size={24} className="text-indigo-500" />
              <span>{content.contact.company_name || 'Kurumsal Çözümler'}</span>
            </h2>
            <p className="text-slate-500 max-w-sm">Daha fazla bilgi veya danışmanlık talebi için doğrudan iletişime geçebilirsiniz.</p>
            <a
              href={`tel:${content.contact.phone}`}
              className="px-5 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold inline-flex items-center gap-2 text-sm cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Phone size={16} />
              <span>Arayın: {content.contact.phone}</span>
            </a>
          </div>

          <div className="space-y-4 text-sm">
            <h3 className="text-white font-bold text-lg mb-4">Bize Ulaşın</h3>
            
            <div className="flex items-start gap-3">
              <MapPin className="text-indigo-500 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-slate-500 font-medium">Adres:</span>
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
              <Mail className="text-indigo-500 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-slate-500 font-medium">E-posta:</span>
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
              <Clock className="text-indigo-500 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="block text-slate-500 font-medium">Çalışma Saatleri:</span>
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

        <div className="max-w-7xl mx-auto md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} {content.contact.company_name || 'Kurumsal Çözümler'}. Tüm Hakları Saklıdır.</p>
          <p>AI Jeneratör ile Tasarlanmıştır.</p>
        </div>
      </footer>
    </div>
  );
}
