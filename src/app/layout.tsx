import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://menu-tania-buffet.vercel.app"),
  title: "Buffet da Tânia | Cardápio Artesanal para Festas e Eventos",
  description:
    "Salgados fritos, assados de forno, doces finos, tortas doces e salgadas e vinagretes feitos à mão com capricho e receita de família.",
  openGraph: {
    title: "Buffet da Tânia | Cardápio Artesanal para Festas e Eventos",
    description:
      "Salgados fritos, assados de forno, doces finos, tortas e vinagretes feitos à mão com capricho e receita de família.",
    url: "https://menu-tania-buffet.vercel.app",
    siteName: "Buffet da Tânia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buffet da Tânia | Cardápio Artesanal para Festas e Eventos",
    description:
      "Salgados fritos, assados de forno, doces finos, tortas e vinagretes feitos à mão com capricho e receita de família.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-brand-primary/20 selection:text-brand-text">
        {children}
      </body>
    </html>
  );
}
