import type Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe';

export const runtime = 'nodejs';

const acknowledgedEventTypes = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_failed',
]);

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    return Response.json({ error: 'Missing Stripe signature.' }, { status: 400 });
  }

  if (!webhookSecret) {
    return Response.json({ error: 'Webhook signing secret is not configured.' }, { status: 500 });
  }

  let stripe: ReturnType<typeof getStripeClient>;
  try {
    stripe = getStripeClient();
  } catch (error) {
    console.error('[stripe] Test-mode configuration unavailable:', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ error: 'Stripe Test Mode is not configured.' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error('[stripe] Webhook verification failed:', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ error: 'Invalid Stripe webhook signature.' }, { status: 400 });
  }

  if (event.livemode) {
    return Response.json({ received: true, ignored: 'live_mode' });
  }

  if (acknowledgedEventTypes.has(event.type)) {
    // Stripe Dashboard is the source of truth; these handlers intentionally have no side effects.
    return Response.json({ received: true });
  }

  return Response.json({ received: true, ignored: 'unsupported_event' });
}
