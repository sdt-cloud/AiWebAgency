'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import { CalendarDays, Phone, MessageCircle } from 'lucide-react';

export default function BookingSection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  const cleanPhone = content.contact.phone.replace(/\s+/g, '').replace('+', '');
  const waPhone = cleanPhone.startsWith('90') ? cleanPhone : `90${cleanPhone.replace(/^0/, '')}`;
  const waLink = `https://wa.me/${waPhone}?text=Merhaba,%20randevu%20almak%20istiyorum.`;
  const telLink = `tel:${cleanPhone}`;

  // Neo-Minimalist
  if (layoutStyle === 'neo-minimalist') {
    return (
      <section className={`py-24 bg-white ${layoutConfig.sectionDivider}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 text-center relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ backgroundColor: themeConfig.primary }}></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-8 shadow-sm" style={{ backgroundColor: themeConfig.primary, color: 'white' }}>
                <CalendarDays size={40} strokeWidth={1.5} />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Hemen Randevu Alın</h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                Size en uygun zamanı belirlemek için bizimle iletişime geçin. Uzman ekibimiz sizi bekliyor.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href={telLink} className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-bold transition-transform hover:-translate-y-1 shadow-lg" style={{ backgroundColor: themeConfig.primary }}>
                  <Phone size={20} />
                  <span>{content.contact.phone}</span>
                </a>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-bold transition-transform hover:-translate-y-1 shadow-lg">
                  <MessageCircle size={20} />
                  <span>WhatsApp ile Randevu</span>
                </a>
              </div>
              
              <div className="mt-12 text-slate-500 font-medium">
                Çalışma Saatleri: {content.contact.hours}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Editorial & Retro-Modern
  if (layoutStyle === 'editorial-retro') {
    return (
      <section className={`py-24 bg-[#faf7f2] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#e8e0d4] bg-white p-12 md:p-20 text-center relative">
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#d4c5b0]"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#d4c5b0]"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#d4c5b0]"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#d4c5b0]"></div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-[#2d2418] mb-6 italic">Zamanınızı Ayırtın</h2>
            <div className="w-24 h-px bg-[#d4c5b0] mx-auto mb-8"></div>
            
            <p className="text-[#5c4f3d] font-serif text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
              Profesyonel hizmetlerimizden yararlanmak için randevunuzu şimdiden planlayın.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href={telLink} className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-[#2d2418] text-[#2d2418] font-serif uppercase tracking-widest transition-colors hover:bg-[#2d2418] hover:text-[#faf7f2]">
                <Phone size={18} /> ARAYIN
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#25D366] text-white font-serif uppercase tracking-widest transition-colors hover:bg-[#1DA851]">
                <MessageCircle size={18} /> YAZIN
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Dark Futuristic
  if (layoutStyle === 'dark-futuristic') {
    return (
      <section className={`py-24 bg-[#0a0a12] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#12121f] border border-[#1e1e35] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
            {/* Neon highlight line */}
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: themeConfig.primary }}></div>
            
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-mono tracking-widest uppercase mb-4 block" style={{ color: themeConfig.primary }}>// PLANLAMA</span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">Randevu Al</h2>
              <p className="text-slate-400 font-light text-lg">Hemen yerinizi ayırtın, sıra beklemeyin.</p>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 px-10 py-5 bg-[#25D366] text-[#0a0a12] font-black uppercase tracking-widest transition-transform hover:scale-105">
                <MessageCircle size={24} />
                <span>WhatsApp</span>
              </a>
              <a href={telLink} className="flex items-center justify-center gap-4 px-10 py-5 font-black uppercase tracking-widest transition-transform hover:scale-105" style={{ backgroundColor: themeConfig.primary, color: '#0a0a12' }}>
                <Phone size={24} />
                <span>Telefon</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Glassmorphism / Default
  return (
    <section className={`py-24 relative overflow-hidden ${layoutConfig.pageBg} ${layoutConfig.sectionDivider}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className={`text-4xl md:text-5xl font-bold ${layoutConfig.headingColor} mb-8`}>Randevunuzu Oluşturun</h2>
        <p className={`${layoutConfig.mutedColor} text-xl mb-12`}>Sizi ağırlamaktan mutluluk duyacağız.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href={telLink} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold transition-all hover:opacity-90" style={{ backgroundColor: themeConfig.primary }}>
            <Phone size={20} /> Hemen Ara
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-bold transition-all hover:bg-[#1DA851]">
            <MessageCircle size={20} /> WhatsApp İletişim
          </a>
        </div>
      </div>
    </section>
  );
}
