import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';
const hasApiKey = !!apiKey;

// Initialize GoogleGenAI SDK if key is present
const ai = hasApiKey ? new GoogleGenAI({ apiKey }) : null;

// Mock Response Generator for Offline / No-API-Key Mode
function getMockWebsiteContent(name: string, category: string, reviewsSummary: string): any {
  const catLower = (category || '').toLowerCase();
  
  // Decide template type based on category
  let template_name: 'restaurant' | 'service' | 'business' = 'business';
  let primaryColor = '#4f46e5'; // Indigo
  let secondaryColor = '#818cf8';
  let fontFamily = 'Inter';

  if (catLower.includes('fırın') || catLower.includes('cafe') || catLower.includes('restoran') || catLower.includes('yemek') || catLower.includes('bakery') || catLower.includes('restaurant')) {
    template_name = 'restaurant';
    primaryColor = '#b45309'; // Amber/Orange
    secondaryColor = '#f59e0b';
    fontFamily = 'Playfair Display';
  } else if (catLower.includes('çilingir') || catLower.includes('tesisat') || catLower.includes('temizlik') || catLower.includes('berber') || catLower.includes('locksmith') || catLower.includes('plumber') || catLower.includes('barber')) {
    template_name = 'service';
    primaryColor = '#1d4ed8'; // Royal Blue
    secondaryColor = '#60a5fa';
    fontFamily = 'Outfit';
  }

  // Pre-compiled high quality mock text blocks
  if (template_name === 'restaurant') {
    return {
      template_name,
      theme_config: { primary: primaryColor, secondary: secondaryColor, fontFamily },
      content: {
        hero: {
          title: `${name} - Taze Lezzetler ve Sıcak Sohbet`,
          subtitle: `En kaliteli malzemelerle hazırlanan el yapımı lezzetlerimizle hizmetinizdeyiz.`,
          cta_text: "Menüyü İnceleyin"
        },
        about: `${name}, kurulduğu günden bu yana müşteri memnuniyetini odağına alarak, en taze malzemeleri geleneksel tariflerle buluşturuyor. Müşterilerimizin harika yorumlarında da bahsettiği gibi ${reviewsSummary || 'sıcak ve samimi ortamımızla fark yaratıyoruz'}.`,
        services: [
          { title: "Zengin Menü", description: "Her damak tadına uygun taze tatlar." },
          { title: "Özel Sipariş", description: "Doğum günleri ve etkinlikleriniz için özel üretim." },
          { title: "Paket Servis", description: "Lezzetlerimizi sıcak ve hızlı şekilde kapınıza getiriyoruz." }
        ],
        testimonials: [
          { name: "Ahmet Y.", text: "Hayatımda yediğim en taze ürünler buradaydı. Güleryüzlü hizmet için teşekkürler!" },
          { name: "Elif B.", text: "Hem ortamı harika hem de tatlıları enfes. Kesinlikle tavsiye ederim." }
        ],
        contact: {
          phone: "+90 212 555 1234",
          email: `bilgi@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
          address: "Kadıköy, İstanbul",
          hours: "Hergün: 08:00 - 22:00"
        },
        images: {
          hero_bg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
          about_img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600",
          services_img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600"
        }
      }
    };
  } else if (template_name === 'service') {
    return {
      template_name,
      theme_config: { primary: primaryColor, secondary: secondaryColor, fontFamily },
      content: {
        hero: {
          title: `Güvenilir & Hızlı Hizmet: ${name}`,
          subtitle: `Uzman kadromuzla 7/24 yanınızdayız. Sorunlarınızı anında çözüyoruz.`,
          cta_text: "Hemen Teklif Al"
        },
        about: `${name} olarak, uzun yıllara dayanan tecrübemiz ve uzman ekibimizle sektörde güvenilir çözümler üretiyoruz. Müşterilerimizin yorumlarında sıklıkla belirttiği gibi ${reviewsSummary || 'hızlı servis ve dürüst esnaflık ilkesiyle'} hareket ediyoruz.`,
        services: [
          { title: "7/24 Acil Servis", description: "Günün veya gecenin her saatinde kesintisiz destek." },
          { title: "Garantili İşçilik", description: "Yaptığımız tüm işlemlere malzeme ve işçilik garantisi sunuyoruz." },
          { title: "Hızlı Ulaşım", description: "Çağrınızdan sonra en kısa sürede adresinizde oluyoruz." }
        ],
        testimonials: [
          { name: "Can M.", text: "Gecenin bir yarısı acil durum için ulaştım, yarım saatte gelip problemi çözdüler. Çok profesyonel." },
          { name: "Selin K.", text: "Dürüst çalışan, makul fiyatlı ve temiz iş yapan bir işletme. Çok memnun kaldım." }
        ],
        contact: {
          phone: "+90 532 999 8877",
          email: `iletisim@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
          address: "Beşiktaş, İstanbul",
          hours: "7 Gün 24 Saat Açık"
        },
        images: {
          hero_bg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
          about_img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600",
          services_img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
        }
      }
    };
  } else {
    return {
      template_name,
      theme_config: { primary: primaryColor, secondary: secondaryColor, fontFamily },
      content: {
        hero: {
          title: `${name} ile Geleceğe Yatırım Yapın`,
          subtitle: `İhtiyaçlarınıza özel profesyonel çözümler ve kaliteli hizmet.`,
          cta_text: "Bize Ulaşın"
        },
        about: `${name}, sektördeki deneyimi ve yenilikçi yaklaşımları ile müşterilerine en üst düzeyde değer sağlamayı amaç edinmiştir. ${reviewsSummary || 'Müşteri odaklı hizmet anlayışımızla sektörde fark oluşturuyoruz'}.`,
        services: [
          { title: "Danışmanlık", description: "Hedeflerinize ulaşmanız için stratejik rehberlik." },
          { title: "Özel Çözümler", description: "İşletmenizin yapısına özel tasarlanmış hizmetler." },
          { title: "Sürekli Destek", description: "İhtiyaç duyduğunuz her an teknik ve operasyonel destek." }
        ],
        testimonials: [
          { name: "Kadir T.", text: "İlk andan itibaren çok ilgiliydiler. Çözümleri işimizi çok kolaylaştırdı." },
          { name: "Merve D.", text: "Güler yüzlü ekibi ve yüksek kaliteli hizmet standartları ile vazgeçilmez bir partner." }
        ],
        contact: {
          phone: "+90 850 333 4455",
          email: `info@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
          address: "Şişli, İstanbul",
          hours: "Hafta içi: 09:00 - 18:00"
        },
        images: {
          hero_bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
          about_img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
          services_img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
        }
      }
    };
  }
}

export const gemini = {
  isMock: !hasApiKey,

  async summarizeReviews(businessName: string, category: string, reviews: string[]): Promise<string> {
    if (!hasApiKey || !ai) {
      console.log('Gemini summarizeReviews: Running in Mock Mode');
      return "Hızlı teslimat, taze ürünler ve güler yüzlü personel öne çıkıyor.";
    }

    try {
      const prompt = `
        Aşağıdaki yerel işletmeye ait Google incelemelerini (yorumları) analiz et.
        İşletme Adı: ${businessName}
        Kategori: ${category}
        Yorumlar:
        ${reviews.map((r, i) => `${i + 1}. "${r}"`).join('\n')}

        Bu işletmenin müşteriler tarafından en çok beğenilen 2-3 güçlü yönünü özetleyen tek bir kısa Türkçe cümle yaz.
        Bu cümle doğrudan işletmenin web sitesinde "Biz Kimiz" kısmında kullanılacağı için profesyonel ve etkileyici bir dille yazılmalıdır.
        Örnek format: "Hızlı servis, güler yüzlü esnaflık ve hasarsız işçiliğimiz ile bölgedeki müşterilerimizin beğenisini topluyoruz."
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text?.trim() || "Müşteri odaklı hizmet kalitesi ve güvenilirlik.";
    } catch (error) {
      console.error('Error in Gemini summarizeReviews:', error);
      return "Müşteri odaklı üstün hizmet kalitesi ve bölgedeki güvenilir esnaflık.";
    }
  },

  async generateWebsite(
    businessName: string,
    category: string,
    address: string,
    phone: string,
    reviewsSummary: string
  ): Promise<any> {
    if (!hasApiKey || !ai) {
      console.log('Gemini generateWebsite: Running in Mock Mode');
      return getMockWebsiteContent(businessName, category, reviewsSummary);
    }

    try {
      const prompt = `
        Sen profesyonel bir web tasarımcısı ve metin yazarısın (copywriter).
        Aşağıdaki bilgilere sahip yerel işletme için modern, yüksek dönüşümlü ve ikna edici tek sayfalık bir web sitesi (landing page) içeriği üret.
        
        İşletme Adı: ${businessName}
        Kategori: ${category}
        Adres: ${address}
        Telefon: ${phone}
        Müşteri Yorum Özeti: ${reviewsSummary}

        Görevin işletmenin kategorisine uygun bir şablon seçmek, şık bir renk teması belirlemek ve tüm site metinlerini Türkçe olarak hazırlamaktır.
        
        Kategoriler için şablon önerisi:
        - Yeme içme, fırın, cafe, restoranlar için: "restaurant"
        - Tesisatçı, çilingir, berber, temizlik gibi hizmet sektörü için: "service"
        - Diğer perakende, danışmanlık, genel kurumsal firmalar için: "business"

        Temanın renk şeması (primary ve secondary renkleri) HEX kodu olarak işletmenin ruhuna uymalıdır.
        (Örn: Tesisatçı için mavi tonları, Cafe için kahve/amber tonları, Spa için lavanta/yeşil vb.)
        
        Yanıtı TAMAMEN aşağıdaki JSON şemasına uygun olarak döndür. Ekstra açıklama yazma, doğrudan JSON çıktısı ver.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              template_name: {
                type: 'STRING',
                enum: ['service', 'restaurant', 'business'],
                description: 'Şablon seçimi. Sektöre göre belirlenmeli.',
              },
              theme_config: {
                type: 'OBJECT',
                properties: {
                  primary: { type: 'STRING', description: 'HEX renk kodu, örn: #1d4ed8' },
                  secondary: { type: 'STRING', description: 'HEX renk kodu, örn: #60a5fa' },
                  fontFamily: { type: 'STRING', description: 'Google Font adı, örn: Inter, Playfair Display, Outfit' },
                },
                required: ['primary', 'secondary', 'fontFamily'],
              },
              content: {
                type: 'OBJECT',
                properties: {
                  hero: {
                    type: 'OBJECT',
                    properties: {
                      title: { type: 'STRING', description: 'Etkileyici ana başlık' },
                      subtitle: { type: 'STRING', description: 'Açıklayıcı alt başlık' },
                      cta_text: { type: 'STRING', description: 'Eylem butonu metni, örn: Hemen Ara, Teklif Al' },
                    },
                    required: ['title', 'subtitle', 'cta_text'],
                  },
                  about: { type: 'STRING', description: 'Hakkımızda veya Biz Kimiz metni (2-3 cümlelik esnaf hikayesi)' },
                  services: {
                    type: 'ARRAY',
                    items: {
                      type: 'OBJECT',
                      properties: {
                        title: { type: 'STRING', description: 'Hizmet başlığı' },
                        description: { type: 'STRING', description: 'Hizmet açıklaması' },
                      },
                      required: ['title', 'description'],
                    },
                    description: 'İşletmenin sunduğu 3 ana hizmet',
                  },
                  testimonials: {
                    type: 'ARRAY',
                    items: {
                      type: 'OBJECT',
                      properties: {
                        name: { type: 'STRING', description: 'Yorumu yapan kişi (Adı Soyadı veya Adı Soyadı baş harfi)' },
                        text: { type: 'STRING', description: 'Google yorumlarından derlenmiş olumlu yorum' },
                      },
                      required: ['name', 'text'],
                    },
                    description: '2 adet müşteri yorumu',
                  },
                  contact: {
                    type: 'OBJECT',
                    properties: {
                      phone: { type: 'STRING', description: 'Telefon numarası' },
                      email: { type: 'STRING', description: 'E-posta adresi (oluşturulabilir)' },
                      address: { type: 'STRING', description: 'Açık adres' },
                      hours: { type: 'STRING', description: 'Çalışma saatleri, örn: Hergün: 08:00 - 22:00 veya 7/24 Açık' },
                    },
                    required: ['phone', 'email', 'address', 'hours'],
                  },
                  images: {
                    type: 'OBJECT',
                    properties: {
                      hero_bg: { type: 'STRING', description: 'Hero arka plan görseli için Unsplash URLsi' },
                      about_img: { type: 'STRING', description: 'Hakkımızda görseli için Unsplash URLsi' },
                      services_img: { type: 'STRING', description: 'Hizmetler görseli için Unsplash URLsi' },
                    },
                    required: ['hero_bg', 'about_img', 'services_img'],
                  },
                },
                required: ['hero', 'about', 'services', 'testimonials', 'contact', 'images'],
              },
            },
            required: ['template_name', 'theme_config', 'content'],
          },
        },
      });

      const responseText = response.text || '';
      return JSON.parse(responseText);
    } catch (error) {
      console.error('Error in Gemini generateWebsite:', error);
      // Fallback to mock on error
      return getMockWebsiteContent(businessName, category, reviewsSummary);
    }
  },
};
