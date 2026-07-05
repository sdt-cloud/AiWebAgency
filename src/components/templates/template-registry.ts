import { TemplatePreset, TemplateContent } from './template-types';

/**
 * Ortak/Tekrar eden mock data yapıları (Kod kalabalığını azaltmak için)
 */
const mockContact = {
  company_name: 'İşletme Adı',
  phone: '0555 123 45 67',
  email: 'merhaba@isletme.com',
  address: 'Bağdat Caddesi No:123 Kadıköy, İstanbul',
  hours: 'Pzt-Cmt: 09:00 - 20:00'
};

const mockTestimonials = [
  { name: 'Ahmet Y.', text: 'Hizmet kalitesi ve profesyonellik gerçekten üst düzeydi. Çok memnun kaldım.', rating: 5 },
  { name: 'Ayşe K.', text: 'Güler yüzlü ekip ve harika bir deneyim. Herkese tavsiye ederim.', rating: 5 }
];

const mockServices = [
  { title: 'Profesyonel Hizmet', description: 'İhtiyacınıza özel, yüksek standartlarda çözümler üretiyoruz.', icon: 'Star' },
  { title: 'Hızlı Teslimat', description: 'Zamanınızın değerini biliyor, işlerimizi söz verdiğimiz sürede teslim ediyoruz.', icon: 'Clock' },
  { title: 'Müşteri Memnuniyeti', description: 'Önceliğimiz her zaman sizin memnuniyetinizdir.', icon: 'Heart' }
];

const unsplashImages = {
  cafe1: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80',
  cafe2: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80',
  restaurant_dark: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80',
  restaurant_elegant: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80',
  barber: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80',
  salon: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80',
  locksmith: 'https://images.unsplash.com/photo-1563223771-5fe4038fbfc9?auto=format&fit=crop&q=80',
  carwash: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80',
  dental: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80',
  law: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
  realestate: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
  pharmacy: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80',
  vet: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80',
  photo: 'https://images.unsplash.com/photo-1554048665-81b248a07c33?auto=format&fit=crop&q=80',
  spa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80',
  plumber: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80',
  electrician: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80',
  autorepair: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80',
  bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80',
};

/**
 * Tüm 31 Şablonun Tanımları
 */
export const templateRegistry: Record<string, TemplatePreset> = {

  /* ══════════ KAFE & RESTORAN ══════════ */
  cafe_warm: {
    template_name: 'cafe_warm',
    displayName: 'Sıcak & Samimi Kafe',
    category: 'Kafe & Restoran',
    categoryKeywords: ['kafe', 'cafe', 'kahve', 'çay', 'kahvaltı'],
    layoutStyle: 'editorial-retro',
    layoutComponent: 'CafeWarmTemplate',
    defaultTheme: { primary: '#8B4513', secondary: '#D2691E', fontFamily: 'Playfair Display, serif', fontFamilyHeading: 'Playfair Display, serif' },
    defaultContent: {
      hero: { title: 'Taze Kahve, Sıcak Ortam', subtitle: 'Güne güzel bir başlangıç için en taze kahveler ve ev yapımı atıştırmalıklar.', cta_text: 'Menüyü İncele', badge_text: 'Yeni Hasat Kahveler' },
      about: 'Şehrin kalbinde, gürültüden uzak küçük bir mola noktası. Çekirdeklerimizi özenle seçiyor, tatlılarımızı her sabah taze taze pişiriyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Kahve & Sohbet' },
      images: { hero_bg: unsplashImages.cafe1, about_img: unsplashImages.cafe2 },
      menu_items: [
        { category: 'Sıcak İçecekler', items: [{ name: 'Filtre Kahve', price: '₺85' }, { name: 'Latte', price: '₺110' }] },
        { category: 'Soğuk İçecekler', items: [{ name: 'Iced Americano', price: '₺95' }, { name: 'Ev Yapımı Limonata', price: '₺85' }] },
        { category: 'Tatlılar', items: [{ name: 'San Sebastian Cheesecake', price: '₺160' }, { name: 'Havuçlu Tarçınlı Kek', price: '₺120' }] }
      ]
    }
  },
  ginger_white: {
    template_name: 'ginger_white',
    displayName: 'Ginger & White Esintili Kafe',
    category: 'Kafe & Restoran',
    categoryKeywords: ['kafe', 'cafe', 'kahve', 'nitelikli', 'kahvaltı', 'pastane', 'fırın'],
    layoutStyle: 'editorial-retro',
    layoutComponent: 'GingerWhiteTemplate',
    defaultTheme: { primary: '#c4a265', secondary: '#212121', fontFamily: 'Playfair Display, serif', fontFamilyHeading: 'Playfair Display, serif' },
    defaultContent: {
      hero: { title: 'Nitelikli Kahve & Taze Lezzetler', subtitle: 'Mahallemizin kalbinde, en kaliteli yerel malzemelerle hazırlanan el yapımı lezzetler ve nitelikli artisan kahveler.', cta_text: 'Menümüzü Keşfedin', badge_text: 'Sıcak Mahalle Kafesi' },
      about: 'Londra sokaklarının samimi havasını ve nitelikli kahve kültürünü mahallenize taşıyoruz. Ortak masalarımız, güler yüzlü ekibimiz ve taze pişen günlük keklerimizle sıcak bir mola noktası sunuyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Ginger & White' },
      images: { hero_bg: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80', about_img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80' },
      menu_items: [
        { category: 'Sıcak & Soğuk Kahveler', items: [{ name: 'Flat White', description: 'Tek köken çekirdeklerden, kadifemsi süt kreması ile', price: '₺120' }, { name: 'V60 / Filtre Kahve', description: 'Mevsimlik hasat nitelikli çekirdekler', price: '₺110' }, { name: 'El Yapımı Sıcak Çikolata', description: 'Organik kakao ve sütle', price: '₺130' }] },
        { category: 'Kahvaltı & Yemek', items: [{ name: 'Rafadan Yumurta & Ekşi Mayalı Ekmek', description: 'Sourdough soldiers ile meşhur dippy eggs lezzeti', price: '₺180' }, { name: 'Avokadolu Tost', description: 'Ekşi mayalı ekmek üzerinde avokado ezmesi ve keçi peyniri', price: '₺220' }, { name: 'Ev Yapımı Günlük Sebze Çorbası', description: 'Taze sebzeler ve kruton ekmekle', price: '₺140' }] },
        { category: 'Fırınımız & Kekler', items: [{ name: 'Frostingli Havuçlu Kek', description: 'Kendi mutfağımızda günlük taze pişen meşhur kekimiz', price: '₺150' }, { name: 'Yoğun Çikolatalı Brownie', description: 'Glutensiz, zengin çikolatalı', price: '₺165' }, { name: 'Parçacıklı Fıstık Ezmeli Kurabiye', description: 'Kendi imalatımız yer fıstığı ezmesiyle', price: '₺95' }] }
      ]
    }
  },


  /* ══════════ BERBER & KUAFÖR ══════════ */
  barber_dark: {
    template_name: 'barber_dark',
    displayName: 'Klasik Erkek Berberi',
    category: 'Berber & Kuaför',
    categoryKeywords: ['berber', 'erkek kuaförü', 'barbershop', 'tıraş'],
    layoutStyle: 'dark-futuristic',
    layoutComponent: 'BarberDarkTemplate',
    defaultTheme: { primary: '#c8a656', secondary: '#1a1a1a', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Tarzınızı Keşfedin', subtitle: 'Sadece bir tıraş değil, kendinizi özel hissedeceğiniz bir deneyim.', cta_text: 'Randevu Al', badge_text: 'Premium Salon' },
      about: 'Erkek bakımında yılların tecrübesiyle, klasik ve modern kesimleri ustalıkla harmanlıyoruz.',
      services: [{ title: 'Saç Kesimi', description: 'Trend modeller', icon: 'Scissors' }, { title: 'Sakal Tasarımı', description: 'Özel bakım', icon: 'User' }, { title: 'Cilt Bakımı', description: 'Canlandırıcı maskeler', icon: 'Sparkles' }],
      price_list: [{ title: 'Saç Kesimi', price: '₺350', duration: '45 dk', is_popular: true }, { title: 'Sakal Tıraşı', price: '₺200', duration: '30 dk' }, { title: 'VIP Paket (Saç+Sakal+Bakım)', price: '₺750', duration: '90 dk' }],
      team_members: [{ name: 'Kadir Usta', role: 'Baş Berber' }, { name: 'Caner', role: 'Stilist' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Gentlemen Barber' },
      images: { hero_bg: unsplashImages.barber, about_img: unsplashImages.barber }
    }
  },
  salon_elegant: {
    template_name: 'salon_elegant',
    displayName: 'Kadın Kuaförü & Güzellik',
    category: 'Berber & Kuaför',
    categoryKeywords: ['kuaför', 'kadın kuaförü', 'saç', 'güzellik'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'SalonElegantTemplate',
    defaultTheme: { primary: '#9c6b8e', secondary: '#f0c6d4', fontFamily: 'Cormorant Garamond, serif' },
    defaultContent: {
      hero: { title: 'Güzelliğinizi Ortaya Çıkarın', subtitle: 'Uzman kadromuzla saç ve güzellik bakımında en iyiyi hak ediyorsunuz.', cta_text: 'Randevu Oluştur' },
      about: 'Modern teknikler ve en kaliteli ürünlerle hizmetinizdeyiz.',
      services: [{ title: 'Saç Boyama & Ombre', description: 'Trend renkler', icon: 'Palette' }, { title: 'Keratin Bakım', description: 'İpeksi saçlar', icon: 'Sparkles' }],
      price_list: [{ title: 'Saç Kesimi', price: '₺400' }, { title: 'Dip Boya', price: '₺600' }, { title: 'Ombre / Sombre', price: '₺1500+', is_popular: true }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Elegance Salon' },
      images: { hero_bg: unsplashImages.salon, about_img: unsplashImages.salon }
    }
  },

  /* ══════════ ÇİLİNGİR ══════════ */
  locksmith_urgent: {
    template_name: 'locksmith_urgent',
    displayName: 'Acil Çilingir Servisi',
    category: 'Çilingir',
    categoryKeywords: ['çilingir', 'kilit', 'anahtar', 'kapı'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'LocksmithUrgentTemplate',
    defaultTheme: { primary: '#dc2626', secondary: '#1e40af', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Kapıda Mı Kaldınız?', subtitle: '15 dakika içinde adresinizdeyiz. Hasarsız kapı açma garantisi.', cta_text: 'Hemen Ara', badge_text: '7/24 Acil Servis' },
      about: 'Yılların güveniyle kapı açma ve kilit değişimi hizmetleri sunuyoruz.',
      services: [{ title: 'Ev Kapısı Açma', description: 'Hasarsız açım', icon: 'Home' }, { title: 'Oto Çilingir', description: 'Tüm araç markaları', icon: 'Car' }, { title: 'Kasa Çilingir', description: 'Güvenli açım', icon: 'Lock' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Acil Çilingir', whatsapp_message: 'Merhaba, acil çilingir hizmetine ihtiyacım var. Adresim: ' },
      images: { hero_bg: unsplashImages.locksmith, about_img: unsplashImages.locksmith }
    }
  },
  locksmith_pro: {
    template_name: 'locksmith_pro',
    displayName: 'Profesyonel Güvenlik',
    category: 'Çilingir',
    categoryKeywords: ['güvenlik', 'kasa', 'oto çilingir'],
    layoutStyle: 'dark-futuristic',
    layoutComponent: 'LocksmithProTemplate',
    defaultTheme: { primary: '#00d4ff', secondary: '#7c3aed', fontFamily: 'Outfit, sans-serif' },
    defaultContent: {
      hero: { title: 'Yüksek Güvenlik Çözümleri', subtitle: 'Kilit değişiminden akıllı kilit sistemlerine kadar yanınızdayız.', cta_text: 'Bize Ulaşın' },
      about: 'Ev ve iş yeriniz için maksimum güvenlik sağlıyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Pro Kilit', whatsapp_message: 'Kilit değişimi hakkında bilgi almak istiyorum.' },
      images: { hero_bg: unsplashImages.locksmith, about_img: unsplashImages.locksmith }
    }
  },

  /* ══════════ OTO YIKAMA ══════════ */
  carwash_modern: {
    template_name: 'carwash_modern',
    displayName: 'Modern Oto Yıkama',
    category: 'Oto Yıkama',
    categoryKeywords: ['oto yıkama', 'detaylı temizlik', 'pasta cila', 'seramik kaplama'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'CarwashModernTemplate',
    defaultTheme: { primary: '#0284c7', secondary: '#38bdf8', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Aracınız İlk Günkü Gibi Parlasın', subtitle: 'Premium detaylı temizlik ve seramik kaplama hizmetleri.', cta_text: 'Paketleri İncele', badge_text: 'Son Teknoloji Ekipman' },
      about: 'Aracınızı sadece yıkamıyor, ona değer katıyoruz.',
      services: mockServices,
      price_list: [{ title: 'İç Dış Yıkama', price: '₺250' }, { title: 'Detaylı İç Temizlik', price: '₺1500', is_popular: true }, { title: 'Pasta Cila', price: '₺2500' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Premium Car Wash' },
      images: { hero_bg: unsplashImages.carwash, about_img: unsplashImages.carwash }
    }
  },
  carwash_glass: {
    template_name: 'carwash_glass',
    displayName: 'VIP Auto Spa',
    category: 'Oto Yıkama',
    categoryKeywords: ['auto spa', 'vip araç yıkama'],
    layoutStyle: 'glassmorphism',
    layoutComponent: 'CarwashGlassTemplate',
    defaultTheme: { primary: '#06b6d4', secondary: '#8b5cf6', fontFamily: 'Outfit, sans-serif' },
    defaultContent: {
      hero: { title: 'VIP Araç Bakımı', subtitle: 'Lüks araçlar için özel bakım ritüelleri.', cta_text: 'Rezervasyon' },
      about: 'Aracınızın spa merkezi.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Auto SPA VIP' },
      images: { hero_bg: unsplashImages.carwash, about_img: unsplashImages.carwash }
    }
  },

  /* ══════════ DİŞ KLİNİĞİ ══════════ */
  dental_clean: {
    template_name: 'dental_clean',
    displayName: 'Modern Diş Kliniği',
    category: 'Diş Kliniği',
    categoryKeywords: ['diş', 'diş hekimi', 'klinik', 'implant', 'ortodonti'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'DentalCleanTemplate',
    defaultTheme: { primary: '#0891b2', secondary: '#67e8f9', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Sağlıklı Bir Gülüşe Kavuşun', subtitle: 'Uzman kadromuz ve modern teknolojimizle ağrısız diş tedavileri.', cta_text: 'Randevu Al', badge_text: 'Ücretsiz Muayene' },
      about: 'Ağız ve diş sağlığınız için en güncel tedavi yöntemlerini, hijyenik ve konforlu ortamımızda sunuyoruz.',
      services: [{ title: 'İmplant', description: 'Ömür boyu garantili.', icon: 'Shield' }, { title: 'Diş Beyazlatma', description: '1 saatte beyaz gülüş.', icon: 'Smile' }, { title: 'Ortodonti', description: 'Görünmez şeffaf plaklar.', icon: 'Activity' }],
      team_members: [{ name: 'Dr. Berk Yılmaz', role: 'Çene Cerrahı' }, { name: 'Dr. Selin Kaya', role: 'Ortodonti Uzmanı' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Gülüş Diş Kliniği' },
      images: { hero_bg: unsplashImages.dental, about_img: unsplashImages.dental }
    }
  },
  dental_premium: {
    template_name: 'dental_premium',
    displayName: 'Estetik Diş Merkezi',
    category: 'Diş Kliniği',
    categoryKeywords: ['estetik diş', 'zirkonyum', 'gülüş tasarımı'],
    layoutStyle: 'glassmorphism',
    layoutComponent: 'DentalPremiumTemplate',
    defaultTheme: { primary: '#0e7490', secondary: '#a78bfa', fontFamily: 'Outfit, sans-serif' },
    defaultContent: {
      hero: { title: 'Hollywood Gülüşünüzü Tasarlıyoruz', subtitle: 'Zirkonyum ve lamina uygulamalarıyla mükemmel estetik.', cta_text: 'Bize Ulaşın' },
      about: 'Kişiye özel gülüş tasarımı yapıyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Estetik Dental' },
      images: { hero_bg: unsplashImages.dental, about_img: unsplashImages.dental }
    }
  },

  /* ══════════ AVUKAT / HUKUK ══════════ */
  law_dark: {
    template_name: 'law_dark',
    displayName: 'Prestijli Hukuk Bürosu',
    category: 'Avukat & Hukuk',
    categoryKeywords: ['avukat', 'hukuk', 'dava', 'danışmanlık', 'hukuk bürosu'],
    layoutStyle: 'dark-futuristic',
    layoutComponent: 'LawDarkTemplate',
    defaultTheme: { primary: '#c8a656', secondary: '#1e293b', fontFamily: 'Cormorant Garamond, serif' },
    defaultContent: {
      hero: { title: 'Adaletin Güçlü Temsilcisi', subtitle: 'Haklarınızı korumak için buradayız. Kurumsal ve bireysel hukuki danışmanlık.', cta_text: 'Danışmanlık Al', badge_text: 'Uzman Kadro' },
      about: '20 yılı aşkın tecrübemizle en karmaşık hukuki ihtilaflarda çözüm ortağınızız.',
      services: [{ title: 'Ceza Hukuku', description: 'Ağır ceza davaları', icon: 'Scale' }, { title: 'Aile Hukuku', description: 'Boşanma ve velayet', icon: 'Users' }, { title: 'Ticaret Hukuku', description: 'Şirket danışmanlığı', icon: 'Briefcase' }],
      team_members: [{ name: 'Av. Kemal Güven', role: 'Kurucu Ortak' }, { name: 'Av. Zeynep Arslan', role: 'Kıdemli Avukat' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Güven Hukuk Bürosu' },
      images: { hero_bg: unsplashImages.law, about_img: unsplashImages.law }
    }
  },
  law_classic: {
    template_name: 'law_classic',
    displayName: 'Klasik Hukuk Danışmanlığı',
    category: 'Avukat & Hukuk',
    categoryKeywords: ['icra', 'iş hukuku', 'arabulucu'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'LawClassicTemplate',
    defaultTheme: { primary: '#1e3a5f', secondary: '#64748b', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Güvenilir Hukuki Çözümler', subtitle: 'Şeffaf, dürüst ve sonuç odaklı avukatlık hizmeti.', cta_text: 'Bize Ulaşın' },
      about: 'Her müvekkilimizin davasını kendi davamız gibi sahipleniyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Arslan Hukuk & Arabuluculuk' },
      images: { hero_bg: unsplashImages.law, about_img: unsplashImages.law }
    }
  },

  /* ══════════ EMLAK ══════════ */
  realestate_modern: {
    template_name: 'realestate_modern',
    displayName: 'Modern Emlak Vitrini',
    category: 'Emlak & Gayrimenkul',
    categoryKeywords: ['emlak', 'gayrimenkul', 'satılık', 'kiralık', 'daire'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'RealestateModernTemplate',
    defaultTheme: { primary: '#059669', secondary: '#34d399', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Hayalinizdeki Evi Bulun', subtitle: 'En güncel satılık ve kiralık portföyümüzle size en uygun evi buluyoruz.', cta_text: 'İlanları Gör', badge_text: 'Güvenilir Emlak' },
      about: 'Bölgedeki en geniş portföye sahip, lisanslı gayrimenkul danışmanlarıyız.',
      services: [{ title: 'Ev Satışı', description: 'Değerinde ve hızlı', icon: 'Home' }, { title: 'Kiralama', description: 'Güvenilir kiracı', icon: 'Key' }, { title: 'Yatırım Danışmanlığı', description: 'Kazandıran projeler', icon: 'TrendingUp' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Merkez Emlak' },
      images: { hero_bg: unsplashImages.realestate, about_img: unsplashImages.realestate }
    }
  },
  realestate_luxury: {
    template_name: 'realestate_luxury',
    displayName: 'Lüks Gayrimenkul',
    category: 'Emlak & Gayrimenkul',
    categoryKeywords: ['lüks konut', 'villa', 'yalı'],
    layoutStyle: 'dark-futuristic',
    layoutComponent: 'RealestateLuxuryTemplate',
    defaultTheme: { primary: '#d4af37', secondary: '#1a1a2e', fontFamily: 'Playfair Display, serif' },
    defaultContent: {
      hero: { title: 'Prestijli Yaşam Alanları', subtitle: 'Lüks villa ve özel mülk portföyümüzle tanışın.', cta_text: 'Portföyü İncele' },
      about: 'Ayrıcalıklı gayrimenkuller.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Premium Real Estate' },
      images: { hero_bg: unsplashImages.realestate, about_img: unsplashImages.realestate }
    }
  },

  /* ══════════ ECZANE ══════════ */
  pharmacy_clean: {
    template_name: 'pharmacy_clean',
    displayName: 'Nöbetçi & Merkez Eczane',
    category: 'Eczane',
    categoryKeywords: ['eczane', 'ilaç', 'sağlık', 'nöbetçi'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'PharmacyCleanTemplate',
    defaultTheme: { primary: '#16a34a', secondary: '#86efac', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Sağlığınız İçin Yanınızdayız', subtitle: 'Geniş ilaç yelpazesi, dermokozmetik ve vitamin ürünleriyle hizmetinizdeyiz.', cta_text: 'Adres Tarifi Al', badge_text: 'SGK Anlaşmalı' },
      about: 'Yıllardır aynı adreste güvenle hizmet veriyoruz.',
      services: [{ title: 'Reçeteli İlaçlar', description: 'Tüm SGK işlemleri', icon: 'Pill' }, { title: 'Dermokozmetik', description: 'Seçkin markalar', icon: 'Sparkles' }, { title: 'Vitaminler', description: 'Bağışıklık destekleri', icon: 'Heart' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Merkez Eczanesi' },
      images: { hero_bg: unsplashImages.pharmacy, about_img: unsplashImages.pharmacy }
    }
  },
  pharmacy_warm: {
    template_name: 'pharmacy_warm',
    displayName: 'Butik Eczane',
    category: 'Eczane',
    categoryKeywords: ['dermokozmetik', 'doğal', 'bitkisel'],
    layoutStyle: 'editorial-retro',
    layoutComponent: 'PharmacyWarmTemplate',
    defaultTheme: { primary: '#15803d', secondary: '#a3e635', fontFamily: 'Lora, serif' },
    defaultContent: {
      hero: { title: 'Doğal Sağlık Çözümleri', subtitle: 'Bitkisel takviyeler ve organik cilt bakım ürünleri.', cta_text: 'Bize Ulaşın' },
      about: 'Bütüncül sağlık yaklaşımımızla yanınızdayız.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Doğa Eczanesi' },
      images: { hero_bg: unsplashImages.pharmacy, about_img: unsplashImages.pharmacy }
    }
  },

  /* ══════════ VETERİNER ══════════ */
  vet_friendly: {
    template_name: 'vet_friendly',
    displayName: 'Dostane Veteriner Kliniği',
    category: 'Veteriner',
    categoryKeywords: ['veteriner', 'vet', 'kedi', 'köpek', 'pet'],
    layoutStyle: 'editorial-retro',
    layoutComponent: 'VetFriendlyTemplate',
    defaultTheme: { primary: '#0d9488', secondary: '#fbbf24', fontFamily: 'Nunito, sans-serif' },
    defaultContent: {
      hero: { title: 'Patili Dostlarınız Bize Emanet', subtitle: 'Sevgiyle ve uzmanlıkla, minik dostlarınızın sağlığı için çalışıyoruz.', cta_text: 'Randevu Al', badge_text: '7/24 Acil Müdahale' },
      about: 'Modern cihazlarımız ve hayvansever ekibimizle tam teşekküllü veteriner kliniği.',
      services: [{ title: 'Aşılama', description: 'Düzenli takip', icon: 'Syringe' }, { title: 'Cerrahi', description: 'Steril ameliyathane', icon: 'Scissors' }, { title: 'Pet Kuaför', description: 'Yıkama ve kesim', icon: 'Scissors' }],
      team_members: [{ name: 'Vet. Hekim Ali Yılmaz', role: 'Başhekim' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Pati Veteriner Kliniği' },
      images: { hero_bg: unsplashImages.vet, about_img: unsplashImages.vet }
    }
  },
  vet_modern: {
    template_name: 'vet_modern',
    displayName: 'Modern Hayvan Hastanesi',
    category: 'Veteriner',
    categoryKeywords: ['hayvan hastanesi', 'acil veteriner'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'VetModernTemplate',
    defaultTheme: { primary: '#0891b2', secondary: '#22d3ee', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'İleri Teknoloji Hayvan Hastanesi', subtitle: 'Tüm tahlil, röntgen ve ameliyat işlemleri tek çatı altında.', cta_text: 'Hemen Ara' },
      about: '7 gün 24 saat kesintisiz hizmet veriyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Merkez Hayvan Hastanesi' },
      images: { hero_bg: unsplashImages.vet, about_img: unsplashImages.vet }
    }
  },

  /* ══════════ FOTOĞRAFÇI ══════════ */
  photo_minimal: {
    template_name: 'photo_minimal',
    displayName: 'Minimalist Portfolyo',
    category: 'Fotoğrafçı',
    categoryKeywords: ['fotoğrafçı', 'düğün fotoğrafçısı', 'stüdyo', 'çekim'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'PhotoMinimalTemplate',
    defaultTheme: { primary: '#171717', secondary: '#737373', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'En Güzel Anlarınızı Ölümsüzleştiriyoruz', subtitle: 'Düğün, nişan ve özel gün hikayelerinizi sanata dönüştürüyoruz.', cta_text: 'Portfolyoyu İncele', badge_text: 'Ödüllü Fotoğrafçı' },
      about: 'Doğal ışık ve anı yakalamayı seven tarzımızla...',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Lens & Işık Stüdyo' },
      images: { hero_bg: unsplashImages.photo, about_img: unsplashImages.photo }
    }
  },
  photo_dark: {
    template_name: 'photo_dark',
    displayName: 'Sanatsal Dark Portfolyo',
    category: 'Fotoğrafçı',
    categoryKeywords: ['moda fotoğrafçısı', 'ürün çekimi'],
    layoutStyle: 'dark-futuristic',
    layoutComponent: 'PhotoDarkTemplate',
    defaultTheme: { primary: '#e11d48', secondary: '#f43f5e', fontFamily: 'Outfit, sans-serif' },
    defaultContent: {
      hero: { title: 'Görsel Hikaye Anlatıcısı', subtitle: 'Moda ve ürün fotoğrafçılığında sınırları zorluyoruz.', cta_text: 'Keşfet' },
      about: 'Karanlık ve dramatik estetiği seviyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Noir Photography' },
      images: { hero_bg: unsplashImages.photo, about_img: unsplashImages.photo }
    }
  },

  /* ══════════ GÜZELLİK SALONU & SPA ══════════ */
  spa_glass: {
    template_name: 'spa_glass',
    displayName: 'Rahatlatıcı SPA & Masaj',
    category: 'Güzellik Salonu & SPA',
    categoryKeywords: ['spa', 'masaj', 'cilt bakımı', 'güzellik merkezi'],
    layoutStyle: 'glassmorphism',
    layoutComponent: 'SpaGlassTemplate',
    defaultTheme: { primary: '#7c3aed', secondary: '#c084fc', fontFamily: 'Outfit, sans-serif' },
    defaultContent: {
      hero: { title: 'Ruhunuzu ve Bedeninizi Arındırın', subtitle: 'Uzakdoğu masajları ve aromaterapi ile şehrin stresinden uzaklaşın.', cta_text: 'Rezervasyon', badge_text: 'Huzur Noktası' },
      about: 'Sessiz ve sakin atmosferimizde kendinizi yenileyin.',
      services: [{ title: 'Masaj Terapisi', description: 'İsveç, Bali, Thai', icon: 'Heart' }, { title: 'Cilt Bakımı', description: 'Organik ürünler', icon: 'Sparkles' }],
      price_list: [{ title: 'Klasik Masaj', price: '₺1000', duration: '60 dk' }, { title: 'VIP SPA Paketi', price: '₺2500', duration: '120 dk', is_popular: true }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Zen SPA' },
      images: { hero_bg: unsplashImages.spa, about_img: unsplashImages.spa }
    }
  },
  beauty_luxury: {
    template_name: 'beauty_luxury',
    displayName: 'Lüks Güzellik Merkezi',
    category: 'Güzellik Salonu & SPA',
    categoryKeywords: ['estetik', 'lazer epilasyon', 'bölgesel incelme'],
    layoutStyle: 'editorial-retro',
    layoutComponent: 'BeautyLuxuryTemplate',
    defaultTheme: { primary: '#be185d', secondary: '#fda4af', fontFamily: 'Cormorant Garamond, serif' },
    defaultContent: {
      hero: { title: 'Mükemmelliği Keşfedin', subtitle: 'Lazer epilasyon ve medikal cilt bakımında uzman teknoloji.', cta_text: 'Bize Ulaşın' },
      about: 'Son teknoloji cihazlarla hizmet veriyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Aura Güzellik' },
      images: { hero_bg: unsplashImages.spa, about_img: unsplashImages.spa }
    }
  },

  /* ══════════ TESİSATÇI & TADİLAT ══════════ */
  plumber_urgent: {
    template_name: 'plumber_urgent',
    displayName: 'Acil Su Tesisatçısı',
    category: 'Tesisatçı & Tadilat',
    categoryKeywords: ['tesisatçı', 'su kaçağı', 'tıkanıklık', 'boru'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'PlumberUrgentTemplate',
    defaultTheme: { primary: '#2563eb', secondary: '#60a5fa', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Su Kaçağı ve Tıkanıklık Açma', subtitle: 'Kırmadan, dökmeden kameralı cihazlarla su kaçağı tespiti.', cta_text: 'Hemen Ara', badge_text: '7/24 Servis' },
      about: 'Son teknoloji cihazlarla, kırmadan tamir işlemi yapıyoruz.',
      services: [{ title: 'Su Kaçağı Tespiti', description: 'Kameralı tespit', icon: 'Droplets' }, { title: 'Tıkanıklık Açma', description: 'Robotla açım', icon: 'Wrench' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Hızlı Tesisat', whatsapp_message: 'Tesisat arızası için acil servis talebim var.' },
      images: { hero_bg: unsplashImages.plumber, about_img: unsplashImages.plumber }
    }
  },
  renovation_portfolio: {
    template_name: 'renovation_portfolio',
    displayName: 'Tadilat & Dekorasyon',
    category: 'Tesisatçı & Tadilat',
    categoryKeywords: ['tadilat', 'boya', 'dekorasyon', 'inşaat'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'RenovationPortfolioTemplate',
    defaultTheme: { primary: '#d97706', secondary: '#fbbf24', fontFamily: 'Outfit, sans-serif' },
    defaultContent: {
      hero: { title: 'Evinizi Yeniliyoruz', subtitle: 'Anahtar teslim ev ve iş yeri tadilat, boya, dekorasyon hizmetleri.', cta_text: 'Projeleri Gör' },
      about: 'Hayalinizdeki evi gerçeğe dönüştürüyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Usta Dekorasyon' },
      images: { hero_bg: unsplashImages.plumber, about_img: unsplashImages.plumber }
    }
  },

  /* ══════════ ELEKTRİKÇİ ══════════ */
  electrician_bold: {
    template_name: 'electrician_bold',
    displayName: 'Dikkat Çekici Acil Elektrikçi',
    category: 'Elektrikçi',
    categoryKeywords: ['elektrikçi', 'arıza', 'şofben', 'tesisat', 'elektrik'],
    layoutStyle: 'neo-brutalism',
    layoutComponent: 'ElectricianBoldTemplate',
    defaultTheme: { primary: '#eab308', secondary: '#1e40af', fontFamily: 'Space Grotesk, sans-serif' },
    defaultContent: {
      hero: { title: 'Elektrik Arızalarına Son', subtitle: 'Şofben montajı, sigorta arızaları ve tüm elektrik tesisat işleriniz.', cta_text: 'Usta Çağır', badge_text: 'Sertifikalı Usta' },
      about: 'Güvenlik bizim işimiz.',
      services: [{ title: 'Sigorta Arızaları', description: 'Hızlı onarım', icon: 'Zap' }, { title: 'Priz / Aydınlatma', description: 'Montaj işleri', icon: 'Lightbulb' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Voltaj Elektrik', whatsapp_message: 'Elektrik arızası için ustaya ihtiyacım var.' },
      images: { hero_bg: unsplashImages.electrician, about_img: unsplashImages.electrician }
    }
  },
  electrician_pro: {
    template_name: 'electrician_pro',
    displayName: 'Profesyonel Elektrik Proje',
    category: 'Elektrikçi',
    categoryKeywords: ['proje', 'pano', 'akıllı ev'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'ElectricianProTemplate',
    defaultTheme: { primary: '#f59e0b', secondary: '#3b82f6', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Profesyonel Elektrik Çözümleri', subtitle: 'Bina tesisatı ve akıllı ev sistemleri.', cta_text: 'Bize Ulaşın' },
      about: 'Kurumsal elektrik projeleri.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Pro Elektrik' },
      images: { hero_bg: unsplashImages.electrician, about_img: unsplashImages.electrician }
    }
  },

  /* ══════════ OTO TAMİR & SERVİS ══════════ */
  autorepair_dark: {
    template_name: 'autorepair_dark',
    displayName: 'Performans Garajı',
    category: 'Oto Tamir & Servis',
    categoryKeywords: ['oto tamir', 'servis', 'mekanik', 'kaporta', 'motor'],
    layoutStyle: 'dark-futuristic',
    layoutComponent: 'AutorepairDarkTemplate',
    defaultTheme: { primary: '#ef4444', secondary: '#1e293b', fontFamily: 'Outfit, sans-serif' },
    defaultContent: {
      hero: { title: 'Aracınız Güvenli Ellerde', subtitle: 'Motor, mekanik, periyodik bakım ve arıza tespit hizmetleri.', cta_text: 'Fiyat Al', badge_text: 'Garantili İşçilik' },
      about: 'Tüm marka araçlara özel bilgisayarlı arıza tespit cihazlarıyla hizmet veriyoruz.',
      services: [{ title: 'Periyodik Bakım', description: 'Yağ ve filtre değişimi', icon: 'Settings' }, { title: 'Mekanik Tamir', description: 'Motor revizyonu', icon: 'Wrench' }],
      price_list: [{ title: 'Standart Periyodik Bakım', price: '₺3500' }, { title: 'Bilgisayarlı Arıza Tespit', price: '₺500' }],
      testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Performans Oto Servis' },
      images: { hero_bg: unsplashImages.autorepair, about_img: unsplashImages.autorepair }
    }
  },
  autoservice_pro: {
    template_name: 'autoservice_pro',
    displayName: 'Güvenilir Özel Servis',
    category: 'Oto Tamir & Servis',
    categoryKeywords: ['özel servis', 'bakım', 'onarım'],
    layoutStyle: 'neo-minimalist',
    layoutComponent: 'AutoserviceProTemplate',
    defaultTheme: { primary: '#2563eb', secondary: '#60a5fa', fontFamily: 'Inter, sans-serif' },
    defaultContent: {
      hero: { title: 'Uzman Özel Servis', subtitle: 'Kaliteli yedek parça ve usta işçilik.', cta_text: 'Randevu Al' },
      about: 'Orijinal ve garantili yedek parçalar kullanıyoruz.',
      services: mockServices, testimonials: mockTestimonials, contact: { ...mockContact, company_name: 'Güven Oto Servis' },
      images: { hero_bg: unsplashImages.autorepair, about_img: unsplashImages.autorepair }
    }
  },



};

/**
 * Verilen kategori ismine göre uygun olan ilk şablon preset'ini döndürür.
 * Kategori eşleşmezse veya bulunamazsa fallback olarak ilk şablonu (cafe_warm) döndürür.
 */
export function getPresetForCategory(categoryStr: string): TemplatePreset {
  const normalizedCategory = categoryStr.toLowerCase().trim();
  
  // Tamamen izole edilmiş, Türkçe/İngilizce eş anlamlıları içeren kategori havuzları.
  // Hiçbir havuz birbiriyle çakışmaz veya ortak şablon barındırmaz.
  const pools = [
    {
      name: "Restoran",
      keys: ["restoran", "restaurant", "lokanta", "bistro", "pub", "bar", "food", "yemek"],
      templates: ["cafe_warm", "ginger_white"]
    },
    {
      name: "Kafe",
      keys: ["kafe", "cafe", "kahve", "coffee", "tea", "çay"],
      templates: ["cafe_warm", "ginger_white"]
    },
    {
      name: "Pastane & Fırın",
      keys: ["pastane", "pastanesi", "fırın", "fırını", "bakery", "patisserie", "unlu mamul", "tatlı", "cake", "bread"],
      templates: ["cafe_warm", "ginger_white"]
    },
    {
      name: "Berber & Kuaför",
      keys: ["berber", "berberi", "kuaför", "kuaförü", "hairdresser", "barber", "shave", "saç", "tıraş"],
      templates: ["barber_dark", "salon_elegant"]
    },
    {
      name: "Güzellik Salonu & SPA",
      keys: ["güzellik", "beauty", "spa", "masaj", "massage", "salon", "salonu", "cilt", "estetik"],
      templates: ["spa_glass", "beauty_luxury"]
    },
    {
      name: "Çilingir",
      keys: ["çilingir", "çilingiri", "locksmith", "anahtar", "kilit", "key"],
      templates: ["locksmith_urgent", "locksmith_pro"]
    },
    {
      name: "Tesisatçı & Tadilat",
      keys: ["tesisat", "tesisatçı", "tesisatçısı", "plumber", "su tesisat", "boru", "musluk", "tadilat", "renovation", "dekorasyon", "boya"],
      templates: ["plumber_urgent", "renovation_portfolio"]
    },
    {
      name: "Elektrikçi",
      keys: ["elektrik", "elektrikçi", "elektrikçisi", "electrician", "electric", "power", "pano", "lamba"],
      templates: ["electrician_bold", "electrician_pro"]
    },
    {
      name: "Oto Tamir & Servis",
      keys: ["oto tamir", "auto repair", "servis", "servisi", "service", "mechanic", "tamirci", "garaj", "garage"],
      templates: ["autorepair_dark", "autoservice_pro"]
    },
    {
      name: "Oto Yıkama",
      keys: ["yıkama", "oto yıkama", "car wash", "carwash", "temizlik", "detailing", "cila"],
      templates: ["carwash_modern", "carwash_glass"]
    },
    {
      name: "Diş Kliniği",
      keys: ["diş", "dişçi", "dentist", "dental", "implant", "tooth"],
      templates: ["dental_clean", "dental_premium"]
    },
    {
      name: "Veteriner",
      keys: ["veteriner", "veterinerlik", "vet", "veterinary", "animal", "pet", "hayvan"],
      templates: ["vet_friendly", "vet_modern"]
    },
    {
      name: "Eczane",
      keys: ["eczane", "eczaneler", "pharmacy", "drugstore", "eczacı", "ilaç"],
      templates: ["pharmacy_clean", "pharmacy_warm"]
    },
    {
      name: "Avukat & Hukuk",
      keys: ["avukat", "hukuk", "law", "lawyer", "attorney", "dava", "baro"],
      templates: ["law_dark", "law_classic"]
    },
    {
      name: "Emlak & Gayrimenkul",
      keys: ["emlak", "emlakçı", "realestate", "real estate", "gayrimenkul", "konut", "daire", "ev", "house", "apartment"],
      templates: ["realestate_modern", "realestate_luxury"]
    },
    {
      name: "Fotoğrafçı",
      keys: ["fotoğraf", "fotoğrafçı", "photographer", "photo", "studio", "resim", "düğün fotoğraf"],
      templates: ["photo_minimal", "photo_dark"]
    }
  ];

  // Kelimeleri boşluklara göre ayırarak substring çakışmalarını (örn: bar vs barber) engelle
  const words = normalizedCategory.split(/[\s,&\/]+/).filter(Boolean);
  
  let selectedPool: string[] | null = null;
  let matchedPoolName = "";

  for (const pool of pools) {
    const hasMatch = pool.keys.some(key => {
      if (key.includes(' ')) {
        return normalizedCategory.includes(key);
      }
      return words.includes(key);
    });
    
    if (hasMatch) {
      selectedPool = pool.templates;
      matchedPoolName = pool.name;
      break;
    }
  }

  // Eğer havuz bulunduysa içinden rastgele bir şablon seç
  if (selectedPool && selectedPool.length > 0) {
    const randomIndex = Math.floor(Math.random() * selectedPool.length);
    const selectedTemplateName = selectedPool[randomIndex];
    const preset = templateRegistry[selectedTemplateName];
    if (preset) {
      console.log(`[TEMPLATE SELECTION] Category "${categoryStr}" matches pool "${matchedPoolName}" [${selectedPool.join(', ')}]. Selected: "${selectedTemplateName}"`);
      return preset;
    }
  }

  // Hiçbir şey bulunamazsa fallback olarak cafe_warm döndür
  console.log(`[TEMPLATE SELECTION] No pool found for category "${categoryStr}". Fallback to cafe_warm.`);
  return templateRegistry['cafe_warm'];
}


export function getAllPresets(): TemplatePreset[] {
  return Object.values(templateRegistry);
}

export function getPresetByName(name: string): TemplatePreset | undefined {
  return templateRegistry[name];
}
