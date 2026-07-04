'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactFooter({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);
  const companyName = content.contact.company_name || 'İşletme Adı';

  const handleContactUpdate = (field: keyof typeof content.contact) => (newValue: string) => {
    onUpdateContent({
      ...content,
      contact: { ...content.contact, [field]: newValue }
    });
  };

  // Base Contact Info Grid (Shared across multiple layouts with slight class tweaks)
  const renderContactInfo = (textColor: string, iconColor: string) => (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className={`mt-1`} style={{ color: iconColor }}><Phone size={20} /></div>
        <div className={`flex-1 ${textColor}`}>
          <h4 className="font-semibold mb-1">Telefon</h4>
          <a href={`tel:${content.contact.phone.replace(/\s+/g, '')}`} className="hover:opacity-80 transition-opacity">
            <EditableText value={content.contact.phone} onSave={handleContactUpdate('phone')} isEditMode={isEditMode} multiline={false} />
          </a>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className={`mt-1`} style={{ color: iconColor }}><Mail size={20} /></div>
        <div className={`flex-1 ${textColor}`}>
          <h4 className="font-semibold mb-1">E-posta</h4>
          <a href={`mailto:${content.contact.email}`} className="hover:opacity-80 transition-opacity">
            <EditableText value={content.contact.email} onSave={handleContactUpdate('email')} isEditMode={isEditMode} multiline={false} />
          </a>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className={`mt-1`} style={{ color: iconColor }}><MapPin size={20} /></div>
        <div className={`flex-1 ${textColor}`}>
          <h4 className="font-semibold mb-1">Adres</h4>
          <EditableText value={content.contact.address} onSave={handleContactUpdate('address')} isEditMode={isEditMode} />
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className={`mt-1`} style={{ color: iconColor }}><Clock size={20} /></div>
        <div className={`flex-1 ${textColor}`}>
          <h4 className="font-semibold mb-1">Çalışma Saatleri</h4>
          <EditableText value={content.contact.hours} onSave={handleContactUpdate('hours')} isEditMode={isEditMode} />
        </div>
      </div>
    </div>
  );

  // Neo-Minimalist (Temiz karanlık footer)
  if (layoutStyle === 'neo-minimalist') {
    return (
      <footer id="contact" className="bg-slate-950 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">{companyName}</h2>
              <p className="text-slate-400 max-w-sm mb-8">
                Size en iyi hizmeti sunmak için buradayız. Sorularınız veya randevu için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="flex gap-4">
                <a href={`tel:${content.contact.phone.replace(/\s+/g, '')}`} className="px-6 py-3 rounded-full text-white font-medium transition-opacity hover:opacity-90 inline-flex items-center gap-2" style={{ backgroundColor: themeConfig.primary }}>
                  <Phone size={18} /> Hemen Ara
                </a>
              </div>
            </div>
            <div className="lg:col-span-2">
              {renderContactInfo('text-slate-300', themeConfig.primary)}
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} {companyName}. Tüm hakları saklıdır.</p>
            <p className="mt-2 md:mt-0">Design by AiWebAgency</p>
          </div>
        </div>
      </footer>
    );
  }

  // Glassmorphism (Cam efektli koyu footer)
  if (layoutStyle === 'glassmorphism') {
    return (
      <footer id="contact" className="relative border-t border-white/10 pt-20 pb-10 bg-black/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, white, ${themeConfig.primary})` }}>{companyName}</h2>
              <p className="text-white/60 mb-8 font-light text-lg">Bize ulaşın, projenizi veya ihtiyacınızı detaylandıralım.</p>
              <a href={`tel:${content.contact.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition-all">
                <Phone size={20} /> İletişime Geç
              </a>
            </div>
            <div>
              {renderContactInfo('text-white/80 font-light', themeConfig.primary)}
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm font-light">
            <p>© {new Date().getFullYear()} {companyName}. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    );
  }

  // Dark Futuristic (Tamamen siyah, neon yazılar)
  if (layoutStyle === 'dark-futuristic') {
    return (
      <footer id="contact" className="bg-[#060610] pt-24 pb-12 border-t border-[#1e1e35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: themeConfig.primary }}>/ İLETİŞİM</span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8">{companyName}</h2>
              <a href={`tel:${content.contact.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 font-bold text-[#060610] uppercase tracking-widest transition-all" style={{ backgroundColor: themeConfig.primary, boxShadow: `0 0 20px ${themeConfig.primary}40` }}>
                <Phone size={20} /> Bizi Arayın
              </a>
            </div>
            <div>
              {renderContactInfo('text-slate-400 font-light', themeConfig.primary)}
            </div>
          </div>
          <div className="border-t border-[#1e1e35] pt-8 flex justify-between text-xs font-mono text-slate-600 uppercase">
            <p>© {new Date().getFullYear()} {companyName} // ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>
    );
  }

  // Editorial & Retro-Modern (Sıcak kahverengi tonları)
  if (layoutStyle === 'editorial-retro') {
    return (
      <footer id="contact" className="bg-[#2d2418] text-[#e8e0d4] pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">{companyName}</h2>
            <div className="w-16 h-px bg-[#e8e0d4] opacity-30 mb-8"></div>
            <p className="font-serif italic text-xl text-[#a09080] max-w-lg mb-8">
              Sizi ağırlamaktan veya sorularınızı yanıtlamaktan memnuniyet duyarız.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16 border-t border-b border-[#e8e0d4]/20 py-12">
            <div className="text-center">
              <Phone size={24} className="mx-auto mb-4 text-[#a09080]" />
              <h4 className="font-serif uppercase tracking-widest text-sm mb-2 text-[#a09080]">Telefon</h4>
              <p className="font-medium"><EditableText value={content.contact.phone} onSave={handleContactUpdate('phone')} isEditMode={isEditMode} multiline={false} /></p>
            </div>
            <div className="text-center">
              <Mail size={24} className="mx-auto mb-4 text-[#a09080]" />
              <h4 className="font-serif uppercase tracking-widest text-sm mb-2 text-[#a09080]">E-posta</h4>
              <p className="font-medium"><EditableText value={content.contact.email} onSave={handleContactUpdate('email')} isEditMode={isEditMode} multiline={false} /></p>
            </div>
            <div className="text-center">
              <MapPin size={24} className="mx-auto mb-4 text-[#a09080]" />
              <h4 className="font-serif uppercase tracking-widest text-sm mb-2 text-[#a09080]">Adres</h4>
              <p className="font-medium"><EditableText value={content.contact.address} onSave={handleContactUpdate('address')} isEditMode={isEditMode} /></p>
            </div>
            <div className="text-center">
              <Clock size={24} className="mx-auto mb-4 text-[#a09080]" />
              <h4 className="font-serif uppercase tracking-widest text-sm mb-2 text-[#a09080]">Çalışma Saatleri</h4>
              <p className="font-medium"><EditableText value={content.contact.hours} onSave={handleContactUpdate('hours')} isEditMode={isEditMode} /></p>
            </div>
          </div>
          
          <div className="text-center text-sm text-[#a09080]">
            <p>© {new Date().getFullYear()} {companyName}. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    );
  }

  // Neo-Brutalism
  return (
    <footer id="contact" className="bg-black text-white pt-24 pb-12 border-t-8 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-8">{companyName}</h2>
            <a href={`tel:${content.contact.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black text-xl uppercase border-4 border-white transition-transform hover:-translate-y-2 hover:translate-x-2 shadow-[-8px_8px_0px_0px_#fff]">
              <Phone size={24} strokeWidth={3} /> BİZİ ARA
            </a>
          </div>
          <div className="space-y-8">
            <div className="border-l-4 border-white pl-6">
              <h4 className="font-black text-xl uppercase mb-2" style={{ color: themeConfig.primary }}>İletişim</h4>
              <p className="text-xl font-bold mb-1"><EditableText value={content.contact.phone} onSave={handleContactUpdate('phone')} isEditMode={isEditMode} multiline={false} /></p>
              <p className="text-xl font-bold"><EditableText value={content.contact.email} onSave={handleContactUpdate('email')} isEditMode={isEditMode} multiline={false} /></p>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h4 className="font-black text-xl uppercase mb-2" style={{ color: themeConfig.primary }}>Adres</h4>
              <p className="text-xl font-bold"><EditableText value={content.contact.address} onSave={handleContactUpdate('address')} isEditMode={isEditMode} /></p>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h4 className="font-black text-xl uppercase mb-2" style={{ color: themeConfig.primary }}>Saatler</h4>
              <p className="text-xl font-bold"><EditableText value={content.contact.hours} onSave={handleContactUpdate('hours')} isEditMode={isEditMode} /></p>
            </div>
          </div>
        </div>
        <div className="border-t-4 border-white pt-8 text-center text-xl font-bold uppercase">
          <p>© {new Date().getFullYear()} {companyName}</p>
        </div>
      </div>
    </footer>
  );
}
