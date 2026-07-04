import React from 'react';
import { Phone, Clock, Key, Shield, MapPin, MessageCircle } from 'lucide-react';
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

export default function LocksmithUrgentTemplate({
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
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* EMERGENCY CTA BAR */}
      <div className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 font-extrabold text-lg animate-pulse tracking-wide">
            <Clock className="w-6 h-6" />
            <span>ACİL DURUM: 15 DAKİKADA KAPINIZDAYIZ!</span>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <a href={`tel:${content.contact.phone}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-bold shadow-xl hover:bg-red-50 hover:scale-105 transition-all">
              <Phone className="w-6 h-6 animate-bounce" />
              <span>HEMEN ARA</span>
            </a>
            <a href={`https://wa.me/${content.contact.phone}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-xl hover:bg-green-400 hover:scale-105 transition-all">
              <MessageCircle className="w-6 h-6" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={content.images?.hero_bg || ''}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-15"
            isEditMode={isEditMode}
            onUpdate={(val: string) => updateContent('images.hero_bg', val)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2 rounded-full font-bold mb-8 shadow-sm">
            <Shield className="w-5 h-5" />
            <EditableText
              value={content.hero.badge_text || 'Güvenilir Çilingir Hizmeti'}
              isEditMode={isEditMode}
              onChange={(val: string) => updateContent('hero.badge_text', val)}
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
            <EditableText
              value={content.hero.title}
              isEditMode={isEditMode}
              onChange={(val: string) => updateContent('hero.title', val)}
            />
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium mb-10 max-w-3xl mx-auto">
            <EditableText
              value={content.hero.subtitle}
              isEditMode={isEditMode}
              onChange={(val: string) => updateContent('hero.subtitle', val)}
            />
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-slate-50 relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Hizmetlerimiz</h2>
            <div className="w-24 h-1.5 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Key className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900">
                  <EditableText
                    value={service.title}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent(`services.${index}.title`, val)}
                  />
                </h3>
                <p className="text-slate-600 leading-relaxed">
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-red-100 rounded-[3rem] transform -rotate-3 -z-10"></div>
              <div className="rounded-[2.5rem] overflow-hidden aspect-square md:aspect-video lg:aspect-square shadow-xl">
                 <EditableImage
                    src={content.images?.about_img || ''}
                    alt="Hakkımızda"
                    className="w-full h-full object-cover"
                    isEditMode={isEditMode}
                    onUpdate={(val: string) => updateContent('images.about_img', val)}
                  />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">Hızlı, Güvenilir, Profesyonel</h2>
              <div className="w-20 h-1.5 bg-red-500 mb-8 rounded-full"></div>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                <EditableText
                    value={content.about}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent('about', val)}
                  />
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-red-500"><Shield className="w-6 h-6"/></div>
                  <span className="font-bold text-slate-800">Hasarsız Kapı Açma Garantisi</span>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-red-500"><Clock className="w-6 h-6"/></div>
                  <span className="font-bold text-slate-800">7 Gün 24 Saat Nöbetçi Çilingir</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-black text-white mb-6">{content.contact.company_name}</h3>
            <p className="mb-8 text-slate-400 max-w-sm leading-relaxed">Güvenliğiniz bizim önceliğimiz. 7/24 kesintisiz profesyonel ve lisanslı çilingir hizmeti sunuyoruz.</p>
          </div>
          <div className="flex flex-col space-y-6">
            <a href={`tel:${content.contact.phone}`} className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-white text-2xl font-bold group-hover:text-red-400 transition-colors">{content.contact.phone}</span>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-800 text-slate-300 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-lg">{content.contact.address}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
