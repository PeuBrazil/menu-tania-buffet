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
  title: "Buffet da Tânia | Cardápio Artesanal para Festas e Eventos",
  description:
    "Salgados fritos, assados de forno, doces finos, tortas salgadas e vinagretes feitos à mão com capricho e receita de família.",
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
