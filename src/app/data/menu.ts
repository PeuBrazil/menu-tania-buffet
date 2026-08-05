export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type MenuSection = {
  category: string;
  color: string;
  items: MenuItem[];
};

export const menuData: MenuSection[] = [
    {
    category: "Salgados Fritos",
    color: "bg-transparent",
    items: [
      { id: "bolinha-queijo", name: "Bolinha de Queijo", description: "Massa crocante por fora com recheio macio de queijo derretido.", price: 2.50 },
      { id: "bolinha-queijo-coalho", name: "Bolinha de Queijo Coalho", description: "Massa crocante recheada com o sabor marcante do queijo coalho.", price: 2.50 },
      { id: "bolinha-carne-seca-queijo", name: "Bolinha Carne Seca c/ Queijo Coalho", description: "Massa crocante por fora com um recheio perfeito que une a carne seca desfiada e o sabor marcante do queijo coalho.", price: 2.80 },
      { id: "bolinha-carne-seca-banana", name: "Bolinha Carne Seca c/ Banana da Terra", description: "Massa crocante recheada com o contraste agridoce irresistível da carne seca com o toque da banana da terra.", price: 2.80 },
      { id: "boliviano", name: "Boliviano", description: "Salgado de massa macia e casquinha doce finalizada no açucar e canela, com recheio de carne moída.", price: 1.90 },
      { id: "camafeu-camarao", name: "Camafeu de Camarão", description: "Salgado sofisticado e cremoso, empanado e frito até dourar, com um recheio marcante de camarão.", price: 2.80 },
      { id: "camarao-empanado", name: "Camarão Empanado", description: "Camarão inteiro bem temperado, empanado e frito até dourar.", price: 4.00 },
      { id: "coxinha", name: "Coxinha", description: "Massa macia com casquinha crocante e recheio de frango desfiado bem temperado.", price: 1.90 },
      { id: "coxinha-catupiry", name: "Coxinha c/ Catupiry", description: "Nossa massa tradicional recheada com frango desfiado e requeijão cremoso.", price: 2.60 },
      { id: "croquete-bacalhau", name: "Croquete de Bacalhau", description: "Massa cremosa e saborosa com lascas de bacalhau, frita e crocante.", price: 3.30 },
      { id: "croquete-camarao", name: "Croquete de Camarão", description: "Massa cremosa empanada com recheio de camarão.", price: 3.50 },
      { id: "pastel-frito-carne", name: "Pastel Frito de Carne", description: "Massa fina e crocante com recheio suculento de carne moída temperada.", price: 2.10 },
      { id: "pastel-frito-frango", name: "Pastel Frito de Frango", description: "Massa fina e crocante com recheio de frango desfiado.", price: 2.10 },
      { id: "pastel-frito-queijo", name: "Pastel Frito de Queijo", description: "Massa fina e crocante recheada com queijo derretido.", price: 2.10 },
      { id: "pastel-frito-misto", name: "Pastel Frito Misto", description: "Massa fina e crocante com recheio clássico de queijo e presunto.", price: 2.10 },
      { id: "pastel-frito-camarao", name: "Pastel Frito de Camarão", description: "Massa fina e crocante recheada com um refogado de camarão.", price: 2.50 },
      { id: "quibe", name: "Quibe", description: "Clássico quibe de carne moída e trigo, frito e temperado com especiarias na medida certa.", price: 1.90 },
      { id: "risoles-camarao", name: "Risoles de Camarão", description: "Massa macia e empanada, recheada com camarão cremoso.", price: 2.50 },
    ]
  },
  {
    category: "Salgados de Forno",
    color: "bg-transparent",
    items: [
      { id: "barquete-camarao", name: "Barquete de Camarão", description: "Massa fina em formato de barquinho com recheio cremoso de camarão.", price: 2.80 },
      { id: "barquete-palmito-queijo", name: "Barquete de Palmito com Queijo", description: "Barquinho de massa leve recheado com a combinação suave e cremosa de palmito e queijo.", price: 2.60 },
      { id: "barquete-peito-peru-abacaxi", name: "Barquete de Peito de Peru c/ Abacaxi", description: "Barquinho assado com o contraste agridoce perfeito entre o peito de peru e o abacaxi.", price: 2.60 },
      { id: "barquete-queijo", name: "Barquete de Queijo", description: "Massa delicada em formato de barco com recheio macio e dourado de queijo.", price: 2.60 },
      { id: "barquete-tomate-seco", name: "Barquete de Tomate Seco", description: "Barquinho de massa leve com recheio cremoso e o sabor intenso do tomate seco.", price: 2.60 },
      { id: "barquete-tomate-seco-gorgonzola", name: "Barquete de Tomate Seco c/ Gorgonzola", description: "Massa delicada que une o sabor marcante do tomate seco com a cremosidade do gorgonzola.", price: 2.80 },
      { id: "cestinha-camarao-queijo", name: "Cestinha de Camarão com Queijo", description: "Cestinha assada e bem crocante, recheada com a mistura irresistível de camarão e queijo.", price: 3.50 },
      { id: "cestinha-salmao", name: "Cestinha de Salmão", description: "Cestinha de massa super crocante com um recheio suave e sofisticado de creme de salmão.", price: 4.00 },
      { id: "cestinha-damasco", name: "Cestinha de Damasco", description: "Cestinha assada e crocante, recheada com o sabor elegante e levemente agridoce do damasco.", price: 3.50 },
      { id: "cachorro-quente-forno", name: "Cachorro Quente de Forno", description: "Massa fofinha assada com recheio de salsicha e molho especial.", price: 1.90 },
      { id: "empada-bacalhau", name: "Empada de Bacalhau", description: "Massa que derrete na boca, recheada com lascas de bacalhau temperado.", price: 2.60 },
      { id: "empada-camarao", name: "Empada de Camarão", description: "Massa que derrete na boca com recheio cremoso de camarão.", price: 2.50 },
      { id: "empada-frango", name: "Empada de Frango", description: "Massa que derrete na boca, com recheio bem temperado de frango desfiado.", price: 1.90 },
      { id: "empada-palmito", name: "Empada de Palmito", description: "Massa que derrete na boca com um creme suave e saboroso de palmito.", price: 1.90 },
      { id: "empada-queijo", name: "Empada de Queijo", description: "Massa que derrete na boca com recheio macio e dourado de queijo.", price: 1.90 },
      { id: "esfiha-carne", name: "Esfiha de Carne", description: "Massa de esfiha macia e levemente dourada, com recheio de carne moída temperada.", price: 1.90 },
      { id: "pastel-forno-bacalhau", name: "Pastel de Forno de Bacalhau", description: "Massa assada e leve, recheada com bacalhau.", price: 2.60 },
      { id: "pastel-forno-camarao", name: "Pastel de Forno de Camarão", description: "Massa assada e leve, recheada com camarão.", price: 2.50 },
      { id: "pastel-forno-frango", name: "Pastel de Forno de Frango", description: "Massa assada macia recheada com frango desfiado temperado.", price: 1.90 },
      { id: "pastel-forno-misto", name: "Pastel de Forno Misto", description: "Massa assada recheada com a combinação clássica de queijo e presunto.", price: 1.90 },
      { id: "quiche-camarao", name: "Quiche de Camarão", description: "Massa leve de tartelete com recheio cremoso de camarão", price: 2.60 },
      { id: "quiche-alho-poro", name: "Quiche de Alho Poró", description: "Massa leve de tartelete com recheio cremoso e suave de alho-poró.", price: 2.50 },
      { id: "quiche-gorgonzola", name: "Quiche de Gorgonzola", description: "Massa leve com recheio cremoso e o sabor marcante do queijo gorgonzola.", price: 2.60 },
      { id: "quiche-salmao", name: "Quiche de Salmão", description: "Massa leve de tartelete com recheio cremoso de salmão.", price: 3.50 },
      { id: "quiche-tomate-seco", name: "Quiche de Tomate Seco", description: "Massa leve de tartelete com recheio cremoso e o sabor intenso do tomate seco.", price: 2.70 },
      { id: "quiche-tomate-seco-ricota", name: "Quiche de Tomate Seco c/ Ricota", description: "A união perfeita do sabor marcante do tomate seco com a suavidade do creme de ricota.", price: 2.70 },
      { id: "quiche-ricota", name: "Quiche de Ricota", description: "Massa leve de tartelete com um recheio suave, delicado e muito cremoso de ricota.", price: 2.40 },
      { id: "quiche-queijo", name: "Quiche de Queijo", description: "Clássica massa de quiche com recheio macio, dourado e cremoso de queijo.", price: 2.50 },
      { id: "saltenha", name: "Saltenha", description: "Massa assada com recheio de carne apimentada, azeitona e passas.", price: 2.60 },
      { id: "tartelete-carne-seca", name: "Tartelete Carne Seca c/ Banana", description: "Massa leve e crocante que destaca o contraste perfeito entre o salgadinho da carne seca e o toque doce da banana.", price: 2.70 },
      { id: "trouxinha-bacalhau", name: "Trouxinha de Bacalhau", description: "Massa leve e delicada assada em formato de trouxinha, recheada com lascas de bacalhau bem temperado.", price: 2.60 },
      { id: "trouxinha-camarao", name: "Trouxinha de Camarão", description: "Massa fina e assada, fechada em formato de trouxinha com recheio cremoso de camarão.", price: 2.60 },
      { id: "trouxinha-frango", name: "Trouxinha de Frango", description: "Massa leve assada em formato de trouxinha, com recheio suculento de frango desfiado.", price: 2.10 },
      { id: "trouxinha-peito-peru", name: "Trouxinha de Peito de Peru", description: "Massa delicada e assada, recheada com o sabor suave do peito de peru.", price: 2.50 },
      { id: "trouxinha-presunto", name: "Trouxinha de Presunto", description: "Trouxinha assada de massa leve, com recheio clássico e saboroso de presunto.", price: 2.00 },
      { id: "paozinho-sem-recheio", name: "Pãozinho S/ Recheio", description: "Pãozinho tradicional macio e fofinho.", price: 1.80 },
      { id: "paozinho-com-recheio", name: "Pãozinho C/ Recheio", description: "Pãozinho tradicional, com recheio de queijo.", price: 1.90 },
      { id: "vol-au-vant-camarao", name: "Vol Au Vant de Camarão", description: "Massa folhada leve e crocante em formato de cestinha, recheada com creme de camarão.", price: 4.50 },
      { id: "folheado-frango", name: "Folheado de Frango", description: "Massa folhada crocante, assada em camadas, com recheio suculento de frango.", price: 2.80 },
    ]
  },
  {
    category: "Doces",
    color: "bg-transparent",
    items: [
      { id: "ameixa", name: "Ameixa", description: "Docinho tradicional e macio com sabor marcante de ameixa.", price: 3.00 },
      { id: "ameixa-caramelada", name: "Ameixa Caramelada", description: "Docinho de ameixa envolto em uma casquinha de açúcar crocante.", price: 2.80 },
      { id: "bicho-de-pe", name: "Bicho de Pé", description: "Docinho cremoso sabor morango, o favorito das crianças.", price: 2.60 },
      { id: "bombom-cereja-cafe", name: "Bombom de Cereja/Café", description: "", price: 3.00 },
      { id: "bombom-damasco", name: "Bombom de Damasco", description: "", price: 2.60 },
      { id: "bombom-prestigio", name: "Bombom de Prestígio", description: "Casquinha de chocolate com recheio úmido e docinho de coco.", price: 2.40 },
      { id: "brigadeiro", name: "Brigadeiro", description: "O clássico indispensável, macio e enrolado no granulado.", price: 1.90 },
      { id: "beijinho", name: "Beijinho", description: "Docinho tradicional de coco, cremoso e delicado.", price: 1.90 },
      { id: "brigadeiro-ninho-nutella", name: "Brigadeiro Ninho/Nutella", description: "Docinho macio de leite em pó com recheio cremoso de creme de avelã.", price: 2.30 },
      { id: "brigadeiro-gourmet", name: "Brigadeiro Gourmet", description: "Brigadeiro com textura aveludada e sabor intenso de cacau.", price: 2.60 },
      { id: "brigadeiro-amendoas", name: "Brigadeiro com Amêndoas", description: "", price: 4.00 },
      { id: "brigadeiro-churros", name: "Brigadeiro de Churros", description: "Docinho de doce de leite passado no açúcar com canela.", price: 2.30 },
      { id: "carequinha", name: "Carequinha", description: "", price: 2.60 },
      { id: "casadinho", name: "Casadinho", description: "A união perfeita e macia do brigadeiro tradicional com o docinho branco.", price: 1.90 },
      { id: "carmelita", name: "Carmelita", description: "O sabor clássico do Casadinho em formato de rosa, com biscoito crocrante embaixo.", price: 2.70 },
      { id: "castanha", name: "Castanha", description: "Docinho cremoso feito com castanhas selecionadas.", price: 3.00 },
      { id: "cereja", name: "Cereja", description: "Doce de chocolate meio amargo com recheio de cereja.", price: 3.00 },
      { id: "chokito", name: "Chokito", description: "Docinho com textura crocante e sabor de caramelo com chocolate.", price: 2.50 },
      { id: "coco-caramelizado", name: "Coco Caramelizado", description: "Docinho de coco com uma casquinha de caramelo crocante por fora.", price: 2.40 },
      { id: "cajuzinho", name: "Cajuzinho", description: "Doce tradicional de amendoim com um toque na medida de cacau.", price: 1.90 },
      { id: "damasco-caramelizado", name: "Damasco Caramelizado", description: "", price: 2.80 },
      { id: "damasco-recheado", name: "Damasco Recheado", description: "Damasco macio com recheio cremoso e delicado.", price: 4.00 },
      { id: "goiaba", name: "Goiaba", description: "", price: 2.60 },
      { id: "limao", name: "Limão", description: "Docinho cremoso com o toque refrescante e azedinho do limão.", price: 2.50 },
      { id: "morango-coberto", name: "Morango Coberto", description: "Morango fresco e suculento, envolto em docinho e coberto com chocolate.", price: 5.00 },
      { id: "moranguinho", name: "Moranguinho", description: "Docinho tradicional com sabor suave e docinho de morango.", price: 1.90 },
      { id: "nozes", name: "Nozes", description: "Docinho sofisticado e macio com pedacinhos de nozes.", price: 2.80 },
      { id: "nozes-caramelizadas", name: "Nozes Caramelizadas", description: "Docinho de nozes finalizado com uma casquinha crocante de caramelo.", price: 2.80 },
      { id: "ourico", name: "Ouriço", description: "", price: 3.50 },
      { id: "romeu-julieta", name: "Romeu e Julieta", description: "A combinação clássica e irresistível de queijo com goiabada.", price: 2.60 },
      { id: "sonho-valsa", name: "Sonho de Valsa", description: "Docinho cremoso com pedacinhos crocantes de bombom.", price: 2.60 },
      { id: "tortinha-limao", name: "Tortinha de Limão", description: "Massa crocante com recheio cremoso e azedinho de limão com raspas de limão e chocolate branco.", price: 2.50 },
      { id: "tortinha-limao-siciliano", name: "Tortinha de Limão Siciliano", description: "Massa crocrante com mousse de limão e raspas de limão e chocolate branco.", price: 2.80 },
      { id: "trufa-laranja", name: "Trufa de Laranja", description: "Casquinha de chocolate com recheio macio e o sabor cítrico e marcante da laranja.", price: 4.00 },
      { id: "trufa-maracuja", name: "Trufa de Maracujá", description: "Casquinha de chocolate com recheio cremoso e o toque irresistível do maracujá.", price: 4.00 },
      { id: "trufa-limao", name: "Trufa de Limão", description: "Casquinha de chocolate branco com recheio macio e refrescante de limão.", price: 4.00 },
      { id: "trufa-tradicional", name: "Trufa Tradicional", description: "Casquinha de chocolate com recheio macio e cremoso de trufa.", price: 4.00 },
      { id: "trufa-branca", name: "Trufa Branca", description: "", price: 4.00 },
      { id: "trufa-abacaxi", name: "Trufa de Abacaxi", description: "", price: 4.00 },
      { id: "trufa-cafe", name: "Trufa de Café", description: "Casquinha de chocolate meio amargo com recheio intenso e cremoso de café.", price: 4.00 },
      { id: "trufa-castanha-para", name: "Trufa de Castanha do Pará", description: "", price: 4.00 },
      { id: "uva-passa-acucar", name: "Uva Passa no Açúcar", description: "", price: 2.40 },
      { id: "uva-coberta-chocolate", name: "Uva Coberta com Chocolate", description: "Uva fresca e sem semente, envolta em docinho branco e coberta com chocolate.", price: 2.60 },
    ]
  },
  {
    category: "Tortas Salgadas (30cm)",
    color: "bg-transparent",
    items: [
      { id: "torta-bacalhau", name: "Bacalhau", description: "Torta salgada de 30cm", price: 240.00 },
      { id: "torta-camarao", name: "Camarão", description: "Torta salgada de 30cm", price: 240.00 },
      { id: "torta-carne-seca", name: "Carne Seca c/ Banana da Terra", description: "Torta salgada de 30cm", price: 240.00 },
      { id: "torta-frango", name: "Frango", description: "Torta salgada de 30cm", price: 220.00 },
      { id: "torta-palmito", name: "Palmito", description: "Torta salgada de 30cm", price: 220.00 },
      { id: "torta-peito-peru", name: "Peito de Peru", description: "Torta salgada de 30cm", price: 240.00 },
      { id: "torta-peito-peru-abacaxi", name: "Peito de Peru com Abacaxi", description: "Torta salgada de 30cm", price: 240.00 },
    ]
  },
  {
    category: "Vinagretes",
    color: "bg-transparent",
    items: [
      { id: "vinagrete", name: "Vinagrete Tradicional", description: "", price: 0.00 },
      { id: "carne-peito-peru", name: "Peito de Peru", description: "", price: 0.00 },
      { id: "lombinho", name: "Lombinho", description: "", price: 0.00 },
      { id: "lombinho-canadense", name: "Lombinho Canadense", description: "", price: 0.00 },
      { id: "carne-camarao", name: "Camarão", description: "", price: 0.00 },
      { id: "file-cebolas", name: "Filé com Cebolas Carameladas", description: "Acompanha pimentão vermelho, amarelo e verde", price: 0.00 },
    ]
  }
];