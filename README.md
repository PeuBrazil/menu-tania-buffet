# 🍽️ Cardápio Digital - Buffet da Tânia

Uma aplicação web responsiva construída para digitalizar e otimizar o processo de encomendas de um buffet artesanal, substituindo catálogos estáticos em PDF por uma experiência interativa e de alta conversão.

> 🔗 **[Acessar o Projeto Online](https://menu-tania-buffet.vercel.app/)**

## 🎯 O Problema
Anteriormente, o cardápio do buffet era distribuído em formato PDF. Isso gerava fricção na experiência do usuário: era difícil de ler em telas menores, impossível de atualizar sem reenviar o arquivo para todos os clientes, e não possuía um "Call to Action" (chamada para ação) claro para fechar a venda.

## 💡 A Solução
Desenvolvi um catálogo digital em formato de Single Page Application (SPA). O foco principal foi criar uma interface extremamente limpa, rápida e direta ao ponto, guiando o usuário desde a visualização dos produtos até o fechamento da encomenda via WhatsApp com um único clique.

## ✨ Principais Funcionalidades e Decisões de Negócio

*   **Renderização Condicional Dinâmica:** Implementação de regras de negócio na interface. Por exemplo, a exibição do sufixo "R$ X / un" é renderizada de forma inteligente, ocultando-se automaticamente para produtos vendidos por peso ou tamanho fixo (como Tortas de 30cm e Vinagretes).
*   **Gerenciamento de Estado de UI:** Utilização de navegação por abas (`tabs`) para categorizar os produtos (Salgados Fritos, Doces, Tortas, etc.), permitindo que o cliente encontre o que deseja sem rolagem excessiva da página.
*   **Integração com WhatsApp:** Geração dinâmica de links de redirecionamento (`wa.me`) com mensagens pré-formatadas, reduzindo a barreira de entrada para o cliente iniciar o contato com o estabelecimento.
*   **Gestão de Expectativas do Cliente:** Inclusão estratégica de avisos sobre "quantidades mínimas por encomenda" na Hero Section, evitando pedidos fora do padrão e otimizando o atendimento da proprietária.
*   **Mobile-First:** Layout desenhado especificamente para a experiência mobile, considerando que a esmagadora maioria dos links comerciais hoje é acessada via smartphones.

## 🛠️ Tecnologias Utilizadas

*   **Next.js (App Router) & React:** Para uma interface reativa, navegação rápida e estrutura moderna de componentes.
*   **TypeScript:** Garantindo a tipagem estrita dos dados do cardápio (`MenuItem`, `MenuSection`), evitando erros de runtime durante a renderização condicional dos preços e descrições.
*   **Tailwind CSS:** Para estilização utilitária, garantindo um design system coeso e classes customizadas (ex: cores da marca) aplicadas de forma ágil e responsiva.
*   **Vercel:** Plataforma de CI/CD para deploy e hospedagem contínua.

## 👨‍💻 Por que este projeto está no meu portfólio?
Embora meu foco de atuação profissional envolva o desenvolvimento e a sustentação de regras de negócio robustas no backend, este projeto demonstra minha capacidade de atuar com autonomia no ecossistema frontend. Ele reflete minha visão de produto: entender a dor do cliente real, aplicar regras de negócio no lado do cliente e entregar um software focado em usabilidade, performance e conversão.

---
*Desenvolvido com dedicação por PeuBrazil*
