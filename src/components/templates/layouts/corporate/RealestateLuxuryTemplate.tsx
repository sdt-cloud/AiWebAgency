import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { MoveRight } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function RealestateLuxuryTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const fontBody = themeConfig.fontFamily || "'Inter', sans-serif";
  const fontHead = themeConfig.fontFamilyHeading || "'Playfair Display', serif";

  const updateHero = (key: keyof typeof content.hero, value: string) => {
    onUpdateContent({ ...content, hero: { ...content.hero, [key]: value } });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A]" style={{ fontFamily: fontBody }}>
      <header className="fixed w-full z-50 mix-blend-difference text-white p-8">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <div className="text-2xl tracking-[0.3em] uppercase" style={{ fontFamily: fontHead }}>
            {content.contact.company_name || 'LUXE ESTATES'}
          </div>
          <div className="uppercase tracking-widest text-xs flex gap-8">
            <span>Portfolio</span>
            <span>Agency</span>
            <span>Contact</span>
          </div>
        </div>
      </header>

      <section className="h-screen w-full relative p-4 md:p-8">
        <div className="w-full h-full relative overflow-hidden">
          <EditableImage
            src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80'}
            alt="Luxury Property"
            isEditMode={isEditMode}
            onImageUpdate={(url) => onUpdateContent({ ...content, images: { ...content.images, hero_bg: url } })}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <div className="max-w-4xl">
              {content.hero.badge_text && (
                <div className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4">
                  <EditableText
                    text={content.hero.badge_text}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateHero('badge_text', val)}
                  />
                </div>
              )}
              <EditableText
                text={content.hero.title}
                isEditMode={isEditMode}
                onChange={(val: string) => updateHero('title', val)}
                className="text-6xl md:text-8xl tracking-tight leading-[0.9] mb-8"
                style={{ fontFamily: fontHead }}
              />
              <div className="flex items-center gap-8 border-t border-white/30 pt-6">
                <EditableText
                  text={content.hero.subtitle}
                  isEditMode={isEditMode}
                  onChange={(val: string) => updateHero('subtitle', val)}
                  className="text-lg font-light max-w-lg"
                />
                <button className="ml-auto w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                  <MoveRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {content.listings && content.listings.length > 0 && (
        <section className="py-32 px-8 max-w-screen-2xl mx-auto">
          <div className="mb-20 flex justify-between items-end border-b border-black/10 pb-8">
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: fontHead }}>Exclusive Collection</h2>
            <span className="tracking-widest uppercase text-xs text-gray-500">View All Properties</span>
          </div>

          <div className="space-y-32">
            {content.listings.map((listing, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center group">
                <div className={`md:col-span-7 overflow-hidden ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-1000">
                    <EditableImage
                      src={listing.image || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80'}
                      alt={listing.title}
                      isEditMode={isEditMode}
                      onImageUpdate={(url) => {
                        const l = [...(content.listings || [])];
                        l[idx].image = url;
                        onUpdateContent({ ...content, listings: l });
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className={`md:col-span-5 flex flex-col justify-center ${idx % 2 === 1 ? 'md:order-1 items-end text-right' : 'items-start text-left'}`}>
                  <div className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-4">
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
                    className="text-4xl md:text-5xl mb-6"
                    style={{ fontFamily: fontHead }}
                  />
                  <EditableText
                    text={listing.price}
                    isEditMode={isEditMode}
                    onChange={(val: string) => {
                      const l = [...(content.listings || [])];
                      l[idx].price = val;
                      onUpdateContent({ ...content, listings: l });
                    }}
                    className="text-2xl mb-8 font-light"
                  />
                  <EditableText
                    text={listing.features}
                    isEditMode={isEditMode}
                    onChange={(val: string) => {
                      const l = [...(content.listings || [])];
                      l[idx].features = val;
                      onUpdateContent({ ...content, listings: l });
                    }}
                    className="text-gray-500 uppercase tracking-widest text-xs border border-gray-300 px-4 py-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="bg-[#111] text-white py-32 px-8">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-6xl mb-8" style={{ fontFamily: fontHead }}>{content.contact.company_name}</h2>
            <EditableText
              text={content.about}
              isEditMode={isEditMode}
              onChange={(val: string) => onUpdateContent({ ...content, about: val })}
              className="text-gray-400 font-light max-w-md leading-relaxed"
            />
          </div>
          <div className="grid grid-cols-2 gap-12 uppercase tracking-widest text-xs">
            <div>
              <h4 className="text-[#D4AF37] mb-8">Inquiries</h4>
              <ul className="space-y-4 text-gray-400">
                <li>{content.contact.phone}</li>
                <li>{content.contact.email}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#D4AF37] mb-8">Office</h4>
              <p className="text-gray-400 whitespace-pre-line leading-relaxed">
                {content.contact.address}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
