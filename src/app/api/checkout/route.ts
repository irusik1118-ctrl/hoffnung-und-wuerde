import { NextRequest } from 'next/server';
import { initialProjects } from '@/data/content';
import { getStripeClient } from '@/lib/stripe';

export const runtime = 'nodejs';

const MAX_AMOUNT_CENTS = 1_000_000;
const MIN_AMOUNT_CENTS = 100;

function parseAmountToCents(value: unknown) {
  if (typeof value !== 'string' || !/^\d{1,5}(?:\.\d{1,2})?$/.test(value)) return null;

  const [euros, cents = ''] = value.split('.');
  const amountInCents = Number(euros) * 100 + Number(cents.padEnd(2, '0'));

  if (!Number.isSafeInteger(amountInCents) || amountInCents < MIN_AMOUNT_CENTS || amountInCents > MAX_AMOUNT_CENTS) {
    return null;
  }

  return amountInCents;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 2_000) {
    return Response.json({ error: 'Request is too large.' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Invalid donation details.' }, { status: 400 });
  }

  const { amount, projectId, frequency, lang } = body as Record<string, unknown>;
  const amountInCents = parseAmountToCents(amount);
  const project = initialProjects.find((item) => item.id === projectId);

  if (!amountInCents || !project || (frequency !== 'once' && frequency !== 'monthly') || (lang !== 'ua' && lang !== 'de')) {
    return Response.json({ error: 'Check the donation direction and amount (between €1 and €10,000).' }, { status: 400 });
  }

  try {
    const stripe = getStripeClient();
    const title = lang === 'ua' ? project.titleUa : project.titleDe;
    const description = lang === 'ua' ? project.descriptionUa : project.descriptionDe;
    const baseUrl = request.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: frequency === 'monthly' ? 'subscription' : 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: amountInCents,
            product_data: {
              name: lang === 'ua' ? `Пожертва: ${title}` : `Spende: ${title}`,
              description: description.slice(0, 450),
            },
            ...(frequency === 'monthly' ? { recurring: { interval: 'month' as const } } : {}),
          },
        },
      ],
      metadata: { projectId: project.id, frequency, language: lang },
      success_url: `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?donation=cancelled#sponsors`,
    });

    if (!session.url) {
      return Response.json({ error: 'Stripe did not return a Checkout URL.' }, { status: 502 });
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('[stripe] Checkout session creation failed:', error instanceof Error ? error.message : 'Unknown error');
    const message = error instanceof Error && error.message.includes('not configured')
      ? 'Online donations are not configured yet. Please use the bank details on this page.'
      : 'We could not start Checkout. Please try again or use the bank transfer details.';
    return Response.json({ error: message }, { status: 503 });
  }
}
