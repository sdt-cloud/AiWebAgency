'use client';

import React from 'react';
import { SectionBaseProps, getLayoutConfig } from '../template-types';
import EditableText from '../EditableText';
import { Phone, MessageCircle, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

export default function EmergencyCTASection({
  content,
  themeConfig,
  layoutStyle,
  isEditMode,
  onUpdateContent,
}: SectionBaseProps) {
  
  const layoutConfig = getLayoutConfig(layoutStyle, themeConfig.primary);

  const cleanPhone = content.contact.phone.replace(/\s+/g, '').replace('+', '');
  // WhatsApp için uluslararası formatta numara (varsayılan Türkiye +90 varsayımı)
  const waPhone = cleanPhone.startsWith('90') ? cleanPhone : `90${cleanPhone.replace(/^0/, '')}`;
  
  const defaultMessage = "Merhaba, acil yardıma ihtiyacım var. En kısa sürede gelebilir misiniz?";
  const waMessage = encodeURIComponent(content.contact.whatsapp_message || defaultMessage);
  const waLink = `https://wa.me/${waPhone}?text=${waMessage}`;
  const telLink = `tel:${cleanPhone}`;

  // Bu bölüm her zaman dikkat çekici (High Contrast) olmalıdır
  // layoutStyle'dan bağımsız olarak genelde koyu veya parlak primary renkte olur
  const isDarkLayout = layoutStyle === 'dark-futuristic' || layoutStyle === 'neo-brutalism';
  
  const bgStyle = isDarkLayout 
    ? 'bg-[#0a0a12] border-t-2 border-b-2' 
    : 'bg-slate-900';

  return (
    <section className={`py-24 relative overflow-hidden ${bgStyle}`} style={isDarkLayout ? { borderColor: themeConfig.primary } : {}}>
      {/* Background Pulse Effect */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center z-0 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full opacity-20 animate-pulse blur-3xl" style={{ backgroundColor: themeConfig.primary }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Acil Durum Rozeti */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-500/20 text-red-400 font-bold tracking-widest uppercase mb-8 border border-red-500/30">
          <AlertTriangle size={20} className="animate-pulse" />
          <span>7/24 Acil Servis</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
          Hemen Yardıma Mı İhtiyacınız Var?
        </h2>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light">
          Günün her saati, en kısa sürede adresinizdeyiz. Tek tıkla bize ulaşın.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          {/* Büyük Telefon Butonu */}
          <a 
            href={telLink}
            className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-6 rounded-2xl md:rounded-full font-black text-2xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
            style={{ 
              backgroundColor: themeConfig.primary, 
              color: layoutStyle === 'neo-brutalism' ? '#000' : '#fff'
            }}
          >
            <Phone size={32} />
            <span>HEMEN ARA</span>
          </a>

          {/* WhatsApp Butonu */}
          <a 
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-6 rounded-2xl md:rounded-full font-bold text-xl bg-[#25D366] text-white transition-all hover:bg-[#1DA851] hover:scale-105 shadow-[0_0_40px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle size={28} />
            <span>WhatsApp'tan Yaz</span>
          </a>
        </div>

        {/* Güven Rozetleri */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400 border-t border-white/10 pt-12">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck size={32} style={{ color: themeConfig.primary }} />
            <span className="font-medium text-sm">Garantili Hizmet</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock size={32} style={{ color: themeConfig.primary }} />
            <span className="font-medium text-sm">Hızlı Müdahale</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="font-black text-2xl" style={{ color: themeConfig.primary }}>%100</div>
            <span className="font-medium text-sm">Müşteri Memnuniyeti</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="font-black text-2xl" style={{ color: themeConfig.primary }}>Uzman</div>
            <span className="font-medium text-sm">Profesyonel Ekip</span>
          </div>
        </div>

      </div>
    </section>
  );
}
