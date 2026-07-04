'use client';

import React from 'react';
import { TemplateContent, ThemeConfig } from '../../template-types';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { Phone, MapPin, Clock, Activity, ShieldPlus, ChevronRight, Stethoscope, Briefcase } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function VetModernTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: Props) {
  const { fonts } = themeConfig;
  const primaryColor = '#1e3a8a'; // Dark Blue
  const accentColor = '#e11d48'; // Rose/Red for emergencies

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800" style={{ fontFamily: fonts?.body || 'Roboto, sans-serif' }}>
      
      {/* Top Bar for Emergency */}
      <div className="bg-rose-600 text-white font-bold tracking-wide text-sm">
        <div className="container mx-auto px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 uppercase">
            <Activity size={18} className="animate-pulse" />
            <span>7/24 ACİL HAYVAN HASTANESİ</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <EditableText
              content={content}
              contentKey="contact.phone"
              isEditMode={isEditMode}
              onUpdate={onUpdateContent}
              fallback="0212 999 88 77"
            />
          </div>
        </div>
      </div>

      {/* Corporate Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-900 text-white rounded flex items-center justify-center">
              <ShieldPlus size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase text-blue-900 tracking-tight" style={{ fontFamily: fonts?.heading }}>
                <EditableText
                  content={content}
                  contentKey="hero.title"
                  isEditMode={isEditMode}
                  onUpdate={onUpdateContent}
                  fallback="VET MERKEZ"
                />
              </h1>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tam Teşekküllü Hayvan Hastanesi</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 font-bold text-sm text-slate-600 uppercase tracking-wide">
            <a href="#" className="hover:text-blue-900 transition-colors">Hakkımızda</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Birimlerimiz</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Hekimlerimiz</a>
            <button className="bg-blue-900 text-white px-8 py-3 hover:bg-blue-800 transition-colors">
              RANDEVU AL
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <EditableImage
            content={content}
            contentKey="hero.image"
            isEditMode={isEditMode}
            onUpdate={onUpdateContent}
            className="w-full h-full object-cover"
            fallback="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80"
            alt="Hospital"
          />
        </div>
        
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-800 px-4 py-1 mb-6 text-sm font-bold uppercase tracking-wider">
              Uluslararası Standartlarda Teşhis & Tedavi
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase leading-tight" style={{ fontFamily: fonts?.heading }}>
              <EditableText
                content={content}
                contentKey="hero.title"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="Gelişmiş Veteriner Tıbbı"
              />
            </h2>
            <p className="text-xl text-blue-100 font-light max-w-xl mb-10 leading-relaxed">
              <EditableText
                content={content}
                contentKey="hero.subtitle"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="Son teknoloji görüntüleme sistemleri, yoğun bakım ünitesi ve uzman cerrahi kadromuzla yanınızdayız."
              />
            </p>
            <div className="flex gap-4">
              <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-4 uppercase tracking-wide transition-colors">
                Acil Durum Bildir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Services Table/Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="mb-16 border-l-4 border-blue-900 pl-6">
            <h2 className="text-3xl font-black text-slate-900 uppercase mb-2" style={{ fontFamily: fonts?.heading }}>Tıbbi Birimlerimiz</h2>
            <p className="text-slate-600 font-medium text-lg">Kapsamlı veteriner sağlığı hizmetleri.</p>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 border-b border-slate-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-10 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <Stethoscope className="text-blue-900 mb-6" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 uppercase mb-4 group-hover:text-blue-900 transition-colors">
                    <EditableText
                      content={content}
                      contentKey={`services.items.${i-1}.title`}
                      isEditMode={isEditMode}
                      onUpdate={onUpdateContent}
                      fallback={i === 1 ? 'Cerrahi Operasyonlar' : i === 2 ? 'Dahiliye' : 'Görüntüleme Merkezi'}
                    />
                  </h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    <EditableText
                      content={content}
                      contentKey={`services.items.${i-1}.description`}
                      isEditMode={isEditMode}
                      onUpdate={onUpdateContent}
                      fallback="Modern donanımlarla uzman veteriner hekimlerimiz tarafından uygulanan tedavi protokolleri."
                    />
                  </p>
                  <div className="flex items-center text-rose-600 font-bold text-sm uppercase tracking-wider">
                    İncele <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {[4, 5, 6].map((i) => (
                <div key={i} className="p-10 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <Briefcase className="text-blue-900 mb-6" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 uppercase mb-4 group-hover:text-blue-900 transition-colors">
                    <EditableText
                      content={content}
                      contentKey={`services.items.${i-1}.title`}
                      isEditMode={isEditMode}
                      onUpdate={onUpdateContent}
                      fallback={i === 4 ? 'Yoğun Bakım Ünitesi' : i === 5 ? 'Laboratuvar' : 'Fizik Tedavi'}
                    />
                  </h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    <EditableText
                      content={content}
                      contentKey={`services.items.${i-1}.description`}
                      isEditMode={isEditMode}
                      onUpdate={onUpdateContent}
                      fallback="Hastalıkların kesin teşhisi ve tedavisi için kurulan gelişmiş tıbbi alt yapı."
                    />
                  </p>
                  <div className="flex items-center text-rose-600 font-bold text-sm uppercase tracking-wider">
                    İncele <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <Clock className="text-blue-400 mb-4" size={40} />
            <h4 className="text-xl font-bold uppercase mb-2">Çalışma Saatleri</h4>
            <p className="text-slate-400">7 Gün 24 Saat Açık</p>
            <p className="text-slate-400">Kesintisiz Nöbetçi Hekim</p>
          </div>
          <div className="flex flex-col items-center text-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-slate-700 py-8 md:py-0">
            <MapPin className="text-rose-500 mb-4" size={40} />
            <h4 className="text-xl font-bold uppercase mb-2">Hastane Adresi</h4>
            <p className="text-slate-400 max-w-xs">
              <EditableText
                content={content}
                contentKey="contact.address"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="Kurumsal İş Merkezi, Merkez Bulvarı No:123"
              />
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Phone className="text-blue-400 mb-4" size={40} />
            <h4 className="text-xl font-bold uppercase mb-2">İletişim & Acil</h4>
            <p className="text-slate-400">
              <EditableText
                content={content}
                contentKey="contact.phone"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="0212 999 88 77"
              />
            </p>
            <p className="text-slate-400">info@vethastanesi.com</p>
          </div>
        </div>
      </section>

    </div>
  );
}
