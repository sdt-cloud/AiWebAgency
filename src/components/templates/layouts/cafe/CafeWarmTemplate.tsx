'use client';

import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Coffee, MapPin, Phone, Globe, ArrowRight } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function CafeWarmTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const handleChange = (path: string, value: any) => {
    // In a real implementation, this would deeply merge the path
    onUpdateContent({ ...content, [path]: value });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3F35] font-sans selection:bg-[#E8DCC4]">
      {/* Custom Header */}
      <header className="absolute top-0 left-0 w-full z-50 py-6 px-8 lg:px-16 flex justify-between items-center mix-blend-difference text-[#FDFBF7]">
        <div className="text-2xl font-serif tracking-widest uppercase">
          <EditableText
            content={content.hero?.title || 'CAFE NAME'}
            onUpdate={(val: string) => handleChange('hero.title', val)}
            isEditMode={isEditMode}
            multiline={false}
          />
        </div>
        <nav className="hidden md:flex gap-12 text-sm font-medium tracking-widest">
          <a href="#about" className="hover:opacity-60 transition-opacity">Hikayemiz</a>
          <a href="#menu" className="hover:opacity-60 transition-opacity">Menü</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity">İletişim</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={content.hero?.image}
            alt="Cafe Interior"
            onUpdate={(val: string) => handleChange('hero.image', val)}
            isEditMode={isEditMode}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <div className="bg-[#FDFBF7]/90 backdrop-blur-md px-12 py-16 rounded-t-[100px] rounded-b-[100px] border border-[#E8DCC4] shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-serif text-[#4A3F35] mb-6 leading-tight">
              <EditableText
                content={content.hero?.subtitle || 'Sıcak Bir Mola'}
                onUpdate={(val: string) => handleChange('hero.subtitle', val)}
                isEditMode={isEditMode}
              />
            </h1>
            <p className="text-lg md:text-xl text-[#6B5A4E] mb-10 font-light max-w-xl mx-auto">
              <EditableText
                content={content.hero?.description || 'Taze kahve çekirdekleri ve el yapımı lezzetlerin buluşma noktası.'}
                onUpdate={(val: string) => handleChange('hero.description', val)}
                isEditMode={isEditMode}
              />
            </p>
            <button className="bg-[#4A3F35] text-[#FDFBF7] px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-[#6B5A4E] transition-colors inline-flex items-center gap-3">
              Menüyü Keşfet <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section - Organic Shape */}
      <section id="about" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8DCC4]/30 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[200px] overflow-hidden">
               <EditableImage
                  src={content.about?.image}
                  alt="About Cafe"
                  onUpdate={(val: string) => handleChange('about.image', val)}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#D4C3A3] rounded-full flex items-center justify-center p-8 text-center text-sm font-serif italic text-[#4A3F35]">
              "Her yudumda sevgi var."
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-[#4A3F35]">
              <EditableText
                content={content.about?.title || 'Hikayemiz'}
                onUpdate={(val: string) => handleChange('about.title', val)}
                isEditMode={isEditMode}
              />
            </h2>
            <div className="text-lg leading-relaxed text-[#6B5A4E] space-y-6">
              <EditableText
                content={content.about?.description || 'Küçük bir tutkuyla başlayan yolculuğumuz, bugün şehrin en sıcak kahve durağına dönüştü...'}
                onUpdate={(val: string) => handleChange('about.description', val)}
                isEditMode={isEditMode}
                multiline={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 bg-[#E8DCC4]/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif text-[#4A3F35] mb-4">Özel Lezzetler</h2>
            <div className="w-24 h-1 bg-[#D4C3A3] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {content.menu_items?.map((item: any, index: number) => (
              <div key={index} className="flex gap-6 group">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-[#FDFBF7] shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <EditableImage
                    src={item.image}
                    alt={item.title}
                    onUpdate={(val: string) => {
                      const newItems = [...(content.menu_items || [])];
                      newItems[index] = { ...item, image: val };
                      handleChange('menu_items', newItems);
                    }}
                    isEditMode={isEditMode}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex justify-between items-baseline mb-2 border-b border-[#D4C3A3] pb-2">
                    <h3 className="text-xl font-serif text-[#4A3F35]">
                       <EditableText
                        content={item.title}
                        onUpdate={(val: string) => {
                          const newItems = [...(content.menu_items || [])];
                          newItems[index] = { ...item, title: val };
                          handleChange('menu_items', newItems);
                        }}
                        isEditMode={isEditMode}
                      />
                    </h3>
                    <span className="text-lg font-medium text-[#6B5A4E]">
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
                  <p className="text-sm text-[#8B7A6E]">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Footer */}
      <footer id="contact" className="bg-[#4A3F35] text-[#FDFBF7] py-20 px-4 rounded-t-[50px] md:rounded-t-[100px] mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          <div className="space-y-6">
             <div className="text-3xl font-serif tracking-widest uppercase">
              <EditableText
                content={content.hero?.title || 'CAFE NAME'}
                onUpdate={(val: string) => handleChange('hero.title', val)}
                isEditMode={isEditMode}
                multiline={false}
              />
            </div>
            <p className="text-[#D4C3A3] font-light max-w-sm mx-auto md:mx-0">
              Sıcak bir kahve, tatlı bir sohbet. Sizi ağırlamaktan mutluluk duyarız.
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-[#D4C3A3]">
              <a href="#" className="hover:text-white transition-colors"><Globe size={24} /></a>
              <a href="#" className="hover:text-white transition-colors"><Globe size={24} /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xl font-serif text-[#D4C3A3] mb-6">İletişim</h4>
            <div className="space-y-4">
              <p className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-[#D4C3A3]" />
                <EditableText
                  content={content.contact?.address || '123 Cafe Sokak, İstanbul'}
                  onUpdate={(val: string) => handleChange('contact.address', val)}
                  isEditMode={isEditMode}
                />
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="text-[#D4C3A3]" />
                 <EditableText
                  content={content.contact?.phone || '+90 555 123 45 67'}
                  onUpdate={(val: string) => handleChange('contact.phone', val)}
                  isEditMode={isEditMode}
                />
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-serif text-[#D4C3A3] mb-6">Çalışma Saatleri</h4>
            <div className="space-y-2 text-[#D4C3A3]">
              <p className="flex justify-between max-w-xs mx-auto md:mx-0">
                <span>Pzt - Cuma</span>
                <span>08:00 - 22:00</span>
              </p>
              <p className="flex justify-between max-w-xs mx-auto md:mx-0">
                <span>Cmt - Pzr</span>
                <span>09:00 - 23:00</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
