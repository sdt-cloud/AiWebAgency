'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import { Check, Clock } from 'lucide-react';

export default function PriceListSection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  const handlePriceUpdate = (index: number, field: 'title' | 'price' | 'duration' | 'description') => (newValue: string) => {
    if (!content.price_list) return;
    const newList = [...content.price_list];
    newList[index] = { ...newList[index], [field]: newValue };
    onUpdateContent({ ...content, price_list: newList });
  };

  const priceList = content.price_list && content.price_list.length > 0 ? content.price_list : [
    { title: 'Standart Bakım', price: '₺250', duration: '30 dk', description: 'Temel hizmetlerimiz.', is_popular: false },
    { title: 'Premium Bakım', price: '₺450', duration: '60 dk', description: 'Kapsamlı ve detaylı hizmet paketi.', is_popular: true },
    { title: 'VIP Paket', price: '₺800', duration: '90 dk', description: 'Tüm hizmetleri içeren en üst paket.', is_popular: false }
  ];

  // Neo-Minimalist (Kart bazlı karşılaştırma / Fiyat Tabloları)
  if (layoutStyle === 'neo-minimalist') {
    return (
      <section className={`py-24 bg-slate-50 ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Fiyat Listesi</h2>
            <p className="text-lg text-slate-600">Şeffaf fiyatlandırma, kaliteli hizmet.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {priceList.map((item, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-3xl p-8 relative flex flex-col ${
                  item.is_popular 
                    ? 'border-2 shadow-xl scale-105 z-10' 
                    : 'border border-slate-200 shadow-sm'
                }`}
                style={item.is_popular ? { borderColor: themeConfig.primary } : {}}
              >
                {item.is_popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-bold tracking-wide" style={{ backgroundColor: themeConfig.primary }}>
                    EN ÇOK TERCİH EDİLEN
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                  <EditableText value={item.title} onSave={handlePriceUpdate(idx, 'title')} isEditMode={isEditMode} multiline={false} />
                </h3>
                
                <div className="text-center my-6">
                  <span className="text-4xl font-black text-slate-900">
                    <EditableText value={item.price} onSave={handlePriceUpdate(idx, 'price')} isEditMode={isEditMode} multiline={false} />
                  </span>
                </div>
                
                {item.duration && (
                  <div className="flex items-center justify-center gap-2 text-slate-500 mb-6 bg-slate-50 py-2 rounded-lg">
                    <Clock size={16} />
                    <span className="text-sm font-medium">
                      <EditableText value={item.duration} onSave={handlePriceUpdate(idx, 'duration')} isEditMode={isEditMode} multiline={false} />
                    </span>
                  </div>
                )}
                
                {item.description && (
                  <p className="text-slate-600 text-center mb-8 flex-1">
                    <EditableText value={item.description} onSave={handlePriceUpdate(idx, 'description')} isEditMode={isEditMode} />
                  </p>
                )}
                
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                  item.is_popular ? 'text-white hover:opacity-90' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`} style={item.is_popular ? { backgroundColor: themeConfig.primary } : {}}>
                  Randevu Al
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Dark Futuristic (Liste Görünümü - Kuaför/Berberler için daha uygun)
  if (layoutStyle === 'dark-futuristic') {
    return (
      <section className={`py-24 bg-[#0a0a12] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-16">
            <span className="w-12 h-px" style={{ backgroundColor: themeConfig.primary }}></span>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">Hizmet Menüsü</h2>
          </div>
          
          <div className="space-y-4">
            {priceList.map((item, idx) => (
              <div key={idx} className="bg-[#12121f] border border-[#1e1e35] hover:border-[#3a3a5a] transition-all p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                      <EditableText value={item.title} onSave={handlePriceUpdate(idx, 'title')} isEditMode={isEditMode} multiline={false} />
                    </h3>
                    {item.is_popular && (
                      <span className="text-xs font-mono px-2 py-0.5" style={{ color: '#0a0a12', backgroundColor: themeConfig.primary }}>POPÜLER</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-slate-400 font-light text-sm">
                      <EditableText value={item.description} onSave={handlePriceUpdate(idx, 'description')} isEditMode={isEditMode} />
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-6 md:w-auto w-full justify-between md:justify-end border-t md:border-t-0 border-[#1e1e35] pt-4 md:pt-0 mt-4 md:mt-0">
                  {item.duration && (
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
                      <Clock size={14} />
                      <EditableText value={item.duration} onSave={handlePriceUpdate(idx, 'duration')} isEditMode={isEditMode} multiline={false} />
                    </div>
                  )}
                  <div className="text-2xl font-black" style={{ color: themeConfig.primary }}>
                    <EditableText value={item.price} onSave={handlePriceUpdate(idx, 'price')} isEditMode={isEditMode} multiline={false} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback (Glassmorphism / Retro için basit tablo/kart karışımı)
  return (
    <section className={`py-24 ${layoutConfig.pageBg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-4xl md:text-5xl font-bold ${layoutConfig.headingColor} text-center mb-16`}>Fiyat Listesi</h2>
        
        <div className="space-y-6">
          {priceList.map((item, idx) => (
            <div key={idx} className={`${layoutConfig.cardBg} ${layoutConfig.cardBorder} p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6`}>
              <div className="flex-1 text-center md:text-left">
                <h3 className={`text-xl font-bold ${layoutConfig.headingColor} mb-2`}>
                  <EditableText value={item.title} onSave={handlePriceUpdate(idx, 'title')} isEditMode={isEditMode} multiline={false} />
                </h3>
                {item.description && (
                  <p className={`${layoutConfig.mutedColor} text-sm`}>
                    <EditableText value={item.description} onSave={handlePriceUpdate(idx, 'description')} isEditMode={isEditMode} />
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-8">
                {item.duration && (
                  <div className={`flex items-center gap-2 ${layoutConfig.mutedColor} text-sm`}>
                    <Clock size={16} />
                    <EditableText value={item.duration} onSave={handlePriceUpdate(idx, 'duration')} isEditMode={isEditMode} multiline={false} />
                  </div>
                )}
                <div className="text-3xl font-bold" style={{ color: themeConfig.primary }}>
                  <EditableText value={item.price} onSave={handlePriceUpdate(idx, 'price')} isEditMode={isEditMode} multiline={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
