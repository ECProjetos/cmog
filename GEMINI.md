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
- pai and acadastre with the link of strip https://buy.stripe.com/test_aFa14p2widaR3Vnc1rgQE00

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

 Step-by-Step Testing Flow

   1. Start Your Application:
       * In a terminal, run npm run dev to start your Next.js development server.


   2. Create a New Test User:
       * Open your application in a new incognito browser window (to ensure you're not logged in).
       * Navigate to the registration page (/register).
       * Sign up with a new email address and password.
       * Check your email for the confirmation link from Supabase and verify your account.

   3. Attempt to Access a Protected Page:
       * After logging in, try to navigate to a protected page, for example, /minhas-licitacoes.
       * The middleware should redirect you to the /subscribe page.


   4. Complete the Subscription Flow:
       * The /subscribe page will automatically redirect you to the Stripe payment page.
       * On the Stripe page, use one of Stripe's test card numbers (https://stripe.com/docs/testing#cards) to complete the payment. You can use any future date for the expiration and any CVC.
       * After a successful payment, Stripe will show a success page.


   5. Verify Webhook and Subscription Status:
       * Go to the terminal where you are running the stripe listen command. You should see a checkout.session.completed event being logged.
       * This confirms that Stripe has sent the webhook and your application has received it.
       * Check your Supabase users table. The user you just created should now have their stripe_subscription_status updated to active (or trialing, depending on your Stripe product setup).

   6. Verify Access to Protected Content:
       * Now, try to access the protected page (/minhas-licitacoes) again.
       * This time, you should be able to access the page without being redirected.
