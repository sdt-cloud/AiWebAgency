'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import EditableImage from '../EditableImage';

export default function AboutSection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  const handleTextUpdate = (newValue: string) => {
    onUpdateContent({ ...content, about: newValue });
  };

  const handleImageUpdate = (newUrl: string) => {
    onUpdateContent({
      ...content,
      images: { ...content.images, about_img: newUrl }
    });
  };

  const defaultImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80";
  const aboutImage = content.images?.about_img || defaultImage;

  // Neo-Minimalist (Temiz, dengeli, bol beyaz alan)
  if (layoutStyle === 'neo-minimalist') {
    return (
      <section id="about" className={`py-24 bg-white ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
              <EditableImage
                src={aboutImage}
                alt="Hakkımızda"
                onSave={handleImageUpdate}
                isEditMode={isEditMode}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: themeConfig.primary }}>
                Hakkımızda
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                İşinizi ve Hikayenizi Anlatın
              </h3>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                <EditableText
                  value={content.about}
                  onSave={handleTextUpdate}
                  isEditMode={isEditMode}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Glassmorphism (Bulanık arka planlar, şeffaflık)
  if (layoutStyle === 'glassmorphism') {
    return (
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/60">
                  Biz Kimiz?
                </h2>
                <div className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                  <EditableText
                    value={content.about}
                    onSave={handleTextUpdate}
                    isEditMode={isEditMode}
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)] aspect-square md:aspect-[4/3] ring-1 ring-white/20">
                  <EditableImage
                    src={aboutImage}
                    alt="Hakkımızda"
                    onSave={handleImageUpdate}
                    isEditMode={isEditMode}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Dark Futuristic (Koyu arka plan, neon vurgular)
  if (layoutStyle === 'dark-futuristic') {
    return (
      <section id="about" className={`py-24 bg-[#0a0a12] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 border border-[#1e1e35] transform -skew-x-6 z-0"></div>
              <div className="relative z-10 aspect-square filter contrast-125 grayscale hover:grayscale-0 transition-all duration-700 border border-[#1e1e35]">
                <EditableImage
                  src={aboutImage}
                  alt="Hakkımızda"
                  onSave={handleImageUpdate}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2" style={{ borderColor: themeConfig.primary }}></div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-4 mb-6">
                <span className="w-12 h-[2px]" style={{ backgroundColor: themeConfig.primary }}></span>
                <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: themeConfig.primary }}>Hikayemiz</span>
              </div>
              <div className="text-lg text-slate-300 font-light leading-loose">
                <EditableText
                  value={content.about}
                  onSave={handleTextUpdate}
                  isEditMode={isEditMode}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Editorial & Retro-Modern (Sıcak tonlar, klasik gazete/dergi dizgisi)
  if (layoutStyle === 'editorial-retro') {
    return (
      <section id="about" className={`py-24 bg-white ${layoutConfig.sectionDivider}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2d2418] mb-6">Hakkımızda</h2>
            <div className="w-16 h-px bg-[#2d2418] mx-auto opacity-30"></div>
          </div>
          
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 md:mt-12">
              <div className="p-8 bg-[#faf7f2] border border-[#e8e0d4] rounded-t-full shadow-sm relative">
                <div className="aspect-[3/4] rounded-t-full overflow-hidden filter sepia-[0.2]">
                  <EditableImage
                    src={aboutImage}
                    alt="Hakkımızda"
                    onSave={handleImageUpdate}
                    isEditMode={isEditMode}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-7">
              <div className="text-xl md:text-2xl text-[#5c4f3d] font-serif leading-relaxed first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#2d2418] first-line:uppercase first-line:tracking-widest">
                <EditableText
                  value={content.about}
                  onSave={handleTextUpdate}
                  isEditMode={isEditMode}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Neo-Brutalism (Sert, kalın çizgiler, yüksek kontrast)
  return (
    <section id="about" className={`py-24 bg-[#f5f0e8] border-b-4 border-black`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-4 border-black bg-white shadow-[16px_16px_0px_0px_#000] p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-black text-white font-bold uppercase mb-8 transform -rotate-2">
                BİZ KİMİZ?
              </div>
              <div className="text-xl md:text-2xl font-bold text-black leading-snug border-l-4 border-black pl-6 py-2" style={{ borderColor: themeConfig.primary }}>
                <EditableText
                  value={content.about}
                  onSave={handleTextUpdate}
                  isEditMode={isEditMode}
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-square border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden filter contrast-125 saturate-150 transform rotate-2 hover:rotate-0 transition-transform">
                <EditableImage
                  src={aboutImage}
                  alt="Hakkımızda"
                  onSave={handleImageUpdate}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
