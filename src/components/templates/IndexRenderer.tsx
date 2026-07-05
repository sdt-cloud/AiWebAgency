'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { getPresetByName } from './template-registry';
import { TemplateContent, ThemeConfig } from './template-types';

interface IndexRendererProps {
  templateName: string;
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
}

// Tüm 30 bağımsız şablon için dinamik (lazy) yükleme haritası
// Geliştirme aşamasında dosyalar oluştukça bu harita otomatik render yapacak.
// Dosya eksikse sayfa çökmeyecek, geçici bir mesaj gösterecek.
const LAYOUT_COMPONENTS: Record<string, React.ComponentType<any>> = {
  // Kafe & Restoran
  CafeWarmTemplate: dynamic(() => import('./layouts/cafe/CafeWarmTemplate')),
  GingerWhiteTemplate: dynamic(() => import('./layouts/cafe/GingerWhiteTemplate')),
  
  // Berber & Kuaför
  BarberDarkTemplate: dynamic(() => import('./layouts/barber/BarberDarkTemplate')),
  SalonElegantTemplate: dynamic(() => import('./layouts/barber/SalonElegantTemplate')),
  
  // Çilingir
  LocksmithUrgentTemplate: dynamic(() => import('./layouts/emergency/LocksmithUrgentTemplate')),
  LocksmithProTemplate: dynamic(() => import('./layouts/emergency/LocksmithProTemplate')),
  
  // Oto Yıkama
  CarwashModernTemplate: dynamic(() => import('./layouts/service/CarwashModernTemplate')),
  CarwashGlassTemplate: dynamic(() => import('./layouts/service/CarwashGlassTemplate')),
  
  // Diş Kliniği
  DentalCleanTemplate: dynamic(() => import('./layouts/health/DentalCleanTemplate')),
  DentalPremiumTemplate: dynamic(() => import('./layouts/health/DentalPremiumTemplate')),
  
  // Avukat / Hukuk
  LawDarkTemplate: dynamic(() => import('./layouts/corporate/LawDarkTemplate')),
  LawClassicTemplate: dynamic(() => import('./layouts/corporate/LawClassicTemplate')),
  
  // Emlak
  RealestateModernTemplate: dynamic(() => import('./layouts/corporate/RealestateModernTemplate')),
  RealestateLuxuryTemplate: dynamic(() => import('./layouts/corporate/RealestateLuxuryTemplate')),
  
  // Eczane
  PharmacyCleanTemplate: dynamic(() => import('./layouts/health/PharmacyCleanTemplate')),
  PharmacyWarmTemplate: dynamic(() => import('./layouts/health/PharmacyWarmTemplate')),
  
  // Veteriner
  VetFriendlyTemplate: dynamic(() => import('./layouts/health/VetFriendlyTemplate')),
  VetModernTemplate: dynamic(() => import('./layouts/health/VetModernTemplate')),
  
  // Fotoğrafçı
  PhotoMinimalTemplate: dynamic(() => import('./layouts/creative/PhotoMinimalTemplate')),
  PhotoDarkTemplate: dynamic(() => import('./layouts/creative/PhotoDarkTemplate')),
  
  // Güzellik Salonu / SPA
  SpaGlassTemplate: dynamic(() => import('./layouts/barber/SpaGlassTemplate')),
  BeautyLuxuryTemplate: dynamic(() => import('./layouts/barber/BeautyLuxuryTemplate')),
  
  // Tesisatçı / Tadilat
  PlumberUrgentTemplate: dynamic(() => import('./layouts/emergency/PlumberUrgentTemplate')),
  RenovationPortfolioTemplate: dynamic(() => import('./layouts/service/RenovationPortfolioTemplate')),
  
  // Elektrikçi
  ElectricianBoldTemplate: dynamic(() => import('./layouts/emergency/ElectricianBoldTemplate')),
  ElectricianProTemplate: dynamic(() => import('./layouts/emergency/ElectricianProTemplate')),
  
  // Oto Tamir
  AutorepairDarkTemplate: dynamic(() => import('./layouts/service/AutorepairDarkTemplate')),
  AutoserviceProTemplate: dynamic(() => import('./layouts/service/AutoserviceProTemplate')),
  
};

// Yüklenmemiş veya henüz kodlanmamış şablonlar için Placeholder
function Placeholder() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 text-slate-800 p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Şablon Hazırlanıyor</h1>
      <p className="text-slate-600 max-w-lg">
        Bu işletme kategorisi için yepyeni, tamamen eşsiz ve bağımsız bir sayfa şablonu arka planda alt-ajanlar tarafından kodlanıyor.
        Lütfen birazdan tekrar kontrol edin!
      </p>
    </div>
  );
}

export default function IndexRenderer(props: IndexRendererProps) {
  const preset = getPresetByName(props.templateName);
  
  if (!preset) {
    return <Placeholder />;
  }

  const LayoutComponent = LAYOUT_COMPONENTS[preset.layoutComponent];

  if (!LayoutComponent) {
    console.warn(`Layout component ${preset.layoutComponent} not found in map.`);
    return <Placeholder />;
  }

  // Özel Google fontunu yükleme
  const fontUrl = getGoogleFontUrl(preset.defaultTheme.fontFamily, preset.defaultTheme.fontFamilyHeading);

  return (
    <>
      {fontUrl && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href={fontUrl} />
        </>
      )}
      <div style={{ 
        fontFamily: preset.defaultTheme.fontFamily,
        '--color-primary': preset.defaultTheme.primary,
        '--color-secondary': preset.defaultTheme.secondary,
      } as React.CSSProperties}>
        <LayoutComponent {...props} layoutConfig={preset.layoutStyle} />
      </div>
    </>
  );
}

function getGoogleFontUrl(fontFamily: string, headingFont?: string): string {
  const fonts: string[] = [];
  const bodyFont = fontFamily.split(',')[0].trim();
  if (bodyFont && !['serif', 'sans-serif', 'monospace'].includes(bodyFont)) {
    fonts.push(bodyFont.replace(/\s+/g, '+'));
  }
  if (headingFont) {
    const heading = headingFont.split(',')[0].trim();
    if (heading && heading !== bodyFont && !['serif', 'sans-serif', 'monospace'].includes(heading)) {
      fonts.push(heading.replace(/\s+/g, '+'));
    }
  }
  if (fonts.length === 0) return '';
  const familyParams = fonts.map(f => `family=${f}:wght@300;400;500;600;700;800;900`).join('&');
  return `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;
}
