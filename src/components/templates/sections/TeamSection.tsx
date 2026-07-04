'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import EditableImage from '../EditableImage';

export default function TeamSection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  const handleTeamUpdate = (index: number, field: 'name' | 'role' | 'description') => (newValue: string) => {
    if (!content.team_members) return;
    const newTeam = [...content.team_members];
    newTeam[index] = { ...newTeam[index], [field]: newValue };
    onUpdateContent({ ...content, team_members: newTeam });
  };

  const handleImageUpdate = (index: number) => (newUrl: string) => {
    if (!content.team_members) return;
    const newTeam = [...content.team_members];
    newTeam[index] = { ...newTeam[index], image: newUrl };
    onUpdateContent({ ...content, team_members: newTeam });
  };

  const defaultImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80";
  
  const teamMembers = content.team_members && content.team_members.length > 0 ? content.team_members : [
    { name: 'Dr. Ahmet Yılmaz', role: 'Uzman', description: 'Alanında 15 yıllık tecrübe.', image: defaultImage },
    { name: 'Ayşe Kaya', role: 'Uzman Yardımcısı', description: 'Ekibimizin dinamik üyesi.', image: defaultImage },
    { name: 'Mehmet Demir', role: 'Danışman', description: 'Müşteri memnuniyeti odaklı.', image: defaultImage }
  ];

  // Neo-Minimalist (Temiz kartlar)
  if (layoutStyle === 'neo-minimalist') {
    return (
      <section className={`py-24 bg-white ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Uzman Ekibimiz</h2>
            <p className="text-lg text-slate-600">Size en iyi hizmeti sunmak için buradayız.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-500">
                  <EditableImage
                    src={member.image || defaultImage}
                    alt={member.name}
                    onSave={handleImageUpdate(idx)}
                    isEditMode={isEditMode}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  <EditableText value={member.name} onSave={handleTeamUpdate(idx, 'name')} isEditMode={isEditMode} multiline={false} />
                </h3>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: themeConfig.primary }}>
                  <EditableText value={member.role} onSave={handleTeamUpdate(idx, 'role')} isEditMode={isEditMode} multiline={false} />
                </h4>
                {member.description && (
                  <p className="text-slate-600">
                    <EditableText value={member.description} onSave={handleTeamUpdate(idx, 'description')} isEditMode={isEditMode} />
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Editorial & Retro-Modern (Portre stili)
  if (layoutStyle === 'editorial-retro') {
    return (
      <section className={`py-24 bg-[#faf7f2] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2d2418] mb-16 text-center italic">Yüzlerimiz</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white border border-[#e8e0d4] p-6 shadow-sm">
                <div className="aspect-[3/4] mb-6 overflow-hidden filter sepia-[0.2]">
                  <EditableImage
                    src={member.image || defaultImage}
                    alt={member.name}
                    onSave={handleImageUpdate(idx)}
                    isEditMode={isEditMode}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif text-[#2d2418] mb-1">
                  <EditableText value={member.name} onSave={handleTeamUpdate(idx, 'name')} isEditMode={isEditMode} multiline={false} />
                </h3>
                <div className="h-px w-12 bg-[#d4c5b0] mb-3"></div>
                <h4 className="text-[#a09080] font-serif italic mb-4">
                  <EditableText value={member.role} onSave={handleTeamUpdate(idx, 'role')} isEditMode={isEditMode} multiline={false} />
                </h4>
                {member.description && (
                  <p className="text-[#5c4f3d] text-sm leading-relaxed">
                    <EditableText value={member.description} onSave={handleTeamUpdate(idx, 'description')} isEditMode={isEditMode} />
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Glassmorphism
  if (layoutStyle === 'glassmorphism') {
    return (
      <section className={`py-24 relative overflow-hidden ${layoutConfig.pageBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Ekibimizle Tanışın</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-colors">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative shadow-lg">
                  <EditableImage
                    src={member.image || defaultImage}
                    alt={member.name}
                    onSave={handleImageUpdate(idx)}
                    isEditMode={isEditMode}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-multiply"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  <EditableText value={member.name} onSave={handleTeamUpdate(idx, 'name')} isEditMode={isEditMode} multiline={false} />
                </h3>
                <h4 className="text-white/70 font-light tracking-wide mb-4">
                  <EditableText value={member.role} onSave={handleTeamUpdate(idx, 'role')} isEditMode={isEditMode} multiline={false} />
                </h4>
                {member.description && (
                  <p className="text-white/60 font-light text-sm">
                    <EditableText value={member.description} onSave={handleTeamUpdate(idx, 'description')} isEditMode={isEditMode} />
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Dark Futuristic
  return (
    <section className={`py-24 bg-[#0a0a12] ${layoutConfig.sectionDivider}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-16">
          <span className="w-12 h-px" style={{ backgroundColor: themeConfig.primary }}></span>
          <h2 className="text-2xl font-black text-white uppercase tracking-widest">Kadro</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="group">
              <div className="aspect-square mb-6 overflow-hidden filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 border-2 border-transparent group-hover:border-[themeConfig.primary]" style={{ borderColor: themeConfig.primary }}>
                <EditableImage
                  src={member.image || defaultImage}
                  alt={member.name}
                  onSave={handleImageUpdate(idx)}
                  isEditMode={isEditMode}
                  className="w-full h-full object-cover mix-blend-luminosity"
                />
              </div>
              <h4 className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: themeConfig.primary }}>
                <EditableText value={member.role} onSave={handleTeamUpdate(idx, 'role')} isEditMode={isEditMode} multiline={false} />
              </h4>
              <h3 className="text-2xl font-black text-white mb-4 uppercase">
                <EditableText value={member.name} onSave={handleTeamUpdate(idx, 'name')} isEditMode={isEditMode} multiline={false} />
              </h3>
              {member.description && (
                <p className="text-slate-400 font-light text-sm border-l border-[#1e1e35] pl-4">
                  <EditableText value={member.description} onSave={handleTeamUpdate(idx, 'description')} isEditMode={isEditMode} />
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
