# Vizid — Technical SEO Implementation & Google Search Console Guide

**Production Domain**: `https://viziddecors.com`  
**Site Name**: `Vizid` (alternate: `Vizid Decor`, `Vizid Designs`)  
**Reference Standard**: Official Google Search Central Documentation

---

## 1. Technical SEO Implementations Completed

The following SEO infrastructure has been implemented in the codebase:

### 1.1 Dynamic Page Titles & Meta Descriptions
Every public section of the website updates `document.title`, `<meta name="description">`, canonical links, and social metadata dynamically:

| Route | Page Title | Meta Description |
|---|---|---|
| `/` | `Vizid - Live Luxury \| Interior Architecture & Luxury Furnishings` | Vizid brings an elevated luxury perspective to home furnishings, bespoke interior architecture, and décor. |
| `/portfolio` | `Portfolio & Curated Spaces \| Vizid Decor` | Explore completed residential transformations, spatial remodeling, and bespoke interior styling by Vizid. |
| `/shop` | `The Shop - Luxury Furniture & Décor \| Vizid` | Discover handcrafted luxury furnishings, ambient lighting, statement seating, and architectural accents from Vizid. |
| `/read` | `The Journal & Architectural Insights \| Vizid` | Articles, design principles, material selection guides, and architectural styling commentary by the Vizid design studio. |
| `/about` | `About Us - Our Story & Vision \| Vizid` | Learn about Vizid design philosophy, creative leadership under Victor Idika, and our commitment to architectural living. |
| `/work` | `Work With Us - Bespoke Interior Design Services \| Vizid` | Commission Vizid for full-service luxury residential design, spatial remodeling, or virtual architectural design consultation. |
| `/academy` | `Vizid Decor Academy - Master Interior Styling & Design` | Professional interior design masterclasses, spatial theory, and hands-on styling education by Vizid Decor Academy. |

### 1.2 Canonical URLs
* Every public page establishes its canonical identity using the production domain: `<link rel="canonical" href="https://viziddecors.com/[path]" />`.
* Prevents duplicate content issues across query parameters or alternate URLs.

### 1.3 Robots Directives (`robots.txt`)
Located at `https://viziddecors.com/robots.txt`:
```txt
# https://viziddecors.com robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /auth
Disallow: /profile

Sitemap: https://viziddecors.com/sitemap.xml
```

And for the admin portal at `https://admin.viziddecors.com/robots.txt`:
```txt
# https://admin.viziddecors.com robots.txt
User-agent: *
Disallow: /
```
* **Security & Privacy Protection**: Protects client profile views, internal admin routes, and session paths from appearing in search engine search results.

### 1.4 XML Sitemap (`sitemap.xml`)
Located at `https://viziddecors.com/sitemap.xml`:
* Fully conforms to the [sitemaps.org standard](http://www.sitemaps.org/schemas/sitemap/0.9).
* Includes only canonical, public, indexable endpoints (`/`, `/portfolio`, `/shop`, `/read`, `/about`, `/work`, `/academy`).
* Omits all authentication, admin, and dynamic checkout states.

### 1.5 Open Graph & Twitter Cards
* `og:site_name`: `Vizid`
* `og:type`: `website`
* `og:image`: `https://viziddecors.com/vizid.png` (high-contrast official luxury brand mark)
* `twitter:card`: `summary_large_image`

### 1.6 Schema.org Structured Data (JSON-LD)
Implemented directly in the HTML `<head>` for rich Google search snippets:
1. **WebSite Entity**: Identifies the preferred site name as `Vizid` (with alternate names `Vizid Decor` and `Vizid Designs`), matching Google's Site Names guidelines.
2. **Organization Entity**: Verified business information, official logo asset, and social profile links (`https://www.instagram.com/vizid_decors/`).

---

## 2. Google Search Console Readiness Checklist

> [!NOTE]
> The site owner must execute the following steps in their Google account. Automated agents cannot sign in or authorize Google Search Console on your behalf.

### Step 1: Verify Domain Ownership in Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property**.
3. Select the **Domain** property type (covers `viziddecors.com`, `www.viziddecors.com`, and all subdomains).
4. Enter `viziddecors.com`.
5. Google will provide a **DNS TXT record** (e.g., `google-site-verification=...`).
6. In your **Cloudflare Dashboard** (or domain registrar):
   - Navigate to **DNS** → **Records**.
   - Add a new record:
     - **Type**: `TXT`
     - **Name**: `@` (or `viziddecors.com`)
     - **Content**: The verification token from Google.
     - **TTL**: Auto.
7. Return to Google Search Console and click **Verify**.

### Step 2: Submit the XML Sitemap
1. In Google Search Console, click **Sitemaps** in the left navigation menu.
2. In the **Add a new sitemap** input field, enter:
   ```
   sitemap.xml
   ```
3. Click **Submit**.
4. Confirm that Google reports the status as **Success** with 7 discovered URLs.

### Step 3: Inspect Key Landing Pages
1. Use the **URL Inspection** bar at the top of Google Search Console.
2. Test the following URLs:
   - `https://viziddecors.com/`
   - `https://viziddecors.com/shop`
   - `https://viziddecors.com/portfolio`
   - `https://viziddecors.com/work`
3. Click **Test Live URL** to confirm that Googlebot can fetch and render the page.
4. Click **Request Indexing** for the homepage.

### Step 4: Monitor Ongoing Performance & Branded Searches
* Check the **Performance** tab weekly for:
  - Total impressions and clicks for queries such as `Vizid`, `Vizid Decor`, `Vizid Interior Design`.
* Monitor the **Pages** index coverage report to ensure 0 "Crawled - currently not indexed" or "Soft 404" errors.
* Monitor **Page Experience** / **Core Web Vitals** to ensure mobile responsiveness and loading speed remain optimal.
