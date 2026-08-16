import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X, MessageCircle, Globe, Play, ChevronRight, ChevronLeft, Filter, Heart, CheckCircle } from 'lucide-react';
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
import { VizidDecorAcademyPage } from './VizidDecorAcademyPage';
import { AdminPage } from './AdminPage';
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
              <button onClick={() => handleNav('shop')} className="text-white hover:text-stone-300 transition-colors" aria-label="Shop">
                <ShoppingBag size={18} />
              </button>
            </div>

            <div className="border-l border-stone-500/50 pl-8 h-8 flex flex-col justify-center items-start">
              <button onClick={() => handleNav('academy')} className="text-[11px] tracking-[0.15em] uppercase font-medium hover:text-stone-300 transition-colors">
                Vizid Decor Academy
              </button>
              <button onClick={() => handleNav('academy')} className="text-[8px] tracking-[0.2em] uppercase font-light text-stone-300 hover:text-white transition-colors">
                Learn & Enroll
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 lg:hidden">
            <button onClick={() => handleNav('shop')} className="p-1 text-white" aria-label="Shop">
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
            <button onClick={() => handleNav('academy')} className="uppercase tracking-widest">Vizid Decor Academy</button>
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
}) => {
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'accessibility' | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setNewsletterSubscribed(true);
  };

  return (
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
          {newsletterSubscribed ? (
            <div className="max-w-md space-y-3">
              <div className="flex items-center space-x-2.5 text-xs text-emerald-400 bg-stone-800/90 p-3.5 border border-emerald-500/30">
                <CheckCircle size={18} className="shrink-0 text-emerald-400" />
                <span>You're subscribed! Welcome to the Vizid circle.</span>
              </div>
              <a
                href={`https://wa.me/2348121819461?text=${encodeURIComponent(`✨ *NEW VIZID NEWSLETTER SUBSCRIBER*\n\n📧 *Email:* ${emailInput.trim()}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[10px] tracking-[0.15em] uppercase font-medium text-stone-400 hover:text-white transition-colors"
              >
                Notify admin via WhatsApp →
              </a>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md space-y-1.5" noValidate>
              <div className="flex">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="Enter your email address"
                  className="bg-stone-800 border border-stone-700 text-xs px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-stone-400 w-full"
                />
                <button
                  type="submit"
                  className="bg-stone-100 text-stone-900 text-[10px] tracking-[0.2em] uppercase font-semibold px-6 hover:bg-stone-300 transition-colors shrink-0"
                >
                  Join
                </button>
              </div>
              {emailError && (
                <p className="text-[10px] text-red-400 font-light">{emailError}</p>
              )}
            </form>
          )}
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
            <li><button onClick={() => setCurrentPage?.('academy')} className="hover:text-white transition-colors">Vizid Decor Academy</button></li>
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

      <div className="max-w-[100rem] mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] sm:text-xs text-stone-400 font-light space-y-4 md:space-y-0 text-center md:text-left">
        <p>© {new Date().getFullYear()} Vizid. All rights reserved.</p>
        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3">
          <button
            onClick={() => setActiveLegalModal('privacy')}
            className="hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveLegalModal('terms')}
            className="hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveLegalModal('accessibility')}
            className="hover:text-white transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Accessibility Statement
          </button>
        </div>
      </div>

      {/* Legal Modals */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FAF9F7] text-[#2C2C2C] max-w-2xl w-full p-6 sm:p-10 relative border border-stone-300 shadow-2xl max-h-[85vh] overflow-y-auto rounded-none">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-6 right-6 p-2 text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Close dialog"
            >
              <X size={22} />
            </button>

            {activeLegalModal === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.25em] font-semibold uppercase text-stone-500">Vizid Studio Governance</span>
                  <h3 style={headingFont} className="text-3xl font-normal text-[#2C2C2C] mt-1">Privacy Policy</h3>
                  <p className="text-[11px] text-stone-500 mt-1">Last Updated: August 2026</p>
                </div>
                <div className="space-y-4 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  <p>Vizid Studio ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">1. Information We Collect</h4>
                  <p>We collect information you provide directly through inquiry forms, newsletter signups, and Vizid Decor Academy applications—including name, email address, phone number, location, and project preferences.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">2. How We Use Information</h4>
                  <p>Your details are used exclusively to provide bespoke interior design consultations, deliver academy programs, process trade requests, and send studio updates. We do not sell or rent your personal data to third parties.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">3. Data Security & Storage</h4>
                  <p>We implement technical and organizational security measures to protect your information against unauthorized access, alteration, or disclosure.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">4. Contact Us</h4>
                  <p>If you have questions regarding this Privacy Policy, please contact privacy@vizid.studio or WhatsApp us at +234 812 181 9461.</p>
                </div>
              </div>
            )}

            {activeLegalModal === 'terms' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.25em] font-semibold uppercase text-stone-500">Vizid Studio Governance</span>
                  <h3 style={headingFont} className="text-3xl font-normal text-[#2C2C2C] mt-1">Terms of Service</h3>
                  <p className="text-[11px] text-stone-500 mt-1">Last Updated: August 2026</p>
                </div>
                <div className="space-y-4 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  <p>By accessing the Vizid Studio website or enrolling in Vizid Decor Academy, you agree to comply with and be bound by the following terms.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">1. Scope of Services</h4>
                  <p>Design consultations, virtual spatial plans, and full-service residential interior projects are performed under separate project contracts specifying scope, deliverables, and timelines.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">2. Intellectual Property</h4>
                  <p>All design concepts, 3D renderings, mood boards, photography, logo marks, and educational materials displayed on this platform remain the exclusive intellectual property of Vizid Studio.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">3. Academy Enrollment</h4>
                  <p>Enrollment in Vizid Decor Academy grants non-exclusive access to course modules and studio mentorship. Course assets and proprietary curriculum may not be redistributed.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">4. Governing Law</h4>
                  <p>These terms shall be governed and construed in accordance with applicable laws governing professional interior design practices.</p>
                </div>
              </div>
            )}

            {activeLegalModal === 'accessibility' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.25em] font-semibold uppercase text-stone-500">Inclusive Design</span>
                  <h3 style={headingFont} className="text-3xl font-normal text-[#2C2C2C] mt-1">Accessibility Statement</h3>
                  <p className="text-[11px] text-stone-500 mt-1">Last Updated: August 2026</p>
                </div>
                <div className="space-y-4 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  <p>Vizid Studio is committed to digital accessibility and ensuring that our online platform is accessible to individuals of all abilities, adhering to WCAG 2.1 Level AA recommendations.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">1. Accessibility Features</h4>
                  <p>Our website incorporates semantic HTML structure, high color contrast ratios, screen-reader aria labels, responsive layouts across all device viewports, and keyboard focus states.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">2. Ongoing Improvements</h4>
                  <p>We continually monitor and update our interfaces to ensure seamless usability for users leveraging screen readers, keyboard-only navigation, or custom display settings.</p>
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">3. Feedback & Assistance</h4>
                  <p>If you experience any accessibility barriers while navigating our site, please reach out to us at accessibility@vizid.studio or WhatsApp +234 812 181 9461 for direct assistance.</p>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-stone-200 text-right">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="bg-[#2C2C2C] text-white text-xs tracking-[0.2em] uppercase font-semibold px-8 py-3 hover:bg-stone-800 transition-colors"
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

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

/* ─── Types ─── */
interface ShopProduct {
  id: number;
  name: string;
  category: string;
  priceNaira: number;   // price in Naira
  img: string;
  badge?: string;
  secondaryBadge?: string;
  description?: string;
  height?: 'short' | 'tall' | 'medium'; // for masonry variety
}

interface CartItem extends ShopProduct {
  qty: number;
}

/* ─── Helpers ─── */
const formatNaira = (n: number) =>
  '₦' + n.toLocaleString('en-NG');

/* ─── Cart Drawer (Jumia-style) ─── */
const CartDrawer = ({
  open,
  onClose,
  items,
  onRemove,
  onChangeQty,
  headingFont,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onChangeQty: (id: number, delta: number) => void;
  headingFont: React.CSSProperties;
}) => {
  const total = items.reduce((sum, i) => sum + i.priceNaira * i.qty, 0);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-[#f7f7f7]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#4A4F4C]" />
            <span className="font-bold text-[#2C2C2C] text-base" style={headingFont}>
              My Cart
            </span>
            {items.length > 0 && (
              <span className="bg-[#f68b1e] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
              <ShoppingBag size={56} className="text-gray-200" />
              <p className="text-gray-500 text-sm font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-xs">Add items from the shop to get started</p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#f68b1e] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-orange-500 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  <AppImage
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#2C2C2C] leading-tight line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                  <p className="text-[#f68b1e] font-bold text-sm mt-1">
                    {formatNaira(item.priceNaira)}
                  </p>

                  {/* Qty + Remove */}
                  <div className="flex items-center justify-between mt-2">
                    {/* Qty stepper */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => onChangeQty(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[#2C2C2C]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onChangeQty(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-[11px] text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      <X size={12} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4 bg-[#f7f7f7] space-y-3">
            {/* Summary rows */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span className="font-semibold text-[#2C2C2C]">{formatNaira(total)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery fee</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#2C2C2C] pt-1 border-t border-gray-200">
              <span>Total</span>
              <span className="text-[#f68b1e]">{formatNaira(total)}</span>
            </div>

            {/* CTA */}
            <button className="w-full bg-[#f68b1e] hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl text-sm tracking-wide uppercase transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2">
              <CheckCircle size={16} />
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gray-300 text-gray-600 hover:bg-gray-100 font-medium py-2.5 rounded-xl text-sm transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

/* ─── Product Detail Modal ─── */
const ProductDetailModal = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  headingFont,
}: {
  product: ShopProduct;
  onClose: () => void;
  onAddToCart: (p: ShopProduct) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  headingFont: React.CSSProperties;
}) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-gray-100 p-2 rounded-full shadow-md transition-colors"
        >
          <X size={18} className="text-gray-700" />
        </button>

        {/* Image */}
        <div className="md:w-1/2 bg-gray-100 relative overflow-hidden" style={{ minHeight: 300 }}>
          <AppImage
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
            style={{ minHeight: 300 }}
          />
          {/* Wishlist on modal */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="absolute top-4 left-4 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-md transition-all"
          >
            <Heart
              size={20}
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}
            />
          </button>
          {product.badge && (
            <span className="absolute bottom-4 left-4 bg-[#f68b1e] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-7 flex flex-col justify-between overflow-y-auto">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-1">
              {product.category}
            </p>
            <h2 style={headingFont} className="text-2xl md:text-3xl text-[#2C2C2C] font-normal leading-tight mb-3">
              {product.name}
            </h2>

            {/* Price badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 mb-5">
              <svg className="w-4 h-4 text-[#f68b1e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M3 5a2 2 0 012-2h4.586a1 1 0 01.707.293l9.414 9.414a2 2 0 010 2.828l-4.586 4.586a2 2 0 01-2.828 0L3.707 8.707A1 1 0 013 8V5z" />
              </svg>
              <span className="text-[#f68b1e] font-bold text-xl">{formatNaira(product.priceNaira)}</span>
            </div>

            <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
              {product.description ||
                'A beautifully crafted piece designed to elevate any interior space. Each item is carefully selected to reflect timeless elegance and modern luxury.'}
            </p>

            {/* Qty selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs uppercase tracking-widest font-medium text-gray-500">Qty</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-lg transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#2C2C2C]">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg ${
                added
                  ? 'bg-green-500 text-white shadow-green-200'
                  : 'bg-[#2C2C2C] hover:bg-[#f68b1e] text-white shadow-gray-200 hover:shadow-orange-200'
              }`}
            >
              {added ? (
                <><CheckCircle size={16} /> Added to Cart!</>
              ) : (
                <><ShoppingBag size={16} /> Add to Cart</>
              )}
            </button>
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 hover:border-red-400 text-gray-600 hover:text-red-500 font-medium text-sm transition-all"
            >
              <Heart size={15} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
              {isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Studio McGee-style Product Card ─── */
const ShopCard = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClick,
}: {
  product: ShopProduct;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  onAddToCart: (p: ShopProduct) => void;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="shop-card group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Square Image container */}
      <div
        className="relative w-full overflow-hidden bg-[#f5f3f0]"
        style={{ aspectRatio: '1 / 1' }}
        onClick={onClick}
      >
        <AppImage
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Badge chips */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {product.badge && (
            <span className="bg-white text-[#2C2C2C] text-[9px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className={`absolute top-3 right-3 p-2 bg-white shadow-sm transition-all duration-200 ${
            isWishlisted ? 'opacity-100' : hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Heart
            size={15}
            className={isWishlisted ? 'fill-[#8B6F47] text-[#8B6F47]' : 'text-[#2C2C2C]'}
          />
        </button>

        {/* Add to Cart — slide up */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out"
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="w-full bg-white/95 hover:bg-[#2C2C2C] hover:text-white text-[#2C2C2C] text-[10px] font-semibold uppercase tracking-[0.18em] py-3.5 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <ShoppingBag size={12} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Card info below image */}
      <div className="pt-3 pb-1">
        <p className="text-[12px] text-stone-500 uppercase tracking-[0.12em] font-medium mb-1">
          {product.category}
        </p>
        <p className="text-[14px] text-[#2C2C2C] leading-snug mb-2 font-light">
          {product.name}
        </p>
        <p className="text-[13px] text-[#2C2C2C] font-medium">
          {formatNaira(product.priceNaira)}
        </p>
      </div>
    </div>
  );
};

/* ─── ShopPage ─── */
const ShopPage = ({
  headingFont,
  setCurrentPage,
}: {
  headingFont: React.CSSProperties;
  setCurrentPage?: (page: string) => void;
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('New');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const products: ShopProduct[] = [];

  const navTabs = [
    'New',
    'Furniture',
    'Outdoor',
    'Lighting',
    'Rugs',
    'Decor & Pillows',
    'Wall Decor',
    'Bed & Bath',
    'Kitchen & Dining',
  ];

  const filtered = products.filter(
    (p) => activeCategory === 'New' || p.category === activeCategory
  );

  const totalCartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const handleAddToCart = (p: ShopProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) return prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setAddedToast(p.name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleChangeQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const handleToggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full min-h-screen text-stone-900 overflow-x-hidden" style={{ background: '#fff' }}>

      {/* ── Hero + nav wrapper: image sits behind both ── */}
      <div className="relative w-full" style={{ height: 'clamp(340px, 50vw, 640px)' }}>

        {/* ── Background image (behind nav + text) ── */}
        <img
          src="/shop-hero.jpg"
          alt="Shop hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* ── Shop-specific sticky sub-header ── */}
        <div
          className="sticky top-[80px] z-30"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.22)',
            background: 'rgba(0,0,0,0.32)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >

        {/* Row 1: Search | Logo | Icons */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-[52px]">

            {/* LEFT — Search */}
            <div className="flex items-center w-1/3">
              {searchOpen ? (
                <div className="flex items-center gap-2 border-b border-white/60 pb-0.5 w-full max-w-[240px]">
                  <Search size={13} className="text-white/80 shrink-0" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products…"
                    className="text-[11px] tracking-wide outline-none w-full bg-transparent text-white placeholder:text-white/50"
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors group"
                >
                  <Search size={14} />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Search</span>
                </button>
              )}
            </div>

            {/* CENTER — Logo */}
            <div className="flex items-center justify-center w-1/3">
              <button onClick={() => setCurrentPage?.('home')} className="group">
                <img
                  src={siteLogo}
                  alt="Vizid"
                  className="h-6 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </button>
            </div>

            {/* RIGHT — Icons */}
            <div className="flex items-center justify-end gap-5 w-1/3">
              <button
                onClick={() => setCurrentPage?.('auth')}
                title="Account"
                aria-label="Account"
                className="text-white hover:text-white/80 transition-colors"
              >
                <User size={17} strokeWidth={1.5} />
              </button>

              <button
                title="Saved Items"
                aria-label="Saved Items"
                className="relative text-white hover:text-white/80 transition-colors"
              >
                <Heart
                  size={17}
                  strokeWidth={1.5}
                  className={wishlist.size > 0 ? 'fill-white text-white' : ''}
                />
                {wishlist.size > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-stone-900 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.size}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                title="Cart"
                aria-label="Cart"
                className="relative text-white hover:text-white/80 transition-colors"
              >
                <ShoppingBag size={17} strokeWidth={1.5} />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-stone-900 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Category tabs */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {navTabs.map((tab) => {
                const isActive = activeCategory === tab;
                const isClearance = tab === 'Clearance';
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className="relative shrink-0 px-4 sm:px-5 py-3.5 text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 whitespace-nowrap"
                    style={{
                      color: isClearance && !isActive
                        ? '#f59e0b'
                        : isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {tab}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-4 right-4 block"
                        style={{ height: '1.5px', background: '#ffffff' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        </div>

        {/* ── Hero text (sits inside the shared wrapper, below the nav) ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-center px-6 pointer-events-none">
          <p className="text-[11px] tracking-[0.4em] uppercase text-white/75 font-medium mb-4">
            Curated Collections
          </p>
          <h1
            className="text-white leading-tight"
            style={{
              ...headingFont,
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              letterSpacing: '-0.01em',
              textShadow: '0 4px 28px rgba(0,0,0,0.35)',
            }}
          >
            Shop Our World
          </h1>
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 pt-10 pb-28">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filtered.map((product) => (
            <ShopCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.has(product.id)}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onClick={() => setSelectedProduct(product)}
            />
          ))}

          {/* Coming Soon empty state */}
          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
              <div className="w-10 h-px bg-stone-300 mb-10 mx-auto" />
              <p className="text-[9px] uppercase tracking-[0.35em] text-stone-400 font-semibold mb-4">
                Coming Soon
              </p>
              <h2
                style={{ ...headingFont, fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif' }}
                className="text-3xl sm:text-4xl text-[#1a1a1a] font-light mb-4 leading-snug"
              >
                No Products Yet
              </h2>
              <p className="text-[13px] text-stone-400 font-light max-w-[280px] leading-relaxed">
                We're curating something beautiful for this category. Check back soon.
              </p>
              <div className="w-10 h-px bg-stone-200 mt-10 mx-auto" />
            </div>
          )}
        </div>
      </div>

      {/* ── Cart Drawer ── */}
      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onChangeQty={handleChangeQty}
        headingFont={headingFont}
      />

      {/* ── Product Detail Modal ── */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.has(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          headingFont={headingFont}
        />
      )}

      {/* ── Toast ── */}
      {addedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-[#1a1a1a] text-white px-6 py-3.5 shadow-2xl text-sm font-light flex items-center gap-3">
          <CheckCircle size={15} className="text-stone-400" />
          <span><em className="not-italic font-medium">{addedToast}</em> added to cart</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-stone-300 hover:text-white underline text-xs tracking-wide"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};



/* ─── AuthPage (Sign Up / Login) ─── */
const AuthPage = ({
  headingFont,
  setCurrentPage,
}: {
  headingFont: React.CSSProperties;
  setCurrentPage: (page: string) => void;
}) => {
  const [mode, setMode] = useState<'signup' | 'signin'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .maybeSingle();

          if (profile?.role === 'admin') {
            setCurrentPage('admin');
          } else {
            setCurrentPage('home');
          }
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error) throw error;

        if (data.session) {
          setSuccessMsg('Account created successfully! Welcome to Vizid.');
          setTimeout(() => setCurrentPage('home'), 1500);
        } else {
          setSuccessMsg('Account created! Please check your email to verify your account.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF9F7] min-h-[85vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white border border-stone-200 shadow-xl p-8 sm:p-10 relative">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#8B6F47] mb-2">
            Vizid Luxury Living
          </p>
          <h1 style={headingFont} className="text-3xl sm:text-4xl text-[#2C2C2C] font-light">
            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            {mode === 'signup'
              ? 'Sign up to unlock bespoke interior design services and curated collections.'
              : 'Sign in to access your saved items and interior design consultations.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-200 mb-8">
          <button
            onClick={() => { setMode('signin'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`flex-1 pb-3 text-xs uppercase tracking-[0.15em] font-semibold border-b-2 transition-colors ${
              mode === 'signin' ? 'border-[#2C2C2C] text-[#2C2C2C]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`flex-1 pb-3 text-xs uppercase tracking-[0.15em] font-semibold border-b-2 transition-colors ${
              mode === 'signup' ? 'border-[#2C2C2C] text-[#2C2C2C]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded text-center font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-stone-600 font-semibold mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className="w-full bg-[#FAF9F7] border border-stone-300 px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8B6F47] transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-stone-600 font-semibold mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#FAF9F7] border border-stone-300 px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8B6F47] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-stone-600 font-semibold mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#FAF9F7] border border-stone-300 px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#8B6F47] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#2C2C2C] text-white text-[11px] uppercase tracking-[0.2em] py-3.5 font-semibold hover:bg-[#8B6F47] transition-colors shadow-md disabled:opacity-60"
          >
            {isLoading ? 'Processing...' : (mode === 'signup' ? 'Create Account' : 'Sign In')}
          </button>
        </form>
      </div>
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
    { title: 'Golden Opulence Suite', location: 'Abuja, NG', img: '/portfolio/1.jpeg', type: 'full', caption: 'A regal living room draped in gold — crystal chandelier, baroque sofa sets, and floor-length satin drapes that command the room.' },
    { title: 'Imperial Salon', location: 'Lagos, NG', img: '/portfolio/2.jpeg', type: 'half', caption: 'Symmetry meets splendour. Tufted gilt sofas and a hand-knotted area rug anchor this palatial salon in timeless elegance.' },
    { title: 'Baroque Corner Study', location: 'Port Harcourt, NG', img: '/portfolio/3.jpeg', type: 'half', caption: 'An intimate baroque alcove featuring gold-carved accent chairs, a round pedestal table and a sculptural trio-mirror arrangement.' },
    { title: 'Vizid Design in Motion', location: 'Lagos, NG', video: '/portfolio/video-1.mp4', isVideo: true, type: 'half', caption: 'A cinematic tour revealing the crafted details, rich textures, and architectural flow of our signature interiors.' },
    { title: 'Artisanal Interior Sanctuary', location: 'Lagos, NG', img: '/portfolio/img-20240531.jpg', type: 'half', caption: 'Custom woodwork, bespoke architectural accents, and tailored finishes creating an elevated residential sanctuary.' },
    { title: 'Modern Earth Lounge', location: 'Enugu, NG', img: '/portfolio/4.jpeg', type: 'full', caption: 'Warm earth tones, linen drapes and statement abstract art bring a refined, gallery-quality calm to this contemporary living space.' },
    { title: 'Curated Elegance Living', location: 'Abuja, NG', img: '/portfolio/img-wa0030.jpg', type: 'half', caption: 'Sculptural lighting, plush modern upholstery, and bespoke artisanal finishes creating an atmosphere of quiet luxury.' },
    { title: 'Urban Grey Retreat', location: 'Abuja, NG', img: '/portfolio/5.jpeg', type: 'half', caption: 'Sleek charcoal and stone-grey sofas pair with a sculptural layered coffee table for a living room that feels bold yet serene.' },
    { title: 'Walnut Vanity Nook', location: 'Lagos, NG', img: '/portfolio/6.jpeg', type: 'half', caption: 'A bespoke wood-grain dressing corner — floating vanity, circular mirror and built-in shelving crafted for effortless morning rituals.' },
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
          {/* Render full-width items in order, then group halves into a grid */}
          {(() => {
            const elements: React.ReactNode[] = [];
            let halfBuffer: typeof projects = [];

            const flushHalves = () => {
              if (halfBuffer.length > 0) {
                elements.push(
                  <div key={`halves-${elements.length}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
                    {halfBuffer.map((project, idx) => (
                      <div key={idx} className="group cursor-pointer flex flex-col reveal-up">
                        <div className={`w-full ${project.isVideo ? 'aspect-[9/16]' : 'aspect-[4/5]'} overflow-hidden mb-6 relative bg-stone-100 rounded-lg`}>
                          {project.isVideo ? (
                            <video
                              src={project.video}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                          ) : (
                            <AppImage src={project.img || ''} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                          )}
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-500 mb-2">{project.location}</p>
                          <h2 style={headingFont} className="text-2xl sm:text-3xl text-[#2C2C2C] mb-3">{project.title}</h2>
                          {project.caption && (
                            <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed max-w-md">{project.caption}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
                halfBuffer = [];
              }
            };

            projects.forEach((project, idx) => {
              if (project.type === 'full') {
                flushHalves();
                elements.push(
                  <div key={idx} className="group cursor-pointer relative overflow-hidden w-full h-[50vh] sm:h-[70vh] lg:h-[90vh] reveal-up bg-stone-900">
                    {project.isVideo ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <AppImage src={project.img || ''} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                      <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold mb-2">{project.location}</p>
                      <h2 style={headingFont} className="text-3xl sm:text-4xl md:text-5xl mb-3">{project.title}</h2>
                      {project.caption && (
                        <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-2xl">{project.caption}</p>
                      )}
                    </div>
                  </div>
                );
              } else {
                halfBuffer.push(project);
              }
            });
            flushHalves();
            return elements;
          })()}
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
      img: '',
      bio: 'With an eye for timeless beauty and a passion for creating homes that truly reflect the people who live in them, Shea leads the creative vision of Vizid.'
    },
    {
      name: 'Idika Victor',
      role: 'Founder & CEO',
      img: '/vizid_decors_DKFNqC9oNo0_2.jpg',
      bio: 'Idika oversees business strategy, growth, and operations—ensuring that every client experience is as seamless and elevated as the spaces we create.'
    },
    {
      name: 'Onyekachi Wisdom',
      role: 'Principal Designer',
      img: '',
      bio: 'Onyekachi brings warmth and architectural rigor to every project, specializing in layered interiors that feel collected over a lifetime.'
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
                src="/portfolio/7.jpeg"
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
              What began as a small design practice in the university has grown into a recognized studio, and home furnishings brand—all rooted in the same founding principle: design should make people happy.
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
              <div key={i} className="bg-white border border-stone-200/80 overflow-hidden shadow-sm flex flex-col reveal-up">
                <div className="w-full aspect-[3/4] overflow-hidden bg-stone-200 flex items-center justify-center relative">
                  {member.img ? (
                    <AppImage
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-200/70 flex flex-col items-center justify-center text-stone-400">
                      <User size={48} strokeWidth={1} />
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <p className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#c9a96e] mb-2">{member.role}</p>
                  <h3 style={headingFont} className="text-2xl sm:text-3xl text-[#2C2C2C] font-normal mb-3">{member.name}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">{member.bio}</p>
                </div>
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
        return <ShopPage headingFont={headingFont} setCurrentPage={setCurrentPage} />;
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
      case 'academy':
        return <VizidDecorAcademyPage headingFont={headingFont} setCurrentPage={setCurrentPage} adminPhoneNumber="08121819461" />;
      case 'admin':
        return <AdminPage headingFont={headingFont} setCurrentPage={setCurrentPage} />;
      case 'profile':
      case 'auth':
      case 'signup':
        return <AuthPage headingFont={headingFont} setCurrentPage={setCurrentPage} />;
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
