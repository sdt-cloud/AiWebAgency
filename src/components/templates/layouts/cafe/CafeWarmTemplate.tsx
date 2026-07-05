'use client';

import React, { useState } from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Globe, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  PlusCircle, 
  Trash2,
  X,
  Menu as MenuIcon,
  Clock,
  Mail
} from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function CafeWarmTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddNavDropdown, setShowAddNavDropdown] = useState(false);
  const [activeFooterModal, setActiveFooterModal] = useState<'hakkimizda' | 'gizlilik' | 'iletisim' | null>(null);

  const defaultNavLinks = [
    { name: 'Hikayemiz', url: '#about' },
    { name: 'Menü', url: '#menu' },
    { name: 'Hizmetler', url: '#services' },
    { name: 'İletişim', url: '#contact' }
  ];
  const navLinks = content.nav_links || defaultNavLinks;

  const menuItems = content.menu_items || [];
  const activeMenuCategory = menuItems[activeCategoryIndex] || menuItems[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3F35] font-sans selection:bg-[#E8DCC4]">
      {/* Custom Header */}
      <header className="absolute top-0 left-0 w-full z-50 py-6 px-8 lg:px-16 flex justify-between items-center mix-blend-difference text-[#FDFBF7]">
        <div className="text-2xl font-serif tracking-widest uppercase">
          <EditableText
            content={content}
            contentKey="contact.company_name"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
          />
        </div>
        <nav className="hidden md:flex gap-10 text-sm font-medium tracking-widest items-center">
          {navLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-1 group/nav relative">
              <a href={link.url} className="hover:opacity-60 transition-opacity shrink-0">
                <EditableText
                  content={content}
                  contentKey={`nav_links.${index}.name`}
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                  className="focus:outline-none focus:ring-0 px-0.5 rounded"
                />
              </a>
              {isEditMode && navLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = navLinks.filter((_, i) => i !== index);
                    onUpdateContent({
                      ...content,
                      nav_links: newLinks
                    });
                  }}
                  className="text-red-500 hover:text-red-700 opacity-0 group-hover/nav:opacity-100 transition-opacity cursor-pointer shrink-0 ml-0.5"
                  title="Sil"
                >
                  <Trash2 size={11} />
                </button>
              )}
            </div>
          ))}

          {isEditMode && navLinks.length < 10 && (
            <div className="relative text-white select-none">
              <button
                type="button"
                onClick={() => setShowAddNavDropdown(!showAddNavDropdown)}
                className="text-indigo-400 hover:text-indigo-300 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1"
              >
                <PlusCircle size={12} />
                Ekle
              </button>
              {showAddNavDropdown && (
                <div className="absolute top-6 right-0 bg-white border border-[#E8DCC4] shadow-xl rounded-lg py-2 w-48 z-50 text-left normal-case tracking-normal text-slate-800">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 mb-1">
                    Bölüm Seçin
                  </div>
                  {[
                    { name: 'Hikayemiz', url: '#about' },
                    { name: 'Menü', url: '#menu' },
                    { name: 'Hizmetler', url: '#services' },
                    { name: 'İletişim', url: '#contact' }
                  ].map((item) => (
                    <button
                      key={item.url}
                      type="button"
                      onClick={() => {
                        const newLinks = [
                          ...navLinks,
                          { name: item.name, url: item.url }
                        ];
                        onUpdateContent({
                          ...content,
                          nav_links: newLinks
                        });
                        setShowAddNavDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage
            content={content}
            contentKey="images.hero_bg"
            onUpdate={onUpdateContent}
            isEditMode={isEditMode}
            className="w-full h-full object-cover"
            alt="Cafe Interior"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <div className="bg-[#FDFBF7]/90 backdrop-blur-md px-12 py-16 rounded-t-[100px] rounded-b-[100px] border border-[#E8DCC4] shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-serif text-[#4A3F35] mb-6 leading-tight">
              <EditableText
                content={content}
                contentKey="hero.title"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </h1>
            <p className="text-base md:text-lg text-[#6B5A4E] mb-10 font-light max-w-xl mx-auto leading-relaxed">
              <EditableText
                content={content}
                contentKey="hero.subtitle"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                multiline
              />
            </p>
            <a 
              href="#menu" 
              className="bg-[#4A3F35] hover:bg-[#6B5A4E] text-[#FDFBF7] px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-colors inline-flex items-center gap-3 cursor-pointer shadow-md hover:shadow-lg"
            >
              <EditableText
                content={content}
                contentKey="hero.cta_text"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section - Organic Shape */}
      <section id="about" className="py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8DCC4]/30 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[200px] overflow-hidden">
               <EditableImage
                  content={content}
                  contentKey="images.about_img"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover"
                  alt="About Cafe"
                />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#D4C3A3] rounded-full flex items-center justify-center p-8 text-center text-sm font-serif italic text-[#4A3F35] shadow-lg">
              "Her yudumda sevgi var."
            </div>
          </div>
          <div className="text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif text-[#4A3F35]">
              <EditableText
                content={content}
                contentKey="about_title"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                placeholder="Hikayemiz"
              />
            </h2>
            <div className="text-lg leading-relaxed text-[#6B5A4E] space-y-6">
              <EditableText
                content={content}
                contentKey="about"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                multiline={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services/Değerlerimiz Section */}
      <section id="services" className="py-24 px-4 bg-[#FDFBF7] border-t border-[#E8DCC4]">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-[#4A3F35]">Değerlerimiz & Farkımız</h2>
            <div className="w-24 h-1 bg-[#D4C3A3] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services?.map((service, serviceIdx) => {
              const renderIcon = (iconName: string) => {
                switch (iconName) {
                  case 'heart': return <Heart size={24} />;
                  case 'shield':
                  case 'shield-check': return <ShieldCheck size={24} />;
                  case 'coffee': return <Coffee size={24} />;
                  default: return <Coffee size={24} />;
                }
              };

              return (
                <div key={serviceIdx} className="bg-white border border-[#E8DCC4]/50 rounded-[40px] p-8 shadow-sm hover:shadow-md transition-all relative group/service text-left space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8DCC4]/40 flex items-center justify-center text-[#4A3F35]">
                    {renderIcon(service.icon)}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#4A3F35]">
                      <EditableText
                        content={content}
                        contentKey={`services.${serviceIdx}.title`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                      />
                    </h3>
                    <div className="text-sm text-[#6B5A4E] leading-relaxed">
                      <EditableText
                        content={content}
                        contentKey={`services.${serviceIdx}.description`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                        multiline
                      />
                    </div>
                  </div>
                  {isEditMode && content.services && content.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newServices = content.services?.filter((_, i) => i !== serviceIdx) || [];
                        onUpdateContent({
                          ...content,
                          services: newServices
                        });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md z-30 transition-all cursor-pointer opacity-0 group-hover/service:opacity-100"
                      title="Bu Özelliği Sil"
                    >
                      <Trash2 size={10} />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Yeni Ekleme Kartı (Maks 5) */}
            {isEditMode && (!content.services || content.services.length < 5) && (
              <div className="flex items-center justify-center border-2 border-dashed border-[#D4C3A3] rounded-[40px] p-8 hover:border-[#4A3F35] transition-all min-h-[200px]">
                <button
                  type="button"
                  onClick={() => {
                    const defaultIcons = ['heart', 'shield-check', 'coffee'];
                    const nextIcon = defaultIcons[(content.services?.length || 0) % defaultIcons.length];
                    const newServices = [
                      ...(content.services || []),
                      { title: 'Yeni Değer', description: 'Değer açıklamasını yazınız.', icon: nextIcon }
                    ];
                    onUpdateContent({
                      ...content,
                      services: newServices
                    });
                  }}
                  className="flex flex-col items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A3F35] hover:text-[#6B5A4E] transition-colors cursor-pointer"
                >
                  <PlusCircle size={28} className="text-[#4A3F35] animate-pulse" />
                  <span>Yeni Değer Ekle</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 bg-[#E8DCC4]/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif text-[#4A3F35] mb-4">Özel Lezzetler</h2>
            <div className="w-24 h-1 bg-[#D4C3A3] mx-auto rounded-full"></div>
          </div>

          {/* Menü Kategorileri Tab Bar */}
          {menuItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 items-center mb-12">
              {menuItems.map((cat, idx) => {
                const isActive = idx === activeCategoryIndex;
                return (
                  <div key={idx} className="flex items-center gap-1 group/cat relative">
                    <button
                      type="button"
                      onClick={() => setActiveCategoryIndex(idx)}
                      className={`px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all border cursor-pointer ${
                        isActive 
                          ? 'bg-[#4A3F35] border-[#4A3F35] text-white shadow-md' 
                          : 'bg-white border-[#D4C3A3] text-[#4A3F35] hover:border-[#4A3F35] hover:text-[#4A3F35]'
                      }`}
                    >
                      <EditableText
                        content={content}
                        contentKey={`menu_items.${idx}.category`}
                        onUpdate={onUpdateContent}
                        isEditMode={isEditMode}
                        className="focus:outline-none focus:ring-0"
                      />
                    </button>

                    {/* Kategori Silme Butonu */}
                    {isEditMode && menuItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newMenuItems = menuItems.filter((_, i) => i !== idx);
                          onUpdateContent({
                            ...content,
                            menu_items: newMenuItems
                          });
                          setActiveCategoryIndex(0);
                        }}
                        className="text-red-500 hover:text-red-700 cursor-pointer p-1 shrink-0"
                        title="Kategoriyi Sil"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Kategori Ekleme Butonu (Maks 6) */}
              {isEditMode && menuItems.length < 6 && (
                <button
                  type="button"
                  onClick={() => {
                    const newMenuItems = [
                      ...menuItems,
                      {
                        category: 'YENİ KATEGORİ',
                        items: [
                          { name: 'Yeni Ürün', description: 'Ürün açıklaması', price: '₺100' }
                        ]
                      }
                    ];
                    onUpdateContent({
                      ...content,
                      menu_items: newMenuItems
                    });
                    setActiveCategoryIndex(newMenuItems.length - 1);
                  }}
                  className="flex items-center gap-1 px-4 py-2 border-2 border-dashed border-[#D4C3A3] rounded-full text-xs font-bold uppercase tracking-wider text-[#4A3F35] hover:text-[#4A3F35] transition-colors cursor-pointer"
                >
                  <PlusCircle size={12} />
                  Kategori Ekle
                </button>
              )}
            </div>
          )}

          {/* Menü Listesi */}
          {activeMenuCategory && activeMenuCategory.items && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 text-left">
                {activeMenuCategory.items.map((item, itemIdx) => {
                  const itemPath = `menu_items.${activeCategoryIndex}.items.${itemIdx}`;
                  
                  return (
                    <div key={itemIdx} className="group pb-4 border-b border-[#D4C3A3]/40 flex flex-col space-y-1 relative pr-6">
                      {/* Ürün Silme Butonu */}
                      {isEditMode && activeMenuCategory.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedItems = activeMenuCategory.items.filter((_, i) => i !== itemIdx);
                            const updatedMenuItems = menuItems.map((cat, i) => {
                              if (i === activeCategoryIndex) {
                                return { ...cat, items: updatedItems };
                              }
                              return cat;
                            });
                            onUpdateContent({
                              ...content,
                              menu_items: updatedMenuItems
                            });
                          }}
                          className="absolute right-0 top-1 text-red-500 hover:text-red-700 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Bu Ürünü Sil"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}

                      <div className="flex justify-between items-baseline">
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.name`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-serif text-xl text-[#4A3F35] group-hover:text-[#D2691E] transition-colors focus:outline-none focus:ring-0 px-0.5 rounded block"
                        />
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.price`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="font-medium text-lg text-[#6B5A4E] focus:outline-none focus:ring-0 px-0.5 rounded shrink-0 ml-4"
                        />
                      </div>
                      {item.description !== undefined && (
                        <EditableText
                          content={content}
                          contentKey={`${itemPath}.description`}
                          onUpdate={onUpdateContent}
                          isEditMode={isEditMode}
                          className="text-sm text-[#8B7A6E] block focus:outline-none focus:ring-0 px-0.5 rounded"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Ürün Ekleme Butonu */}
              {isEditMode && (
                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      const updatedItems = [
                        ...activeMenuCategory.items,
                        { name: 'Yeni Ürün/İçecek', description: 'Ürün açıklaması buraya yazılır.', price: '₺100' }
                      ];
                      const updatedMenuItems = menuItems.map((cat, i) => {
                        if (i === activeCategoryIndex) {
                          return { ...cat, items: updatedItems };
                        }
                        return cat;
                      });
                      onUpdateContent({
                        ...content,
                        menu_items: updatedMenuItems
                      });
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-[#4A3F35] hover:bg-[#6B5A4E] text-[#FDFBF7] font-bold text-xs tracking-widest uppercase rounded-full transition-all cursor-pointer shadow-md"
                  >
                    <PlusCircle size={14} />
                    Bu Kategoriye Ürün Ekle
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Custom Footer */}
      <footer id="contact" className="bg-[#4A3F35] text-[#FDFBF7] py-20 px-4 rounded-t-[50px] md:rounded-t-[100px] mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          <div className="space-y-6">
            <div className="text-3xl font-serif tracking-widest uppercase">
              <EditableText
                content={content}
                contentKey="contact.company_name"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
              />
            </div>
            <p className="text-[#D4C3A3] font-light max-w-sm mx-auto md:mx-0">
              Sıcak bir kahve, tatlı bir sohbet. Sizi ağırlamaktan mutluluk duyarız.
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-[#D4C3A3]">
              <a href="#" className="hover:text-white transition-colors"><Globe size={24} /></a>
              <a href="#" className="hover:text-white transition-colors"><Globe size={24} /></a>
            </div>
            <div className="flex flex-col gap-2 pt-4 text-xs text-[#D4C3A3] items-center md:items-start text-left">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveFooterModal('hakkimizda'); }}
                className="hover:text-white transition-colors"
              >
                Hakkımızda
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveFooterModal('gizlilik'); }}
                className="hover:text-white transition-colors"
              >
                Gizlilik Politikası
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveFooterModal('iletisim'); }}
                className="hover:text-white transition-colors"
              >
                İletişim & Konum
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xl font-serif text-[#D4C3A3] mb-6">İletişim</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-[#D4C3A3] shrink-0" />
                <EditableText
                  content={content}
                  contentKey="contact.address"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                />
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="text-[#D4C3A3] shrink-0" />
                <EditableText
                  content={content}
                  contentKey="contact.phone"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                />
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="text-[#D4C3A3] shrink-0" />
                <EditableText
                  content={content}
                  contentKey="contact.email"
                  onUpdate={onUpdateContent}
                  isEditMode={isEditMode}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-serif text-[#D4C3A3] mb-6">Çalışma Saatleri</h4>
            <div className="space-y-2 text-[#D4C3A3]">
              <EditableText
                content={content}
                contentKey="contact.hours"
                onUpdate={onUpdateContent}
                isEditMode={isEditMode}
                multiline
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Modalı (Tüm sitelerde aynı genel metinler) */}
      {activeFooterModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] text-[#4A3F35] rounded-3xl max-w-lg w-full p-6 md:p-8 border border-[#E8DCC4] shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative font-sans text-left">
            <button
              type="button"
              onClick={() => setActiveFooterModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {activeFooterModal === 'hakkimizda' && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold border-b pb-2 text-[#4A3F35] uppercase tracking-wide">{content.contact?.company_name || 'Kafemiz'} &bull; Hakkımızda</h3>
                <div className="space-y-3 text-sm text-[#6B5A4E] leading-relaxed">
                  <p>
                    Kafemiz, nitelikli artisan kahve kültürünü, en taze yerel malzemelerle el yapımı olarak hazırlanan fırın lezzetleriyle buluşturarak mahallenin en sıcak köşesi olma amacıyla yola çıkmıştır. Güler yüzlü ekibimiz ve taze pişen günlük keklerimizle sıcak bir mola noktası sunuyoruz.
                  </p>
                  <p>
                    Güne başlarken kokusuyla sizi saran taze kruvasanlarımız, fırından yeni çıkmış frostingli havuçlu kekimiz ve şeflerimizin özenle hazırladığı ekşi mayalı özel tostlarımızla günün her anında sizinleyiz.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'gizlilik' && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold border-b pb-2 text-[#4A3F35] uppercase tracking-wide">Gizlilik Politikası</h3>
                <div className="text-xs text-[#8B7A6E] leading-relaxed space-y-3 overflow-y-auto max-h-[60vh] pr-2">
                  <p className="font-semibold text-[#4A3F35]">1. Veri Sorumlusu ve Amacı</p>
                  <p>
                    Bu web sitesi üzerinden bizimle paylaştığınız kişisel verileriniz (isim, e-posta, telefon gibi iletişim bilgileri), yalnızca rezervasyon taleplerinizi almak, hizmetlerimizle ilgili bilgilendirme yapmak ve iletişim formları üzerinden taleplerinize yanıt vermek amacıyla işlenir.
                  </p>
                  <p className="font-semibold text-[#4A3F35]">2. Verilerin Saklanması ve Paylaşımı</p>
                  <p>
                    Kişisel verileriniz, yasal süreler ve işleme amaçlarının gerektirdiği süre boyunca güvenli yerel sunucularda saklanır. Verileriniz, yasal zorunluluklar hariç olmak üzere, üçüncü şahıslarla asla paylaşılmaz, satılmaz veya ticari amaçla kullanılmaz.
                  </p>
                  <p className="font-semibold text-[#4A3F35]">3. Çerezler (Cookies)</p>
                  <p>
                    Web sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek için çerezleri kullanabilir. Tarayıcı ayarlarınızdan çerezleri dilediğiniz gibi engelleyebilir veya silebilirsiniz.
                  </p>
                  <p className="font-semibold text-[#4A3F35]">4. Haklarınız</p>
                  <p>
                    Kişisel verilerinizin silinmesini, güncellenmesini veya işlenip işlenmediğini öğrenmeyi dilediğiniz zaman talep edebilirsiniz. Bilgi talepleri için lütfen iletişim kanallarımız üzerinden bizimle irtibata geçin.
                  </p>
                </div>
              </div>
            )}

            {activeFooterModal === 'iletisim' && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold border-b pb-2 text-[#4A3F35] uppercase tracking-wide">İletişim Bilgileri</h3>
                <div className="space-y-3 text-sm text-[#6B5A4E]">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#D4C3A3] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#4A3F35]">Adresimiz</p>
                      <p>{content.contact?.address || 'Kafemiz Adresi'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={16} className="text-[#D4C3A3] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#4A3F35]">Telefon</p>
                      <p>{content.contact?.phone || '0212 000 00 00'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={16} className="text-[#D4C3A3] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#4A3F35]">E-posta</p>
                      <p>{content.contact?.email || 'info@kafemiz.com'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-[#D4C3A3] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#4A3F35]">Çalışma Saatleri</p>
                      <p className="whitespace-pre-line">{content.contact?.hours || 'Her Gün Açık'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6 border-t pt-4">
              <button
                type="button"
                onClick={() => setActiveFooterModal(null)}
                className="px-5 py-2 bg-[#4A3F35] text-white hover:bg-[#6B5A4E] text-xs font-semibold tracking-wider uppercase rounded-full cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
