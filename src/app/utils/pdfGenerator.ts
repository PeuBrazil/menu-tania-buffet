import { jsPDF } from "jspdf";
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
 * Desenha a moldura de papelaria artesanal (fundo creme e bordas duplas) na página atual do PDF
 */
function drawPageBackgroundAndFrame(doc: jsPDF) {
  // Fundo creme suave
  doc.setFillColor(255, 253, 249); // #FFFDF9
  doc.rect(0, 0, 210, 297, "F");

  // Borda externa
  doc.setDrawColor(228, 214, 195); // #E4D6C3
  doc.setLineWidth(0.7);
  doc.roundedRect(8, 8, 194, 281, 4, 4, "S");

  // Borda interna fina
  doc.setDrawColor(235, 225, 209); // #EBE1D1
  doc.setLineWidth(0.3);
  doc.roundedRect(10.5, 10.5, 189, 276, 3, 3, "S");
}

/**
 * Desenha o cabeçalho principal do Buffet da Tânia na primeira página e retorna o Y inicial do conteúdo
 */
function drawMainHeader(doc: jsPDF, subtitleText: string): number {
  // Círculo do emblema "T"
  doc.setFillColor(53, 33, 25); // #352119
  doc.setDrawColor(230, 179, 90); // #E6B35A
  doc.setLineWidth(0.9);
  doc.circle(105, 23, 7.5, "FD");

  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.setTextColor(230, 179, 90); // #E6B35A
  doc.text("T", 105, 25.3, { align: "center" });

  // Tag superior
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(194, 89, 63); // #C2593F
  doc.text("RECEITAS DE FAMÍLIA  •  FEITO À MÃO", 105, 35.5, { align: "center" });

  // Título Principal
  doc.setFont("times", "bold");
  doc.setFontSize(24);
  doc.setTextColor(53, 33, 25); // #352119
  doc.text("Buffet da Tânia", 105, 44, { align: "center" });

  // Subtítulo
  doc.setFont("times", "italic");
  doc.setFontSize(11);
  doc.setTextColor(194, 89, 63); // #C2593F
  doc.text(subtitleText, 105, 49.5, { align: "center" });

  // Pílula de Contato
  doc.setFillColor(245, 239, 230); // #F5EFE6
  doc.setDrawColor(228, 214, 195); // #E4D6C3
  doc.setLineWidth(0.35);
  doc.roundedRect(52, 53, 106, 6.8, 3.4, 3.4, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(74, 51, 42); // #4A332A
  doc.text("WhatsApp: (71) 99153-0019   •   menu-tania-buffet.vercel.app", 105, 57.5, {
    align: "center",
  });

  // Linha divisória do cabeçalho
  doc.setDrawColor(228, 214, 195);
  doc.setLineWidth(0.5);
  doc.line(16, 63.5, 194, 63.5);

  return 69;
}

/**
 * Adiciona numeração de páginas e rodapé em todas as páginas geradas
 */
function addFootersToAllPages(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(228, 214, 195);
    doc.setLineWidth(0.3);
    doc.line(16, 279, 194, 279);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(114, 85, 74); // #72554A
    doc.text(
      "Buffet da Tânia • Produção 100% artesanal sob encomenda • WhatsApp: (71) 99153-0019",
      16,
      283.5
    );
    doc.setFont("helvetica", "bold");
    doc.text(`Página ${i} de ${pageCount}`, 194, 283.5, { align: "right" });
  }
}

/**
 * Gera e faz o download direto do arquivo Cardapio-Completo-Buffet-da-Tania.pdf
 */
export function downloadFullMenuPdf() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  drawPageBackgroundAndFrame(doc);
  let y = drawMainHeader(doc, "Cardápio Completo de Encomendas para Festas & Eventos");

  const pageBottomLimit = 273;
  const colWidth = 85;
  const col1X = 16;
  const col2X = 109;

  for (const section of menuData) {
    const isUnit = section.unitLabel === "un";

    // Verifica se cabe o título da seção + pelo menos 1 linha de itens na página atual
    if (y + 24 > pageBottomLimit) {
      doc.addPage();
      drawPageBackgroundAndFrame(doc);
      y = 18;
    }

    // Faixa de Título da Categoria
    doc.setFillColor(53, 33, 25); // #352119
    doc.roundedRect(16, y, 178, 8.5, 2, 2, "F");

    doc.setFont("times", "bold");
    doc.setFontSize(12.5);
    doc.setTextColor(255, 253, 249);
    doc.text(section.category, 20, y + 5.8);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(230, 179, 90); // #E6B35A
    doc.text(
      `${section.items.length} ${section.items.length === 1 ? "opção" : "opções"}`,
      190,
      y + 5.6,
      { align: "right" }
    );

    y += 12;

    // Renderiza os itens em pares (2 colunas lado a lado)
    for (let i = 0; i < section.items.length; i += 2) {
      const leftItem = section.items[i];
      const rightItem = section.items[i + 1];

      const leftDescLines = leftItem.description
        ? doc.splitTextToSize(leftItem.description, colWidth)
        : [];
      const rightDescLines =
        rightItem && rightItem.description
          ? doc.splitTextToSize(rightItem.description, colWidth)
          : [];

      const maxDescLines = Math.max(leftDescLines.length, rightDescLines.length, 1);
      const rowHeight = 5.5 + maxDescLines * 3.4 + 3.5;

      if (y + rowHeight > pageBottomLimit) {
        doc.addPage();
        drawPageBackgroundAndFrame(doc);
        y = 18;
      }

      // Desenha item da esquerda
      drawMenuItemCell(doc, leftItem, section.unitLabel, isUnit, col1X, y, colWidth, leftDescLines);

      // Desenha item da direita (se existir)
      if (rightItem) {
        drawMenuItemCell(
          doc,
          rightItem,
          section.unitLabel,
          isUnit,
          col2X,
          y,
          colWidth,
          rightDescLines
        );
      }

      // Linha tracejada sutil abaixo da dupla
      doc.setDrawColor(232, 220, 204);
      doc.setLineWidth(0.2);
      doc.line(col1X, y + rowHeight - 1.8, col1X + colWidth, y + rowHeight - 1.8);
      if (rightItem) {
        doc.line(col2X, y + rowHeight - 1.8, col2X + colWidth, y + rowHeight - 1.8);
      }

      y += rowHeight;
    }

    y += 4;
  }

  // Quadro de Tortas Doces Sob Consulta e Avisos no final
  if (y + 26 > pageBottomLimit) {
    doc.addPage();
    drawPageBackgroundAndFrame(doc);
    y = 18;
  }

  doc.setFillColor(255, 248, 235); // #FFF8EB
  doc.setDrawColor(230, 200, 145); // #E6C891
  doc.setLineWidth(0.4);
  doc.roundedRect(16, y, 178, 22, 3, 3, "FD");

  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(53, 33, 25);
  doc.text("Tortas Doces Sob Encomenda (Mediante Consulta)", 20, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.2);
  doc.setTextColor(74, 51, 42);
  const sweetText = doc.splitTextToSize(
    "Também preparamos tortas doces artesanais em marshmallow/chantininho ou inteiras tradicionais (brigadeiro, chocolate, doce de leite) com recheios variados sob consulta. Trabalhamos exclusivamente sob encomenda (alguns itens possuem quantidade mínima por sabor).",
    170
  );
  doc.text(sweetText, 20, y + 11);

  addFootersToAllPages(doc);
  doc.save("Cardapio-Buffet-da-Tania.pdf");
}

function drawMenuItemCell(
  doc: jsPDF,
  item: MenuItem,
  unitLabel: string,
  isUnit: boolean,
  x: number,
  y: number,
  width: number,
  descLines: string[]
) {
  const priceStr =
    item.price === 0
      ? "Sob consulta"
      : `R$ ${formatBRL(item.price)}/${unitLabel}`;
  const centoStr =
    item.price > 0 && isUnit ? ` (Cento: R$ ${formatBRL(item.price * 100)})` : "";

  // Nome do prato
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(53, 33, 25); // #352119
  doc.text(item.name, x, y + 3.5);

  // Preço alinhado à direita da coluna
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(194, 89, 63); // #C2593F
  doc.text(priceStr + centoStr, x + width, y + 3.5, { align: "right" });

  // Descrição
  if (descLines.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.8);
    doc.setTextColor(114, 85, 74); // #72554A
    doc.text(descLines, x, y + 7.5);
  }
}

/**
 * Gera e faz o download direto do arquivo Orcamento-Buffet-da-Tania.pdf
 */
export function downloadQuotePdf(cartEntries: PdfCartEntry[], totalValue: number) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  drawPageBackgroundAndFrame(doc);
  let y = drawMainHeader(doc, "Resumo de Orçamento Personalizado");

  const dateStr = new Date().toLocaleDateString("pt-BR");
  const pageBottomLimit = 270;

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.setTextColor(53, 33, 25);
  doc.text("Itens Selecionados no Orçamento", 16, y + 4);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(114, 85, 74);
  doc.text(`Data: ${dateStr}`, 194, y + 4, { align: "right" });

  y += 8;

  // Cabeçalho da Tabela
  doc.setFillColor(53, 33, 25); // #352119
  doc.roundedRect(16, y, 178, 8, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 253, 249);
  doc.text("ITEM / CATEGORIA", 20, y + 5.3);
  doc.text("QTD.", 118, y + 5.3);
  doc.text("UNITÁRIO", 145, y + 5.3);
  doc.text("SUBTOTAL", 190, y + 5.3, { align: "right" });

  y += 10;

  cartEntries.forEach((entry, index) => {
    if (y + 12 > pageBottomLimit) {
      doc.addPage();
      drawPageBackgroundAndFrame(doc);
      y = 18;
    }

    if (index % 2 === 0) {
      doc.setFillColor(245, 239, 230); // #F5EFE6
      doc.roundedRect(16, y - 1, 178, 10.5, 1.5, 1.5, "F");
    }

    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(53, 33, 25);
    doc.text(entry.item.name, 20, y + 3.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(114, 85, 74);
    doc.text(entry.category, 20, y + 7.5);

    const unitDesc = entry.unitLabel === "un" ? "unid." : entry.unitLabel;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(74, 51, 42);
    doc.text(`${entry.quantity} ${unitDesc}`, 118, y + 5.2);

    const unitPriceStr =
      entry.item.price > 0
        ? `R$ ${formatBRL(entry.item.price)}/${entry.unitLabel}`
        : "Sob consulta";
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(unitPriceStr, 145, y + 5.2);

    const subtotalStr =
      entry.item.price > 0
        ? `R$ ${formatBRL(entry.item.price * entry.quantity)}`
        : "Sob consulta";
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(194, 89, 63); // #C2593F
    doc.text(subtotalStr, 190, y + 5.2, { align: "right" });

    y += 11.5;
  });

  y += 4;
  if (y + 38 > pageBottomLimit) {
    doc.addPage();
    drawPageBackgroundAndFrame(doc);
    y = 18;
  }

  // Caixa de Valor Total Estimado
  doc.setFillColor(245, 239, 230); // #F5EFE6
  doc.setDrawColor(212, 149, 59); // #D4953B
  doc.setLineWidth(0.6);
  doc.roundedRect(16, y, 178, 14, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(74, 51, 42);
  doc.text("VALOR TOTAL ESTIMADO (ITENS TABELADOS):", 21, y + 8.5);

  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(53, 33, 25);
  doc.text(`R$ ${formatBRL(totalValue)}`, 190, y + 9, { align: "right" });

  y += 19;

  // Caixa de orientações finais
  doc.setFillColor(255, 248, 235);
  doc.setDrawColor(230, 200, 145);
  doc.setLineWidth(0.4);
  doc.roundedRect(16, y, 178, 16, 2.5, 2.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(53, 33, 25);
  doc.text("Próximo passo para confirmar sua encomenda:", 20, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(74, 51, 42);
  doc.text(
    "Envie este orçamento para o WhatsApp da Tânia (71) 99153-0019 para confirmar disponibilidade da data e quantidades mínimas.",
    20,
    y + 11
  );

  addFootersToAllPages(doc);
  doc.save("Orcamento-Buffet-da-Tania.pdf");
}
