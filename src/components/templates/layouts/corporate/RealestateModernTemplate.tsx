import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { MapPin, ArrowRight, Home } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function RealestateModernTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const primaryColor = themeConfig.primary || '#059669'; // Emerald green
  const fontBody = themeConfig.fontFamily || "'Outfit', sans-serif";
  
  const updateHero = (key: keyof typeof content.hero, value: string) => {
    onUpdateContent({ ...content, hero: { ...content.hero, [key]: value } });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: fontBody }}>
      <nav className="absolute w-full z-50 p-6 flex justify-between items-center text-white">
        <div className="flex items-center gap-3 font-bold text-2xl tracking-tighter">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-md">
            <Home className="w-6 h-6" />
          </div>
          {content.contact.company_name || 'Emlak Modern'}
        </div>
        <div className="hidden md:flex gap-6 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium">
          <a href="#properties" className="hover:text-emerald-300 transition-colors">İlanlar</a>
          <a href="#services" className="hover:text-emerald-300 transition-colors">Hizmetler</a>
          <a href="#contact" className="hover:text-emerald-300 transition-colors">İletişim</a>
        </div>
      </nav>

      <section className="relative h-screen min-h-[600px] flex items-end pb-24 px-6 md:px-12">
        <div className="absolute inset-0">
          <EditableImage
            src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80'}
            alt="Real Estate Hero"
            isEditMode={isEditMode}
            onImageUpdate={(url) => onUpdateContent({ ...content, images: { ...content.images, hero_bg: url } })}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl text-white">
            {content.hero.badge_text && (
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
                <EditableText
                  text={content.hero.badge_text}
                  isEditMode={isEditMode}
                  onChange={(val: string) => updateHero('badge_text', val)}
                />
              </span>
            )}
            <EditableText
              text={content.hero.title}
              isEditMode={isEditMode}
              onChange={(val: string) => updateHero('title', val)}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
            />
            <EditableText
              text={content.hero.subtitle}
              isEditMode={isEditMode}
              onChange={(val: string) => updateHero('subtitle', val)}
              className="text-xl text-slate-300 font-light"
            />
          </div>
          
          <button 
            className="shrink-0 w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-400 hover:scale-105 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {content.listings && content.listings.length > 0 && (
        <section id="properties" className="py-24 overflow-hidden pl-6 md:pl-12">
          <div className="flex items-center justify-between pr-6 md:pr-12 mb-12 max-w-7xl mx-auto ml-0">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">Öne Çıkan İlanlar</h2>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar pr-6 md:pr-12">
            {content.listings.map((listing, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[85vw] md:w-[400px] group rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                <div className="relative h-64 overflow-hidden">
                  <EditableImage
                    src={listing.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80'}
                    alt={listing.title}
                    isEditMode={isEditMode}
                    onImageUpdate={(url) => {
                      const l = [...(content.listings || [])];
                      l[idx].image = url;
                      onUpdateContent({ ...content, listings: l });
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-slate-900">
                    <EditableText
                      text={listing.price}
                      isEditMode={isEditMode}
                      onChange={(val: string) => {
                        const l = [...(content.listings || [])];
                        l[idx].price = val;
                        onUpdateContent({ ...content, listings: l });
                      }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4" />
                    <EditableText
                      text={listing.location}
                      isEditMode={isEditMode}
                      onChange={(val: string) => {
                        const l = [...(content.listings || [])];
                        l[idx].location = val;
                        onUpdateContent({ ...content, listings: l });
                      }}
                    />
                  </div>
                  <EditableText
                    text={listing.title}
                    isEditMode={isEditMode}
                    onChange={(val: string) => {
                      const l = [...(content.listings || [])];
                      l[idx].title = val;
                      onUpdateContent({ ...content, listings: l });
                    }}
                    className="text-xl font-bold text-slate-900 mb-3"
                  />
                  <EditableText
                    text={listing.features}
                    isEditMode={isEditMode}
                    onChange={(val: string) => {
                      const l = [...(content.listings || [])];
                      l[idx].features = val;
                      onUpdateContent({ ...content, listings: l });
                    }}
                    className="text-slate-500 text-sm bg-slate-100 inline-block px-3 py-1 rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer id="contact" className="bg-slate-900 text-white py-20 px-6 md:px-12 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">{content.contact.company_name}</h2>
            <EditableText
              text={content.about}
              isEditMode={isEditMode}
              onChange={(val: string) => onUpdateContent({ ...content, about: val })}
              className="text-slate-400 max-w-md leading-relaxed mb-8"
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-emerald-400 mb-4">Bize Ulaşın</h4>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li>{content.contact.phone}</li>
                <li>{content.contact.email}</li>
                <li className="whitespace-pre-line">{content.contact.address}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-emerald-400 mb-4">Saatler</h4>
              <p className="whitespace-pre-line text-slate-300 text-sm">{content.contact.hours}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
