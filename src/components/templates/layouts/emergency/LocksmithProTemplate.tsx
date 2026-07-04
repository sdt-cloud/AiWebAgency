import React from 'react';
import { Phone, ShieldCheck, Lock, Fingerprint, MapPin, MessageCircle, Shield } from 'lucide-react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import type { TemplateContent, ThemeConfig } from '../../template-types';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function LocksmithProTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: Props) {
  const updateContent = (path: string, value: string) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(content));
    let curr = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!curr[keys[i]]) curr[keys[i]] = {};
      curr = curr[keys[i]];
    }
    curr[keys[keys.length - 1]] = value;
    onUpdateContent(newContent);
  };

  return (
    <div className="min-h-screen font-sans bg-[#0a0a12] text-slate-300 selection:bg-cyan-500/30">
      {/* EMERGENCY CTA BAR */}
      <div className="bg-[#12121f] border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 font-bold text-cyan-400 tracking-widest text-sm uppercase">
            <ShieldCheck className="w-5 h-5" />
            <span>Premium Güvenlik & Kilit Sistemleri</span>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <a href={`tel:${content.contact.phone}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-cyan-500 text-black px-6 py-2.5 rounded-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-shadow">
              <Phone className="w-5 h-5 animate-pulse" />
              <span>{content.contact.phone}</span>
            </a>
            <a href={`https://wa.me/${content.contact.phone}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-transparent border border-cyan-500 text-cyan-400 px-6 py-2.5 rounded-sm font-bold hover:bg-cyan-500/10 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-[#1e1e35]">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={content.images?.hero_bg || ''}
            alt="Security Background"
            className="w-full h-full object-cover opacity-10 grayscale"
            isEditMode={isEditMode}
            onUpdate={(val: string) => updateContent('images.hero_bg', val)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12] via-[#0a0a12]/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 px-4 py-1.5 text-xs tracking-[0.2em] uppercase mb-8">
            <Fingerprint className="w-4 h-4" />
            <EditableText
              value={content.hero.badge_text || 'PRO KİLİT ÇÖZÜMLERİ'}
              isEditMode={isEditMode}
              onChange={(val: string) => updateContent('hero.badge_text', val)}
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            <EditableText
              value={content.hero.title}
              isEditMode={isEditMode}
              onChange={(val: string) => updateContent('hero.title', val)}
            />
          </h1>
          <p className="text-xl text-slate-400 font-light mb-12 max-w-2xl leading-relaxed">
            <EditableText
              value={content.hero.subtitle}
              isEditMode={isEditMode}
              onChange={(val: string) => updateContent('hero.subtitle', val)}
            />
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500 tracking-wider">
            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-cyan-500"/> Akıllı Kilit</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-cyan-500"/> Üst Düzey Şifreleme</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-[#0a0a12]">
        <div className="container mx-auto px-4">
          <div className="mb-16 border-l-4 border-cyan-500 pl-6">
            <h2 className="text-3xl font-bold text-white tracking-wide">Güvenlik Hizmetlerimiz</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.services.map((service: any, index: number) => (
              <div key={index} className="bg-[#12121f] p-8 border border-[#1e1e35] hover:border-cyan-500/50 transition-colors group">
                <div className="text-cyan-500 mb-6 bg-cyan-500/10 w-16 h-16 flex items-center justify-center rounded-sm group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  <EditableText
                    value={service.title}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent(`services.${index}.title`, val)}
                  />
                </h3>
                <p className="text-slate-400 leading-relaxed font-light">
                  <EditableText
                    value={service.description}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent(`services.${index}.description`, val)}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ABOUT */}
      <section className="py-24 bg-[#0f0f18] border-t border-[#1e1e35]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative p-2 border border-[#1e1e35] bg-[#0a0a12]">
                <div className="absolute inset-0 bg-cyan-500/10 blur-xl z-0"></div>
                <div className="relative z-10 overflow-hidden aspect-video grayscale hover:grayscale-0 transition-all duration-700">
                   <EditableImage
                      src={content.images?.about_img || ''}
                      alt="Hakkımızda"
                      className="w-full h-full object-cover"
                      isEditMode={isEditMode}
                      onUpdate={(val: string) => updateContent('images.about_img', val)}
                    />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold mb-8 text-white tracking-wide">Yüksek Güvenlik Standartları</h2>
              <p className="text-lg text-slate-400 leading-relaxed font-light">
                <EditableText
                    value={content.about}
                    isEditMode={isEditMode}
                    onChange={(val: string) => updateContent('about', val)}
                  />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050508] py-16 border-t border-[#1e1e35]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-widest">{content.contact.company_name}</h3>
            <p className="text-slate-500 font-light max-w-sm">İleri teknoloji güvenlik ve akıllı kilit sistemleri merkezi.</p>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-4 text-cyan-400 text-xl font-mono">
              <Phone className="w-5 h-5" />
              <span>{content.contact.phone}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <MapPin className="w-5 h-5" />
              <span>{content.contact.address}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
