'use client';

import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, ExternalLink, Edit3, X, CheckCircle, MessageSquare, AlertCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface PreviewFrameProps {
  lead: any;
  onClose: () => void;
  onUpdateStatus: (leadId: string, status: string) => void;
}

export default function PreviewFrame({
  lead,
  onClose,
  onUpdateStatus,
}: PreviewFrameProps) {
  // SSR-safe: window.location.origin sadece client-side'da erişilebilir
  const [origin, setOrigin] = useState('');
  const [cacheBuster, setCacheBuster] = useState(Date.now());

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    setCacheBuster(Date.now());
  }, [lead]);

  const previewUrl = `${origin}/preview/${lead.site_id}`;
  const editUrl = `${previewUrl}?token=${lead.edit_token}`;
  const iframeUrl = `${previewUrl}?cb=${cacheBuster}`;

  // Türkçe karakterleri domain-friendly hale getir
  const safeDomainName = (lead.name || '')
    .toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]/g, '');

  // Formulate email message
  const emailSubject = `Google Değerlendirmeleriniz & İşletmeniz İçin Web Tasarım Çalışması`;
  const emailBody = `Merhaba ${lead.name} Yetkilisi,\n\nGoogle Haritalar'daki ${lead.rating} yıldızlı ve ${lead.reviews_count} yorumlu mükemmel müşteri değerlendirmelerinizi gördük. Müşterilerinizin sizden övgüyle bahsettiği şu konularda çok başarılı olduğunuzu fark ettik:\n"${lead.reviews_summary || 'Kaliteli hizmet ve güleryüzlü servis'}"\n\nAncak, potansiyel müşterilerinizin size internet üzerinden daha kolay ulaşabilmesi için bir web sitenizin olmadığını fark ettik. Sizin için yarım saatte modern ve mobil uyumlu bir tanıtım web sitesi tasarladık.\n\nWeb sitenizin önizlemesini bu adresten inceleyebilirsiniz:\n${previewUrl}\n\nEğer tasarımı kendiniz düzenlemek, yazıları veya görselleri değiştirmek isterseniz, size özel bu gizli düzenleme linkini kullanabilirsiniz:\n${editUrl}\n\nBeğenirseniz, sitenizi kendi alan adınızla (örneğin: www.${safeDomainName}.com) hemen yayına alabiliriz.\n\nİyi çalışmalar dileriz.`;
  
  // mailto: Her zaman genel bir adres koy (işletmelerin e-postası genelde bilinmiyor)
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  // Formulate WhatsApp message
  const whatsappMsg = `Merhaba ${lead.name}! Google Haritalar'daki harika yorumlarınızı gördük fakat web sitenizin olmadığını fark ettik. Sizin için modern bir önizleme web sitesi hazırladık: ${previewUrl}\n\nSitedeki yazıları ve resimleri düzenlemek isterseniz bu gizli linki kullanabilirsiniz: ${editUrl}\n\nİncelemek ister misiniz?`;
  
  const formattedPhone = lead.phone ? lead.phone.replace(/[^0-9+]/g, '') : '';
  const cleanPhone = formattedPhone.startsWith('+') 
    ? formattedPhone.substring(1) 
    : formattedPhone.startsWith('90') 
    ? formattedPhone 
    : `90${formattedPhone.startsWith('0') ? formattedPhone.substring(1) : formattedPhone}`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  // origin henüz yüklenmemişse render etme (SSR/hydration güvenliği)
  if (!origin) {
    return (
      <div className="bg-white border-l border-slate-200 w-full lg:w-[450px] shrink-0 h-[calc(100vh-65px)] sticky top-[65px] flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="bg-white border-l border-slate-200 w-full lg:w-[450px] shrink-0 h-[calc(100vh-65px)] sticky top-[65px] flex flex-col shadow-2xl animate-slide-in-right">
      {/* Title */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div>
          <h3 className="font-bold text-slate-800 text-sm truncate max-w-[280px]">
            {lead.name}
          </h3>
          <p className="text-xs text-slate-500">Tasarım Önizleme & Teklif</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Action panel */}
      <div className="p-4 border-b border-slate-100 space-y-4">
        {/* Buttons to view / edit */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200/60 transition-colors"
          >
            <ExternalLink size={14} />
            <span>Sitede Gör</span>
          </a>
          <a
            href={editUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold border border-indigo-100 transition-colors"
          >
            <Edit3 size={14} />
            <span>Canlı Düzenle</span>
          </a>
        </div>

        {/* Outreach Links */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Müşteriye Teklif İletin</h4>
          
          <div className="flex gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone size={14} />
              <span>WhatsApp Teklifi</span>
            </a>
            
            <a
              href={mailtoUrl}
              className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Mail size={14} />
              <span>E-posta Teklifi</span>
            </a>
          </div>
        </div>

        {/* Status management funnel */}
        <div className="space-y-2 pt-1.5 border-t border-slate-100">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aday & Satış Süreci Yönetimi</h4>
          <div className="grid grid-cols-2 gap-1.5">
            {/* Teklif İletildi Button */}
            <button
              onClick={() => onUpdateStatus(lead.id, 'contacted')}
              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                lead.status === 'contacted'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <MessageSquare size={12} />
              <span>Teklif İletildi</span>
            </button>

            {/* Revize İstendi Button */}
            <button
              onClick={() => onUpdateStatus(lead.id, 'change_requested')}
              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                lead.status === 'change_requested'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <AlertCircle size={12} />
              <span>Revize İstendi</span>
            </button>

            {/* Satış Yapıldı Button */}
            <button
              onClick={() => onUpdateStatus(lead.id, 'accepted')}
              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                lead.status === 'accepted'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ThumbsUp size={12} />
              <span>Satış Yapıldı</span>
            </button>

            {/* Reddedildi Button */}
            <button
              onClick={() => onUpdateStatus(lead.id, 'rejected')}
              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                lead.status === 'rejected'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ThumbsDown size={12} />
              <span>Reddedildi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Google Review & AI Analysis Summary */}
      <div className="px-4 py-3 bg-indigo-50/40 border-b border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Google Değerlendirme Analizi</h4>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
              ★ {lead.rating ? lead.rating.toFixed(1) : '0.0'}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold">({lead.reviews_count || 0} Yorum)</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 p-3 rounded-xl shadow-sm">
          <p className="text-xs text-slate-600 font-semibold leading-relaxed italic">
            "{lead.reviews_summary || 'Müşteri değerlendirmeleri bulunmuyor.'}"
          </p>
        </div>
      </div>

      {/* Iframe preview */}
      <div className="flex-1 bg-slate-100 relative overflow-hidden">
        <iframe
          src={iframeUrl}
          title="Website Preview"
          className="border-none pointer-events-none scale-[0.8] origin-top-left h-[125%] w-[125%]"
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="absolute inset-0 bg-transparent cursor-pointer" onClick={() => window.open(previewUrl, '_blank')} title="Tam sayfada görüntülemek için tıklayın" />
      </div>
    </div>
  );
}
