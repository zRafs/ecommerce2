import React from 'react';

export function Paginacao({ paginaAtual, totalPaginas, aoMudarPagina }) {
  if (totalPaginas <= 1) return null;

  const renderPaginas = () => {
    const paginas = [];
    
    // Botão Anterior
    paginas.push(
      <button
        key="prev"
        disabled={paginaAtual === 1}
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        className="page-btn nav-btn"
      >
        ‹
      </button>
    );

    // Primeira Página
    paginas.push(
      <button
        key={1}
        onClick={() => aoMudarPagina(1)}
        className={`page-btn ${paginaAtual === 1 ? 'active' : ''}`}
      >
        1
      </button>
    );

    // Reticências Esquerda
    if (paginaAtual > 3) {
      paginas.push(<span key="dots1" className="page-dots">...</span>);
    }

    // Páginas Intermediárias
    for (let i = Math.max(2, paginaAtual - 1); i <= Math.min(totalPaginas - 1, paginaAtual + 1); i++) {
      if (i > 1 && i < totalPaginas) {
        paginas.push(
          <button
            key={i}
            onClick={() => aoMudarPagina(i)}
            className={`page-btn ${paginaAtual === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }
    }

    // Reticências Direita
    if (paginaAtual < totalPaginas - 2) {
      paginas.push(<span key="dots2" className="page-dots">...</span>);
    }

    // Última Página
    if (totalPaginas > 1) {
      paginas.push(
        <button
          key={totalPaginas}
          onClick={() => aoMudarPagina(totalPaginas)}
          className={`page-btn ${paginaAtual === totalPaginas ? 'active' : ''}`}
        >
          {totalPaginas}
        </button>
      );
    }

    // Botão Próximo
    paginas.push(
      <button
        key="next"
        disabled={paginaAtual === totalPaginas}
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        className="page-btn nav-btn"
      >
        ›
      </button>
    );

    return paginas;
  };

  return <div className="pagination-container">{renderPaginas()}</div>;
}