'use client';

import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Scissors, Clock, MapPin, Phone, Globe } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function BarberDarkTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const updateContent = (key: string, value: any) => {
    onUpdateContent({ ...content, [key]: value });
  };

  const services = content.price_list || content.services || [];
  const team = content.team_members || [];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Vintage Navbar */}
      <nav className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="text-amber-500 w-8 h-8" />
            <span className="text-2xl font-black tracking-widest uppercase text-white">
              <EditableText content={content} contentKey="company.name" fallback="THE BARBER" onUpdate={updateContent} isEditMode={isEditMode} />
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest text-neutral-400">
            <a href="#services" className="hover:text-amber-500 transition-colors uppercase">Hizmetler</a>
            <a href="#team" className="hover:text-amber-500 transition-colors uppercase">Ekibimiz</a>
            <a href="#contact" className="px-6 py-3 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-neutral-950 transition-all uppercase">Rezervasyon</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center border-b-[10px] border-amber-500 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={content.hero?.image}
            alt="Barber Shop"
            onUpdate={(val: string) => updateContent('hero.image', val)}
            isEditMode={isEditMode}
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
            <EditableText content={content} contentKey="hero.title" fallback="KLASİK KESİM, MODERN STİL." onUpdate={updateContent} isEditMode={isEditMode} />
          </h1>
          <p className="text-xl md:text-2xl text-amber-500 font-medium tracking-wide mb-10">
            <EditableText content={content} contentKey="hero.subtitle" fallback="Geleneksel berber deneyimi, ustalıkla buluşuyor." onUpdate={updateContent} isEditMode={isEditMode} />
          </p>
        </div>
      </section>

      {/* Pricing / Services */}
      <section id="services" className="py-24 bg-neutral-900 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Hizmetlerimiz</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
            {services.map((item: any, i: number) => (
              <div key={i} className="flex flex-col border-b border-neutral-800 pb-4 group">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold text-neutral-200 group-hover:text-amber-500 transition-colors uppercase">{item.name || item.title}</h3>
                  <span className="text-2xl font-black text-amber-500">{item.price}</span>
                </div>
                <p className="text-neutral-500 text-sm">{item.description}</p>
              </div>
            ))}
            {services.length === 0 && (
              <p className="text-neutral-500 col-span-2 text-center">Hizmet listesi henüz eklenmemiş.</p>
            )}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Ustalarımız</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member: any, i: number) => (
              <div key={i} className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col items-center group hover:border-amber-500 transition-colors">
                <div className="w-40 h-40 mb-6 overflow-hidden rounded-full border-4 border-neutral-800 group-hover:border-amber-500 transition-colors">
                  <img src={member.image || 'https://via.placeholder.com/300'} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase mb-1">{member.name}</h3>
                <p className="text-amber-500 uppercase tracking-widest text-sm">{member.role}</p>
              </div>
            ))}
            {team.length === 0 && (
              <p className="text-neutral-500 col-span-3 text-center">Ekip üyesi henüz eklenmemiş.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black py-16 border-t-[10px] border-amber-500">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <Scissors className="text-amber-500 w-6 h-6" />
              <span className="text-xl font-black tracking-widest uppercase text-white">
                 <EditableText content={content} contentKey="company.name" fallback="THE BARBER" onUpdate={updateContent} isEditMode={isEditMode} />
              </span>
            </div>
            <p className="text-neutral-500">
              <EditableText content={content} contentKey="about.description" fallback="Geleneksel kesim sanatını modern dokunuşlarla birleştiriyoruz. Tarzınızı bize emanet edin." onUpdate={updateContent} isEditMode={isEditMode} />
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4 text-neutral-400">
            <h4 className="text-white font-bold uppercase tracking-widest mb-2">İletişim</h4>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500" />
              <EditableText content={content} contentKey="contact.phone" fallback="+90 555 123 4567" onUpdate={updateContent} isEditMode={isEditMode} />
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-500" />
              <EditableText content={content} contentKey="contact.address" fallback="Merkez Mah. Berber Sok. No:1" onUpdate={updateContent} isEditMode={isEditMode} />
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-bold uppercase tracking-widest mb-2">Çalışma Saatleri</h4>
            <div className="flex items-center gap-3 text-neutral-400">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>Pzt - Cmt: 09:00 - 21:00</span>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-colors rounded-full"><Globe className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-black transition-colors rounded-full"><Globe className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
