'use client';

import React, { useState } from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import { Utensils, Coffee, Cake } from 'lucide-react';

export default function MenuSection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  // Varsayılan menü öğeleri (Eğer veritabanından boş gelirse)
  const menuCategories = content.menu_items && content.menu_items.length > 0 ? content.menu_items : [
    {
      category: 'Ana Yemekler',
      items: [
        { name: 'Izgara Somon', description: 'Mevsim yeşillikleri ve patates püresi ile', price: '₺320' },
        { name: 'Geleneksel Mantı', description: 'Yoğurt ve özel sos eşliğinde', price: '₺180' }
      ]
    },
    {
      category: 'İçecekler',
      items: [
        { name: 'Filtre Kahve', description: '%100 Arabica çekirdekleri', price: '₺85' },
        { name: 'Taze Portakal Suyu', price: '₺95' }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleCategoryUpdate = (catIdx: number, newValue: string) => {
    if (!content.menu_items) return;
    const newItems = [...content.menu_items];
    newItems[catIdx] = { ...newItems[catIdx], category: newValue };
    onUpdateContent({ ...content, menu_items: newItems });
  };

  const handleItemUpdate = (catIdx: number, itemIdx: number, field: 'name' | 'description' | 'price') => (newValue: string) => {
    if (!content.menu_items) return;
    const newItems = [...content.menu_items];
    const newCategoryItems = [...newItems[catIdx].items];
    newCategoryItems[itemIdx] = { ...newCategoryItems[itemIdx], [field]: newValue };
    newItems[catIdx] = { ...newItems[catIdx], items: newCategoryItems };
    onUpdateContent({ ...content, menu_items: newItems });
  };

  // Kategori ikonları için basit mantık
  const getCategoryIcon = (categoryName: string) => {
    const lowerName = categoryName.toLowerCase();
    if (lowerName.includes('kahve') || lowerName.includes('içecek') || lowerName.includes('çay')) return <Coffee size={20} />;
    if (lowerName.includes('tatlı') || lowerName.includes('pasta') || lowerName.includes('kek')) return <Cake size={20} />;
    return <Utensils size={20} />;
  };

  // Editorial & Retro-Modern (Klasik Restoran Menüsü Stili - Noktalı çizgiler vb.)
  if (layoutStyle === 'editorial-retro') {
    return (
      <section className={`py-24 bg-[#faf7f2] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif text-[#2d2418] mb-6">Menümüz</h2>
            <div className="w-24 h-px bg-[#2d2418] mx-auto opacity-30"></div>
          </div>

          <div className="space-y-16">
            {menuCategories.map((cat, catIdx) => (
              <div key={catIdx} className="relative">
                <h3 className="text-3xl font-serif text-center text-[#5c4f3d] mb-10 pb-4 border-b border-[#e8e0d4] uppercase tracking-widest">
                  <EditableText value={cat.category} onSave={(val) => handleCategoryUpdate(catIdx, val)} isEditMode={isEditMode} multiline={false} />
                </h3>
                
                <div className="space-y-8">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex flex-col group">
                      <div className="flex justify-between items-end mb-1">
                        <h4 className="text-xl font-bold text-[#2d2418] font-serif pr-4 bg-[#faf7f2] z-10 relative">
                          <EditableText value={item.name} onSave={handleItemUpdate(catIdx, itemIdx, 'name')} isEditMode={isEditMode} multiline={false} />
                        </h4>
                        <div className="flex-1 border-b-2 border-dotted border-[#d4c5b0] mb-2 z-0 mx-2"></div>
                        <span className="text-xl font-bold text-[#2d2418] pl-4 bg-[#faf7f2] z-10 relative">
                          <EditableText value={item.price} onSave={handleItemUpdate(catIdx, itemIdx, 'price')} isEditMode={isEditMode} multiline={false} />
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[#a09080] font-serif italic text-lg max-w-[80%]">
                          <EditableText value={item.description} onSave={handleItemUpdate(catIdx, itemIdx, 'description')} isEditMode={isEditMode} />
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Neo-Minimalist (Modern, tab yapısı ile kategorileri ayırır)
  if (layoutStyle === 'neo-minimalist') {
    return (
      <section className={`py-24 bg-white ${layoutConfig.sectionDivider}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lezzetlerimiz</h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center overflow-x-auto pb-4 mb-12 hide-scrollbar">
            <div className="flex space-x-2 bg-slate-100 p-1 rounded-full">
              {menuCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === idx 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {getCategoryIcon(cat.category)}
                  <EditableText value={cat.category} onSave={(val) => handleCategoryUpdate(idx, val)} isEditMode={isEditMode} multiline={false} />
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {menuCategories[activeTab]?.items.map((item, itemIdx) => (
              <div key={itemIdx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-slate-900">
                    <EditableText value={item.name} onSave={handleItemUpdate(activeTab, itemIdx, 'name')} isEditMode={isEditMode} multiline={false} />
                  </h4>
                  <span className="font-bold px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-sm">
                    <EditableText value={item.price} onSave={handleItemUpdate(activeTab, itemIdx, 'price')} isEditMode={isEditMode} multiline={false} />
                  </span>
                </div>
                {item.description && (
                  <p className="text-slate-500 text-sm mt-2">
                    <EditableText value={item.description} onSave={handleItemUpdate(activeTab, itemIdx, 'description')} isEditMode={isEditMode} />
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Dark Futuristic (Neon menü)
  if (layoutStyle === 'dark-futuristic') {
    return (
      <section className={`py-24 bg-[#0a0a12] ${layoutConfig.sectionDivider}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-[0.3em] uppercase block mb-4" style={{ color: themeConfig.primary }}>/ GASTRONOMİ</span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Menü</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {menuCategories.map((cat, catIdx) => (
              <div key={catIdx}>
                <div className="flex items-center gap-4 mb-8 border-b border-[#1e1e35] pb-4">
                  <div style={{ color: themeConfig.primary }}>{getCategoryIcon(cat.category)}</div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-widest">
                    <EditableText value={cat.category} onSave={(val) => handleCategoryUpdate(catIdx, val)} isEditMode={isEditMode} multiline={false} />
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="group cursor-default relative pl-4 border-l-2 border-transparent hover:border-[themeConfig.primary] transition-all" style={{ borderColor: themeConfig.primary }}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                          <EditableText value={item.name} onSave={handleItemUpdate(catIdx, itemIdx, 'name')} isEditMode={isEditMode} multiline={false} />
                        </h4>
                        <span className="font-mono font-bold" style={{ color: themeConfig.primary }}>
                          <EditableText value={item.price} onSave={handleItemUpdate(catIdx, itemIdx, 'price')} isEditMode={isEditMode} multiline={false} />
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-slate-500 font-light text-sm">
                          <EditableText value={item.description} onSave={handleItemUpdate(catIdx, itemIdx, 'description')} isEditMode={isEditMode} />
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback (Glassmorphism / Diğerleri için temel liste)
  return (
    <section className={`py-24 relative overflow-hidden ${layoutConfig.pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${layoutConfig.headingColor} mb-6`}>Özel Menümüz</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {menuCategories.map((cat, catIdx) => (
            <div key={catIdx} className={`${layoutConfig.cardBg} ${layoutConfig.cardBorder} ${layoutConfig.borderRadius} p-8`}>
              <h3 className={`text-2xl font-bold ${layoutConfig.headingColor} mb-8 border-b border-white/10 pb-4`}>
                <EditableText value={cat.category} onSave={(val) => handleCategoryUpdate(catIdx, val)} isEditMode={isEditMode} multiline={false} />
              </h3>
              
              <div className="space-y-6">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-b border-white/5 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`text-lg font-semibold ${layoutConfig.headingColor}`}>
                        <EditableText value={item.name} onSave={handleItemUpdate(catIdx, itemIdx, 'name')} isEditMode={isEditMode} multiline={false} />
                      </h4>
                      <span className="font-bold text-white bg-black/20 px-3 py-1 rounded-lg">
                        <EditableText value={item.price} onSave={handleItemUpdate(catIdx, itemIdx, 'price')} isEditMode={isEditMode} multiline={false} />
                      </span>
                    </div>
                    {item.description && (
                      <p className={`${layoutConfig.mutedColor} text-sm`}>
                        <EditableText value={item.description} onSave={handleItemUpdate(catIdx, itemIdx, 'description')} isEditMode={isEditMode} />
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
