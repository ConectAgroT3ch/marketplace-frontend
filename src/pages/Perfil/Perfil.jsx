import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'; // Se não tiver essa lib instalada, instale com: npm install react-hook-form
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
// import '@/styles/perfil.css'; // Crie esse arquivo ou comente essa linha se não tiver estilos ainda

export default function Perfil() {
  const navigate = useNavigate();
  // Simulação de usuário logado (pega do localStorage ou cria um fake)
  const user = JSON.parse(localStorage.getItem('user')) || { id: 1, nome: "Usuário Teste", email: "teste@email.com" };

  const [pontos, setPontos] = useState(0);
  const [recompensa, setRecompensa] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [carregandoStripe, setCarregandoStripe] = useState(false);
  const [mostrarModalUpgrade, setMostrarModalUpgrade] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: { nome: '', email: '' }
  });

  useEffect(() => {
    // Carregar dados iniciais nos inputs
    if (user) {
      setValue('nome', user.nome || '');
      setValue('email', user.email || '');
    }

    // Mock de dados para não quebrar a tela
    setPedidos([
      { id: '101', data: '12/03/2025', total: 150.00 },
      { id: '102', data: '20/03/2025', total: 89.90 },
    ]);
    setPontos(120);
    setRecompensa('Frete Grátis');

  }, [user, setValue]);

  const onSubmit = async (data) => {
    alert(`Perfil salvo! Nome: ${data.nome}`);
    // Aqui você chamaria api.put('/usuarios/me', data);
  };

  const handleAssinarPremium = () => {
    alert("Redirecionando para pagamento...");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Meu Perfil</h2>
      
      <div style={{ background: '#e0f2f1', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🎁 Minhas Recompensas</h3>
        <p><strong>Pontos:</strong> {pontos} | <strong>Próximo nível:</strong> {recompensa}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Nome:</label>
        <input
          {...register('nome', { required: 'Nome é obrigatório' })}
          style={{ padding: '8px' }}
        />
        
        <label>E-mail:</label>
        <input
          {...register('email', { required: 'E-mail é obrigatório' })}
          style={{ padding: '8px' }}
        />

        <button type="submit" style={{ padding: '10px', background: '#004E8A', color: 'white', border: 'none', cursor: 'pointer' }}>
          Salvar Alterações
        </button>
      </form>

      <div style={{ marginTop: '30px' }}>
        <h3>📦 Histórico de Pedidos</h3>
        {pedidos.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
            Pedido #{p.id} - R$ {p.total.toFixed(2)} - {p.data}
          </div>
        ))}
      </div>
    </div>
  );
}