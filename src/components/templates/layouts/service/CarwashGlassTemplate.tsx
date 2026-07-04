import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Droplets, CheckCircle2, Star, MapPin, Phone, Mail, Clock, Shield } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export const CarwashGlassTemplate: React.FC<Props> = ({
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
    <div className="min-h-screen bg-slate-900 font-sans text-white relative">
      {/* Global Background Image for Glassmorphism Context */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-slate-900/90 to-black/80 z-10" />
        <img 
          src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
          alt="VIP Auto Spa Background"
          className="w-full h-full object-cover filter blur-sm scale-105"
        />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400" style={{ color: themeConfig.primary }} />
              <EditableText
                value={content.contact.company_name || 'VIP Auto Spa'}
                onChange={(val: string) =>
                  onUpdateContent({
                    ...content,
                    contact: { ...content.contact, company_name: val },
                  })
                }
                isEditMode={isEditMode}
                className="text-2xl font-black tracking-widest text-white uppercase"
              />
            </div>
            <div className="hidden md:flex items-center gap-8 font-medium text-white/80 uppercase text-sm tracking-wider">
              <a href="#about" className="hover:text-white transition-colors">Hakkımızda</a>
              <a href="#services" className="hover:text-white transition-colors">Hizmetler</a>
              <a href="#pricing" className="hover:text-white transition-colors">Paketler</a>
              <a 
                href="#contact" 
                className="border border-white/20 bg-white/5 hover:bg-white/20 backdrop-blur-md px-6 py-2 rounded-none transition-all"
              >
                Randevu Al
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-2/3 space-y-8">
                <div className="inline-block bg-white/10 border border-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
                  <EditableText
                    value={content.hero.badge_text || 'Premium Detailing'}
                    onChange={(val: string) => handleUpdate('hero', { ...content.hero, badge_text: val })}
                    isEditMode={isEditMode}
                  />
                </div>
                <h1 className="text-5xl lg:text-7xl font-light text-white leading-tight tracking-wide">
                  <EditableText
                    value={content.hero.title}
                    onChange={(val: string) => handleUpdate('hero', { ...content.hero, title: val })}
                    isEditMode={isEditMode}
                    multiline
                  />
                </h1>
                <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl">
                  <EditableText
                    value={content.hero.subtitle}
                    onChange={(val: string) => handleUpdate('hero', { ...content.hero, subtitle: val })}
                    isEditMode={isEditMode}
                    multiline
                  />
                </p>
                <div className="pt-8">
                  <a href="#pricing" className="inline-block border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-10 py-4 font-bold tracking-widest uppercase transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
                    <EditableText
                      value={content.hero.cta_text}
                      onChange={(val: string) => handleUpdate('hero', { ...content.hero, cta_text: val })}
                      isEditMode={isEditMode}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 border-t border-white/5">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light tracking-widest uppercase text-white mb-4">Hizmetlerimiz</h2>
              <div className="w-16 h-px bg-white/30 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.services.slice(0, 3).map((service: any, index: number) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 hover:bg-white/10 transition-all group">
                  <div className="w-14 h-14 border border-white/20 bg-white/5 flex items-center justify-center mb-8 text-white/80 group-hover:text-white transition-colors">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-wider uppercase mb-4 text-white">
                    <EditableText
                      value={service.title}
                      onChange={(val: string) => updateNested('services', index, 'title', val)}
                      isEditMode={isEditMode}
                    />
                  </h3>
                  <p className="text-white/50 font-light leading-relaxed">
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
          <section id="pricing" className="py-24 border-t border-white/5 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="container mx-auto max-w-6xl px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light tracking-widest uppercase text-white mb-4">Detaylı Paketler</h2>
                <div className="w-16 h-px bg-white/30 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {content.price_list.slice(0, 3).map((pkg, index) => (
                  <div 
                    key={index} 
                    className={`bg-black/40 backdrop-blur-2xl p-10 relative overflow-hidden flex flex-col ${pkg.is_popular ? 'border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-105' : 'border border-white/10'}`}
                  >
                    {pkg.is_popular && (
                      <div className="absolute top-0 right-0 bg-cyan-500/20 border-b border-l border-cyan-500/50 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] py-1.5 px-4 backdrop-blur-md">
                        En İyisi
                      </div>
                    )}
                    <h3 className="text-2xl font-light tracking-widest uppercase mb-4 text-white">
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
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-bold tracking-tight text-white">
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
                    <div className="text-white/60 font-light mb-8 pb-8 border-b border-white/10 flex-grow">
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
                    <ul className="space-y-4 mb-10">
                      <li className="flex items-center gap-4 text-white/80 font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Dış Yıkama & Cila
                      </li>
                      <li className="flex items-center gap-4 text-white/80 font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> İç Detaylı Temizlik
                      </li>
                      <li className="flex items-center gap-4 text-white/80 font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Motor Temizliği
                      </li>
                      {pkg.is_popular && (
                        <li className="flex items-center gap-4 text-white/80 font-light">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Seramik Kaplama Öncesi Hazırlık
                        </li>
                      )}
                    </ul>
                    <button className={`w-full py-4 uppercase tracking-[0.2em] font-bold text-xs transition-all ${pkg.is_popular ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30' : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10'}`}>
                      Seç
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About & Gallery */}
        <section id="about" className="py-24 border-t border-white/5">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-light tracking-widest uppercase text-white mb-8">Ustalık ve Tutku</h2>
                <div className="text-lg text-white/60 font-light leading-relaxed mb-8">
                  <EditableText
                    value={content.about}
                    onChange={(val: string) => handleUpdate('about', val)}
                    isEditMode={isEditMode}
                    multiline
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                      <div className="text-3xl font-light text-cyan-400 mb-2">10+</div>
                      <div className="text-xs uppercase tracking-widest text-white/50">Yıllık Tecrübe</div>
                   </div>
                   <div className="border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                      <div className="text-3xl font-light text-cyan-400 mb-2">5k+</div>
                      <div className="text-xs uppercase tracking-widest text-white/50">Mutlu Müşteri</div>
                   </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
                 <EditableImage
                    src={content.images?.gallery?.[0] || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                    alt="Detailing 1"
                    className="w-full h-[300px] object-cover border border-white/10"
                    onImageChange={(val: string) => {
                      const gal = [...(content.images?.gallery || [])];
                      gal[0] = val;
                      handleUpdate('images', { ...content.images, gallery: gal });
                    }}
                    isEditMode={isEditMode}
                 />
                 <EditableImage
                    src={content.images?.gallery?.[1] || 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                    alt="Detailing 2"
                    className="w-full h-[300px] object-cover border border-white/10 mt-12"
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

        {/* Footer */}
        <footer id="contact" className="border-t border-white/10 bg-black/60 backdrop-blur-2xl pt-20 pb-10">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-cyan-400" />
                  <span className="text-2xl font-black tracking-widest uppercase">
                    <EditableText
                      value={content.contact.company_name || 'VIP Auto Spa'}
                      onChange={(val: string) => handleUpdate('contact', { ...content.contact, company_name: val })}
                      isEditMode={isEditMode}
                    />
                  </span>
                </div>
                <p className="text-white/50 font-light max-w-md leading-relaxed">
                  Araçlarınıza hak ettiği özeni gösteriyor, profesyonel detaylandırma hizmetleri sunuyoruz.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm uppercase tracking-widest text-white/30 mb-6">İletişim</h4>
                <ul className="space-y-4 text-white/70 font-light">
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-1 text-cyan-400" />
                    <EditableText
                      value={content.contact.phone}
                      onChange={(val: string) => handleUpdate('contact', { ...content.contact, phone: val })}
                      isEditMode={isEditMode}
                    />
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-1 text-cyan-400" />
                    <EditableText
                      value={content.contact.email}
                      onChange={(val: string) => handleUpdate('contact', { ...content.contact, email: val })}
                      isEditMode={isEditMode}
                    />
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-widest text-white/30 mb-6">Lokasyon</h4>
                <ul className="space-y-4 text-white/70 font-light">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-1 text-cyan-400" />
                    <EditableText
                      value={content.contact.address}
                      onChange={(val: string) => handleUpdate('contact', { ...content.contact, address: val })}
                      isEditMode={isEditMode}
                      multiline
                    />
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-1 text-cyan-400" />
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
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 font-light text-xs uppercase tracking-widest">
              <div>© {new Date().getFullYear()} {content.contact.company_name}. ALL RIGHTS RESERVED.</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
