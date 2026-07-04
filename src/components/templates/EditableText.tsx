import React, { useRef, useEffect } from 'react';

// Dot notation ile nesne içinden veri okuma (örn: 'contact.phone')
function getValueByPath(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Dot notation ile nesne içine veri yazma ve klonlama (diziler ve alt nesneler dahil)
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

interface EditableTextProps {
  text?: string;
  value?: string;
  fallback?: string;
  content?: any;
  contentKey?: string;
  isEditMode: boolean;
  onChange?: any;
  onUpdate?: any;
  onSave?: any;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  [key: string]: any;
}

export default function EditableText({
  text,
  value,
  fallback,
  content,
  contentKey,
  isEditMode,
  onChange,
  onUpdate,
  onSave,
  className = '',
  tagName = 'span',
}: EditableTextProps) {
  const Tag = tagName;
  const ref = useRef<HTMLElement>(null);

  // Eğer content ve contentKey varsa veritabanından dinamik oku, yoksa standart text/value kullan
  const resolvedText = (content && contentKey) 
    ? getValueByPath(content, contentKey) 
    : (value ?? text);
  
  const actualText = resolvedText ?? fallback ?? '';

  // Sync ref text with prop text if prop changes from outside
  useEffect(() => {
    if (ref.current && ref.current.innerText !== actualText) {
      ref.current.innerText = actualText;
    }
  }, [actualText]);

  if (!isEditMode) {
    return <Tag className={className}>{actualText}</Tag>;
  }

  const handleBlur = () => {
    if (ref.current) {
      const newText = ref.current.innerText;
      
      // Eğer üst şablon contentKey ve onUpdate sunuyorsa derinlemesine güncelleme yap
      if (content && contentKey && onUpdate) {
        if (onUpdate.length === 2) {
          // updateContent(key, value) imzası
          onUpdate(contentKey, newText);
        } else {
          // onUpdateContent(newContent) imzası
          const updatedContent = setValueByPath(content, contentKey, newText);
          onUpdate(updatedContent);
        }
      } else {
        if (onSave) onSave(newText);
        if (onChange) onChange(newText);
      }
    }
  };

  return (
    <Tag
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} outline-dashed outline-1 outline-blue-400/80 p-0.5 rounded cursor-text focus:outline-solid focus:outline-2 focus:outline-blue-500`}
    />
  );
}
