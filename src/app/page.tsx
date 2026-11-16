"use client";

import { useState, useMemo, useEffect } from "react";
import { menuData, MenuItem } from "./data/menu";
import { CategoryIcon } from "./components/CategoryIcon";
import { MarginIllustrations } from "./components/MarginIllustrations";
import { PartyCalculator } from "./components/PartyCalculator";
import { CartDrawer } from "./components/CartDrawer";
import { PdfPreviewModal } from "./components/PdfPreviewModal";
import { PdfCartEntry } from "./utils/pdfGenerator";

const badgeStyles: Record<string, string> = {
  "Mais Pedido": "bg-brand-primary/15 text-brand-primary border-brand-primary/30",
  "Mais Pedida": "bg-brand-primary/15 text-brand-primary border-brand-primary/30",
  Favorito: "bg-brand-gold/20 text-brand-gold border-brand-gold/40",
  Premium: "bg-brand-selected text-brand-selected-text border-brand-selected",
  Gourmet: "bg-brand-selected text-brand-selected-text border-brand-selected",
  Especial: "bg-brand-gold/15 text-brand-gold border-brand-gold/35",
  "Especial 30cm": "bg-brand-gold/15 text-brand-gold border-brand-gold/35",
  Agridoce: "bg-brand-sage/15 text-brand-sage border-brand-sage/30",
  Clássico: "bg-brand-muted/15 text-brand-heading border-brand-border",
  "Clássica 30cm": "bg-brand-muted/15 text-brand-heading border-brand-border",
};

const customSweetCakeItem: MenuItem = {
  id: "torta-doce-personalizada",
  name: "Torta Doce Sob Encomenda (Sabores a combinar)",
  description:
    "Torta doce artesanal personalizada (em chantininho/marshmallow ou cobertura tradicional) com recheios e sabores definidos mediante consulta.",
  price: 0,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>(menuData[0]?.category || "Salgados Fritos");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "bistro">("grid");
  const [guestCount, setGuestCount] = useState<number>(30);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [cart, setCart] = useState<Record<string, PdfCartEntry>>({});
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [pdfPreviewMode, setPdfPreviewMode] = useState<"menu" | "quote" | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const whatsappNumber = "5571991530019";

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

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

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

  const subcategories = useMemo(() => {
    if (!activeSection) return ["Todos"];
    const subs = Array.from(
      new Set(activeSection.items.map((i) => i.subcategory).filter(Boolean))
    ) as string[];
    return subs.length > 0 ? ["Todos", ...subs] : ["Todos"];
  }, [activeSection]);

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
      "Olá, Tânia! Vi no site que você também faz Tortas Doces sob encomenda (em marshmallow/chantininho ou tradicionais) e gostaria de consultar as opções de sabores, recheios e valores."
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
    <div
      style={{ overflowAnchor: "none" }}
      className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col text-brand-text relative"
    >
      <MarginIllustrations />

      {/* Faixa Superior */}
      <div className="bg-brand-espresso text-[#F5EFE6] text-xs sm:text-sm py-2.5 px-4 text-center border-b border-white/10 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="text-[#E6B35A]">✦</span> Produção 100% artesanal e sob encomenda
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="opacity-90">
            Alguns itens possuem quantidade mínima por sabor — consulte pelo WhatsApp
          </span>
        </div>
      </div>

      {/* Navbar Sticky */}
      <header className="sticky top-0 z-40 bg-brand-bg/95 backdrop-blur-md border-b border-brand-border transition-all">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-espresso text-[#F5EFE6] flex items-center justify-center shadow-sm group-hover:bg-brand-primary transition-colors shrink-0">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tighter text-[#E6B35A] group-hover:text-white">
                T
              </span>
            </div>
            <div>
              <span className="font-serif font-bold text-lg sm:text-2xl text-brand-heading tracking-tight block leading-none whitespace-nowrap">
                Buffet da Tânia
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-brand-muted font-semibold block mt-1 whitespace-nowrap">
                Sabor & Tradição em Festas
              </span>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-brand-text/90">
            <a href="#cardapio" className="hover:text-brand-primary transition-colors whitespace-nowrap">
              Cardápio ({totalMenuItemsCount})
            </a>
            <a href="#tortas-doces" className="hover:text-brand-primary transition-colors whitespace-nowrap">
              Tortas Doces
            </a>
            <a
              href="#calculadora"
              onClick={() => setShowCalculator(true)}
              className="hover:text-brand-primary transition-colors whitespace-nowrap"
            >
              Calculadora de Festa
            </a>
            <a href="#tradicao" className="hover:text-brand-primary transition-colors whitespace-nowrap">
              Nossa Tradição
            </a>
            <button
              type="button"
              onClick={() => setPdfPreviewMode("menu")}
              className="hover:text-brand-primary transition-colors whitespace-nowrap cursor-pointer"
            >
              Cardápio em PDF
            </button>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="inline-flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-full bg-brand-card border border-brand-border hover:border-brand-primary text-brand-heading text-xs font-bold shadow-2xs transition-all cursor-pointer"
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
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

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full bg-brand-card border border-brand-border hover:border-brand-primary text-brand-heading text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-brand-primary shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="hidden sm:inline">Minha Lista</span>
              <span className="sm:hidden">Lista</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-extrabold leading-none ${
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
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden pt-6 pb-10 sm:pt-14 sm:pb-18 border-b border-brand-border/70">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
            <div className="bg-brand-card border border-brand-border rounded-3xl sm:rounded-[2rem] p-5 sm:p-10 lg:p-14 shadow-[0_20px_60px_-20px_rgba(74,51,42,0.14)] relative overflow-hidden">
              <div className="hidden lg:block absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-gold/10 blur-2xl pointer-events-none" />
              <div className="hidden lg:block absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-primary/10 blur-2xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
                <div className="lg:col-span-7 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-bg-alt border border-brand-border text-brand-heading text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-5">
                    <span className="text-brand-primary">★</span> Receitas de Família • Feito à Mão
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-heading tracking-tight leading-[1.08] mb-4 sm:mb-5">
                    Buffet da Tânia
                    <span className="block text-xl sm:text-3xl lg:text-4xl font-normal italic text-brand-primary mt-2">
                      Capricho artesanal em cada detalhe da sua festa
                    </span>
                  </h1>

                  <p className="text-sm sm:text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-5 sm:mb-7">
                    Salgados, doces e tortas feitos à mão, com aquele capricho de receita de família para levar o melhor sabor à sua festa.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 mb-5 sm:mb-7">
                    <a
                      href="#cardapio"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl sm:rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                    >
                      <span>Explorar o Cardápio</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowCalculator((prev) => !prev)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl sm:rounded-full bg-brand-bg-alt hover:bg-brand-border text-brand-heading font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-brand-primary shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span>Calcular Quantidade</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPdfPreviewMode("menu")}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl sm:rounded-full bg-brand-card hover:bg-brand-bg-alt text-brand-heading font-bold text-xs sm:text-sm border border-brand-border transition-all cursor-pointer whitespace-nowrap"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-brand-primary shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Cardápio em PDF</span>
                    </button>
                  </div>

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
                        Em marshmallow/chantininho ou inteiras de brigadeiro, doce de leite e chocolate, sob consulta.
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

              {showCalculator && (
                <PartyCalculator
                  guestCount={guestCount}
                  setGuestCount={setGuestCount}
                  onClose={() => setShowCalculator(false)}
                  whatsappNumber={whatsappNumber}
                />
              )}
            </div>
          </div>
        </section>

        {/* 2. SEÇÃO DO CARDÁPIO */}
        <section id="cardapio" className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-primary block mb-1.5">
              Nosso Menu Completo
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-heading tracking-tight">
              Cardápio de Encomendas
            </h2>
            <p className="text-xs sm:text-base text-brand-muted mt-1.5">
              Toque em <strong className="text-brand-heading">+10, +50 ou +100</strong> nos seus itens preferidos para montar sua lista de orçamento.
            </p>
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setPdfPreviewMode("menu")}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-card hover:bg-brand-bg-alt text-brand-heading text-xs font-bold border border-brand-border shadow-2xs transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-brand-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Visualizar e Baixar Cardápio em PDF</span>
              </button>
            </div>
          </div>

          {/* Seletor de Categorias Mobile */}
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
                      ? "bg-brand-selected text-brand-selected-text border-brand-selected shadow-sm"
                      : "bg-brand-card text-brand-heading border-brand-border"
                  }`}
                >
                  <CategoryIcon category={section.category} className="w-4 h-4 text-brand-primary" />
                  <span>{section.category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      isActive ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-muted"
                    }`}
                  >
                    {section.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Seletor de Categorias Tablet/Desktop */}
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
                      ? "bg-brand-selected text-brand-selected-text border-brand-selected shadow-md -translate-y-0.5"
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
                        isActive ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-muted"
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

              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                <span className="text-xs font-semibold text-brand-muted">Modo de visão:</span>
                <div className="inline-flex rounded-xl bg-brand-bg p-1 border border-brand-border">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-brand-selected text-brand-selected-text shadow-2xs"
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
                        ? "bg-brand-selected text-brand-selected-text shadow-2xs"
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
                      className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-brand-selected text-brand-selected-text border-brand-selected font-extrabold shadow-xs scale-[1.02]"
                          : "bg-brand-card hover:bg-brand-bg text-brand-text border-brand-border font-semibold"
                      }`}
                    >
                      {isSelected ? `✓ ${flavor}` : flavor}
                    </button>
                  );
                })}
              </div>
            </div>

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
                        className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                          active
                            ? "bg-brand-selected text-brand-selected-text border-brand-selected font-extrabold shadow-xs"
                            : "bg-brand-bg text-brand-text border-brand-border hover:bg-brand-bg-alt font-bold"
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

                              <h4 className="font-serif font-bold text-lg sm:text-xl text-brand-heading group-hover:text-brand-primary transition-colors leading-snug">
                                {item.name}
                              </h4>

                              {item.description && (
                                <p className="text-xs sm:text-sm text-brand-muted mt-1.5 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            <div className="mt-4 pt-3.5 border-t border-brand-border/70 flex flex-col gap-3">
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
                                            50
                                          )
                                        }
                                        className="py-2 rounded-lg bg-brand-selected text-brand-selected-text hover:bg-brand-primary hover:text-white font-extrabold text-xs active:scale-95 transition-all cursor-pointer"
                                      >
                                        +50
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            100
                                          )
                                        }
                                        className="py-2 rounded-lg bg-brand-selected text-brand-selected-text hover:bg-brand-primary hover:text-white font-extrabold text-xs active:scale-95 transition-all cursor-pointer"
                                      >
                                        +100
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-3 gap-2">
                                    {[10, 50, 100].map((qty) => (
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
                                            50
                                          )
                                        }
                                        className="px-2.5 py-1 rounded-lg bg-brand-bg hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-bold border border-brand-border cursor-pointer"
                                      >
                                        +50
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleAddToCart(
                                            item,
                                            section.category,
                                            section.unitLabel,
                                            section.stepQty,
                                            100
                                          )
                                        }
                                        className="px-2.5 py-1 rounded-lg bg-brand-bg hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-bold border border-brand-border cursor-pointer"
                                      >
                                        +100
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
                  <strong className="text-brand-heading">marshmallow / chantininho</strong> quanto com tortas inteiras tradicionais (como de{" "}
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
                    Acabamento em marshmallow/chantininho ou tortas inteiramente de brigadeiro, doce de leite ou chocolate.
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
                  Toque nos botões <strong>+10, +50 ou +100</strong> nos produtos desejados para montar sua pré-lista de orçamento.
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
                  Envie sua lista pelo WhatsApp (ou baixe em PDF) para conferirmos disponibilidade da data, quantidades mínimas e sabores sob consulta.
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
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPdfPreviewMode("menu")}
              className="font-bold text-brand-heading hover:text-brand-primary underline cursor-pointer"
            >
              Baixar Cardápio em PDF
            </button>
            <span>•</span>
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

      {/* Gaveta Lateral / Bottom Sheet da Minha Lista */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartEntries={cartEntries}
        cartTotalValue={cartTotalValue}
        onAdd={handleAddToCart}
        onRemove={handleRemoveFromCart}
        onDelete={handleDeleteFromCart}
        onClear={clearCart}
        whatsappLink={getCartWhatsAppLink()}
        onOpenQuotePdfPreview={() => setPdfPreviewMode("quote")}
      />

      {/* Modal de Pré-visualização e Download Direto do PDF (Sem abrir tela de impressão) */}
      <PdfPreviewModal
        mode={pdfPreviewMode}
        onClose={() => setPdfPreviewMode(null)}
        cartEntries={cartEntries}
        cartTotalValue={cartTotalValue}
      />

      {/* 6. BARRA INFERIOR FIXA */}
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

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setPdfPreviewMode("quote")}
              className="bg-white/12 hover:bg-white/20 text-[#FFFDF9] py-2.5 px-3 rounded-xl sm:rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Visualizar e baixar orçamento em PDF"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#E6B35A]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden xs:inline">PDF</span>
            </button>

            <a
              href={getCartWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1FB855] text-white py-2.5 px-4 sm:px-5 rounded-xl sm:rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <span>Enviar Pedido</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
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
