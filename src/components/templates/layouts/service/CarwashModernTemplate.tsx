import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Droplets, CheckCircle2, Star, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export const CarwashModernTemplate: React.FC<Props> = ({
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <EditableText
              value={content.contact.company_name || 'Oto Yıkama'}
              onChange={(val: string) =>
                onUpdateContent({
                  ...content,
                  contact: { ...content.contact, company_name: val },
                })
              }
              isEditMode={isEditMode}
              className="text-2xl font-black text-slate-900 tracking-tight"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-500 transition-colors">Hakkımızda</a>
            <a href="#services" className="hover:text-blue-500 transition-colors">Hizmetler</a>
            <a href="#pricing" className="hover:text-blue-500 transition-colors">Fiyatlar</a>
            <a 
              href="#contact" 
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all shadow-md shadow-blue-200"
              style={{ backgroundColor: themeConfig.primary }}
            >
              İletişim
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-48 w-[400px] h-[400px] bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100 uppercase tracking-wider">
                <EditableText
                  value={content.hero.badge_text || 'Premium Araç Temizliği'}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, badge_text: val })}
                  isEditMode={isEditMode}
                />
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                <EditableText
                  value={content.hero.title}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, title: val })}
                  isEditMode={isEditMode}
                  multiline
                />
              </h1>
              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
                <EditableText
                  value={content.hero.subtitle}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, subtitle: val })}
                  isEditMode={isEditMode}
                  multiline
                />
              </p>
              <div className="pt-4">
                <a href="#pricing" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 transform hover:-translate-y-1" style={{ backgroundColor: themeConfig.primary }}>
                  <EditableText
                    value={content.hero.cta_text}
                    onChange={(val: string) => handleUpdate('hero', { ...content.hero, cta_text: val })}
                    isEditMode={isEditMode}
                  />
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 w-full relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <EditableImage
                  src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                  alt="Car wash hero"
                  className="w-full h-[500px] object-cover"
                  onImageChange={(val: string) => handleUpdate('images', { ...content.images, hero_bg: val })}
                  isEditMode={isEditMode}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Features */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Hizmetlerimiz</h2>
            <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full" style={{ backgroundColor: themeConfig.primary }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.slice(0, 3).map((service: any, index: number) => (
              <div key={index} className="bg-slate-50 p-8 rounded-[2.5rem] hover:shadow-xl transition-shadow border border-slate-100 group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform" style={{ color: themeConfig.primary }}>
                  <Droplets className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  <EditableText
                    value={service.title}
                    onChange={(val: string) => updateNested('services', index, 'title', val)}
                    isEditMode={isEditMode}
                  />
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
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
      </section>

      {/* Pricing / Packages */}
      {content.price_list && content.price_list.length > 0 && (
        <section id="pricing" className="py-24 bg-blue-50 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Yıkama Paketleri</h2>
              <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full" style={{ backgroundColor: themeConfig.primary }}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {content.price_list.slice(0, 3).map((pkg, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-[3rem] p-8 ${pkg.is_popular ? 'border-4 border-blue-500 shadow-2xl scale-105 z-10' : 'border border-slate-100 shadow-lg'}`}
                  style={pkg.is_popular ? { borderColor: themeConfig.primary } : {}}
                >
                  {pkg.is_popular && (
                    <div className="bg-blue-500 text-white text-sm font-bold uppercase tracking-wider py-1.5 px-4 rounded-full inline-block mb-4" style={{ backgroundColor: themeConfig.primary }}>
                      En Çok Tercih Edilen
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    <EditableText
                      value={pkg.title}
                      onChange={(val: string) => {
                        const newPrices = [...(content.price_list || [])];
                        newPrices[index].title = val;
                        handleUpdate('price_list', newPrices);
                      }}
                      isEditMode={isEditMode}
                    />
                  </h3>
                  <div className="flex items-baseline gap-2 mb-6 text-blue-600" style={{ color: themeConfig.primary }}>
                    <span className="text-5xl font-black">
                      <EditableText
                        value={pkg.price}
                        onChange={(val: string) => {
                          const newPrices = [...(content.price_list || [])];
                          newPrices[index].price = val;
                          handleUpdate('price_list', newPrices);
                        }}
                        isEditMode={isEditMode}
                      />
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium mb-8 pb-8 border-b border-slate-100 min-h-[80px]">
                    <EditableText
                      value={pkg.description || 'Bu paket için açıklama.'}
                      onChange={(val: string) => {
                        const newPrices = [...(content.price_list || [])];
                        newPrices[index].description = val;
                        handleUpdate('price_list', newPrices);
                      }}
                      isEditMode={isEditMode}
                      multiline
                    />
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" style={{ color: themeConfig.primary }} /> Dış Yıkama
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" style={{ color: themeConfig.primary }} /> İç Vakum
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" style={{ color: themeConfig.primary }} /> Cam Temizliği
                    </li>
                    {pkg.is_popular && (
                      <li className="flex items-center gap-3 text-slate-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-blue-500" style={{ color: themeConfig.primary }} /> Cila & Koruma
                      </li>
                    )}
                  </ul>
                  <button className={`w-full py-4 rounded-2xl font-bold transition-all ${pkg.is_popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`} style={pkg.is_popular ? { backgroundColor: themeConfig.primary } : {}}>
                    Hemen Randevu Al
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About & Testimonials */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Neden Biz?</h2>
              <div className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                <EditableText
                  value={content.about}
                  onChange={(val: string) => handleUpdate('about', val)}
                  isEditMode={isEditMode}
                  multiline
                />
              </div>
              <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-slate-900">5 Yıldızlı Hizmet</div>
                  <div className="text-sm text-slate-500">Yüzlerce mutlu müşteri</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
               <EditableImage
                  src={content.images?.gallery?.[0] || 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                  alt="Gallery 1"
                  className="w-full h-48 md:h-64 object-cover rounded-[2rem]"
                  onImageChange={(val: string) => {
                    const gal = [...(content.images?.gallery || [])];
                    gal[0] = val;
                    handleUpdate('images', { ...content.images, gallery: gal });
                  }}
                  isEditMode={isEditMode}
               />
               <EditableImage
                  src={content.images?.gallery?.[1] || 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                  alt="Gallery 2"
                  className="w-full h-48 md:h-64 object-cover rounded-[2rem] mt-8"
                  onImageChange={(val: string) => {
                    const gal = [...(content.images?.gallery || [])];
                    gal[1] = val;
                    handleUpdate('images', { ...content.images, gallery: gal });
                  }}
                  isEditMode={isEditMode}
               />
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10 rounded-t-[3rem] mt-10">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="w-8 h-8 text-blue-400" style={{ color: themeConfig.secondary || themeConfig.primary }} />
                <span className="text-3xl font-black tracking-tight">
                  <EditableText
                    value={content.contact.company_name || 'Oto Yıkama'}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, company_name: val })}
                    isEditMode={isEditMode}
                  />
                </span>
              </div>
              <p className="text-slate-400 font-medium max-w-md leading-relaxed">
                Premium araç temizlik ve bakım merkezi. Aracınızın parlaklığı bizim uzmanlık alanımız.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">İletişim</h4>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1 text-blue-400" />
                  <EditableText
                    value={content.contact.phone}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, phone: val })}
                    isEditMode={isEditMode}
                  />
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 text-blue-400" />
                  <EditableText
                    value={content.contact.email}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, email: val })}
                    isEditMode={isEditMode}
                  />
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Adres & Saatler</h4>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-blue-400" />
                  <EditableText
                    value={content.contact.address}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, address: val })}
                    isEditMode={isEditMode}
                    multiline
                  />
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 text-blue-400" />
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
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 font-medium text-sm">
            © {new Date().getFullYear()} {content.contact.company_name}. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
};
