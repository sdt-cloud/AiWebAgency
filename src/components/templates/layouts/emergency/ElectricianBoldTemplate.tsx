import React from 'react';
import { Phone, Zap, AlertTriangle, Hammer, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
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

export default function ElectricianBoldTemplate({
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
    <div className="min-h-screen font-sans bg-[#f4f4f0] text-black">
      {/* EMERGENCY CTA BAR */}
      <div className="bg-[#ffde00] border-b-4 border-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-black text-xl uppercase tracking-widest">
            <AlertTriangle className="w-7 h-7" />
            <span>ELEKTRİK ACİL</span>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <a href={`tel:${content.contact.phone}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-black text-[#ffde00] px-8 py-3 font-black uppercase tracking-wider border-2 border-black hover:bg-gray-900 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
              <Phone className="w-5 h-5 animate-pulse" />
              <span>{content.contact.phone}</span>
            </a>
            <a href={`https://wa.me/${content.contact.phone}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-black px-6 py-3 font-black uppercase tracking-wider border-2 border-black hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <MessageCircle className="w-5 h-5" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 border-b-4 border-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={content.images?.hero_bg || ''}
            alt="Electrician Background"
            className="w-full h-full object-cover opacity-20 grayscale mix-blend-multiply"
            isEditMode={isEditMode}
            onUpdate={(val: string) => updateContent('images.hero_bg', val)}
          />
          <div className="absolute inset-0 bg-[#ffde00]/80"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="inline-block bg-black text-[#ffde00] px-6 py-2 font-black text-lg uppercase tracking-widest mb-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
            <EditableText
              value={content.hero.badge_text || '7/24 HIZLI MÜDAHALE'}
              isEditMode={isEditMode}
              onChange={(val: string) => updateContent('hero.badge_text', val)}
            />
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter mb-8 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-white">
            <EditableText
              value={content.hero.title}
              isEditMode={isEditMode}
              onChange={(val: string) => updateContent('hero.title', val)}
            />
          </h1>
          <p className="text-2xl md:text-3xl font-bold max-w-3xl bg-white inline-block p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <EditableText
              value={content.hero.subtitle}
              isEditMode={isEditMode}
              onChange={(val: string) => updateContent('hero.subtitle', val)}
            />
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-16 tracking-tighter border-b-8 border-[#ffde00] inline-block pb-2">HİZMETLER</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => (
              <div key={index} className="bg-[#f4f4f0] p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="text-black mb-6 bg-[#ffde00] w-20 h-20 flex items-center justify-center border-4 border-black rounded-full">
                  <Zap className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black uppercase mb-4 leading-none">
                  <EditableText
                    value={service.title}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent(`services.${index}.title`, val)}
                  />
                </h3>
                <p className="text-lg font-bold text-gray-700">
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
      <section className="py-24 bg-[#ffde00]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden transform rotate-2">
                 <EditableImage
                    src={content.images?.about_img || ''}
                    alt="Hakkımızda"
                    className="w-full h-full object-cover grayscale contrast-125"
                    isEditMode={isEditMode}
                    onUpdate={(val: string) => updateContent('images.about_img', val)}
                  />
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-white p-10 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              <h2 className="text-5xl font-black uppercase mb-8">GARANTİLİ İŞÇİLİK</h2>
              <p className="text-xl font-bold text-gray-800 leading-relaxed mb-8">
                <EditableText
                    value={content.about}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent('about', val)}
                  />
              </p>
              <div className="flex gap-4">
                <div className="flex-1 bg-black text-white p-4 font-black uppercase text-center border-2 border-black">Sertifikalı</div>
                <div className="flex-1 bg-[#ffde00] text-black p-4 font-black uppercase text-center border-2 border-black">Hızlı Çözüm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-black text-[#ffde00] uppercase tracking-tighter mb-4">{content.contact.company_name}</h3>
            <p className="text-xl font-bold opacity-80">Elektrik arızalarında kesin çözüm merkezi.</p>
          </div>
          <div className="flex flex-col space-y-6 text-2xl font-black uppercase">
            <div className="flex items-center gap-4 text-[#ffde00]">
              <Phone className="w-8 h-8" />
              <span>{content.contact.phone}</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8" />
              <span>{content.contact.address}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
