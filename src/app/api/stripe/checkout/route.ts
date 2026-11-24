import { NextResponse } from 'next/server';

const DONATION_AREAS = {
  'proj-1': {
    name: 'Kinder heute – eine stärkere Zukunft morgen! / Діти сьогодні – сильніше майбутнє завтра!',
  },
  'proj-2': {
    name: 'Fürsorge heute – ein würdiges Morgen! / Турбота сьогодні – гідне завтра!',
  },
  'proj-3': {
    name: 'Solidarität & Menschlichkeit: Notfallfonds Wien / Солідарність та Людяність: Фонд екстреної допомоги',
  },
} as const;

const MIN_AMOUNT_EUR = 5;
const MAX_AMOUNT_EUR = 5000;

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const requestOrigin = new URL(request.url).origin;

  if (origin && origin !== requestOrigin) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid donation details.' }, { status: 400 });
  }

  const { areaId, amount, frequency } = body as Record<string, unknown>;
  if (
    typeof areaId !== 'string' ||
    !Object.hasOwn(DONATION_AREAS, areaId) ||
    typeof amount !== 'number' ||
    !Number.isSafeInteger(amount) ||
    amount < MIN_AMOUNT_EUR ||
    amount > MAX_AMOUNT_EUR ||
    (frequency !== 'once' && frequency !== 'monthly')
  ) {
    return NextResponse.json({ error: 'Please check the donation amount and selected direction.' }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: 'Test payments are not configured yet. Add a Stripe Test Mode secret key to enable checkout.' }, { status: 503 });
  }
  if (!secretKey.startsWith('sk_test_')) {
    return NextResponse.json({ error: 'Checkout is disabled: only a Stripe Test Mode secret key is accepted.' }, { status: 503 });
  }

  const area = DONATION_AREAS[areaId as keyof typeof DONATION_AREAS];
  const params = new URLSearchParams({
    mode: frequency === 'monthly' ? 'subscription' : 'payment',
    success_url: `${requestOrigin}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${requestOrigin}/donation/cancel`,
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][unit_amount]': String(amount * 100),
    'line_items[0][price_data][product_data][name]': `Donation: ${area.name}`,
    'metadata[donation_area]': areaId,
    'metadata[frequency]': frequency,
  });

  if (frequency === 'monthly') {
    params.set('line_items[0][price_data][recurring][interval]', 'month');
  }

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
      cache: 'no-store',
    });
    const session = await response.json();

    if (!response.ok || typeof session.url !== 'string') {
      return NextResponse.json({ error: 'Stripe could not start checkout. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: 'Unable to connect to Stripe. Please try again.' }, { status: 502 });
  }
}
