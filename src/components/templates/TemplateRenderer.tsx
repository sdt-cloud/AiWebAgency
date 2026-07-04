'use client';

/**
 * TemplateRenderer.tsx
 * ====================
 * Composable şablon mimarisinin ana render motoru.
 * 
 * Bu bileşen, template-registry'den gelen preset konfigürasyonuna göre
 * doğru section bileşenlerini sıralı şekilde render eder.
 * 
 * Neden merkezi renderer? → Tek bir bileşen üzerinden 31 farklı
 * şablon render edilebilir. Yeni şablon eklemek sadece registry'ye
 * yeni bir preset eklemek kadar basittir.
 */

import React from 'react';
import { getPresetByName } from './template-registry';
import {
  type TemplateContent,
  type ThemeConfig,
  type LayoutStyle,
  type SectionType,
  type SectionBaseProps,
  getLayoutConfig,
} from './template-types';

/* === Section Bileşenleri Import === */
import NavBar from './sections/NavBar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import MenuSection from './sections/MenuSection';
import PriceListSection from './sections/PriceListSection';
import TeamSection from './sections/TeamSection';
import GallerySection from './sections/GallerySection';
import TestimonialsSection from './sections/TestimonialsSection';
import EmergencyCTASection from './sections/EmergencyCTASection';
import BookingSection from './sections/BookingSection';
import MapSection from './sections/MapSection';
import ContactFooter from './sections/ContactFooter';

/* ═══════════════════════════════════════════════════════════════
   TEMPLATE RENDERER PROPS
   ═══════════════════════════════════════════════════════════════ */
interface TemplateRendererProps {
  /** Şablon adı — registry'den preset çekmek için kullanılır */
  templateName: string;
  /** Şablon içeriği — düzenlenebilir veriler */
  content: TemplateContent;
  /** Tema konfigürasyonu — renkler ve fontlar */
  themeConfig: ThemeConfig;
  /** Düzenleme modu aktif mi? */
  isEditMode: boolean;
  /** İçerik güncelleme callback'i */
  onUpdateContent: (newContent: TemplateContent) => void;
}

/**
 * Section tipine göre doğru bileşeni döndüren mapping.
 * 
 * Bu yaklaşım switch/case yerine obje lookup kullanır çünkü:
 * 1. Yeni section eklemek tek satırlık bir iştir
 * 2. TypeScript otomatik tip kontrolü sağlar
 * 3. Dead code elimination için optimize edilebilir
 */
const SECTION_COMPONENT_MAP: Record<
  SectionType,
  React.ComponentType<SectionBaseProps>
> = {
  navbar: NavBar,
  hero: HeroSection,
  about: AboutSection,
  services: ServicesSection,
  menu: MenuSection,
  price_list: PriceListSection,
  team: TeamSection,
  gallery: GallerySection,
  testimonials: TestimonialsSection,
  emergency_cta: EmergencyCTASection,
  booking: BookingSection,
  map: MapSection,
  contact_footer: ContactFooter,
};

/**
 * Google Fonts link'i oluşturur.
 * Font adını URL-uyumlu formata dönüştürür (boşlukları + ile değiştirir).
 */
function getGoogleFontUrl(fontFamily: string, headingFont?: string): string {
  const fonts: string[] = [];

  // Gövde fontu
  const bodyFont = fontFamily.split(',')[0].trim();
  if (bodyFont && !['serif', 'sans-serif', 'monospace'].includes(bodyFont)) {
    fonts.push(bodyFont.replace(/\s+/g, '+'));
  }

  // Başlık fontu (varsa ve farklıysa)
  if (headingFont) {
    const heading = headingFont.split(',')[0].trim();
    if (heading && heading !== bodyFont && !['serif', 'sans-serif', 'monospace'].includes(heading)) {
      fonts.push(heading.replace(/\s+/g, '+'));
    }
  }

  if (fonts.length === 0) return '';

  // Tüm fontları tek bir link'te birleştir
  const familyParams = fonts.map(f => `family=${f}:wght@300;400;500;600;700;800;900`).join('&');
  return `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;
}

/* ═══════════════════════════════════════════════════════════════
   ANA RENDER BİLEŞENİ
   ═══════════════════════════════════════════════════════════════ */
export default function TemplateRenderer({
  templateName,
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}: TemplateRendererProps) {
  // Registry'den preset al
  const preset = getPresetByName(templateName);

  // Preset bulunamazsa fallback: tüm temel section'ları göster
  const sections: SectionType[] = preset
    ? preset.sections
    : ['navbar', 'hero', 'about', 'services', 'testimonials', 'contact_footer'];

  // Layout stilini preset'ten veya varsayılandan al
  const layoutStyle: LayoutStyle = preset?.layoutStyle || 'neo-minimalist';

  // Layout konfigürasyonu — arka plan, renkler vb.
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  // Google Fonts URL'si
  const fontUrl = getGoogleFontUrl(themeConfig.fontFamily, themeConfig.fontFamilyHeading);

  // Tüm section'lar için paylaşılan props
  const sectionProps: SectionBaseProps = {
    content,
    themeConfig,
    layoutStyle,
    isEditMode,
    onUpdateContent,
  };

  return (
    <>
      {/* Google Fonts yükleme — performans için preconnect + stylesheet */}
      {fontUrl && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href={fontUrl} />
        </>
      )}

      {/* Ana sayfa wrapper — layout stiline göre arka plan ve font */}
      <div
        className={`min-h-screen ${layoutConfig.pageBg}`}
        style={{
          fontFamily: themeConfig.fontFamily || 'Inter, sans-serif',
          /* CSS custom properties ile tema renklerini tüm bileşenlere aktarma */
          '--color-primary': themeConfig.primary,
          '--color-secondary': themeConfig.secondary,
          '--color-accent': themeConfig.accent || themeConfig.secondary,
        } as React.CSSProperties}
      >
        {/*
         * Section Rendering Pipeline
         * ===========================
         * Registry'deki sections dizisini sırayla dolaşarak
         * her bir section tipine karşılık gelen bileşeni render eder.
         * Bu yaklaşım sayesinde şablon yapısı tamamen data-driven olur.
         */}
        {sections.map((sectionType, index) => {
          const SectionComponent = SECTION_COMPONENT_MAP[sectionType];

          if (!SectionComponent) {
            // Bilinmeyen section tipi — geliştirici uyarısı
            console.warn(`[TemplateRenderer] Unknown section type: "${sectionType}"`);
            return null;
          }

          return (
            <SectionComponent
              key={`${sectionType}-${index}`}
              {...sectionProps}
            />
          );
        })}
      </div>
    </>
  );
}
