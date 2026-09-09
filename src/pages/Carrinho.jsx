import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import { Cabecalho } from '../components/Cabecalho';
import { Rodape } from '../components/Rodape';
import { formatarPreco } from '../services/api';

export function Carrinho() {
  const navigate = useNavigate();
  const { itens, removerProduto, atualizarQuantidade, subtotal, descontoTotal, total, totalItens } = useCarrinho();

  if (itens.length === 0) {
    return (
      <div className="app-container">
        <Cabecalho busca="" setBusca={() => {}} />
        <main className="main-content state-container">
          <div className="cart-empty-icon">🛒</div>
          <h2>Seu carrinho está vazio</h2>
          <p>Escolha um produto na vitrine para começar.</p>
          <button onClick={() => navigate('/')} className="add-btn btn-retry">
            Ir para a vitrine
          </button>
        </main>
        <Rodape />
      </div>
    );
  }

  const valorParcela = total / 12;

  return (
    <div className="app-container">
      <Cabecalho busca="" setBusca={() => {}} />

      <main className="main-content cart-page">
        <div className="cart-header-row">
          <div>
            <button onClick={() => navigate(-1)} className="back-btn margin-bottom">
              ‹ Voltar
            </button>
            <h1>Seu carrinho</h1>
            <p className="cart-subtitle">{itens.length} produtos · {totalItens} unidades</p>
          </div>
          <Link to="/" className="continue-link">Continuar comprando ›</Link>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {itens.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="item-thumb" />
                <div className="item-info">
                  <span className="product-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p className="item-unit-price">{formatarPreco(item.price, item.discountPercentage)} cada</p>
                </div>

                <div className="quantity-selector">
                  <button onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}>-</button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}>+</button>
                </div>

                <div className="item-subtotal">
                  <span>{formatarPreco(item.price * item.quantidade, item.discountPercentage)}</span>
                </div>

                <button onClick={() => removerProduto(item.id)} className="remove-btn" title="Remover item">✕</button>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h2>Resumo do pedido</h2>
            <div className="summary-row">
              <span>Subtotal ({totalItens} itens)</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="summary-row discount">
              <span>Descontos</span>
              <span>- R$ {descontoTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="summary-row free-shipping">
              <span>Frete</span>
              <span className="free-tag">Grátis</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total</span>
              <div className="total-block">
                <h3>R$ {total.toFixed(2).replace('.', ',')}</h3>
                <p className="installments">em 12x de R$ {valorParcela.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>

            <button className="add-btn lg full">Finalizar compra</button>
          </div>
        </div>
      </main>

      <div className="mobile-cart-bar">
        <div>
          <span className="mobile-cart-count">Total ({totalItens} itens)</span>
          <strong className="mobile-cart-price">R$ {total.toFixed(2).replace('.', ',')}</strong>
        </div>
        <button className="add-btn">Finalizar compra</button>
      </div>

      <Rodape />
    </div>
  );
}