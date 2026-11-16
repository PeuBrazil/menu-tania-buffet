type PartyCalculatorProps = {
  guestCount: number;
  setGuestCount: (val: number) => void;
  onClose: () => void;
  whatsappNumber: string;
};

export function PartyCalculator({
  guestCount,
  setGuestCount,
  onClose,
  whatsappNumber,
}: PartyCalculatorProps) {
  return (
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
              Média: <strong>10 salgados/pessoa</strong> (5 fritos + 5 de forno) e{" "}
              <strong>5 doces/pessoa</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-brand-muted hover:text-brand-heading underline cursor-pointer shrink-0"
          >
            Fechar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
          <div className="lg:col-span-5 bg-brand-card p-4 rounded-xl border border-brand-border">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
              Convidados:{" "}
              <span className="text-brand-primary text-base font-extrabold">
                {guestCount} pessoas
              </span>
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
  );
}

