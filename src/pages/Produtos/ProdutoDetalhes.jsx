import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 👇 IMPORTANTE: Importar o Contexto (Verifique se sua pasta é context ou contexts)
import { useCart } from "../../context/CartContext"; 
// import "../../styles/produtos.css"; // Se tiver o CSS

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 👇 Pegar a função do Contexto
  const { addToCart } = useCart(); 
  
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Busca produto (Mock ou LocalStorage para exibir dados)
    const produtosSalvos = JSON.parse(localStorage.getItem("marketplace_produtos")) || [];
    const produtoEncontrado = produtosSalvos.find(p => p._id === id);

    if (produtoEncontrado) {
      setProduto(produtoEncontrado);
      setTotal(produtoEncontrado.preco);
    } else {
      // Mock caso não ache (para não quebrar a tela de teste)
      setProduto({
        _id: id || "mock",
        nome: "Produto Teste",
        preco: 50.00,
        unidade: "un",
        descricao: "Descrição teste.",
        vendedor: "Vendedor Teste",
        imagemUrl: ""
      });
      setTotal(50.00);
    }
  }, [id]);

  useEffect(() => {
    if (produto) {
      setTotal(produto.preco * quantidade);
    }
  }, [quantidade, produto]);

  const handleAdicionarAoCarrinho = () => {
    const itemCarrinho = {
      _id: Date.now().toString(),
      produtoId: produto._id,
      nome: produto.nome,
      precoUnitario: produto.preco,
      unidade: produto.unidade,
      quantidade: quantidade,
      total: total,
      imagemUrl: produto.imagemUrl
    };

    // 👇 AQUI ESTÁ O SEGREDO: Usar a função do contexto!
    addToCart(itemCarrinho);
    
    // Feedback rápido
    if(confirm("✅ Adicionado! Ir para o carrinho?")) {
        navigate("/carrinho");
    }
  };

  if (!produto) return <p style={{textAlign:"center", marginTop: 50}}>Carregando...</p>;

  return (
    <div className="produtos-page" style={{padding: 20}}>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        
        {/* Imagem */}
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ width: '100%', height: '300px', background: '#f4f4f4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {produto.imagemUrl ? (
              <img src={produto.imagemUrl} alt={produto.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '4rem' }}>📦</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: '1 1 300px' }}>
          <button onClick={() => navigate("/produtos")} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '10px' }}>← Voltar</button>
          
          <h1 style={{ color: '#004E8A', marginBottom: '5px' }}>{produto.nome}</h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>Vendido por: <strong>{produto.vendedor || "Produtor Local"}</strong></p>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', border: '1px solid #e9ecef' }}>
            <h2 style={{ color: '#00995d', margin: '0 0 10px 0' }}>
              R$ {produto.preco?.toFixed(2)} <span style={{fontSize: '0.9rem', color:'#555', fontWeight:'normal'}}>/ {produto.unidade}</span>
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Quantidade:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="number" 
                  value={quantidade}
                  onChange={(e) => setQuantidade(Math.max(0.1, parseFloat(e.target.value)))}
                  step="0.1"
                  style={{ padding: '10px', width: '100px', borderRadius: '6px', border: '1px solid #ccc', textAlign: 'center' }}
                />
                <span style={{ fontWeight: 'bold' }}>{produto.unidade}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #ccc', paddingTop: '15px', marginBottom: '20px' }}>
              <span style={{ fontWeight: 'bold' }}>Total:</span>
              <span style={{ color: '#004E8A', fontWeight: 'bold', fontSize: '1.5rem' }}>R$ {total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleAdicionarAoCarrinho}
              style={{ width: '100%', padding: '15px', background: "#0fcf6b", color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🛒 Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}