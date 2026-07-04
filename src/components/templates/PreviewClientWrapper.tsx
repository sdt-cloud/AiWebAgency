'use client';

import React, { useState } from 'react';
import { Save, Check, AlertCircle, Eye, LogOut } from 'lucide-react';
import IndexRenderer from './IndexRenderer';

interface PreviewClientWrapperProps {
  site: any;
  lead: any;
  initialEditMode: boolean;
  token?: string;
}

export default function PreviewClientWrapper({
  site,
  lead,
  initialEditMode,
  token,
}: PreviewClientWrapperProps) {
  const [content, setContent] = useState({
    ...site.content,
    // Ensure company name is present from lead if not in content
    contact: {
      company_name: lead.name,
      ...site.content.contact,
    }
  });

  const [isEditMode, setIsEditMode] = useState(initialEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleUpdateContent = (newContent: any) => {
    setContent(newContent);
  };

  const handleSave = async () => {
    if (!token) return;
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const res = await fetch('/api/leads/update-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_id: site.id,
          content,
          token,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      console.error('Error saving site content:', err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  // Render using the new IndexRenderer system
  const renderTemplate = () => {
    return (
      <IndexRenderer
        templateName={site.template_name || 'cafe_warm'}
        content={content}
        themeConfig={site.theme_config || { primary: '#4f46e5', fontFamily: 'Inter' }}
        isEditMode={isEditMode}
        onUpdateContent={handleUpdateContent}
      />
    );
  };

  return (
    <div className="relative">
      {/* Floating Admin Bar when token is present */}
      {token && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-800 z-50 flex items-center gap-6 w-[90%] max-w-xl animate-slide-in-bottom">
          <div className="flex-1">
            <h4 className="font-bold text-sm text-indigo-400">Düzenleme Paneli</h4>
            <p className="text-xs text-slate-400">
              {isEditMode ? 'Metinlere tıklayıp düzenleyin. Değişiklikleri kaydedin.' : 'Önizleme modu aktif.'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isEditMode ? 'Önizleme Moduna Geç' : 'Düzenleme Moduna Geç'}
            >
              {isEditMode ? <Eye size={18} /> : <Eye size={18} className="text-green-400" />}
            </button>

            {isEditMode && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  saveStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : saveStatus === 'error'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : saveStatus === 'success' ? (
                  <Check size={14} />
                ) : saveStatus === 'error' ? (
                  <AlertCircle size={14} />
                ) : (
                  <Save size={14} />
                )}
                <span>
                  {isSaving
                    ? 'Kaydediliyor...'
                    : saveStatus === 'success'
                    ? 'Kaydedildi'
                    : saveStatus === 'error'
                    ? 'Hata Oluştu'
                    : 'Kaydet'}
                </span>
              </button>
            )}

            <button
              onClick={() => {
                // Exit edit mode by clearing token from URL
                window.location.href = window.location.pathname;
              }}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Düzenleyiciden Çık"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Main Website Template */}
      {renderTemplate()}
    </div>
  );
}
