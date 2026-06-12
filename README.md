🎨 Van Gogh Univers

“A arte é o caminho mais curto entre o homem e ele mesmo.” — Van Gogh
Uma imersão interativa na vida, na obra e no universo emocional de Vincent van Gogh — unindo tecnologia, design e emoção.

📖 Visão Geral

Van Gogh Univers é uma plataforma interativa e imersiva desenvolvida em Next.js 15 / React 18, combinando arte e tecnologia em uma experiência única de exploração 3D.
Inspirada na genialidade de Van Gogh, a aplicação oferece uma jornada visual pelas suas obras, com animações dinâmicas, ambiente tridimensional, transições suaves e uma curadoria artística envolvente.

Este projeto foi concebido para unir performance, acessibilidade e estética, respeitando a obra de Van Gogh enquanto a reinterpreta através da lente da engenharia moderna.

🧩 Principais Funcionalidades
Categoria	Descrição
🖼️ Galeria Dinâmica	Exibição inteligente das pinturas, com filtros, paginação, busca e ordenação por nome ou data.
🌌 Ambiente 3D Imersivo	Cena interativa construída com React Three Fiber e Drei, permitindo explorar o modelo 3D de Van Gogh em rotação completa no eixo X.
🎭 Página de Detalhes	Cada pintura possui uma página dedicada, com informações históricas, dimensões, técnica, cores predominantes e curiosidades.
⚙️ Animações Suaves	Transições refinadas com Framer Motion, criando uma sensação fluida e cinematográfica.
🌙 Modo Escuro Dinâmico	Estilo adaptativo inspirado nas paletas vibrantes e contrastes do pós-impressionismo.
🧠 Acessibilidade e UX	ARIA labels, navegação por teclado e hierarquia semântica completa.
🧪 Testes Automatizados	Estrutura de testes com Jest e Testing Library, cobrindo componentes críticos e fluxo de navegação.
⚙️ Tecnologias Utilizadas
Stack	Ferramentas e bibliotecas principais
Frontend	Next.js 15 · React 18 · TypeScript · TailwindCSS · Shadcn/UI
Animações e 3D	Framer Motion · React-Three-Fiber · @react-three/drei · Three.js
Estado e Lógica	Zustand · Context API · Apollo Client · GraphQL
Backend (API)	Apollo Server · Express · Prisma · PostgreSQL
Testes	Jest · @testing-library/react
Infra e DevTools	Bun · ESLint · Prettier · Husky · lint-staged
🏗️ Arquitetura do Projeto
src/
├── app/
│   ├── about/               → Página “Sobre o Van Gogh Univers”
│   ├── gallery/             → Galeria principal de pinturas
│   ├── paintings/[id]/      → Página dinâmica de detalhes
│   ├── error.tsx            → Página de erro customizada
│   ├── not-found.tsx        → Página 404 artística
│   └── layout.tsx           → Layout global com transições animadas
│
├── components/
│   ├── ui/                  → Componentes base do Shadcn/UI
│   ├── painting/            → Cards, paletas e controles interativos
│   └── three/               → Cena 3D, modelo Van Gogh e loaders
│
├── hooks/                   → Hooks personalizados (usePaintings, use3DControls, etc.)
├── lib/                     → Configurações, animações e constantes globais
├── types/                   → Tipagens TypeScript compartilhadas
├── tests/                   → Testes unitários organizados por módulo
└── public/
    ├── models/              → Modelos GLTF
    └── textures/            → Texturas HDR e imagens otimizadas

🚀 Instalação e Execução
Pré-requisitos

Node.js >= 20 ou Bun

npm, pnpm ou bun como gerenciador de pacotes

Instalar dependências
bun install

Executar em modo desenvolvimento
bun dev

Gerar build de produção
bun run build

Rodar testes
bun run test

🔍 Boas Práticas Adotadas

Arquitetura modular e escalável, com separação clara entre UI, lógica e dados.

Performance-first design: uso de Suspense, lazy loading e dynamic imports.

Imagens otimizadas via next/image com blurDataURL.

Acessibilidade (WCAG 2.1): foco visível, ARIA roles e contraste de cor.

SEO otimizado: metadados dinâmicos, Open Graph e estrutura semântica.

CI/CD ready: scripts automatizados de lint, build e testes.

✨ Detalhes Artísticos

Cada página e transição foi projetada com base em princípios visuais de Van Gogh:

Movimento constante (Framer Motion) evocando o ritmo de suas pinceladas.

Paleta cromática viva, contrastando amarelos solares e azuis noturnos.

Ambiente 3D simbólico, representando o artista como figura etérea em meio ao seu próprio universo.

🧪 Testes Implementados

Renderização de componentes de UI com @testing-library/react

Testes de hooks e comportamento de estado com mocks

Validação de rotas dinâmicas (/paintings/[id])

Simulação de falhas e mensagens de erro

Cobertura automatizada via jest --coverage

📜 Contribuindo

Contribuições são bem-vindas!

Faça um fork do repositório

Crie sua branch de feature:

git checkout -b feat/nome-da-feature


Envie suas alterações:

git commit -m "feat: descrição clara da mudança"
git push origin feat/nome-da-feature


Abra um Pull Request usando o modelo padrão do projeto.

🗂️ Licença

Este projeto está licenciado sob a MIT License — sinta-se livre para estudar, modificar e compartilhar.
Créditos artísticos: obras originais de Vincent van Gogh, domínio público (Wikimedia Commons).

🌟 Agradecimentos

À genialidade de Vincent van Gogh, por inspirar a fusão entre arte e código.

À comunidade open-source, pela base sólida de conhecimento e ferramentas.

E a todos que acreditam que tecnologia também é arte.

🧩 Resumo

Van Gogh Univers é mais que um site — é uma homenagem técnica e emocional ao artista que transformou dor em beleza.
Cada linha de código foi escrita com o mesmo propósito que guiou o pincel de Van Gogh: dar vida à luz.