import React from "react";
import { Link, useNavigate } from "react-router-dom";
// 👇 Importa o Contexto
import { useCart } from "../../context/CartContext"; 
// import "../../styles/carrinho.css"; // Se tiver o CSS

export default function Carrinho() {
  const navigate = useNavigate();
  
  // 👇 Usa os dados e funções do contexto, não mais useState manual
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Calcula total
  const totalGeral = cartItems.reduce((acc, item) => acc + (Number(item.total) || 0), 0);

  const finalizarCompra = () => {
    alert("🎉 Pedido enviado para o produtor!");
    clearCart(); // Limpa usando o contexto
    navigate("/produtos");
  };

  const formatMoney = (valor) => Number(valor || 0).toFixed(2);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: "#004E8A", marginBottom: "20px" }}>🛒 Seu Carrinho</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <p>Seu carrinho está vazio.</p>
          <Link to="/produtos" style={{ display: 'inline-block', marginTop: '15px', background: '#004E8A', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
            Voltar para o Marketplace
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* LISTA */}
          <div style={{ flex: 2, minWidth: '300px' }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #e5e5e5', marginBottom: '15px', gap: '15px' }}>
                <div style={{ width: '70px', height: '70px', background: '#f4f4f4', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {item.imagemUrl ? <img src={item.imagemUrl} alt={item.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>📦</span>}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#333' }}>{item.nome}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                    {item.quantidade} {item.unidade} x R$ {formatMoney(item.precoUnitario)}
                  </p>
                </div>

                <div style={{ textAlign: 'right', fontWeight: 'bold', color: '#004E8A' }}>
                  <span>R$ {formatMoney(item.total)}</span>
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px', fontSize: '1.2rem', color: 'red' }}
                    title="Remover item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RESUMO */}
          <div style={{ flex: 1, minWidth: '280px', background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', height: 'fit-content' }}>
            <h2 style={{ marginTop: 0, color: '#004E8A', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>Resumo</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' }}>
              <span>Subtotal</span>
              <span>R$ {formatMoney(totalGeral)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #eee', fontWeight: 'bold', fontSize: '1.3rem', color: '#333', marginBottom: '25px' }}>
              <span>Total</span>
              <span>R$ {formatMoney(totalGeral)}</span>
            </div>
            
            <button onClick={finalizarCompra} style={{ width: '100%', padding: '15px', background: '#0fcf6b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '10px' }}>
              Finalizar Compra
            </button>
            <button onClick={() => navigate("/produtos")} style={{ width: '100%', padding: '12px', background: 'transparent', color: '#004E8A', border: '1px solid #004E8A', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Continuar Comprando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}