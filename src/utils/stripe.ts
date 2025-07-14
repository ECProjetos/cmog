import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET environment variable");
}

// Initialize Stripe with secret key env vars
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-04-30.basil',
});

//Set price IDs from env varts 
export const STRIPE_PRICE = {
    PROFISSIONAL: process.env.STRIPE_PRICE_PROFISSIONAL,
}

//create a checkout session for subscription payment
export async function createCheckoutSession({
    customerId,
    priceId,
    successUrl,
    cancelUrl,
    metadata,
}: {
    customerId: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
}) {
    const params: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata,
    };

    // Use customer ID if available
    if (customerId) {
        params.customer = customerId;
    }

    return stripe.checkout.sessions.create(params);
}

// Create a customer in Stripe
export async function createCustomer({
    email,
    name,
    metadata,
}: {
    email: string;
    name?: string;
    metadata?: Record<string, string>;
}) {
    return stripe.customers.create({
        email,
        name,
        metadata,
    });
}


// Create a portal session for managing subscriptions
export async function createPortalSession({
    customerId,
    returnUrl,
}: {
    customerId: string;
    returnUrl: string;
}) {
    return stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
}

// Get subscription details 
export async function getSubscription(subscriptionId: string) {
    return stripe.subscriptions.retrieve(subscriptionId);
}

// Check if the subscription is active
export function isSubscriptionActive(subscription: Stripe.Subscription) {
    return subscription.status === 'active' || subscription.status === 'trialing';
}


