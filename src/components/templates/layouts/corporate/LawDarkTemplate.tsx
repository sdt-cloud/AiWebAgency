import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';
import { Scale, ChevronRight } from 'lucide-react';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function LawDarkTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const updateHero = (key: keyof typeof content.hero, value: string) => {
    onUpdateContent({ ...content, hero: { ...content.hero, [key]: value } });
  };
  const updateAbout = (value: string) => onUpdateContent({ ...content, about: value });
  
  const serifFont = themeConfig.fontFamilyHeading || "'Playfair Display', serif";
  const sansFont = themeConfig.fontFamily || "'Inter', sans-serif";
  const goldAccent = themeConfig.accent || "#C5A059";

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300 selection:bg-[#C5A059] selection:text-white" style={{ fontFamily: sansFont }}>
      <nav className="fixed w-full z-50 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {content.images?.logo && (
              <EditableImage
                src={content.images.logo}
                alt="Logo"
                isEditMode={isEditMode}
                onImageUpdate={(url) => onUpdateContent({ ...content, images: { ...content.images, logo: url } })}
                className="h-10 w-auto"
              />
            )}
            <h1 style={{ fontFamily: serifFont, color: goldAccent }} className="text-2xl font-bold tracking-widest uppercase">
              {content.contact.company_name || 'HUKUK BÜROSU'}
            </h1>
          </div>
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-slate-400">
            <a href="#about" className="hover:text-[#C5A059] transition-colors">Kurumsal</a>
            <a href="#services" className="hover:text-[#C5A059] transition-colors">Uzmanlıklar</a>
            <a href="#team" className="hover:text-[#C5A059] transition-colors">Ekibimiz</a>
            <a href="#contact" className="hover:text-[#C5A059] transition-colors">İletişim</a>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={content.images?.hero_bg || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80'}
            alt="Hero Background"
            isEditMode={isEditMode}
            onImageUpdate={(url) => onUpdateContent({ ...content, images: { ...content.images, hero_bg: url } })}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            {content.hero.badge_text && (
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-[#C5A059]"></div>
                <EditableText
                  text={content.hero.badge_text}
                  isEditMode={isEditMode}
                  onChange={(val: string) => updateHero('badge_text', val)}
                  className="text-[#C5A059] tracking-[0.2em] text-sm uppercase"
                />
              </div>
            )}
            
            <EditableText
              text={content.hero.title}
              isEditMode={isEditMode}
              onChange={(val: string) => updateHero('title', val)}
              className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8"
              style={{ fontFamily: serifFont }}
            />
            
            <EditableText
              text={content.hero.subtitle}
              isEditMode={isEditMode}
              onChange={(val: string) => updateHero('subtitle', val)}
              className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl"
            />
            
            <button className="group relative px-8 py-4 bg-transparent border border-[#C5A059] text-[#C5A059] overflow-hidden transition-all hover:text-white">
              <div className="absolute inset-0 bg-[#C5A059] translate-y-full transition-transform group-hover:translate-y-0"></div>
              <span className="relative flex items-center gap-3 tracking-widest text-sm uppercase">
                {content.hero.cta_text}
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 border-y border-white/5 bg-[#0d0d12]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 style={{ fontFamily: serifFont }} className="text-4xl text-white mb-4">Uzmanlık Alanlarımız</h2>
            <div className="w-16 h-px bg-[#C5A059] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => (
              <div key={index} className="p-8 border border-white/5 bg-[#0a0a0c] hover:border-[#C5A059]/30 transition-colors group">
                <Scale className="w-10 h-10 text-[#C5A059] mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                <EditableText
                  text={service.title}
                  isEditMode={isEditMode}
                  onChange={(val: string) => {
                    const newServices = [...content.services];
                    newServices[index].title = val;
                    onUpdateContent({ ...content, services: newServices });
                  }}
                  className="text-xl text-white mb-4"
                  style={{ fontFamily: serifFont }}
                />
                <EditableText
                  text={service.description}
                  isEditMode={isEditMode}
                  onChange={(val: string) => {
                    const newServices = [...content.services];
                    newServices[index].description = val;
                    onUpdateContent({ ...content, services: newServices });
                  }}
                  className="text-slate-400 text-sm leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.team_members && content.team_members.length > 0 && (
        <section id="team" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h2 style={{ fontFamily: serifFont }} className="text-4xl text-white mb-4">Hukuk Ekibimiz</h2>
                <div className="w-16 h-px bg-[#C5A059]"></div>
              </div>
              <p className="text-slate-500 max-w-md text-right mt-6 md:mt-0">Deneyimli ve alanında uzman avukatlarımızla yanınızdayız.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.team_members.map((member: any, index: number) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[3/4] mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                    <EditableImage
                      src={member.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'}
                      alt={member.name}
                      isEditMode={isEditMode}
                      onImageUpdate={(url) => {
                        const newTeam = [...(content.team_members || [])];
                        newTeam[index].image = url;
                        onUpdateContent({ ...content, team_members: newTeam });
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80"></div>
                  </div>
                  <EditableText
                    text={member.name}
                    isEditMode={isEditMode}
                    onChange={(val: string) => {
                      const newTeam = [...(content.team_members || [])];
                      newTeam[index].name = val;
                      onUpdateContent({ ...content, team_members: newTeam });
                    }}
                    className="text-xl text-white mb-1"
                    style={{ fontFamily: serifFont }}
                  />
                  <EditableText
                    text={member.role}
                    isEditMode={isEditMode}
                    onChange={(val: string) => {
                      const newTeam = [...(content.team_members || [])];
                      newTeam[index].role = val;
                      onUpdateContent({ ...content, team_members: newTeam });
                    }}
                    className="text-[#C5A059] text-sm uppercase tracking-wider"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer id="contact" className="py-20 bg-[#060608] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 style={{ fontFamily: serifFont, color: goldAccent }} className="text-xl mb-6">
              {content.contact.company_name}
            </h3>
            <EditableText
              text={content.about}
              isEditMode={isEditMode}
              onChange={updateAbout}
              className="text-slate-500 text-sm leading-relaxed"
            />
          </div>
          <div>
            <h4 className="text-white mb-6 uppercase tracking-widest text-sm">İletişim</h4>
            <div className="space-y-4 text-slate-400 text-sm">
              <p>T: {content.contact.phone}</p>
              <p>E: {content.contact.email}</p>
            </div>
          </div>
          <div>
            <h4 className="text-white mb-6 uppercase tracking-widest text-sm">Adres</h4>
            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
              {content.contact.address}
            </p>
          </div>
          <div>
            <h4 className="text-white mb-6 uppercase tracking-widest text-sm">Çalışma Saatleri</h4>
            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
              {content.contact.hours}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
