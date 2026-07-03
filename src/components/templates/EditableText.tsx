import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
  text: string;
  isEditMode: boolean;
  onChange: (newText: string) => void;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export default function EditableText({
  text,
  isEditMode,
  onChange,
  className = '',
  tagName = 'span',
}: EditableTextProps) {
  const Tag = tagName;
  const ref = useRef<HTMLElement>(null);

  // Sync ref text with prop text if prop changes from outside
  useEffect(() => {
    if (ref.current && ref.current.innerText !== text) {
      ref.current.innerText = text;
    }
  }, [text]);

  if (!isEditMode) {
    return <Tag className={className}>{text}</Tag>;
  }

  const handleBlur = () => {
    if (ref.current) {
      onChange(ref.current.innerText);
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
