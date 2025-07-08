# GEMINI.md

## Project Goal

Implement a Stripe-based subscription system in a Next.js + Supabase application. Users must provide valid credit card details to access the app, triggering a 7-day free trial. After the trial ends, they will be billed monthly unless they cancel beforehand.

---

## Features Overview

- Stripe integration with 7-day free trial
- Monthly billing
- Supabase for authentication and storing subscription status
- Users can cancel at any time
- Restrict app access to active/trialing subscribers only

---

## Tech Stack

- **Next.js** (App Router or Pages Router)
- **Stripe** (`stripe` SDK for backend, `@stripe/stripe-js` for frontend)
- **Supabase** (auth, database, and storage)
- **TypeScript** (recommended)
- **Stripe Webhooks** (for subscription lifecycle management)

---

## Dependencies

```bash
npm install stripe @stripe/stripe-js @supabase/supabase-js
