import React from 'react';
import { CardProduto } from './CardProduto';

export function ListaProdutos({ produtos }) {
  return (
    <div className="product-grid">
      {produtos.map((produto) => (
        <CardProduto key={produto.id} produto={produto} />
      ))}
    </div>
  );
}