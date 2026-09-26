import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://hoffnung-und-wuerde.at'),
  title: "Wohltätigkeitsstiftung «Hoffnung und Würde» | Wien · Österreich",
  description: "Österreichische gemeinnützige Stiftung für Menschen in Not, Kinder, Jugendliche und Senioren. Gegründet von Michael Kosik. ZVR 1984068166, Wien.",
  keywords: [
    "Wohltätigkeitsstiftung",
    "Hoffnung und Würde",
    "Michael Kosik",
    "Stiftung Wien",
    "Charity Austria",
    "Spenden Wien",
    "Kinderhilfe Österreich",
    "Seniorenbetreuung Wien",
    "ZVR 1984068166"
  ],
  authors: [{ name: "Michael Kosik" }],
  openGraph: {
    title: "Wohltätigkeitsstiftung «Hoffnung und Würde» | Wien · Österreich",
    description: "Für Menschen. Mit Herz. Für eine bessere Zukunft. Gegründet von Michael Kosik.",
    images: ["/images/banner.jpg"],
    type: "website",
    locale: "de_AT",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/images/logo.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
