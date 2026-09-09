import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listarProdutos, listarCategorias } from '../services/api';
import { Cabecalho } from '../components/Cabecalho';
import { FiltroCategorias } from '../components/FiltroCategoria';
import { ListaProdutos } from '../components/ListaProdutos';
import { SkeletonCard } from '../components/SkeletonCard';
import { Paginacao } from '../components/Paginacao';
import { Rodape } from '../components/Rodape';

export function Vitrine() {
  const [searchParams, setSearchParams] = useSearchParams();

  const buscaURL = searchParams.get('busca') || '';
  const categoriaURL = searchParams.get('categoria') || 'Todas';
  const ordenacaoURL = searchParams.get('ordenacao') || 'relevancia';
  const paginaURL = parseInt(searchParams.get('pagina') || '1', 10);

  const [busca, setBusca] = useState(buscaURL);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    listarCategorias()
      .then(setCategorias)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (busca !== buscaURL) {
        setSearchParams({ busca, categoria: categoriaURL, ordenacao: ordenacaoURL, pagina: '1' });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [busca]);

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    setErro(null);

    listarProdutos({ pagina: paginaURL, busca: buscaURL, categoria: categoriaURL, ordenacao: ordenacaoURL })
      .then((data) => {
        if (!cancelado) {
          setProdutos(data.produtos);
          setTotalProdutos(data.total);
          setCarregando(false);
        }
      })
      .catch((err) => {
        if (!cancelado) {
          setErro(err.message);
          setCarregando(false);
        }
      });

    return () => { cancelado = true; };
  }, [buscaURL, categoriaURL, ordenacaoURL, paginaURL]);

  const totalPaginas = Math.ceil(totalProdutos / 12);

  const handleOrdenacao = (e) => {
    setSearchParams({ busca: buscaURL, categoria: categoriaURL, ordenacao: e.target.value, pagina: '1' });
  };

  return (
    <div className="app-container">
      <Cabecalho busca={busca} setBusca={setBusca} />
      
      <div className="filter-bar">
  <div className="filter-bar-content">
    <FiltroCategorias
      categorias={categorias}
      categoriaAtiva={categoriaURL}
      setCategoriaAtiva={(cat) => setSearchParams({ busca: buscaURL, categoria: cat, ordenacao: ordenacaoURL, pagina: '1' })}
    />
    <div className="sort-container">
      <label htmlFor="sort">Ordenar:</label>
      <select id="sort" value={ordenacaoURL} onChange={handleOrdenacao} className="sort-select">
        <option value="relevancia">Relevância</option>
        <option value="preco-asc">Menor Preço</option>
        <option value="preco-desc">Maior Preço</option>
      </select>
    </div>
  </div>
</div>

      <main className="main-content">
        {erro && !carregando && (
          <div className="state-container">
            <div className="error-icon">!</div>
            <h2>Não foi possível carregar os produtos</h2>
            <p>Verifique sua conexão e tente de novo.</p>
            <button className="add-btn btn-retry" onClick={() => window.location.reload()}>Tentar novamente</button>
          </div>
        )}

        {carregando && (
          <div className="product-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!carregando && !erro && produtos.length === 0 && (
          <div className="state-container">
            <div className="search-empty-icon">🔍</div>
            <h2>Nenhum produto encontrado</h2>
            <p>Tente outro termo ou limpe os filtros.</p>
            <button className="add-btn btn-retry" onClick={() => setSearchParams({})}>Limpar busca</button>
          </div>
        )}

        {!carregando && !erro && produtos.length > 0 && (
          <>
            <p className="product-count">
              {totalProdutos} produtos · página {paginaURL} de {totalPaginas || 1}
            </p>
            <ListaProdutos produtos={produtos} />
            <Paginacao
              paginaAtual={paginaURL}
              totalPaginas={totalPaginas}
              aoMudarPagina={(p) => setSearchParams({ busca: buscaURL, categoria: categoriaURL, ordenacao: ordenacaoURL, pagina: String(p) })}
            />
          </>
        )}
      </main>

      <Rodape />
    </div>
  );
}