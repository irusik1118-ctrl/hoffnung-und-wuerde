import Link from 'next/link';
import { getStripeClient } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  let paymentConfirmed = false;

  if (sessionId && sessionId.startsWith('cs_')) {
    try {
      const session = await getStripeClient().checkout.sessions.retrieve(sessionId);
      paymentConfirmed = !session.livemode && session.payment_status === 'paid';
    } catch {
      paymentConfirmed = false;
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <section className="card-glass" style={{ width: 'min(100%, 620px)', textAlign: 'center' }}>
        <p className="gold-badge" style={{ marginBottom: 20 }}>Hoffnung und Würde</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)' }}>
          {paymentConfirmed ? 'Дякуємо за вашу пожертву!' : 'Перевіряємо статус оплати'}
        </h1>
        <p className="section-subtitle" style={{ marginBottom: 24 }} aria-live="polite">
          {paymentConfirmed
            ? 'Ваш платіж успішно підтверджено Stripe. Ваша підтримка допомагає нашим проєктам.'
            : 'Наразі ми не змогли підтвердити платіж. Якщо ви завершили оплату, перевірте статус трохи пізніше або зв’яжіться з фондом. Повторної оплати не потрібно.'}
        </p>
        <Link href="/#sponsors" className="btn-gold" style={{ display: 'inline-flex', padding: '12px 22px' }}>
          Повернутися на сайт
        </Link>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: 18 }}>
          Thank you for supporting our work. · Vielen Dank für Ihre Unterstützung.
        </p>
      </section>
    </main>
  );
}
