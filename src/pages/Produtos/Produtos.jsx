import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/produtos.css"; 

export default function Produtos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // 1. Tenta carregar do LocalStorage
    const dadosLocais = localStorage.getItem("marketplace_produtos");
    
    if (dadosLocais) {
      setProdutos(JSON.parse(dadosLocais));
    } else {
      // 2. Se não tiver nada salvo, usa dados de exemplo (Mock)
      const mockInicial = [
        { _id: 'mock1', nome: 'Soja em Grãos (Saca 60kg)', preco: 135.00, unidade: 'saca', imagemUrl: '' },
        { _id: 'mock2', nome: 'Tomate Orgânico', preco: 8.50, unidade: 'kg', imagemUrl: '' },
        { _id: 'mock3', nome: 'Bezerro Nelore', preco: 2200.00, unidade: 'un', imagemUrl: '' },
      ];
      setProdutos(mockInicial);
      // Opcional: Salvar o mock no storage para persistir edições futuras
      // localStorage.setItem("marketplace_produtos", JSON.stringify(mockInicial));
    }
  }, []);

  // Função auxiliar para limpar os produtos (útil para testes)
  const limparProdutos = () => {
    if(window.confirm("Deseja apagar todos os produtos cadastrados?")) {
      localStorage.removeItem("marketplace_produtos");
      window.location.reload();
    }
  };

  return (
    <div className="produtos-page">
      <div className="produtos-header">
        <h1 style={{ color: "#004E8A" }}>Marketplace Rural 🌱</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Botão extra para resetar testes */}
          <button 
            onClick={limparProdutos}
            style={{ padding: "10px", background: "#cc0000", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            Limpar Lista
          </button>

          <button 
            onClick={() => navigate("/anunciar")}
            className="btn-anunciar"
          >
            + Anunciar
          </button>
        </div>
      </div>

      <div className="produtos-grid">
        {produtos.map((produto) => (
          <div key={produto._id} className="produto-card">
            <div className="produto-img-wrapper">
              {produto.imagemUrl ? (
                <img src={produto.imagemUrl} alt={produto.nome} className="produto-img" />
              ) : (
                <span style={{ fontSize: "3rem" }}>🚜</span>
              )}
            </div>
            
            <div className="produto-info">
              <h3>{produto.nome}</h3>
              
              {/* Exibe Preço e Unidade juntos */}
              <p className="produto-preco">
                R$ {parseFloat(produto.preco).toFixed(2)} 
                <span style={{ fontSize: "0.8em", color: "#666", fontWeight: "normal" }}> / {produto.unidade}</span>
              </p>
              
              <Link 
                to={`/produto/${produto._id}`} 
                className="btn-detalhes"
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}