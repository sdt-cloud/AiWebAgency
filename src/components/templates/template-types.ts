/**
 * template-types.ts
 * ==================
 * Tüm şablon bileşenleri tarafından paylaşılan tip tanımları.
 * 
 * Bu dosya, composable şablon mimarisinin temelini oluşturur.
 * Section bileşenleri, layout stilleri, template preset'leri ve
 * içerik yapıları burada merkezi olarak tanımlanır.
 * 
 * Neden merkezi tip dosyası? → Tüm section/layout/renderer bileşenleri
 * aynı contract'a uymalı; bu dosya o contract'ın tek kaynağıdır (SSOT).
 */

/* ═══════════════════════════════════════════════════════════════
   LAYOUT STİLLERİ
   5 farklı görsel tasarım dili, kullanıcının AGENTS.md kurallarına uygun
   ═══════════════════════════════════════════════════════════════ */
export type LayoutStyle =
  | 'neo-minimalist'     // Geniş boşluklar, ince çizgiler, düz arka plan
  | 'glassmorphism'      // Buzlu cam efekti, gradyan arka plan
  | 'dark-futuristic'    // Koyu arka plan, neon vurgular
  | 'editorial-retro'    // Sıcak krem tonları, serif fontlar
  | 'neo-brutalism';     // Kalın kenarlıklar, doygun renkler

/* ═══════════════════════════════════════════════════════════════
   SECTION TİPLERİ
   Composable bileşen sistemi — her biri bağımsız render edilebilir
   ═══════════════════════════════════════════════════════════════ */
export type SectionType =
  | 'navbar'
  | 'hero'
  | 'about'
  | 'services'
  | 'menu'              // Restoran/Kafe/Pastane — yemek/ürün menüsü
  | 'price_list'        // Berber/Güzellik/Oto Yıkama — fiyat listesi
  | 'team'              // Diş/Hukuk/Veteriner — ekip tanıtımı
  | 'gallery'           // Fotoğrafçı/Güzellik/Tadilat — görsel galeri
  | 'testimonials'
  | 'emergency_cta'     // Çilingir/Tesisatçı/Elektrikçi — acil WhatsApp
  | 'booking'           // Randevu alma bölümü
  | 'map'               // Google Maps konum
  | 'contact_footer';

/* ═══════════════════════════════════════════════════════════════
   TEMA YAPILANDIRMASI
   Her şablonun renk paleti ve tipografi ayarları
   ═══════════════════════════════════════════════════════════════ */
export interface ThemeConfig {
  primary: string;            // Ana renk HEX (ör: #1d4ed8)
  secondary: string;          // İkincil renk HEX (ör: #60a5fa)
  fontFamily: string;         // Gövde fontu (ör: 'Inter, sans-serif')
  fontFamilyHeading?: string; // Başlık fontu (ör: 'Playfair Display, serif')
  accent?: string;            // Ekstra vurgu rengi (opsiyonel)
}

/* ═══════════════════════════════════════════════════════════════
   İÇERİK YAPISI (TEMPLATE CONTENT)
   Tüm şablonlar için birleşik içerik şeması.
   Bazı alanlar kategoriye özeldir ve opsiyoneldir.
   ═══════════════════════════════════════════════════════════════ */
export interface TemplateContent {
  /* === Temel Bölümler (tüm şablonlarda) === */
  hero: {
    title: string;
    subtitle: string;
    cta_text: string;
    badge_text?: string;    // Hero üstündeki küçük rozet metni
  };

  about: string;            // Hakkımızda metni

  services: Array<{
    title: string;
    description: string;
    icon?: string;           // Lucide icon adı (opsiyonel)
  }>;

  testimonials: Array<{
    name: string;
    text: string;
    rating?: number;         // 1-5 yıldız (opsiyonel)
  }>;

  contact: {
    company_name?: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    whatsapp_message?: string;  // Çilingir/Tesisatçı için otomatik WhatsApp mesajı
  };

  images?: {
    hero_bg?: string;
    about_img?: string;
    services_img?: string;
    gallery?: string[];      // Galeri görselleri dizisi
    logo?: string;           // İşletme logosu
  };

  /* === Kategoriye Özel Bölümler (opsiyonel) === */

  /** Restoran/Kafe/Pastane — Menü kalemleri */
  menu_items?: Array<{
    category: string;       // Menü kategorisi (ör: "Ana Yemekler", "Tatlılar")
    items: Array<{
      name: string;
      description?: string;
      price: string;        // ör: "₺45" veya "₺35 - ₺55"
    }>;
  }>;

  /** Berber/Güzellik/Oto Yıkama — Fiyat listesi */
  price_list?: Array<{
    title: string;          // Hizmet adı
    price: string;          // ör: "₺150"
    duration?: string;      // ör: "30 dk"
    description?: string;
    is_popular?: boolean;   // "Popüler" rozeti göster
  }>;

  /** Diş/Hukuk/Veteriner/Berber — Ekip üyeleri */
  team_members?: Array<{
    name: string;
    role: string;           // ör: "Diş Hekimi", "Avukat"
    image?: string;
    description?: string;
  }>;

  /** Fotoğrafçı/Güzellik/Tadilat — Galeri görselleri */
  gallery_images?: Array<{
    src: string;
    alt: string;
    category?: string;      // Filtreleme için kategori
  }>;

  /** Emlak — İlan vitrini */
  listings?: Array<{
    title: string;          // ör: "3+1 Daire"
    location: string;       // ör: "Kadıköy, İstanbul"
    price: string;          // ör: "₺2.500.000"
    features: string;       // ör: "3+1 • 120m² • 5. Kat"
    image?: string;
  }>;
}

/* ═══════════════════════════════════════════════════════════════
   SECTION COMPONENT PROPS
   Tüm section bileşenlerinin paylaştığı standart props arayüzü
   ═══════════════════════════════════════════════════════════════ */
export interface SectionBaseProps {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  layoutStyle: LayoutStyle;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
}

/* ═══════════════════════════════════════════════════════════════
   TEMPLATE PRESET
   Her şablonu tanımlayan konfigürasyon nesnesi.
   Registry'de 31 adet preset bulunacak.
   ═══════════════════════════════════════════════════════════════ */
export interface TemplatePreset {
  template_name: string;          // Benzersiz şablon adı (ör: 'cafe_warm')
  displayName: string;            // Gösterim adı (ör: 'Sıcak Kafe')
  category: string;               // Kategori adı (ör: 'Kafe & Restoran')
  categoryKeywords: string[];     // Eşleşme anahtar kelimeleri
  layoutStyle: LayoutStyle;       // Görsel stil (yardımcı renk ve font eşleştirmeleri için kullanılabilir)
  layoutComponent: string;        // Eşleşeceği full-page React bileşen adı (ör: 'CafeWarmTemplate')
  defaultTheme: ThemeConfig;      // Varsayılan tema
  defaultContent: TemplateContent; // Varsayılan mock içerik
}

/* ═══════════════════════════════════════════════════════════════
   TÜM ŞABLON ADLARI (UNION TYPE)
   DB ve Gemini entegrasyonunda kullanılacak
   ═══════════════════════════════════════════════════════════════ */
export type TemplateName =
  // Eski uyumluluk
  | 'business' | 'restaurant' | 'service'
  // Kafe & Restoran
  | 'cafe_warm' | 'restaurant_elegant' | 'restaurant_dark'
  // Berber & Kuaför
  | 'barber_dark' | 'salon_elegant'
  // Çilingir
  | 'locksmith_urgent' | 'locksmith_pro'
  // Oto Yıkama
  | 'carwash_modern' | 'carwash_glass'
  // Diş Kliniği
  | 'dental_clean' | 'dental_premium'
  // Avukat / Hukuk
  | 'law_dark' | 'law_classic'
  // Emlak
  | 'realestate_modern' | 'realestate_luxury'
  // Eczane
  | 'pharmacy_clean' | 'pharmacy_warm'
  // Veteriner
  | 'vet_friendly' | 'vet_modern'
  // Fotoğrafçı
  | 'photo_minimal' | 'photo_dark'
  // Güzellik Salonu / SPA
  | 'spa_glass' | 'beauty_luxury'
  // Tesisatçı / Tadilat
  | 'plumber_urgent' | 'renovation_portfolio'
  // Elektrikçi
  | 'electrician_bold' | 'electrician_pro'
  // Oto Tamir
  | 'autorepair_dark' | 'autoservice_pro'
  // Pastane / Fırın
  | 'bakery_warm' | 'patisserie_elegant';

/* ═══════════════════════════════════════════════════════════════
   LAYOUT STYLE HELPER
   Her layout stili için CSS sınıf setleri ve arka plan konfigürasyonu
   ═══════════════════════════════════════════════════════════════ */
export interface LayoutStyleConfig {
  /** Sayfa arka plan rengi/gradient */
  pageBg: string;
  /** Kart/panel arka plan rengi */
  cardBg: string;
  /** Kart kenarlık stili */
  cardBorder: string;
  /** Kart gölge stili */
  cardShadow: string;
  /** Metin rengi (gövde) */
  textColor: string;
  /** Metin rengi (başlık) */
  headingColor: string;
  /** Metin rengi (ikincil/soluk) */
  mutedColor: string;
  /** Bölüm ayırıcı stil */
  sectionDivider: string;
  /** Border radius boyutu */
  borderRadius: string;
  /** Footer arka plan */
  footerBg: string;
  /** Footer metin rengi */
  footerText: string;
}

/**
 * getLayoutConfig — Layout stiline göre CSS konfigürasyonu döndürür.
 * Bu fonksiyon her section bileşeni tarafından kullanılarak
 * tutarlı görsel dil sağlanır.
 */
export function getLayoutConfig(style: LayoutStyle, primary: string): LayoutStyleConfig {
  switch (style) {
    case 'neo-minimalist':
      return {
        pageBg: 'bg-slate-50',
        cardBg: 'bg-white',
        cardBorder: 'border border-slate-200',
        cardShadow: 'shadow-sm',
        textColor: 'text-slate-600',
        headingColor: 'text-slate-900',
        mutedColor: 'text-slate-400',
        sectionDivider: 'border-t border-slate-100',
        borderRadius: 'rounded-2xl',
        footerBg: 'bg-slate-900',
        footerText: 'text-slate-400',
      };

    case 'glassmorphism':
      return {
        pageBg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
        cardBg: 'bg-white/10 backdrop-blur-xl',
        cardBorder: 'border border-white/20',
        cardShadow: 'shadow-lg shadow-black/10',
        textColor: 'text-white/80',
        headingColor: 'text-white',
        mutedColor: 'text-white/50',
        sectionDivider: 'border-t border-white/10',
        borderRadius: 'rounded-3xl',
        footerBg: 'bg-black/40 backdrop-blur-xl',
        footerText: 'text-white/60',
      };

    case 'dark-futuristic':
      return {
        pageBg: 'bg-[#0a0a12]',
        cardBg: 'bg-[#12121f]',
        cardBorder: 'border border-[#1e1e35]',
        cardShadow: 'shadow-lg shadow-black/30',
        textColor: 'text-slate-300',
        headingColor: 'text-white',
        mutedColor: 'text-slate-500',
        sectionDivider: 'border-t border-[#1e1e35]',
        borderRadius: 'rounded-xl',
        footerBg: 'bg-[#060610]',
        footerText: 'text-slate-500',
      };

    case 'editorial-retro':
      return {
        pageBg: 'bg-[#faf7f2]',
        cardBg: 'bg-white',
        cardBorder: 'border border-[#e8e0d4]',
        cardShadow: 'shadow-sm',
        textColor: 'text-[#5c4f3d]',
        headingColor: 'text-[#2d2418]',
        mutedColor: 'text-[#a09080]',
        sectionDivider: 'border-t border-[#e8e0d4]',
        borderRadius: 'rounded-2xl',
        footerBg: 'bg-[#2d2418]',
        footerText: 'text-[#a09080]',
      };

    case 'neo-brutalism':
      return {
        pageBg: 'bg-[#f5f0e8]',
        cardBg: 'bg-white',
        cardBorder: 'border-3 border-black',
        cardShadow: 'shadow-[4px_4px_0px_0px_#000]',
        textColor: 'text-gray-800',
        headingColor: 'text-black',
        mutedColor: 'text-gray-500',
        sectionDivider: 'border-t-3 border-black',
        borderRadius: 'rounded-none',
        footerBg: 'bg-black',
        footerText: 'text-gray-400',
      };
  }
}
