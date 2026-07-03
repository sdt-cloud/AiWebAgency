import React from 'react';
import { Star, Phone, MapPin, Sparkles, Eye, ArrowRight, ShieldAlert } from 'lucide-react';

interface LeadTableProps {
  leads: any[];
  onGenerate: (leadId: string) => void;
  onViewPreview: (lead: any) => void;
  generatingId: string | null;
  selectedLeadId?: string;
}

export default function LeadTable({
  leads,
  onGenerate,
  onViewPreview,
  generatingId,
  selectedLeadId,
}: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 rounded-2xl">
        <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center mb-4">
          <ShieldAlert size={24} />
        </div>
        <h4 className="font-bold text-slate-800 text-sm mb-1">Müşteri Adayı Bulunmadı</h4>
        <p className="text-xs text-slate-400 max-w-xs">
          Yukarıdaki arama çubuğunu kullanarak Google Maps'ten web sitesi olmayan yerel işletmeleri tarayın.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'generating':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-200/50 animate-pulse">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            AI Tasarlıyor
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200/50">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            Tasarım Hazır
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-200/50">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            Teklif İletildi
          </span>
        );
      case 'new':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold border border-slate-200">
            Yeni Aday
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="py-4 px-6">İşletme Detayı</th>
              <th className="py-4 px-4 text-center">Değerlendirme</th>
              <th className="py-4 px-4">Durum</th>
              <th className="py-4 px-6 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => {
              const isSelected = selectedLeadId === lead.id;
              const isGenerating = generatingId === lead.id || lead.status === 'generating';

              return (
                <tr
                  key={lead.id}
                  className={`hover:bg-slate-50/50 transition-colors ${
                    isSelected ? 'bg-indigo-50/30' : ''
                  }`}
                >
                  <td className="py-4 px-6 space-y-2">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{lead.name}</div>
                      <div className="text-xs text-slate-400 font-medium">{lead.category || 'Yerel İşletme'}</div>
                    </div>
                    
                    <div className="flex flex-col gap-1 text-slate-500 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400 shrink-0" />
                        <span className="truncate max-w-[250px]" title={lead.address}>{lead.address}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} className="text-slate-400 shrink-0" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <div className="flex items-center gap-1 font-bold text-slate-800 text-sm">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span>{lead.rating || '0.0'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold">{lead.reviews_count} yorum</div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {getStatusBadge(lead.status)}
                  </td>

                  <td className="py-4 px-6 text-right">
                    {lead.status === 'new' ? (
                      <button
                        onClick={() => onGenerate(lead.id)}
                        disabled={isGenerating}
                        className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100 cursor-pointer"
                      >
                        {isGenerating ? (
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                          <Sparkles size={14} className="text-indigo-400" />
                        )}
                        <span>{isGenerating ? 'AI Tasarlıyor...' : 'Web Sitesi Tasarla'}</span>
                      </button>
                    ) : (
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => onViewPreview(lead)}
                          className={`py-2 px-4 text-xs font-bold rounded-xl inline-flex items-center gap-2 border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Eye size={14} />
                          <span>Teklif & Önizleme</span>
                          <ArrowRight size={12} className={isSelected ? 'translate-x-0.5 transition-transform' : ''} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
