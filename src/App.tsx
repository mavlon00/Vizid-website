import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X, MessageCircle, Globe, Play, ChevronRight, ChevronLeft, Filter, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import videoA from '../16428566_1920_1080_30fps.mp4';
import videoB from '../7578552-hd_1920_1080_30fps.mp4';
import videoC from '../7614417-hd_1920_1080_30fps.mp4';
import siteLogo from '../vizid.png';
import pexelsBertel from '../pexels-bertellifotografia-16985106.jpg';
import pexelsDrew from '../pexels-drewnii19-11334182.jpg';

import { WorkWithUsPage } from './WorkWithUsPage';
import { ReadPage } from './ReadPage';
import { supabase } from './supabase';

gsap.registerPlugin(ScrollTrigger);

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const fallbackImageSrc = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'%3E%3Crect width='1200' height='900' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='32' fill='%23626a75'%3EImage not available%3C/text%3E%3C/svg%3E";

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.36 6.36 0 0 0-1-.08 6.34 6.34 0 1 0 6.34 6.34V9.05a8.27 8.27 0 0 0 4.89 1.58V7.17a4.86 4.86 0 0 1-1-.48z"/>
  </svg>
);

const AppImage = ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackImageSrc);

  useEffect(() => {
    if (src) setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt || ''}
      className={className}
      onError={() => setImgSrc(fallbackImageSrc)}
      {...props}
    />
  );
};

const Header = ({
  currentPage,
  setCurrentPage,
  headingFont,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setSelectedService,
  setSelectedReadCategory,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  headingFont: React.CSSProperties;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  setSelectedService: (service: 'virtual' | 'full') => void;
  setSelectedReadCategory: (cat: string) => void;
}) => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const navItems = [
    { name: 'Read', id: 'read', dropdown: ['Design', 'How To', 'Around the Table', 'Lifestyle'] },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'About', id: 'about' },
    { name: 'Work With Us', id: 'work', dropdown: ['Virtual Design', 'Full Service'] }
  ];

  const handleNav = (id: string, sub?: string) => {
    setCurrentPage(id);
    if (id === 'work') {
      if (sub === 'Virtual Design') {
        setSelectedService('virtual');
      } else if (sub === 'Full Service') {
        setSelectedService('full');
      }
    } else if (id === 'read') {
      if (sub) {
        setSelectedReadCategory(sub);
      } else {
        setSelectedReadCategory('all');
      }
    }
    setIsMobileMenuOpen(false);
    setHoveredMenu(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#4A4F4C] w-full text-white shadow-md">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-white hover:text-stone-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center lg:w-1/4">
            <button onClick={() => handleNav('home')} className="logo-container text-left flex flex-col justify-center items-start group" aria-label="Go to home">
              <img
                src={siteLogo}
                alt="Vizid - Live Luxury"
                className="navbar-logo"
              />
              <span className="text-[9px] tracking-[0.25em] font-light text-stone-300 uppercase -mt-1 group-hover:text-white transition-colors">
                .....live luxury
              </span>
            </button>
          </div>

          <div className="hidden lg:flex items-center justify-end flex-grow">
            <div className="flex items-center space-x-10 mr-8">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative py-8 flex flex-col items-center group"
                  onMouseEnter={() => item.dropdown && setHoveredMenu(item.id)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button
                    onClick={() => handleNav(item.id)}
                    className={`text-[11px] tracking-[0.15em] uppercase font-medium hover:text-stone-300 transition-colors ${currentPage === item.id ? 'border-b border-white pb-1' : ''}`}
                  >
                    {item.name}
                  </button>

                  {item.dropdown && hoveredMenu === item.id && (
                    <div className="absolute top-[75px] left-1/2 -translate-x-1/2 w-56 bg-[#4A4F4C] shadow-2xl py-4 z-50 border-t border-stone-600">
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleNav(item.id, sub)}
                          className="block w-full text-center px-6 py-2.5 text-[10px] tracking-[0.1em] text-stone-200 hover:text-white hover:bg-[#3D423F] transition-colors uppercase"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-6 mr-8 border-l border-stone-500/50 pl-8 h-8">
              <button onClick={() => handleNav('work')} className="text-white hover:text-stone-300 transition-colors" aria-label="Contact Vizid Studio">
                <User size={18} />
              </button>
            </div>

            <div className="border-l border-stone-500/50 pl-8 h-8 flex flex-col justify-center items-start">
              <button onClick={() => handleNav('shop')} className="text-[12px] tracking-[0.2em] uppercase font-medium hover:text-stone-300 transition-colors">
                New Arrivals
              </button>
              <button onClick={() => handleNav('shop')} className="text-[8px] tracking-[0.2em] uppercase font-light text-stone-300 hover:text-white transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 lg:hidden">
            <button onClick={() => handleNav('work')} className="p-1 text-white" aria-label="Contact Vizid Studio">
              <User size={20} />
            </button>
            <button onClick={() => handleNav('shop')} className="p-1 text-white" aria-label="Shopping bag">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#3D423F] border-t border-stone-600 px-6 py-8 space-y-6 animate-fadeIn">
          {navItems.map((item) => (
            <div key={item.id} className="space-y-2">
              <button
                onClick={() => handleNav(item.id)}
                className="text-sm uppercase tracking-[0.2em] font-medium block text-white"
              >
                {item.name}
              </button>
            </div>
          ))}
          <div className="pt-6 border-t border-stone-600 flex justify-between items-center text-xs text-stone-300">
            <button onClick={() => handleNav('work')} className="uppercase tracking-widest">Contact Us</button>
            <button onClick={() => handleNav('shop')} className="uppercase tracking-widest">Shop New Arrivals</button>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = ({
  headingFont,
  setCurrentPage,
  setSelectedService,
}: {
  headingFont: React.CSSProperties;
  setCurrentPage?: (page: string) => void;
  setSelectedService?: (service: 'virtual' | 'full') => void;
}) => (
  <footer className="bg-[#2C2C2C] text-white pt-16 sm:pt-20 pb-10 px-6 sm:px-8 lg:px-12 w-full mt-auto">
    <div className="max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-700">
      <div className="lg:col-span-2 pr-0 lg:pr-12">
        <div className="mb-4">
          <img src={siteLogo} alt="Vizid" className="navbar-logo h-12" />
          <p className="text-[9px] tracking-[0.25em] font-light text-stone-400 uppercase mt-0.5">
            .....live luxury
          </p>
        </div>
        <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md font-light mb-6">
          Designing spaces that feel curated, cozy, and timeless. Join our newsletter to receive design tips, project reveals, and exclusive launches directly to your inbox.
        </p>
        <div className="flex max-w-md">
          <input
            type="email"
            placeholder="Enter your email address"
            className="bg-stone-800 border border-stone-700 text-xs px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-stone-400 w-full"
          />
          <button className="bg-stone-100 text-stone-900 text-[10px] tracking-[0.2em] uppercase font-semibold px-6 hover:bg-stone-300 transition-colors shrink-0">
            Join
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-[11px] tracking-[0.2em] uppercase font-bold text-stone-300 mb-4">Explore</h4>
        <ul className="space-y-2.5 text-xs text-stone-400 font-light">
          <li><button onClick={() => setCurrentPage?.('portfolio')} className="hover:text-white transition-colors">Our Portfolio</button></li>
          <li><button onClick={() => setCurrentPage?.('read')} className="hover:text-white transition-colors">The Journal</button></li>
          <li><button onClick={() => setCurrentPage?.('about')} className="hover:text-white transition-colors">About Vizid</button></li>
          <li><button onClick={() => setCurrentPage?.('work')} className="hover:text-white transition-colors">Work With Us</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-[11px] tracking-[0.2em] uppercase font-bold text-stone-300 mb-4">Services</h4>
        <ul className="space-y-2.5 text-xs text-stone-400 font-light">
          <li><button onClick={() => { setCurrentPage?.('work'); setSelectedService?.('full'); }} className="hover:text-white transition-colors">Full-Service Design</button></li>
          <li><button onClick={() => { setCurrentPage?.('work'); setSelectedService?.('virtual'); }} className="hover:text-white transition-colors">Virtual Consultations</button></li>
          <li><button onClick={() => { setCurrentPage?.('work'); setSelectedService?.('virtual'); }} className="hover:text-white transition-colors">Trade Program</button></li>
          <li><button onClick={() => { setCurrentPage?.('work'); setSelectedService?.('full'); }} className="hover:text-white transition-colors">Commercial Projects</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-[11px] tracking-[0.2em] uppercase font-bold text-stone-300 mb-4">Follow</h4>
        <div className="flex space-x-4 mb-6 text-stone-400">
          <a href="https://www.facebook.com/vizidcutie" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook"><FacebookIcon size={18} /></a>
          <a href="https://www.instagram.com/vizid_decors?igsh=NWozdTA5Z3hrb3I5" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram"><InstagramIcon size={18} /></a>
          <a href="https://vm.tiktok.com/ZS9hB5GKDQ18c-XIBJD/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="TikTok"><TikTokIcon size={18} /></a>
        </div>
      </div>
    </div>

    <div className="max-w-[100rem] mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 font-light space-y-4 sm:space-y-0">
      <p>© {new Date().getFullYear()} Vizid. All rights reserved.</p>
      <div className="flex space-x-6">
        <a href="#" className="hover:text-stone-300">Privacy Policy</a>
        <a href="#" className="hover:text-stone-300">Terms of Service</a>
        <a href="#" className="hover:text-stone-300">Accessibility Statement</a>
      </div>
    </div>
  </footer>
);

const HorizontalGallery = ({ headingFont, setCurrentPage }: { headingFont: React.CSSProperties; setCurrentPage: (page: string) => void; }) => {
  const portfolioProjects = [
    { id: 1, title: 'Coastal Haven', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000' },
    { id: 2, title: 'Crestview Estate', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000' },
    { id: 3, title: 'Oxford Living', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000' },
    { id: 4, title: 'Heritage Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000' },
    { id: 5, title: 'Modern Foyer', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000' }
  ];

  return (
    <section className="bg-[#4F5450] text-white py-24 relative overflow-hidden flex flex-col justify-center items-center portfolio-gallery-wrapper" style={{ minHeight: '90vh' }}>
      <style>{`
        .portfolio-gallery-wrapper .cards {
          display: flex;
          flex-direction: row;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 100%;
        }

        .portfolio-gallery-wrapper .card {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          height: 380px;
          width: 250px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          transition: 400ms;
          position: relative;
          overflow: hidden;
        }

        .portfolio-gallery-wrapper .card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .portfolio-gallery-wrapper .card .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 1;
          transition: 400ms;
        }

        .portfolio-gallery-wrapper .card:hover .overlay {
          background: rgba(0, 0, 0, 0.15);
        }

        .portfolio-gallery-wrapper .card p.tip {
          font-size: 1.5em;
          font-weight: 500;
          position: relative;
          z-index: 2;
          padding: 0 10px;
        }

        .portfolio-gallery-wrapper .card p.second-text {
          font-size: .7em;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-top: 10px;
          position: relative;
          z-index: 2;
        }

        .portfolio-gallery-wrapper .card:hover {
          transform: scale(1.1, 1.1);
          z-index: 10;
        }

        .portfolio-gallery-wrapper .cards:hover > .card:not(:hover) {
          filter: blur(10px);
          transform: scale(0.9, 0.9);
        }

        @media (max-width: 768px) {
          .portfolio-gallery-wrapper .card {
            width: 160px;
            height: 240px;
          }
          .portfolio-gallery-wrapper .card p.tip {
            font-size: 1.2em;
          }
        }
      `}</style>

      <div className="text-center mb-16 z-20">
        <h2 style={headingFont} className="text-4xl sm:text-5xl lg:text-[3.25rem] text-white font-normal leading-tight mb-1">
          Portfolio
        </h2>
        <h3 style={headingFont} className="text-3xl sm:text-4xl lg:text-[3rem] text-white font-light italic">
          Design Projects
        </h3>
      </div>

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-12 z-20 flex justify-center items-center">
        <div className="cards">
          {portfolioProjects.map((project) => (
            <div key={project.id} className="card" onClick={() => setCurrentPage('portfolio')}>
              <AppImage src={project.img} alt={project.title} className="w-full h-full object-cover" />
              <div className="overlay"></div>
              <p className="tip" style={headingFont}>{project.title}</p>
              <p className="second-text font-sans">View Project</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-16 z-20">
        <button
          onClick={() => setCurrentPage('portfolio')}
          className="border border-white/80 px-10 py-3 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-white hover:text-[#4F5450] transition-colors rounded-sm text-stone-100 hover:text-stone-900"
        >
          See More Projects
        </button>
      </div>
    </section>
  );
};

const CascadeGallery = ({
  headingFont,
  setCurrentPage,
  title = "Portfolio",
  subtitle = "Design Projects",
  targetPage = "portfolio",
  buttonText = "SEE MORE PROJECTS",
  items = [
    { id: 1, title: 'Coastal Bath Haven', subtitle: 'NEWPORT BEACH, CA', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000' },
    { id: 2, title: 'Crestview Stone Estate', subtitle: 'AUSTIN, TX', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000' },
    { id: 3, title: 'Oxford Living Suite', subtitle: 'OXFORDSHIRE, UK', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000' },
    { id: 4, title: 'Heritage Oak Kitchen', subtitle: 'CHICAGO, IL', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000' },
    { id: 5, title: 'Modern Tudor Foyer', subtitle: 'PARK CITY, UT', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000' },
  ]
}: {
  headingFont: React.CSSProperties;
  setCurrentPage: (page: string) => void;
  title?: string;
  subtitle?: string;
  targetPage?: string;
  buttonText?: string;
  items?: { id: number; title: string; subtitle?: string; img: string }[];
}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const getCardStyle = (index: number) => {
    const total = items.length;
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total;

    if (diff === 0) {
      return {
        zIndex: 30,
        transform: 'translateX(0px) scale(1)',
        opacity: 1,
        filter: 'brightness(1)',
        width: '320px',
        height: '480px',
      };
    } else if (diff === -1 || (diff === total - 1 && activeIndex === 0)) {
      return {
        zIndex: 20,
        transform: 'translateX(-280px) scale(0.85)',
        opacity: 0.85,
        filter: 'brightness(0.75)',
        width: '270px',
        height: '390px',
      };
    } else if (diff === 1 || (diff === -(total - 1) && activeIndex === total - 1)) {
      return {
        zIndex: 20,
        transform: 'translateX(280px) scale(0.85)',
        opacity: 0.85,
        filter: 'brightness(0.75)',
        width: '270px',
        height: '390px',
      };
    } else {
      return {
        zIndex: 10,
        transform: diff < 0 ? 'translateX(-460px) scale(0.7)' : 'translateX(460px) scale(0.7)',
        opacity: 0.4,
        filter: 'brightness(0.5)',
        width: '240px',
        height: '340px',
      };
    }
  };

  return (
    <section className="bg-[#4A4F4C] text-white py-20 sm:py-24 relative overflow-hidden flex flex-col justify-between w-full" style={{ minHeight: '82vh' }}>
      <div className="max-w-[100rem] mx-auto px-6 sm:px-12 w-full flex flex-col justify-between flex-grow">
        
        {/* Title Section matching exact screenshot layout */}
        <div className="mb-8 text-left z-20">
          <h2 style={headingFont} className="text-3xl sm:text-4xl lg:text-[2.75rem] text-white font-normal leading-tight">
            {title}
          </h2>
          <h3 style={headingFont} className="text-2xl sm:text-3xl lg:text-[2.25rem] text-stone-200 font-light italic">
            {subtitle}
          </h3>
        </div>

        {/* 3D CASCADE CAROUSEL STAGE */}
        <div className="relative w-full h-[500px] flex items-center justify-center my-2 overflow-visible">
          {items.map((item, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isActive) setActiveIndex(index);
                  else setCurrentPage(targetPage);
                }}
                className="absolute transition-all duration-700 ease-out cursor-pointer flex flex-col items-center justify-center rounded-sm overflow-hidden shadow-2xl border border-white/10 group"
                style={{
                  width: style.width,
                  height: style.height,
                  transform: style.transform,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  filter: style.filter,
                }}
              >
                <AppImage
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent' : 'bg-black/40'}`}></div>

                {isActive && (
                  <div className="absolute bottom-6 left-6 right-6 text-white text-left animate-fadeIn">
                    <p style={headingFont} className="text-2xl font-normal drop-shadow-md">
                      {item.title}
                    </p>
                    {item.subtitle && (
                      <p className="text-[10px] uppercase tracking-[0.2em] font-light text-stone-300 mt-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM CONTROL BAR WITH ARROWS, CONNECTING LINES, AND CENTER BUTTON MATCHING SCREENSHOT */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between mt-8 z-20 px-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-[#4A4F4C] transition-all rounded-none shrink-0"
            aria-label="Previous Item"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="h-[1px] bg-white/30 flex-grow mx-4 sm:mx-8"></div>

          <button
            onClick={() => setCurrentPage(targetPage)}
            className="border border-white/80 text-white px-8 py-3 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-white hover:text-[#4A4F4C] transition-colors shrink-0 rounded-none"
          >
            {buttonText}
          </button>

          <div className="h-[1px] bg-white/30 flex-grow mx-4 sm:mx-8"></div>

          <button
            onClick={handleNext}
            className="w-10 h-10 border border-white/60 flex items-center justify-center text-white hover:bg-white hover:text-[#4A4F4C] transition-all rounded-none shrink-0"
            aria-label="Next Item"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};

const CascadeReadSection = ({ headingFont, setCurrentPage }: { headingFont: React.CSSProperties; setCurrentPage: (page: string) => void; }) => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');

  const articles = [
    {
      id: 1,
      title: 'Strawberries & Cream Summer Cake',
      subtitle: 'A taste of summer nostalgia & outdoor dining styling.',
      category: 'AROUND THE TABLE',
      date: 'JULY 18, 2026',
      readTime: '5 MIN READ',
      quote: '“Summer weekends are defined by light berry desserts on the patio paired with washed linens and fresh garden stems.”',
      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 2,
      title: 'Oxford Road Project: Episode 6',
      subtitle: 'Final Walkthrough & 3D Spatial Visuals with Shea McGee',
      category: 'DESIGN',
      date: 'JULY 15, 2026',
      readTime: '6 MIN READ',
      quote: '“Using virtual 3D rendering allowed us to perfect spatial clearance around key furniture pieces before breaking ground.”',
      img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 3,
      title: 'The Art of Layering Interiors',
      subtitle: 'How to add warmth, depth, and tactile luxury to any room.',
      category: 'HOW-TO',
      date: 'JULY 2, 2026',
      readTime: '7 MIN READ',
      quote: '“Layering textures—from bouclé to aged oak—creates living spaces that feel collected over a lifetime.”',
      img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 4,
      title: 'Mixing Wood Tones & Textures',
      subtitle: 'Harmonizing oak, walnut, and antique pine in modern spatial layouts.',
      category: 'DESIGN TIPS',
      date: 'JUNE 25, 2026',
      readTime: '4 MIN READ',
      quote: '“Don’t match your wood tones—harmonize their undertones for rich character without visual clutter.”',
      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 5,
      title: 'Serene Morning Sanctuary',
      subtitle: 'Designing quiet nooks for tea, reading, and daily rest.',
      category: 'LIFESTYLE',
      date: 'JUNE 18, 2026',
      readTime: '5 MIN READ',
      quote: '“Your home should nurture your morning energy before the busy demands of the day step in.”',
      img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const handleTurnNext = () => {
    if (isTurning) return;
    setTurnDirection('next');
    setIsTurning(true);
    setTimeout(() => {
      setActivePageIndex((prev) => (prev + 1) % articles.length);
      setIsTurning(false);
    }, 450);
  };

  const handleTurnPrev = () => {
    if (isTurning) return;
    setTurnDirection('prev');
    setIsTurning(true);
    setTimeout(() => {
      setActivePageIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
      setIsTurning(false);
    }, 450);
  };

  const currentArticle = articles[activePageIndex];
  const nextArticle = articles[(activePageIndex + 1) % articles.length];

  return (
    <section className="bg-[#F4F0EB] py-16 sm:py-24 px-4 sm:px-8 lg:px-16 w-full border-y border-stone-300/60 overflow-hidden">
      <div className="max-w-[95rem] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 reveal-up">
          <div>
            <h2 style={headingFont} className="text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C] font-normal leading-tight">
              Read
            </h2>
            <h3 style={headingFont} className="text-2xl sm:text-3xl md:text-4xl text-[#3A3A3A] font-light italic">
              Design &amp; Lifestyle Journal
            </h3>
          </div>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="text-xs uppercase tracking-widest font-mono text-stone-500">
              Page 0{activePageIndex + 1} / 0{articles.length}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handleTurnPrev}
                disabled={isTurning}
                className="w-10 h-10 rounded-full border border-stone-400 flex items-center justify-center text-stone-700 hover:bg-stone-900 hover:text-white transition-all disabled:opacity-50"
                aria-label="Previous Page"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleTurnNext}
                disabled={isTurning}
                className="w-10 h-10 rounded-full border border-stone-400 flex items-center justify-center text-stone-700 hover:bg-stone-900 hover:text-white transition-all disabled:opacity-50"
                aria-label="Next Page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 3D CASCADE MAGAZINE SPREAD CONTAINER */}
        <div className="relative w-full min-h-[550px] lg:min-h-[600px] perspective-[1600px] mb-8">
          <div className="w-full h-full bg-[#FAF9F7] border border-stone-300 shadow-2xl rounded-sm grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
            
            {/* LEFT SPREAD PAGE */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200 bg-[#FAF9F7] relative z-10">
              <div>
                <div className="flex items-center space-x-3 text-[10px] tracking-[0.25em] uppercase font-bold text-stone-400 mb-6">
                  <span className="bg-stone-200 text-stone-800 px-3 py-1">{currentArticle.category}</span>
                  <span>{currentArticle.date}</span>
                  <span>&bull; {currentArticle.readTime}</span>
                </div>

                <h3 style={headingFont} className="text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C] font-normal leading-snug mb-4">
                  {currentArticle.title}
                </h3>
                
                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed mb-8">
                  {currentArticle.subtitle}
                </p>

                <blockquote className="border-l-2 border-stone-800 pl-4 py-1 my-6 bg-stone-100/60">
                  <p style={headingFont} className="text-lg sm:text-xl italic text-stone-700 leading-relaxed">
                    {currentArticle.quote}
                  </p>
                </blockquote>
              </div>

              <div className="pt-6 border-t border-stone-200 flex justify-between items-center">
                <button
                  onClick={() => setCurrentPage('read')}
                  className="bg-[#2C2C2C] text-white px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-stone-900 transition-colors shadow-sm"
                >
                  Read Story &amp; Walkthrough
                </button>
                <button
                  onClick={handleTurnNext}
                  className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 font-medium hidden sm:block"
                >
                  Turn Page &rarr;
                </button>
              </div>
            </div>

            {/* RIGHT SPREAD PAGE WITH 3D CASCADE FLIP */}
            <div className="lg:col-span-6 relative overflow-hidden bg-stone-900 min-h-[350px] lg:min-h-full">
              <div className="absolute inset-0 z-0">
                <img
                  src={nextArticle.img}
                  alt={nextArticle.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              <div
                className={`absolute inset-0 z-10 transition-all duration-500 ease-in-out transform origin-left ${
                  isTurning
                    ? turnDirection === 'next'
                      ? '-rotate-y-90 opacity-0 scale-95'
                      : 'rotate-y-90 opacity-0 scale-95'
                    : 'rotate-y-0 opacity-100 scale-100'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={currentArticle.img}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-stone-300">
                      Editorial Feature &bull; 0{activePageIndex + 1}
                    </span>
                    <p style={headingFont} className="text-xl text-stone-100 font-light">
                      {currentArticle.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Cascading Page Indicators */}
        <div className="flex justify-center items-center space-x-2 pt-2">
          {articles.map((art, idx) => (
            <button
              key={art.id}
              onClick={() => setActivePageIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activePageIndex ? 'w-8 bg-stone-900' : 'w-2 bg-stone-400 hover:bg-stone-600'
              }`}
              aria-label={`Go to article page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ headingFont, setCurrentPage }: { headingFont: React.CSSProperties; setCurrentPage: (page: string) => void; }) => {
  const [activeQuote, setActiveQuote] = useState(0);
  const [currentHeroVideo, setCurrentHeroVideo] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const heroVideos = [videoA, videoB, videoC];

  const quotes = [
    {
      quote: '“Studio McGee has become synonymous with a certain aspirational, attainable American home aesthetic—warm, layered, and endlessly photographable.”',
      source: 'The New York Times'
    },
    {
      quote: '“Shea McGee has redefined modern traditionalism, blending elevated craftsmanship with effortless everyday comfort.”',
      source: 'Architectural Digest'
    },
    {
      quote: '“The ultimate go-to design house for creating serene, timeless, and deeply personal living spaces.”',
      source: 'Vogue'
    }
  ];

  const readArticles = [
    {
      title: 'Strawberries & Cream Cake',
      subtitle: 'A taste of summer nostalgia.',
      category: 'AROUND THE TABLE',
      date: 'JULY 18, 2026',
      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Oxford Road: Episode 6',
      subtitle: 'Final Walkthrough with Shea',
      category: 'DESIGN',
      date: 'JULY 15, 2026',
      img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'The Art of Layering',
      subtitle: 'How to add warmth and depth to any room.',
      category: 'HOW-TO',
      date: 'JULY 2, 2026',
      img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800'
    }
  ];

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.reveal-up');
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setCurrentHeroVideo((prev) => (prev + 1) % heroVideos.length);
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [heroVideos.length]);

  useEffect(() => {
    heroVideoRef.current?.play().catch(() => {});
  }, [currentHeroVideo]);

  return (
    <>
      <section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[88vh] bg-stone-900 flex items-center justify-center overflow-hidden">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={heroVideos[currentHeroVideo]}
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-0"></div>

        <div className="relative z-10 text-white px-6 sm:px-12 lg:px-20 max-w-[100rem] w-full text-left flex flex-col items-start justify-center reveal-up">
          <p className="text-xs sm:text-sm md:text-base tracking-[0.3em] font-light mb-4 text-stone-200 uppercase">
            The Art of Happy Living
          </p>
          <h1 style={headingFont} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight font-light drop-shadow-lg max-w-4xl text-left">
            To Design is to make people Happy
          </h1>
          <button
            onClick={() => setCurrentPage('read')}
            className="border-2 border-white text-white px-10 py-4 text-xs sm:text-sm tracking-[0.25em] uppercase font-medium hover:bg-white hover:text-stone-900 transition-all duration-300"
          >
            Explore Journal
          </button>
        </div>
      </section>

      <CascadeGallery
        headingFont={headingFont}
        setCurrentPage={setCurrentPage}
        title="Read"
        subtitle="Design & Lifestyle"
        targetPage="read"
        buttonText="SEE MORE ARTICLES"
        items={[
          { id: 1, title: 'Strawberries & Cream Cake', subtitle: 'AROUND THE TABLE · JULY 18, 2026', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200' },
          { id: 2, title: 'Oxford Road: Episode 6', subtitle: 'DESIGN · JULY 15, 2026', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200' },
          { id: 3, title: 'The Art of Layering Interiors', subtitle: 'HOW-TO · JULY 2, 2026', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200' },
          { id: 4, title: 'Mixing Wood Tones & Textures', subtitle: 'DESIGN TIPS · JUNE 25, 2026', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200' },
          { id: 5, title: 'Serene Morning Sanctuary', subtitle: 'LIFESTYLE · JUNE 18, 2026', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200' },
          { id: 6, title: 'Open Shelving & Kitchen Styling', subtitle: 'HOW-TO · JUNE 10, 2026', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200' }
        ]}
      />

      <section className="bg-[#4A3525] text-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 w-full overflow-hidden">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start reveal-up">
            <div className="relative w-full max-w-lg aspect-[3/4] overflow-hidden shadow-2xl">
              <AppImage
                src={pexelsDrew}
                alt="Interior Design Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-16 -left-8 sm:-left-12 w-40 sm:w-56 aspect-[3/4] shadow-2xl border-4 border-[#4A3525] overflow-hidden z-20">
              <AppImage
                src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600"
                alt="Material Palette Swatches"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 text-stone-100 reveal-up">
            <h2 style={headingFont} className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 leading-tight">
              New Heritage
            </h2>
            <p style={headingFont} className="text-xl sm:text-2xl lg:text-3xl italic font-light text-[#E2D7CD] mb-8">
              A design house rooted in tradition.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed font-light text-[#D8C8B8] mb-10 max-w-xl">
              For interior designer Shea McGee, design has always been about how a space makes you feel—not just how it looks. Since 2014, that philosophy has shaped Studio McGee and continues to guide every project today. Our New Heritage aesthetic is rooted in classic design principles and traditional craftsmanship, adapted through a modern lens—creating homes that feel collected, comfortable, and effortlessly timeless.
            </p>
            <button
              onClick={() => setCurrentPage('read')}
              className="border border-[#B3A090] text-stone-100 hover:bg-stone-100 hover:text-[#4A3525] uppercase text-[10px] sm:text-[11px] tracking-[0.25em] font-medium px-10 py-4 transition-all duration-300"
            >
              About
            </button>
          </div>
        </div>
      </section>

      <section
        className="text-white py-24 sm:py-32 px-6 sm:px-12 w-full relative border-t border-stone-800 overflow-hidden"
        style={{ minHeight: '420px' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${pexelsBertel})` }}
        />
        {/* Dark overlay to keep text legible */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center reveal-up">
          <p style={headingFont} className="text-xl sm:text-2xl md:text-3xl italic font-light leading-relaxed text-stone-100 mb-10 px-8">
            {quotes[activeQuote].quote}
          </p>
          <p style={headingFont} className="text-md sm:text-lg tracking-[0.2em] uppercase font-semibold text-stone-300 mb-12">
            {quotes[activeQuote].source}
          </p>
          <button
            onClick={() => setActiveQuote((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300 hover:text-white p-4 transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft size={24} strokeWidth={1} />
          </button>
          <button
            onClick={() => setActiveQuote((prev) => (prev === quotes.length - 1 ? 0 : prev + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-300 hover:text-white p-4 transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight size={24} strokeWidth={1} />
          </button>
          <div className="flex justify-center space-x-3 mt-8">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeQuote ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <HorizontalGallery headingFont={headingFont} setCurrentPage={setCurrentPage} />

      <section className="bg-[#F3EFEC] w-full flex flex-col lg:flex-row min-h-[60vh] lg:min-h-[80vh]">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12 sm:p-16 lg:p-20 xl:p-32 reveal-up">
          <div className="max-w-xl w-full">
            <h2 style={headingFont} className="text-4xl sm:text-5xl lg:text-[4.5rem] leading-none text-[#2C2C2C] font-normal mb-1">
              Shop
            </h2>
            <h2 style={headingFont} className="text-4xl sm:text-5xl lg:text-[4.5rem] leading-none text-[#2C2C2C] font-normal mb-8">
              Vizid Designs
            </h2>
            <p className="text-xs sm:text-sm text-stone-800 font-light mb-10 leading-loose max-w-md">
              Vizid Designs brings an elevated designer perspective to home furnishings and décor. From hand-finished details to timeless statement pieces, every element is curated to make your home feel extraordinary.
            </p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="border border-stone-800 text-stone-900 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-medium px-8 py-3.5 hover:bg-stone-900 hover:text-white transition-colors duration-300"
            >
              Shop New Arrivals
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-full reveal-up">
          <AppImage
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
            alt="Vizid Designs Living Room"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-12 flex justify-center text-center">
            <h3 style={headingFont} className="text-4xl sm:text-5xl lg:text-6xl text-white font-normal drop-shadow-lg">
              Made to Matter
            </h3>
          </div>
        </div>
      </section>
    </>
  );
};

interface ShopProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  img: string;
  badge?: string;
  secondaryBadge?: string;
}

const ShopPage = ({ headingFont, setCurrentPage }: { headingFont: React.CSSProperties; setCurrentPage?: (page: string) => void; }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Products');
  const [gridCols, setGridCols] = useState<number>(3);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<string>('');

  // Listen for Supabase auth state (handles Google OAuth redirect)
  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
        setIsSignInOpen(false);
      }
    });

    // Subscribe to future auth changes (sign in / sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email);
        setIsSignInOpen(false);
      } else {
        setUserEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setUserEmail(emailInput.trim());
      setIsSignInOpen(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const roomCategories = [
    { name: 'Dining Room', category: 'Furniture', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=800' },
    { name: 'Living Room', category: 'Furniture', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800' },
    { name: 'Tabletop', category: 'Decor & Mirrors', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
    { name: 'Decor', category: 'Decor & Mirrors', img: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=800' },
    { name: 'Bedroom', category: 'Furniture', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800' },
    { name: 'Curated by Shea', category: 'All Products', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' }
  ];

  const filterAccordionItems = [
    'Product type', 'Availability', 'Price', 'Fabric', 'Finish', 'Size', 'Material', 'Technique', 'Configuration', 'Color', 'Bedding Fabric'
  ];

  const products: ShopProduct[] = [
    { id: 1, name: 'Antoinette Coffee Table Ottoman', price: '$1,995.00', category: 'Furniture', badge: 'Curated by Shea', secondaryBadge: 'New', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Striped Oak & Linen Memo Board', price: '$268.00', category: 'Decor & Mirrors', badge: 'New', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Rafaella Dining Chair', price: '$895.00', category: 'Furniture', badge: 'Curated by Shea', secondaryBadge: 'New', img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Howell Upholstered Sofa', price: '$2,400.00', category: 'Furniture', badge: 'New', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800' },
    { id: 5, name: 'Arch Brass Wall Mirror', price: '$580.00', category: 'Decor & Mirrors', badge: 'Curated by Shea', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800' },
    { id: 6, name: 'Ceramic Table Lamp', price: '$350.00', category: 'Lighting', badge: 'New', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800' },
    { id: 7, name: 'Woven Neutral Area Rug', price: '$899.00', category: 'Rugs', badge: 'Curated by Shea', img: 'https://images.unsplash.com/photo-1575037614876-c385bbd82ef5?auto=format&fit=crop&q=80&w=800' },
    { id: 8, name: 'Abstract Layered Wall Art', price: '$650.00', category: 'Art', badge: 'New', img: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&q=80&w=800' },
    { id: 9, name: 'Vintage Walnut Sideboard', price: '$2,850.00', category: 'Furniture', badge: 'Curated by Shea', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800' }
  ];

  const filteredProducts = products.filter(
    (p) => activeCategory === 'All Products' || p.category === activeCategory
  );

  const toggleAccordion = (name: string) => {
    setOpenAccordions((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleAddToCart = (name: string) => {
    if (!userEmail) {
      setIsSignInOpen(true);
      return;
    }
    setCartItemsCount((prev) => prev + 1);
    setAddedItemName(name);
    setTimeout(() => setAddedItemName(null), 3000);
  };

  const handleIconAction = () => {
    if (!userEmail) {
      setIsSignInOpen(true);
    } else {
      setActiveCategory('All Products');
    }
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.reveal-up');
      elements.forEach((el, index) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: (index % 4) * 0.05
          }
        );
      });
    });
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="w-full bg-white min-h-screen text-stone-900 overflow-x-hidden pt-4">
      {/* SUB-CATEGORY NAV LINKS BAR */}
      <div className="bg-white border-b border-stone-200 py-3 px-4 sm:px-8 text-[11px] font-medium text-stone-800 uppercase tracking-wider overflow-x-auto flex justify-center space-x-6 sm:space-x-8 whitespace-nowrap">
        <button onClick={() => setActiveCategory('All Products')} className={`hover:text-stone-500 transition-colors ${activeCategory === 'All Products' ? 'border-b-2 border-stone-900 pb-1 font-bold' : ''}`}>New!</button>
        <button onClick={() => setActiveCategory('Furniture')} className="hover:text-stone-500 transition-colors">Best Sellers</button>
        <button onClick={() => setActiveCategory('Furniture')} className={`hover:text-stone-500 transition-colors ${activeCategory === 'Furniture' ? 'border-b-2 border-stone-900 pb-1 font-bold' : ''}`}>Furniture</button>
        <button onClick={() => setActiveCategory('Furniture')} className="hover:text-stone-500 transition-colors">Outdoor</button>
        <button onClick={() => setActiveCategory('Lighting')} className={`hover:text-stone-500 transition-colors ${activeCategory === 'Lighting' ? 'border-b-2 border-stone-900 pb-1 font-bold' : ''}`}>Lighting</button>
        <button onClick={() => setActiveCategory('Rugs')} className={`hover:text-stone-500 transition-colors ${activeCategory === 'Rugs' ? 'border-b-2 border-stone-900 pb-1 font-bold' : ''}`}>Rugs</button>
        <button onClick={() => setActiveCategory('Decor & Mirrors')} className={`hover:text-stone-500 transition-colors ${activeCategory === 'Decor & Mirrors' ? 'border-b-2 border-stone-900 pb-1 font-bold' : ''}`}>Decor &amp; Pillows</button>
        <button onClick={() => setActiveCategory('Art')} className={`hover:text-stone-500 transition-colors ${activeCategory === 'Art' ? 'border-b-2 border-stone-900 pb-1 font-bold' : ''}`}>Wall Decor</button>
        <button onClick={() => setActiveCategory('Furniture')} className="hover:text-stone-500 transition-colors">Bed &amp; Bath</button>
        <button onClick={() => setActiveCategory('Decor & Mirrors')} className="hover:text-stone-500 transition-colors">Kitchen &amp; Dining</button>
        <button onClick={() => setActiveCategory('Decor & Mirrors')} className="hover:text-stone-500 transition-colors">Kids</button>
        <button onClick={() => setActiveCategory('All Products')} className="text-amber-800 hover:text-amber-900 font-semibold transition-colors">Clearance</button>
      </div>

      {/* MAIN TITLE MATCHING SCREENSHOT 1 WITH TOP RIGHT SHOP ACTION ICONS */}
      <div className="w-full px-4 sm:px-8 mb-8 flex justify-between items-center">
        <h1 style={headingFont} className="text-4xl sm:text-5xl lg:text-6xl text-[#2C2C2C] font-normal">
          {activeCategory === 'All Products' ? 'All New Arrivals' : activeCategory}
        </h1>

        {/* TOP RIGHT CORNER ICONS OF THE SHOP SECTION */}
        <div className="flex items-center space-x-5 text-stone-800">
          <button onClick={() => setIsSignInOpen(true)} className="hover:text-stone-500 transition-colors p-1 relative" aria-label="Sign In">
            <User size={22} />
            {userEmail && (
              <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 w-2.5 h-2.5 rounded-full border border-white"></span>
            )}
          </button>
          <button onClick={handleIconAction} className="hover:text-stone-500 transition-colors p-1 relative" aria-label="Saved Wishlist">
            <Heart size={22} />
          </button>
          <button onClick={handleIconAction} className="hover:text-stone-500 transition-colors p-1 relative" aria-label="Shopping Cart">
            <ShoppingBag size={22} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. ROOM CATEGORIES STRIP FULL WIDTH MATCHING SCREENSHOT 1 */}
      <div className="w-full px-4 sm:px-8 mb-16 relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {roomCategories.map((room, idx) => (
            <div
              key={idx}
              onClick={() => setActiveCategory(room.category)}
              className="cursor-pointer group text-left reveal-up"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 mb-2.5 shadow-xs rounded-none">
                <AppImage
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <p className="text-xs sm:text-sm text-stone-900 font-normal group-hover:text-stone-600 transition-colors">
                {room.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FILTER BAR & PRODUCT COUNT MATCHING SCREENSHOT 2 */}
      <div className="border-t border-b border-stone-200 bg-white py-3.5 px-4 sm:px-8 sticky top-20 z-30 shadow-xs w-full">
        <div className="w-full flex items-center justify-between">
          {/* Left Grid Layout Toggle Icons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 border transition-colors ${gridCols === 2 ? 'border-stone-900 bg-stone-100 text-stone-900' : 'border-stone-300 text-stone-400'}`}
              aria-label="2 Columns"
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current"></div>
                <div className="bg-current"></div>
              </div>
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 border transition-colors ${gridCols === 3 ? 'border-stone-900 bg-stone-100 text-stone-900' : 'border-stone-300 text-stone-400'}`}
              aria-label="3 Columns"
            >
              <div className="w-4 h-4 grid grid-cols-3 gap-0.5">
                <div className="bg-current"></div>
                <div className="bg-current"></div>
                <div className="bg-current"></div>
              </div>
            </button>
          </div>

          {/* Center Product Count */}
          <span className="text-xs text-stone-500 font-light">
            {filteredProducts.length} products
          </span>

          {/* Right Sort By Dropdown */}
          <div className="flex items-center space-x-2 text-xs text-stone-700">
            <span>Sort by</span>
            <select className="bg-transparent font-medium border-none focus:outline-none cursor-pointer pr-2">
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. MAIN CONTENT SIDEBAR & PRODUCT CATALOG GRID (SCREENSHOT 2 FULL WIDTH) */}
      <div className="w-full px-4 sm:px-8 py-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Sidebar Filter Accordions */}
        <div className="w-full lg:w-64 shrink-0 text-left">
          <div className="space-y-4 border-t border-stone-200">
            {filterAccordionItems.map((item) => {
              const isOpen = openAccordions.includes(item);
              return (
                <div key={item} className="border-b border-stone-200 pb-3.5 pt-3">
                  <button
                    onClick={() => toggleAccordion(item)}
                    className="w-full flex justify-between items-center text-sm sm:text-base font-medium text-stone-900 hover:text-stone-600 transition-colors"
                  >
                    <span>{item}</span>
                    <span className="text-stone-500 text-sm font-light">{isOpen ? '−' : '∨'}</span>
                  </button>
                  {isOpen && (
                    <div className="mt-3.5 pl-2 space-y-2.5 text-xs sm:text-sm text-stone-600 font-light">
                      <label className="flex items-center space-x-2.5 cursor-pointer">
                        <input type="checkbox" className="rounded-none border-stone-300 w-4 h-4" />
                        <span>All Options</span>
                      </label>
                      <label className="flex items-center space-x-2.5 cursor-pointer">
                        <input type="checkbox" className="rounded-none border-stone-300 w-4 h-4" />
                        <span>In Stock Only</span>
                      </label>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Product Grid Catalog */}
        <div className="flex-grow">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-x-8 gap-y-12`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer text-left reveal-up">
                {/* Image Container with Badges & Hover Add To Cart */}
                <div className="relative aspect-[4/5] w-full bg-stone-100 overflow-hidden mb-4 rounded-xs shadow-xs">
                  <AppImage
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top Badges matching Screenshot 2 */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
                    {product.badge && (
                      <span className="bg-white/90 backdrop-blur-md text-stone-900 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 border border-stone-200">
                        {product.badge}
                      </span>
                    )}
                    {product.secondaryBadge && (
                      <span className="bg-white/90 backdrop-blur-md text-stone-900 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 border border-stone-200">
                        {product.secondaryBadge}
                      </span>
                    )}
                  </div>

                  {/* White Add to Cart Hover Button matching Screenshot 2 */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleAddToCart(product.name)}
                      className="w-full bg-white text-stone-900 text-[10px] tracking-[0.2em] font-semibold uppercase py-3 shadow-md hover:bg-[#2C2C2C] hover:text-white transition-colors duration-300"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>

                {/* Text Details matching Screenshot 2 */}
                <h3 className="text-xs sm:text-sm text-stone-900 font-normal leading-snug mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-600 font-light">
                  {product.price}
                </p>
              </div>
            ))}
          </div>

          {/* Added Item Notification Toast */}
          {addedItemName && (
            <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 shadow-xl text-xs font-light flex items-center space-x-3 border border-stone-700 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Added <strong>{addedItemName}</strong> to cart</span>
            </div>
          )}
        </div>
      </div>

      {/* SIGN IN EMAIL MODAL */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white max-w-md w-full p-8 sm:p-10 shadow-2xl relative border border-stone-200 text-left">
            <button
              onClick={() => setIsSignInOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition-colors p-1"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h2 style={headingFont} className="text-3xl text-stone-900 font-normal mb-2">
                {userEmail ? 'Your Account' : 'Sign In'}
              </h2>
              <p className="text-xs text-stone-500 font-light">
                {userEmail ? 'Logged in to Vizid Shop' : 'Enter your email to continue.'}
              </p>
            </div>

            {userEmail ? (
              <div className="space-y-5 text-center">
                <div className="bg-stone-50 border border-stone-200 py-3.5 px-4 text-xs font-medium text-stone-800 tracking-wide">
                  {userEmail}
                </div>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setUserEmail(null);
                    setEmailInput('');
                  }}
                  className="w-full bg-stone-900 text-white text-xs font-medium uppercase tracking-[0.2em] py-3.5 hover:bg-stone-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border border-stone-300 px-4 py-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white text-xs font-medium uppercase tracking-[0.2em] py-3.5 hover:bg-stone-800 transition-colors"
                >
                  Continue
                </button>

                <div className="relative my-4 flex items-center justify-center">
                  <div className="border-t border-stone-200 w-full"></div>
                  <span className="bg-white px-3 text-[10px] uppercase tracking-widest text-stone-400 font-medium shrink-0 absolute">
                    or
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full border border-stone-300 bg-white text-stone-800 text-xs font-medium uppercase tracking-[0.15em] py-3.5 hover:bg-stone-50 transition-colors flex items-center justify-center space-x-3 shadow-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PortfolioPage = ({ headingFont }: { headingFont: React.CSSProperties; }) => {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.reveal-up');
      elements.forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    });
    return () => ctx.revert();
  }, []);

  const projects = [
    { title: 'The Crestview Project', location: 'Austin, TX', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200', type: 'full' },
    { title: 'Mountainside Retreat', location: 'Park City, UT', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800', type: 'half' },
    { title: 'Coastal Haven', location: 'Newport Beach, CA', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800', type: 'half' },
    { title: 'Modern Tudor', location: 'Chicago, IL', img: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200', type: 'full' }
  ];

  return (
    <div className="w-full bg-white">
      <div className="py-20 sm:py-32 px-4 text-center max-w-3xl mx-auto reveal-up">
        <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-stone-500 mb-6">Interior Design Studio</p>
        <h1 style={headingFont} className="text-4xl sm:text-5xl md:text-6xl text-[#2C2C2C] mb-8 leading-tight">Our Portfolio</h1>
        <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
          Explore our recent projects, from full-scale residential builds to intimate room refreshes. We believe in creating spaces that are both beautifully curated and deeply livable.
        </p>
      </div>
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col space-y-8 sm:space-y-16">
          {projects.map((project, idx) => {
            if (project.type === 'full') {
              return (
                <div key={idx} className="group cursor-pointer relative overflow-hidden w-full h-[50vh] sm:h-[70vh] lg:h-[90vh] reveal-up">
                  <AppImage src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold mb-2">{project.location}</p>
                    <h2 style={headingFont} className="text-3xl sm:text-4xl md:text-5xl">{project.title}</h2>
                  </div>
                </div>
              );
            }
            return null;
          })}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
            {projects.filter((p) => p.type === 'half').map((project, idx) => (
              <div key={idx} className="group cursor-pointer flex flex-col reveal-up">
                <div className="w-full aspect-[4/5] overflow-hidden mb-6 relative">
                  <AppImage src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-500 mb-2">{project.location}</p>
                  <h2 style={headingFont} className="text-2xl sm:text-3xl text-[#2C2C2C]">{project.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ReadPage imported from ReadPage.tsx

const AboutPage = ({ headingFont, setCurrentPage }: { headingFont: React.CSSProperties; setCurrentPage: (page: string) => void }) => {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.reveal-up');
      elements.forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    });
    return () => ctx.revert();
  }, []);

  const team = [
    {
      name: 'Shea McGee',
      role: 'Co-Founder & Creative Director',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      bio: 'With an eye for timeless beauty and a passion for creating homes that truly reflect the people who live in them, Shea leads the creative vision of Vizid.'
    },
    {
      name: 'Syd McGee',
      role: 'Co-Founder & CEO',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
      bio: 'Syd oversees business strategy, growth, and operations—ensuring that every client experience is as seamless and elevated as the spaces we create.'
    },
    {
      name: 'Claire Wickström',
      role: 'Principal Designer',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
      bio: 'Claire brings warmth and architectural rigor to every project, specializing in layered interiors that feel collected over a lifetime.'
    }
  ];

  const values = [
    { title: 'Timeless Craft', desc: 'We invest in quality materials and artisanal techniques that age beautifully and tell a story.' },
    { title: 'Deeply Personal', desc: 'Every space we create is a reflection of the people who inhabit it—not a trend or a formula.' },
    { title: 'Effortless Living', desc: 'Beautiful homes should also be livable. We design for the way real families actually live.' },
    { title: 'Curated Restraint', desc: 'We believe in editing thoughtfully—choosing fewer, better things that hold meaning and last.' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <div className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden">
        <AppImage
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600"
          alt="About Vizid studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 reveal-up">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-stone-300 mb-4">Our Story</p>
          <h1 style={headingFont} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight">
            Designed to Feel
          </h1>
          <p style={headingFont} className="text-2xl sm:text-3xl italic font-light text-stone-200 mt-2">Like Home</p>
        </div>
      </div>

      {/* Mission statement */}
      <section className="bg-[#F4F0EB] py-20 sm:py-28 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center reveal-up">
          <p style={headingFont} className="text-3xl sm:text-4xl md:text-5xl text-[#2C2C2C] font-light leading-relaxed mb-8">
            "We believe a home is the most personal expression of who you are."
          </p>
          <p className="text-sm sm:text-base text-stone-600 font-light leading-loose max-w-2xl mx-auto">
            Since 2014, Vizid has been crafting interiors that balance elevated craftsmanship with everyday comfort. Our work is guided by a simple truth: the most beautiful spaces are the ones where people feel deeply at home.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#2C2C2C] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[90rem] mx-auto">
          <div className="text-center mb-16 reveal-up">
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-400 mb-4">What We Stand For</p>
            <h2 style={headingFont} className="text-4xl sm:text-5xl text-white font-light">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {values.map((v, i) => (
              <div key={i} className="reveal-up border-t border-stone-600 pt-8">
                <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-stone-400 mb-4">0{i + 1}</p>
                <h3 style={headingFont} className="text-2xl text-white font-normal mb-4">{v.title}</h3>
                <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story section with image */}
      <section className="bg-white py-20 sm:py-32 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative reveal-up">
            <div className="w-full aspect-[4/5] overflow-hidden">
              <AppImage
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=900"
                alt="Vizid design studio interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-6 w-40 sm:w-52 aspect-square overflow-hidden shadow-2xl border-4 border-white">
              <AppImage
                src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=400"
                alt="Material swatches"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="reveal-up">
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-400 mb-6">Est. 2014</p>
            <h2 style={headingFont} className="text-4xl sm:text-5xl lg:text-6xl text-[#2C2C2C] font-light leading-tight mb-6">
              A Decade of
            </h2>
            <h2 style={headingFont} className="text-4xl sm:text-5xl lg:text-6xl text-[#2C2C2C] font-light italic leading-tight mb-8">
              Beautiful Living
            </h2>
            <p className="text-sm text-stone-600 font-light leading-loose mb-6">
              What began as a small design practice in Utah has grown into a nationally recognized studio, TV series, and home furnishings brand—all rooted in the same founding principle: design should make people happy.
            </p>
            <p className="text-sm text-stone-600 font-light leading-loose">
              Our process is deeply collaborative. We listen before we design, and we never stop asking: does this space feel like the people who live here? That question drives everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#F4F0EB] py-20 sm:py-28 px-6 sm:px-12 lg:px-24">
        <div className="max-w-[90rem] mx-auto">
          <div className="text-center mb-16 reveal-up">
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-400 mb-4">The People Behind The Work</p>
            <h2 style={headingFont} className="text-4xl sm:text-5xl text-[#2C2C2C] font-light">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {team.map((member, i) => (
              <div key={i} className="group reveal-up">
                <div className="w-full aspect-[3/4] overflow-hidden mb-6">
                  <AppImage
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-[9px] tracking-[0.25em] uppercase font-bold text-stone-400 mb-1">{member.role}</p>
                <h3 style={headingFont} className="text-2xl sm:text-3xl text-[#2C2C2C] font-normal mb-3">{member.name}</h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#4A4F4C] text-white py-20 sm:py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto reveal-up">
          <h2 style={headingFont} className="text-4xl sm:text-5xl font-light mb-6">Ready to Start Your Project?</h2>
          <p className="text-sm text-stone-400 font-light mb-10 max-w-lg mx-auto">Let's create a home that truly reflects who you are. Reach out to begin the conversation.</p>
          <button
            onClick={() => setCurrentPage('work')}
            className="border border-white/70 text-white px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-white hover:text-[#4A4F4C] transition-all duration-300 rounded-sm"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
};

const ProfilePage = ({ headingFont }: { headingFont: React.CSSProperties; }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.auth-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });
    });
    return () => ctx.revert();
  }, [isSignIn]);

  return (
    <div className="w-full bg-[#F9F9F8] min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white p-8 sm:p-12 shadow-sm border border-stone-200 auth-card">
        <div className="flex justify-center space-x-8 mb-10 border-b border-stone-200">
          <button onClick={() => setIsSignIn(true)} className={`pb-4 text-[11px] tracking-[0.2em] uppercase font-bold transition-colors ${isSignIn ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'}`}>Sign In</button>
          <button onClick={() => setIsSignIn(false)} className={`pb-4 text-[11px] tracking-[0.2em] uppercase font-bold transition-colors ${!isSignIn ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'}`}>Create Account</button>
        </div>
        <h2 style={headingFont} className="text-3xl text-[#2C2C2C] mb-8 text-center">
          {isSignIn ? 'Welcome Back' : 'Join Studio McGee'}
        </h2>
        <form className="space-y-5">
          {!isSignIn && (
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full p-3 bg-[#F9F9F8] border border-stone-200 text-sm focus:outline-none focus:border-stone-400" />
              <input type="text" placeholder="Last Name" className="w-full p-3 bg-[#F9F9F8] border border-stone-200 text-sm focus:outline-none focus:border-stone-400" />
            </div>
          )}
          <input type="email" placeholder="Email Address" className="w-full p-3 bg-[#F9F9F8] border border-stone-200 text-sm focus:outline-none focus:border-stone-400" />
          <input type="password" placeholder="Password" className="w-full p-3 bg-[#F9F9F8] border border-stone-200 text-sm focus:outline-none focus:border-stone-400" />
          {isSignIn && <p className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer text-right">Forgot password?</p>}
          <button type="button" className="w-full bg-[#2C2C2C] text-white py-4 text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-stone-900 transition-colors mt-6">
            {isSignIn ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState<'virtual' | 'full'>('virtual');
  const [selectedReadCategory, setSelectedReadCategory] = useState<string>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    let rafId: number;
    function updateLenis(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(updateLenis);
    }
    rafId = requestAnimationFrame(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
  }, [currentPage]);

  const headingFont = { fontFamily: "'Cormorant Garamond', serif" };
  const bodyFont = { fontFamily: "'Montserrat', sans-serif" };

  const renderPage = () => {
    switch (currentPage) {
      case 'work':
        return (
          <WorkWithUsPage
            headingFont={headingFont}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        );
      case 'shop':
        return <ShopPage headingFont={headingFont} />;
      case 'portfolio':
        return <PortfolioPage headingFont={headingFont} />;
      case 'about':
        return <AboutPage headingFont={headingFont} setCurrentPage={setCurrentPage} />;
      case 'read':
        return (
          <ReadPage
            headingFont={headingFont}
            selectedCategory={selectedReadCategory}
            setSelectedCategory={setSelectedReadCategory}
          />
        );
      case 'profile':
        return (
          <WorkWithUsPage
            headingFont={headingFont}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        );
      case 'home':
      default:
        return <HomePage headingFont={headingFont} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={bodyFont} className="min-h-screen bg-[#F9F9F8] text-[#2C2C2C] flex flex-col w-full overflow-x-hidden">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        headingFont={headingFont}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setSelectedService={setSelectedService}
        setSelectedReadCategory={setSelectedReadCategory}
      />
      <main className="flex-grow w-full">
        {renderPage()}
      </main>
      <Footer headingFont={headingFont} setCurrentPage={setCurrentPage} setSelectedService={setSelectedService} />
    </div>
  );
}
