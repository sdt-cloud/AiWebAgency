'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableImage from '../EditableImage';

export default function GallerySection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  const handleImageUpdate = (index: number) => (newUrl: string) => {
    if (!content.gallery_images) return;
    const newGallery = [...content.gallery_images];
    newGallery[index] = { ...newGallery[index], src: newUrl };
    onUpdateContent({ ...content, gallery_images: newGallery });
  };

  const defaultImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80";
  
  const images = content.gallery_images && content.gallery_images.length > 0 ? content.gallery_images : [
    { src: defaultImage, alt: 'Galeri Görseli 1' },
    { src: defaultImage, alt: 'Galeri Görseli 2' },
    { src: defaultImage, alt: 'Galeri Görseli 3' },
    { src: defaultImage, alt: 'Galeri Görseli 4' },
    { src: defaultImage, alt: 'Galeri Görseli 5' },
    { src: defaultImage, alt: 'Galeri Görseli 6' },
  ];

  // Neo-Minimalist (Temiz Grid)
  if (layoutStyle === 'neo-minimalist') {
    return (
      <section className={`py-24 bg-white ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Galeri</h2>
            <p className="text-lg text-slate-600">Çalışmalarımızdan kareler.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                <EditableImage
                  src={img.src}
                  alt={img.alt}
                  onSave={handleImageUpdate(idx)}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  {img.alt && <span className="text-white font-medium px-4 text-center">{img.alt}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Dark Futuristic (Masonry hissi, neon)
  if (layoutStyle === 'dark-futuristic') {
    return (
      <section className={`py-24 bg-[#0a0a12] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] uppercase block mb-4" style={{ color: themeConfig.primary }}>/ VİZYON</span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Portfolyo</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {images.map((img, idx) => (
              <div key={idx} className={`relative group border border-[#1e1e35] overflow-hidden ${idx === 0 || idx === 3 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
                <div className="absolute inset-0 bg-[themeConfig.primary] opacity-0 group-hover:opacity-20 transition-opacity z-10 pointer-events-none" style={{ backgroundColor: themeConfig.primary }}></div>
                <EditableImage
                  src={img.src}
                  alt={img.alt}
                  onSave={handleImageUpdate(idx)}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover filter contrast-125 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Diğer stiller için genel 3 sütunlu galeri
  return (
    <section className={`py-24 ${layoutConfig.pageBg} ${layoutConfig.sectionDivider}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-4xl md:text-5xl font-bold ${layoutConfig.headingColor} mb-16 text-center`}>Galeri</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <div key={idx} className={`${layoutConfig.cardBorder} overflow-hidden shadow-lg ${layoutStyle === 'editorial-retro' ? 'rounded-t-full aspect-[3/4]' : 'rounded-3xl aspect-square'}`}>
              <EditableImage
                src={img.src}
                alt={img.alt}
                onSave={handleImageUpdate(idx)}
                isEditMode={isEditMode}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
