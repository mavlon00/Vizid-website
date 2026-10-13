# Vizid — Deployment & Environment Runbook

This runbook provides complete operational procedures for deploying, updating, configuring, and rolling back both the **Vizid Website** and the **Admin Control Panel**.

---

## 1. Production Architecture & Domains

| Application | Production URL | Git Repository | Deployment Platform |
|---|---|---|---|
| **Public Website** | `https://viziddecors.com` | `https://github.com/mavlon00/Vizid-website.git` | Cloudflare Pages / Workers |
| **Admin Control Panel** | `https://admin.viziddecors.com` | `https://github.com/mavlon00/vizid-admin.git` | Cloudflare Pages |
| **Backend & Database** | `https://[PROJECT-REF].supabase.co` | Managed Cloud Infrastructure | Supabase Cloud |

---

## 2. Environment Configuration Matrix

> [!IMPORTANT]
> Never commit `.env` files or secret values into version control. Configure variables in your hosting provider's dashboard or CLI environment.

### 2.1 Public Website Environment Variables (`Vizid-website`)

These variables are injected during the Vite build step:

| Variable Name | Required | Target | Purpose |
|---|---|---|---|
| `VITE_SUPABASE_URL` | **Yes** | Client Bundle | The HTTPS endpoint of the Supabase project |
| `VITE_SUPABASE_ANON_KEY` | **Yes** | Client Bundle | The public anonymous key for client database queries |
| `VITE_PAYSTACK_PUBLIC_KEY` | **Yes** | Client Bundle | The Paystack public key (`pk_live_...` for production, `pk_test_...` for staging) |

### 2.2 Admin Portal Environment Variables (`vizid-admin`)

| Variable Name | Required | Target | Purpose |
|---|---|---|---|
| `VITE_SUPABASE_URL` | **Yes** | Client Bundle | The HTTPS endpoint of the Supabase project |
| `VITE_SUPABASE_ANON_KEY` | **Yes** | Client Bundle | The public anonymous key for client database queries |

### 2.3 Supabase Edge Functions Secrets

These secrets must be configured inside the Supabase project dashboard (**Project Settings** → **Edge Functions** → **Secrets**) or via the Supabase CLI:

| Secret Name | Required | Purpose |
|---|---|---|
| `PAYSTACK_SECRET_KEY` | **Yes** | Paystack Secret Key (`sk_live_...` or `sk_test_...`) used to verify transactions and authenticate webhooks |
| `SUPABASE_URL` | **Yes** | Automatically injected by Supabase runtime |
| `SUPABASE_ANON_KEY` | **Yes** | Automatically injected by Supabase runtime |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Automatically injected by Supabase runtime; used by Edge Functions to update order status |

---

## 3. Public Website Deployment Guide

### Method A: Automated GitHub Continuous Deployment (Recommended)

1. Connect the GitHub repository `https://github.com/mavlon00/Vizid-website` in the **Cloudflare Dashboard** under **Workers & Pages**.
2. Configure build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: `/`
3. Add Environment Variables under **Settings** → **Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_PAYSTACK_PUBLIC_KEY`
   - `NODE_VERSION`: `20`
4. Any push to the `main` branch automatically triggers an end-to-end production build and deployment.

### Method B: Manual CLI Deployment with Wrangler

```bash
# 1. Ensure you are in the project root
cd /home/mavlon/vizid

# 2. Run quality checks
npm test
npx tsc --noEmit

# 3. Create production bundle
npm run build

# 4. Deploy to Cloudflare
npx wrangler pages deploy dist --project-name=vizid-website
```

---

## 4. Admin Portal Deployment Guide

### Method A: Automated GitHub Continuous Deployment

1. Connect the repository `https://github.com/mavlon00/vizid-admin` in Cloudflare Pages.
2. Configure build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: `/`
3. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `NODE_VERSION`: `20`
4. Add Custom Domain:
   - In Cloudflare Pages project settings, go to **Custom Domains** and add `admin.viziddecors.com`.

### Method B: Manual CLI Deployment

```bash
cd /home/mavlon/vizid/admin
npm run build
npx wrangler pages deploy dist --project-name=vizid-decor-admin
```

---

## 5. Supabase Edge Functions Deployment

When changes are made to the payment verification or webhook handlers in `supabase/functions/`:

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npx supabase --version
   ```

2. **Login and link project**:
   ```bash
   npx supabase login
   npx supabase link --project-ref [YOUR_SUPABASE_PROJECT_REF]
   ```

3. **Set Edge Function Secrets**:
   ```bash
   npx supabase secrets set PAYSTACK_SECRET_KEY=sk_live_your_actual_key
   ```

4. **Deploy Functions**:
   ```bash
   npx supabase functions deploy verify-payment --no-verify-jwt
   npx supabase functions deploy paystack-webhook --no-verify-jwt
   ```
   *(Note: `--no-verify-jwt` is used for `paystack-webhook` because Paystack calls it directly with an HMAC signature header, not a Supabase JWT. For `verify-payment`, the function itself explicitly validates the incoming JWT Bearer token internally).*

5. **Configure Paystack Webhook URL**:
   In the **Paystack Dashboard** (**Settings** → **API Keys & Webhooks**):
   - Set **Live Webhook URL**: `https://[YOUR_PROJECT_REF].supabase.co/functions/v1/paystack-webhook`

---

## 6. Rollback & Disaster Recovery Procedures

### Instant Rollback in Cloudflare Pages
1. Go to **Cloudflare Dashboard** → **Compute (Workers & Pages)**.
2. Select the affected project (`vizid-website` or `vizid-decor-admin`).
3. Click the **Deployments** tab.
4. Locate the last known healthy deployment.
5. Click the three dots (`...`) on that deployment and choose **Rollback to this deployment**.
6. Cloudflare instantly repoints edge traffic to the previous build in under 5 seconds with zero downtime.

### Git Rollback
If a faulty commit was pushed to `main`:
```bash
# Revert the commit cleanly without force-pushing
git revert [FAULTY_COMMIT_HASH]
git push origin main
```

---

## 7. Post-Deployment Verification Checklist

Immediately after deploying:
- [ ] Visit `https://viziddecors.com` in an incognito window.
- [ ] Check browser DevTools console (no script errors or missing chunks).
- [ ] Verify favicon appears in the browser tab.
- [ ] Navigate to `/shop`, `/portfolio`, `/read`, `/about`, `/work`, `/academy`. Ensure page loads and URL synchronizes.
- [ ] Perform a test login / registration on `/auth`.
- [ ] Verify `https://viziddecors.com/robots.txt` loads and permits intended public crawling.
- [ ] Verify `https://viziddecors.com/sitemap.xml` returns valid XML.
- [ ] Visit `https://admin.viziddecors.com`. Confirm unauthenticated requests are redirected to `/login`.
