# Registro de Prompts - Vitrine Alegre

Este documento registra os principais prompts utilizados no desenvolvimento da aplicação de e-commerce Vitrine Alegre.

### Prompt 1: Camada de Serviços e API
"Você é um desenvolvedor React sênior. Crie a camada de serviços em src/services/api.js para consumir a API DummyJSON (https://dummyjson.com/products). O serviço deve conter a constante COTACAO = 5.20 para converter valores USD em BRL, função de formatação com Intl.NumberFormat('pt-BR'), busca por termo, filtro por categoria, ordenação por preço/relevância e paginação dinâmica utilizando skip e limit."

### Prompt 2: Contexto Global do Carrinho de Compras
"Crie o gerenciador de estado global em src/context/CarrinhoContext.jsx usando a Context API do React. O contexto deve armazenar a lista de itens com persistência inicializada via localStorage ('vitrine_carrinho'). Deve expor as funções adicionarProduto, removerProduto e atualizarQuantidade. Calcule os valores derivados (subtotal, descontoTotal, total e totalItens) dinamicamente na renderização, garantindo imutabilidade estrita no estado."

### Prompt 3: Componentes de Vitrine, Filtros e Cartão
"Crie o componente CardProduto.jsx e a barra de filtros FiltroCategorias.jsx. O cartão deve exibir o selo de desconto somente para valores >= 5%, preço riscado, nota com estrelas e valor numérico, e botão de adição direta ao carrinho. O filtro de categorias deve apresentar pílulas estilizadas com a opção 'Todas' e o indicador de categorias restantes (+16) conforme os mockups do projeto."

### Prompt 4: Esqueleto de Carregamento (Skeleton Card)
"Crie o componente SkeletonCard.jsx e adicione ao App.css as regras necessárias com animação de gradiente em CSS (@keyframes shimmer) para simular o efeito de carregamento fluido da grade de produtos enquanto a API responde."

### Prompt 5: Fidelidade Visuais ao Mockup e Responsividade
"Ajuste o cabeçalho e a barra de navegação para que o conteúdo fique restrito a 1200px centralizados. Estilize o botão do carrinho com fundo escuro (#171C42), ícone SVG, texto 'Carrinho' e selo verde (#A6CE39) posicionado à esquerda. Implemente a barra inferior fixa para o carrinho em telas mobile (360px)."