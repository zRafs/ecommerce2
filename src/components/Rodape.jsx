import React from 'react';

export function Rodape() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-brand">
            <span className="logo-badge">V</span>
            <span>Vitrine Alegre</span>
          </div>
          <p className="footer-sub">Projeto acadêmico · Ifes Campus de Alegre · TADS</p>
        </div>
        
        <div className="footer-right">
          <p>Dados: <strong>dummyjson.com</strong></p>
          <p className="footer-note">Imagens e produtos são fictícios</p>
        </div>
      </div>
    </footer>
  );
}