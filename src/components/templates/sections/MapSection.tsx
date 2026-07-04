'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

export default function MapSection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);
  const companyName = content.contact.company_name || 'İşletme Adı';
  
  // Google Haritalar Yol Tarifi URL'si
  const encodedAddress = encodeURIComponent(content.contact.address + ' ' + companyName);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  // Map Placeholder styling function
  const getMapPlaceholderStyle = () => {
    switch(layoutStyle) {
      case 'dark-futuristic': return 'bg-[#12121f] border-[#1e1e35]';
      case 'editorial-retro': return 'bg-[#e8e0d4] border-[#d4c5b0]';
      case 'glassmorphism': return 'bg-white/5 border-white/10';
      case 'neo-brutalism': return 'bg-gray-200 border-black border-4 shadow-[8px_8px_0px_0px_#000]';
      default: return 'bg-slate-100 border-slate-200';
    }
  };

  const handleContactUpdate = (field: keyof typeof content.contact) => (newValue: string) => {
    onUpdateContent({
      ...content,
      contact: { ...content.contact, [field]: newValue }
    });
  };

  return (
    <section className={`py-0 ${layoutConfig.pageBg} ${layoutConfig.sectionDivider}`}>
      <div className="grid lg:grid-cols-2">
        {/* Adres ve Bilgi Kısmı */}
        <div className={`p-12 md:p-24 flex flex-col justify-center ${layoutStyle === 'dark-futuristic' ? 'bg-[#0a0a12]' : ''}`}>
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            <h2 className={`text-3xl md:text-5xl font-bold mb-8 ${layoutConfig.headingColor} ${layoutStyle === 'editorial-retro' ? 'font-serif' : ''} ${layoutStyle === 'neo-brutalism' ? 'uppercase font-black tracking-tighter' : ''}`}>
              Bizi Ziyaret Edin
            </h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-full ${layoutStyle === 'neo-brutalism' ? 'border-2 border-black bg-white text-black' : ''}`} style={layoutStyle !== 'neo-brutalism' ? { backgroundColor: `${themeConfig.primary}20`, color: themeConfig.primary } : {}}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold mb-1 ${layoutConfig.headingColor}`}>Adres</h4>
                  <p className={`${layoutConfig.textColor} leading-relaxed`}>
                    <EditableText value={content.contact.address} onSave={handleContactUpdate('address')} isEditMode={isEditMode} />
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-full ${layoutStyle === 'neo-brutalism' ? 'border-2 border-black bg-white text-black' : ''}`} style={layoutStyle !== 'neo-brutalism' ? { backgroundColor: `${themeConfig.primary}20`, color: themeConfig.primary } : {}}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold mb-1 ${layoutConfig.headingColor}`}>Çalışma Saatleri</h4>
                  <p className={`${layoutConfig.textColor} leading-relaxed`}>
                    <EditableText value={content.contact.hours} onSave={handleContactUpdate('hours')} isEditMode={isEditMode} />
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-full ${layoutStyle === 'neo-brutalism' ? 'border-2 border-black bg-white text-black' : ''}`} style={layoutStyle !== 'neo-brutalism' ? { backgroundColor: `${themeConfig.primary}20`, color: themeConfig.primary } : {}}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold mb-1 ${layoutConfig.headingColor}`}>Telefon</h4>
                  <p className={`${layoutConfig.textColor} leading-relaxed`}>
                    <EditableText value={content.contact.phone} onSave={handleContactUpdate('phone')} isEditMode={isEditMode} multiline={false} />
                  </p>
                </div>
              </div>
            </div>

            <a 
              href={mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-3 w-full py-4 px-8 font-bold transition-all ${
                layoutStyle === 'neo-brutalism' 
                  ? 'border-4 border-black text-black uppercase shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]'
                  : layoutStyle === 'dark-futuristic'
                  ? 'text-[#0a0a12] uppercase tracking-widest'
                  : layoutStyle === 'editorial-retro'
                  ? 'text-white font-serif tracking-wide'
                  : 'text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1'
              }`}
              style={{ backgroundColor: themeConfig.primary }}
            >
              <Navigation size={20} />
              Yol Tarifi Al
            </a>
          </div>
        </div>

        {/* Harita / Görsel Kısmı */}
        <div className={`relative min-h-[400px] border-l ${getMapPlaceholderStyle()}`}>
          {/* Gelecekte gerçek Google Maps embed'i buraya gelecek. Şimdilik estetik bir placeholder. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] bg-opacity-20">
            <div className={`w-24 h-24 mb-6 flex items-center justify-center rounded-full animate-bounce shadow-2xl ${layoutStyle === 'neo-brutalism' ? 'border-4 border-black bg-white' : 'bg-white'}`} style={layoutStyle !== 'neo-brutalism' ? { color: themeConfig.primary } : { color: 'black' }}>
              <MapPin size={48} />
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${layoutConfig.headingColor} ${layoutStyle === 'editorial-retro' ? 'font-serif' : ''}`}>{companyName}</h3>
            <p className={`${layoutConfig.textColor} max-w-sm mx-auto`}>Konumuzu haritada görmek için "Yol Tarifi Al" butonuna tıklayabilirsiniz.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
