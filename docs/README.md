# Vizid — Production Platform Overview & Setup

Welcome to the official technical documentation and repository guide for **Vizid** (`viziddecors.com`) and its companion **Admin Control Panel** (`admin.viziddecors.com`).

---

## 1. Project Overview

Vizid is an ultra-luxury interior architecture, residential spatial styling, and bespoke furnishings brand operating in Nigeria and internationally. The technical platform consists of two decoupled frontend web applications and a serverless Supabase/Paystack backend:

1. **Public Website (`Vizid-website`)**:
   - **Production URL**: `https://viziddecors.com`
   - **Repository**: `https://github.com/mavlon00/Vizid-website.git`
   - **Stack**: React 19, TypeScript, Vite, Tailwind CSS, GSAP / ScrollTrigger, Lenis smooth scrolling, Supabase JS SDK, Paystack Inline JS.
   - **Hosting**: Cloudflare Pages / Workers (SPA with static asset delivery).

2. **Admin Control Panel (`vizid-admin`)**:
   - **Production URL**: `https://admin.viziddecors.com`
   - **Repository**: `https://github.com/mavlon00/vizid-admin.git`
   - **Stack**: React 18/19, TypeScript, Vite, Tailwind CSS, Lucide React, Supabase JS SDK.
   - **Hosting**: Cloudflare Pages (standalone project).

3. **Backend & Cloud Services**:
   - **Database & Auth**: Supabase (PostgreSQL 15+, Supabase Auth, Row Level Security, Storage).
   - **Serverless Compute**: Supabase Edge Functions (Deno / TypeScript) for webhook handling and payment verification.
   - **Payment Gateway**: Paystack (Card, Bank Transfer, USSD via NGN currency).

---

## 2. Repository Layout

```
vizid/
├── admin/                      # Standalone Admin Portal repository (sub-repo)
│   ├── src/                    # Admin React application
│   ├── public/                 # Static assets, robots.txt (Disallow: /), _headers
│   └── package.json            # Admin dependencies & build scripts
├── docs/                       # Official Client Handover Documentation
│   ├── README.md               # This document
│   ├── ARCHITECTURE.md         # System architecture & data flow
│   ├── DEPLOYMENT.md           # Cloudflare, Supabase & Paystack deployment runbook
│   ├── SECURITY-AUDIT.md       # OWASP WSTG security audit & findings
│   ├── QA-REPORT.md            # Quality assurance test results & matrix
│   ├── SEO-HANDOVER.md         # Technical SEO, sitemap & Search Console guide
│   ├── CLIENT-USER-GUIDE.md    # Admin user manual for orders & products
│   ├── OPERATIONS.md           # Maintenance, monitoring, backups & incident response
│   └── HANDOVER-CHECKLIST.md   # Access transfer & acceptance checklist
├── public/                     # Public web assets (favicons, media, robots.txt, sitemap.xml, _headers)
├── src/                        # Public website React source code
│   ├── auth/                   # Client authentication types & validation utilities
│   ├── App.tsx                 # Main application router, hero, shop, modals
│   ├── ReadPage.tsx            # The Journal / articles module
│   ├── VizidDecorAcademyPage.tsx # Academy masterclasses & curriculum
│   ├── WorkWithUsPage.tsx      # Interior styling inquiry & consultation forms
│   └── supabase.ts             # Supabase client initializer
├── supabase/                   # Supabase backend definitions & edge functions
│   └── functions/
│       ├── paystack-webhook/   # Paystack HMAC-SHA512 webhook handler
│       └── verify-payment/     # Server-side transaction verification
├── tests/                      # Automated unit and integration test suite
├── package.json                # Website dependencies & scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite bundler configuration
└── wrangler.toml               # Cloudflare Workers / Pages configuration
```

---

## 3. Local Development Setup

### Prerequisites
- **Node.js**: v20.x or v22.x LTS
- **npm**: v10.x+
- **Git**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mavlon00/Vizid-website.git vizid
   cd vizid
   ```

2. **Install public website dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a local `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Run tests**:
   ```bash
   npm test
   ```

6. **Type check & production build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 4. Admin Portal Setup

If working on the administrative control panel:

```bash
cd admin
npm install
```

Create `admin/.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

Run dev server:
```bash
npm run dev
```

Build admin:
```bash
npm run build
```

---

## 5. Documentation Directory

For complete architectural diagrams, security audit reports, operational guides, and deployment workflows, consult the documents in the `docs/` folder:
- [Architecture & Data Flow](ARCHITECTURE.md)
- [Deployment & Environment Runbook](DEPLOYMENT.md)
- [Security Audit (OWASP WSTG)](SECURITY-AUDIT.md)
- [QA & Test Report](QA-REPORT.md)
- [Technical SEO & Search Console Guide](SEO-HANDOVER.md)
- [Client User Guide](CLIENT-USER-GUIDE.md)
- [Operations & Disaster Recovery](OPERATIONS.md)
- [Client Handover Checklist](HANDOVER-CHECKLIST.md)
