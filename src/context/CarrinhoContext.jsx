import React, { createContext, useContext, useState, useEffect } from 'react';
import { COTACAO } from '../services/api';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    const salvos = localStorage.getItem('vitrine_carrinho');
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('vitrine_carrinho', JSON.stringify(itens));
  }, [itens]);

  const adicionarProduto = (produto, quantidade = 1) => {
    setItens((itensAtuais) => {
      const index = itensAtuais.findIndex((item) => item.id === produto.id);

      if (index >= 0) {
        // Retorna um NOVO array imutável sem alterar a referência direta do objeto anterior
        return itensAtuais.map((item, i) =>
          i === index
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }

      return [...itensAtuais, { ...produto, quantidade }];
    });
  };

  const removerProduto = (id) => {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  };

  const atualizarQuantidade = (id, quantidade) => {
    if (quantidade <= 0) {
      removerProduto(id);
      return;
    }
    setItens((itensAtuais) =>
      itensAtuais.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  };

  // Totais derivados da lista de itens
  const subtotalEmDolar = itens.reduce((acc, item) => acc + item.price * item.quantidade, 0);
  const totalDescontoEmDolar = itens.reduce((acc, item) => {
    const descUnitario = item.discountPercentage ? (item.price * item.discountPercentage) / 100 : 0;
    return acc + descUnitario * item.quantidade;
  }, 0);

  const subtotal = subtotalEmDolar * COTACAO;
  const descontoTotal = totalDescontoEmDolar * COTACAO;
  const total = subtotal - descontoTotal;
  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarProduto,
        removerProduto,
        atualizarQuantidade,
        subtotal,
        descontoTotal,
        total,
        totalItens
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}