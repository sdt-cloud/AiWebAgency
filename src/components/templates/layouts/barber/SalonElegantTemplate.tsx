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

export default function SalonElegantTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const updateContent = (key: string, value: any) => {
    onUpdateContent({ ...content, [key]: value });
  };

  const services = content.price_list || content.services || [];
  const gallery = content.gallery || [];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-serif">
      {/* Elegant Navbar */}
      <nav className="absolute top-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="text-3xl font-light tracking-wide text-stone-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-rose-400" />
            <EditableText content={content} contentKey="company.name" fallback="Elégance" onUpdate={updateContent} isEditMode={isEditMode} />
          </div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium text-stone-600">
            <a href="#about" className="hover:text-rose-500 transition-colors">Hakkımızda</a>
            <a href="#services" className="hover:text-rose-500 transition-colors">Fiyatlar</a>
            <a href="#gallery" className="hover:text-rose-500 transition-colors">Galeri</a>
          </div>
          <button className="px-8 py-3 bg-stone-900 text-stone-50 text-sm uppercase tracking-widest hover:bg-rose-900 transition-colors font-sans font-bold">
            Randevu Al
          </button>
        </div>
      </nav>

      {/* Split Hero */}
      <section className="flex flex-col md:flex-row min-h-screen">
        <div className="md:w-1/2 pt-32 pb-16 px-8 md:px-16 flex flex-col justify-center bg-rose-50/50">
          <h1 className="text-5xl md:text-7xl font-light text-stone-900 leading-tight mb-6">
            <EditableText content={content} contentKey="hero.title" fallback="Güzelliğinizin Yeni Adresi" onUpdate={updateContent} isEditMode={isEditMode} />
          </h1>
          <p className="text-lg text-stone-600 font-sans font-light leading-relaxed mb-10 max-w-md">
            <EditableText content={content} contentKey="hero.subtitle" fallback="Size özel dokunuşlarla saçlarınıza ve cildinize ışıltı katıyoruz." onUpdate={updateContent} isEditMode={isEditMode} />
          </p>
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-16 bg-rose-400" />
             <span className="font-sans text-sm uppercase tracking-widest text-rose-500 font-medium">Keşfedin</span>
          </div>
        </div>
        <div className="md:w-1/2 h-[60vh] md:h-screen relative">
          <EditableImage
            src={content.hero?.image}
            alt="Salon Elegance"
            onUpdate={(val: string) => updateContent('hero.image', val)}
            isEditMode={isEditMode}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Services Menu */}
      <section id="services" className="py-32 max-w-4xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl text-stone-900 mb-4">Hizmet Menüsü</h2>
          <div className="flex justify-center">
             <Sparkles className="w-5 h-5 text-rose-300" />
          </div>
        </div>
        <div className="space-y-8 font-sans">
          {services.map((item: any, i: number) => (
            <div key={i} className="flex flex-col md:flex-row md:items-end justify-between group">
              <div className="md:w-3/4 flex flex-col">
                <div className="flex items-center mb-1">
                  <h3 className="text-xl text-stone-800 font-medium">{item.name || item.title}</h3>
                  <div className="flex-grow border-b border-dotted border-stone-300 mx-4 opacity-50 group-hover:opacity-100 transition-opacity hidden md:block"></div>
                </div>
                <p className="text-stone-500 font-light text-sm">{item.description}</p>
              </div>
              <div className="text-2xl text-stone-900 mt-2 md:mt-0 font-serif">
                {item.price}
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-center text-stone-400 font-sans italic">Hizmet listesi güncelleniyor...</p>
          )}
        </div>
      </section>

      {/* Elegant Gallery */}
      <section id="gallery" className="py-20 bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
             <h2 className="text-4xl font-light">Stüdyomuzdan<br/>Kareler</h2>
             <a href="#" className="font-sans text-sm uppercase tracking-widest text-rose-400 hover:text-rose-300 transition-colors border-b border-rose-400 pb-1">Tümünü Gör</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[0, 1, 2].map((idx) => (
               <div key={idx} className="aspect-[4/5] bg-stone-800 relative group overflow-hidden">
                 <img 
                   src={gallery[idx]?.url || `https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`} 
                   alt={`Gallery ${idx}`} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                 />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-rose-50 py-20 border-t border-rose-100 font-sans">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif text-stone-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-400" />
              <EditableText content={content} contentKey="company.name" fallback="Elégance" onUpdate={updateContent} isEditMode={isEditMode} />
            </h3>
            <p className="text-stone-500 font-light max-w-sm">
               <EditableText content={content} contentKey="about.description" fallback="Zarafetinizin ve güzelliğinizin mimarı. Size en iyi hizmeti sunmak için buradayız." onUpdate={updateContent} isEditMode={isEditMode} />
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-900 font-bold mb-6">İletişim</h4>
            <div className="space-y-4 text-stone-600 font-light">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-rose-400" />
                <EditableText content={content} contentKey="contact.phone" fallback="0212 555 44 33" onUpdate={updateContent} isEditMode={isEditMode} />
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-400 mt-1" />
                <EditableText content={content} contentKey="contact.address" fallback="Nişantaşı, İstanbul" onUpdate={updateContent} isEditMode={isEditMode} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-900 font-bold mb-6">Sosyal Medya</h4>
            <a href="#" className="flex items-center gap-3 text-stone-600 hover:text-rose-500 transition-colors font-light">
               <Globe className="w-4 h-4" />
               @elegance.salon
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
