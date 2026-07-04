'use client';

import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Utensils, MapPin, Phone, Clock } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function RestaurantElegantTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const handleChange = (path: string, value: any) => {
    onUpdateContent({ ...content, [path]: value });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      {/* Ultra Minimal Navbar */}
      <nav className="fixed w-full z-50 px-8 py-8 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-sm font-light tracking-[0.3em] uppercase">
          <EditableText
            content={content.hero?.title || 'ELEGANT DINING'}
            onUpdate={(val: string) => handleChange('hero.title', val)}
            isEditMode={isEditMode}
            multiline={false}
          />
        </div>
        <div className="flex gap-8 text-xs font-light tracking-widest uppercase">
          <a href="#cuisine" className="hover:line-through transition-all">Cuisine</a>
          <a href="#experience" className="hover:line-through transition-all">Experience</a>
          <a href="#reservations" className="hover:line-through transition-all">Reservations</a>
        </div>
      </nav>

      {/* Massive Hero Section */}
      <section className="relative h-screen w-full flex flex-col justify-end pb-24 px-8 lg:px-24">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={content.hero?.image}
            alt="Fine Dining"
            onUpdate={(val: string) => handleChange('hero.image', val)}
            isEditMode={isEditMode}
            className="w-full h-full object-cover filter brightness-[0.85] contrast-125 grayscale-[20%]"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <h1 className="text-6xl md:text-[8rem] font-serif font-light text-white leading-none tracking-tighter">
            <EditableText
              content={content.hero?.subtitle || 'Taste the Art.'}
              onUpdate={(val: string) => handleChange('hero.subtitle', val)}
              isEditMode={isEditMode}
            />
          </h1>
          <div className="text-white/80 max-w-sm text-sm font-light leading-relaxed tracking-wide text-right">
            <EditableText
              content={content.hero?.description || 'A culinary journey redefining the boundaries of flavor, presented in an atmosphere of pure sophistication.'}
              onUpdate={(val: string) => handleChange('hero.description', val)}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </section>

      {/* The Experience - Thin Lines & Huge Spaces */}
      <section id="experience" className="py-40 px-8 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="border-t border-zinc-200 pt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 text-xs font-light tracking-[0.2em] uppercase text-zinc-400">
            01 / The Concept
          </div>
          <div className="md:col-span-8">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-900 leading-tight mb-16">
              <EditableText
                content={content.about?.title || 'More than a meal, it is an immersive sensory performance.'}
                onUpdate={(val: string) => handleChange('about.title', val)}
                isEditMode={isEditMode}
              />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="text-lg font-light text-zinc-600 leading-relaxed">
                 <EditableText
                  content={content.about?.description || 'We focus on the purest ingredients, treated with the utmost respect. Every plate is a canvas, every bite a story told by our master chefs.'}
                  onUpdate={(val: string) => handleChange('about.description', val)}
                  isEditMode={isEditMode}
                  multiline={true}
                />
              </div>
              <div className="aspect-[3/4] w-full bg-zinc-100 overflow-hidden">
                <EditableImage
                  src={content.about?.image}
                  alt="Culinary Detail"
                  onUpdate={(val: string) => handleChange('about.image', val)}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tasting Menu - Minimal List */}
      <section id="cuisine" className="py-40 px-8 lg:px-24 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-32">
            <h3 className="text-xs font-light tracking-[0.3em] uppercase text-zinc-500 mb-6">Tasting Menu</h3>
            <div className="h-[1px] w-12 bg-zinc-300 mx-auto"></div>
          </div>

          <div className="space-y-12">
            {content.menu_items?.slice(0, 5).map((item: any, index: number) => (
              <div key={index} className="group cursor-default">
                <div className="flex justify-between items-end border-b border-zinc-200 pb-4 mb-4 group-hover:border-zinc-900 transition-colors duration-500">
                  <h4 className="text-2xl font-serif font-light">
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
                  <span className="text-sm font-light tracking-wider">
                     <EditableText
                        content={item.price || 'Market'}
                        onUpdate={(val: string) => {
                          const newItems = [...(content.menu_items || [])];
                          newItems[index] = { ...item, price: val };
                          handleChange('menu_items', newItems);
                        }}
                        isEditMode={isEditMode}
                      />
                  </span>
                </div>
                <p className="text-sm text-zinc-500 font-light max-w-xl">
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

      {/* Severe Minimal Footer */}
      <footer id="reservations" className="py-32 px-8 lg:px-24 border-t border-zinc-200">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="text-4xl md:text-6xl font-serif font-light">
            Book a<br />Table.
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 font-light text-sm text-zinc-600">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 mb-6">Location</p>
              <EditableText
                content={content.contact?.address || '123 Culinary Avenue\nMetropolis, NY 10001'}
                onUpdate={(val: string) => handleChange('contact.address', val)}
                isEditMode={isEditMode}
                multiline={true}
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 mb-6">Contact</p>
              <div className="space-y-2">
                <EditableText
                  content={content.contact?.phone || '+1 234 567 8900'}
                  onUpdate={(val: string) => handleChange('contact.phone', val)}
                  isEditMode={isEditMode}
                />
                <br/>
                <EditableText
                  content={content.contact?.email || 'reservations@elegant.com'}
                  onUpdate={(val: string) => handleChange('contact.email', val)}
                  isEditMode={isEditMode}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-40 max-w-screen-2xl mx-auto flex justify-between items-end text-xs font-light text-zinc-400 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Elegant</span>
          <span>Created with Excellence</span>
        </div>
      </footer>
    </div>
  );
}
