import React from 'react';
import { Link } from 'react-router-dom';
import { CampoBusca } from './CampoBusca';
import { BotaoCarrinho } from './BotaoCarrinho';

export function Cabecalho({ busca, setBusca }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <div className="logo">
            <span className="logo-badge">V</span>
            <span>Vitrine Alegre</span>
          </div>
        </Link>

        <CampoBusca busca={busca} setBusca={setBusca} />

        <div className="header-actions">
          <span className="login-link">Entrar</span>
          <Link to="/carrinho" className="cart-link">
            <BotaoCarrinho />
          </Link>
        </div>
      </div>
    </header>
  );
}