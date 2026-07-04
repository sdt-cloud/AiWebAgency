<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Antigravity Global Rules

## Problem Çözme ve Geliştirme Kuralları

1. **Asla Kolaya Kaçma (No Shortcuts)**:
   - Kod yazarken veya hata ayıklarken asla geçici ("quick-fix") ya da eksik çözümler tercih etme.
   - Her zaman uzun vadeli, kararlı, en kesin ve güvenli çözüm yolunu (robust solution) uygula.
   - Hatanın kök nedenini analiz etmeden sadece belirtiyi düzelten yamalar yapma.

2. **Açıklayıcı ve Yoğun Kod Yorumları (Rich Code Commenting)**:
   - Yazdığın kodlarda fonksiyonlar, karmaşık mantıksal bloklar ve önemli karar noktaları için mutlaka açıklayıcı yorum satırları ekle.
   - Yorumlarda sadece kodun "ne yaptığını" değil, "neden bu yöntemle yapıldığını" ve amacını açıklayan detaylı notlar ekle.
   - Yorum satırı oranını artırarak kodun okunabilirliğini üst düzeye çıkar.

## Web Tasarım ve Arayüz Kuralları (Web Design Styles)

Web uygulamaları veya siteleri tasarlarken, birbirinin kopyası olan jenerik tasarımlar yapılmayacaktır. Projenin amacına, hedef kitlesine ve sektöre en uygun olan tasarım tarzı belirlenip uygulanmalıdır. Aşağıdaki 5 ana tarzdan biri seçilerek tasarım inşa edilmelidir:

1. **Neo-Minimalist (Modern & Temiz)**:
   - *Karakteristik:* Geniş boşluklar (whitespace), yüksek kontrastlı ince çizgiler, çok hafif gölgeler, sade ve şık tipografi (örn. Inter, Outfit), düz renk arka planlar.
   - *Kullanım:* SaaS ürünleri, portfolyolar, dökümantasyonlar, kişisel bloglar.

2. **Glassmorphism (Buzlu Cam Efekti)**:
   - *Karakteristik:* Arkada renkli/gradyanlı canlı görseller, üstte `backdrop-filter: blur(12px)` ile yarı şeffaf paneller, ince parlayan kenarlıklar, derinlik hissi veren hafif gölgeler.
   - *Kullanım:* Finans/Kripto uygulamaları, yapay zeka araçları, modern gösterge panelleri (dashboards).

3. **Dark Futuristic (Neon & Cyberpunk)**:
   - *Karakteristik:* Çok koyu arka planlar (#0a0a12 gibi), canlı neon renklerde vurgular (siyan, magenta, yeşil), ızgara (grid) arka plan desenleri, parlayan butonlar, teknolojik ve keskin hatlar.
   - *Kullanım:* Oyun siteleri, siber güvenlik, yapay zeka veya veri analiz araçları.

4. **Editorial & Retro-Modern (Klasik & Sıcak)**:
   - *Karakteristik:* Sıcak kırık beyaz/krem tonlarında arka planlar, zarif serif başlık fontları (örn. Playfair Display, Lora), yuvarlak organik şekiller, toprak ve pastel tonlarında renk paletleri.
   - *Kullanım:* E-ticaret siteleri, restoranlar, butik ajanslar, yaşam tarzı ve sanat projeleri.

5. **Neo-Brutalism (Cesur & Aykırı)**:
   - *Karakteristik:* Kalın siyah kenarlıklar (örn. `3px solid #000`), yumuşatılmamış düz gölgeler (offset shadows), canlı ve doygun ana renkler (sarı, turuncu, mavi), kalın ve iddialı grotesk tipografi.
   - *Kullanım:* Yaratıcı ajanslar, etkinlik sayfaları, indie projeler, gençlere yönelik mobil/web uygulamaları.

### Tasarım Uygulama Esasları:
- **Renk Paleti:** Hazır jenerik renkler (saf kırmızı, saf mavi vb.) kullanılmayacak; projenin tarzına göre uyumlu renk paletleri (gradyanlar dahil) özel olarak tasarlanacaktır.
- **Tipografi:** Tarza uygun olarak Google Fonts kütüphanesinden özel fontlar yüklenecek ve kullanılacaktır.
- **Etkileşim:** Butonlar, kartlar ve formlar için akıcı hover efektleri, mikro animasyonlar ve sayfa geçişleri eklenecektir.
- **Responsive:** Tüm tasarımlar mobil, tablet ve masaüstü ekranlar için mükemmel uyumlulukta (responsive) olacaktır.
