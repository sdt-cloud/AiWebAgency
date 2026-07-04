import React from 'react';
import EditableText from '../../EditableText';
import EditableImage from '../../EditableImage';
import { TemplateContent, ThemeConfig } from '../../template-types';

interface Props {
  content: TemplateContent;
  themeConfig: ThemeConfig;
  isEditMode: boolean;
  onUpdateContent: (newContent: TemplateContent) => void;
  layoutConfig?: any;
}

export default function PhotoMinimalTemplate({ content, themeConfig, isEditMode, onUpdateContent }: Props) {
  const fontBody = themeConfig.fontFamily || "'Helvetica Neue', sans-serif";
  
  const updateHero = (key: keyof typeof content.hero, value: string) => {
    onUpdateContent({ ...content, hero: { ...content.hero, [key]: value } });
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row" style={{ fontFamily: fontBody }}>
      {/* Sidebar/Hero Content */}
      <div className="w-full md:w-[400px] lg:w-[500px] shrink-0 md:h-screen sticky top-0 flex flex-col justify-between p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100 bg-white z-10">
        <div>
          <h1 className="text-xl font-bold tracking-tighter uppercase mb-24">
            {content.contact.company_name || 'STUDIO PHOTO'}
          </h1>
          
          <EditableText
            text={content.hero.title}
            isEditMode={isEditMode}
            onChange={(val: string) => updateHero('title', val)}
            className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.85] mb-8"
          />
          
          <EditableText
            text={content.hero.subtitle}
            isEditMode={isEditMode}
            onChange={(val: string) => updateHero('subtitle', val)}
            className="text-gray-500 font-light max-w-sm text-sm lg:text-base mb-12 leading-relaxed"
          />
        </div>

        <div className="text-xs uppercase tracking-widest text-gray-400 space-y-2">
          <p>{content.contact.email}</p>
          <p>{content.contact.phone}</p>
        </div>
      </div>

      {/* Masonry Gallery Area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {content.gallery_images && content.gallery_images.length > 0 ? (
          <div className="columns-1 md:columns-2 xl:columns-3 gap-4 space-y-4">
            {content.gallery_images.map((img, idx) => (
              <div key={idx} className="break-inside-avoid relative group overflow-hidden bg-gray-100">
                <EditableImage
                  src={img.src}
                  alt={img.alt}
                  isEditMode={isEditMode}
                  onImageUpdate={(url) => {
                    const g = [...(content.gallery_images || [])];
                    g[idx].src = url;
                    onUpdateContent({ ...content, gallery_images: g });
                  }}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <EditableText
                    text={img.alt}
                    isEditMode={isEditMode}
                    onChange={(val: string) => {
                      const g = [...(content.gallery_images || [])];
                      g[idx].alt = val;
                      onUpdateContent({ ...content, gallery_images: g });
                    }}
                    className="text-white text-sm font-medium tracking-wide uppercase"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-300 uppercase tracking-widest text-sm">
            No gallery images found.
          </div>
        )}
      </div>
    </div>
  );
}
