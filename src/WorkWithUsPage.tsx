import React, { useState, useEffect } from 'react';
import { CheckCircle, X, Sparkles, Layers, Ruler, ShoppingBag, Eye, Star, ArrowRight, Sliders, Check } from 'lucide-react';
import { useIsomorphicLayoutEffect } from './App';

interface WorkWithUsProps {
  headingFont: React.CSSProperties;
  selectedService: 'virtual' | 'full';
  setSelectedService: (service: 'virtual' | 'full') => void;
}

interface VirtualProject {
  id: number;
  category: 'living' | 'kitchen' | 'bedroom' | 'office' | 'bath';
  categoryLabel: string;
  title: string;
  renderImg: string;
  beforeImg?: string;
  tagline: string;
  writeup: string;
  deliverables: string[];
  style: string;
  palette: string[];
  dimensions: string;
}

export const WorkWithUsPage: React.FC<WorkWithUsProps> = ({
  headingFont,
  selectedService,
  setSelectedService,
}) => {
  const [activeTab, setActiveTab] = useState<'virtual' | 'full'>(selectedService || 'virtual');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [modalProject, setModalProject] = useState<VirtualProject | null>(null);
  const [viewBeforeAfter, setViewBeforeAfter] = useState<boolean>(false);

  // Sync activeTab if prop changes
  useEffect(() => {
    if (selectedService) {
      setActiveTab(selectedService);
    }
  }, [selectedService]);

  // Form State
  const [formData, setFormData] = useState({
    serviceType: selectedService === 'full' ? 'Full Service' : 'Virtual Design',
    city: '',
    state: '',
    sqFt: '',
    completionTimeframe: '',
    budget: '',
    startTimeframe: '',
    projectAlign: '',
    pinterestLink: '',
    mainReason: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Sync form dropdown when activeTab changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceType: activeTab === 'full' ? 'Full Service' : 'Virtual Design',
    }));
  }, [activeTab]);

  const virtualProjects: VirtualProject[] = [
    {
      id: 1,
      category: 'living',
      categoryLabel: 'LIVING ROOM',
      title: 'The Crestview Organic Living Sanctuary',
      renderImg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      tagline: '3D Spatial Visualization & Full Furniture Package',
      writeup:
        'For this virtual design project, we transformed a 550-sq-ft living space into an airy, layered sanctuary. Utilizing 3D spatial modelling, we arranged low-profile bouclé seating around a custom travertine coffee table to maximize traffic flow while maintaining visual warmth. Custom 3D lighting studies ensured warm ambient glows from brushed brass sconces and architectural ceiling beams.',
      deliverables: [
        '3D Photorealistic Renderings (Multi-Angle)',
        'Scale Floor Plan & Traffic Flow Blueprint',
        'Curated Shopping Spec Sheet with Trade Discounts',
        'Physical Material & Fabric Swatch Kit',
      ],
      style: 'Warm Modernist',
      palette: ['#EAE4DC', '#A89F91', '#5B5348', '#382E25'],
      dimensions: '22ft x 25ft',
    },
    {
      id: 2,
      category: 'kitchen',
      categoryLabel: "CHEF'S KITCHEN",
      title: 'Oakhaven Heritage Kitchen & Pantry',
      renderImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
      beforeImg: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Virtual Millwork & 3D Cabinetry Design',
      writeup:
        'Our client wanted to preview custom white-oak cabinetry with unlacquered brass hardware before beginning construction. Through our Virtual Design process, we created accurate 3D cabinetry elevations, marble slab veining studies, and integrated lighting simulations. The resulting design balances traditional craftsmanship with clean, functional work zones.',
      deliverables: [
        '3D Cabinetry & Island Elevations',
        'Countertop Slab Veining Visuals',
        'Lighting Plan & Pendant Height Guide',
        'Paint & Wood Finish Specifications',
      ],
      style: 'New Heritage Kitchen',
      palette: ['#F3EFEA', '#CBB89D', '#6A5F52', '#222222'],
      dimensions: '18ft x 20ft',
    },
    {
      id: 3,
      category: 'bedroom',
      categoryLabel: 'PRIMARY SUITE',
      title: 'Highland Park Primary Suite',
      renderImg: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
      beforeImg: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Full Virtual Bedroom Sanctuary Concept',
      writeup:
        'This virtual master suite design prioritizes tactile serenity. We developed 3D rendering views incorporating a linen upholstered bed, hand-loomed wool rugs, and custom oak nightstands. The 3D model allowed the client to visualize spatial clearance around key furniture pieces before making purchase decisions.',
      deliverables: [
        '3D Bedroom Renderings from 4 Angles',
        'Spatial Furniture Blueprint',
        'Textile, Bedding & Drapery Guide',
        'Direct One-Click Purchase Links',
      ],
      style: 'Serene Luxury',
      palette: ['#F7F5F0', '#DDD4C7', '#8C8275', '#403B35'],
      dimensions: '16ft x 21ft',
    },
    {
      id: 4,
      category: 'office',
      categoryLabel: 'HOME OFFICE',
      title: 'Belmont Executive Study & Library',
      renderImg: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
      tagline: '3D Built-in Library & Lighting Study',
      writeup:
        'Designed virtually for a remote executive in Seattle, this study layout balances rich floor-to-ceiling dark oak shelving with brass accents and cognac leather seating. The 3D virtual layout optimized acoustics, natural window light reflection, and video conference backdrop aesthetics.',
      deliverables: [
        '3D Millwork & Shelving Elevations',
        'Acoustic & Rug Placement Layout',
        'Custom Leather Desk Specifications',
        'Hardware & Sconce Placement Guide',
      ],
      style: 'Classic Executive Library',
      palette: ['#3A322C', '#8C6C50', '#D6C7B2', '#EFECE6'],
      dimensions: '14ft x 16ft',
    },
    {
      id: 5,
      category: 'bath',
      categoryLabel: 'PRIMARY BATH',
      title: 'Montecito Spa-Inspired Bath',
      renderImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Virtual Tile Layout & Plumbing Spec',
      writeup:
        'A complete virtual bath transformation featuring limestone flooring, zellige wall tiles, and a freestanding stone soaking tub. Our 3D visualization allowed the client to adjust tile grout thickness, niche placement, and vanity height prior to contractor tile installation.',
      deliverables: [
        '3D Tile & Niche Elevation',
        'Plumbing Spec & Fixture Sheet',
        'Vanity Mirror & Sconce Height Blueprint',
        'Stone & Tile Material Samples',
      ],
      style: 'Coastal Spa',
      palette: ['#F1ECE6', '#D1C7BB', '#807567', '#2B2824'],
      dimensions: '12ft x 18ft',
    },
    {
      id: 6,
      category: 'living',
      categoryLabel: 'GREAT ROOM',
      title: 'Aspen Great Room & Hearth',
      renderImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Double-Height 3D Architectural Design',
      writeup:
        'Navigating a double-height fireplace and vast windows required precise spatial proportioning. Through virtual 3D modeling, we tested multiple sectional sofa configurations, custom mantel designs, and chandelier drops to create an intimate atmosphere in a large-scale space.',
      deliverables: [
        '3D Multi-Angle Scale Views',
        'Chandelier Drop Height Calculation',
        'Fireplace Mantel Blueprint',
        'Textile & Upholstery Coordination',
      ],
      style: 'Mountain Modern',
      palette: ['#EAE5DE', '#AEA293', '#685D50', '#1F1B18'],
      dimensions: '26ft x 32ft',
    },
    {
      id: 7,
      category: 'bedroom',
      categoryLabel: 'GUEST RETREAT',
      title: 'Sonoma Guest Retreat',
      renderImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Cozy E-Design Concept & Lighting Blueprint',
      writeup:
        'Transforming a compact guest bedroom into a welcoming boutique hotel experience. We optimized the room layout virtually with built-in wall sconces, floating side tables, and layered natural linen bedding for effortless luxury.',
      deliverables: [
        '3D Room Render & Layout',
        'Shopping Specs & Linen Links',
        'Wall Sconce Wiring Blueprint',
      ],
      style: 'Rustic Chic',
      palette: ['#F4F0EB', '#D8CDBF', '#7D7060', '#342D26'],
      dimensions: '12ft x 14ft',
    },
    {
      id: 8,
      category: 'kitchen',
      categoryLabel: 'DINING ALCOVE',
      title: 'Beacon Hill Dining Alcove',
      renderImg: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=1200',
      tagline: 'Custom Banquette & Lighting Visuals',
      writeup:
        'Virtual design for a historic brownstone alcove. We rendered custom banquette seating, vintage brass pendant lights, and curved dining chairs to maximize seating capacity in an irregular corner space.',
      deliverables: [
        '3D Banquette Millwork Blueprint',
        'Dining Furniture & Fabric Specs',
        'Pendant Lighting Clearance Guide',
      ],
      style: 'Historic Modern',
      palette: ['#EAE6E1', '#B8A896', '#594F45', '#1D1916'],
      dimensions: '10ft x 12ft',
    },
  ];

  const filteredProjects =
    selectedFilter === 'all'
      ? virtualProjects
      : virtualProjects.filter((p) => p.category === selectedFilter);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F9F9F8] min-h-screen text-[#2C2C2C]">
      {/* Hero Banner & Service Toggle */}
      <section className="relative w-full bg-[#3D423F] text-white py-20 sm:py-28 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-stone-300 mb-4">
            Bespoke Design Services
          </p>
          <h1 style={headingFont} className="text-4xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight">
            Work With Us
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Whether you are building a custom home from the ground up or seeking comprehensive virtual design guidance from anywhere in the world, our studio brings curated, elevated spaces to life.
          </p>

          {/* Service Switcher Tabs */}
          <div className="inline-flex p-1.5 bg-[#2C2C2C]/80 border border-stone-600 rounded-sm shadow-xl">
            <button
              onClick={() => {
                setActiveTab('virtual');
                setSelectedService('virtual');
              }}
              className={`px-6 sm:px-10 py-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 rounded-sm ${
                activeTab === 'virtual'
                  ? 'bg-white text-stone-900 shadow-md font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Virtual Design
            </button>
            <button
              onClick={() => {
                setActiveTab('full');
                setSelectedService('full');
              }}
              className={`px-6 sm:px-10 py-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 rounded-sm ${
                activeTab === 'full'
                  ? 'bg-white text-stone-900 shadow-md font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Full Service
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area based on Selected Tab */}
      {activeTab === 'virtual' ? (
        /* VIRTUAL DESIGN SECTION */
        <div className="w-full">
          {/* Virtual Design Overview */}
          <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 max-w-[95rem] mx-auto border-b border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-bold text-stone-500 border-b border-stone-400 pb-1">
                  E-Design & 3D Spatial Planning
                </span>
                <h2 style={headingFont} className="text-3xl sm:text-5xl text-[#2C2C2C] font-normal leading-tight">
                  Virtual Interior Design
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  Our Virtual Design service connects you directly with our senior interior design team, no matter where your project is located. We provide true-to-life 3D renderings, scaled architectural floor plans, physical fabric & wood finish samples, and a complete itemized shopping spec sheet with exclusive trade access.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    'Photorealistic 3D Visualizations',
                    'Scaled Furniture Layouts',
                    'Curated Shopping Spec Sheets',
                    'Direct Designer Messaging',
                    'Physical Swatch Kits',
                    'Trade Discount Access',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-stone-700">
                      <CheckCircle size={14} className="text-stone-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-6 relative">
                <div className="w-full aspect-[4/3] overflow-hidden shadow-xl relative group">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
                    alt="Virtual Design 3D Render Showcase"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 text-stone-900 border-l-4 border-stone-800">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Virtual Design 3D Render</p>
                    <p style={headingFont} className="text-lg font-medium">The Crestview Living Sanctuary</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* VIRTUAL DESIGN PORTFOLIO SHOWCASE */}
          <section className="py-20 px-4 sm:px-8 lg:px-16 bg-white border-b border-stone-200">
            <div className="max-w-[95rem] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-stone-200 pb-8">
                <div>
                  <h2 style={headingFont} className="text-3xl sm:text-5xl text-[#2C2C2C] font-normal mb-2">
                    Virtual Design Concepts
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 font-light">
                    Explore our recent 3D renderings, spatial layouts, and detailed design write-ups.
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
                  {[
                    { id: 'all', label: 'All Designs' },
                    { id: 'living', label: 'Living' },
                    { id: 'kitchen', label: 'Kitchen' },
                    { id: 'bedroom', label: 'Bedroom' },
                    { id: 'office', label: 'Office' },
                    { id: 'bath', label: 'Bath' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`text-[10px] tracking-[0.15em] uppercase font-semibold px-4 py-2 transition-all ${
                        selectedFilter === filter.id
                          ? 'bg-[#2C2C2C] text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => {
                      setModalProject(project);
                      setViewBeforeAfter(false);
                    }}
                    className="group cursor-pointer bg-[#F9F9F8] border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-200">
                      <img
                        src={project.renderImg}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-[#2C2C2C]/90 text-white text-[9px] tracking-[0.2em] font-bold px-3 py-1 uppercase">
                        {project.categoryLabel}
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 text-stone-900 text-[10px] tracking-[0.2em] uppercase font-bold px-6 py-2.5 shadow-lg flex items-center gap-2">
                          <Eye size={14} /> View 3D Details & Write-up
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-stone-400 mb-2">
                        {project.style} &nbsp;·&nbsp; {project.dimensions}
                      </p>
                      <h3 style={headingFont} className="text-2xl text-[#2C2C2C] font-normal mb-2 group-hover:text-stone-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-stone-600 font-light line-clamp-3 leading-relaxed mb-6">
                        {project.writeup}
                      </p>

                      <div className="mt-auto pt-4 border-t border-stone-200 flex justify-between items-center text-[10px] text-stone-500 font-medium">
                        <span>4 Deliverables Included</span>
                        <span className="uppercase tracking-widest text-[#2C2C2C] font-bold group-hover:underline flex items-center gap-1">
                          Read Concept <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Virtual Design How it Works */}
          <section className="py-20 px-4 sm:px-8 lg:px-16 bg-[#F4F0EB]">
            <div className="max-w-6xl mx-auto text-center mb-16">
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-stone-400 mb-3">Seamless Online Process</p>
              <h2 style={headingFont} className="text-3xl sm:text-5xl text-[#2C2C2C]">How Virtual Design Works</h2>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Share Your Space',
                  desc: 'Submit your room measurements, photos, and inspiration links through our online questionnaire.',
                },
                {
                  step: '02',
                  title: '3D Renderings & Concept',
                  desc: 'Our design studio crafts multi-angle 3D spatial models, color swatches, and floor plans.',
                },
                {
                  step: '03',
                  title: 'Review & Refine',
                  desc: 'Collaborate with your designer in one-on-one virtual review sessions to fine-tune every detail.',
                },
                {
                  step: '04',
                  title: 'Shop & Install',
                  desc: 'Receive your complete design kit with direct trade purchasing links and styling step-by-step guides.',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 border border-stone-200 text-left relative shadow-sm">
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
        </div>
      ) : (
        /* FULL SERVICE SECTION */
        <div className="w-full">
          <section className="py-20 px-4 sm:px-8 lg:px-16 max-w-[95rem] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-bold text-stone-500 border-b border-stone-400 pb-1">
                  Full-Scale Residential & Architecture
                </span>
                <h2 style={headingFont} className="text-3xl sm:text-5xl text-[#2C2C2C] font-normal leading-tight">
                  Full Service Interior Design
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  Our Full Service offering is a turn-key experience for clients building a new home, executing a major renovation, or completely furnishing a large estate. We manage every phase from initial architectural drafting to custom millwork, contractor oversight, procurement, and final white-glove styling.
                </p>
                <div className="space-y-3 pt-2 text-xs text-stone-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-stone-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-stone-900">Comprehensive Spatial & Architectural Planning</strong>
                      <span>Custom cabinetry, lighting schedules, tile layouts, and architectural trim details.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-stone-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-stone-900">Project Management & General Contractor Coordination</strong>
                      <span>Site visits, trade oversight, and seam-to-seam project execution.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-stone-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-stone-900">White-Glove Turn-Key Delivery & Installation</strong>
                      <span>Complete furniture assembly, artwork hanging, window treatments, and final styling reveal.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="w-full aspect-[4/5] overflow-hidden shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
                    alt="Full Service Interior Design Estate"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR VIRTUAL DESIGN DETAILS */}
      {modalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-stone-300 my-8">
            <button
              onClick={() => setModalProject(null)}
              className="absolute top-4 right-4 z-20 bg-stone-900 text-white p-2 hover:bg-stone-700 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#2C2C2C] text-white text-[9px] tracking-[0.2em] font-bold px-3 py-1 uppercase">
                  {modalProject.categoryLabel}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {modalProject.style} &nbsp;·&nbsp; {modalProject.dimensions}
                </span>
              </div>

              <h2 style={headingFont} className="text-3xl sm:text-4xl text-[#2C2C2C] font-normal mb-6">
                {modalProject.title}
              </h2>

              {/* Render Image or Before/After toggle */}
              <div className="mb-6 relative">
                {modalProject.beforeImg && (
                  <div className="flex justify-end mb-3 space-x-2">
                    <button
                      onClick={() => setViewBeforeAfter(false)}
                      className={`text-[10px] tracking-[0.15em] uppercase font-bold px-4 py-1.5 border ${
                        !viewBeforeAfter ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      3D Render
                    </button>
                    <button
                      onClick={() => setViewBeforeAfter(true)}
                      className={`text-[10px] tracking-[0.15em] uppercase font-bold px-4 py-1.5 border ${
                        viewBeforeAfter ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      Original Space
                    </button>
                  </div>
                )}

                <div className="w-full aspect-[16/10] bg-stone-200 overflow-hidden relative">
                  <img
                    src={viewBeforeAfter && modalProject.beforeImg ? modalProject.beforeImg : modalProject.renderImg}
                    alt={modalProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white text-[10px] tracking-widest px-3 py-1 uppercase">
                    {viewBeforeAfter ? 'Before Renovation' : 'Virtual Design 3D Concept'}
                  </div>
                </div>
              </div>

              {/* Comprehensive Write-Up */}
              <div className="space-y-6 text-stone-700 font-light leading-relaxed text-sm border-b border-stone-200 pb-8 mb-8">
                <div>
                  <h3 style={headingFont} className="text-2xl text-[#2C2C2C] font-normal mb-2">
                    Design Concept & Strategy
                  </h3>
                  <p className="text-stone-600 leading-loose">{modalProject.writeup}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="bg-[#F9F9F8] p-5 border border-stone-200">
                    <h4 className="text-[11px] uppercase tracking-widest font-bold text-stone-800 mb-3">
                      Included Deliverables
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600">
                      {modalProject.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check size={14} className="text-stone-800 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#F9F9F8] p-5 border border-stone-200">
                    <h4 className="text-[11px] uppercase tracking-widest font-bold text-stone-800 mb-3">
                      Color & Material Palette
                    </h4>
                    <div className="flex space-x-3 mb-4">
                      {modalProject.palette.map((color, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div
                            className="w-8 h-8 rounded-full border border-stone-300 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-[9px] text-stone-400 font-mono mt-1">{color}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-stone-500 italic">
                      Swatches provided directly in our physical Virtual Design Package.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setModalProject(null);
                    // scroll to inquiry form
                    const formElement = document.getElementById('inquiry-form-section');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-[#2C2C2C] text-white px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-stone-900 transition-colors"
                >
                  Start A Similar Project
                </button>
                <button
                  onClick={() => setModalProject(null)}
                  className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900"
                >
                  Close Showcase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

            {/* Numbered Navigation Guide from Screenshot */}
            <div className="space-y-4 pt-4 border-t border-stone-300/60">
              {[
                { step: '1.', label: 'THE ESSENTIALS', id: 1 },
                { step: '2.', label: 'YOUR HOME', id: 2 },
                { step: '3.', label: 'BUDGET & TIMELINE', id: 3 },
                { step: '4.', label: 'INSPIRATION', id: 4 },
                { step: '5.', label: 'PROJECT OBJECTIVE', id: 5 },
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
                <CheckCircle size={48} className="mx-auto text-stone-800" strokeWidth={1.5} />
                <h3 style={headingFont} className="text-3xl text-stone-900">
                  Thank You For Your Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  We have received your project details. A member of our design team will review your specifications and contact you within 2–3 business days.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="border border-stone-800 text-stone-900 px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-stone-900 hover:text-white transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                {/* 1. What type of design services */}
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

                {/* 2. Location & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-stone-800">
                      Project Location (City)
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
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-stone-800">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                    />
                  </div>
                </div>

                {/* 3. Sq Ft & Completion Timeframe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-stone-800">
                      Approximate Square Footage of Home
                    </label>
                    <input
                      type="text"
                      name="sqFt"
                      value={formData.sqFt}
                      onChange={handleInputChange}
                      className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-stone-800">
                      Completion Timeframe
                    </label>
                    <input
                      type="text"
                      name="completionTimeframe"
                      value={formData.completionTimeframe}
                      onChange={handleInputChange}
                      className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                    />
                  </div>
                </div>

                {/* 4. Budget & Start Timeframe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-stone-800">
                      Construction Budget (Approx)
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-stone-800">
                      Start Timeframe
                    </label>
                    <input
                      type="text"
                      name="startTimeframe"
                      value={formData.startTimeframe}
                      onChange={handleInputChange}
                      className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                    />
                  </div>
                </div>

                {/* 5. Align Projects */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-stone-800">
                    Which Studio McGee Projects Best Align With Your Project?
                  </label>
                  <input
                    type="text"
                    name="projectAlign"
                    value={formData.projectAlign}
                    onChange={handleInputChange}
                    className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                  />
                </div>

                {/* 6. Pinterest Link */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-stone-800">
                    If you have a Pinterest board to share your design inspiration, please link it here
                  </label>
                  <input
                    type="text"
                    name="pinterestLink"
                    value={formData.pinterestLink}
                    onChange={handleInputChange}
                    placeholder="https://"
                    className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-500 rounded-none shadow-sm"
                  />
                </div>

                {/* 7. Main Reason */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-stone-800">
                    What is the main reason you would like to hire an interior designer?
                  </label>
                  <textarea
                    name="mainReason"
                    value={formData.mainReason}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3.5 bg-white border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-stone-500 rounded-none shadow-sm resize-y"
                  />
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
