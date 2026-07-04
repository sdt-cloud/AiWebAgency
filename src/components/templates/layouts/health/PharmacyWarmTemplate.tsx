'use client';

import React from 'react';
import { TemplateContent, ThemeConfig } from '../../template-types';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { Leaf, Droplet, Sun, Flower2, Heart, ArrowRight } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function PharmacyWarmTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: Props) {
  const { fonts } = themeConfig;

  return (
    <div className="min-h-screen bg-[#fcfaf8] text-[#3d4035]" style={{ fontFamily: fonts?.body || 'Lora, serif' }}>
      
      {/* Editorial Navbar */}
      <header className="border-b border-[#e8e4dc]">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-8 text-sm tracking-widest uppercase text-[#8c8f85]">
            <span className="hover:text-[#3d4035] cursor-pointer transition-colors">Apothecary</span>
            <span className="hover:text-[#3d4035] cursor-pointer transition-colors">Skincare</span>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-medium tracking-tight text-[#2b2d24]" style={{ fontFamily: fonts?.heading }}>
              <EditableText
                content={content}
                contentKey="hero.title"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="Botanical Pharmacy"
              />
            </h1>
            <p className="text-xs tracking-widest uppercase text-[#a3a69b] mt-2">Health & Wellness</p>
          </div>

          <div className="flex gap-8 text-sm tracking-widest uppercase text-[#8c8f85]">
            <span className="hover:text-[#3d4035] cursor-pointer transition-colors">Journal</span>
            <span className="hover:text-[#3d4035] cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </header>

      {/* Hero Editorial */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <div className="rounded-t-[100px] rounded-b-[200px] overflow-hidden border-8 border-white shadow-xl shadow-[#ece9e0]">
                <EditableImage
                  content={content}
                  contentKey="hero.image"
                  isEditMode={isEditMode}
                  onUpdate={onUpdateContent}
                  className="w-full h-[600px] object-cover"
                  fallback="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80"
                  alt="Natural Pharmacy"
                />
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-10">
              <div className="inline-flex items-center gap-2 text-[#7c8f61] mb-6">
                <Leaf size={18} />
                <span className="text-sm tracking-widest uppercase font-medium">Holistic Approach</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-light leading-tight mb-8" style={{ fontFamily: fonts?.heading }}>
                <span className="italic text-[#7c8f61]">Doğadan</span> Gelen<br />
                Şifa Kaynağınız
              </h2>
              <p className="text-lg text-[#6b6e62] leading-relaxed mb-10 max-w-md">
                <EditableText
                  content={content}
                  contentKey="hero.subtitle"
                  isEditMode={isEditMode}
                  onUpdate={onUpdateContent}
                  fallback="Modern tıbbın güvenilirliğini, doğanın iyileştirici gücüyle harmanlıyoruz. Organik ürünlerimizle kendinizi yenileyin."
                />
              </p>
              <button className="group flex items-center gap-4 bg-[#3d4035] text-[#fcfaf8] px-8 py-4 rounded-full hover:bg-[#7c8f61] transition-colors duration-500">
                <span className="tracking-widest uppercase text-sm">Ürünleri İncele</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Categories */}
      <section className="py-24 bg-[#f2efe9] rounded-[80px] my-10 mx-4">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h3 className="text-3xl italic mb-4" style={{ fontFamily: fonts?.heading }}>Özenle Seçilmiş Koleksiyon</h3>
            <p className="text-[#6b6e62]">Sağlığınız ve güzelliğiniz için en doğal içeriklere sahip ürünleri sizin için bir araya getirdik.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Droplet, title: 'Dermokozmetik', desc: 'Cildinize doğal dokunuş' },
              { icon: Sun, title: 'Vitaminler', desc: 'Günlük enerji kaynağınız' },
              { icon: Flower2, title: 'Bitkisel Yağlar', desc: 'Aromaterapik çözümler' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8">
                <div className="w-24 h-24 rounded-full bg-[#e8e4dc] flex items-center justify-center mb-6 text-[#7c8f61] transition-transform hover:scale-110 duration-500">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-medium mb-3" style={{ fontFamily: fonts?.heading }}>
                  <EditableText
                    content={content}
                    contentKey={`services.items.${i}.title`}
                    isEditMode={isEditMode}
                    onUpdate={onUpdateContent}
                    fallback={item.title}
                  />
                </h4>
                <p className="text-[#8c8f85] text-sm">
                  <EditableText
                    content={content}
                    contentKey={`services.items.${i}.description`}
                    isEditMode={isEditMode}
                    onUpdate={onUpdateContent}
                    fallback={item.desc}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimal Editorial */}
      <footer className="py-20 text-center">
        <div className="container mx-auto px-6">
          <Heart className="mx-auto text-[#7c8f61] mb-6" size={24} />
          <p className="text-xl italic mb-6 max-w-xl mx-auto text-[#6b6e62]" style={{ fontFamily: fonts?.heading }}>
            "Sağlık, beden, zihin ve ruhun uyum içinde olmasıdır."
          </p>
          <div className="text-sm tracking-widest uppercase text-[#a3a69b] space-y-2">
            <EditableText
              content={content}
              contentKey="contact.address"
              isEditMode={isEditMode}
              onUpdate={onUpdateContent}
              fallback="Yeşil Sokak No:12, Moda / İstanbul"
            />
            <p>
              <EditableText
                content={content}
                contentKey="contact.phone"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="+90 216 123 45 67"
              />
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
