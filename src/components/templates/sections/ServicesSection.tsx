'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import * as LucideIcons from 'lucide-react';

export default function ServicesSection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  const handleServiceUpdate = (index: number, field: 'title' | 'description') => (newValue: string) => {
    const newServices = [...content.services];
    newServices[index] = { ...newServices[index], [field]: newValue };
    onUpdateContent({ ...content, services: newServices });
  };

  // İkon adı string olarak gelirse lucide-react içinden dinamik olarak çekiyoruz
  // Eğer bulunamazsa varsayılan olarak CheckCircle kullanıyoruz
  const renderIcon = (iconName?: string) => {
    if (!iconName) iconName = 'CheckCircle';
    
    // Güvenli şekilde ikonu bul
    // @ts-ignore
    const IconComponent = LucideIcons[iconName] || LucideIcons.CheckCircle;
    
    return <IconComponent size={32} strokeWidth={1.5} />;
  };

  // Servisler yoksa boş bırakmamak için varsayılanlar
  const services = content.services?.length > 0 ? content.services : [
    { title: 'Hizmet 1', description: 'Hizmet detayları buraya gelecek.' },
    { title: 'Hizmet 2', description: 'Hizmet detayları buraya gelecek.' },
    { title: 'Hizmet 3', description: 'Hizmet detayları buraya gelecek.' }
  ];

  // Neo-Minimalist (Kart tasarımı, hafif gölgeler)
  if (layoutStyle === 'neo-minimalist') {
    return (
      <section id="services" className={`py-24 bg-slate-50 ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-lg text-slate-600">Size en iyi çözümleri sunmak için buradayız.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${themeConfig.primary}15`, color: themeConfig.primary }}>
                  {renderIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  <EditableText
                    value={service.title}
                    onSave={handleServiceUpdate(idx, 'title')}
                    isEditMode={isEditMode}
                    multiline={false}
                  />
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  <EditableText
                    value={service.description}
                    onSave={handleServiceUpdate(idx, 'description')}
                    isEditMode={isEditMode}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Glassmorphism (Şeffaf kartlar)
  if (layoutStyle === 'glassmorphism') {
    return (
      <section id="services" className={`py-24 relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Neler Yapıyoruz?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-8 text-white shadow-lg" style={{ backgroundImage: `linear-gradient(135deg, ${themeConfig.primary}, ${themeConfig.secondary})` }}>
                  {renderIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  <EditableText
                    value={service.title}
                    onSave={handleServiceUpdate(idx, 'title')}
                    isEditMode={isEditMode}
                    multiline={false}
                  />
                </h3>
                <p className="text-white/70 font-light leading-relaxed">
                  <EditableText
                    value={service.description}
                    onSave={handleServiceUpdate(idx, 'description')}
                    isEditMode={isEditMode}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Dark Futuristic (Neon vurgular, koyu kartlar)
  if (layoutStyle === 'dark-futuristic') {
    return (
      <section id="services" className={`py-24 bg-[#0a0a12] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] uppercase block mb-4" style={{ color: themeConfig.primary }}>
                / UZMANLIK ALANLARIMIZ
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Hizmetler</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-[#12121f] border border-[#1e1e35] p-8 group hover:border-[themeConfig.primary] transition-colors relative overflow-hidden">
                {/* Hover neon glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: themeConfig.primary }}></div>
                
                <div className="text-[#3a3a5a] mb-8 group-hover:text-white transition-colors" style={{ color: themeConfig.primary }}>
                  {renderIcon(service.icon)}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
                  <EditableText
                    value={service.title}
                    onSave={handleServiceUpdate(idx, 'title')}
                    isEditMode={isEditMode}
                    multiline={false}
                  />
                </h3>
                
                <p className="text-slate-400 font-light">
                  <EditableText
                    value={service.description}
                    onSave={handleServiceUpdate(idx, 'description')}
                    isEditMode={isEditMode}
                  />
                </p>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: themeConfig.primary }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Editorial & Retro-Modern (Dergi dizgisi, dikey çizgiler)
  if (layoutStyle === 'editorial-retro') {
    return (
      <section id="services" className={`py-24 bg-white ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2d2418] mb-16 text-center">Neler Sunuyoruz?</h2>
          
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
            {services.map((service, idx) => (
              <div key={idx} className="relative">
                {/* Decorative number */}
                <div className="absolute -top-10 -left-4 text-8xl font-serif text-[#faf7f2] font-black z-0 pointer-events-none select-none">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                
                <div className="relative z-10 border-t border-[#e8e0d4] pt-6">
                  <div className="mb-6 text-[#a09080]">
                    {renderIcon(service.icon)}
                  </div>
                  
                  <h3 className="text-2xl font-serif text-[#2d2418] mb-4">
                    <EditableText
                      value={service.title}
                      onSave={handleServiceUpdate(idx, 'title')}
                      isEditMode={isEditMode}
                      multiline={false}
                    />
                  </h3>
                  
                  <p className="text-[#5c4f3d] leading-relaxed">
                    <EditableText
                      value={service.description}
                      onSave={handleServiceUpdate(idx, 'description')}
                      isEditMode={isEditMode}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Neo-Brutalism (Koyu kenarlıklar, sarı/turuncu aksanlar, yüksek kontrast)
  return (
    <section id="services" className={`py-24 bg-white border-b-4 border-black`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl md:text-7xl font-black text-black mb-16 uppercase tracking-tighter" style={{ textShadow: `4px 4px 0px ${themeConfig.primary}` }}>
          Hizmetler
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: themeConfig.primary, color: '#000' }}>
                {renderIcon(service.icon)}
              </div>
              
              <h3 className="text-2xl font-black text-black mb-4 uppercase">
                <EditableText
                  value={service.title}
                  onSave={handleServiceUpdate(idx, 'title')}
                  isEditMode={isEditMode}
                  multiline={false}
                />
              </h3>
              
              <p className="text-lg font-bold text-gray-800 border-t-4 border-black pt-4">
                <EditableText
                  value={service.description}
                  onSave={handleServiceUpdate(idx, 'description')}
                  isEditMode={isEditMode}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
