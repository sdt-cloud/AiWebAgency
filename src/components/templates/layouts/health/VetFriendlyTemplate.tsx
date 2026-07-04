'use client';

import React from 'react';
import { TemplateContent, ThemeConfig } from '../../template-types';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { Heart, Phone, MapPin, Clock, Stethoscope, Star, Shield, ArrowRight } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function VetFriendlyTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: Props) {
  const { fonts } = themeConfig;
  
  return (
    <div className="min-h-screen bg-[#FFFDF7] overflow-hidden" style={{ fontFamily: fonts?.body || 'Nunito, sans-serif' }}>
      
      {/* Playful Header */}
      <header className="absolute top-0 w-full z-50 py-6 px-6">
        <div className="container mx-auto bg-white/80 backdrop-blur-xl rounded-full shadow-sm px-8 py-4 flex items-center justify-between border border-[#FFE156]/20">
          <div className="flex items-center gap-3">
            <div className="bg-[#40E0D0] text-white p-2 rounded-full transform -rotate-12">
              <Heart size={24} fill="white" />
            </div>
            <EditableText
              content={content}
              contentKey="hero.title"
              isEditMode={isEditMode}
              onUpdate={onUpdateContent}
              className="text-2xl font-black text-[#2D3142]"
              style={{ fontFamily: fonts?.heading }}
              fallback="Mutlu Patiler"
            />
          </div>
          
          <div className="hidden md:flex gap-8 text-[#4F5D75] font-bold">
            <a href="#about" className="hover:text-[#40E0D0] transition-colors">Hakkımızda</a>
            <a href="#services" className="hover:text-[#40E0D0] transition-colors">Hizmetler</a>
            <a href="#contact" className="hover:text-[#40E0D0] transition-colors">İletişim</a>
          </div>

          <button className="bg-[#FFE156] hover:bg-[#FFD100] text-[#2D3142] font-black px-6 py-2 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2">
            <Phone size={18} />
            <EditableText
              content={content}
              contentKey="contact.phone"
              isEditMode={isEditMode}
              onUpdate={onUpdateContent}
              fallback="0555 123 4567"
            />
          </button>
        </div>
      </header>

      {/* Hero with Wavy Bottom */}
      <section className="relative pt-40 pb-48 bg-[#40E0D0]/10">
        {/* Decorative Blobs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFE156] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#FF9F1C] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />
        
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-[#FF9F1C] font-bold text-sm mb-6 shadow-sm border border-[#FF9F1C]/20">
              <Star size={16} fill="#FF9F1C" />
              <span className="tracking-wide">Dostlarınız Bizimle Güvende!</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-[#2D3142] leading-[1.1] mb-6" style={{ fontFamily: fonts?.heading }}>
              <EditableText
                content={content}
                contentKey="hero.title"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="Onların Mutluluğu Bizim Önceliğimiz"
              />
            </h1>
            
            <p className="text-xl text-[#4F5D75] font-medium mb-10 max-w-lg leading-relaxed">
              <EditableText
                content={content}
                contentKey="hero.subtitle"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="Sevimli dostlarınız için en iyi bakımı sunan uzman veteriner hekim kadromuzla tanışın."
              />
            </p>
            
            <div className="flex gap-4">
              <button className="bg-[#40E0D0] hover:bg-[#20D0C0] text-white font-black px-8 py-4 rounded-full shadow-lg shadow-[#40E0D0]/30 transition-transform hover:-translate-y-1 text-lg">
                Randevu Alın
              </button>
              <button className="bg-white text-[#2D3142] font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-lg flex items-center gap-2 border border-gray-100">
                Hizmetleri Gör
                <ArrowRight size={20} className="text-[#40E0D0]" />
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Cute Image Frame */}
            <div className="relative z-10 w-full aspect-square md:aspect-[4/5] rounded-[100px] rounded-tl-[200px] rounded-br-[200px] overflow-hidden border-8 border-white shadow-2xl">
              <EditableImage
                content={content}
                contentKey="hero.image"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                className="w-full h-full object-cover"
                fallback="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
                alt="Cute Pets"
              />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 animate-bounce">
              <div className="bg-[#FFE156] p-3 rounded-full">
                <Heart size={24} className="text-[#2D3142]" fill="currentColor" />
              </div>
              <div>
                <p className="font-black text-[#2D3142] text-xl">5000+</p>
                <p className="text-[#4F5D75] text-sm font-bold">Mutlu Pati</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wavy bottom divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[100px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,126.38,201.33,119.53,243.68,115.42,284.4,103.35,321.39,56.44Z" fill="#FFFDF7"></path>
          </svg>
        </div>
      </section>

      {/* Services Section with Cards */}
      <section className="py-20 relative z-10" id="services">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-[#2D3142] mb-4" style={{ fontFamily: fonts?.heading }}>
              Sevimli Dostlarımıza Özel Hizmetler
            </h2>
            <p className="text-[#4F5D75] font-medium text-lg">
              Check-up, aşılama ve acil durum müdahaleleriyle her an yanınızdayız.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Stethoscope, color: '#40E0D0' },
              { icon: Shield, color: '#FF9F1C' },
              { icon: Heart, color: '#FF6B6B' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[40px] p-8 shadow-xl shadow-gray-100/50 border-4 border-transparent hover:border-[#FFE156] transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                  <item.icon size={40} className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-black text-[#2D3142] mb-3">
                  <EditableText
                    content={content}
                    contentKey={`services.items.${i}.title`}
                    isEditMode={isEditMode}
                    onUpdate={onUpdateContent}
                    fallback={`Hizmet ${i + 1}`}
                  />
                </h3>
                <p className="text-[#4F5D75] font-medium leading-relaxed mb-6">
                  <EditableText
                    content={content}
                    contentKey={`services.items.${i}.description`}
                    isEditMode={isEditMode}
                    onUpdate={onUpdateContent}
                    fallback="Detaylı hizmet açıklaması buraya gelecek. Dostlarınız için en iyisini düşünüyoruz."
                  />
                </p>
                <button className="text-lg font-black flex items-center gap-2" style={{ color: item.color }}>
                  Detaylar <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Playful */}
      <footer className="bg-[#2D3142] pt-24 pb-12 rounded-t-[60px] md:rounded-t-[100px] mt-20 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#FFE156] rounded-full border-8 border-[#FFFDF7] flex items-center justify-center text-[#2D3142]">
          <Heart size={32} fill="currentColor" />
        </div>
        
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h4 className="text-2xl font-black text-white mb-6">İletişim</h4>
            <div className="space-y-4 text-[#A8B2C1] font-medium">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="text-[#40E0D0]" size={20} />
                <EditableText
                  content={content}
                  contentKey="contact.phone"
                  isEditMode={isEditMode}
                  onUpdate={onUpdateContent}
                  fallback="0555 123 4567"
                />
              </div>
              <div className="flex items-start justify-center md:justify-start gap-3">
                <MapPin className="text-[#FF9F1C] mt-1" size={20} />
                <EditableText
                  content={content}
                  contentKey="contact.address"
                  isEditMode={isEditMode}
                  onUpdate={onUpdateContent}
                  fallback="Pati Caddesi, Sevgi Sokak No:1"
                />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 text-center md:text-right">
            <h4 className="text-4xl font-black text-white mb-4" style={{ fontFamily: fonts?.heading }}>
              Dostlarınızı Çok Seviyoruz!
            </h4>
            <p className="text-[#A8B2C1] font-medium mb-8 max-w-md ml-auto">
              Bize her zaman ulaşabilir, aklınıza takılan soruları sorabilirsiniz.
            </p>
            <p className="text-[#A8B2C1] font-bold">© 2026 Mutlu Patiler Veteriner Kliniği</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
