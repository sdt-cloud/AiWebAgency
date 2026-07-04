import React from 'react';
import { Phone, Cpu, Home, Zap, Shield, MapPin, MessageCircle, Activity, ChevronRight } from 'lucide-react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import type { TemplateContent, ThemeConfig } from '../../template-types';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function ElectricianProTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: Props) {
  const updateContent = (path: string, value: string) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let curr = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!curr[keys[i]]) curr[keys[i]] = {};
      curr = curr[keys[i]];
    }
    curr[keys[keys.length - 1]] = value;
    onUpdateContent(newContent);
  };

  return (
    <div className="min-h-screen font-sans bg-[#f8fafc] text-slate-800">
      {/* HEADER / CTA */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Activity className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">{content.contact.company_name || 'ProElektrik'}</span>
          </div>
          <div className="flex gap-4">
            <a href={`tel:${content.contact.phone}`} className="hidden md:flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold transition-colors">
              <Phone className="w-5 h-5" />
              <span>{content.contact.phone}</span>
            </a>
            <a href={`https://wa.me/${content.contact.phone}`} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm">
              <MessageCircle className="w-5 h-5" />
              <span>İletişime Geç</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-24 pb-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
                <Cpu className="w-4 h-4" />
                <EditableText
                  value={content.hero.badge_text || 'Akıllı Sistemler & Pano Kurulumu'}
                  isEditMode={isEditMode}
                  onChange={(val: string) => updateContent('hero.badge_text', val)}
                />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                <EditableText
                  value={content.hero.title}
                  isEditMode={isEditMode}
                  onChange={(val: string) => updateContent('hero.title', val)}
                />
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-light">
                <EditableText
                  value={content.hero.subtitle}
                  isEditMode={isEditMode}
                  onChange={(val: string) => updateContent('hero.subtitle', val)}
                />
              </p>
              <div className="flex gap-4">
                 <a href={`tel:${content.contact.phone}`} className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors">
                    Hemen Ara <ChevronRight className="w-5 h-5" />
                 </a>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-indigo-100 rounded-[2rem] transform translate-x-4 translate-y-4 -z-10"></div>
              <div className="bg-white p-2 rounded-[2rem] shadow-xl border border-slate-100">
                <div className="rounded-[1.5rem] overflow-hidden aspect-[4/3]">
                   <EditableImage
                      src={content.images?.hero_bg || ''}
                      alt="Smart Home Tech"
                      className="w-full h-full object-cover"
                      isEditMode={isEditMode}
                      onUpdate={(val: string) => updateContent('images.hero_bg', val)}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Teknolojik & Güvenilir Çözümler</h2>
            <p className="text-lg text-slate-500">Gelişmiş elektrik altyapısı ve akıllı ev sistemleri için profesyonel mühendislik hizmeti.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => (
              <div key={index} className="bg-[#f8fafc] p-8 rounded-2xl hover:bg-indigo-50 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">
                  <EditableText
                    value={service.title}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent(`services.${index}.title`, val)}
                  />
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  <EditableText
                    value={service.description}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent(`services.${index}.description`, val)}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ABOUT */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 text-slate-900">Standartlara Uygun Projelendirme</h2>
          <p className="text-xl text-slate-500 leading-relaxed mb-12 font-light">
            <EditableText
                value={content.about}
                isEditMode={isEditMode}
                onChange={(val: string) => updateContent('about', val)}
              />
          </p>
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
             <EditableImage
                src={content.images?.about_img || ''}
                alt="Proje"
                className="w-full h-full object-cover"
                isEditMode={isEditMode}
                onUpdate={(val: string) => updateContent('images.about_img', val)}
              />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <Activity className="w-6 h-6 text-indigo-500" />
              <h3 className="text-xl font-bold text-white tracking-tight">{content.contact.company_name || 'ProElektrik'}</h3>
            </div>
            <p className="text-sm text-slate-500">Geleceğin elektrik altyapısı.</p>
          </div>
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-500" />
              <span className="text-slate-300">{content.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500" />
              <span className="text-slate-300">{content.contact.address}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
