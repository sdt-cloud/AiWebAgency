'use client';

import React from 'react';
import { SectionBaseProps } from '../template-types';
import EditableText from '../EditableText';
import EditableImage from '../EditableImage';
import { ArrowRight, ChevronRight, Phone } from 'lucide-react';

export default function HeroSection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const handleTextUpdate = (field: string) => (newValue: string) => {
    onUpdateContent({
      ...content,
      hero: { ...content.hero, [field]: newValue }
    });
  };

  const handleImageUpdate = (newUrl: string) => {
    onUpdateContent({
      ...content,
      images: { ...content.images, hero_bg: newUrl }
    });
  };

  const defaultImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80";
  const bgImage = content.images?.hero_bg || defaultImage;

  // Render variant based on layoutStyle
  if (layoutStyle === 'neo-minimalist') {
    return (
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              {content.hero.badge_text && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/50 text-slate-700 font-medium text-sm mb-6">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeConfig.primary }}></span>
                  <EditableText
                    value={content.hero.badge_text}
                    onSave={handleTextUpdate('badge_text')}
                    isEditMode={isEditMode}
                    multiline={false}
                  />
                </div>
              )}
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                <EditableText
                  value={content.hero.title}
                  onSave={handleTextUpdate('title')}
                  isEditMode={isEditMode}
                />
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                <EditableText
                  value={content.hero.subtitle}
                  onSave={handleTextUpdate('subtitle')}
                  isEditMode={isEditMode}
                />
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all hover:opacity-90 hover:scale-105"
                  style={{ backgroundColor: themeConfig.primary }}
                >
                  <EditableText
                    value={content.hero.cta_text}
                    onSave={handleTextUpdate('cta_text')}
                    isEditMode={isEditMode}
                    multiline={false}
                  />
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-transparent rounded-[3rem] transform translate-x-4 translate-y-4"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
                <EditableImage
                  src={bgImage}
                  alt={content.hero.title}
                  onSave={handleImageUpdate}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (layoutStyle === 'glassmorphism') {
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={bgImage}
            alt="Hero Background"
            onSave={handleImageUpdate}
            isEditMode={isEditMode}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-16 rounded-[3rem] shadow-2xl max-w-4xl mx-auto">
            {content.hero.badge_text && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium tracking-wider uppercase mb-8">
                <EditableText
                  value={content.hero.badge_text}
                  onSave={handleTextUpdate('badge_text')}
                  isEditMode={isEditMode}
                  multiline={false}
                />
              </span>
            )}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight">
              <EditableText
                value={content.hero.title}
                onSave={handleTextUpdate('title')}
                isEditMode={isEditMode}
              />
            </h1>
            <p className="text-lg md:text-2xl text-white/80 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              <EditableText
                value={content.hero.subtitle}
                onSave={handleTextUpdate('subtitle')}
                isEditMode={isEditMode}
              />
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-semibold text-lg transition-all hover:bg-white/90 hover:scale-105"
            >
              <EditableText
                value={content.hero.cta_text}
                onSave={handleTextUpdate('cta_text')}
                isEditMode={isEditMode}
                multiline={false}
              />
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (layoutStyle === 'dark-futuristic') {
    return (
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#0a0a12]">
        {/* Grid pattern background */}
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#1e1e35 1px, transparent 1px), linear-gradient(90deg, #1e1e35 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 max-w-2xl">
              {content.hero.badge_text && (
                <div className="inline-block px-3 py-1 mb-6 border font-mono text-sm tracking-widest uppercase" style={{ color: themeConfig.primary, borderColor: themeConfig.primary }}>
                  <EditableText
                    value={content.hero.badge_text}
                    onSave={handleTextUpdate('badge_text')}
                    isEditMode={isEditMode}
                    multiline={false}
                  />
                </div>
              )}
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-[1]">
                <EditableText
                  value={content.hero.title}
                  onSave={handleTextUpdate('title')}
                  isEditMode={isEditMode}
                />
              </h1>
              <p className="text-xl text-slate-400 mb-10 font-light leading-relaxed max-w-lg">
                <EditableText
                  value={content.hero.subtitle}
                  onSave={handleTextUpdate('subtitle')}
                  isEditMode={isEditMode}
                />
              </p>
              <a 
                href="#contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-[#0a0a12] uppercase tracking-widest transition-all"
                style={{ 
                  backgroundColor: themeConfig.primary,
                  boxShadow: `0 0 20px ${themeConfig.primary}40`
                }}
              >
                <EditableText
                  value={content.hero.cta_text}
                  onSave={handleTextUpdate('cta_text')}
                  isEditMode={isEditMode}
                  multiline={false}
                />
                <ArrowRight size={20} />
              </a>
            </div>
            
            <div className="order-1 lg:order-2 relative aspect-[4/3] lg:aspect-square">
              {/* Glitch/Neon effect container */}
              <div className="absolute inset-0 border-2 translate-x-4 translate-y-4" style={{ borderColor: themeConfig.primary }}></div>
              <div className="relative w-full h-full overflow-hidden filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
                <EditableImage
                  src={bgImage}
                  alt={content.hero.title}
                  onSave={handleImageUpdate}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover mix-blend-luminosity"
                />
                <div className="absolute inset-0 mix-blend-color" style={{ backgroundColor: `${themeConfig.primary}40` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (layoutStyle === 'editorial-retro') {
    return (
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#faf7f2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            {content.hero.badge_text && (
              <span className="uppercase tracking-[0.2em] text-sm mb-6 block" style={{ color: themeConfig.secondary }}>
                <EditableText
                  value={content.hero.badge_text}
                  onSave={handleTextUpdate('badge_text')}
                  isEditMode={isEditMode}
                  multiline={false}
                />
              </span>
            )}
            <h1 className="text-6xl md:text-8xl font-serif text-[#2d2418] mb-8 leading-[1.1]">
              <EditableText
                value={content.hero.title}
                onSave={handleTextUpdate('title')}
                isEditMode={isEditMode}
              />
            </h1>
            <p className="text-xl md:text-2xl text-[#5c4f3d] mb-10 font-serif italic max-w-2xl mx-auto">
              <EditableText
                value={content.hero.subtitle}
                onSave={handleTextUpdate('subtitle')}
                isEditMode={isEditMode}
              />
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-[#2d2418] text-[#2d2418] font-serif uppercase tracking-widest transition-all hover:bg-[#2d2418] hover:text-[#faf7f2]"
            >
              <EditableText
                value={content.hero.cta_text}
                onSave={handleTextUpdate('cta_text')}
                isEditMode={isEditMode}
                multiline={false}
              />
            </a>
          </div>
          
          {/* Large prominent image with soft rounded arch shape */}
          <div className="relative max-w-5xl mx-auto aspect-[16/9] md:aspect-[2/1] rounded-t-full overflow-hidden shadow-2xl">
            <EditableImage
              src={bgImage}
              alt={content.hero.title}
              onSave={handleImageUpdate}
              isEditMode={isEditMode}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  // Neo-Brutalism
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#f5f0e8] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {content.hero.badge_text && (
              <div className="inline-block px-4 py-2 border-2 border-black bg-white font-bold uppercase mb-6 shadow-[4px_4px_0px_0px_#000]">
                <EditableText
                  value={content.hero.badge_text}
                  onSave={handleTextUpdate('badge_text')}
                  isEditMode={isEditMode}
                  multiline={false}
                />
              </div>
            )}
            <h1 className="text-6xl md:text-8xl font-black text-black mb-6 uppercase leading-none tracking-tighter" style={{ textShadow: `4px 4px 0px ${themeConfig.primary}` }}>
              <EditableText
                value={content.hero.title}
                onSave={handleTextUpdate('title')}
                isEditMode={isEditMode}
              />
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-800 mb-10 max-w-lg border-l-4 border-black pl-6 py-2">
              <EditableText
                value={content.hero.subtitle}
                onSave={handleTextUpdate('subtitle')}
                isEditMode={isEditMode}
              />
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-black border-4 border-black font-black text-xl uppercase transition-all shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px]"
              style={{ backgroundColor: themeConfig.primary }}
            >
              <EditableText
                value={content.hero.cta_text}
                onSave={handleTextUpdate('cta_text')}
                isEditMode={isEditMode}
                multiline={false}
              />
              <ArrowRight size={28} strokeWidth={3} />
            </a>
          </div>
          
          <div className="relative aspect-[4/3] border-4 border-black shadow-[16px_16px_0px_0px_#000] bg-white overflow-hidden">
            <EditableImage
              src={bgImage}
              alt={content.hero.title}
              onSave={handleImageUpdate}
              isEditMode={isEditMode}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
