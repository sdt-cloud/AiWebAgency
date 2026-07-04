'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  const handleTestimonialUpdate = (index: number, field: 'name' | 'text') => (newValue: string) => {
    const newTestimonials = [...(content.testimonials || [])];
    newTestimonials[index] = { ...newTestimonials[index], [field]: newValue };
    onUpdateContent({ ...content, testimonials: newTestimonials });
  };

  const testimonials = content.testimonials?.length > 0 ? content.testimonials : [
    { name: 'Müşteri 1', text: 'Harika bir deneyimdi, kesinlikle tavsiye ederim. Hizmet kalitesi çok yüksek.', rating: 5 },
    { name: 'Müşteri 2', text: 'İhtiyaçlarımızı tam olarak anladılar ve mükemmel bir çözüm sundular.', rating: 5 }
  ];

  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex gap-1 mb-4" style={{ color: themeConfig.accent || '#fbbf24' }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} strokeWidth={i < rating ? 0 : 1.5} />
        ))}
      </div>
    );
  };

  // Neo-Minimalist (Sade, temiz, grid layout)
  if (layoutStyle === 'neo-minimalist') {
    return (
      <section className={`py-24 bg-white ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: themeConfig.primary }}>Müşteri Yorumları</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Müşterilerimiz Ne Diyor?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                {renderStars(testimonial.rating)}
                <p className="text-lg text-slate-700 leading-relaxed mb-6 italic">
                  "<EditableText
                    value={testimonial.text}
                    onSave={handleTestimonialUpdate(idx, 'text')}
                    isEditMode={isEditMode}
                  />"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                    {testimonial.name.charAt(0)}
                  </div>
                  <h4 className="font-bold text-slate-900">
                    <EditableText
                      value={testimonial.name}
                      onSave={handleTestimonialUpdate(idx, 'name')}
                      isEditMode={isEditMode}
                      multiline={false}
                    />
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Glassmorphism (Cam efektli kartlar)
  if (layoutStyle === 'glassmorphism') {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Müşteri Deneyimleri</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-10 border border-white/20 relative">
                <Quote className="absolute top-8 right-8 text-white/10" size={64} />
                {renderStars(testimonial.rating)}
                <p className="text-xl text-white/90 leading-relaxed mb-8 font-light relative z-10">
                  "<EditableText
                    value={testimonial.text}
                    onSave={handleTestimonialUpdate(idx, 'text')}
                    isEditMode={isEditMode}
                  />"
                </p>
                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-semibold text-white tracking-wide">
                    <EditableText
                      value={testimonial.name}
                      onSave={handleTestimonialUpdate(idx, 'name')}
                      isEditMode={isEditMode}
                      multiline={false}
                    />
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Dark Futuristic (Neon çizgiler, dark mode)
  if (layoutStyle === 'dark-futuristic') {
    return (
      <section className={`py-24 bg-[#0a0a12] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-16">
            <span className="w-12 h-px" style={{ backgroundColor: themeConfig.primary }}></span>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">Geri Bildirimler</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-[#12121f] p-8 border-l-2 relative group" style={{ borderColor: themeConfig.primary }}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity" style={{ color: themeConfig.primary }}>
                  <Quote size={40} />
                </div>
                {renderStars(testimonial.rating)}
                <p className="text-lg text-slate-300 font-light leading-loose mb-8">
                  <EditableText
                    value={testimonial.text}
                    onSave={handleTestimonialUpdate(idx, 'text')}
                    isEditMode={isEditMode}
                  />
                </p>
                <h4 className="text-white font-mono text-sm tracking-widest uppercase">
                  — <EditableText
                    value={testimonial.name}
                    onSave={handleTestimonialUpdate(idx, 'name')}
                    isEditMode={isEditMode}
                    multiline={false}
                  />
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Editorial & Retro-Modern (Gazete küpürü stili)
  if (layoutStyle === 'editorial-retro') {
    return (
      <section className={`py-24 bg-[#faf7f2] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif text-center text-[#2d2418] mb-16 italic">Ziyaretçilerimizin Gözünden</h2>
          
          <div className="space-y-16">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <Quote className="text-[#d4c5b0] mb-6" size={48} />
                <p className="text-2xl md:text-3xl text-[#5c4f3d] font-serif italic leading-relaxed mb-8 max-w-3xl">
                  "<EditableText
                    value={testimonial.text}
                    onSave={handleTestimonialUpdate(idx, 'text')}
                    isEditMode={isEditMode}
                  />"
                </p>
                {renderStars(testimonial.rating)}
                <div className="w-12 h-px bg-[#d4c5b0] mb-4"></div>
                <h4 className="text-lg font-bold text-[#2d2418] tracking-widest uppercase text-sm">
                  <EditableText
                    value={testimonial.name}
                    onSave={handleTestimonialUpdate(idx, 'name')}
                    isEditMode={isEditMode}
                    multiline={false}
                  />
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Neo-Brutalism (Yüksek kontrast, sert çizgiler)
  return (
    <section className={`py-24 bg-[#e5e5e5] border-b-4 border-black`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl md:text-7xl font-black text-black mb-16 uppercase bg-white inline-block px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
          YORUMLAR
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_#000] relative">
              <div className="absolute -top-6 -right-6 bg-black text-white p-3 border-4 border-black transform rotate-12">
                <Quote size={24} />
              </div>
              
              <div className="flex gap-1 mb-6 text-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill={i < (testimonial.rating || 5) ? "#000" : "none"} strokeWidth={2} />
                ))}
              </div>
              
              <p className="text-xl font-bold text-gray-800 mb-8 border-l-4 border-black pl-4">
                "<EditableText
                  value={testimonial.text}
                  onSave={handleTestimonialUpdate(idx, 'text')}
                  isEditMode={isEditMode}
                />"
              </p>
              
              <h4 className="text-xl font-black text-black uppercase bg-gray-100 inline-block px-4 py-2 border-2 border-black">
                <EditableText
                  value={testimonial.name}
                  onSave={handleTestimonialUpdate(idx, 'name')}
                  isEditMode={isEditMode}
                  multiline={false}
                />
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
