import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const signature = (await headers()).get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return Response.json({ error: 'Webhook signature configuration is missing.' }, { status: 400 });
  }

  try {
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
    if (event.livemode) {
      return Response.json({ error: 'Live-mode events are not accepted.' }, { status: 403 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== 'paid') {
        return Response.json({ received: true, paymentStatus: session.payment_status });
      }
      // The signature and paid status are verified. Add durable donation bookkeeping here if needed.
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('[stripe] Webhook verification failed:', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ error: 'Invalid Stripe webhook signature.' }, { status: 400 });
  }
}
