'use client';

import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Diamond, Check, Star } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function BeautyLuxuryTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const updateContent = (key: string, value: any) => {
    onUpdateContent({ ...content, [key]: value });
  };

  const services = content.price_list || content.services || [];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-rose-900 selection:text-white">
      {/* Top Banner */}
      <div className="bg-zinc-900 text-white text-xs font-semibold uppercase tracking-[0.2em] py-3 text-center">
        Ayrıcalıklı Estetik Deneyimi & Ücretsiz Konsültasyon
      </div>

      {/* Header */}
      <header className="border-b border-zinc-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-screen-xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
             <Diamond className="w-6 h-6 text-rose-900" />
             <EditableText content={content} contentKey="company.name" fallback="LUMIÈRE CLINIC" onUpdate={updateContent} isEditMode={isEditMode} />
          </div>
          <nav className="hidden lg:flex gap-10 text-sm font-bold uppercase tracking-widest text-zinc-500">
             <a href="#philosophy" className="hover:text-zinc-900 transition-colors">Felsefemiz</a>
             <a href="#procedures" className="hover:text-zinc-900 transition-colors">Prosedürler</a>
             <a href="#contact" className="hover:text-zinc-900 transition-colors">İletişim</a>
          </nav>
          <button className="hidden md:block border-2 border-zinc-900 text-zinc-900 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all">
            VIP Rezervasyon
          </button>
        </div>
      </header>

      {/* Editorial Hero */}
      <section className="max-w-screen-xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 flex flex-col items-start space-y-8">
          <h1 className="text-5xl lg:text-7xl font-extrabold uppercase tracking-tighter leading-[0.9]">
             <span className="block text-zinc-300 mb-2">Kusursuz</span>
             <EditableText content={content} contentKey="hero.title" fallback="Güzelliğe Açılan Kapı" onUpdate={updateContent} isEditMode={isEditMode} />
          </h1>
          <p className="text-zinc-500 text-lg lg:text-xl font-medium max-w-md leading-relaxed">
             <EditableText content={content} contentKey="hero.subtitle" fallback="Uzman hekim kadromuz ve FDA onaylı teknolojilerimizle size özel estetik çözümleri." onUpdate={updateContent} isEditMode={isEditMode} />
          </p>
          <button className="bg-rose-900 text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-rose-950 transition-colors">
            Hemen Başlayın
          </button>
        </div>
        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4 h-[60vh] lg:h-[80vh]">
          <div className="pt-12 h-full">
            <EditableImage
              src={content.hero?.image}
              alt="Model 1"
              onUpdate={(val: string) => updateContent('hero.image', val)}
              isEditMode={isEditMode}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pb-12 h-full">
            <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Model 2" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Minimal Pricing / Procedures */}
      <section id="procedures" className="py-24 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20 space-y-6">
             <h2 className="text-4xl font-extrabold uppercase tracking-tighter text-zinc-900">İmza Prosedürler</h2>
             <p className="text-zinc-500 font-medium">Şeffaf fiyatlandırma, üstün hizmet kalitesi.</p>
          </div>
          <div className="bg-white p-8 lg:p-12 shadow-sm border border-zinc-100">
            {services.map((item: any, i: number) => (
              <div key={i} className="group border-b border-zinc-100 last:border-0 py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex-1">
                   <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900 flex items-center gap-3">
                     <Check className="w-4 h-4 text-rose-900" />
                     {item.name || item.title}
                   </h3>
                   <p className="text-zinc-500 text-sm mt-2 pl-7">{item.description}</p>
                </div>
                <div className="text-right pl-7 md:pl-0">
                   <div className="text-2xl font-black text-rose-900 tracking-tighter">{item.price}</div>
                   <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-1">İtibaren</div>
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="text-center py-10 text-zinc-400 font-medium">Prosedür listesi güncelleniyor.</div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonial / Philosophy */}
      <section id="philosophy" className="py-24 max-w-screen-xl mx-auto px-6 text-center">
         <Star className="w-12 h-12 text-zinc-200 mx-auto mb-8" />
         <h2 className="text-3xl lg:text-5xl font-extrabold uppercase tracking-tighter leading-tight max-w-4xl mx-auto text-zinc-900 mb-12">
            "Amacımız, doğal görünümünüzü bozmadan en iyi versiyonunuzu ortaya çıkarmak."
         </h2>
         <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-zinc-200 rounded-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Doctor" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
               <div className="font-bold uppercase tracking-tight text-zinc-900">Dr. A. Yılmaz</div>
               <div className="text-xs font-bold uppercase tracking-widest text-rose-900">Medikal Direktör</div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-950 text-zinc-400 py-20 border-t-4 border-rose-900">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 text-white mb-6">
               <Diamond className="w-6 h-6 text-rose-900" />
               <EditableText content={content} contentKey="company.name" fallback="LUMIÈRE CLINIC" onUpdate={updateContent} isEditMode={isEditMode} />
            </div>
            <p className="max-w-sm text-sm leading-relaxed mb-8">
               <EditableText content={content} contentKey="about.description" fallback="En yeni medikal estetik uygulamalarıyla kendinize değer katın. Size özel danışmanlık hizmetimiz için bizimle iletişime geçin." onUpdate={updateContent} isEditMode={isEditMode} />
            </p>
          </div>
          <div>
             <h4 className="text-white font-bold uppercase tracking-widest mb-6">Bize Ulaşın</h4>
             <ul className="space-y-4 text-sm font-medium">
                <li>
                  <EditableText content={content} contentKey="contact.phone" fallback="+90 (850) 123 45 67" onUpdate={updateContent} isEditMode={isEditMode} />
                </li>
                <li>
                  <EditableText content={content} contentKey="contact.email" fallback="info@lumiereclinic.com" onUpdate={updateContent} isEditMode={isEditMode} />
                </li>
             </ul>
          </div>
          <div>
             <h4 className="text-white font-bold uppercase tracking-widest mb-6">Lokasyon</h4>
             <p className="text-sm font-medium leading-relaxed">
               <EditableText content={content} contentKey="contact.address" fallback="Levent Mah. Çilekli Sok. No:1, Beşiktaş / İstanbul" onUpdate={updateContent} isEditMode={isEditMode} />
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
