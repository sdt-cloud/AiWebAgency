import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { ShieldCheck, MapPin, Phone, Mail, Clock, CheckCircle2, ChevronRight, Settings } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export const AutoserviceProTemplate: React.FC<Props> = ({
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
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-3 text-sm font-medium">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" style={{ color: themeConfig.secondary || themeConfig.primary }} />
              <EditableText
                value={content.contact.hours}
                onChange={(val: string) => handleUpdate('contact', { ...content.contact, hours: val })}
                isEditMode={isEditMode}
              />
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" style={{ color: themeConfig.secondary || themeConfig.primary }} />
              <EditableText
                value={content.contact.phone}
                onChange={(val: string) => handleUpdate('contact', { ...content.contact, phone: val })}
                isEditMode={isEditMode}
              />
            </span>
            <a href="#contact" className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-blue-700 transition-colors" style={{ backgroundColor: themeConfig.primary }}>
              ONLİNE RANDEVU
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 max-w-7xl h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600" style={{ color: themeConfig.primary, backgroundColor: `${themeConfig.primary}15` }}>
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <EditableText
                value={content.contact.company_name || 'Pro Özel Servis'}
                onChange={(val: string) =>
                  onUpdateContent({
                    ...content,
                    contact: { ...content.contact, company_name: val },
                  })
                }
                isEditMode={isEditMode}
                className="text-xl font-bold text-slate-900 tracking-tight leading-tight"
              />
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Kurumsal Araç Bakım</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Hakkımızda</a>
            <a href="#process" className="hover:text-blue-600 transition-colors">İşleyiş</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">Hizmetler</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50 transform -skew-x-12 origin-top"></div>
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center min-h-[600px] py-16 gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm" style={{ color: themeConfig.primary, backgroundColor: `${themeConfig.primary}15` }}>
                <CheckCircle2 className="w-4 h-4" />
                <EditableText
                  value={content.hero.badge_text || 'Garantili Servis Hizmeti'}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, badge_text: val })}
                  isEditMode={isEditMode}
                />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight">
                <EditableText
                  value={content.hero.title}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, title: val })}
                  isEditMode={isEditMode}
                  multiline
                />
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg font-medium">
                <EditableText
                  value={content.hero.subtitle}
                  onChange={(val: string) => handleUpdate('hero', { ...content.hero, subtitle: val })}
                  isEditMode={isEditMode}
                  multiline
                />
              </p>
              <div className="pt-4 flex items-center gap-6">
                <a href="#contact" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20" style={{ backgroundColor: themeConfig.primary }}>
                  <EditableText
                    value={content.hero.cta_text}
                    onChange={(val: string) => handleUpdate('hero', { ...content.hero, cta_text: val })}
                    isEditMode={isEditMode}
                  />
                </a>
                <div className="flex items-center gap-2 text-slate-600 font-bold">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <EditableText
                    value={content.contact.phone}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, phone: val })}
                    isEditMode={isEditMode}
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <EditableImage
                  src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                  alt="Auto Service Center"
                  className="w-full h-[500px] object-cover"
                  onImageChange={(val: string) => handleUpdate('images', { ...content.images, hero_bg: val })}
                  isEditMode={isEditMode}
                />
                <div className="absolute bottom-6 right-6 bg-white p-6 rounded-xl shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">%100 Güven</div>
                    <div className="text-sm text-slate-500 font-medium">Orijinal Yedek Parça</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infographic Process / Timeline */}
      <section id="process" className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Nasıl Çalışıyoruz?</h2>
            <p className="text-slate-600 font-medium">Aracınızı servisimize bıraktığınız andan teslim alana kadar her adımda şeffaf ve profesyonel bir süreç izliyoruz.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {['Kabul & Check-up', 'Teşhis & Fiyatlandırma', 'Onarım & Bakım', 'Son Kontrol & Teslimat'].map((step, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group">
                  <div className="w-10 h-10 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center absolute -top-5 left-8 shadow-md" style={{ backgroundColor: themeConfig.primary }}>
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 mt-4">{step}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    {index === 0 && 'Aracınız uzman ekibimiz tarafından teslim alınır ve 101 nokta ekspertizinden geçirilir.'}
                    {index === 1 && 'Gerekli onarımlar tespit edilir, size detaylı rapor ve şeffaf fiyatlandırma sunulur.'}
                    {index === 2 && 'Onayınızla birlikte, orijinal veya garantili muadil parçalarla onarım işlemine başlanır.'}
                    {index === 3 && 'Tüm sistemler test edilir, aracınız temizlenerek size güvenle teslim edilir.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-white border-y border-slate-200">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Kapsamlı Servis Hizmetleri</h2>
              <p className="text-slate-600 font-medium">Periyodik bakımdan ağır hasar onarımına kadar, aracınızın tüm ihtiyaçları tek noktada çözülür.</p>
            </div>
            <a href="#contact" className="text-blue-600 font-bold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: themeConfig.primary }}>
              Tüm Hizmetleri Gör <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => (
              <div key={index} className="flex gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600" style={{ color: themeConfig.primary }}>
                  <Settings className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    <EditableText
                      value={service.title}
                      onChange={(val: string) => updateNested('services', index, 'title', val)}
                      isEditMode={isEditMode}
                    />
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm">
                    <EditableText
                      value={service.description}
                      onChange={(val: string) => updateNested('services', index, 'description', val)}
                      isEditMode={isEditMode}
                      multiline
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Trust */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="bg-white rounded-3xl p-8 lg:p-16 shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Kurumsal ve Güvenilir Yaklaşım</h2>
              <div className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                <EditableText
                  value={content.about}
                  onChange={(val: string) => handleUpdate('about', val)}
                  isEditMode={isEditMode}
                  multiline
                />
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <li className="flex items-center gap-3 font-bold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" style={{ color: themeConfig.primary }} /> Alanında Uzman Ekip
                </li>
                <li className="flex items-center gap-3 font-bold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" style={{ color: themeConfig.primary }} /> Modern Diyagnostik
                </li>
                <li className="flex items-center gap-3 font-bold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" style={{ color: themeConfig.primary }} /> 1 Yıl İşçilik Garantisi
                </li>
                <li className="flex items-center gap-3 font-bold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" style={{ color: themeConfig.primary }} /> Şeffaf Fiyatlandırma
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <EditableImage
                src={content.images?.about_img || 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                alt="Pro Service Team"
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                onImageChange={(val: string) => handleUpdate('images', { ...content.images, about_img: val })}
                isEditMode={isEditMode}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 pt-20 pb-10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-blue-400" style={{ color: themeConfig.secondary || themeConfig.primary }} />
                <span className="text-2xl font-bold text-white tracking-tight">
                  <EditableText
                    value={content.contact.company_name || 'Pro Özel Servis'}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, company_name: val })}
                    isEditMode={isEditMode}
                  />
                </span>
              </div>
              <p className="text-slate-400 font-medium max-w-md leading-relaxed">
                Tüm marka ve model araçlarınız için kurumsal standartlarda, güvenilir ve garantili bakım onarım hizmetleri sunuyoruz.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">İletişim</h4>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-500" />
                  <EditableText
                    value={content.contact.phone}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, phone: val })}
                    isEditMode={isEditMode}
                  />
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-500" />
                  <EditableText
                    value={content.contact.email}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, email: val })}
                    isEditMode={isEditMode}
                  />
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Servis Merkezi</h4>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
                  <EditableText
                    value={content.contact.address}
                    onChange={(val: string) => handleUpdate('contact', { ...content.contact, address: val })}
                    isEditMode={isEditMode}
                    multiline
                  />
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
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
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 font-medium text-sm">
            <div>© {new Date().getFullYear()} {content.contact.company_name}. Tüm hakları saklıdır.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
