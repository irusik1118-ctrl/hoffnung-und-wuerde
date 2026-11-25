import 'server-only';

import Stripe from 'stripe';

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || !secretKey.startsWith('sk_test_')) {
    throw new Error('Stripe Test Mode is not configured. Set STRIPE_SECRET_KEY to a test-mode secret key.');
  }

  return new Stripe(secretKey);
}
