'use client';

import React from 'react';
import { TemplateContent, ThemeConfig } from '../../template-types';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { ArrowUpRight, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function DentalPremiumTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: Props) {
  const { colors, fonts } = themeConfig;
  const primaryColor = colors?.primary || '#0d9488'; // Dark Teal
  const accentColor = colors?.accent || '#ccfbf1';

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden" style={{ fontFamily: fonts?.body || 'Outfit, sans-serif' }}>
      
      {/* Background Orbs for Glassmorphism */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-900/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-900/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-50 px-8 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <Sparkles className="text-teal-400" size={28} />
          <EditableText
            content={content}
            contentKey="hero.title"
            isEditMode={isEditMode}
            onUpdate={onUpdateContent}
            className="text-2xl font-light tracking-widest text-white/90 uppercase"
            fallback="AESTHETIC"
          />
        </div>
        <div className="hidden md:flex gap-12 text-sm tracking-widest text-white/60">
          <span className="hover:text-white cursor-pointer transition-colors">EXPERTISE</span>
          <span className="hover:text-white cursor-pointer transition-colors">GALLERY</span>
          <span className="hover:text-white cursor-pointer transition-colors">CLINIC</span>
        </div>
        <button className="px-6 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm tracking-wide flex items-center gap-2 backdrop-blur-md">
          <PhoneCall size={16} />
          <span>CONTACT</span>
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-24 pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7">
            <h1 className="text-6xl md:text-8xl font-light leading-[1.1] tracking-tight mb-8" style={{ fontFamily: fonts?.heading }}>
              <span className="block text-white/50">Redefining</span>
              <EditableText
                content={content}
                contentKey="hero.title"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                className="block font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-400"
                fallback="Dental Esthetics"
              />
            </h1>
            <p className="text-xl text-white/40 font-light max-w-xl leading-relaxed mb-12">
              <EditableText
                content={content}
                contentKey="hero.subtitle"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="Experience the pinnacle of cosmetic dentistry. We craft smiles that are not just beautiful, but a masterpiece of precision and art."
              />
            </p>
            
            <div className="flex items-center gap-8">
              <button className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-full transition-all flex items-center gap-3">
                Book Consultation
                <ArrowUpRight size={20} />
              </button>
              
              <div className="flex items-center gap-4 text-white/50 text-sm">
                <ShieldCheck size={24} className="text-teal-400/50" />
                <span>Certified<br/>Professionals</span>
              </div>
            </div>
          </div>

          {/* Right Images (Asymmetric) */}
          <div className="lg:col-span-5 relative h-[600px]">
            <div className="absolute top-0 right-0 w-[80%] h-[70%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-20">
              <div className="absolute inset-0 bg-black/20 z-10" />
              <EditableImage
                content={content}
                contentKey="hero.image"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                fallback="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80"
                alt="Premium Clinic"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 w-[60%] h-[50%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-30 glassmorphism-card backdrop-blur-md">
              <EditableImage
                content={content}
                contentKey="gallery.1"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                className="w-full h-full object-cover opacity-80"
                fallback="https://images.unsplash.com/photo-1598256989800-fea5c5ce870b?auto=format&fit=crop&q=80"
                alt="Detail"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-xs tracking-widest text-teal-400 uppercase">Before & After</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Services - Glassmorphism Cards */}
      <section className="relative z-10 py-32 border-t border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: fonts?.heading }}>
              <span className="text-white/50 block mb-2">Our Signature</span>
              Treatments
            </h2>
            <button className="text-teal-400 text-sm tracking-widest uppercase hover:text-teal-300 transition-colors flex items-center gap-2">
              View All Services <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group p-10 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-teal-500/30 transition-all duration-500 backdrop-blur-xl">
                <div className="text-5xl font-light text-white/10 mb-8 group-hover:text-teal-500/20 transition-colors">
                  0{i}
                </div>
                <h3 className="text-2xl font-light mb-4">
                  <EditableText
                    content={content}
                    contentKey={`services.items.${i - 1}.title`}
                    isEditMode={isEditMode}
                    onUpdate={onUpdateContent}
                    fallback={i === 1 ? 'Veneers' : i === 2 ? 'Implants' : 'Whitening'}
                  />
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  <EditableText
                    content={content}
                    contentKey={`services.items.${i - 1}.description`}
                    isEditMode={isEditMode}
                    onUpdate={onUpdateContent}
                    fallback="A comprehensive approach to restoring your perfect smile with absolute precision and premium materials."
                  />
                </p>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-teal-500 group-hover:border-teal-500 group-hover:text-black transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/30 text-sm tracking-widest uppercase">
            © 2026 Aesthetic Dental
          </div>
          <div className="text-white/50 text-sm font-light">
            <EditableText
              content={content}
              contentKey="contact.address"
              isEditMode={isEditMode}
              onUpdate={onUpdateContent}
              fallback="123 Luxury Avenue, Beverly Hills"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
