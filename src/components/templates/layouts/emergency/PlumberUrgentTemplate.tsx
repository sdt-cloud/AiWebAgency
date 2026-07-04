import React from 'react';
import { Phone, Droplet, Camera, MapPin, MessageCircle, ShieldAlert, BadgeCheck } from 'lucide-react';
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

export default function PlumberUrgentTemplate({
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
    <div className="min-h-screen font-sans bg-blue-50/50 text-slate-800">
      {/* EMERGENCY CTA BAR */}
      <div className="bg-blue-600 text-white sticky top-0 z-50 rounded-b-3xl md:rounded-b-[50px] shadow-lg mx-2 md:mx-4 mt-2">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 font-bold">
            <Droplet className="w-6 h-6 animate-bounce" />
            <span className="text-lg">SU KAÇAĞI & ACİL TESİSAT</span>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <a href={`tel:${content.contact.phone}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-md hover:bg-blue-50 transition-colors">
              <Phone className="w-5 h-5" />
              <span>HEMEN ARA</span>
            </a>
            <a href={`https://wa.me/${content.contact.phone}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-green-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-24 pb-32 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-[40px] rounded-br-[120px] shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 z-0">
              <EditableImage
                src={content.images?.hero_bg || ''}
                alt="Plumbing Background"
                className="w-full h-full object-cover opacity-10"
                isEditMode={isEditMode}
                onUpdate={(val: string) => updateContent('images.hero_bg', val)}
              />
            </div>
            <div className="relative z-10 px-8 py-20 md:p-24 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl font-bold mb-6">
                <BadgeCheck className="w-5 h-5" />
                <EditableText
                  value={content.hero.badge_text || 'Kameralı Su Kaçağı Tespiti'}
                  isEditMode={isEditMode}
                  onChange={(val: string) => updateContent('hero.badge_text', val)}
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                <EditableText
                  value={content.hero.title}
                  isEditMode={isEditMode}
                  onChange={(val: string) => updateContent('hero.title', val)}
                />
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl">
                <EditableText
                  value={content.hero.subtitle}
                  isEditMode={isEditMode}
                  onChange={(val: string) => updateContent('hero.subtitle', val)}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-16 text-slate-900">Profesyonel Çözümler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-[30px] rounded-tl-[80px] shadow-sm hover:shadow-xl transition-shadow border border-blue-50 group">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  <EditableText
                    value={service.title}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent(`services.${index}.title`, val)}
                  />
                </h3>
                <p className="text-slate-600">
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
      
      {/* GALLERY / ABOUT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-extrabold mb-6 text-slate-900">Kırmadan Dökmeden Tespit</h2>
              <p className="text-lg text-slate-600 mb-8">
                <EditableText
                    value={content.about}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent('about', val)}
                  />
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-blue-50 p-6 rounded-3xl text-center">
                    <ShieldAlert className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                    <span className="font-bold block text-slate-800">Garantili İşlem</span>
                 </div>
                 <div className="bg-blue-50 p-6 rounded-3xl text-center">
                    <Droplet className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                    <span className="font-bold block text-slate-800">Temiz İşçilik</span>
                 </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[30px] rounded-tr-[80px] overflow-hidden aspect-square shadow-lg">
                  <EditableImage
                    src={content.images?.about_img || ''}
                    alt="Gallery 1"
                    className="w-full h-full object-cover"
                    isEditMode={isEditMode}
                    onUpdate={(val: string) => updateContent('images.about_img', val)}
                  />
                </div>
                <div className="rounded-[30px] rounded-bl-[80px] overflow-hidden aspect-square shadow-lg mt-12">
                   {/* Using hero_bg as a fallback for second image if gallery not present */}
                   <EditableImage
                    src={content.images?.hero_bg || ''}
                    alt="Gallery 2"
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

      {/* FOOTER */}
      <footer className="bg-blue-900 text-blue-100 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{content.contact.company_name}</h3>
            <p className="opacity-80 max-w-sm mx-auto md:mx-0">Modern cihazlarla su kaçağı tespiti ve profesyonel sıhhi tesisat hizmetleri.</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center gap-3 text-white text-2xl font-bold">
              <Phone className="w-6 h-6 text-blue-400" />
              <span>{content.contact.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>{content.contact.address}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
