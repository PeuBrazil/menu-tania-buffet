import { menuData } from "../data/menu";
import {
  downloadFullMenuPdf,
  downloadQuotePdf,
  PdfCartEntry,
} from "../utils/pdfGenerator";

type PdfPreviewModalProps = {
  mode: "menu" | "quote" | null;
  onClose: () => void;
  cartEntries: PdfCartEntry[];
  cartTotalValue: number;
};

const formatBRL = (val: number) =>
  val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function PdfPreviewModal({
  mode,
  onClose,
  cartEntries,
  cartTotalValue,
}: PdfPreviewModalProps) {
  if (!mode) return null;

  const isMenu = mode === "menu";

  const handleDownload = () => {
    if (isMenu) {
      downloadFullMenuPdf();
    } else {
      downloadQuotePdf(cartEntries, cartTotalValue);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-brand-bg w-full max-w-4xl max-h-[92vh] rounded-3xl flex flex-col shadow-2xl border border-brand-border overflow-hidden">
        {/* Barra Superior de Instruções + Botão de Download Direto */}
        <div className="bg-brand-espresso text-[#FFFDF9] px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E6B35A] block">
              {isMenu ? "Pré-visualização do Cardápio Completo" : "Pré-visualização do seu Orçamento"}
            </span>
            <p className="text-xs sm:text-sm text-[#EFE5D8] mt-0.5">
              Confira abaixo a prévia do documento e clique em <strong>Baixar PDF</strong> para salvar o arquivo direto no seu aparelho.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Baixar PDF Agora</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-full bg-white/12 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              Fechar ✕
            </button>
          </div>
        </div>

        {/* Área da Folha de Papelaria (Preview Visual) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#EBE1D1]/50 dark:bg-black/30">
          <div className="max-w-3xl mx-auto bg-[#FFFDF9] text-[#4A332A] border-2 border-[#E4D6C3] rounded-2xl p-4 sm:p-8 shadow-md">
            <div className="border border-[#EBE1D1] rounded-xl p-4 sm:p-6">
              {/* Cabeçalho da Folha */}
              <div className="text-center pb-5 mb-6 border-b-2 border-[#E4D6C3]">
                <div className="w-12 h-12 rounded-full bg-[#352119] border-2 border-[#E6B35A] text-[#E6B35A] font-serif font-bold text-2xl inline-flex items-center justify-center mb-2">
                  T
                </div>
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C2593F]">
                  Receitas de Família • Feito à Mão
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#352119] mt-0.5">
                  Buffet da Tânia
                </h2>
                <p className="font-serif italic text-xs sm:text-sm text-[#C2593F] mt-0.5">
                  {isMenu
                    ? "Cardápio Completo de Encomendas para Festas & Eventos"
                    : "Resumo de Orçamento Personalizado"}
                </p>
                <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 bg-[#F5EFE6] border border-[#E4D6C3] px-3.5 py-1 rounded-full text-[11px] font-semibold text-[#4A332A]">
                  <span>📱 WhatsApp: (71) 99153-0019</span>
                  <span>•</span>
                  <span>🌐 menu-tania-buffet.vercel.app</span>
                </div>
              </div>

              {/* Conteúdo do Preview: Cardápio Completo OU Orçamento */}
              {isMenu ? (
                <div className="space-y-6">
                  {menuData.map((section) => {
                    const isUnit = section.unitLabel === "un";
                    return (
                      <div key={section.category}>
                        <div className="bg-[#352119] text-[#FFFDF9] px-3.5 py-2 rounded-lg flex items-baseline justify-between mb-3">
                          <span className="font-serif font-bold text-base sm:text-lg">
                            {section.category}
                          </span>
                          <span className="text-[11px] font-bold text-[#E6B35A]">
                            {section.items.length} opções
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                          {section.items.map((item) => (
                            <div
                              key={item.id}
                              className="pb-2 border-b border-dashed border-[#E4D6C3]"
                            >
                              <div className="flex items-baseline justify-between gap-2">
                                <span className="font-serif font-bold text-xs sm:text-sm text-[#352119]">
                                  {item.name}
                                </span>
                                <span className="text-xs font-extrabold text-[#C2593F] shrink-0">
                                  {item.price === 0
                                    ? "Sob consulta"
                                    : `R$ ${formatBRL(item.price)}/${section.unitLabel}`}
                                  {item.price > 0 && isUnit && (
                                    <span className="text-[10px] font-semibold text-[#72554A] ml-1">
                                      (Cento: R$ {formatBRL(item.price * 100)})
                                    </span>
                                  )}
                                </span>
                              </div>
                              {item.description && (
                                <p className="text-[11px] text-[#72554A] mt-0.5 leading-snug">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <div className="bg-[#FFF8EB] border border-[#E6C891] rounded-xl p-3.5 text-xs text-[#4A332A]">
                    <strong>🎂 Tortas Doces Sob Encomenda (Mediante Consulta):</strong> Também preparamos tortas doces em marshmallow/chantininho ou inteiras tradicionais (brigadeiro, chocolate, doce de leite) com recheios variados a combinar pelo WhatsApp.
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif font-bold text-lg text-[#352119]">
                      Itens Selecionados
                    </h3>
                    <span className="text-xs text-[#72554A] font-semibold">
                      Data: {new Date().toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#352119] text-[#FFFDF9] text-[11px] uppercase tracking-wider">
                          <th className="py-2.5 px-3 rounded-l-lg">Item / Categoria</th>
                          <th className="py-2.5 px-3">Qtd.</th>
                          <th className="py-2.5 px-3">Unitário</th>
                          <th className="py-2.5 px-3 rounded-r-lg text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EBE1D1] text-xs sm:text-sm">
                        {cartEntries.map((entry) => (
                          <tr key={entry.item.id}>
                            <td className="py-2.5 px-3">
                              <strong className="font-serif text-[#352119] block">
                                {entry.item.name}
                              </strong>
                              <span className="text-[11px] text-[#72554A]">
                                {entry.category}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-bold">
                              {entry.quantity} {entry.unitLabel === "un" ? "unid." : entry.unitLabel}
                            </td>
                            <td className="py-2.5 px-3 text-[#72554A]">
                              {entry.item.price > 0
                                ? `R$ ${formatBRL(entry.item.price)}/${entry.unitLabel}`
                                : "Sob consulta"}
                            </td>
                            <td className="py-2.5 px-3 text-right font-extrabold text-[#C2593F]">
                              {entry.item.price > 0
                                ? `R$ ${formatBRL(entry.item.price * entry.quantity)}`
                                : "Sob consulta"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-[#F5EFE6] border-2 border-[#D4953B] rounded-xl p-4 flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#4A332A]">
                      Valor Total Estimado:
                    </span>
                    <span className="font-serif font-bold text-xl sm:text-2xl text-[#352119]">
                      R$ {formatBRL(cartTotalValue)}
                    </span>
                  </div>

                  <div className="bg-[#FFF8EB] border border-[#E6C891] rounded-xl p-3.5 text-xs text-[#4A332A]">
                    <strong>📌 Próximo passo:</strong> Envie este orçamento para o WhatsApp da Tânia <strong>(71) 99153-0019</strong> para confirmar disponibilidade da data e quantidades mínimas.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
