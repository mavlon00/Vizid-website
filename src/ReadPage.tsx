import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, Bookmark, Share2, ArrowRight, Eye, Sparkles, Check } from 'lucide-react';

interface ReadArticle {
  id: number;
  category: 'design' | 'how-to' | 'around-the-table' | 'lifestyle';
  categoryLabel: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  author: string;
  img: string;
  galleryImgs?: string[];
  writeup: string;
  sections: {
    heading: string;
    content: string;
  }[];
  quote?: string;
  takeaways?: string[];
}

interface ReadPageProps {
  headingFont: React.CSSProperties;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const ReadPage: React.FC<ReadPageProps> = ({
  headingFont,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedCategory || 'all');
  const [modalArticle, setModalArticle] = useState<ReadArticle | null>(null);

  // Sync category if prop changes from navigation
  useEffect(() => {
    if (selectedCategory) {
      setActiveTab(selectedCategory.toLowerCase().replace(/\s+/g, '-'));
    }
  }, [selectedCategory]);

  const articles: ReadArticle[] = [
    {
      id: 1,
      category: 'design',
      categoryLabel: 'DESIGN',
      title: 'Oxford Road Project: Episode 6 & 3D Spatial Walkthrough',
      subtitle: 'Final Walkthrough & Architectural Virtual Analysis with Shea McGee',
      date: 'JULY 28, 2026',
      readTime: '6 MIN READ',
      author: 'Shea McGee',
      img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      galleryImgs: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
      ],
      writeup:
        'In the final installment of our Oxford Road Project reveal, we take an intimate look at how 3D virtual spatial modeling laid the foundation for every architectural decision. From vaulted timber ceiling proportions to limestone hearth detailing, virtual design allowed us to visualize the interplay of natural light and tactile textures before breaking ground.',
      sections: [
        {
          heading: '1. The Vision Behind the Great Room',
          content:
            'When approaching the Oxford Road residence, the goal was clear: create a home that feels like it has been rooted in the landscape for decades while offering modern airiness. Using our virtual 3D rendering workflow, we tested 14 different beam stained finishes and ceiling heights to achieve the precise warmth needed to balance the vast limestone fireplace.',
        },
        {
          heading: '2. Custom Cabinetry & Material Layering',
          content:
            'The kitchen features a custom blend of rift-sawn white oak and hand-painted perimeter cabinetry in a muted warm stone tone. Through photorealistic 3D lighting simulations, we ensured that unlacquered brass hardware would develop an organic patina that harmonizes with the honed Calacatta marble counters.',
        },
        {
          heading: '3. Spatial Clearance & Furniture Scale',
          content:
            'One of the greatest advantages of virtual interior design is testing furniture scale in true 3D dimensions. We scaled the 12-foot custom sectional and bouclé swivel armchairs to maintain 48 inches of clear walkway space around traffic corridors.',
        },
      ],
      quote:
        '“A space should feel like it was collected over time, not created in a single day. Virtual 3D planning gives us the freedom to refine every line until it feels effortless.”',
      takeaways: [
        'Vaulted ceiling beams require warm undertones to prevent large spaces from feeling stark.',
        'Pairing brushed stone with unlacquered metal adds tactile depth that ages gracefully.',
        'Maintain a minimum 42–48 inch traffic path in high-traffic open living areas.',
      ],
    },
    {
      id: 2,
      category: 'design',
      categoryLabel: 'DESIGN',
      title: 'Virtual Kitchen Design: The New Heritage Cabinetry Guide',
      subtitle: 'Designing Timeless Kitchens in 3D Before Construction Begins',
      date: 'JULY 22, 2026',
      readTime: '8 MIN READ',
      author: 'Claire Wickström',
      img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
      galleryImgs: [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800',
      ],
      writeup:
        'Kitchen design requires the highest precision of any room in the home. In this comprehensive guide, we demonstrate how virtual 3D cabinetry modeling helps homeowners visualize island proportions, appliance integration, and material palettes with total confidence.',
      sections: [
        {
          heading: 'Designing the Work Triangle in 3D',
          content:
            'The relationship between refrigerator, sink, and cooktop dictates kitchen functionality. In our virtual design process, we map out prep zones and appliance door swing radii in 3D to eliminate friction before cabinet fabrication starts.',
        },
        {
          heading: 'Selecting Backsplash & Countertop Pairings',
          content:
            'Honed marble vs. zellige tile is a common debate. By rendering both options in high-definition 3D environments, clients can observe how afternoon sunlight reflects off hand-glazed tiles versus matte natural stone surfaces.',
        },
      ],
      quote:
        '“The secret to a timeless kitchen lies in the quiet details—the bead of a cabinet door, the curve of a faucet spout, and the warmth of real wood.”',
      takeaways: [
        'Always verify island overhang clearance (minimum 12–15 inches for comfortable seating).',
        'Incorporate hidden appliance garages to keep quartz or marble countertops uncluttered.',
      ],
    },
    {
      id: 3,
      category: 'design',
      categoryLabel: 'DESIGN',
      title: 'Mixing Wood Tones & Textures in 3D Spatial Layouts',
      subtitle: 'How to Layer Oak, Walnut, and Pine Without Clashing',
      date: 'JULY 15, 2026',
      readTime: '5 MIN READ',
      author: 'Shea McGee',
      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'Matching all wood finishes in a home can leave a space feeling flat and store-bought. Learn how our virtual design team blends warm oak flooring, vintage walnut accent tables, and antique pine armoires to create rich, layered interiors.',
      sections: [
        {
          heading: '1. Establish a Dominant Wood Tone',
          content:
            'Start by identifying your anchor wood finish—typically your flooring or major cabinetry piece. Your dominant tone sets the temperature (warm or cool) for the entire room.',
        },
        {
          heading: '2. Contrast Undertones with Purpose',
          content:
            'Mix smooth, refined woods like white oak with heavily textured antique pine or reclaimed elm. The contrast in grain density creates character without visual chaos.',
        },
      ],
      quote:
        '“Don’t match your wood tones—harmonize them. Let one finish ground the space while secondary woods tell the story.”',
      takeaways: [
        'Keep undertones consistent (warm with warm, cool with cool) even when varying wood species.',
        'Use woven wool or natural fiber rugs as a visual buffer between wood flooring and wood furniture legs.',
      ],
    },
    {
      id: 4,
      category: 'how-to',
      categoryLabel: 'HOW TO',
      title: 'The Ultimate Guide to Rug Sizing & Spatial Layouts',
      subtitle: 'Avoid Common Sizing Mistakes with Our Scaled 3D Blueprint Guide',
      date: 'JULY 10, 2026',
      readTime: '7 MIN READ',
      author: 'Studio Design Team',
      img: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'A rug that is too small instantly makes a room feel cramped. Our 3D spatial designers walk through exact rules for rug dimensions across living rooms, dining areas, and bedrooms so your space feels anchored and expansive.',
      sections: [
        {
          heading: 'Living Room Rug Rules',
          content:
            'Ideally, all legs of your main seating pieces should sit comfortably on the rug. If space is tight, ensure at least the front two legs of sofas and accent chairs rest on the rug with a 6-inch overhang on either side.',
        },
        {
          heading: 'Dining Room Proportioning',
          content:
            'Your dining rug must extend at least 24 inches past all sides of the table so dining chairs remain on the rug even when pulled out for seating.',
        },
      ],
      takeaways: [
        'Living Room: 9x12 or 10x14 for standard open plans; 8x10 for smaller footprints.',
        'Bedroom: Extend rug 24–36 inches beyond the foot and sides of Queen/King bed frames.',
      ],
    },
    {
      id: 5,
      category: 'how-to',
      categoryLabel: 'HOW TO',
      title: 'How to Layer Lighting: Ambient, Task, and Accent Visuals',
      subtitle: 'Transforming Room Moods with 3-Tier Virtual Lighting Plans',
      date: 'JULY 05, 2026',
      readTime: '6 MIN READ',
      author: 'Claire Wickström',
      img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'Relying solely on overhead recessed lighting creates harsh shadows and flattens a room. Learn how to layer chandelier focal points, picture lights, and table lamps for a warm, inviting glow at any time of day.',
      sections: [
        {
          heading: '1. Ambient Overhead Lighting',
          content:
            'Start with dimmable ambient light—statement chandeliers, flush mounts, or warm-spectrum recessed lights placed strategically along perimeter walls.',
        },
        {
          heading: '2. Eye-Level Task & Accent Sconces',
          content:
            'Incorporate wall sconces and table lamps at eye level (around 60 inches from the floor) to bring warmth into seating nooks and highlights artwork.',
        },
      ],
      quote:
        '“Lighting is the jewelry of interior design. When done right, it changes not just how a room looks, but how you feel inside it.”',
      takeaways: [
        'Use 2700K LED bulbs for warm, flattering indoor ambient light.',
        'Hang dining chandeliers 30–36 inches above table surfaces for optimal clearance.',
      ],
    },
    {
      id: 6,
      category: 'how-to',
      categoryLabel: 'HOW TO',
      title: 'Styling Open Shelving in the Kitchen: Step-by-Step 3D Layout',
      subtitle: 'Achieving Balance Between Functional Storage and Aesthetic Display',
      date: 'JUNE 28, 2026',
      readTime: '4 MIN READ',
      author: 'Shea McGee',
      img: 'https://images.unsplash.com/photo-1556910103-1c02745a828d?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'Open shelves are a beautiful showcase for ceramic dishware, glassware, and heirloom pieces. Here is our step-by-step formula for styling open shelving without cluttering your kitchen space.',
      sections: [
        {
          heading: 'Start with Heavy Foundation Pieces',
          content:
            'Place larger items like stacks of dinner plates, Dutch ovens, or ceramic pitchers on the lowest shelves to ground the display visually.',
        },
        {
          heading: 'Vary Height & Texture Across Levels',
          content:
            'Incorporate glassware, wooden cutting boards, and small potted herbs on upper shelves. Group items in odd numbers (3s or 5s) for organic balance.',
        },
      ],
      takeaways: [
        'Group items by color family for cohesive visual rhythm.',
        'Leave negative space on every shelf—don’t pack edges to the wall.',
      ],
    },
    {
      id: 7,
      category: 'around-the-table',
      categoryLabel: 'AROUND THE TABLE',
      title: 'Strawberries & Cream Summer Cake',
      subtitle: 'A Taste of Summer Nostalgia & Outdoor Dining Styling',
      date: 'JULY 18, 2026',
      readTime: '5 MIN READ',
      author: 'Syd & Shea McGee',
      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'Summer calls for effortless entertaining with fresh seasonal ingredients. This light chiffon cake layered with fresh farm strawberries and chantilly cream is our family favorite for sunny afternoon gatherings.',
      sections: [
        {
          heading: 'The Inspiration',
          content:
            'Growing up, summer weekends were defined by fresh berry desserts on the patio. We wanted to share a light, airy cake recipe that looks beautiful as a center dining table focal point.',
        },
        {
          heading: 'Styling the Outdoor Tablescape',
          content:
            'Pair this sweet treat with washed linen napkins, antique silver cake servers, and freshly clipped garden hydrangeas in stone vessels.',
        },
      ],
      takeaways: [
        'Use chilled cake layers to ensure clean whipping cream assembly.',
        'Decorate top layers with edible flowers and fresh mint sprigs.',
      ],
    },
    {
      id: 8,
      category: 'around-the-table',
      categoryLabel: 'AROUND THE TABLE',
      title: 'The Art of Tablescape Design: Layering Linens, Candles & Florals',
      subtitle: 'Curating Unforgettable Dinner Parties for Any Season',
      date: 'JULY 02, 2026',
      readTime: '6 MIN READ',
      author: 'Shea McGee',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'Setting a memorable table is about creating an environment where guests feel welcomed and linger long after the meal ends. Discover our formula for layering textures, low florals, and warm candlelight.',
      sections: [
        {
          heading: 'Keep Florals Low for Conversation',
          content:
            'Avoid tall arrangements that block eye contact across the table. Opt for low ceramic bowls or clustered bud vases with loose, organic stems.',
        },
        {
          heading: 'Mix Metal & Ceramic Textures',
          content:
            'Pair brass taper candle holders with hand-thrown ceramic dinnerware and vintage glassware for a relaxed, elevated mood.',
        },
      ],
      quote:
        '“The best tablescapes don’t feel rigid. They feel alive, personal, and ready for lively conversation.”',
    },
    {
      id: 9,
      category: 'around-the-table',
      categoryLabel: 'AROUND THE TABLE',
      title: 'Autumn Harvest Dinner & Wine Pairing Guide',
      subtitle: 'Warm Flavors & Intimate Dining Room Ambience',
      date: 'JUNE 15, 2026',
      readTime: '7 MIN READ',
      author: 'Studio Lifestyle Team',
      img: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'As temperatures drop, embrace rich roasted root vegetables, braised short ribs, and bold Pinot Noirs. We share our cozy autumn menu alongside warm 3D lighting ideas for formal dining spaces.',
      sections: [
        {
          heading: 'The Menu Blueprint',
          content:
            'Start with butternut squash soup garnished with crispy sage, followed by red wine braised short ribs over creamy polenta.',
        },
        {
          heading: 'Dining Room Lighting Dynamics',
          content:
            'Dim overhead chandeliers to 30% power and rely on beeswax taper candles to cast warm, flickering golden light.',
        },
      ],
    },
    {
      id: 10,
      category: 'lifestyle',
      categoryLabel: 'LIFESTYLE',
      title: 'Creating a Serene Morning Ritual: Sanctuary Spaces',
      subtitle: 'Designing Nooks for Tea, Reading, and Daily Mindful Rest',
      date: 'JULY 25, 2026',
      readTime: '5 MIN READ',
      author: 'Shea McGee',
      img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'How you start your morning sets the tone for your entire day. We share design ideas for creating a dedicated morning nook with plush seating, natural window light, and clutter-free surfaces.',
      sections: [
        {
          heading: 'The Elements of a Restful Corner',
          content:
            'Position a comfortable armchair near natural morning light. Add a small side table for your warm cup of tea and an adjustable floor lamp.',
        },
        {
          heading: 'Tactile Comfort First',
          content:
            'Incorporate alpaca wool throws, textured linen cushions, and soft ambient scents like sandalwood or cedar.',
        },
      ],
      quote:
        '“Your home should nurture your morning energy before the business of the world steps in.”',
    },
    {
      id: 11,
      category: 'lifestyle',
      categoryLabel: 'LIFESTYLE',
      title: 'Behind the Scenes: A Day in the Studio with Shea McGee',
      subtitle: 'Inside Material Sourcing, 3D Virtual Reviews, and Product Design',
      date: 'JUNE 20, 2026',
      readTime: '9 MIN READ',
      author: 'Studio Editorial',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'Step inside our design studio to see how our team develops custom furniture collections, conducts client virtual 3D design reviews, and curates material swatch palettes.',
      sections: [
        {
          heading: '8:30 AM — Design Concept Reviews',
          content:
            'We start the day reviewing 3D spatial models for active virtual design clients, checking furniture scale, fabric swatches, and lighting clearance.',
        },
        {
          heading: '1:00 PM — Textile & Stone Sourcing',
          content:
            'Reviewing new limestone tile samples, unlacquered brass hardware iterations, and Belgian linen upholstery swatches for upcoming furniture launches.',
        },
      ],
    },
    {
      id: 12,
      category: 'lifestyle',
      categoryLabel: 'LIFESTYLE',
      title: 'Collected Travel Sourcing: Bringing Global Artisans Home',
      subtitle: 'Sourcing One-of-a-Kind Antiques and Textiles Around the World',
      date: 'JUNE 08, 2026',
      readTime: '6 MIN READ',
      author: 'Shea McGee',
      img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=1200',
      writeup:
        'Travel is our greatest source of design inspiration. Discover how we hunt for European antique ceramics, hand-woven Turkish rugs, and vintage wood vessels to give client projects unique soul.',
      sections: [
        {
          heading: 'Finding Beauty in Imperfection',
          content:
            'Handmade ceramics with irregular glazes and weathered wood vessels bring warmth and history into modern spaces.',
        },
        {
          heading: 'Integrating Antiques into Modern Homes',
          content:
            'Pair a sleek modern sofa with a 19th-century oak stool or antique brass candlestick to create striking visual dialogue.',
        },
      ],
    },
  ];

  const filteredArticles =
    activeTab === 'all'
      ? articles
      : articles.filter(
          (a) => a.category === activeTab || a.category.replace(/-/g, '') === activeTab.replace(/-/g, '')
        );

  const heroArticle = articles[0];

  return (
    <div className="w-full bg-[#F9F9F8] min-h-screen text-[#2C2C2C] pb-24">
      {/* Journal Hero Section */}
      <section className="bg-[#3D423F] text-white py-16 sm:py-24 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold text-stone-300 mb-4">
            Studio Journal & Design Editorial
          </p>
          <h1 style={headingFont} className="text-4xl sm:text-6xl lg:text-7xl font-light mb-6">
            Read & Inspire
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed mb-10">
            Explore our latest 3D virtual design walkthroughs, interior styling guides, culinary stories, and behind-the-scenes studio insights.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              { id: 'all', label: 'All Articles' },
              { id: 'design', label: 'Design' },
              { id: 'how-to', label: 'How To' },
              { id: 'around-the-table', label: 'Around the Table' },
              { id: 'lifestyle', label: 'Lifestyle' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setSelectedCategory(cat.id);
                }}
                className={`text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-semibold px-5 py-2.5 transition-all duration-300 rounded-sm ${
                  activeTab === cat.id
                    ? 'bg-white text-stone-900 shadow-md font-bold'
                    : 'bg-[#2C2C2C]/70 text-stone-300 hover:text-white hover:bg-[#2C2C2C]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Main Article Banner */}
      {activeTab === 'all' && (
        <section className="max-w-[95rem] mx-auto px-4 sm:px-8 lg:px-12 py-12">
          <div
            onClick={() => setModalArticle(heroArticle)}
            className="relative w-full h-[55vh] sm:h-[70vh] overflow-hidden group cursor-pointer shadow-xl border border-stone-200"
          >
            <img
              src={heroArticle.img}
              alt={heroArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 text-white max-w-4xl">
              <div className="flex items-center space-x-3 mb-3 text-[10px] tracking-[0.2em] uppercase font-bold text-stone-300">
                <span className="bg-white/20 backdrop-blur px-3 py-1 text-white">{heroArticle.categoryLabel}</span>
                <span>{heroArticle.date}</span>
                <span>&bull; {heroArticle.readTime}</span>
              </div>

              <h2 style={headingFont} className="text-3xl sm:text-5xl lg:text-6xl font-light mb-4 leading-tight group-hover:text-stone-200 transition-colors">
                {heroArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-light mb-6 max-w-2xl line-clamp-2 leading-relaxed">
                {heroArticle.subtitle}
              </p>

              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-white pb-1 group-hover:pl-2 transition-all">
                Read Full Feature <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="max-w-[95rem] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div className="flex justify-between items-center mb-10 border-b border-stone-200 pb-4">
          <h3 style={headingFont} className="text-2xl sm:text-3xl text-[#2C2C2C] font-normal">
            {activeTab === 'all' ? 'Latest Stories & Guides' : `${activeTab.replace(/-/g, ' ').toUpperCase()} ARTICLES`}
          </h3>
          <span className="text-xs text-stone-500 font-medium">Showing {filteredArticles.length} Articles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setModalArticle(article)}
              className="group cursor-pointer bg-white border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-200">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-[#2C2C2C]/90 text-white text-[9px] tracking-[0.2em] font-bold px-3 py-1 uppercase">
                  {article.categoryLabel}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-[9px] tracking-[0.2em] uppercase font-medium text-stone-400 mb-3">
                  <span>{article.date}</span>
                  <span>&bull;</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 style={headingFont} className="text-2xl text-[#2C2C2C] font-normal mb-2 leading-snug group-hover:text-stone-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed mb-6 line-clamp-3">
                  {article.subtitle}
                </p>

                <div className="mt-auto pt-4 border-t border-stone-100 flex justify-between items-center text-[10px]">
                  <span className="text-stone-400 font-medium">By {article.author}</span>
                  <span className="uppercase tracking-widest font-bold text-[#2C2C2C] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Article <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FULL ARTICLE LIGHTBOX / READER MODAL */}
      {modalArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-stone-300 my-6">
            <button
              onClick={() => setModalArticle(null)}
              className="absolute top-4 right-4 z-20 bg-stone-900 text-white p-2 hover:bg-stone-700 transition-colors"
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            {/* Article Hero */}
            <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden bg-stone-900">
              <img
                src={modalArticle.img}
                alt={modalArticle.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white max-w-3xl">
                <span className="bg-white/20 backdrop-blur text-white text-[9px] tracking-[0.2em] font-bold px-3 py-1 uppercase inline-block mb-3">
                  {modalArticle.categoryLabel}
                </span>
                <h1 style={headingFont} className="text-3xl sm:text-5xl leading-tight font-light mb-2">
                  {modalArticle.title}
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 font-light">
                  By {modalArticle.author} &bull; {modalArticle.date} &bull; {modalArticle.readTime}
                </p>
              </div>
            </div>

            {/* Article Body Content */}
            <div className="p-6 sm:p-12 space-y-8 text-stone-800">
              <p className="text-base sm:text-lg font-light leading-relaxed text-stone-700 italic border-l-2 border-stone-800 pl-4">
                {modalArticle.writeup}
              </p>

              {/* Sections */}
              {modalArticle.sections.map((section, index) => (
                <div key={index} className="space-y-3 pt-4">
                  <h3 style={headingFont} className="text-2xl sm:text-3xl text-[#2C2C2C] font-normal">
                    {section.heading}
                  </h3>
                  <p className="text-xs sm:text-sm font-light leading-loose text-stone-600">
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Quote Block if present */}
              {modalArticle.quote && (
                <blockquote className="bg-[#F6F5F2] p-6 sm:p-8 my-8 border-l-4 border-stone-800">
                  <p style={headingFont} className="text-xl sm:text-2xl italic font-light text-stone-800 leading-relaxed mb-2">
                    {modalArticle.quote}
                  </p>
                  <cite className="text-xs uppercase tracking-widest font-bold text-stone-500 not-italic">
                    — {modalArticle.author}
                  </cite>
                </blockquote>
              )}

              {/* Takeaways if present */}
              {modalArticle.takeaways && (
                <div className="bg-[#FAF9F7] p-6 border border-stone-200 space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 border-b border-stone-200 pb-2">
                    Key Design Takeaways
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-600">
                    {modalArticle.takeaways.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={14} className="text-stone-800 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer CTA */}
              <div className="pt-8 border-t border-stone-200 flex justify-between items-center">
                <button
                  onClick={() => setModalArticle(null)}
                  className="bg-[#2C2C2C] text-white px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-stone-900 transition-colors"
                >
                  Close Article
                </button>
                <span className="text-xs text-stone-400 font-medium uppercase tracking-widest">
                  Share &bull; Studio Journal
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
