'use client';

import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Droplet, Leaf, Wind, MapPin, Phone } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function SpaGlassTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const updateContent = (key: string, value: any) => {
    onUpdateContent({ ...content, [key]: value });
  };

  const services = content.price_list || content.services || [];

  return (
    <div className="min-h-screen bg-teal-50 text-slate-800 font-sans relative overflow-hidden">
      {/* Abstract Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-200/40 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-300/30 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Floating Glass Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg rounded-full px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-800 font-semibold text-lg">
            <Droplet className="w-5 h-5 text-teal-500" />
            <EditableText content={content} contentKey="company.name" fallback="Aqua SPA" onUpdate={updateContent} isEditMode={isEditMode} />
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#rituals" className="hover:text-teal-600 transition-colors">Ritüeller</a>
            <a href="#services" className="hover:text-teal-600 transition-colors">Terapiler</a>
            <a href="#contact" className="hover:text-teal-600 transition-colors">İletişim</a>
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-md">
            Randevu
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-48 pb-20 px-6 z-10 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/50 rounded-full text-teal-700 text-sm font-medium">
              <Leaf className="w-4 h-4" />
              Doğadan Gelen Huzur
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 leading-tight">
              <EditableText content={content} contentKey="hero.title" fallback="Ruhunuzu ve Bedeninizi Arındırın" onUpdate={updateContent} isEditMode={isEditMode} />
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              <EditableText content={content} contentKey="hero.subtitle" fallback="Modern hayatın stresinden uzaklaşarak, kendinize en değerli zamanı ayırın." onUpdate={updateContent} isEditMode={isEditMode} />
            </p>
          </div>
          <div className="relative">
             <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-[8px] border-white/40 backdrop-blur-sm">
                <EditableImage
                  src={content.hero?.image}
                  alt="Spa Center"
                  onUpdate={(val: string) => updateContent('hero.image', val)}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-cyan-100/60 backdrop-blur-2xl border border-white/50 rounded-[2rem] shadow-xl z-20 flex flex-col justify-center items-center text-center p-6 hidden md:flex">
                <Wind className="w-10 h-10 text-teal-500 mb-2" />
                <span className="text-slate-800 font-bold">10+ Yıl</span>
                <span className="text-slate-500 text-sm">Deneyim</span>
             </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Glass Cards) */}
      <section id="services" className="py-24 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-800">Terapiler & Masajlar</h2>
            <p className="text-slate-500">Size özel hazırlanmış yenilenme ritüelleri</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((item: any, i: number) => (
              <div key={i} className="bg-white/40 backdrop-blur-lg border border-white/60 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 text-teal-600">
                   <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.name || item.title}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed min-h-[3rem]">{item.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/50">
                  <span className="text-2xl font-bold text-teal-600">{item.price}</span>
                  <button className="text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors">İncele →</button>
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <p className="text-slate-500 col-span-3 text-center">Hizmetlerimiz çok yakında eklenecektir.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-6 z-10 relative mt-20">
        <div className="max-w-7xl mx-auto bg-white/50 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-8 md:p-16 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Yenilenmek İçin<br/>Bize Ulaşın</h2>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl">
                     <div className="bg-teal-100 w-12 h-12 rounded-xl flex items-center justify-center text-teal-600">
                       <Phone className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-sm text-slate-500 font-medium mb-1">Telefon</p>
                       <p className="text-slate-800 font-semibold">
                         <EditableText content={content} contentKey="contact.phone" fallback="+90 (212) 123 45 67" onUpdate={updateContent} isEditMode={isEditMode} />
                       </p>
                     </div>
                   </div>
                   <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl">
                     <div className="bg-teal-100 w-12 h-12 rounded-xl flex items-center justify-center text-teal-600">
                       <MapPin className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-sm text-slate-500 font-medium mb-1">Adres</p>
                       <p className="text-slate-800 font-semibold">
                         <EditableText content={content} contentKey="contact.address" fallback="Sahil Yolu, No:42, Beşiktaş" onUpdate={updateContent} isEditMode={isEditMode} />
                       </p>
                     </div>
                   </div>
                </div>
             </div>
             <div className="h-full min-h-[300px] bg-slate-200 rounded-3xl overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Location" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-teal-900/20 mix-blend-multiply"></div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
