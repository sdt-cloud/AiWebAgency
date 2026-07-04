'use client';

import React, { useState, useEffect } from 'react';
import { SectionBaseProps } from '../template-types';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';

export default function NavBar({
  content,
  themeConfig,
  layoutStyle,
}: SectionBaseProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const companyName = content.contact.company_name || 'İşletme Adı';
  const phone = content.contact.phone || '0555 555 55 55';

  // Layout stiline göre navigasyon barı stili belirleme
  const getNavStyle = () => {
    switch (layoutStyle) {
      case 'neo-minimalist':
        return `bg-white/95 backdrop-blur-md ${isScrolled ? 'shadow-sm border-b border-slate-100' : ''} text-slate-900`;
      case 'glassmorphism':
        return `${isScrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'} text-white transition-all duration-300`;
      case 'dark-futuristic':
        return `bg-[#0a0a12]/90 backdrop-blur-md ${isScrolled ? 'border-b border-[#1e1e35]' : ''} text-white`;
      case 'editorial-retro':
        return `bg-[#faf7f2]/95 backdrop-blur-md ${isScrolled ? 'shadow-sm border-b border-[#e8e0d4]' : ''} text-[#2d2418]`;
      case 'neo-brutalism':
        return `bg-[#f5f0e8] border-b-3 border-black text-black`;
      default:
        return 'bg-white text-gray-900 shadow-sm';
    }
  };

  const getButtonStyle = () => {
    switch (layoutStyle) {
      case 'neo-minimalist':
        return `bg-[${themeConfig.primary}] text-white hover:opacity-90 rounded-full px-6 py-2.5 font-medium transition-all shadow-sm`;
      case 'glassmorphism':
        return `bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-2xl px-6 py-2.5 font-medium transition-all`;
      case 'dark-futuristic':
        return `bg-transparent text-[${themeConfig.primary}] border border-[${themeConfig.primary}] hover:bg-[${themeConfig.primary}] hover:text-[#0a0a12] rounded-none px-6 py-2.5 font-bold transition-all uppercase tracking-wider glow-on-hover`;
      case 'editorial-retro':
        return `bg-[${themeConfig.primary}] text-[#faf7f2] hover:bg-[#2d2418] rounded-none px-6 py-2.5 font-serif italic transition-all`;
      case 'neo-brutalism':
        return `bg-[${themeConfig.primary}] text-black border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] rounded-none px-6 py-2.5 font-bold transition-all uppercase`;
      default:
        return `bg-[${themeConfig.primary}] text-white rounded-lg px-6 py-2 font-medium`;
    }
  };

  const links = [
    { label: 'Hakkımızda', href: '#about' },
    { label: 'Hizmetler', href: '#services' },
    { label: 'İletişim', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavStyle()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Company Name */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <span 
              className={`font-bold text-2xl tracking-tight ${layoutStyle === 'editorial-retro' ? 'font-serif italic' : ''}`}
              style={{ color: layoutStyle === 'glassmorphism' || layoutStyle === 'dark-futuristic' ? 'white' : themeConfig.primary }}
            >
              {companyName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 ml-10">
            <div className="flex space-x-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:opacity-70 transition-opacity font-medium text-sm tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <a 
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className={`flex items-center gap-2 ${getButtonStyle()}`}
              style={layoutStyle !== 'dark-futuristic' && layoutStyle !== 'neo-brutalism' ? { backgroundColor: themeConfig.primary } : {}}
            >
              <Phone size={18} />
              <span>{phone}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-black/5 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden absolute top-20 left-0 w-full border-b ${
          layoutStyle === 'glassmorphism' || layoutStyle === 'dark-futuristic' 
            ? 'bg-[#0a0a12]/95 backdrop-blur-xl border-white/10' 
            : 'bg-white border-slate-100 shadow-xl'
        }`}>
          <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`block px-3 py-3 rounded-xl font-medium text-lg ${
                  layoutStyle === 'glassmorphism' || layoutStyle === 'dark-futuristic' 
                    ? 'text-white hover:bg-white/5' 
                    : 'text-slate-900 hover:bg-slate-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a 
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className={`mt-4 w-full flex items-center justify-center gap-2 py-4 ${getButtonStyle()}`}
              style={layoutStyle !== 'dark-futuristic' && layoutStyle !== 'neo-brutalism' ? { backgroundColor: themeConfig.primary } : {}}
            >
              <Phone size={20} />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
