'use client';

import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Sparkles, MapPin, Phone, Globe } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function PatisserieElegantTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const handleChange = (path: string, value: any) => {
    onUpdateContent({ ...content, [path]: value });
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-serif selection:bg-[#d4af37] selection:text-white border-[12px] border-[#f8f8f8] relative">
      {/* Decorative Outer Border */}
      <div className="fixed inset-3 border border-[#d4af37]/30 pointer-events-none z-50"></div>

      {/* Elegant Centered Header */}
      <header className="pt-16 pb-10 text-center relative z-40 bg-white/90 backdrop-blur-sm">
        <div className="text-sm font-sans tracking-[0.3em] text-[#d4af37] uppercase mb-4">
          Maison Fondée en 2024
        </div>
        <h1 className="text-5xl md:text-6xl font-light text-[#1a1a1a] tracking-wider uppercase">
          <EditableText
            content={content.hero?.title || 'LA PATISSERIE'}
            onUpdate={(val: string) => handleChange('hero.title', val)}
            isEditMode={isEditMode}
            multiline={false}
          />
        </h1>
        <div className="flex justify-center items-center gap-4 mt-6">
          <div className="w-16 h-[1px] bg-[#d4af37]/50"></div>
          <Sparkles size={16} className="text-[#d4af37]" />
          <div className="w-16 h-[1px] bg-[#d4af37]/50"></div>
        </div>
      </header>

      {/* Refined Hero Gallery */}
      <section className="px-8 md:px-16 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[70vh]">
          <div className="md:col-span-8 relative group overflow-hidden bg-zinc-50 border border-zinc-100 p-2">
            <div className="w-full h-full relative overflow-hidden">
               <EditableImage
                  src={content.hero?.image}
                  alt="Patisserie Hero"
                  onUpdate={(val: string) => handleChange('hero.image', val)}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-center px-8 bg-[#fdfbf7] border border-[#d4af37]/20 relative">
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#d4af37]/10 pointer-events-none"></div>
            <h2 className="text-3xl md:text-4xl font-light leading-snug mb-6 text-center">
              <EditableText
                content={content.hero?.subtitle || 'L\'Art de la Pâtisserie'}
                onUpdate={(val: string) => handleChange('hero.subtitle', val)}
                isEditMode={isEditMode}
              />
            </h2>
            <p className="text-center font-sans text-sm leading-relaxed text-zinc-500">
               <EditableText
                content={content.hero?.description || 'Discover our exquisite collection of handmade macarons, delicate entremets, and classical French pastries.'}
                onUpdate={(val: string) => handleChange('hero.description', val)}
                isEditMode={isEditMode}
              />
            </p>
          </div>
        </div>
      </section>

      {/* The Collection - Gold Framed Grid */}
      <section className="py-24 px-8 md:px-16 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-3xl font-light uppercase tracking-widest text-[#1a1a1a]">La Collection</h3>
            <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {content.menu_items?.map((item: any, index: number) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="aspect-[3/4] p-3 border border-[#d4af37]/30 bg-white mb-6 relative transition-all duration-500 group-hover:border-[#d4af37]">
                  <div className="w-full h-full overflow-hidden">
                    <EditableImage
                      src={item.image}
                      alt={item.title}
                      onUpdate={(val: string) => {
                        const newItems = [...(content.menu_items || [])];
                        newItems[index] = { ...item, image: val };
                        handleChange('menu_items', newItems);
                      }}
                      isEditMode={isEditMode}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-light mb-2 uppercase tracking-wide">
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
                <p className="font-sans text-xs tracking-widest text-[#d4af37] mb-3">
                  <EditableText
                    content={item.price || ''}
                    onUpdate={(val: string) => {
                      const newItems = [...(content.menu_items || [])];
                      newItems[index] = { ...item, price: val };
                      handleChange('menu_items', newItems);
                    }}
                    isEditMode={isEditMode}
                  />
                </p>
                <p className="font-sans text-sm text-zinc-500 italic">
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
            ))}
          </div>
        </div>
      </section>

      {/* Elegant Boutique Footer */}
      <footer className="py-24 px-8 border-t border-[#d4af37]/20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-2xl font-light uppercase tracking-widest mb-12">
            <EditableText
              content={content.hero?.title || 'LA PATISSERIE'}
              onUpdate={(val: string) => handleChange('hero.title', val)}
              isEditMode={isEditMode}
              multiline={false}
            />
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-sans text-sm text-zinc-500">
            <div className="space-y-4">
              <h5 className="font-serif text-[#1a1a1a] text-lg uppercase tracking-wider mb-6">Boutique</h5>
              <p>
                <EditableText
                  content={content.contact?.address || '15 Rue de la Paix\n75002 Paris, France'}
                  onUpdate={(val: string) => handleChange('contact.address', val)}
                  isEditMode={isEditMode}
                  multiline={true}
                />
              </p>
            </div>
            
            <div className="space-y-4 border-x border-[#d4af37]/20 px-4">
              <h5 className="font-serif text-[#1a1a1a] text-lg uppercase tracking-wider mb-6">Contact</h5>
              <p>
                <EditableText
                  content={content.contact?.phone || '+33 1 23 45 67 89'}
                  onUpdate={(val: string) => handleChange('contact.phone', val)}
                  isEditMode={isEditMode}
                />
              </p>
              <p className="flex justify-center mt-6">
                <Globe size={20} className="text-[#d4af37] hover:text-[#1a1a1a] transition-colors cursor-pointer" />
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-serif text-[#1a1a1a] text-lg uppercase tracking-wider mb-6">Horaires</h5>
              <p>Lundi - Samedi<br/>10:00 - 19:30</p>
              <p className="italic">Fermé le Dimanche</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
