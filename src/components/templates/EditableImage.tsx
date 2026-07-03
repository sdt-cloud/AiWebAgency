import React, { useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

interface EditableImageProps {
  src: string;
  alt: string;
  isEditMode: boolean;
  onChange: (newSrc: string) => void;
  className?: string;
}

export default function EditableImage({
  src,
  alt,
  isEditMode,
  onChange,
  className = '',
}: EditableImageProps) {
  const [showModal, setShowModal] = useState(false);
  const [urlInput, setUrlInput] = useState(src);

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
    onChange(urlInput);
    setShowModal(false);
  };

  return (
    <div className="relative group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"} alt={alt} className={className} />
      
      {isEditMode && (
        <button
          type="button"
          onClick={() => {
            setUrlInput(src);
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
