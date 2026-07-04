import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Settings, MapPin, Phone, Mail, Clock, Wrench, ChevronRight, Zap } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export const AutorepairDarkTemplate: React.FC<Props> = ({
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
    <div className="min-h-screen bg-[#0a0a12] font-sans text-slate-300 selection:bg-red-500/30">
      {/* Dynamic Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#1e1e35 1px, transparent 1px), linear-gradient(90deg, #1e1e35 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10">
        {/* Topbar */}
        <div className="bg-[#12121f] border-b border-[#1e1e35] py-2 hidden md:block">
          <div className="container mx-auto px-6 flex justify-between items-center text-xs font-bold tracking-widest uppercase text-slate-500">
            <div className="flex gap-6">
              <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-red-500" style={{ color: themeConfig.primary }}/> Pzt-Cts: 08:00 - 19:00</span>
              <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-red-500" style={{ color: themeConfig.primary }}/> Sanayi Sitesi</span>
            </div>
            <div className="flex gap-4">
              <span className="text-red-500" style={{ color: themeConfig.primary }}>7/24 YOL YARDIM: </span>
              <EditableText
                value={content.contact.phone}
                onChange={(val: string) => handleUpdate('contact', { ...content.contact, phone: val })}
                isEditMode={isEditMode}
              />
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className="bg-[#0a0a12]/90 backdrop-blur-xl sticky top-0 z-50 border-b border-[#1e1e35]">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 flex items-center justify-center skew-x-[-15deg]" style={{ backgroundColor: themeConfig.primary }}>
                <Settings className="w-6 h-6 text-white skew-x-[15deg] animate-[spin_4s_linear_infinite]" />
              </div>
              <EditableText
                value={content.contact.company_name || 'Performans Garajı'}
                onChange={(val: string) =>
                  onUpdateContent({
                    ...content,
                    contact: { ...content.contact, company_name: val },
                  })
                }
                isEditMode={isEditMode}
                className="text-2xl font-black text-white uppercase tracking-tighter italic"
              />
            </div>
            <div className="hidden md:flex items-center gap-8 font-bold uppercase text-sm tracking-wider">
              <a href="#about" className="text-slate-400 hover:text-white transition-colors">Hakkımızda</a>
              <a href="#services" className="text-slate-400 hover:text-white transition-colors">Hizmetler</a>
              <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Fiyat Listesi</a>
              <a 
                href="#contact" 
                className="bg-red-500 text-white px-6 py-2 skew-x-[-15deg] hover:bg-red-600 transition-colors"
                style={{ backgroundColor: themeConfig.primary }}
              >
                <span className="block skew-x-[15deg]">Randevu Al</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full z-0 opacity-40 mix-blend-screen mask-image-to-l">
            <EditableImage
              src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1625047509168-a71c6739818e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
              alt="Auto Repair Hero"
              className="w-full h-full object-cover filter grayscale contrast-125"
              onImageChange={(val: string) => handleUpdate('images', { ...content.images, hero_bg: val })}
              isEditMode={isEditMode}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12] via-[#0a0a12]/80 to-transparent"></div>
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-2xl space-y-8">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-red-500 animate-pulse" style={{ color: themeConfig.primary }} />
                <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs" style={{ color: themeConfig.primary }}>
                  <EditableText
                    value={content.hero.badge_text || 'Maksimum Performans'}
                    onChange={(val: string) => handleUpdate('hero', { ...content.hero, badge_text: val })}
                    isEditMode={isEditMode}
                  />
                </span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter italic leading-[0.9]">
                <EditableText
                  value={content.hero.title}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, title: val })}
                  isEditMode={isEditMode}
                  multiline
                />
              </h1>
              <p className="text-xl text-slate-400 font-medium max-w-lg border-l-4 border-red-500 pl-4" style={{ borderColor: themeConfig.primary }}>
                <EditableText
                  value={content.hero.subtitle}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, subtitle: val })}
                  isEditMode={isEditMode}
                  multiline
                />
              </p>
              <div className="pt-8">
                <a href="#contact" className="inline-block bg-white text-[#0a0a12] px-8 py-4 font-black uppercase tracking-widest text-lg hover:bg-red-500 hover:text-white transition-all skew-x-[-10deg]">
                  <span className="block skew-x-[10deg]">
                    <EditableText
                      value={content.hero.cta_text}
                      onChange={(val: string) => handleUpdate('hero', { ...content.hero, cta_text: val })}
                      isEditMode={isEditMode}
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 bg-[#12121f] border-y border-[#1e1e35] relative">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-16 md:flex justify-between items-end">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter italic mb-4">Uzmanlıklar</h2>
                <div className="w-24 h-2 bg-red-500" style={{ backgroundColor: themeConfig.primary }}></div>
              </div>
              <p className="text-slate-400 max-w-md mt-6 md:mt-0 font-medium">
                Modern test cihazları ve deneyimli ustalarımızla aracınızın tüm ihtiyaçlarına profesyonel çözümler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.services.slice(0, 4).map((service: any, index: number) => (
                <div key={index} className="bg-[#0a0a12] border border-[#1e1e35] p-8 hover:border-red-500 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors" style={{ backgroundColor: themeConfig.primary ? `${themeConfig.primary}33` : undefined }}></div>
                  <Wrench className="w-10 h-10 text-red-500 mb-6 group-hover:scale-110 transition-transform" style={{ color: themeConfig.primary }} />
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">
                    <EditableText
                      value={service.title}
                      onChange={(val: string) => updateNested('services', index, 'title', val)}
                      isEditMode={isEditMode}
                    />
                  </h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
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

        {/* Pricing List Table (Dark Futuristic Style) */}
        {content.price_list && content.price_list.length > 0 && (
          <section id="pricing" className="py-24">
            <div className="container mx-auto max-w-4xl px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter italic mb-4">Standart Fiyatlar</h2>
                <div className="w-24 h-2 bg-red-500 mx-auto" style={{ backgroundColor: themeConfig.primary }}></div>
                <p className="text-slate-500 mt-6 font-medium">Şeffaf fiyatlandırma, sürpriz maliyetler yok.</p>
              </div>

              <div className="bg-[#12121f] border border-[#1e1e35] rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1a1a2e] border-b border-[#1e1e35]">
                      <th className="p-6 font-bold uppercase tracking-wider text-white text-sm">Hizmet</th>
                      <th className="p-6 font-bold uppercase tracking-wider text-white text-sm hidden sm:table-cell">Açıklama</th>
                      <th className="p-6 font-bold uppercase tracking-wider text-red-500 text-sm text-right" style={{ color: themeConfig.primary }}>Ücret</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.price_list.map((item: any, index: number) => (
                      <tr key={index} className="border-b border-[#1e1e35] hover:bg-[#1a1a2e] transition-colors">
                        <td className="p-6 font-bold text-white">
                          <EditableText
                            value={item.title}
                            onChange={(val: string) => {
                              const newPrices = [...(content.price_list || [])];
                              newPrices[index].title = val;
                              handleUpdate('price_list', newPrices);
                            }}
                            isEditMode={isEditMode}
                          />
                        </td>
                        <td className="p-6 text-slate-500 text-sm font-medium hidden sm:table-cell">
                          <EditableText
                            value={item.description || 'Standart hizmet paketi.'}
                            onChange={(val: string) => {
                              const newPrices = [...(content.price_list || [])];
                              newPrices[index].description = val;
                              handleUpdate('price_list', newPrices);
                            }}
                            isEditMode={isEditMode}
                          />
                        </td>
                        <td className="p-6 font-black text-xl text-right text-white">
                          <EditableText
                            value={item.price}
                            onChange={(val: string) => {
                              const newPrices = [...(content.price_list || [])];
                              newPrices[index].price = val;
                              handleUpdate('price_list', newPrices);
                            }}
                            isEditMode={isEditMode}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer id="contact" className="bg-[#05050a] pt-24 pb-12 border-t-4 border-red-500" style={{ borderColor: themeConfig.primary }}>
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-red-500 flex items-center justify-center skew-x-[-15deg]" style={{ backgroundColor: themeConfig.primary }}>
                    <Settings className="w-5 h-5 text-white skew-x-[15deg]" />
                  </div>
                  <span className="text-2xl font-black text-white uppercase tracking-tighter italic">
                    <EditableText
                      value={content.contact.company_name || 'Performans Garajı'}
                      onChange={(val: string) => handleUpdate('contact', { ...content.contact, company_name: val })}
                      isEditMode={isEditMode}
                    />
                  </span>
                </div>
                <p className="text-slate-500 font-medium max-w-sm leading-relaxed mb-8">
                  Yüksek performanslı araç bakımı, arıza tespiti ve onarımı.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" style={{ color: themeConfig.primary }} /> İletişim
                </h4>
                <div className="space-y-4 font-black text-xl text-white">
                  <EditableText
                    value={content.contact.phone}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, phone: val })}
                    isEditMode={isEditMode}
                  />
                  <div className="text-sm font-medium text-slate-500">
                    <EditableText
                      value={content.contact.email}
                      onChange={(val: string) => handleUpdate('contact', { ...content.contact, email: val })}
                      isEditMode={isEditMode}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" style={{ color: themeConfig.primary }} /> Garaj
                </h4>
                <div className="space-y-4 text-slate-400 font-medium">
                  <EditableText
                    value={content.contact.address}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, address: val })}
                    isEditMode={isEditMode}
                    multiline
                  />
                  <div className="pt-4 border-t border-[#1e1e35] text-sm flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4 text-red-500" style={{ color: themeConfig.primary }} />
                    <EditableText
                      value={content.contact.hours}
                      onChange={(val: string) => handleUpdate('contact', { ...content.contact, hours: val })}
                      isEditMode={isEditMode}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#1e1e35] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 font-bold uppercase tracking-widest text-xs">
              <div>© {new Date().getFullYear()} {content.contact.company_name}. ALL RIGHTS RESERVED.</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
