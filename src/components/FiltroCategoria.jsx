import React from 'react';

export function FiltroCategorias({ categorias, categoriaAtiva, setCategoriaAtiva }) {
  return (
    <nav className="category-nav">
      <div className="category-nav-content">
        <button
          onClick={() => setCategoriaAtiva('Todas')}
          className={`category-btn ${categoriaAtiva === 'Todas' ? 'active' : ''}`}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={`category-btn ${categoriaAtiva === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </nav>
  );
}