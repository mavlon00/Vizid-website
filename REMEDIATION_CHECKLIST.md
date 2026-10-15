# Final Remediation Checklist
**Project:** [Project Name]  
**Date:** [Date]

## Priority 1 – Security Hardening
- [ ] Activate real security headers (CSP, HSTS, X-Frame-Options, etc.)
- [ ] Ensure `.env` is never committed
- [ ] Create and commit `.env.example`
- [ ] Rotate any keys that may have been exposed
- [ ] Add rate limiting / honeypot / CAPTCHA on public forms
- [ ] Review and harden session + redirect logic
- [ ] Confirm Paystack script is restricted via CSP

## Priority 2 – Shop & Authentication
- [ ] Implement true Guest Checkout option
- [ ] Keep “Sign In / Create Account” as optional
- [ ] Fix return-to-cart/checkout after login
- [ ] Ensure payment verification remains server-side
- [ ] Test full flow: Guest → Cart → Checkout → Payment → Confirmation

## Priority 3 – Performance
- [ ] Defer non-critical animations (GSAP / scroll smoothing)
- [ ] Optimize and convert images to WebP/AVIF
- [ ] Lazy-load below-the-fold media
- [ ] Reduce initial JavaScript boot cost
- [ ] Re-test with Lighthouse / PageSpeed Insights
- [ ] Confirm no multi-second freeze on first load

## Priority 4 – Functional QA
- [ ] Load real product catalog
- [ ] Complete end-to-end shop testing
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on real mobile devices (iOS + Android)
- [ ] Verify all forms and WhatsApp links
- [ ] Confirm order confirmation and email flows

## Priority 5 – Handover Preparation
- [ ] Clean private GitHub repository
- [ ] Final README.md completed
- [ ] All documentation packaged
- [ ] Admin credentials prepared (sent securely)
- [ ] Client access granted
- [ ] Support window defined and communicated
