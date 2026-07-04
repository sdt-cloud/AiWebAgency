'use client';

import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { GlassWater, MapPin, Music, Globe } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function RestaurantDarkTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const handleChange = (path: string, value: any) => {
    onUpdateContent({ ...content, [path]: value });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-[#ec4899] selection:text-white">
      {/* Glitch/Neon Header */}
      <header className="fixed w-full z-50 px-6 py-6 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter text-white uppercase relative">
          <EditableText
            content={content.hero?.title || 'NIGHTCLUB & BAR'}
            onUpdate={(val: string) => handleChange('hero.title', val)}
            isEditMode={isEditMode}
            multiline={false}
          />
          <div className="absolute -inset-1 bg-pink-500/20 blur-lg -z-10 rounded-full"></div>
        </div>
        <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]">
          VIP Booking
        </button>
      </header>

      {/* Cyberpunk/Dark Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-900/20 via-[#09090b] to-[#09090b]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-block border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 rounded-full text-pink-400 text-xs font-bold tracking-[0.2em] mb-8 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            FEEL THE VIBE
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-400 to-zinc-800 tracking-tighter leading-none mb-8">
            <EditableText
              content={content.hero?.subtitle || 'THE NIGHT IS YOUNG'}
              onUpdate={(val: string) => handleChange('hero.subtitle', val)}
              isEditMode={isEditMode}
            />
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light">
             <EditableText
              content={content.hero?.description || 'Immersive soundscapes, signature cocktails, and an unforgettable atmosphere. Step into the dark.'}
              onUpdate={(val: string) => handleChange('hero.description', val)}
              isEditMode={isEditMode}
            />
          </p>
        </div>
      </section>

      {/* Asymmetric Gallery / Features */}
      <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Card 1 */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group border border-white/5 bg-zinc-900/50 backdrop-blur-sm p-8 flex flex-col justify-end">
             <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                <EditableImage
                  src={content.about?.image}
                  alt="Atmosphere"
                  onUpdate={(val: string) => handleChange('about.image', val)}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-transparent z-10"></div>
             <div className="relative z-20">
               <h3 className="text-3xl font-bold text-white mb-3">
                  <EditableText
                    content={content.about?.title || 'Electric Atmosphere'}
                    onUpdate={(val: string) => handleChange('about.title', val)}
                    isEditMode={isEditMode}
                  />
               </h3>
               <p className="text-zinc-400 max-w-md">
                 <EditableText
                    content={content.about?.description || 'State of the art lighting and sound systems designed to make you lose yourself in the music.'}
                    onUpdate={(val: string) => handleChange('about.description', val)}
                    isEditMode={isEditMode}
                    multiline={true}
                  />
               </p>
             </div>
          </div>

          {/* Card 2 - Drinks */}
          <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/80 p-6 flex flex-col items-start justify-center hover:border-pink-500/30 transition-colors">
            <GlassWater size={32} className="text-pink-500 mb-6" />
            <h4 className="text-xl font-bold text-white mb-2">Signature Drinks</h4>
            <p className="text-zinc-500 text-sm">Mixology at its finest. Curated cocktails that push the boundaries.</p>
          </div>

          {/* Card 3 - Music */}
          <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/80 p-6 flex flex-col items-start justify-center hover:border-violet-500/30 transition-colors">
            <Music size={32} className="text-violet-500 mb-6" />
            <h4 className="text-xl font-bold text-white mb-2">Live DJs</h4>
            <p className="text-zinc-500 text-sm">Top tier artists and resident DJs spinning all night long.</p>
          </div>
        </div>
      </section>

      {/* Menu / Drinks - Neon List */}
      <section className="py-24 px-4 border-t border-white/5 bg-[#09090b]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center uppercase tracking-tight">
            The Bar
          </h2>
          <div className="space-y-6">
            {content.menu_items?.slice(0,6).map((item: any, index: number) => (
              <div key={index} className="group flex justify-between items-center p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900 hover:border-pink-500/30 transition-all">
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                     <EditableText
                        content={item.title}
                        onUpdate={(val: string) => {
                          const newItems = [...(content.menu_items || [])];
                          newItems[index] = { ...item, title: val };
                          handleChange('menu_items', newItems);
                        }}
                        isEditMode={isEditMode}
                      />
                  </h4>
                  <p className="text-sm text-zinc-500 mt-1">
                     <EditableText
                        content={item.description || ''}
                        onUpdate={(val: string) => {
                          const newItems = [...(content.menu_items || [])];
                          newItems[index] = { ...item, description: val };
                          handleChange('menu_items', newItems);
                        }}
                        isEditMode={isEditMode}
                      />
                  </p>
                </div>
                <div className="text-lg font-bold text-white bg-white/5 px-4 py-2 rounded-xl border border-white/10 group-hover:border-pink-500/50">
                  <EditableText
                    content={item.price || '$0'}
                    onUpdate={(val: string) => {
                      const newItems = [...(content.menu_items || [])];
                      newItems[index] = { ...item, price: val };
                      handleChange('menu_items', newItems);
                    }}
                    isEditMode={isEditMode}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-3xl font-black tracking-tighter text-white">
             <EditableText
              content={content.hero?.title || 'NIGHTCLUB'}
              onUpdate={(val: string) => handleChange('hero.title', val)}
              isEditMode={isEditMode}
              multiline={false}
            />
          </div>
          
          <div className="flex gap-10 text-sm font-bold text-zinc-400 uppercase tracking-widest">
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <MapPin size={16} /> Location
            </div>
            <div className="flex items-center gap-2 hover:text-pink-500 transition-colors cursor-pointer">
              <Globe size={16} /> Follow Us
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
