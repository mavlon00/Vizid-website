# Vizid — Operations, Maintenance & Incident Response Runbook

This document defines standard operating procedures for backups, monitoring, regular maintenance, incident response, and account ownership transfer.

---

## 1. Account Ownership & Service Portfolios

The client organization must hold primary administrative ownership over the following foundational platforms:

| Service Provider | Role / Asset | Responsibility | Required Access Level |
|---|---|---|---|
| **Domain Registrar** | `viziddecors.com` | Nameservers, DNS management, registration renewals | Owner / Super Admin |
| **Cloudflare** | Edge CDN, Pages, SSL/TLS, Caching | Edge routing, deployments, security headers | Account Owner |
| **GitHub** | Source repositories | Code maintenance, CI/CD integrations | Organization Owner |
| **Supabase** | PostgreSQL DB, Auth, Edge Functions | User accounts, catalog data, financial records | Organization Owner |
| **Paystack** | Payment Processing | Merchant payouts, bank verification, compliance | Business Owner |

---

## 2. Backup & Disaster Recovery Strategy

### 2.1 Database Backups (Supabase)
* **Automated Daily Backups**: Supabase automatically creates daily snapshots of the PostgreSQL database.
* **Point-in-Time Recovery (PITR)**: Available on Supabase Pro tiers, allowing restoration to any specific second within the last 7 to 30 days.
* **Manual SQL Dumps**:
  Before major schema modifications or promotional campaign launches, export an offsite backup:
  ```bash
  # Using Supabase CLI:
  npx supabase db dump --project-ref [PROJECT_REF] -f vizid_backup_$(date +%Y%m%d).sql
  ```

### 2.2 Frontend Asset Backups (Git Version Control)
* All frontend source code, stylesheets, and configurations are tracked in Git.
* In the event of a compromised deployment, Cloudflare allows an immediate rollback to any past deployment in under 5 seconds.

---

## 3. Monitoring & Health Checks

### 3.1 Real-Time Edge Analytics (Cloudflare)
* Check **Analytics & Logs** in the Cloudflare Dashboard weekly for:
  - Bandwidth consumption and request volumes.
  - HTTP 4xx and 5xx error rates.
  - Edge caching ratio (target: >85% static asset cache hit rate).

### 3.2 Supabase Performance & Logs
* Navigate to **Project Settings** → **Logs** in Supabase:
  - **API Logs**: Check for unauthorized REST errors or 401/403 spikes.
  - **Auth Logs**: Monitor failed login attempts.
  - **Edge Functions Logs**: Check execution logs for `verify-payment` and `paystack-webhook` to identify failed third-party API calls.

### 3.3 Paystack Transaction Reconciliation
* Check the Paystack Dashboard daily for:
  - Successful versus abandoned transactions.
  - Automated payout settlement to the corporate bank account.
  - Any webhook delivery failures (under **Settings** → **Webhooks**).

---

## 4. Routine Maintenance Checklist

### Monthly
- [ ] Review Supabase database storage usage and active connections.
- [ ] Check Paystack webhook delivery success rate.
- [ ] Review customer inquiry logs and newsletter subscriber growth.
- [ ] Inspect Google Search Console for any crawl anomalies.

### Quarterly
- [ ] Audit user roles in the `profiles` table to ensure only current staff hold `role: 'admin'`.
- [ ] Run `npm audit` on both frontend projects to review newly reported security advisories.
- [ ] Rotate API keys if staff members have departed the organization.

### Annually
- [ ] Confirm domain registration auto-renewal is active with a valid corporate credit card.
- [ ] Review and update company contact information and legal terms.

---

## 5. Incident Response Playbooks

### Incident 1: Public Website is Down or Unresponsive
1. **Check Cloudflare Status**: Visit [cloudflarestatus.com](https://www.cloudflarestatus.com) to confirm global edge health.
2. **Inspect Cloudflare Pages Deployments**: Check if a recent deployment failed or broke.
3. **Trigger Instant Rollback**: In Cloudflare Pages, roll back to the previous successful build.
4. **Inspect Browser Console**: Check if third-party CDNs (e.g., Google Fonts or Paystack JS) are blocked or timing out.

### Incident 2: Customer Payments Are Not Confirming
1. **Check Paystack API Health**: Visit [status.paystack.com](https://status.paystack.com).
2. **Review Edge Function Logs**: In Supabase Dashboard → **Edge Functions** → **Logs**:
   - Check `verify-payment` logs for error messages.
   - Check `paystack-webhook` logs for signature mismatches or database update errors.
3. **Verify Secrets**: Ensure `PAYSTACK_SECRET_KEY` is still properly set in Supabase Secrets.
4. **Locate Order in Admin**: If payment succeeded in Paystack but the website failed to update, find the order in the Admin portal using the `paystack_reference` and manually change the status to **`paid`**.

### Incident 3: Unauthorized Access Suspected
1. **Immediate Session Revocation**: In Supabase Dashboard → **Authentication** → **Users**, immediately revoke or delete the suspicious user account.
2. **Demote Admin Privileges**: In the `profiles` table, run:
   ```sql
   UPDATE profiles SET role = 'customer' WHERE email = 'compromised_email@example.com';
   ```
3. **Rotate Secrets**: Rotate the `SUPABASE_SERVICE_ROLE_KEY` and `PAYSTACK_SECRET_KEY` in both provider dashboards and redeploy Edge Functions.
