import React from 'react';
import { Link } from 'react-router-dom';
import { formatarPreco } from '../services/api';
import { useCarrinho } from '../context/CarrinhoContext';

export function CardProduto({ produto }) {
  const { adicionarProduto } = useCarrinho();
  const temDesconto = produto.discountPercentage >= 5;

  return (
    <div className="product-card">
      {temDesconto && (
        <span className="discount-badge">
          -{Math.round(produto.discountPercentage)}%
        </span>
      )}

      <Link to={`/produtos/${produto.id}`} className="product-link">
        <div className="product-image-container">
          <img src={produto.thumbnail} alt={produto.title} className="product-image" />
        </div>
        <span className="product-category">{produto.category}</span>
        <h3 className="product-title">{produto.title}</h3>
        
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.round(produto.rating))}{'☆'.repeat(5 - Math.round(produto.rating))}</span>
          <span className="rating-score">{produto.rating.toFixed(2).replace('.', ',')}</span>
        </div>

        <div className="price-container">
          {temDesconto && (
            <span className="old-price">{formatarPreco(produto.price, 0)}</span>
          )}
          <p className="product-price">
            {formatarPreco(produto.price, produto.discountPercentage)}
          </p>
        </div>
      </Link>

      <button onClick={() => adicionarProduto(produto)} className="add-btn">
        Adicionar
      </button>
    </div>
  );
}