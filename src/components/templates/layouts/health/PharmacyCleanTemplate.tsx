'use client';

import React from 'react';
import { TemplateContent, ThemeConfig } from '../../template-types';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { Phone, MapPin, Clock, Navigation, AlertCircle, Search, Pill, ShieldPlus } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function PharmacyCleanTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: Props) {
  const { fonts } = themeConfig;
  const primaryColor = '#16a34a'; // Strong green for pharmacy
  const alertColor = '#ef4444'; // Red for emergency/on-duty

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: fonts?.body || 'Inter, sans-serif' }}>
      
      {/* Top Alert Bar - For On-Duty Status */}
      <div className="bg-red-500 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="animate-pulse" />
            <span>BUGÜN NÖBETÇİYİZ</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full" />
          <span>09:00 - 09:00 (24 Saat Açık)</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white transform rotate-45">
              <ShieldPlus size={24} className="-rotate-45" />
            </div>
            <div>
              <EditableText
                content={content}
                contentKey="hero.title"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                className="text-xl font-bold text-gray-900 leading-none"
                fallback="Merkez Eczanesi"
              />
              <span className="text-sm text-green-600 font-medium">Güvenilir Sağlık</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="#location" className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 font-medium transition-colors">
              <MapPin size={18} />
              Konum
            </a>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-green-200 transition-all active:scale-95">
              <Phone size={18} />
              <EditableText
                content={content}
                contentKey="contact.phone"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="0212 555 00 00"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Search & Hero Bar */}
      <section className="bg-green-600 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: fonts?.heading }}>
              Sağlığınız İçin 7/24 Yanınızdayız
            </h1>
            <p className="text-green-100 text-lg mb-8">
              <EditableText
                content={content}
                contentKey="hero.subtitle"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="İhtiyacınız olan tüm ilaçlar, dermokozmetik ürünler ve vitaminler için merkez noktanız."
              />
            </p>
            
            {/* Pseudo Search Bar */}
            <div className="bg-white rounded-xl p-2 flex items-center shadow-2xl max-w-2xl mx-auto">
              <div className="pl-4 text-gray-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="İlaç, vitamin veya dermokozmetik arayın..." 
                className="w-full px-4 py-3 text-gray-700 focus:outline-none"
                disabled
              />
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Ara
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-12 bg-white -mt-6 rounded-t-3xl relative z-10 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Reçeteli İlaçlar', 'Dermokozmetik', 'Vitamin & Ek Gıda', 'Anne & Bebek'].map((cat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 hover:text-green-700 cursor-pointer transition-all">
                <Pill className="mb-3 text-green-500" size={32} />
                <span className="font-semibold text-gray-700 text-center">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Emergency Map Focus */}
      <section id="location" className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2">
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 relative h-[400px] md:h-auto">
                <EditableImage
                  content={content}
                  contentKey="hero.image"
                  isEditMode={isEditMode}
                  onUpdate={onUpdateContent}
                  className="w-full h-full object-cover"
                  fallback="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
                  alt="Pharmacy Map"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  {/* Decorative map pin */}
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce text-green-600">
                    <MapPin size={32} />
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold text-sm mb-6 w-fit">
                  <Navigation size={18} />
                  Yol Tarifi Al
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: fonts?.heading }}>
                  Bize Nasıl Ulaşırsınız?
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Açık Adres</p>
                      <p className="text-gray-600 leading-relaxed">
                        <EditableText
                          content={content}
                          contentKey="contact.address"
                          isEditMode={isEditMode}
                          onUpdate={onUpdateContent}
                          fallback="Sağlık Mahallesi, Hastane Caddesi, No:12/A, Kadıköy/İstanbul"
                        />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</p>
                      <p className="text-gray-600">Hafta içi: 08:30 - 19:00</p>
                      <p className="text-red-500 font-medium text-sm mt-1">Bugün nöbetçiyiz: 24 saat açığız.</p>
                    </div>
                  </div>
                </div>

                <button className="mt-10 w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                  Google Haritalarda Aç
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
