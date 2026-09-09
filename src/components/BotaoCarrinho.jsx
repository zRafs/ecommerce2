import React from 'react';
import { useCarrinho } from '../context/CarrinhoContext';

export function BotaoCarrinho() {
  const { totalItens } = useCarrinho();

  return (
    <button className="cart-button">
      {/* Ícone SVG do Carrinho de Compras do Mockup */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cart-icon"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      <span className="cart-text">Carrinho</span>

      {/* Selo verde/amarelo (#A6CE39) com a quantidade acumulada */}
      <span className="cart-badge">{totalItens}</span>
    </button>
  );
}