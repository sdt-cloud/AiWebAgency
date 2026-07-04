'use client';

import React from 'react';
import { TemplateContent, ThemeConfig } from '../../template-types';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { Phone, MapPin, Clock, Calendar, CheckCircle, ChevronRight, Star } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function DentalCleanTemplate({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: Props) {
  const { colors, fonts } = themeConfig;
  const primaryColor = colors?.primary || '#0ea5e9'; // Light blue default

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: fonts?.body || 'Inter, sans-serif' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
              <span className="text-xl font-bold">D</span>
            </div>
            <EditableText
              content={content}
              contentKey="hero.title"
              isEditMode={isEditMode}
              onUpdate={onUpdateContent}
              className="text-2xl font-bold text-gray-900"
              fallback="Dental Clinic"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-blue-600 transition-colors">Hizmetlerimiz</a>
            <a href="#team" className="hover:text-blue-600 transition-colors">Ekibimiz</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">İletişim</a>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white transition-transform hover:scale-105" style={{ backgroundColor: primaryColor }}>
              <Phone size={16} />
              <EditableText
                content={content}
                contentKey="contact.phone"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="+90 555 123 45 67"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50 -z-10" />
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
              <Star size={16} fill="currentColor" />
              <span>Modern & Ağrısız Tedavi</span>
            </div>
            <EditableText
              content={content}
              contentKey="hero.title"
              isEditMode={isEditMode}
              onUpdate={onUpdateContent}
              className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: fonts?.heading }}
              fallback="Gülüşünüzü Yeniden Tasarlıyoruz"
            />
            <EditableText
              content={content}
              contentKey="hero.subtitle"
              isEditMode={isEditMode}
              onUpdate={onUpdateContent}
              className="text-lg text-gray-600 mb-10 leading-relaxed"
              fallback="Uzman kadromuz ve modern teknolojimizle sağlıklı ve beyaz dişlere kavuşun."
            />
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center gap-2 shadow-lg shadow-blue-200 transition-transform hover:-translate-y-1" style={{ backgroundColor: primaryColor }}>
                <Calendar size={20} />
                Randevu Al
              </button>
              <button className="px-8 py-4 rounded-full text-gray-700 bg-white border border-gray-200 font-semibold text-lg hover:bg-gray-50 transition-colors">
                Hizmetlerimizi İncele
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                <span>Uzman Hekimler</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                <span>Modern Teknoloji</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                <span>Ağrısız Tedavi</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-3xl transform translate-x-4 translate-y-4 -z-10" />
            <EditableImage
              content={content}
              contentKey="hero.image"
              isEditMode={isEditMode}
              onUpdate={onUpdateContent}
              className="w-full h-[600px] object-cover rounded-3xl shadow-xl"
              fallback="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80"
              alt="Dental Clinic"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: fonts?.heading }}>
              <EditableText
                content={content}
                contentKey="services.title"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="Tedavi Hizmetlerimiz"
              />
            </h2>
            <p className="text-gray-500 text-lg">
              Size özel, en güncel teknolojilerle donatılmış tedavi yöntemleri sunuyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 bg-white">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold">{i}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <EditableText
                    content={content}
                    contentKey={`services.items.${i - 1}.title`}
                    isEditMode={isEditMode}
                    onUpdate={onUpdateContent}
                    fallback={`Hizmet Adı ${i}`}
                  />
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  <EditableText
                    content={content}
                    contentKey={`services.items.${i - 1}.description`}
                    isEditMode={isEditMode}
                    onUpdate={onUpdateContent}
                    fallback="Hizmet detayları ve açıklaması burada yer alacak. Hastalarımıza en iyi deneyimi sunuyoruz."
                  />
                </p>
                <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                  Detaylı Bilgi <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: fonts?.heading }}>
                Uzman Kadromuz
              </h2>
              <p className="text-gray-500 text-lg">Alanında uzman hekimlerimizle sağlığınız güvende.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <EditableImage
                  content={content}
                  contentKey={`team.${i - 1}.image`}
                  isEditMode={isEditMode}
                  onUpdate={onUpdateContent}
                  className="w-full h-80 object-cover"
                  fallback={`https://images.unsplash.com/photo-${i === 1 ? '1622253692010-333f2da6031d' : i === 2 ? '1594824436999-05e2b3461421' : '1612349317150-e413f6a5b16d'}?auto=format&fit=crop&q=80`}
                  alt="Doctor"
                />
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    <EditableText
                      content={content}
                      contentKey={`team.${i - 1}.name`}
                      isEditMode={isEditMode}
                      onUpdate={onUpdateContent}
                      fallback="Dr. İsim Soyisim"
                    />
                  </h3>
                  <p className="text-blue-600 font-medium">
                    <EditableText
                      content={content}
                      contentKey={`team.${i - 1}.role`}
                      isEditMode={isEditMode}
                      onUpdate={onUpdateContent}
                      fallback="Uzman Diş Hekimi"
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Contact Info */}
      <footer id="contact" className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
              <MapPin className="text-blue-400" />
            </div>
            <h4 className="text-lg font-bold mb-2">Kliniğimiz</h4>
            <p className="text-gray-400 leading-relaxed">
              <EditableText
                content={content}
                contentKey="contact.address"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="Merkez Mahallesi, Sağlık Sokak No:1, İstanbul"
              />
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
              <Phone className="text-blue-400" />
            </div>
            <h4 className="text-lg font-bold mb-2">İletişim</h4>
            <p className="text-gray-400 leading-relaxed">
              <EditableText
                content={content}
                contentKey="contact.phone"
                isEditMode={isEditMode}
                onUpdate={onUpdateContent}
                fallback="+90 555 123 45 67"
              />
            </p>
            <p className="text-gray-400">info@dentalclinic.com</p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
              <Clock className="text-blue-400" />
            </div>
            <h4 className="text-lg font-bold mb-2">Çalışma Saatleri</h4>
            <p className="text-gray-400">Pzt - Cuma: 09:00 - 19:00</p>
            <p className="text-gray-400">Cumartesi: 10:00 - 15:00</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
