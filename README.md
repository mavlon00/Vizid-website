# Vizid | Live Luxury

Vizid is a premium interior architecture and luxury furnishings brand website built for a modern client handover workflow. The repository contains the public storefront, the responsive marketing experience, the shop and checkout flow, and the supporting Supabase + Paystack backend services.

## Live / Staging

- Production: https://viziddecors.com
- Staging: Set this to your preview domain or Cloudflare Pages preview URL before deployment
- Admin dashboard: Use your deployed admin frontend URL, or the local Vite admin app during setup

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- Supabase Auth and Postgres
- Paystack payment integration
- Cloudflare Pages / static hosting configuration
- Serverless edge functions for payment verification and webhook handling

## Project Structure

```bash
.
├── src/                         # Public storefront app
├── admin/                      # Admin dashboard app
├── public/                     # Static assets and hosting headers
├── supabase/functions/         # Paystack verification + webhook handlers
├── tests/                      # Regression checks
├── .env.example                # Environment configuration template
├── .gitignore                  # Protects secrets and local env files
├── index.html                  # Entry app shell
├── package.json                # Scripts and dependencies
├── vite.config.ts              # Vite development configuration
├── wrangler.toml               # Cloudflare static deployment config
├── README.md                   # Project overview and handover docs
└── docs/                       # Architecture, deployment, security, QA, and handover documentation
```

## Getting Started

### 1) Clone the repository

```bash
git clone <your-private-repo-url>
cd vizid
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create your local environment file from the example template:

```bash
cp .env.example .env
```

Then fill in the values for your environment.

### 4) Run the app locally

```bash
npm run dev -- --host 0.0.0.0 --port 4173
```

The storefront runs on the default Vite development server, typically at:

- http://localhost:4173

### 5) Build for production

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview -- --host 0.0.0.0 --port 4173
```

## Environment Variables

Create a `.env` file locally based on `.env.example` and never commit it to source control.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Yes | Supabase project URL used by the storefront and admin frontend |
| `VITE_SUPABASE_ANON_KEY` | Yes | Public anonymous key for client-side auth and data access |
| `VITE_PAYSTACK_PUBLIC_KEY` | Yes | Public Paystack key used to initialize checkout |
| `PAYSTACK_SECRET_KEY` | Yes (server-side) | Secret key for edge-function verification and webhook handling |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (server-side) | Required inside Supabase Edge Functions for privileged database writes |

> Secret variables must live in the deployment platform or Supabase dashboard, not in committed code.

## Important Notes

### Shop and checkout

- The public storefront supports a guest checkout flow for convenience while keeping sign-in and account creation optional.
- Customers can continue browsing the shop and complete checkout without creating an account if preferred.
- Users who decide to sign in later are returned to the checkout flow and can resume their intended action.
- Payment verification remains server-side through Supabase Edge Functions rather than trusting client-side confirmation alone.

### Security

- Real security headers are configured in the static hosting headers file for the public site and admin frontend.
- The project uses a restrictive Content Security Policy, HSTS, frame protections, sniffing protection, and privacy-focused referrer controls.
- `.env` files are ignored by Git and must never be committed.
- Public forms include basic anti-bot controls such as hidden honeypot fields and short rate limiting.

### Production readiness

- Ensure `VITE_PAYSTACK_PUBLIC_KEY` is set to the live production key before launch.
- Ensure `PAYSTACK_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are configured inside your secure runtime environment.
- Confirm Supabase Row Level Security policies are active before going live.
- Validate all product data, checkout flows, and payment processing in staging before handing the site to the client.

## Deployment Notes

This project is designed for static hosting with a serverless backend layer.

### Recommended deployment flow

1. Configure environment variables in your production environment.
2. Build the frontend with `npm run build`.
3. Deploy the generated static bundle to Cloudflare Pages or your chosen static host.
4. Deploy Supabase Edge Functions for the payment verification and webhook handlers.
5. Validate live Paystack callbacks and successful verification responses.
6. Re-check security headers and CSP behavior in the production environment.

## Documentation / Support

Key project guidance is included in the documentation folder:

- `docs/ARCHITECTURE.md`
- `docs/DEPLOYMENT.md`
- `docs/SECURITY-AUDIT.md`
- `docs/QA-REPORT.md`
- `docs/HANDOVER-CHECKLIST.md`

For support or handover questions, coordinate with the project owner and confirm the live environment credentials, deployment domain, and production secrets in the secure hosting dashboard before final client signoff.

## License

This project is intended for private client delivery and internal deployment use. Please confirm the final licensing terms with the client or project owner before public redistribution.
