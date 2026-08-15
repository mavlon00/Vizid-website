import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Check, MessageCircle, Layers, Ruler, Sparkles, Building2 } from 'lucide-react';
import { useIsomorphicLayoutEffect } from './App';

interface WorkWithUsProps {
  headingFont: React.CSSProperties;
  selectedService?: 'virtual' | 'full';
  setSelectedService?: (service: 'virtual' | 'full') => void;
  adminPhoneNumber?: string;
}

const formatWhatsAppNumber = (phone: string) => {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = '234' + cleaned.substring(1);
  }
  return cleaned;
};

export const WorkWithUsPage: React.FC<WorkWithUsProps> = ({
  headingFont,
  adminPhoneNumber = '08121819461',
}) => {
  // Form State
  const [formData, setFormData] = useState({
    serviceType: 'Full Service',
    city: '',
    state: '',
    sqft: '',
    start: '',
    completion: '',
    portfolio: '',
    pinterest: '',
    reason: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    const cleanPhone = formatWhatsAppNumber(adminPhoneNumber);
    const whatsappMessage = `🏡 *NEW VIZID STUDIO INQUIRY*\n\n📌 *Service Request:* ${formData.serviceType}\n📍 *Location:* ${formData.city}${formData.state ? `, ${formData.state}` : ''}\n📐 *Home Size:* ${formData.sqft || 'N/A'}\n\n⏱ *Timeline:*\n• *Start Time:* ${formData.start || 'N/A'}\n• *Target Completion:* ${formData.completion || 'N/A'}\n\n✨ *Inspiration & Vision:*\n• *Project Style:* ${formData.portfolio || 'N/A'}\n• *Pinterest Link:* ${formData.pinterest || 'N/A'}\n\n💬 *Reason / Vision:*\n${formData.reason || 'None provided'}`;

    if (cleanPhone) {
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="w-full bg-[#F9F9F8] min-h-screen text-[#2C2C2C]">
      {/* Hero Banner */}
      <section className="relative w-full bg-[#3D423F] text-white py-20 sm:py-28 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-stone-300 mb-4">
            Bespoke Turnkey Architecture &amp; Interior Design
          </p>
          <h1 style={headingFont} className="text-4xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight">
            Full Service Interior Design
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto leading-relaxed mb-8">
            A comprehensive, end-to-end design experience for clients building custom residences, executing large-scale renovations, or furnishing luxury estates.
          </p>
          <a
            href="#inquiry-form-section"
            className="inline-flex items-center gap-2 bg-white text-stone-900 hover:bg-stone-200 text-xs font-bold uppercase tracking-[0.2em] px-8 py-3.5 shadow-xl transition-all"
          >
            <span>Start Your Project</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* FULL SERVICE OVERVIEW & CAPABILITIES */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 max-w-[95rem] mx-auto border-b border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-bold text-stone-500 border-b border-stone-400 pb-1">
              Turnkey Residential &amp; Architectural Excellence
            </span>
            <h2 style={headingFont} className="text-3xl sm:text-5xl text-[#2C2C2C] font-normal leading-tight">
              End-to-End Design Execution
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Our Full Service offering handles every detail from initial concept drafting to custom cabinetry millwork, trade procurement, site supervision, and final white-glove installation reveal.
            </p>
            <div className="space-y-4 pt-2 text-xs text-stone-700">
              <div className="flex items-start gap-3 bg-white p-4 border border-stone-200/80 shadow-xs">
                <CheckCircle size={18} className="text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-stone-900 text-sm mb-0.5">Comprehensive Spatial &amp; Architectural Planning</strong>
                  <span className="text-stone-600 font-light">Detailed scale blueprints, custom cabinetry elevations, electrical schedules, and finish specifications.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 border border-stone-200/80 shadow-xs">
                <CheckCircle size={18} className="text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-stone-900 text-sm mb-0.5">Trade Sourcing &amp; Contractor Management</strong>
                  <span className="text-stone-600 font-light">Direct trade procurement with verified custom furniture builders, marble fabricators, and on-site trade oversight.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 border border-stone-200/80 shadow-xs">
                <CheckCircle size={18} className="text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-stone-900 text-sm mb-0.5">White-Glove Delivery &amp; Styling Reveal</strong>
                  <span className="text-stone-600 font-light">Complete furniture assembly, artwork installation, window treatments, and editorial home staging reveal.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/5] overflow-hidden shadow-2xl relative group">
              <img
                src="/full_service_design_execution.png"
                alt="End-to-End Full Service Interior Design — Custom Walnut Cabinetry Millwork, Marble Feature Wall & White-Glove Installation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FULL SERVICE PROCESS STEPS */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-[#F4F0EB] border-b border-stone-300">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-stone-400 mb-3">FOUR PHASES OF EXCELLENCE</p>
          <h2 style={headingFont} className="text-3xl sm:text-5xl text-[#2C2C2C]">How Full Service Design Works</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'Discovery & Consultation',
              desc: 'We conduct an in-depth spatial assessment, architectural review, and budget alignment session for your home.',
            },
            {
              step: '02',
              title: 'Architectural Blueprint & Render',
              desc: 'Our studio generates scaled floor plans, custom millwork drawings, material swatches, and photorealistic 3D renders.',
            },
            {
              step: '03',
              title: 'Procurement & Site Management',
              desc: 'We manage all trade purchasing, custom fabrication, import logistics, and contractor execution on site.',
            },
            {
              step: '04',
              title: 'White-Glove Installation',
              desc: 'Our team conducts a full white-glove installation, art placement, window treatment fitting, and grand reveal.',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 border border-stone-200 text-left relative shadow-sm hover:shadow-md transition-shadow">
              <span style={headingFont} className="text-4xl text-stone-300 font-light block mb-4">
                {item.step}
              </span>
              <h3 style={headingFont} className="text-xl text-[#2C2C2C] font-normal mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM SECTION: INQUIRY FORM - EXACT MATCH TO USER IMAGE SCREENSHOT */}
      <section id="inquiry-form-section" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#F6F5F2] border-t border-stone-200">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT COLUMN: Text Header & Numbered Steps */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h2 style={headingFont} className="text-3xl sm:text-4xl lg:text-[2.6rem] text-[#2C2C2C] font-normal leading-snug mb-6">
                Ready to explore our Full or Virtual Interior Design Services?
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Connect with our team by completing the form, and a member of our team will be in touch within 2–3 business days.
              </p>
            </div>

            {/* Numbered Navigation Guide */}
            <div className="space-y-4 pt-4 border-t border-stone-300/60">
              {[
                { step: '1.', label: 'THE PROJECT', id: 1 },
                { step: '2.', label: 'TIMELINE', id: 2 },
                { step: '3.', label: 'INSPIRATION', id: 3 },
                { step: '4.', label: 'A BIT MORE', id: 4 },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveStep(item.id)}
                  className={`flex items-center space-x-3 text-[10px] tracking-[0.2em] uppercase cursor-pointer transition-colors ${
                    activeStep === item.id ? 'font-bold text-stone-900' : 'text-stone-400 hover:text-stone-700 font-medium'
                  }`}
                >
                  <span className="font-mono">{item.step}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="lg:col-span-8 bg-[#FAF9F7] p-8 sm:p-12 border border-stone-200/80 shadow-sm">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={48} strokeWidth={1.5} />
                </div>
                <h3 style={headingFont} className="text-3xl text-stone-900">
                  Thank You For Your Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Your project details for <strong>{formData.serviceType}</strong> have been prepared for WhatsApp transmission.
                </p>
                <div className="max-w-md mx-auto space-y-3 pt-2">
                  <a
                    href={`https://wa.me/${formatWhatsAppNumber(adminPhoneNumber)}?text=${encodeURIComponent(
                      `🏡 *NEW VIZID STUDIO INQUIRY*\n\n📌 *Service Request:* ${formData.serviceType}\n📍 *Location:* ${formData.city}${formData.state ? `, ${formData.state}` : ''}\n📐 *Home Size:* ${formData.sqft || 'N/A'}\n\n⏱ *Timeline:*\n• *Start Time:* ${formData.start || 'N/A'}\n• *Target Completion:* ${formData.completion || 'N/A'}\n\n✨ *Inspiration & Vision:*\n• *Project Style:* ${formData.portfolio || 'N/A'}\n• *Pinterest Link:* ${formData.pinterest || 'N/A'}\n\n💬 *Reason / Vision:*\n${formData.reason || 'None provided'}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1ebd59] text-white text-xs tracking-[0.15em] uppercase font-semibold px-8 py-3.5 shadow-md transition-colors w-full"
                  >
                    <MessageCircle size={18} />
                    <span>Open WhatsApp Chat With Admin</span>
                  </a>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="border border-stone-800 text-stone-900 px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-stone-900 hover:text-white transition-colors w-full"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form name="inquiry" data-netlify="true" onSubmit={handleFormSubmit} className="space-y-8">
                <input type="hidden" name="form-name" value="inquiry" />
                {/* What type of design services */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-stone-800">
                    What type of design services
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                  >
                    <option value="Full Service">Full Service</option>
                    <option value="Virtual Design">Virtual Design</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>

                {/* SECTION: The project */}
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6">The project</h4>
                  
                  <div className="space-y-6">
                    {/* City */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-stone-800">
                        City <span className="text-stone-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* State */}
                      <div className="space-y-2">
                        <label className="block text-xs sm:text-sm font-medium text-stone-800">
                          State <span className="text-stone-400">*</span>
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                        >
                          <option value="" disabled>Select State</option>
                          <option value="Lagos">Lagos</option>
                          <option value="Abuja (FCT)">Abuja (FCT)</option>
                          <option value="Rivers">Rivers</option>
                          <option value="Oyo">Oyo</option>
                          <option value="Ogun">Ogun</option>
                          <option value="Kano">Kano</option>
                          <option value="Enugu">Enugu</option>
                          <option value="Abia">Abia</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Approximate size of home */}
                      <div className="space-y-2">
                        <label className="block text-xs sm:text-sm font-medium text-stone-800">
                          Approximate size of home <span className="text-stone-400">*</span>
                        </label>
                        <select
                          name="sqft"
                          value={formData.sqft}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                        >
                          <option value="" disabled>Select approximate size</option>
                          <option value="Under 100 sqm">Under 100 sqm</option>
                          <option value="100–200 sqm">100–200 sqm</option>
                          <option value="200–400 sqm">200–400 sqm</option>
                          <option value="400+ sqm">400+ sqm</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION: Timeline */}
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6">Timeline</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* When would you like to start? */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-stone-800">
                        When would you like to start? <span className="text-stone-400">*</span>
                      </label>
                      <select
                        name="start"
                        value={formData.start}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                      >
                        <option value="" disabled>Select start time</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="1–3 months">1–3 months</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                    </div>

                    {/* Target completion */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-stone-800">
                        Target completion <span className="text-stone-400">*</span>
                      </label>
                      <select
                        name="completion"
                        value={formData.completion}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                      >
                        <option value="" disabled>Select target completion</option>
                        <option value="Within 3 months">Within 3 months</option>
                        <option value="3–6 months">3–6 months</option>
                        <option value="6–12 months">6–12 months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION: Inspiration */}
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6">Inspiration</h4>
                  
                  <div className="space-y-6">
                    {/* Which Vizid projects best align with your vision? */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-stone-800">
                        Which Vizid projects best align with your vision?
                      </label>
                      <select
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                      >
                        <option value="">Select project type (optional)</option>
                        <option value="Living room / lounge projects">Living room / lounge projects</option>
                        <option value="Full home renovations">Full home renovations</option>
                        <option value="Kitchen & dining spaces">Kitchen & dining spaces</option>
                        <option value="Bedroom & suite designs">Bedroom & suite designs</option>
                        <option value="None of these — something different">None of these — something different</option>
                      </select>
                    </div>

                    {/* Pinterest board link */}
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-stone-800">
                        Pinterest board link
                      </label>
                      <input
                        type="url"
                        name="pinterest"
                        value={formData.pinterest}
                        onChange={handleInputChange}
                        placeholder="https://pinterest.com/your-board"
                        className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                      />
                      <p className="text-[11px] text-stone-500 font-light">
                        If you've saved design inspiration somewhere, drop the link here.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SECTION: A bit more */}
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6">A bit more</h4>
                  
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-stone-800">
                      What's the main reason you'd like to hire an interior designer? <span className="text-stone-400">*</span>
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm resize-y"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="border border-stone-900 bg-white text-stone-900 px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-stone-900 hover:text-white transition-colors duration-300 shadow-sm"
                  >
                    SEND INQUIRY
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
