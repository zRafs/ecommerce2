const BASE_URL = 'https://dummyjson.com';
export const COTACAO = 5.20;

export function formatarPreco(valorEmDolar, desconto = 0) {
  const precoComDesconto = valorEmDolar * (1 - desconto / 100);
  const precoEmReal = precoComDesconto * COTACAO;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(precoEmReal);
}

export async function listarProdutos({ pagina = 1, busca = '', categoria = '', ordenacao = '', limite = 12 }) {
  const skip = (pagina - 1) * limite;
  let url = `${BASE_URL}/products`;

  if (busca) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(busca)}&limit=${limite}&skip=${skip}`;
  } else if (categoria && categoria !== 'Todas') {
    url = `${BASE_URL}/products/category/${encodeURIComponent(categoria)}?limit=${limite}&skip=${skip}`;
  } else {
    url = `${BASE_URL}/products?limit=${limite}&skip=${skip}`;
  }

  if (ordenacao && ordenacao !== 'relevancia') {
    const separator = url.includes('?') ? '&' : '?';
    if (ordenacao === 'preco-asc') {
      url += `${separator}sortBy=price&order=asc`;
    } else if (ordenacao === 'preco-desc') {
      url += `${separator}sortBy=price&order=desc`;
    }
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('Não foi possível carregar os produtos.');

  const data = await response.json();
  return {
    produtos: data.products,
    total: data.total,
    skip: data.skip,
    limite: data.limit
  };
}

export async function buscarProdutoPorId(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Produto não encontrado.');
  return await response.json();
}

export async function listarCategorias() {
  const response = await fetch(`${BASE_URL}/products/category-list`);
  if (!response.ok) throw new Error('Não foi possível carregar as categorias.');
  return await response.json();
}