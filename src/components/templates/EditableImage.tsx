import React, { useState, useEffect, useRef } from 'react';
import { Camera, Image as ImageIcon, Upload } from 'lucide-react';

// Dot notation ile nesne içinden veri okuma
function getValueByPath(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Dot notation ile nesne içine veri yazma
function setValueByPath(obj: any, path: string, value: any): any {
  if (!obj || !path) return obj;
  const newObj = { ...obj };
  const parts = path.split('.');
  let current = newObj;
  
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPartIsNumber = !isNaN(Number(parts[i + 1]));
    
    if (nextPartIsNumber) {
      current[part] = Array.isArray(current[part]) ? [...current[part]] : [];
    } else {
      current[part] = current[part] && typeof current[part] === 'object' ? { ...current[part] } : {};
    }
    current = current[part];
  }
  
  current[parts[parts.length - 1]] = value;
  return newObj;
}

interface EditableImageProps {
  src?: string;
  alt?: string;
  fallback?: string;
  content?: any;
  contentKey?: string;
  isEditMode: boolean;
  onChange?: any;
  onUpdate?: any;
  onSave?: any;
  className?: string;
  [key: string]: any;
}

export default function EditableImage({
  src,
  alt,
  fallback,
  content,
  contentKey,
  isEditMode,
  onChange,
  onUpdate,
  onSave,
  className = '',
}: EditableImageProps) {
  const [showModal, setShowModal] = useState(false);

  // Veritabanından resmi dinamik oku veya standart prop'a düş
  const resolvedSrc = (content && contentKey)
    ? getValueByPath(content, contentKey)
    : src;
  
  const actualSrc = resolvedSrc || fallback || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600";

  const [urlInput, setUrlInput] = useState(actualSrc);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Aday değiştiğinde veya yeniden tasarlama yapıldığında arayüzdeki resmi senkronize et
  useEffect(() => {
    setUrlInput(actualSrc);
  }, [actualSrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir görsel dosyası seçin.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Canvas ile resmi optimize et (maksimum genişlik/yükseklik 1000px)
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // 0.7 kalitesinde JPEG formatına sıkıştırarak base64 üret
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setUrlInput(compressedBase64);
        } else {
          setUrlInput(event.target?.result as string);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Ready-made modern unsplash images for quick switching
  const quickStockImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
  ];

  const handleSave = () => {
    if (content && contentKey && onUpdate) {
      if (onUpdate.length === 2) {
        // updateContent(key, value) imzası
        onUpdate(contentKey, urlInput);
      } else {
        // onUpdateContent(newContent) imzası
        const updatedContent = setValueByPath(content, contentKey, urlInput);
        onUpdate(updatedContent);
      }
    } else {
      if (onSave) onSave(urlInput);
      if (onChange) onChange(urlInput);
    }
    setShowModal(false);
  };

  return (
    <div className="relative group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={actualSrc} alt={alt} className={className} />
      
      {isEditMode && (
        <button
          type="button"
          onClick={() => {
            setUrlInput(actualSrc);
            setShowModal(true);
          }}
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2 font-medium rounded-lg cursor-pointer"
        >
          <Camera size={24} className="animate-bounce" />
          <span>Görseli Değiştir</span>
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <ImageIcon size={20} className="text-indigo-600" />
              Görsel Düzenleyici
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Görsel URL Adresi</label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-medium text-slate-600">Yerel Cihazdan Görsel Yükle</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-700 rounded-lg text-sm cursor-pointer transition-colors"
                  >
                    <Upload size={16} />
                    Dosya Seçin
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  {urlInput && urlInput.startsWith('data:image') && (
                    <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1.5 rounded-md self-center font-medium border border-green-200">
                      Görsel başarıyla seçildi
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Hazır Stok Görsellerden Seç</label>
                <div className="grid grid-cols-4 gap-2">
                  {quickStockImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setUrlInput(img)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer ${urlInput === img ? 'border-indigo-600' : 'border-transparent'}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="Stock" className="object-cover w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer text-sm font-medium"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium cursor-pointer text-sm"
              >
                Görseli Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
