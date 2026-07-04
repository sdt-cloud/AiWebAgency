import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { ChevronRight, Landmark, FileText, Phone, Mail, MapPin } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function LawClassicTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const primaryColor = themeConfig.primary || '#1e3a8a';
  const fontBody = themeConfig.fontFamily || "'Inter', sans-serif";
  const fontHead = themeConfig.fontFamilyHeading || "'Merriweather', serif";

  const updateHero = (key: keyof typeof content.hero, value: string) => {
    onUpdateContent({ ...content, hero: { ...content.hero, [key]: value } });
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: fontBody }}>
      <div className="bg-slate-900 text-slate-300 py-2 text-xs">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3"/> {content.contact.phone}</span>
            <span className="flex items-center gap-2 hidden md:flex"><Mail className="w-3 h-3"/> {content.contact.email}</span>
          </div>
          <div>{content.contact.hours}</div>
        </div>
      </div>

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Landmark className="w-8 h-8" style={{ color: primaryColor }} />
            <span className="text-xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: fontHead }}>
              {content.contact.company_name || 'Hukuk & Danışmanlık'}
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
            <a href="#about" className="hover:text-blue-800 transition-colors">Hakkımızda</a>
            <a href="#services" className="hover:text-blue-800 transition-colors">Hizmetlerimiz</a>
            <a href="#contact" className="hover:text-blue-800 transition-colors">İletişim</a>
          </nav>
        </div>
      </header>

      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <EditableImage
            src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1505664173615-04f1bef73db4?auto=format&fit=crop&q=80'}
            alt="Hero Background"
            isEditMode={isEditMode}
            onImageUpdate={(url) => onUpdateContent({ ...content, images: { ...content.images, hero_bg: url } })}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl bg-white/10 backdrop-blur-sm p-8 md:p-12 border-l-4" style={{ borderColor: primaryColor }}>
            {content.hero.badge_text && (
              <EditableText
                text={content.hero.badge_text}
                isEditMode={isEditMode}
                onChange={(val: string) => updateHero('badge_text', val)}
                className="text-blue-300 font-semibold uppercase tracking-wider text-sm mb-4"
              />
            )}
            <EditableText
              text={content.hero.title}
              isEditMode={isEditMode}
              onChange={(val: string) => updateHero('title', val)}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: fontHead }}
            />
            <EditableText
              text={content.hero.subtitle}
              isEditMode={isEditMode}
              onChange={(val: string) => updateHero('subtitle', val)}
              className="text-lg text-slate-200 mb-8"
            />
            <button 
              className="bg-white text-slate-900 px-8 py-3 font-semibold flex items-center gap-2 hover:bg-slate-100 transition-colors"
              style={{ color: primaryColor }}
            >
              {content.hero.cta_text} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: fontHead }}>Çalışma Alanlarımız</h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: primaryColor }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-slate-200 bg-white">
            {content.services.map((service, idx) => (
              <div key={idx} className="p-8 border-b border-r border-slate-100 hover:bg-slate-50 transition-colors">
                <FileText className="w-8 h-8 mb-4 opacity-70" style={{ color: primaryColor }} />
                <EditableText
                  text={service.title}
                  isEditMode={isEditMode}
                  onChange={(val: string) => {
                    const s = [...content.services];
                    s[idx].title = val;
                    onUpdateContent({ ...content, services: s });
                  }}
                  className="text-xl font-bold text-slate-900 mb-3"
                  style={{ fontFamily: fontHead }}
                />
                <EditableText
                  text={service.description}
                  isEditMode={isEditMode}
                  onChange={(val: string) => {
                    const s = [...content.services];
                    s[idx].description = val;
                    onUpdateContent({ ...content, services: s });
                  }}
                  className="text-slate-600 text-sm leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-slate-900 pt-16 pb-8 text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-white text-lg font-bold mb-6" style={{ fontFamily: fontHead }}>{content.contact.company_name}</h3>
            <EditableText
              text={content.about}
              isEditMode={isEditMode}
              onChange={(val: string) => onUpdateContent({ ...content, about: val })}
              className="leading-relaxed"
            />
          </div>
          <div>
            <h4 className="text-white text-base font-bold mb-6" style={{ fontFamily: fontHead }}>İletişim Bilgileri</h4>
            <div className="space-y-4">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" /> 
                <span className="whitespace-pre-line">{content.contact.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" /> {content.contact.phone}
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" /> {content.contact.email}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white text-base font-bold mb-6" style={{ fontFamily: fontHead }}>Çalışma Saatleri</h4>
            <p className="whitespace-pre-line">{content.contact.hours}</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-slate-800 text-center">
          &copy; {new Date().getFullYear()} {content.contact.company_name}. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
