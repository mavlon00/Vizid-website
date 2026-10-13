# Vizid — System Architecture & Integration Blueprint

---

## 1. High-Level Architecture

The Vizid digital ecosystem follows a decoupled, headless, serverless architecture. Public browsing, administrative operations, database storage, and financial transactions are separated into specialized tiers:

```mermaid
graph TD
    subgraph Client Tier
        UserBrowser["Customer Browser<br/>(viziddecors.com)"]
        AdminBrowser["Staff Browser<br/>(admin.viziddecors.com)"]
    end

    subgraph CDN & Edge Tier ["Cloudflare CDN & Edge"]
        CF_Web["Cloudflare Pages / Workers<br/>(Vizid Website)"]
        CF_Admin["Cloudflare Pages<br/>(Admin Portal)"]
    end

    subgraph Backend & Database ["Supabase Cloud"]
        SupaAuth["Supabase Auth<br/>(JWT / Email / Session)"]
        SupaDB[("PostgreSQL 15+<br/>profiles, products, orders,<br/>newsletter_subscribers")]
        SupaStorage["Supabase Storage<br/>(Product & Media Assets)"]
        EdgeVerify["Edge Function:<br/>verify-payment"]
        EdgeWebhook["Edge Function:<br/>paystack-webhook"]
    end

    subgraph Payment Processor ["Paystack API"]
        PaystackPop["Paystack Inline JS"]
        PaystackAPI["Paystack Transaction API"]
    end

    UserBrowser -->|HTTPS / Assets| CF_Web
    AdminBrowser -->|HTTPS / Assets| CF_Admin

    UserBrowser -->|Auth / Query / Insert| SupaAuth
    UserBrowser -->|Catalog / Orders| SupaDB
    UserBrowser -->|Initiate NGN Charge| PaystackPop
    UserBrowser -->|Call Verification| EdgeVerify

    AdminBrowser -->|Admin Login| SupaAuth
    AdminBrowser -->|CRUD Products / Orders| SupaDB

    PaystackPop -->|Card / Bank / USSD| PaystackAPI
    EdgeVerify -->|Server-to-Server Verify| PaystackAPI
    PaystackAPI -->|HMAC-SHA512 Webhook| EdgeWebhook
    EdgeWebhook -->|Update Order Status: paid| SupaDB
    EdgeVerify -->|Update Order Status: paid| SupaDB
```

---

## 2. Component & Application Breakdown

### 2.1 Public Website (`viziddecors.com`)
* **Framework**: React 19 SPA running on Vite 8.
* **Routing**: Pathname and hash synchronization (`/`, `/portfolio`, `/shop`, `/read`, `/about`, `/work`, `/academy`, `/auth`, `/profile`) with `window.history.pushState` and `popstate` event listeners.
* **Layout & Experience**: Lenis smooth momentum scrolling paired with GSAP ScrollTrigger for aesthetic transitions.
* **Authentication**: Supabase Auth client SDK integrated seamlessly with Shop actions (favoriting, add to cart, checkout). Guest actions are held in browser `sessionStorage` and restored upon login.
* **Deployment Model**: Built to static assets (`dist/`) and served globally by Cloudflare with Single Page Application routing (`not_found_handling = "single-page-application"`).

### 2.2 Admin Control Panel (`admin.viziddecors.com`)
* **Framework**: React SPA running on Vite 6 with React Router v6.
* **Security & Guarding**: `ProtectedRoute` wrapper guarding private administrative views (`/`, `/products`, `/orders`).
* **Role Verification**: Directly queries `profiles.role` using Supabase Auth. Any session lacking `role: 'admin'` is automatically rejected and signed out.
* **Operations**: Product creation, image uploading, inventory pricing, order inspection, and fulfillment status updates.

---

## 3. Data Tier: Supabase PostgreSQL Schema

The database model revolves around four core tables:

```mermaid
erDiagram
    PROFILES {
        uuid id PK "Matches auth.users.id"
        text email "User email"
        text role "customer | admin"
        timestamp created_at
    }

    PRODUCTS {
        uuid id PK "Primary key"
        text name "Product name"
        text description "Full details"
        numeric price "Price in NGN"
        text category "Living, Dining, Bedroom, etc."
        text image_url "URL or Supabase Storage link"
        uuid created_by FK "Refers to profiles.id"
        timestamp created_at
    }

    ORDERS {
        uuid id PK "Primary key"
        uuid user_id FK "Refers to auth.users.id"
        jsonb items "Array of line items"
        numeric total_amount "Order total in NGN"
        text delivery_address "Customer shipping destination"
        text phone_number "Contact phone number"
        text status "pending | paid | failed | fulfilled | cancelled"
        text paystack_reference "Unique payment reference"
        timestamp created_at
    }

    NEWSLETTER_SUBSCRIBERS {
        uuid id PK "Primary key"
        text email "Subscriber email UK"
        timestamp created_at
    }

    PROFILES ||--o{ ORDERS : places
    PROFILES ||--o{ PRODUCTS : creates
```

---

## 4. Payment Lifecycle & Edge Functions

Transactions use a dual-verification architecture combining client callback verification and server-to-server webhook verification:

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Customer
    participant Client as Vizid Website
    participant Supabase as Supabase DB
    participant Paystack as Paystack Inline
    participant EdgeVerify as Edge: verify-payment
    participant EdgeHook as Edge: paystack-webhook
    participant PaystackAPI as Paystack API

    Customer->>Client: Completes shipping form & clicks "Pay"
    Client->>Supabase: Insert pending order (ref: VIZID-TIMESTAMP-HEX)
    Client->>Paystack: Open popup with amount in kobo (NGN × 100)
    Customer->>Paystack: Enters card / bank details & completes OTP
    
    par Path A: Client Callback
        Paystack-->>Client: Returns success response (ref)
        Client->>EdgeVerify: POST /functions/v1/verify-payment { reference }
        Note over EdgeVerify: Verifies caller JWT & order ownership
        EdgeVerify->>PaystackAPI: GET /transaction/verify/:reference
        PaystackAPI-->>EdgeVerify: Status: success, amount, paid_at
        Note over EdgeVerify: Compares paid amount to order.total_amount
        EdgeVerify->>Supabase: UPDATE orders SET status = 'paid' WHERE status = 'pending'
        EdgeVerify-->>Client: 200 OK { success: true }
        Client-->>Customer: Displays Order Confirmation Screen
    and Path B: Asynchronous Webhook
        PaystackAPI->>EdgeHook: POST webhook with x-paystack-signature
        Note over EdgeHook: Verifies HMAC-SHA512 with PAYSTACK_SECRET_KEY
        Note over EdgeHook: Checks order exists & amount matches
        EdgeHook->>Supabase: UPDATE orders SET status = 'paid' WHERE status = 'pending'
        EdgeHook-->>PaystackAPI: 200 OK { received: true }
    end
```

### Security Properties of the Payment Flow:
1. **Zero Client Trust for Payment Confirmation**: The client cannot set an order to `paid`. Only edge functions using `SUPABASE_SERVICE_ROLE_KEY` can transition status to `paid`.
2. **Dual-Path Redundancy**: If a customer closes their browser before the client verification callback finishes, the Paystack webhook ensures the order is still recorded as `paid`.
3. **Idempotence**: Database updates use `.eq('status', 'pending')` to prevent double-processing.
4. **Signature Validation**: The webhook strictly rejects any request where the HMAC-SHA512 hash does not match `PAYSTACK_SECRET_KEY`.

---

## 5. External Dependencies & Third-Party Services

| Service | Purpose | Authentication / Credential |
|---|---|---|
| **Cloudflare Pages** | Global edge hosting, SSL/TLS termination, HTTP security headers | Cloudflare Account API / Git Integration |
| **Supabase Database** | Managed PostgreSQL database | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| **Supabase Auth** | Customer & Admin session management | JWT Tokens stored in browser localStorage |
| **Supabase Edge Functions** | Deno runtime serverless backend logic | Deployed via Supabase CLI |
| **Paystack** | Payment processing gateway for Nigerian Naira (NGN) | Public Key (`VITE_PAYSTACK_PUBLIC_KEY`), Secret Key (`PAYSTACK_SECRET_KEY`) |
| **WhatsApp API** | Direct interior design inquiries from Work With Us form | `https://wa.me/2349074095400` with pre-filled encoded text |
