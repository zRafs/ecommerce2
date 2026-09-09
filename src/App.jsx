import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarrinhoProvider } from './context/CarrinhoContext';
import { Vitrine } from './pages/Vitrine';
import { DetalheProduto } from './pages/DetalheProduto';
import { Carrinho } from './pages/Carrinho';
import './App.css';

export default function App() {
  return (
    <CarrinhoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vitrine />} />
          <Route path="/produtos/:id" element={<DetalheProduto />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="*" element={<Vitrine />} />
        </Routes>
      </BrowserRouter>
    </CarrinhoProvider>
  );
}