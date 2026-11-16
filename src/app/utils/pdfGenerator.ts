import { MenuItem, menuData } from "../data/menu";

export type PdfCartEntry = {
  item: MenuItem;
  category: string;
  unitLabel: string;
  stepQty: number;
  quantity: number;
};

const formatBRL = (val: number) =>
  val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Abre uma janela/aba formatada com papelaria personalizada do Buffet da Tânia
 * (cores creme, chocolate, terracota e dourado, fontes Fraunces e Plus Jakarta Sans)
 * pronta para salvar como PDF em qualquer dispositivo (celular ou computador).
 */
function openStyledPdfDocument(title: string, bodyHtml: string) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Por favor, permita pop-ups neste site para gerar e baixar o PDF.");
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    @page {
      size: A4;
      margin: 10mm;
    }

    body {
      background-color: #F5EFE6;
      color: #4A332A;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      padding: 24px 16px 48px;
      line-height: 1.45;
    }

    .toolbar {
      max-width: 820px;
      margin: 0 auto 20px;
      background: #352119;
      color: #FFFDF9;
      padding: 12px 20px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 10px 25px rgba(53, 33, 25, 0.18);
    }

    .toolbar-info {
      font-size: 13px;
      color: #EFE5D8;
    }

    .toolbar-actions {
      display: flex;
      gap: 10px;
    }

    .btn-print {
      background: #C2593F;
      color: #FFFFFF;
      border: none;
      padding: 9px 18px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      font-family: inherit;
    }

    .btn-close {
      background: rgba(255, 255, 255, 0.12);
      color: #FFFDF9;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 9px 14px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      font-family: inherit;
    }

    .sheet {
      max-width: 820px;
      margin: 0 auto;
      background: #FFFDF9;
      border: 2px solid #E4D6C3;
      border-radius: 24px;
      padding: 32px 36px;
      position: relative;
      box-shadow: 0 15px 40px rgba(74, 51, 42, 0.08);
    }

    .sheet-inner-border {
      border: 1px solid #EBE1D1;
      border-radius: 18px;
      padding: 28px;
    }

    .header {
      text-align: center;
      padding-bottom: 22px;
      margin-bottom: 24px;
      border-bottom: 2px solid #E4D6C3;
    }

    .emblem {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: #352119;
      border: 2.5px solid #E6B35A;
      color: #E6B35A;
      font-family: 'Fraunces', Georgia, serif;
      font-size: 28px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .tag-top {
      display: block;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.22em;
      color: #C2593F;
      margin-bottom: 4px;
    }

    .brand-title {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 34px;
      font-weight: 700;
      color: #352119;
      line-height: 1.1;
    }

    .brand-subtitle {
      font-family: 'Fraunces', Georgia, serif;
      font-style: italic;
      font-size: 16px;
      color: #C2593F;
      margin-top: 4px;
    }

    .contact-bar {
      margin-top: 12px;
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: #F5EFE6;
      border: 1px solid #E4D6C3;
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 600;
      color: #4A332A;
    }

    .section-block {
      margin-bottom: 26px;
      break-inside: avoid-page;
    }

    .section-header {
      background: #352119;
      color: #FFFDF9;
      padding: 8px 16px;
      border-radius: 10px;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .section-title {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 18px;
      font-weight: 700;
      color: #FFFDF9;
    }

    .section-meta {
      font-size: 11px;
      color: #E6B35A;
      font-weight: 600;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 24px;
    }

    .menu-item {
      padding-bottom: 7px;
      border-bottom: 1px dashed #E4D6C3;
      break-inside: avoid;
    }

    .menu-item-top {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }

    .menu-item-name {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 13.5px;
      font-weight: 700;
      color: #352119;
    }

    .menu-item-price {
      font-weight: 800;
      font-size: 13px;
      color: #C2593F;
      white-space: nowrap;
    }

    .menu-item-cento {
      font-size: 10px;
      font-weight: 600;
      color: #72554A;
      margin-left: 4px;
    }

    .menu-item-desc {
      font-size: 11px;
      color: #72554A;
      margin-top: 2px;
      line-height: 1.35;
    }

    /* Tabela de Orçamento */
    .quote-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    .quote-table th {
      background: #352119;
      color: #FFFDF9;
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 10px 12px;
    }

    .quote-table th:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    .quote-table th:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      text-align: right;
    }

    .quote-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #EBE1D1;
      font-size: 13px;
      color: #4A332A;
    }

    .quote-table td:last-child {
      text-align: right;
      font-weight: 700;
      color: #352119;
    }

    .total-box {
      background: #F5EFE6;
      border: 2px solid #D4953B;
      border-radius: 14px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
    }

    .total-label {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #4A332A;
    }

    .total-value {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 26px;
      font-weight: 700;
      color: #352119;
    }

    .note-box {
      margin-top: 20px;
      background: #FFF8EB;
      border: 1px solid #E6C891;
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 11.5px;
      color: #4A332A;
    }

    .footer {
      margin-top: 24px;
      padding-top: 14px;
      border-top: 1px solid #E4D6C3;
      text-align: center;
      font-size: 11px;
      color: #72554A;
    }

    @media (max-width: 640px) {
      .sheet {
        padding: 16px;
      }
      .sheet-inner-border {
        padding: 16px;
      }
      .menu-grid {
        grid-template-columns: 1fr;
      }
    }

    @media print {
      body {
        background: #FFFFFF;
        padding: 0;
      }
      .toolbar {
        display: none !important;
      }
      .sheet {
        box-shadow: none;
        border: 1.5px solid #E4D6C3;
        padding: 16px;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div class="toolbar-info">
      <strong>📄 Visualização pronta para PDF</strong> — Clique em "Salvar em PDF / Imprimir" e escolha <em>Salvar como PDF</em>.
    </div>
    <div class="toolbar-actions">
      <button class="btn-print" onclick="window.print()">🖨️ Salvar em PDF / Imprimir</button>
      <button class="btn-close" onclick="window.close()">Fechar</button>
    </div>
  </div>

  <div class="sheet">
    <div class="sheet-inner-border">
      <div class="header">
        <div class="emblem">T</div>
        <span class="tag-top">Receitas de Família • Feito à Mão</span>
        <h1 class="brand-title">Buffet da Tânia</h1>
        <p class="brand-subtitle">Salgados, doces e tortas artesanais sob encomenda</p>
        <div class="contact-bar">
          <span>📱 WhatsApp: (71) 99153-0019</span>
          <span>•</span>
          <span>🌐 menu-tania-buffet.vercel.app</span>
        </div>
      </div>

      ${bodyHtml}

      <div class="footer">
        Buffet da Tânia • Produção 100% artesanal sob encomenda agendada • WhatsApp: (71) 99153-0019
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 450);
    };
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

/**
 * Gera o PDF do Cardápio Completo do Buffet da Tânia
 */
export function downloadFullMenuPdf() {
  const sectionsHtml = menuData
    .map((section) => {
      const isUnit = section.unitLabel === "un";
      const itemsHtml = section.items
        .map((item) => {
          const priceText =
            item.price === 0
              ? "Sob consulta"
              : `R$ ${formatBRL(item.price)}/${section.unitLabel}`;
          const centoText =
            item.price > 0 && isUnit
              ? `<span class="menu-item-cento">(Cento: R$ ${formatBRL(item.price * 100)})</span>`
              : "";

          return `
            <div class="menu-item">
              <div class="menu-item-top">
                <span class="menu-item-name">${item.name}</span>
                <span class="menu-item-price">${priceText}${centoText}</span>
              </div>
              ${item.description ? `<p class="menu-item-desc">${item.description}</p>` : ""}
            </div>
          `;
        })
        .join("");

      return `
        <div class="section-block">
          <div class="section-header">
            <span class="section-title">${section.category}</span>
            <span class="section-meta">${section.items.length} opções</span>
          </div>
          <div class="menu-grid">
            ${itemsHtml}
          </div>
        </div>
      `;
    })
    .join("");

  const sweetCakesNote = `
    <div class="note-box">
      <strong>🎂 Tortas Doces Sob Encomenda (Mediante Consulta):</strong>
      Também preparamos tortas doces confeitadas em marshmallow/chantininho ou inteiras tradicionais (brigadeiro, chocolate, doce de leite) com recheios variados a combinar pelo WhatsApp.
      <br/><br/>
      <strong>⚠️ Informações Importantes:</strong> Trabalhamos exclusivamente sob encomenda. Alguns itens possuem quantidade mínima por sabor.
    </div>
  `;

  openStyledPdfDocument(
    "Cardapio-Completo-Buffet-da-Tania.pdf",
    sectionsHtml + sweetCakesNote
  );
}

/**
 * Gera o PDF da Lista de Orçamento personalizada do cliente
 */
export function downloadQuotePdf(cartEntries: PdfCartEntry[], totalValue: number) {
  const dateStr = new Date().toLocaleDateString("pt-BR");

  const rowsHtml = cartEntries
    .map((entry) => {
      const unitPrice =
        entry.item.price > 0
          ? `R$ ${formatBRL(entry.item.price)} / ${entry.unitLabel}`
          : "Sob consulta";
      const subtotal =
        entry.item.price > 0
          ? `R$ ${formatBRL(entry.item.price * entry.quantity)}`
          : "Sob consulta";

      return `
        <tr>
          <td>
            <strong style="font-family: 'Fraunces', Georgia, serif; color: #352119;">${entry.item.name}</strong>
            <div style="font-size: 11px; color: #72554A;">${entry.category}</div>
          </td>
          <td><strong>${entry.quantity}</strong> ${entry.unitLabel === "un" ? "unid." : entry.unitLabel}</td>
          <td>${unitPrice}</td>
          <td>${subtotal}</td>
        </tr>
      `;
    })
    .join("");

  const bodyHtml = `
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px;">
      <h2 style="font-family: 'Fraunces', Georgia, serif; font-size: 20px; color: #352119;">
        Resumo de Orçamento
      </h2>
      <span style="font-size: 12px; color: #72554A; font-weight: 600;">
        Gerado em: ${dateStr}
      </span>
    </div>

    <table class="quote-table">
      <thead>
        <tr>
          <th>Item / Categoria</th>
          <th>Qtd.</th>
          <th>Valor Unit.</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="total-box">
      <div>
        <span class="total-label">Valor Total Estimado</span>
        <div style="font-size: 11px; color: #72554A;">(Itens com valor tabelado no cardápio)</div>
      </div>
      <span class="total-value">R$ ${formatBRL(totalValue)}</span>
    </div>

    <div class="note-box">
      <strong>📌 Próximo passo para confirmar sua encomenda:</strong><br/>
      Envie este resumo para o WhatsApp da Tânia <strong>(71) 99153-0019</strong> para confirmar a disponibilidade da data do seu evento, quantidades mínimas por sabor e valores de itens sob consulta.
    </div>
  `;

  openStyledPdfDocument("Orcamento-Buffet-da-Tania.pdf", bodyHtml);
}
