"use client";

import { useState } from "react";
import { menuData } from "./data/menu";

export default function Home() {
  // O uso do || "" evita erros caso o menuData ainda esteja carregando
  const [activeTab, setActiveTab] = useState(menuData[0]?.category || "");
  const activeSection = menuData.find(
    (section) => section.category === activeTab
  );

  const whatsappNumber = "5571991530019";

  const getGeneralWhatsAppLink = () => {
    const text = encodeURIComponent(
      "Olá, Tânia! Acessei o cardápio online e gostaria de fazer um orçamento para um evento."
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text pb-24 font-sans relative">
      
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-brand-text tracking-tight drop-shadow-sm">
          Buffet da Tânia
        </h1>
        <p className="text-lg opacity-80 mb-8 max-w-xl">
          Salgados, doces e tortas feitos à mão, com aquele capricho de receita de família para levar o melhor sabor à sua festa.
        </p>
        <div className="bg-brand-primary/10 border border-brand-primary/20 text-brand-text px-6 py-3 rounded-2xl text-sm font-semibold max-w-md shadow-sm">
          ⚠️ Pedidos sob encomenda (consulte as quantidades mínimas por item pelo WhatsApp).
        </div>
      </section>

      {/* 2. Seção Sobre */}
      <section className="max-w-3xl mx-auto px-6 text-center mb-16 bg-brand-card/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-black/5">
        <h2 className="text-2xl font-bold mb-3">Tradição e Capricho</h2>
        <p className="opacity-90 leading-relaxed">
          Nossa produção é feita sob medida para o seu evento. Trabalhamos exclusivamente com encomendas agendadas para garantir que cada salgado, doce e torta saia da nossa cozinha fresquinho, direto para a sua comemoração. Acreditamos que o segredo de um bom buffet está no cuidado com os detalhes: tudo é preparado à mão, utilizando ingredientes selecionados e muito afeto. O resultado é aquele sabor inconfundível, pronto para surpreender os seus convidados.
        </p>
      </section>

      {/* 3. Cardápio */}
      <section id="cardapio" className="max-w-4xl mx-auto px-6">
        
        {/* Navegação das Abas */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {menuData.map((section) => (
            <button
              key={section.category}
              onClick={() => setActiveTab(section.category)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 border-2 ${
                activeTab === section.category
                  ? "bg-brand-primary text-white border-brand-primary shadow-md scale-105"
                  : "bg-transparent text-brand-text border-brand-text/20 hover:border-brand-primary hover:text-brand-primary shadow-sm hover:scale-105"
              }`}
            >
              {section.category}
            </button>
          ))}
        </div>

        {/* Listagem de Produtos */}
        {activeSection && (
          <div className="p-2 transition-all animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeSection.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-brand-card p-6 rounded-2xl flex flex-col shadow-sm border border-black/5"
                >
                  <div className="mb-4">
                    <h4 className="font-bold text-xl">{item.name}</h4>
                    {/* Só exibe o parágrafo de descrição se ele não for vazio */}
                    {item.description && (
                      <p className="text-sm opacity-70 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto pt-4 border-t border-black/5 flex items-end justify-between">
                    <span className="font-black text-xl text-brand-primary">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                      
                      {/* Oculta o " / un" nas tortas e nos vinagretes */}
                      {activeTab !== "Tortas Salgadas (30cm)" && activeTab !== "Vinagretes" && (
                        <span className="text-sm font-normal text-brand-text/60 ml-1">
                          / un
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. Botão Flutuante do WhatsApp */}
      <a
        href={getGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white py-3 px-5 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all z-50 flex items-center gap-3"
        aria-label="Faça sua encomenda"
      >
        <span className="font-bold text-sm hidden sm:block">
          Faça sua encomenda
        </span>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </main>
  );
}