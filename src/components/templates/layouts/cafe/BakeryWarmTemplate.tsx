'use client';

import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Wheat, MapPin, Phone, Clock, ShoppingBag } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function BakeryWarmTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const handleChange = (path: string, value: any) => {
    onUpdateContent({ ...content, [path]: value });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#5C4033] font-serif selection:bg-[#E6C280]">
      {/* Handcrafted Header */}
      <header className="px-6 py-8 md:px-12 flex justify-between items-center border-b border-[#E6C280]/30 relative z-50">
        <div className="flex items-center gap-3">
          <Wheat size={32} className="text-[#D2691E]" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#8B4513]">
            <EditableText
              content={content.hero?.title || 'THE ARTISAN BAKER'}
              onUpdate={(val: string) => handleChange('hero.title', val)}
              isEditMode={isEditMode}
              multiline={false}
            />
          </h1>
        </div>
        <button className="hidden md:flex items-center gap-2 bg-[#8B4513] text-[#FFF9F0] px-6 py-2.5 rounded-full text-sm font-sans font-medium hover:bg-[#A0522D] transition-colors">
          <ShoppingBag size={18} />
          Sipariş Ver
        </button>
      </header>

      {/* Warm Hero */}
      <section className="relative px-6 py-20 md:py-32 md:px-12 max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 space-y-8 z-10">
          <div className="inline-block bg-[#F5DEB3] text-[#8B4513] px-4 py-1 rounded-full text-sm font-sans font-medium tracking-wide">
            Her Sabah Taze Çıkar
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-[#5C4033] leading-[1.1]">
            <EditableText
              content={content.hero?.subtitle || 'Odun ateşinden sıcacık sofranıza.'}
              onUpdate={(val: string) => handleChange('hero.subtitle', val)}
              isEditMode={isEditMode}
            />
          </h2>
          <p className="text-lg md:text-xl font-sans text-[#8B4513]/80 leading-relaxed max-w-lg">
             <EditableText
              content={content.hero?.description || 'Ekşi mayalı ekmeklerimiz ve el yapımı hamur işlerimizle, geleneksel tatları modern dokunuşlarla sunuyoruz.'}
              onUpdate={(val: string) => handleChange('hero.description', val)}
              isEditMode={isEditMode}
            />
          </p>
        </div>
        
        <div className="w-full md:w-1/2 relative">
          <div className="absolute -inset-4 bg-[#E6C280]/20 rounded-[40px] transform rotate-3 -z-10"></div>
          <div className="aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl border-4 border-[#FFF9F0]">
            <EditableImage
              src={content.hero?.image}
              alt="Bakery Goodies"
              onUpdate={(val: string) => handleChange('hero.image', val)}
              isEditMode={isEditMode}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-[#D2691E] text-white p-6 rounded-full w-32 h-32 flex items-center justify-center text-center shadow-xl transform -rotate-12">
            <span className="font-bold text-lg leading-tight">%100<br/>Ekşi Maya</span>
          </div>
        </div>
      </section>

      {/* Artisan Specialties - Masonry Card Layout */}
      <section className="py-24 px-6 md:px-12 bg-[#FDF5E6]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">Fırından Çıkanlar</h3>
            <p className="font-sans text-[#A0522D] max-w-md mx-auto">Usta ellerden dökülen, özenle hazırlanmış günlük lezzetlerimiz.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.menu_items?.map((item: any, index: number) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E6C280]/20 hover:-translate-y-2 transition-transform duration-300">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-[#FFF9F0]">
                  <EditableImage
                    src={item.image}
                    alt={item.title}
                    onUpdate={(val: string) => {
                      const newItems = [...(content.menu_items || [])];
                      newItems[index] = { ...item, image: val };
                      handleChange('menu_items', newItems);
                    }}
                    isEditMode={isEditMode}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-2xl font-bold text-[#5C4033]">
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
                  <span className="bg-[#FFF9F0] text-[#D2691E] font-sans font-bold px-3 py-1 rounded-lg">
                    <EditableText
                      content={item.price || ''}
                      onUpdate={(val: string) => {
                        const newItems = [...(content.menu_items || [])];
                        newItems[index] = { ...item, price: val };
                        handleChange('menu_items', newItems);
                      }}
                      isEditMode={isEditMode}
                    />
                  </span>
                </div>
                <p className="font-sans text-[#8B4513]/70 text-sm">
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

      {/* Friendly Footer */}
      <footer className="bg-[#8B4513] text-[#FFF9F0] py-16 px-6 md:px-12 mt-12 rounded-t-[40px] md:rounded-t-[80px]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h4 className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
              <Wheat size={28} />
              <EditableText
                content={content.hero?.title || 'THE BAKERY'}
                onUpdate={(val: string) => handleChange('hero.title', val)}
                isEditMode={isEditMode}
                multiline={false}
              />
            </h4>
            <p className="font-sans text-[#E6C280] max-w-sm mx-auto md:mx-0">
              Günün her saati taze ekmek ve hamur işi kokusuyla sizi bekliyoruz.
            </p>
          </div>

          <div className="font-sans text-[#E6C280] space-y-4">
            <h5 className="text-xl font-serif font-bold text-white mb-6">Ulaşım</h5>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <MapPin size={20} />
              <EditableText
                content={content.contact?.address || 'Fırıncılar Cad. No:1, İstanbul'}
                onUpdate={(val: string) => handleChange('contact.address', val)}
                isEditMode={isEditMode}
              />
            </p>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <Phone size={20} />
              <EditableText
                content={content.contact?.phone || '0212 555 00 00'}
                onUpdate={(val: string) => handleChange('contact.phone', val)}
                isEditMode={isEditMode}
              />
            </p>
          </div>

          <div className="font-sans text-[#E6C280] space-y-4">
            <h5 className="text-xl font-serif font-bold text-white mb-6">Fırın Saatleri</h5>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <Clock size={20} />
              Her gün: 06:00 - 20:00
            </p>
            <p className="text-sm opacity-80 mt-2">* Taze ekmek çıkış saatleri: 07:00, 12:00, 16:00</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
