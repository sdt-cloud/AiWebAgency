import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function PhotoDarkTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const fontBody = themeConfig.fontFamily || "'Space Grotesk', sans-serif";
  const accentColor = themeConfig.accent || "#FF2A2A"; // Neon Red
  
  const updateHero = (key: keyof typeof content.hero, value: string) => {
    onUpdateContent({ ...content, hero: { ...content.hero, [key]: value } });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden" style={{ fontFamily: fontBody }}>
      <nav className="fixed w-full z-50 p-6 md:p-12 flex justify-between items-start mix-blend-difference">
        <div className="font-bold text-2xl tracking-tighter uppercase">
          {content.contact.company_name || 'RAW STUDIO'}
        </div>
        <div className="flex flex-col items-end gap-2 text-sm font-bold uppercase tracking-widest">
          <a href="#work" className="hover:text-[#FF2A2A] transition-colors">Work</a>
          <a href="#about" className="hover:text-[#FF2A2A] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#FF2A2A] transition-colors">Contact</a>
        </div>
      </nav>

      <section className="relative w-full h-screen flex items-center">
        {/* Asymmetrical background image */}
        <div className="absolute top-0 right-0 w-[80%] md:w-[60%] h-full">
          <EditableImage
            src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80'}
            alt="Hero Background"
            isEditMode={isEditMode}
            onImageUpdate={(url) => onUpdateContent({ ...content, images: { ...content.images, hero_bg: url } })}
            className="w-full h-full object-cover filter contrast-125"
          />
          <div className="absolute inset-0 bg-[#FF2A2A] mix-blend-multiply opacity-20"></div>
        </div>

        <div className="relative z-10 p-6 md:p-24 max-w-5xl pointer-events-none">
          <div className="pointer-events-auto">
            {content.hero.badge_text && (
              <div className="mb-6 inline-block bg-[#FF2A2A] text-white px-3 py-1 font-bold text-xs uppercase tracking-widest transform -skew-x-12">
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
              className="text-7xl md:text-[9rem] font-black leading-[0.85] tracking-tighter uppercase mb-8 drop-shadow-[4px_4px_0_#FF2A2A]"
            />
            
            <div className="bg-black/80 backdrop-blur-md border-l-4 border-[#FF2A2A] p-6 max-w-lg">
              <EditableText
                text={content.hero.subtitle}
                isEditMode={isEditMode}
                onChange={(val: string) => updateHero('subtitle', val)}
                className="text-lg text-gray-300 font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {content.gallery_images && content.gallery_images.length > 0 && (
        <section id="work" className="py-32 px-6 md:px-24">
          <div className="flex flex-col gap-32">
            {content.gallery_images.map((img, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
                <div className="w-full md:w-2/3 relative group">
                  <div className="absolute inset-0 bg-[#FF2A2A] transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 z-0"></div>
                  <div className="relative z-10 aspect-[4/5] md:aspect-[16/9] w-full overflow-hidden bg-gray-900 filter grayscale group-hover:grayscale-0 transition-all duration-700">
                    <EditableImage
                      src={img.src}
                      alt={img.alt}
                      isEditMode={isEditMode}
                      onImageUpdate={(url) => {
                        const g = [...(content.gallery_images || [])];
                        g[idx].src = url;
                        onUpdateContent({ ...content, gallery_images: g });
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3 text-center md:text-left">
                  <span className="text-[#FF2A2A] font-bold text-6xl md:text-8xl opacity-50 block mb-4">0{idx + 1}</span>
                  <EditableText
                    text={img.alt}
                    isEditMode={isEditMode}
                    onChange={(val: string) => {
                      const g = [...(content.gallery_images || [])];
                      g[idx].alt = val;
                      onUpdateContent({ ...content, gallery_images: g });
                    }}
                    className="text-3xl md:text-5xl font-black uppercase tracking-tighter"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer id="contact" className="bg-[#FF2A2A] text-black py-24 px-6 md:px-24 mt-32">
        <h2 className="text-6xl md:text-[8rem] font-black leading-none tracking-tighter uppercase mb-16">
          Let's Talk
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-bold text-lg">
          <div>
            <p className="uppercase text-black/60 mb-2 text-sm">Email</p>
            <p className="text-2xl md:text-4xl">{content.contact.email}</p>
          </div>
          <div>
            <p className="uppercase text-black/60 mb-2 text-sm">Phone</p>
            <p className="text-2xl md:text-4xl">{content.contact.phone}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
