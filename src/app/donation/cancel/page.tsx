export default function DonationCancelPage() {
  return (
    <main className="donation-result">
      <section className="donation-result__card" aria-labelledby="cancel-title">
        <p className="donation-result__eyebrow">Hoffnung und Würde</p>
        <h1 id="cancel-title">Оплату скасовано</h1>
        <p>Пожертву не оформлено. Ви можете повернутися та спробувати ще раз.</p>
        <a href="/#sponsors">Повернутися до пожертв</a>
      </section>
      <style>{`
        :root { color-scheme: dark; }
        body { margin: 0; background: #1a0508; color: #fff; font-family: Arial, sans-serif; }
        .donation-result { min-height: 100vh; display: grid; place-items: center; padding: 24px; box-sizing: border-box; }
        .donation-result__card { width: min(100%, 560px); padding: 40px; border: 1px solid rgba(212,175,55,.45); border-radius: 18px; background: linear-gradient(135deg, #380710, #1a0408); text-align: center; box-sizing: border-box; }
        .donation-result__eyebrow { color: #d4af37; letter-spacing: .08em; text-transform: uppercase; font-size: .8rem; }
        h1 { font-family: Georgia, serif; }
        .donation-result__card a { display: inline-block; margin-top: 16px; padding: 12px 20px; border-radius: 8px; background: #d4af37; color: #1a0508; font-weight: 700; text-decoration: none; }
      `}</style>
    </main>
  );
}
