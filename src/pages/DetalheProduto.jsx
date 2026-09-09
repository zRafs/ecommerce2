import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { buscarProdutoPorId, listarProdutos, formatarPreco, COTACAO } from '../services/api';
import { useCarrinho } from '../context/CarrinhoContext';
import { Cabecalho } from '../components/Cabecalho';
import { CardProduto } from '../components/CardProduto';
import { Rodape } from '../components/Rodape';

export function DetalheProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adicionarProduto } = useCarrinho();
  const [produto, setProduto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [imagemSelecionada, setImagemSelecionada] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setQuantidade(1);
    
    buscarProdutoPorId(id)
      .then((data) => {
        setProduto(data);
        setImagemSelecionada(data.thumbnail);
        setCarregando(false);
        return listarProdutos({ categoria: data.category, limite: 5 });
      })
      .then((res) => {
        if (res && res.produtos) {
          setRelacionados(res.produtos.filter((p) => String(p.id) !== String(id)).slice(0, 4));
        }
      })
      .catch((err) => {
        setErro(err.message);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) return <div className="state-container"><p>Carregando detalhe do produto...</p></div>;
  if (erro || !produto) return (
    <div className="state-container">
      <h2>Produto não encontrado</h2>
      <button onClick={() => navigate('/')} className="add-btn btn-retry">Voltar para a vitrine</button>
    </div>
  );

  const precoFinalNum = (produto.price * (1 - (produto.discountPercentage || 0) / 100)) * COTACAO;
  const valorParcela = precoFinalNum / 12;
  const valorEconomizado = (produto.price * ((produto.discountPercentage || 0) / 100)) * COTACAO;

  return (
    <div className="app-container">
      <Cabecalho busca="" setBusca={() => {}} />

      <main className="main-content product-detail-container">
        {/* Barra de Navegação com Botão Voltar */}
        <div className="page-navigation-header">
          <button onClick={() => navigate(-1)} className="back-btn">
            ‹ Voltar
          </button>
          <nav className="breadcrumb">
            <Link to="/">Início</Link> › <span>{produto.category}</span> › <strong>{produto.title}</strong>
          </nav>
        </div>

        <div className="detail-card">
          <div className="gallery-section">
            <div className="main-image-box">
              <img src={imagemSelecionada} alt={produto.title} className="main-image" />
            </div>
            <div className="thumbnails-row">
              {produto.images?.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn ${imagemSelecionada === img ? 'active' : ''}`}
                  onClick={() => setImagemSelecionada(img)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="info-section">
            <span className="product-category">{produto.category}</span>
            <h1 className="detail-title">{produto.title}</h1>
            <p className="detail-meta">Marca: <strong>{produto.brand || 'N/A'}</strong> · SKU: {produto.sku || 'SMA-APP-IPH-121'}</p>

            <div className="detail-rating">
              <span className="stars">{'★'.repeat(Math.round(produto.rating))}{'☆'.repeat(5 - Math.round(produto.rating))}</span>
              <span>{produto.rating.toFixed(2).replace('.', ',')} · {produto.reviews?.length || 0} avaliações</span>
            </div>

            <div className="price-block">
              {produto.discountPercentage >= 5 && (
                <p className="save-tag">economize R$ {valorEconomizado.toFixed(2).replace('.', ',')}</p>
              )}
              <div className="price-row">
                <span className="detail-price">{formatarPreco(produto.price, produto.discountPercentage)}</span>
                {produto.discountPercentage >= 5 && (
                  <span className="discount-badge">-{Math.round(produto.discountPercentage)}%</span>
                )}
              </div>
              <p className="installments">em até 12x de R$ {valorParcela.toFixed(2).replace('.', ',')} sem juros</p>
              <p className="stock-info">🟢 <strong>{produto.stock} em estoque</strong> · In Stock</p>
            </div>

            <div className="buy-controls">
              <div className="quantity-selector">
                <button onClick={() => setQuantidade((q) => Math.max(1, q - 1))}>-</button>
                <span>{quantidade}</span>
                <button onClick={() => setQuantidade((q) => q + 1)}>+</button>
              </div>
              <button className="add-btn lg" onClick={() => adicionarProduto(produto, quantidade)}>
                Adicionar ao carrinho
              </button>
            </div>

            <div className="guarantees-grid">
              <div className="guarantee-item">
                <span>ENVIO</span>
                <strong>{produto.shippingInformation || 'Ships in 1 month'}</strong>
              </div>
              <div className="guarantee-item">
                <span>GARANTIA</span>
                <strong>{produto.warrantyInformation || 'Lifetime warranty'}</strong>
              </div>
              <div className="guarantee-item">
                <span>DEVOLUÇÃO</span>
                <strong>{produto.returnPolicy || '60 days return policy'}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="specs-description-grid">
          <div className="detail-box">
            <h2>Descrição</h2>
            <p>{produto.description}</p>
            <div className="tags-container">
              {produto.tags?.map((tag) => (
                <span key={tag} className="tag-item">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="detail-box">
            <h2>Especificações</h2>
            <table className="specs-table">
              <tbody>
                <tr><td>Peso</td><td><strong>{produto.weight || 2} kg</strong></td></tr>
                <tr><td>Dimensões</td><td><strong>{produto.dimensions?.width || 5.29} x {produto.dimensions?.height || 18.38} x {produto.dimensions?.depth || 17.72} cm</strong></td></tr>
                <tr><td>Estoque</td><td><strong>{produto.stock} unidades</strong></td></tr>
                <tr><td>Pedido mínimo</td><td><strong>{produto.minimumOrderQuantity || 1} unidades</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Avaliações ({produto.reviews?.length || 0})</h2>
          <div className="reviews-grid">
            {produto.reviews?.map((rev, idx) => (
              <div key={idx} className="review-card">
                <div className="review-header">
                  <div className="avatar">{rev.reviewerName?.charAt(0) || 'U'}</div>
                  <div>
                    <strong>{rev.reviewerName}</strong>
                    <div className="stars">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</div>
                  </div>
                  <span className="review-date">{new Date(rev.date || Date.now()).toLocaleDateString('pt-BR')}</span>
                </div>
                <p className="review-comment">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {relacionados.length > 0 && (
          <section className="related-section">
            <h2>Produtos Relacionados</h2>
            <div className="product-grid">
              {relacionados.map((item) => (
                <CardProduto key={item.id} produto={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Rodape />
    </div>
  );
}