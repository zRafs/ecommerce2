# Diário da IA - Vitrine Alegre

Registro de diagnósticos e correções realizados ao longo do desenvolvimento do projeto.

### Erro 1: Tentativa de mapear a resposta direta da API
- Onde: src/services/api.js / Vitrine.jsx
- O que a IA fez: Tentou aplicar o método .map() diretamente no objeto retornado pela requisição fetch.
- Diagnóstico: A API DummyJSON devolve um objeto raiz com metadados e a lista real de produtos fica aninhada sob a propriedade .products.
- Correção: Ajustada a desestruturação dos dados para extrair data.products.

### Erro 2: Imagens da vitrine com caminho quebrado
- Onde: src/components/CardProduto.jsx
- O que a IA fez: Utilizou o campo produto.image na tag <img> da vitrine.
- Diagnóstico: As imagens na grade de produtos não carregavam porque o atributo retornado no objeto da API DummyJSON para a capa principal chama-se thumbnail.
- Correção: Alterado o atributo da imagem para src={produto.thumbnail}.

### Erro 3: Duplicação de quantidade ao adicionar produtos ao carrinho
- Onde: src/context/CarrinhoContext.jsx
- O que a IA fez: Mutou diretamente a propriedade quantidade do objeto dentro do array antes de chamar o setState.
- Diagnóstico: Em ambiente de desenvolvimento, o React StrictMode executa as funções de atualização de estado duas vezes para verificar efeitos colaterais. Como a mutação alterava a referência direta do array, cada clique somava +2 itens ao carrinho.
- Correção: Reescreveu-se a função de adição utilizando uma abordagem puramente imutável com .map().

### Erro 4: Falha na importação do React Router DOM
- Onde: src/App.jsx
- O que a IA fez: Gerou as rotas utilizando BrowserRouter, Routes e Route sem incluir o pacote nas dependências.
- Diagnóstico: O bundler Vite apresentou erro de resolução de módulo indicando que a biblioteca react-router-dom não estava instalada.
- Correção: Executado o comando npm install react-router-dom no terminal.

### Erro 5: Quebra de layout por chave não fechada no CSS
- Onde: src/App.css
- O que a IA fez: Inseriu novas regras de CSS no final do arquivo sem fechar a chave da regra de media query @media (max-width: 768px).
- Diagnóstico: O compilador de CSS parou de interpretar todas as regras declaradas abaixo do ponto corrompido, desformatando botões e o seletor de quantidade no carrinho.
- Correção: Estruturado e fechado corretamente todos os blocos do CSS e agrupadas as media queries ao final do arquivo.