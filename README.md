# SaaS Subscription App with Next.js, Supabase, and Stripe

This is a Next.js application that demonstrates how to build a subscription-based SaaS platform using Supabase for authentication and database management, and Stripe for handling payments and subscriptions.

## Features

- **Stripe Integration**: Full integration with the Stripe API for processing payments.
- **7-Day Free Trial**: New users automatically start with a 7-day free trial upon providing payment details.
- **Monthly Billing**: Automated monthly subscription billing after the trial period ends.
- **Supabase Authentication**: Secure user sign-up, login, and session management.
- **Subscription Status Management**: User subscription status is stored and managed in Supabase, synced with Stripe via webhooks.
- **Cancellation Policy**: Users can cancel their subscription at any time through a customer portal.
- **Protected Routes**: Application access is restricted to users with an active or trialing subscription.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18.0 or later)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)
- [Git](https://git-scm.com/)

## Getting Started

Follow these steps to get your local development environment set up and running.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

You will need to create accounts for Supabase and Stripe to get the necessary API keys.

1.  **Create a Supabase Project**: Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Create a Stripe Account**: Go to [Stripe](https://stripe.com/) and set up a new account.

Copy the example environment file and fill in the required values:

```bash
cp .env.local.example .env.local
```

You will need to add the following variables to your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=YOUR_STRIPE_WEBHOOK_SECRET

# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Where to find the keys:**
- **Supabase**: In your Supabase project dashboard under `Project Settings > API`.
- **Stripe**: In your Stripe dashboard under `Developers > API keys`.
- **Stripe Webhook Secret**: This is generated in the next step.

### 4. Set Up the Database

Go to the **SQL Editor** in your Supabase project dashboard. Copy the entire content of `db/shema.sql` and run it to create the necessary tables and relationships.

### 5. Configure Stripe Webhooks

Stripe needs to send events to your application to keep subscription data in sync.

1.  Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
2.  Run the following command to forward Stripe events to your local server:
    ```bash
    stripe listen --forward-to localhost:3000/api/webhooks
    ```
3.  The CLI will output a webhook signing secret (e.g., `whsec_...`). Copy this value and paste it as your `STRIPE_WEBHOOK_SECRET` in the `.env.local` file.

### 6. Run the Development Server

Now you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production build of the application.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase using ESLint.