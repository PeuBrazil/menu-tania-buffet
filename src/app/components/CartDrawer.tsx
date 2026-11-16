import { MenuItem } from "../data/menu";
import { CategoryIcon } from "./CategoryIcon";
import { PdfCartEntry } from "../utils/pdfGenerator";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartEntries: PdfCartEntry[];
  cartTotalValue: number;
  onAdd: (
    item: MenuItem,
    category: string,
    unitLabel: string,
    stepQty: number,
    customDelta?: number
  ) => void;
  onRemove: (itemId: string, customDelta?: number) => void;
  onDelete: (itemId: string) => void;
  onClear: () => void;
  whatsappLink: string;
  onOpenQuotePdfPreview: () => void;
};

const formatBRL = (val: number) =>
  val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function CartDrawer({
  isOpen,
  onClose,
  cartEntries,
  cartTotalValue,
  onAdd,
  onRemove,
  onDelete,
  onClear,
  whatsappLink,
  onOpenQuotePdfPreview,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
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
            onClick={onClose}
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
                Toque nos botões <strong>+10, +50 ou +100</strong> nos itens do cardápio para montar seu pedido e enviar pelo WhatsApp ou salvar em PDF.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-brand-muted pb-2 border-b border-brand-border">
                <span>{cartEntries.length} itens selecionados</span>
                <button
                  type="button"
                  onClick={onClear}
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
                        onClick={() => onDelete(entry.item.id)}
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
                          onClick={() => onRemove(entry.item.id, isUnit ? 10 : 1)}
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
                            onAdd(
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
                              onAdd(
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
                          <button
                            type="button"
                            onClick={() =>
                              onAdd(
                                entry.item,
                                entry.category,
                                entry.unitLabel,
                                entry.stepQty,
                                100
                              )
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-brand-card hover:bg-brand-primary text-brand-heading hover:text-white text-xs font-bold border border-brand-border cursor-pointer"
                          >
                            +100
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

        <div className="p-4 sm:p-6 border-t border-brand-border bg-brand-bg space-y-2.5">
          {cartEntries.length > 0 && (
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                Total estimado:
              </span>
              <span className="font-serif font-bold text-2xl text-brand-heading">
                R$ {formatBRL(cartTotalValue)}
              </span>
            </div>
          )}

          <a
            href={whatsappLink}
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

          {cartEntries.length > 0 && (
            <button
              type="button"
              onClick={onOpenQuotePdfPreview}
              className="w-full py-2.5 px-4 rounded-2xl sm:rounded-full bg-brand-card hover:bg-brand-bg-alt text-brand-heading font-bold text-xs sm:text-sm border border-brand-border flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-brand-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Visualizar e Baixar Orçamento em PDF</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

