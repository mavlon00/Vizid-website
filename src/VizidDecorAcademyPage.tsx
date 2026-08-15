import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  Users,
  ArrowRight,
  MessageCircle,
  Star,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  Eye,
  Sparkles
} from 'lucide-react';
import { useIsomorphicLayoutEffect } from './App';

interface VizidDecorAcademyProps {
  headingFont: React.CSSProperties;
  setCurrentPage?: (page: string) => void;
  adminPhoneNumber?: string;
}

const formatWhatsAppNumber = (phone: string) => {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.substring(1);
  }
  return cleaned;
};

const STUDENT_PROJECTS = [
  {
    student: 'Amina Bello',
    course: '3D Spatial Visualization',
    img: '/vizid_decors/vizid_decors_C9NuM4Qs8S4_5.jpg',
    title: 'The Ikoyi Penthouse Residence',
    quote: 'The Vizid Decor Academy 3D pipeline completely transformed how I present concepts to clients. I landed my first ₦8M project within 2 weeks of graduating!'
  },
  {
    student: 'Chidi Okonkwo',
    course: 'Interior Styling Mastery',
    img: '/vizid_decors/vizid_decors_DKFNqC9oNo0_2.jpg',
    title: 'Eko Atlantic Lounge Transformation',
    quote: 'Learning spatial flow and material layering from real studio designers gave me the confidence to start my own interior styling firm.'
  },
  {
    student: 'Tolu Laniyan',
    course: 'Design Business & Trade',
    img: '/vizid_decors/vizid_decors_C8BlrKnM0Sb_1.jpg',
    title: 'Boutique Hotel Suite Curation',
    quote: 'The trade sourcing secrets alone were worth ten times the tuition fee. Vizid Academy gave me direct manufacturer contacts.'
  }
];



const TAB_CONTENT = {
  history: {
    desc: 'Founded by studio interior architects, Vizid Decor Academy bridges the gap between design theory and real-world high-end residential execution.',
    bullets: [
      'Real residential and commercial studio briefs from day one',
      'Industry-standard 3D spatial visualization and floor plan drafting',
      'Direct trade access to custom furniture builders and fabricators'
    ]
  },
  mission: {
    desc: 'Our mission is to empower aspiring interior architects with hands-on skills, confidence, and trade connections needed to launch successful studios.',
    bullets: [
      'Personalized 1-on-1 mentorship with senior studio interior designers',
      'Step-by-step portfolio curation for high-value client acquisition',
      'Comprehensive client presentation and project pricing frameworks'
    ]
  },
  vision: {
    desc: 'We envision a global community of interior styling professionals leading luxury design and spatial innovation across Nigeria and beyond.',
    bullets: [
      'Recognized Vizid Decor Academy Certification of Completion',
      'Lifetime access to our exclusive alumni trade network & suppliers',
      'Continuous masterclass updates on emerging software & materials'
    ]
  }
};

const FAQS = [
  {
    q: 'Do I need prior interior design or architecture experience?',
    a: 'No prior experience is required for our foundational courses like Interior Styling and Home Staging. Our courses start with fundamental principles and build up to professional level. For 3D Rendering, basic computer literacy is helpful.'
  },
  {
    q: 'Are the academy courses online or in-person?',
    a: 'We offer hybrid learning! All lectures, step-by-step video modules, and software sessions are accessible online. We also host optional weekend studio workshops and site visits at our Lagos showroom.'
  },
  {
    q: 'Will I receive a certificate upon completion?',
    a: 'Yes! Graduates who complete their capstone design project receive the official Vizid Decor Academy Certification of Completion, recognized by top trade partners and studios.'
  },
  {
    q: 'Can I pay the tuition fee in installments?',
    a: 'Yes, we offer a 2-part installment payment plan. You can pay 50% upon registration to secure your seat and the remaining balance midway through the course.'
  },
  {
    q: 'What software will I need for the 3D Rendering bootcamp?',
    a: 'We guide you through installing SketchUp Pro and V-Ray / Corona (free trial versions available during training). Detailed hardware requirements are sent upon registration.'
  }
];

export const VizidDecorAcademyPage: React.FC<VizidDecorAcademyProps> = ({
  headingFont,
  setCurrentPage,
  adminPhoneNumber = '08121819461'
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'history' | 'mission' | 'vision'>('history');

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#F9F9F8] text-[#2C2C2C] pb-24">
      {/* ── HERO BANNER ── */}
      <section className="relative w-full h-[75vh] min-h-[550px] bg-stone-950 flex items-center justify-center overflow-hidden">
        <img
          src="/academy_hero.png"
          alt="Vizid Decor Academy — Interior Design Studio, 3D Visualization & Styling Masterclass"
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-stone-950/60 to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">

          <h1 style={headingFont} className="text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.1] mb-6 tracking-tight">
            Master the Art of <br />
            <span className="italic text-stone-200">Interior Styling &amp; 3D Design</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Professional masterclasses and hands-on bootcamps designed by industry-leading interior architects. Build a high-value portfolio and launch your design studio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#why-study-section"
              className="w-full sm:w-auto bg-[#c9a96e] hover:bg-[#b5955a] text-stone-950 font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-none transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <span>Explore Academy</span>
              <ArrowRight size={16} />
            </a>
            
            <a
              href={`https://wa.me/${formatWhatsAppNumber(adminPhoneNumber)}?text=${encodeURIComponent("Hello! I'm interested in enrolling at Vizid Decor Academy. Could you send me the prospectus?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-white/40 hover:bg-white hover:text-stone-900 text-white font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Admissions</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── ACADEMY HIGHLIGHT METRICS ── */}
      <section className="bg-[#2C2C2C] text-white py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4 border-r border-stone-800 last:border-none">
            <p style={headingFont} className="text-3xl sm:text-4xl text-[#c9a96e] font-light mb-1">20+</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium">Academy Graduates</p>
          </div>
          <div className="p-4 border-r border-stone-800 last:border-none">
            <p style={headingFont} className="text-3xl sm:text-4xl text-[#c9a96e] font-light mb-1">98%</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium">Career / Studio Placement</p>
          </div>
          <div className="p-4">
            <p style={headingFont} className="text-3xl sm:text-4xl text-[#c9a96e] font-light mb-1">1-on-1</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium">Studio Mentorship</p>
          </div>
        </div>
      </section>

      {/* ── WHY VIZID DECOR ACADEMY ── */}
      <section id="why-study-section" className="bg-[#F4F0EB] py-20 px-6 sm:px-12 border-b border-stone-300/70">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-400 mb-3">THE VIZID ADVANTAGE</p>
            <h2 style={headingFont} className="text-3xl sm:text-5xl text-[#2C2C2C] font-light">
              Why Study With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-stone-200/80 shadow-xs flex flex-col items-start">
              <div className="w-12 h-12 bg-stone-900 text-[#c9a96e] flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <h3 style={headingFont} className="text-2xl text-[#2C2C2C] font-normal mb-3">Real Client Briefs</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Work on active residential and commercial design briefs from Vizid Decor clients. Graduate with a polished studio portfolio, not generic textbook exercises.
              </p>
            </div>

            <div className="bg-white p-8 border border-stone-200/80 shadow-xs flex flex-col items-start">
              <div className="w-12 h-12 bg-stone-900 text-[#c9a96e] flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 style={headingFont} className="text-2xl text-[#2C2C2C] font-normal mb-3">Trade &amp; Supplier Access</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Gain direct access to our verified network of custom furniture builders, marble fabricators, and trade suppliers with insider wholesale pricing.
              </p>
            </div>

            <div className="bg-white p-8 border border-stone-200/80 shadow-xs flex flex-col items-start">
              <div className="w-12 h-12 bg-stone-900 text-[#c9a96e] flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 style={headingFont} className="text-2xl text-[#2C2C2C] font-normal mb-3">Industry Certification</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Earn a recognized Vizid Decor Academy diploma that validates your spatial planning and 3D rendering mastery to prospective clients and top architectural firms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ACADEMY FEATURE SECTION (STYLED EXACTLY LIKE REFERENCE SCREENSHOT) ── */}
      <section className="bg-white py-20 sm:py-28 px-4 sm:px-8 lg:px-16 border-b border-stone-200 overflow-hidden">
        <div className="max-w-[92rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Single Primary Image Frame */}
          <div className="lg:col-span-6 relative">
            <div className="w-full max-w-lg mx-auto lg:mx-0 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
              <img
                src="/academy_about_bigger_frame.png"
                alt="Vizid Decor Studio & Material Curation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Text Content + Tabs + Bullet Points + 'See More' Button */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tag / Subtitle */}
            <div className="flex items-center gap-2 text-stone-600 text-xs tracking-[0.2em] font-bold uppercase">
              <GraduationCap size={18} className="text-[#c9a96e]" />
              <span>About Vizid Decor Academy</span>
            </div>

            {/* Main Headline */}
            <h2 style={headingFont} className="text-3xl sm:text-5xl text-[#2C2C2C] font-normal leading-[1.18] tracking-tight">
              Building Design Careers &amp; Transforming Spaces
            </h2>

            {/* Tab Navigation Pill Bar (History / Mission / Vision) */}
            <div className="flex items-center gap-2 sm:gap-3 pt-2">
              <button
                onClick={() => setActiveTab('history')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'history'
                    ? 'bg-[#F4F0EB] text-stone-900 border border-stone-300 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Our History
              </button>
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'mission'
                    ? 'bg-[#F4F0EB] text-stone-900 border border-stone-300 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeTab === 'vision'
                    ? 'bg-[#F4F0EB] text-stone-900 border border-stone-300 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Our Vision
              </button>
            </div>

            {/* Tab Description Paragraph */}
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed pt-1">
              {TAB_CONTENT[activeTab].desc}
            </p>

            {/* Bullet Points List */}
            <ul className="space-y-3 pt-1 text-xs sm:text-sm text-stone-700 font-light">
              {TAB_CONTENT[activeTab].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900 mt-2 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="bg-[#FAF9F7] py-20 px-6 sm:px-12 border-t border-stone-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-400 mb-3">COMMON QUESTIONS</p>
            <h2 style={headingFont} className="text-3xl sm:text-4xl text-[#2C2C2C] font-light">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white border border-stone-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span style={headingFont} className="text-lg sm:text-xl text-[#2C2C2C] font-normal">
                    {faq.q}
                  </span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-[#c9a96e]" /> : <ChevronDown size={20} className="text-stone-400" />}
                </button>

                {openFaq === idx && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-stone-600 font-light leading-relaxed border-t border-stone-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="bg-[#2C2C2C] text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#c9a96e] mb-4">BEGIN YOUR JOURNEY</p>
          <h2 style={headingFont} className="text-3xl sm:text-5xl font-light mb-6">
            Ready to Launch Your Interior Design Career?
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-8 max-w-xl mx-auto">
            Speak directly with our academic advisor to discuss course selection, installment plans, and upcoming cohort start dates.
          </p>

          <a
            href={`https://wa.me/${formatWhatsAppNumber(adminPhoneNumber)}?text=${encodeURIComponent("Hello Vizid Decor Academy! I'm ready to enroll in a course. Can you guide me through registration?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#c9a96e] hover:bg-[#b5955a] text-stone-950 font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 shadow-2xl transition-all"
          >
            <MessageCircle size={18} />
            <span>Chat with Admissions on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};
