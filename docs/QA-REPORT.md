# Vizid — Quality Assurance & Functional Test Report

**Date**: October 12, 2026  
**Auditor**: Antigravity QA Engineering  
**Scope**: Public Website (`viziddecors.com`) and Admin Portal (`admin.viziddecors.com`)

---

## 1. Executive QA Summary

| Category | Test Suite / Area | Tests Executed | Passed | Failed | Status |
|---|---|---|---|---|---|
| **Compilation** | TypeScript Type Checking (`npx tsc --noEmit`) | Full codebase | 1 | 0 | **PASS** |
| **Unit Tests** | Auth & Form Validation Utilities | 4 | 4 | 0 | **PASS** |
| **Integration** | Shop Authentication Flow & Redirects | 4 | 4 | 0 | **PASS** |
| **Production Build** | Vite Bundling & Asset Optimization | Full bundle | 1 | 0 | **PASS** |
| **Admin App** | Admin TypeScript & Build (`admin/npm run build`)| Full admin app | 1 | 0 | **PASS** |
| **Navigation & UI** | Responsive Menus & Page Routing | 6 | 6 | 0 | **PASS** |
| **Forms** | Validation, Error Handling & Submissions | 4 | 4 | 0 | **PASS** |
| **Security QA** | Route Guarding & Admin Access Denial | 3 | 3 | 0 | **PASS** |

---

## 2. Automated Test Execution Results

Command executed:
```bash
node --experimental-strip-types --test tests/*.test.mjs
```

### 2.1 Test Suite: `tests/auth-validation.test.mjs`
1. `✔ Full Name validation`: Tests empty strings, single characters, numbers-only, valid single and compound names. **PASS**
2. `✔ Email validation`: Tests missing '@', invalid TLDs, missing domain, subdomains, and RFC-compliant formats. **PASS**
3. `✔ Password validation requirements`: Tests empty, short (<8 chars), missing letters, missing numbers, medium strength, and strong passwords. **PASS**
4. `✔ Format error messages for Supabase`: Tests mapping raw Supabase error strings (e.g. duplicate user, invalid credentials, rate limit) into polished client-friendly messages. **PASS**

### 2.2 Test Suite: `tests/shop-auth-integration.test.mjs`
1. `✔ Guest shopping action redirects to existing auth page and preserves intended action`: Simulates guest clicking favorite; validates action stored in `sessionStorage`, redirection to auth, and auto-execution of favorite upon login. **PASS**
2. `✔ Guest Add to Cart redirects to existing auth page and completes upon authentication`: Validates guest add-to-cart redirect, auth completion, and cart state restoration. **PASS**
3. `✔ Authenticated user actions proceed directly without redirect`: Validates that logged-in users immediately toggle favorites and add items to cart. **PASS**
4. `✔ Logout restores guest restrictions and redirects to auth on action`: Confirms that signing out revokes session and re-enforces guest restrictions. **PASS**

---

## 3. Manual & Functional Test Matrix

### 3.1 Navigation & Responsive Layouts
| Test Case ID | Description | Expected Behavior | Observed Result | Status |
|---|---|---|---|---|
| **NAV-01** | Desktop Header Navigation | Clicking Read, Portfolio, About, Work, Academy loads the correct view. | Correct view renders; document title and URL synchronize cleanly. | **PASS** |
| **NAV-02** | Mobile Hamburger Menu | Clicking hamburger menu toggles overlay menu smoothly. | Menu opens; navigation items trigger correct views and close drawer. | **PASS** |
| **NAV-03** | Smooth Scrolling | Page transitions trigger Lenis scroll-to-top immediately. | `lenis.scrollTo(0)` executes on page change; ScrollTrigger refreshes. | **PASS** |
| **NAV-04** | Deep-Linking & Browser History | Navigating to `/shop` or using browser Back/Forward updates view. | Popstate event handler restores previous state correctly. | **PASS** |

### 3.2 Forms & Validation
| Test Case ID | Description | Expected Behavior | Observed Result | Status |
|---|---|---|---|---|
| **FRM-01** | Newsletter Subscription Form | Validates email format; prevents empty submissions; displays success state. | Submits to `newsletter_subscribers` table; displays confirmation. | **PASS** |
| **FRM-02** | Work With Us Consultation Form | Validates step inputs (Service type, Location, Home size); prepares WhatsApp link. | Encodes structured inquiry payload and opens WhatsApp with pre-filled text. | **PASS** |
| **FRM-03** | Auth Form Validation | Validates name, email, password strength with live progress indicator. | Live password strength bar updates; invalid inputs display inline warnings. | **PASS** |
| **FRM-04** | Checkout Shipping Form | Validates delivery address and phone number before initiating Paystack. | Fields required; disables submit during active submission. | **PASS** |

### 3.3 Authentication & Authorization
| Test Case ID | Description | Expected Behavior | Observed Result | Status |
|---|---|---|---|---|
| **AUTH-01** | Guest Shop Guarding | Guests attempting wishlist/add-to-cart are redirected to `/auth`. | Redirects to `/auth`; saves action to `sessionStorage`. | **PASS** |
| **AUTH-02** | Account Profile View | Authenticated users visiting `/auth` or `/profile` view account details. | Displays client name, email, member date, and Sign Out button. | **PASS** |
| **AUTH-03** | Logout Action | Clicking Sign Out terminates session and updates Header UI to "Sign In". | Calls `supabase.auth.signOut()`; state resets cleanly. | **PASS** |

### 3.4 Admin Control Panel QA
| Test Case ID | Description | Expected Behavior | Observed Result | Status |
|---|---|---|---|---|
| **ADM-01** | Unauthenticated Access | Visiting `admin.viziddecors.com` redirects to `/login`. | ProtectedRoute intercepts guest and routes to `/login`. | **PASS** |
| **ADM-02** | Non-Admin Login Rejection | User with role `customer` attempting admin login is blocked. | Logs out session immediately and displays "Access Denied: Your account does not have administrator privileges." | **PASS** |
| **ADM-03** | Product Catalog CRUD | Admin can list, create, edit, and delete products. | Form modal opens; input validation checks name/price; updates Supabase table. | **PASS** |
| **ADM-04** | Order Inspection | Admin can inspect order items, customer address, and update status. | Modal loads line items, total amount, customer details, and status dropdown. | **PASS** |

---

## 4. Build & Production Verification

### Public Website
- **Command**: `npm run build`
- **Modules Transformed**: 1,837
- **Output Files**:
  - `dist/index.html` (3.65 kB)
  - `dist/assets/index-[hash].css` (57.53 kB)
  - `dist/assets/index-[hash].js` (690.03 kB)
  - `dist/robots.txt`, `dist/sitemap.xml`, `dist/_headers`, `dist/vizid.png`
- **Result**: Built successfully with zero compiler errors.

### Admin Dashboard
- **Command**: `cd admin && npm run build`
- **TypeScript**: Passed with 0 errors (`tsc`).
- **Vite Output**: `dist/index.html`, `dist/assets/index-[hash].css`, `dist/assets/index-[hash].js`.
- **Result**: Built successfully with zero errors.
