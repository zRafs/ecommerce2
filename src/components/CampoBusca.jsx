import React from 'react';

export function CampoBusca({ busca, setBusca }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar produtos..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
    </div>
  );
}