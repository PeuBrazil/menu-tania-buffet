"use client";

import { useState, useMemo, useEffect } from "react";
import { menuData, MenuItem } from "./data/menu";

type CartItem = {
  item: MenuItem;
  category: string;
  unitLabel: string;
  stepQty: number;
  quantity: number;
};

const badgeStyles: Record<string, string> = {
  "Mais Pedido": "bg-brand-primary/15 text-brand-primary border-brand-primary/30",
  "Mais Pedida": "bg-brand-primary/15 text-brand-primary border-brand-primary/30",
  Favorito: "bg-brand-gold/20 text-brand-gold border-brand-gold/40",
  Premium: "bg-brand-espresso text-[#FFFDF9] border-brand-espresso",
  Gourmet: "bg-brand-espresso text-[#FFFDF9] border-brand-espresso",
  Especial: "bg-brand-gold/15 text-brand-gold border-brand-gold/35",
  "Especial 30cm": "bg-brand-gold/15 text-brand-gold border-brand-gold/35",
  Agridoce: "bg-brand-sage/15 text-brand-sage border-brand-sage/30",
  Clássico: "bg-brand-muted/15 text-brand-heading border-brand-border",
  "Clássica 30cm": "bg-brand-muted/15 text-brand-heading border-brand-border",
};

function CategoryIcon({ category, className = "w-5 h-5" }: { category: string; className?: string }) {
  switch (category) {
    case "Salgados Fritos":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-3.5 4-7 7.5-7 12a7 7 0 0014 0c0-4.5-3.5-8-7-12z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 15.5a3.5 3.5 0 005 0" />
        </svg>
      );
    case "Salgados de Forno":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15h18l-2 5H5l-2-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15c0-4.5 3.1-8 7-8s7 3.5 7 8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v3M8 5.5l1 2M16 5.5l-1 2" />
        </svg>
      );
    case "Doces":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 14l2 6h10l2-6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 14c0-2.5 2-4.5 4.5-4.5.4 0 .8.05 1.2.15A4.5 4.5 0 0114.2 9.65c.4-.1.8-.15 1.3-.15 2.5 0 4.5 2 4.5 4.5H4z" />
          <circle cx="12" cy="5.5" r="1.8" />
        </svg>
      );
    case "Tortas Doces":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 15h16v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 15v-4a2 2 0 012-2h8a2 2 0 012 2v4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 15c1.5 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 5 0 1.5 1.5 3.5 1.5 6 0" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v3M12 4a1 1 0 100 2 1 1 0 000-2z" />
        </svg>
      );
    case "Tortas Salgadas":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <ellipse cx="12" cy="10" rx="9" ry="4.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10v5c0 2.5 4 4.5 9 4.5s9-2 9-4.5v-5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.5l9 3M16.5 8.5l-9 3" />
        </svg>
      );
    case "Vinagretes":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 11h16a8 8 0 01-16 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8M12 19v1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11c.5-2.5 2.5-4 5-4s4.5 1.5 5 4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
  }
}

type IllustrationKind =
  | "coxinha"
  | "brigadeiro"
  | "empada"
  | "bolo"
  | "torta30"
  | "trufa"
  | "fatia"
  | "pastel"
  | "barquete"
  | "fouet"
  | "morango"
  | "trouxinha";

function CulinarySvg({ kind, size }: { kind: IllustrationKind; size: number }) {
  switch (kind) {
    case "coxinha":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M32 8C23 18 14 28 14 40a18 18 0 0036 0c0-12-9-22-18-32z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 42c2 5 7 8 12 8" strokeLinecap="round" />
          <circle cx="28" cy="30" r="1.5" fill="currentColor" />
          <circle cx="36" cy="34" r="1.5" fill="currentColor" />
          <circle cx="32" cy="24" r="1.5" fill="currentColor" />
        </svg>
      );
    case "brigadeiro":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 36l6 18h24l6-18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 36c3-3 6-3 9 0 3-3 6-3 9 0 3-3 6-3 9 0 3-3 6-3 9 0 2-2 4-2 4 0" strokeLinecap="round" />
          <path d="M16 34c0-10 7-17 16-17s16 7 16 17" strokeLinecap="round" />
          <path d="M25 24l3 2M34 22l2 3M28 29l3 1M37 28l2 2" strokeLinecap="round" />
          <circle cx="32" cy="14" r="3" />
        </svg>
      );
    case "empada":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M10 34h44l-5 16H15l-5-16z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 34c0-8 9-14 20-14s20 6 20 14" strokeLinecap="round" />
          <path d="M10 34c3 3 7 3 11 0 3 3 7 3 11 0 3 3 7 3 11 0 3 3 7 3 11 0" strokeLinecap="round" />
          <path d="M26 26l12 4M38 26l-12 4" strokeLinecap="round" />
        </svg>
      );
    case "bolo":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="12" y="34" width="40" height="18" rx="3" />
          <path d="M18 34V24a3 3 0 013-3h22a3 3 0 013 3v10" />
          <path d="M12 40c4 3 8 3 13 0 4 3 9 3 14 0 4 3 9 3 13 0" strokeLinecap="round" />
          <path d="M18 27c3 2 6 2 9 0 3 2 6 2 9 0 3 2 6 2 8 0" strokeLinecap="round" />
          <circle cx="24" cy="19" r="2" />
          <circle cx="32" cy="18" r="2.5" />
          <circle cx="40" cy="19" r="2" />
          <path d="M8 52h48" strokeLinecap="round" />
        </svg>
      );
    case "torta30":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <ellipse cx="32" cy="28" rx="22" ry="10" />
          <path d="M10 28v10c0 5.5 9.8 10 22 10s22-4.5 22-10V28" />
          <path d="M18 24l28 8M46 24l-28 8M24 21l16 14M40 21L24 35" strokeLinecap="round" />
        </svg>
      );
    case "trufa":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 38c0-9 7-16 16-16s16 7 16 16H16z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 38h40l-4 10H16l-4-10z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 28c3-2 7-2 10 1 3-3 7-3 10-1" strokeLinecap="round" />
        </svg>
      );
    case "fatia":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 36L46 18c6 4 8 10 8 18H12z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 36v14h42V36" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 43h42" strokeLinecap="round" strokeDasharray="3 3" />
          <circle cx="38" cy="20" r="3.5" />
          <path d="M39 16c2-3 5-4 7-3" strokeLinecap="round" />
        </svg>
      );
    case "pastel":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 42c0-13 9-24 20-24s20 11 20 24H12z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 42h48" strokeLinecap="round" />
          <path d="M15 39v-3M20 33l-2-2M26 28l-1-3M32 26v-3M38 28l1-3M44 33l2-2M49 39v-3" strokeLinecap="round" />
        </svg>
      );
    case "barquete":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M8 32c6 12 15 16 24 16s18-4 24-16H8z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 32c4-6 10-9 18-9s14 3 18 9" strokeLinecap="round" />
          <path d="M24 28c2-2 5-2 8 0 3-2 6-2 8 0" strokeLinecap="round" />
        </svg>
      );
    case "fouet":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 50l16-16" strokeLinecap="round" strokeWidth="2.4" />
          <ellipse cx="40" cy="24" rx="9" ry="15" transform="rotate(45 40 24)" />
          <ellipse cx="40" cy="24" rx="4.5" ry="15" transform="rotate(45 40 24)" />
          <path d="M18 20v4M16 22h4M48 44v4M46 46h4" strokeLinecap="round" />
        </svg>
      );
    case "morango":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M32 52C20 44 16 32 20 23c3-6 9-6 12-3 3-3 9-3 12 3 4 9 0 21-12 29z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 17c3 2 6 3 8 3s5-1 8-3M32 13v7" strokeLinecap="round" />
          <path d="M19 32c4 3 8 3 13 0 4 3 9 3 13 0" strokeLinecap="round" />
        </svg>
      );
    case "trouxinha":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 30c-4 5-5 14 0 19 4 4 20 4 24 0 5-5 4-14 0-19" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 30c4 2 20 2 24 0" strokeLinecap="round" />
          <path d="M26 30l-4-12 7 4 3-5 3 5 7-4-4 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

const leftMarginItems: Array<{
  top: string;
  left: string;
  size: number;
  rotate: number;
  kind: IllustrationKind;
  color: string;
}> = [
  { top: "1.5%", left: "18px", size: 78, rotate: -16, kind: "coxinha", color: "text-brand-heading" },
  { top: "6.5%", left: "64px", size: 54, rotate: 18, kind: "brigadeiro", color: "text-brand-primary" },
  { top: "11.5%", left: "12px", size: 68, rotate: -10, kind: "empada", color: "text-brand-gold" },
  { top: "16.8%", left: "56px", size: 84, rotate: 14, kind: "fatia", color: "text-brand-heading" },
  { top: "22%", left: "16px", size: 58, rotate: -22, kind: "pastel", color: "text-brand-primary" },
  { top: "27.2%", left: "68px", size: 72, rotate: 12, kind: "trufa", color: "text-brand-gold" },
  { top: "32.5%", left: "14px", size: 90, rotate: -14, kind: "bolo", color: "text-brand-primary" },
  { top: "38%", left: "60px", size: 52, rotate: 24, kind: "barquete", color: "text-brand-heading" },
  { top: "43.2%", left: "20px", size: 74, rotate: -18, kind: "torta30", color: "text-brand-gold" },
  { top: "48.5%", left: "58px", size: 62, rotate: 15, kind: "morango", color: "text-brand-primary" },
  { top: "54%", left: "12px", size: 80, rotate: -12, kind: "trouxinha", color: "text-brand-heading" },
  { top: "59.5%", left: "64px", size: 56, rotate: 20, kind: "fouet", color: "text-brand-gold" },
  { top: "65%", left: "18px", size: 70, rotate: -20, kind: "brigadeiro", color: "text-brand-primary" },
  { top: "70.5%", left: "54px", size: 82, rotate: 10, kind: "coxinha", color: "text-brand-heading" },
  { top: "76%", left: "14px", size: 60, rotate: -15, kind: "fatia", color: "text-brand-gold" },
  { top: "81.5%", left: "62px", size: 74, rotate: 18, kind: "empada", color: "text-brand-primary" },
  { top: "87.5%", left: "16px", size: 66, rotate: -12, kind: "pastel", color: "text-brand-heading" },
  { top: "93.5%", left: "52px", size: 76, rotate: 14, kind: "bolo", color: "text-brand-gold" },
];

const rightMarginItems: Array<{
  top: string;
  right: string;
  size: number;
  rotate: number;
  kind: IllustrationKind;
  color: string;
}> = [
  { top: "2.2%", right: "20px", size: 82, rotate: 15, kind: "bolo", color: "text-brand-primary" },
  { top: "7.5%", right: "62px", size: 58, rotate: -18, kind: "pastel", color: "text-brand-heading" },
  { top: "12.8%", right: "14px", size: 72, rotate: 12, kind: "trufa", color: "text-brand-gold" },
  { top: "18%", right: "58px", size: 64, rotate: -14, kind: "coxinha", color: "text-brand-primary" },
  { top: "23.5%", right: "16px", size: 86, rotate: 18, kind: "torta30", color: "text-brand-heading" },
  { top: "29%", right: "64px", size: 54, rotate: -22, kind: "morango", color: "text-brand-gold" },
  { top: "34.2%", right: "18px", size: 76, rotate: 10, kind: "brigadeiro", color: "text-brand-primary" },
  { top: "39.5%", right: "56px", size: 66, rotate: -16, kind: "empada", color: "text-brand-heading" },
  { top: "45%", right: "12px", size: 80, rotate: 20, kind: "fatia", color: "text-brand-gold" },
  { top: "50.5%", right: "60px", size: 56, rotate: -12, kind: "fouet", color: "text-brand-primary" },
  { top: "56%", right: "16px", size: 74, rotate: 14, kind: "barquete", color: "text-brand-heading" },
  { top: "61.5%", right: "58px", size: 68, rotate: -19, kind: "trouxinha", color: "text-brand-gold" },
  { top: "67%", right: "14px", size: 84, rotate: 16, kind: "bolo", color: "text-brand-primary" },
  { top: "72.5%", right: "62px", size: 58, rotate: -15, kind: "trufa", color: "text-brand-heading" },
  { top: "78%", right: "18px", size: 72, rotate: 12, kind: "coxinha", color: "text-brand-gold" },
  { top: "83.5%", right: "54px", size: 64, rotate: -20, kind: "brigadeiro", color: "text-brand-primary" },
  { top: "89%", right: "16px", size: 78, rotate: 15, kind: "torta30", color: "text-brand-heading" },
  { top: "94.5%", right: "58px", size: 62, rotate: -14, kind: "morango", color: "text-brand-gold" },
];

/* Ilustrações gastronômicas distribuídas ao longo de toda a página (visíveis apenas em telas amplas onde há margem lateral) */
function MarginIllustrations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden xl:block"
    >
      {/* Coluna Esquerda */}
      {leftMarginItems.map((item, idx) => (
        <div
          key={`left-${idx}`}
          style={{
            top: item.top,
            left: item.left,
            transform: `rotate(${item.rotate}deg)`,
          }}
          className={`absolute ${item.color} opacity-[0.13] dark:opacity-[0.17] transition-opacity`}
        >
          <CulinarySvg kind={item.kind} size={item.size} />
        </div>
      ))}

      {/* Coluna Direita */}
      {rightMarginItems.map((item, idx) => (
        <div
          key={`right-${idx}`}
          style={{
            top: item.top,
            right: item.right,
            transform: `rotate(${item.rotate}deg)`,
          }}
          className={`absolute ${item.color} opacity-[0.13] dark:opacity-[0.17] transition-opacity`}
        >
          <CulinarySvg kind={item.kind} size={item.size} />
        </div>
      ))}
    </div>
  );
}

const customSweetCakeItem: MenuItem = {
  id: "torta-doce-personalizada",
  name: "Torta Doce Sob Encomenda (Sabores a combinar)",
  description:
    "Torta doce artesanal personalizada (em chantilly/chantininho ou cobertura tradicional) com recheios e sabores definidos mediante consulta.",
  price: 0,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>(menuData[0]?.category || "Salgados Fritos");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "bistro">("grid");
  const [guestCount, setGuestCount] = useState<number>(30);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const whatsappNumber = "5571991530019";

  // Carrega preferência de tema escuro
  useEffect(() => {
    const saved = localStorage.getItem("buffet-tania-theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("buffet-tania-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("buffet-tania-theme", "light");
      }
      return next;
    });
  };

  const formatBRL = (val: number) =>
    val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Normaliza texto removendo acentos para busca inteligente ("limao" encontra "Limão", etc.)
  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Mapa de sinônimos gastronômicos para buscas por sabor
  const flavorSynonyms: Record<string, string[]> = {
    chocolate: [
      "chocolate",
      "cacau",
      "brigadeiro",
      "trufa",
      "bombom",
      "nutella",
      "avela",
      "chokito",
      "sonho de valsa",
      "casadinho",
      "carmelita",
    ],
    queijo: ["queijo", "catupiry", "requeijao", "gorgonzola", "ricota", "romeu e julieta", "misto"],
    castanha: ["castanha", "nozes", "amendoas", "amendoim", "cajuzinho", "avela"],
    nozes: ["nozes", "castanha", "amendoas"],
    carne: ["carne", "quibe", "esfiha", "boliviano", "saltenha", "file"],
    "doce de leite": ["doce de leite", "churros"],
  };

  const quickFlavors = [
    "Camarão",
    "Queijo",
    "Chocolate",
    "Limão",
    "Frango",
    "Bacalhau",
    "Salmão",
    "Carne Seca",
    "Coco",
    "Morango",
    "Damasco",
    "Castanha",
  ];

  const activeSection = useMemo(
    () => menuData.find((section) => section.category === activeTab),
    [activeTab]
  );

  // Subcategorias disponíveis na aba atual
  const subcategories = useMemo(() => {
    if (!activeSection) return ["Todos"];
    const subs = Array.from(
      new Set(activeSection.items.map((i) => i.subcategory).filter(Boolean))
    ) as string[];
    return subs.length > 0 ? ["Todos", ...subs] : ["Todos"];
  }, [activeSection]);

  // Busca global ou filtrada pela categoria
  const displayedSections = useMemo(() => {
    const rawQuery = searchQuery.trim();
    const normQuery = normalizeText(rawQuery);

    if (normQuery.length > 0) {
      const targetTerms = flavorSynonyms[normQuery] || [normQuery];

      return menuData
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => {
            const haystack = normalizeText(
              `${item.name} ${item.description} ${item.subcategory || ""} ${section.category}`
            );
            return targetTerms.some((term) => haystack.includes(term));
          }),
        }))
        .filter((section) => section.items.length > 0);
    }

    if (!activeSection) return [];

    const filteredItems =
      activeSubcategory === "Todos"
        ? activeSection.items
        : activeSection.items.filter((item) => item.subcategory === activeSubcategory);

    return [{ ...activeSection, items: filteredItems }];
  }, [activeSection, activeSubcategory, searchQuery]);

  const totalMenuItemsCount = useMemo(
    () => menuData.reduce((acc, s) => acc + s.items.length, 0),
    []
  );

  // Funções da Lista de Orçamento (+10, +25, +50 ou +1 para tortas/vinagretes)
  const handleAddToCart = (
    item: MenuItem,
    category: string,
    unitLabel: string,
    stepQty: number,
    customDelta?: number
  ) => {
    const delta = customDelta ?? stepQty;
    setCart((prev) => {
      const existing = prev[item.id];
      const nextQty = existing ? existing.quantity + delta : delta;
      return {
        ...prev,
        [item.id]: { item, category, unitLabel, stepQty, quantity: nextQty },
      };
    });
  };

  const handleRemoveFromCart = (itemId: string, customDelta?: number) => {
    setCart((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      const delta = customDelta ?? existing.stepQty;
      const nextQty = existing.quantity - delta;
      if (nextQty <= 0) {
        const clone = { ...prev };
        delete clone[itemId];
        return clone;
      }
      return {
        ...prev,
        [itemId]: { ...existing, quantity: nextQty },
      };
    });
  };

  const handleDeleteFromCart = (itemId: string) => {
    setCart((prev) => {
      const clone = { ...prev };
      delete clone[itemId];
      return clone;
    });
  };

  const clearCart = () => setCart({});

  const cartEntries = useMemo(() => Object.values(cart), [cart]);
  const cartTotalValue = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0),
    [cartEntries]
  );

  const getGeneralWhatsAppLink = () => {
    const text = encodeURIComponent(
      "Olá, Tânia! Acessei o cardápio online e gostaria de fazer um orçamento para um evento."
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  const getSweetCakeWhatsAppLink = () => {
    const text = encodeURIComponent(
      "Olá, Tânia! Vi no site que você também faz Tortas Doces sob encomenda (em chantilly/chantininho ou tradicionais) e gostaria de consultar as opções de sabores, recheios e valores."
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  const getItemWhatsAppLink = (item: MenuItem, category: string) => {
    const text = encodeURIComponent(
      `Olá, Tânia! Vi o item *${item.name}* (${category}) no cardápio online e gostaria de consultar disponibilidade e valores para encomenda.`
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  const getCartWhatsAppLink = () => {
    if (cartEntries.length === 0) return getGeneralWhatsAppLink();

    const lines = cartEntries.map((entry) => {
      const subtotal =
        entry.item.price > 0
          ? ` — R$ ${formatBRL(entry.item.price * entry.quantity)}`
          : " — (Sob consulta)";
      const unitDesc = entry.unitLabel === "un" ? "unid." : entry.unitLabel;
      return `• *${entry.quantity}x ${unitDesc}* de ${entry.item.name} (${entry.category})${subtotal}`;
    });

    const totalText =
      cartTotalValue > 0
        ? `\n\n*Valor estimado dos itens tabelados:* R$ ${formatBRL(cartTotalValue)}`
        : "";

    const message = `Olá, Tânia! Montei minha lista de interesse pelo cardápio online e gostaria de confirmar disponibilidade, quantidades mínimas e orçamento:\n\n${lines.join(
      "\n"
    )}${totalText}\n\nPodemos conversar sobre a data do evento?`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleCategoryChange = (category: string) => {
    setActiveTab(category);
    setActiveSubcategory("Todos");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col text-brand-text relative">
      {/* Ilustrações decorativas nas margens da página (somente telas amplas xl+) */}
      <MarginIllustrations />

      {/* Faixa Superior de Aviso Artesanal */}
      <div className="bg-brand-espresso text-[#F5EFE6] text-[11px] sm:text-sm py-2 px-3 sm:px-4 text-center border-b border-white/10 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-0.5">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="text-[#E6B35A]">✦</span> Produção artesanal sob encomenda
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="opacity-90 hidden xs:inline">
            Alguns itens possuem quantidade mínima por sabor
          </span>
        </div>
      </div>

      {/* Cabeçalho / Navbar Sticky */}
      <header className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border transition-all">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-espresso text-[#F5EFE6] flex items-center justify-center shadow-sm group-hover:bg-brand-primary transition-colors shrink-0">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tighter text-[#E6B35A] group-hover:text-white">
                T
              </span>
            </div>
            <div className="min-w-0">
              <span className="font-serif font-bold text-lg sm:text-2xl text-brand-heading tracking-tight block leading-none truncate">
                Buffet da Tânia
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-brand-muted font-semibold block mt-0.5 truncate">
                Sabor & Tradição
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-brand-text/90">
            <a href="#cardapio" className="hover:text-brand-primary transition-colors">
              Cardápio ({totalMenuItemsCount})
            </a>
            <a href="#tortas-doces" className="hover:text-brand-primary transition-colors">
              Tortas Doces
            </a>
            <a
              href="#calculadora"
              onClick={() => setShowCalculator(true)}
              className="hover:text-brand-primary transition-colors"
            >
              Calculadora de Festa
            </a>
            <a href="#tradicao" className="hover:text-brand-primary transition-colors">
              Nossa Tradição
            </a>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Botão de Modo Escuro / Claro */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="inline-flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-full bg-brand-card border border-brand-border hover:border-brand-primary text-brand-heading text-xs font-bold shadow-2xs transition-all cursor-pointer"
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              title={darkMode ? "Mudar para modo claro" : "Mudar para modo escuro (Cacau)"}
            >
              {darkMode ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-brand-gold">
                    <circle cx="12" cy="12" r="5" />
                    <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                  <span className="hidden sm:inline">Claro</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-brand-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                  <span className="hidden sm:inline">Escuro</span>
                </>
              )}
            </button>

            {/* Botão Minha Lista */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-card border border-brand-border hover:border-brand-primary text-brand-heading text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer"
              aria-label="Abrir lista de orçamento"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-brand-primary shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Lista</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[11px] font-extrabold leading-none ${
                  cartEntries.length > 0
                    ? "bg-brand-primary text-white"
                    : "bg-brand-bg-alt text-brand-muted"
                }`}
              >
                {cartEntries.length}
              </span>
            </button>

            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-espresso hover:bg-brand-primary text-[#FFFDF9] text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <span>Orçamento</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-28 relative z-10">
        {/* 1. HERO SECTION (Mais enxuto no celular para chegar rápido ao cardápio) */}
        <section className="relative overflow-hidden pt-5 pb-8 sm:pt-12 sm:pb-16 border-b border-brand-border/70">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
            <div className="bg-brand-card border border-brand-border rounded-3xl sm:rounded-[2rem] p-5 sm:p-10 lg:p-14 shadow-[0_20px_60px_-20px_rgba(74,51,42,0.14)] relative overflow-hidden">
              <div className="hidden lg:block absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-gold/10 blur-2xl pointer-events-none" />
              <div className="hidden lg:block absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-primary/10 blur-2xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
                {/* Coluna Principal de Texto */}
                <div className="lg:col-span-7 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-bg-alt border border-brand-border text-brand-heading text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3.5 sm:mb-5">
                    <span className="text-brand-primary">★</span> Receitas de Família • Feito à Mão
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-heading tracking-tight leading-[1.1] mb-3.5 sm:mb-5">
                    Buffet da Tânia
                    <span className="block text-xl sm:text-3xl lg:text-4xl font-normal italic text-brand-primary mt-1.5 sm:mt-2">
                      Capricho artesanal em cada detalhe da sua festa
                    </span>
                  </h1>

                  <p className="text-sm sm:text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-5 sm:mb-7">
                    Salgados, doces e tortas feitos à mão, com aquele capricho de receita de família para levar o melhor sabor à sua festa.
                  </p>

                  {/* Botões de Ação */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 mb-5 sm:mb-7">
                    <a
                      href="#cardapio"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl sm:rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm sm:text-base shadow-md transition-all"
                    >
                      <span>Ver Cardápio Completo</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowCalculator((prev) => !prev)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl sm:rounded-full bg-brand-bg-alt hover:bg-brand-border text-brand-heading font-bold text-sm sm:text-base transition-all cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-brand-primary shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span>Calcular Quantidade p/ Festa</span>
                    </button>
                  </div>

                  {/* Aviso de Encomenda e Quantidade Mínima */}
                  <div
                    style={{
                      backgroundColor: "var(--brand-warning-bg)",
                      borderColor: "var(--brand-warning-border)",
                    }}
                    className="inline-flex items-start sm:items-center gap-2.5 text-left border text-brand-heading px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-xs sm:text-sm shadow-2xs"
                  >
                    <span className="text-base leading-none shrink-0 mt-0.5 sm:mt-0">⚠️</span>
                    <span>
                      <strong>Pedidos sob encomenda:</strong> alguns itens possuem quantidade mínima por sabor (consulte pelo WhatsApp).
                    </span>
                  </div>
                </div>

                {/* Coluna Direita: Vitrine de Destaques (Visível no Desktop para não alongar o topo no celular) */}
                <div className="hidden lg:grid lg:col-span-5 grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleCategoryChange("Salgados de Forno");
                      document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group text-left bg-brand-surface-subtle hover:bg-brand-card p-4 rounded-2xl border border-brand-border hover:border-brand-primary/50 transition-all shadow-2xs flex items-start gap-3.5 cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <CategoryIcon category="Salgados de Forno" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">
                          57 Opções Salgadas
                        </span>
                        <span className="text-xs font-bold text-brand-muted group-hover:translate-x-0.5 transition-transform">
                          Ver →
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-brand-heading mt-0.5">
                        Salgados Fritos & de Forno
                      </h3>
                      <p className="text-xs text-brand-muted mt-0.5 line-clamp-2">
                        Coxinhas, empadas, quiches, barquetes, cestinhas, trouxinhas e folhados.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleCategoryChange("Doces");
                      document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group text-left bg-brand-surface-subtle hover:bg-brand-card p-4 rounded-2xl border border-brand-border hover:border-brand-primary/50 transition-all shadow-2xs flex items-start gap-3.5 cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <CategoryIcon category="Doces" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">
                          43 Opções de Doces
                        </span>
                        <span className="text-xs font-bold text-brand-muted group-hover:translate-x-0.5 transition-transform">
                          Ver →
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-brand-heading mt-0.5">
                        Docinhos, Caramelados & Trufas
                      </h3>
                      <p className="text-xs text-brand-muted mt-0.5 line-clamp-2">
                        Brigadeiros, carmelitas, morango coberto, damasco, nozes e trufas artesanais.
                      </p>
                    </div>
                  </button>

                  <a
                    href="#tortas-doces"
                    className="group text-left bg-brand-surface-subtle hover:bg-brand-card p-4 rounded-2xl border border-brand-border hover:border-brand-primary/50 transition-all shadow-2xs flex items-start gap-3.5"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <CategoryIcon category="Tortas Doces" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">
                          Sob Consulta
                        </span>
                        <span className="text-xs font-bold text-brand-muted group-hover:translate-x-0.5 transition-transform">
                          Conhecer →
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-brand-heading mt-0.5">
                        Tortas Doces Personalizadas
                      </h3>
                      <p className="text-xs text-brand-muted mt-0.5 line-clamp-2">
                        Em chantilly/chantininho ou inteiras de brigadeiro, doce de leite e chocolate, sob consulta.
                      </p>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      handleCategoryChange("Tortas Salgadas");
                      document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group text-left bg-brand-surface-subtle hover:bg-brand-card p-4 rounded-2xl border border-brand-border hover:border-brand-primary/50 transition-all shadow-2xs flex items-start gap-3.5 cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-brand-muted/15 text-brand-heading flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <CategoryIcon category="Tortas Salgadas" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                          Tortas 30cm & Antepastos
                        </span>
                        <span className="text-xs font-bold text-brand-muted group-hover:translate-x-0.5 transition-transform">
                          Ver →
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-brand-heading mt-0.5">
                        Tortas Salgadas & Vinagretes
                      </h3>
                      <p className="text-xs text-brand-muted mt-0.5 line-clamp-2">
                        Tortas salgadas de 30cm (camarão, bacalhau, carne seca, frango, palmito) e vinagretes.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Calculadora / Guia Rápido para Festas (Expansível) */}
              {showCalculator && (
                <div
                  id="calculadora"
                  className="mt-6 pt-6 border-t border-brand-border animate-in fade-in duration-200"
                >
                  <div className="bg-brand-bg rounded-2xl p-4 sm:p-6 border border-brand-border">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                          Sugestão para Convidados
                        </span>
                        <h3 className="font-serif text-lg sm:text-2xl font-bold text-brand-heading">
                          Calculadora de Festa
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
                          Média: <strong>10 salgados/pessoa</strong> (5 fritos + 5 de forno) e <strong>5 doces/pessoa</strong>.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowCalculator(false)}
                        className="text-xs font-bold text-brand-muted hover:text-brand-heading underline cursor-pointer shrink-0"
                      >
                        Fechar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
                      <div className="lg:col-span-5 bg-brand-card p-4 rounded-xl border border-brand-border">
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                          Convidados:{" "}
                          <span className="text-brand-primary text-base font-extrabold">{guestCount} pessoas</span>
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={200}
                          step={5}
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full accent-[#C2593F] cursor-pointer"
                        />
                        <div className="grid grid-cols-6 gap-1 text-[11px] text-brand-muted font-semibold mt-2">
                          {[20, 30, 50, 80, 100, 150].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setGuestCount(num)}
                              className={`py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                                guestCount === num
                                  ? "bg-brand-primary text-white font-bold"
                                  : "bg-brand-bg hover:bg-brand-bg-alt"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-3">
                        <div className="bg-brand-card p-3 sm:p-4 rounded-xl border border-brand-border text-center">
                          <span className="text-[11px] sm:text-xs text-brand-muted font-semibold block">
                            Salgados
                          </span>
                          <strong className="font-serif text-xl sm:text-3xl font-bold text-brand-heading block my-0.5 sm:my-1">
                            {guestCount * 10}
                          </strong>
                          <span className="text-[10px] sm:text-[11px] text-brand-muted font-medium block">
                            {guestCount * 5} fritos + {guestCount * 5} forno
                          </span>
                        </div>
                        <div className="bg-brand-card p-3 sm:p-4 rounded-xl border border-brand-border text-center">
                          <span className="text-[11px] sm:text-xs text-brand-muted font-semibold block">
                            Docinhos
                          </span>
                          <strong className="font-serif text-xl sm:text-3xl font-bold text-brand-primary block my-0.5 sm:my-1">
                            {guestCount * 5}
                          </strong>
                          <span className="text-[10px] sm:text-[11px] text-brand-muted font-medium block">
                            5 por pessoa
                          </span>
                        </div>
                        <div className="bg-brand-card p-3 sm:p-4 rounded-xl border border-brand-border text-center">
                          <span className="text-[11px] sm:text-xs text-brand-muted font-semibold block">
                            Tortas 30cm
                          </span>
                          <strong className="font-serif text-xl sm:text-3xl font-bold text-brand-gold block my-0.5 sm:my-1">
                            {Math.max(1, Math.ceil(guestCount / 25))}
                          </strong>
                          <span className="text-[10px] sm:text-[11px] text-brand-muted font-medium block">
                            Sugestão p/ mesa
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-brand-border/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      <span className="text-xs text-brand-muted text-center sm:text-left">
                        💡 Quer consultar um orçamento para <strong>{guestCount} convidados</strong>?
                      </span>
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                          `Olá, Tânia! Usei a calculadora do site para uma festa de *${guestCount} convidados* (estimativa de *${
                            guestCount * 10
                          } salgados* — sendo ${guestCount * 5} fritos e ${
                            guestCount * 5
                          } de forno — e *${
                            guestCount * 5
                          } doces*) e gostaria de fazer um orçamento!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-full bg-brand-espresso hover:bg-brand-primary text-white text-xs font-bold transition-colors"
                      >
                        <span>Orçar para {guestCount} pessoas no WhatsApp</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 2. SEÇÃO DO CARDÁPIO */}
        <section id="cardapio" className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12">
          {/* Título do Cardápio */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-primary block mb-1.5">
              Nosso Menu Completo
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-heading tracking-tight">
              Cardápio de Encomendas
            </h2>
            <p className="text-xs sm:text-base text-brand-muted mt-1.5">
              Toque em <strong className="text-brand-heading">+10, +25 ou +50</strong> nos seus itens preferidos para montar sua lista de orçamento.
            </p>
          </div>

          {/* SELETOR DE CATEGORIAS MOBILE (Swipe Horizontal) + DESKTOP (Grade 5 colunas) */}
          {/* Versão Mobile: Barra horizontal deslizante super prática */}
          <div className="flex sm:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4 -mx-3.5 px-3.5">
            {menuData.map((section) => {
              const isActive = activeTab === section.category && searchQuery.trim() === "";
              return (
                <button
                  key={section.category}
                  type="button"
                  onClick={() => handleCategoryChange(section.category)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? "bg-brand-espresso text-[#FFFDF9] border-brand-espresso shadow-sm"
                      : "bg-brand-card text-brand-heading border-brand-border"
                  }`}
                >
                  <CategoryIcon
                    category={section.category}
                    className={`w-4 h-4 ${isActive ? "text-[#E6B35A]" : "text-brand-primary"}`}
                  />
                  <span>{section.category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/15 text-[#E6B35A]" : "bg-brand-bg text-brand-muted"
                    }`}
                  >
                    {section.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Versão Tablet/Desktop: Cartões de Categoria */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {menuData.map((section) => {
              const isActive = activeTab === section.category && searchQuery.trim() === "";
              return (
                <button
                  key={section.category}
                  type="button"
                  onClick={() => handleCategoryChange(section.category)}
                  className={`group flex flex-col justify-between p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-brand-espresso text-[#FFFDF9] border-brand-espresso shadow-md -translate-y-0.5"
                      : "bg-brand-card hover:bg-brand-surface-subtle text-brand-heading border-brand-border hover:border-brand-primary/50 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-brand-primary text-white"
                          : "bg-brand-bg text-brand-heading group-hover:bg-brand-primary/15 group-hover:text-brand-primary"
                      }`}
                    >
                      <CategoryIcon category={section.category} className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/15 text-[#E6B35A]"
                          : "bg-brand-bg text-brand-muted"
                      }`}
                    >
                      {section.items.length} itens
                    </span>
                  </div>
                  <div>
                    <span className="font-serif font-bold text-base sm:text-lg block leading-snug">
                      {section.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Barra de Busca, Filtros Rápidos e Alternador de Visualização */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-3.5 sm:p-5 mb-6 sm:mb-8 shadow-xs">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Campo de Busca */}
              <div className="relative flex-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar sabor ou prato (ex: camarão, queijo, limão...)"
                  className="w-full pl-9 pr-16 py-2.5 rounded-xl bg-brand-bg/70 border border-brand-border focus:border-brand-primary focus:bg-brand-card focus:outline-none text-sm text-brand-heading placeholder:text-brand-muted/70 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-primary px-2 py-1 rounded cursor-pointer"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Alternador de Visualização (Cartões vs Lista de Bistrô) */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                <span className="text-xs font-semibold text-brand-muted">Modo de visão:</span>
                <div className="inline-flex rounded-xl bg-brand-bg p-1 border border-brand-border">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-brand-card text-brand-heading shadow-2xs"
                        : "text-brand-muted hover:text-brand-heading"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    Cartões
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("bistro")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "bistro"
                        ? "bg-brand-card text-brand-heading shadow-2xs"
                        : "text-brand-muted hover:text-brand-heading"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Compacta
                  </button>
                </div>
              </div>
            </div>

            {/* Filtros Rápidos por Sabor (Deslizante em 1 linha no celular, wrap no desktop) */}
            <div className="mt-3 pt-3 border-t border-brand-border/70">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap pb-0.5">
                <span className="text-[11px] sm:text-xs font-bold text-brand-muted mr-1 shrink-0">
                  Sabor:
                </span>
                {quickFlavors.map((flavor) => {
                  const isSelected = normalizeText(searchQuery.trim()) === normalizeText(flavor);
                  return (
                    <button
                      key={flavor}
                      type="button"
                      onClick={() =>
                        setSearchQuery((prev) =>
                          normalizeText(prev.trim()) === normalizeText(flavor) ? "" : flavor
                        )
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-brand-espresso text-[#FFFDF9] border-brand-espresso shadow-2xs"
                          : "bg-brand-card hover:bg-brand-bg text-brand-text border-brand-border"
                      }`}
                    >
                      {flavor}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pílulas de Subcategoria (Deslizante em 1 linha no celular) */}
            {!searchQuery.trim() && subcategories.length > 1 && (
              <div className="mt-2.5 pt-2.5 border-t border-brand-border/70">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap pb-0.5">
                  <span className="text-[11px] sm:text-xs font-bold text-brand-muted mr-1 shrink-0">
                    Tipo:
                  </span>
                  {subcategories.map((sub) => {
                    const active = activeSubcategory === sub;
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setActiveSubcategory(sub)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                          active
                            ? "bg-brand-primary text-white shadow-2xs"
                            : "bg-brand-bg text-brand-text hover:bg-brand-bg-alt"
                        }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Listagem dos Itens */}
          {displayedSections.length === 0 ? (
            <div className="bg-brand-card border border-brand-border rounded-3xl p-8 sm:p-12 text-center">
              <p className="font-serif text-lg sm:text-xl font-bold text-brand-heading mb-2">
                Nenhum item encontrado para &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-brand-muted mb-5">
                Tente buscar por outro ingrediente ou limpe o filtro para ver todas as opções.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveSubcategory("Todos");
                }}
                className="px-5 py-2.5 rounded-full bg-brand-primary text-white text-sm font-bold cursor-pointer"
              >
                Ver cardápio completo
              </button>
            </div>
          ) : (
            <div className="space-y-10 sm:space-y-12">
              {displayedSections.map((section) => (
                <div key={section.category}>
                  {/* Cabeçalho da Categoria Atual */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3.5 mb-5 border-b-2 border-brand-border">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-heading">
                          {section.category}
                        </h3>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-bg-alt text-brand-heading">
                          {section.items.length} {section.items.length === 1 ? "opção" : "opções"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-muted mt-1">{section.subtitle}</p>
                    </div>
                  </div>

                  {/* MODO 1: CARTÕES GASTRONÔMICOS (GRID COM BOTÕES AMPLOS PARA TOQUE) */}
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                      {section.items.map((item) => {
                        const inCart = cart[item.id];
                        const isZeroPrice = item.price === 0;
                        const isUnitItem = section.unitLabel === "un";

                        return (
                          <article
                            key={item.id}
                            className={`group bg-brand-card rounded-2xl p-4 sm:p-6 flex flex-col justify-between border transition-all duration-200 ${
                              inCart
                                ? "border-brand-primary ring-2 ring-brand-primary/20 shadow-md"
                                : "border-brand-border hover:border-brand-primary/45 shadow-2xs"
                            }`}
                          >
                            <div>
                              {/* Topo do Cartão: Subcategoria & Badge */}
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                                  {item.subcategory || section.category}
                                </span>
                                {item.badge && (
                                  <span
                                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                      badgeStyles[item.badge] ||
                                      "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                                    }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>

                              {/* Nome do Item */}
                              <h4 className="font-serif font-bold text-lg sm:text-xl text-brand-heading group-hover:text-brand-primary transition-colors leading-snug">
                                {item.name}
                              </h4>

                              {/* Descrição */}
                              {item.description && (
                                <p className="text-xs sm:text-sm text-brand-muted mt-1.5 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {/* Rodapé do Cartão: Preço & Controles Grandes para Celular */}
                            <div className="mt-4 pt-3.5 border-t border-brand-border/70 flex flex-col gap-3">
                              {/* Linha de Preço */}
                              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                                {isZeroPrice ? (
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-brand-muted block">
                                      Valor por porção
                                    </span>
                                    <span className="font-serif font-bold text-lg text-brand-primary">
                                      Sob consulta
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-baseline justify-between w-full gap-2">
                                    <div className="flex items-baseline gap-1">
                                      <span className="text-xs font-bold text-brand-muted">R$</span>
                                      <span className="font-serif font-bold text-2xl text-brand-heading">
                                        {formatBRL(item.price)}
                                      </span>
                                      <span className="text-xs font-semibold text-brand-muted">
                                        / {section.unitLabel}
                                      </span>
                                    </div>
                                    {isUnitItem && (
                                      <span className="text-[11px] font-semibold text-brand-muted bg-brand-bg px-2.5 py-1 rounded-lg">
                                        Cento: <strong className="text-brand-heading">R$ {formatBRL(item.price * 100)}</strong>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* BOTÕES DE ADIÇÃO (LARGOS E CONFORTÁVEIS PARA TOQUE NO CELULAR) */}
                              {isUnitItem ? (
                                inCart ? (
                                  <div className="bg-brand-bg rounded-xl p-2 border border-brand-primary/30 space-y-2">
                                    <div className="flex items-center justify-between px-1">
                                      <span className="text-xs font-extrabold text-brand-primary">
                                        ✓ Na lista: {inCart.quantity} un (R$ {formatBRL(item.price * inCart.quantity)})
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteFromCart(item.id)}
                                        className="text-[11px] font-bold text-brand-muted hover:text-brand-primary underline cursor-pointer"
                                      >
                                        Remover
                                      </button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveFromCart(item.id, 10)}
                                        className="py-2 rounded-lg bg-brand-card hover:bg-brand-bg-alt text-brand-heading font-extrabold text-xs border border-brand-border active:scale-95 transition-all cursor-pointer"
                                      >
                                        −10
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            10
                                          )
                                        }
                                        className="py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-xs active:scale-95 transition-all cursor-pointer"
                                      >
                                        +10
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            25
                                          )
                                        }
                                        className="py-2 rounded-lg bg-brand-espresso hover:bg-brand-primary text-white font-extrabold text-xs active:scale-95 transition-all cursor-pointer"
                                      >
                                        +25
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            50
                                          )
                                        }
                                        className="py-2 rounded-lg bg-brand-espresso hover:bg-brand-primary text-white font-extrabold text-xs active:scale-95 transition-all cursor-pointer"
                                      >
                                        +50
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-3 gap-2">
                                    {[10, 25, 50].map((qty) => (
                                      <button
                                        key={qty}
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            qty
                                          )
                                        }
                                        className="py-2.5 rounded-xl bg-brand-bg hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-extrabold border border-brand-border hover:border-brand-primary active:scale-95 transition-all cursor-pointer"
                                      >
                                        +{qty} un
                                      </button>
                                    ))}
                                  </div>
                                )
                              ) : (
                                /* Controles para Tortas Salgadas e Vinagretes (1 em 1) */
                                <div className="pt-0.5">
                                  {inCart ? (
                                    <div className="flex items-center justify-between bg-brand-bg rounded-xl p-1.5 border border-brand-primary/30">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveFromCart(item.id, 1)}
                                        className="w-10 h-9 rounded-lg bg-brand-card border border-brand-border font-extrabold text-base text-brand-heading cursor-pointer"
                                      >
                                        −
                                      </button>
                                      <span className="text-xs font-extrabold text-brand-primary">
                                        ✓ {inCart.quantity} {section.unitLabel} na lista
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            1
                                          )
                                        }
                                        className="w-10 h-9 rounded-lg bg-brand-primary text-white font-extrabold text-base cursor-pointer"
                                      >
                                        +
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAddToCart(
                                          item,
                                          section.category,
                                          section.unitLabel,
                                          section.stepQty,
                                          1
                                        )
                                      }
                                      className="w-full py-2.5 px-4 rounded-xl bg-brand-bg hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-extrabold border border-brand-border hover:border-brand-primary active:scale-95 transition-all cursor-pointer"
                                    >
                                      + Adicionar à lista de orçamento
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    /* MODO 2: LISTA COMPACTA (FÁCIL DE ESCANEAR E CLICAR NO CELULAR) */
                    <div className="bg-brand-card border border-brand-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5">
                        {section.items.map((item) => {
                          const inCart = cart[item.id];
                          const isZeroPrice = item.price === 0;
                          const isUnitItem = section.unitLabel === "un";

                          return (
                            <div
                              key={item.id}
                              className="flex flex-col justify-between pb-4 border-b border-brand-border/60 last:border-b-0"
                            >
                              <div className="flex items-baseline justify-between gap-2">
                                <h4 className="font-serif font-bold text-base sm:text-lg text-brand-heading">
                                  {item.name}
                                </h4>
                                <div className="flex-1 menu-dotted-leader mx-2 hidden sm:block" />
                                <span className="font-serif font-bold text-base sm:text-lg text-brand-primary shrink-0">
                                  {isZeroPrice ? (
                                    "Sob consulta"
                                  ) : (
                                    <>
                                      R$ {formatBRL(item.price)}
                                      <span className="text-[11px] font-sans font-normal text-brand-muted ml-0.5">
                                        /{section.unitLabel}
                                      </span>
                                    </>
                                  )}
                                </span>
                              </div>

                              {item.description && (
                                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              )}

                              <div className="flex items-center justify-between gap-2 mt-2.5">
                                {inCart ? (
                                  <span className="text-xs font-extrabold text-brand-primary">
                                    ✓ {inCart.quantity} {isUnitItem ? "un" : "x"} na lista
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-brand-muted">Adicionar:</span>
                                )}

                                <div className="flex items-center gap-1.5">
                                  {inCart && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveFromCart(item.id, isUnitItem ? 10 : 1)
                                      }
                                      className="px-2.5 py-1 rounded-lg bg-brand-bg-alt text-brand-heading text-xs font-extrabold cursor-pointer"
                                    >
                                      −{isUnitItem ? "10" : "1"}
                                    </button>
                                  )}
                                  {isUnitItem ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            10
                                          )
                                        }
                                        className="px-2.5 py-1 rounded-lg bg-brand-bg hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-bold border border-brand-border cursor-pointer"
                                      >
                                        +10
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            25
                                          )
                                        }
                                        className="px-2.5 py-1 rounded-lg bg-brand-bg hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-bold border border-brand-border cursor-pointer"
                                      >
                                        +25
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            50
                                          )
                                        }
                                        className="px-2.5 py-1 rounded-lg bg-brand-bg hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-bold border border-brand-border cursor-pointer"
                                      >
                                        +50
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAddToCart(
                                          item,
                                          section.category,
                                          section.unitLabel,
                                          section.stepQty,
                                          1
                                        )
                                      }
                                      className="px-3 py-1 rounded-lg bg-brand-bg hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-bold border border-brand-border cursor-pointer"
                                    >
                                      +1
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. SEÇÃO CONSULTIVA: TORTAS DOCES SOB ENCOMENDA */}
        <section id="tortas-doces" className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="bg-brand-card border-2 border-brand-gold/40 rounded-3xl sm:rounded-[2rem] p-5 sm:p-10 lg:p-12 shadow-md relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                  <span>🎂</span> Também Fazemos • Sob Consulta
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-heading leading-tight mb-3 sm:mb-4">
                  Tortas Doces Artesanais para o seu Evento
                </h2>
                <p className="text-xs sm:text-base text-brand-muted leading-relaxed mb-3 sm:mb-4">
                  Além dos salgados, docinhos e tortas salgadas do cardápio, você também pode encomendar{" "}
                  <strong className="text-brand-heading">tortas doces feitas sob medida</strong> para a sua comemoração.
                </p>
                <p className="text-xs sm:text-base text-brand-muted leading-relaxed mb-5 sm:mb-7">
                  Trabalhamos tanto com tortas confeitadas em{" "}
                  <strong className="text-brand-heading">chantilly / chantininho</strong> quanto com tortas inteiras tradicionais (como de{" "}
                  <strong className="text-brand-heading">brigadeiro, chocolate ou doce de leite</strong>), com diversas opções de recheios — como brigadeiro preto e branco, doce de leite e outras combinações definidas diretamente com a Tânia mediante consulta.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <a
                    href={getSweetCakeWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl sm:rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs sm:text-sm shadow-sm transition-all text-center"
                  >
                    <span>Consultar Tortas Doces no WhatsApp</span>
                    <span>→</span>
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(
                        customSweetCakeItem,
                        "Tortas Doces",
                        "torta",
                        1,
                        1
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl sm:rounded-full bg-brand-bg hover:bg-brand-bg-alt text-brand-heading font-bold text-xs sm:text-sm border border-brand-border transition-all cursor-pointer"
                  >
                    <span>
                      {cart[customSweetCakeItem.id]
                        ? `✓ Na lista (${cart[customSweetCakeItem.id].quantity}x)`
                        : "+ Incluir interesse na Minha Lista"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Destaques Ilustrativos das Possibilidades */}
              <div className="lg:col-span-5 bg-brand-surface-subtle rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-brand-border space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0">
                    <CategoryIcon category="Tortas Doces" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
                      Feita do seu jeito
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-heading">
                      Como personalizar a sua
                    </h3>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-brand-muted">
                  <div className="p-3 rounded-xl bg-brand-card border border-brand-border">
                    <strong className="text-brand-heading block mb-0.5">
                      ✦ Estilo & Cobertura
                    </strong>
                    Acabamento em chantilly/chantininho ou tortas inteiramente de brigadeiro, doce de leite ou chocolate.
                  </div>

                  <div className="p-3 rounded-xl bg-brand-card border border-brand-border">
                    <strong className="text-brand-heading block mb-0.5">
                      ✦ Recheios Variados
                    </strong>
                    Brigadeiro preto, brigadeiro branco, doce de leite e outros sabores sob consulta.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SEÇÃO SOBRE: TRADIÇÃO E CAPRICHO */}
        <section id="tradicao" className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="bg-brand-espresso text-[#F5EFE6] rounded-3xl sm:rounded-[2rem] p-6 sm:p-12 lg:p-16 shadow-lg relative overflow-hidden">
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-[#E6B35A] mb-2.5">
                Nossa Essência
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                Tradição e Capricho
              </h2>
              <p className="text-sm sm:text-lg text-[#F5EFE6]/90 leading-relaxed">
                Nossa produção é feita sob medida para o seu evento. Trabalhamos exclusivamente com encomendas agendadas para garantir que cada salgado, doce e torta saia da nossa cozinha fresquinho, direto para a sua comemoração. Acreditamos que o segredo de um bom buffet está no cuidado com os detalhes: tudo é preparado à mão, utilizando ingredientes selecionados e muito afeto. O resultado é aquele sabor inconfundível, pronto para surpreender os seus convidados.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/15 text-left">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-[#E6B35A] font-serif font-bold text-base sm:text-lg block">
                    Ingredientes Selecionados
                  </span>
                  <p className="text-xs text-[#F5EFE6]/80 mt-1 leading-relaxed">
                    Recheios fartos, massas leves e tempero caseiro preparado com rigor e carinho.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-[#E6B35A] font-serif font-bold text-base sm:text-lg block">
                    Sempre Fresquinho
                  </span>
                  <p className="text-xs text-[#F5EFE6]/80 mt-1 leading-relaxed">
                    Produzimos sob agendamento exclusivo para que seu pedido chegue impecável à festa.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-[#E6B35A] font-serif font-bold text-base sm:text-lg block">
                    Cardápio Completo
                  </span>
                  <p className="text-xs text-[#F5EFE6]/80 mt-1 leading-relaxed">
                    Salgados fritos e de forno, docinhos, trufas, tortas doces, tortas salgadas de 30cm e vinagretes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMO ENCOMENDAR */}
        <section id="como-encomendar" className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-10">
          <div className="bg-brand-card border border-brand-border rounded-3xl sm:rounded-[2rem] p-5 sm:p-10">
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary block mb-1">
                Passo a Passo
              </span>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-brand-heading">
                Como funciona sua encomenda
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-brand-bg/60 rounded-2xl p-5 border border-brand-border/80">
                <span className="w-8 h-8 rounded-full bg-brand-primary text-white font-serif font-bold flex items-center justify-center mb-3 text-sm">
                  1
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-brand-heading mb-1">
                  Escolha seus favoritos
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Toque nos botões <strong>+10, +25 ou +50</strong> nos produtos desejados para montar sua pré-lista de orçamento.
                </p>
              </div>

              <div className="bg-brand-bg/60 rounded-2xl p-5 border border-brand-border/80">
                <span className="w-8 h-8 rounded-full bg-brand-primary text-white font-serif font-bold flex items-center justify-center mb-3 text-sm">
                  2
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-brand-heading mb-1">
                  Confirme pelo WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Envie sua lista pelo WhatsApp para conferirmos disponibilidade da data, quantidades mínimas e sabores sob consulta.
                </p>
              </div>

              <div className="bg-brand-bg/60 rounded-2xl p-5 border border-brand-border/80">
                <span className="w-8 h-8 rounded-full bg-brand-primary text-white font-serif font-bold flex items-center justify-center mb-3 text-sm">
                  3
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-brand-heading mb-1">
                  Celebre com sabor
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Preparamos tudo artesanalmente e na hora certa para que sua comemoração tenha aquele sabor inesquecível.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="border-t border-brand-border bg-brand-bg-alt/60 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-brand-muted relative z-10 pb-24 sm:pb-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-serif font-bold text-base text-brand-heading">Buffet da Tânia</p>
            <p>Salgados, doces, tortas doces & salgadas e vinagretes artesanais sob encomenda.</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-heading hover:text-brand-primary underline"
            >
              Falar no WhatsApp
            </a>
            <span>•</span>
            <a href="#cardapio" className="font-bold text-brand-heading hover:text-brand-primary">
              Voltar ao topo ↑
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL / DRAWER DA LISTA DE ORÇAMENTO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-stretch justify-end bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-brand-card w-full sm:max-w-md h-[88vh] sm:h-full rounded-t-3xl sm:rounded-none flex flex-col shadow-2xl border-t sm:border-t-0 sm:border-l border-brand-border">
            <div className="p-4 sm:p-6 border-b border-brand-border flex items-center justify-between bg-brand-bg rounded-t-3xl sm:rounded-none">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-primary block">
                  Simulador de Pedido
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-heading">
                  Minha Lista de Orçamento
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-brand-heading hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar lista"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
              {cartEntries.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-brand-bg text-brand-muted flex items-center justify-center mx-auto mb-3">
                    <CategoryIcon category="Salgados de Forno" className="w-7 h-7" />
                  </div>
                  <p className="font-serif font-bold text-lg text-brand-heading">
                    Sua lista ainda está vazia
                  </p>
                  <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-xs mx-auto leading-relaxed">
                    Toque nos botões <strong>+10, +25 ou +50</strong> nos itens do cardápio para montar seu pedido e enviar tudo pelo WhatsApp.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-brand-muted pb-2 border-b border-brand-border">
                    <span>{cartEntries.length} itens selecionados</span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-brand-primary font-bold hover:underline cursor-pointer"
                    >
                      Limpar toda a lista
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-brand-bg border border-brand-border text-[11px] text-brand-muted leading-relaxed">
                    💡 <strong>Nota:</strong> Alguns itens possuem quantidade mínima por sabor, que será confirmada com a Tânia pelo WhatsApp.
                  </div>

                  {cartEntries.map((entry) => {
                    const isUnit = entry.unitLabel === "un";
                    return (
                      <div
                        key={entry.item.id}
                        className="bg-brand-bg/60 rounded-2xl p-3.5 border border-brand-border flex flex-col gap-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                              {entry.category}
                            </span>
                            <h4 className="font-serif font-bold text-base text-brand-heading">
                              {entry.item.name}
                            </h4>
                            <span className="text-xs font-semibold text-brand-primary">
                              {entry.item.price > 0
                                ? `R$ ${formatBRL(entry.item.price * entry.quantity)} (R$ ${formatBRL(
                                    entry.item.price
                                  )}/${entry.unitLabel})`
                                : "Valor e sabores sob consulta"}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteFromCart(entry.item.id)}
                            className="text-xs text-brand-muted hover:text-brand-primary px-1.5 py-0.5 cursor-pointer"
                            title="Remover item"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-brand-border/60">
                          <div className="inline-flex items-center bg-brand-card border border-brand-border rounded-xl p-1">
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveFromCart(entry.item.id, isUnit ? 10 : 1)
                              }
                              className="px-2.5 py-1 rounded-lg hover:bg-brand-bg-alt font-extrabold text-xs cursor-pointer"
                            >
                              −{isUnit ? "10" : "1"}
                            </button>
                            <span className="px-3 text-xs font-extrabold text-brand-heading">
                              {entry.quantity} {isUnit ? "un" : "x"}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleAddToCart(
                                  entry.item,
                                  entry.category,
                                  entry.unitLabel,
                                  entry.stepQty,
                                  isUnit ? 10 : 1
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-brand-primary text-white font-extrabold text-xs cursor-pointer"
                            >
                              +{isUnit ? "10" : "1"}
                            </button>
                          </div>

                          {isUnit && (
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  handleAddToCart(
                                    entry.item,
                                    entry.category,
                                    entry.unitLabel,
                                    entry.stepQty,
                                    25
                                  )
                                }
                                className="px-2.5 py-1.5 rounded-lg bg-brand-card hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-bold border border-brand-border cursor-pointer"
                              >
                                +25
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleAddToCart(
                                    entry.item,
                                    entry.category,
                                    entry.unitLabel,
                                    entry.stepQty,
                                    50
                                  )
                                }
                                className="px-2.5 py-1.5 rounded-lg bg-brand-card hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-bold border border-brand-border cursor-pointer"
                              >
                                +50
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div className="p-4 sm:p-6 border-t border-brand-border bg-brand-bg">
              {cartEntries.length > 0 && (
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                    Total estimado:
                  </span>
                  <span className="font-serif font-bold text-2xl text-brand-heading">
                    R$ {formatBRL(cartTotalValue)}
                  </span>
                </div>
              )}

              <a
                href={getCartWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl sm:rounded-full bg-[#25D366] hover:bg-[#1FB855] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>
                  {cartEntries.length > 0
                    ? "Enviar Lista pelo WhatsApp"
                    : "Falar Direto no WhatsApp"}
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 6. BARRA INFERIOR FIXA (ESTILO APP DE DELIVERY NO CELULAR) */}
      {cartEntries.length > 0 ? (
        <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-40 flex items-center justify-between gap-2 bg-brand-espresso text-[#FFFDF9] p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-2xl border border-white/15">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 text-left cursor-pointer"
          >
            <span className="w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-extrabold flex items-center justify-center shrink-0">
              {cartEntries.length}
            </span>
            <div className="leading-tight">
              <span className="text-[11px] text-[#E6B35A] font-bold block">
                Ver minha lista (editar)
              </span>
              <span className="text-sm font-extrabold">R$ {formatBRL(cartTotalValue)}</span>
            </div>
          </button>

          <a
            href={getCartWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1FB855] text-white py-2.5 px-4 sm:px-5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all shrink-0"
          >
            <span>Enviar Pedido</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      ) : (
        <a
          href={getGeneralWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] hover:bg-[#1FB855] text-white py-3 px-4 sm:py-3.5 sm:px-5 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all flex items-center gap-2"
          aria-label="Faça sua encomenda pelo WhatsApp"
        >
          <span className="font-bold text-xs sm:text-sm">Faça sua encomenda</span>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      )}
    </div>
  );
}
