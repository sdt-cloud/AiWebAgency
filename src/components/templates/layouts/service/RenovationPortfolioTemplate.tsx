import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { PenTool, MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export const RenovationPortfolioTemplate: React.FC<Props> = ({
  content,
  themeConfig,
  isEditMode,
  onUpdateContent,
}) => {
  const handleUpdate = (field: string, value: any) => {
    onUpdateContent({ ...content, [field]: value });
  };

  const updateNested = (parent: keyof TemplateContent, index: number, field: string, value: any) => {
    const parentArray = [...(content[parent] as any[])];
    parentArray[index] = { ...parentArray[index], [field]: value };
    onUpdateContent({ ...content, [parent]: parentArray });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans text-[#2d2418]">
      {/* Navbar */}
      <nav className="border-b border-[#e8e0d4] bg-[#faf7f2] sticky top-0 z-50">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#2d2418] flex items-center justify-center text-[#faf7f2]">
              <PenTool className="w-6 h-6" />
            </div>
            <EditableText
              value={content.contact.company_name || 'Dekorasyon & Tadilat'}
              onChange={(val: string) =>
                onUpdateContent({
                  ...content,
                  contact: { ...content.contact, company_name: val },
                })
              }
              isEditMode={isEditMode}
              className="text-2xl font-serif font-bold tracking-tight text-[#2d2418]"
            />
          </div>
          <div className="hidden md:flex items-center gap-10 font-medium text-[#5c4f3d]">
            <a href="#about" className="hover:text-[#2d2418] transition-colors border-b-2 border-transparent hover:border-[#2d2418] pb-1">Hakkımızda</a>
            <a href="#services" className="hover:text-[#2d2418] transition-colors border-b-2 border-transparent hover:border-[#2d2418] pb-1">Hizmetler</a>
            <a href="#portfolio" className="hover:text-[#2d2418] transition-colors border-b-2 border-transparent hover:border-[#2d2418] pb-1">Projeler</a>
            <a 
              href="#contact" 
              className="bg-[#2d2418] text-[#faf7f2] px-8 py-3 hover:bg-[#403525] transition-colors text-sm uppercase tracking-wider font-bold"
              style={{ backgroundColor: themeConfig.primary }}
            >
              İletişim
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row min-h-[85vh]">
          {/* Text Content */}
          <div className="lg:w-1/2 flex items-center justify-center p-12 lg:p-24 relative z-10 bg-[#faf7f2]">
            <div className="max-w-xl space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#d4a373]"></div>
                <div className="text-[#d4a373] font-bold uppercase tracking-widest text-sm" style={{ color: themeConfig.primary }}>
                  <EditableText
                    value={content.hero.badge_text || 'Özel Tasarım & İşçilik'}
                    onChange={(val: string) => handleUpdate('hero', { ...content.hero, badge_text: val })}
                    isEditMode={isEditMode}
                  />
                </div>
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif text-[#2d2418] leading-[1.1]">
                <EditableText
                  value={content.hero.title}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, title: val })}
                  isEditMode={isEditMode}
                  multiline
                />
              </h1>
              <p className="text-xl text-[#5c4f3d] leading-relaxed">
                <EditableText
                  value={content.hero.subtitle}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, subtitle: val })}
                  isEditMode={isEditMode}
                  multiline
                />
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-6">
                <a href="#portfolio" className="bg-[#2d2418] text-[#faf7f2] px-10 py-4 text-center hover:bg-[#403525] transition-colors font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-3" style={{ backgroundColor: themeConfig.primary }}>
                  <EditableText
                    value={content.hero.cta_text}
                    onChange={(val: string) => handleUpdate('hero', { ...content.hero, cta_text: val })}
                    isEditMode={isEditMode}
                  />
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="lg:w-1/2 relative min-h-[50vh] lg:min-h-full">
            <EditableImage
              src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
              alt="Renovation hero"
              className="absolute inset-0 w-full h-full object-cover"
              onImageChange={(val: string) => handleUpdate('images', { ...content.images, hero_bg: val })}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white border-y border-[#e8e0d4]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-4xl font-serif text-[#2d2418] mb-6">Uzmanlık Alanlarımız</h2>
              <p className="text-[#5c4f3d] text-lg leading-relaxed mb-8">
                Yaşam alanlarınızı modern, fonksiyonel ve estetik değerlerle yeniden şekillendiriyoruz. Her proje benzersizdir.
              </p>
              <a href="#contact" className="inline-block border-b-2 border-[#d4a373] text-[#d4a373] font-bold uppercase tracking-wider pb-1 hover:text-[#2d2418] hover:border-[#2d2418] transition-colors" style={{ color: themeConfig.primary, borderColor: themeConfig.primary }}>
                Detaylı Bilgi Al
              </a>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {content.services.slice(0, 4).map((service: any, index: number) => (
                <div key={index} className="p-8 bg-[#faf7f2] border border-[#e8e0d4] group hover:border-[#d4a373] transition-colors">
                  <div className="w-12 h-12 bg-[#2d2418] text-[#faf7f2] flex items-center justify-center mb-6 group-hover:bg-[#d4a373] transition-colors" style={{ backgroundColor: themeConfig.primary }}>
                    <PenTool className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d2418] mb-3 font-serif">
                    <EditableText
                      value={service.title}
                      onChange={(val: string) => updateNested('services', index, 'title', val)}
                      isEditMode={isEditMode}
                    />
                  </h3>
                  <p className="text-[#5c4f3d] leading-relaxed">
                    <EditableText
                      value={service.description}
                      onChange={(val: string) => updateNested('services', index, 'description', val)}
                      isEditMode={isEditMode}
                      multiline
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Gallery */}
      {content.gallery_images && content.gallery_images.length > 0 && (
        <section id="portfolio" className="py-24 bg-[#faf7f2]">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-5xl font-serif text-[#2d2418] mb-4">Seçkin Projeler</h2>
                <p className="text-[#5c4f3d] text-xl">Öncesi ve sonrası ilham veren dönüşümler.</p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 border border-[#2d2418] bg-[#2d2418] text-white font-bold text-sm tracking-wider uppercase">Tümü</button>
                <button className="px-6 py-2 border border-[#e8e0d4] text-[#5c4f3d] font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors">Mutfak</button>
                <button className="px-6 py-2 border border-[#e8e0d4] text-[#5c4f3d] font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors">Banyo</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.gallery_images.slice(0, 6).map((img, index) => (
                <div key={index} className="group relative overflow-hidden aspect-[4/5] bg-slate-200">
                  <EditableImage
                    src={img.src}
                    alt={img.alt || `Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onImageChange={(val: string) => {
                      const newGal = [...(content.gallery_images || [])];
                      newGal[index].src = val;
                      handleUpdate('gallery_images', newGal);
                    }}
                    isEditMode={isEditMode}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d2418]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div>
                      <div className="text-white font-bold font-serif text-2xl mb-1">
                        <EditableText
                          value={img.alt || 'Proje Başlığı'}
                          onChange={(val: string) => {
                            const newGal = [...(content.gallery_images || [])];
                            newGal[index].alt = val;
                            handleUpdate('gallery_images', newGal);
                          }}
                          isEditMode={isEditMode}
                        />
                      </div>
                      <div className="text-[#faf7f2]/80 uppercase tracking-wider text-sm font-bold">
                        Dönüşüm İncele
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About & Values */}
      <section id="about" className="py-24 bg-[#2d2418] text-[#faf7f2]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative p-4 bg-white/5">
                <EditableImage
                  src={content.images?.about_img || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                  alt="About Us"
                  className="w-full h-[600px] object-cover"
                  onImageChange={(val: string) => handleUpdate('images', { ...content.images, about_img: val })}
                  isEditMode={isEditMode}
                />
                <div className="absolute -bottom-8 -right-8 bg-[#d4a373] p-8 text-[#2d2418] max-w-xs" style={{ backgroundColor: themeConfig.primary }}>
                  <div className="text-5xl font-serif font-bold mb-2">25+</div>
                  <div className="font-bold uppercase tracking-wider text-sm">Yıllık Ustalık ve Zanaat</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-serif mb-8 text-white">Zanaata ve Detaylara Olan Tutkumuz</h2>
              <div className="text-lg text-white/70 leading-relaxed mb-8">
                <EditableText
                  value={content.about}
                  onChange={(val: string) => handleUpdate('about', val)}
                  isEditMode={isEditMode}
                  multiline
                />
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#d4a373] mt-1 flex-shrink-0" style={{ color: themeConfig.primary }} />
                  <div>
                    <h4 className="font-bold text-white text-xl mb-1">Premium Malzemeler</h4>
                    <p className="text-white/60">Sadece en kaliteli yapı malzemelerini kullanıyoruz.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#d4a373] mt-1 flex-shrink-0" style={{ color: themeConfig.primary }} />
                  <div>
                    <h4 className="font-bold text-white text-xl mb-1">Zamanında Teslimat</h4>
                    <p className="text-white/60">Projelerinizi söz verdiğimiz tarihte eksiksiz teslim ediyoruz.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1a150e] text-[#faf7f2] py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <PenTool className="w-8 h-8 text-[#d4a373]" style={{ color: themeConfig.primary }} />
                <span className="text-3xl font-serif font-bold tracking-tight">
                  <EditableText
                    value={content.contact.company_name || 'Dekorasyon & Tadilat'}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, company_name: val })}
                    isEditMode={isEditMode}
                  />
                </span>
              </div>
              <p className="text-white/50 max-w-md leading-relaxed text-lg">
                Hayalinizdeki mekanları gerçeğe dönüştürmek için buradayız. Ücretsiz keşif ve projelendirme için bize ulaşın.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-6">İletişim</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-lg">
                  <Phone className="w-5 h-5 text-[#d4a373]" style={{ color: themeConfig.primary }} />
                  <EditableText
                    value={content.contact.phone}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, phone: val })}
                    isEditMode={isEditMode}
                  />
                </li>
                <li className="flex items-center gap-4 text-lg">
                  <Mail className="w-5 h-5 text-[#d4a373]" style={{ color: themeConfig.primary }} />
                  <EditableText
                    value={content.contact.email}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, email: val })}
                    isEditMode={isEditMode}
                  />
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-6">Ziyaret Edin</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-lg">
                  <MapPin className="w-5 h-5 text-[#d4a373] mt-1 flex-shrink-0" style={{ color: themeConfig.primary }} />
                  <EditableText
                    value={content.contact.address}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, address: val })}
                    isEditMode={isEditMode}
                    multiline
                  />
                </li>
                <li className="flex items-start gap-4 text-lg">
                  <Clock className="w-5 h-5 text-[#d4a373] mt-1 flex-shrink-0" style={{ color: themeConfig.primary }} />
                  <EditableText
                    value={content.contact.hours}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, hours: val })}
                    isEditMode={isEditMode}
                    multiline
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/40">
            © {new Date().getFullYear()} {content.contact.company_name}. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};
