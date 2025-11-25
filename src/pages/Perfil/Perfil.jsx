import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import ModalUpgrade from '@/components/ModalUpgrade';
import '@/styles/perfil.css';

type PerfilForm = {
  nome: string;
  email: string;
};

type Pedido = {
  id: string;
  data: string;
  total: number;
};

export default function Perfil() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pontos, setPontos] = useState(0);
  const [recompensa, setRecompensa] = useState('');
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregandoStripe, setCarregandoStripe] = useState(false);
  const [mostrarModalUpgrade, setMostrarModalUpgrade] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<PerfilForm>({
    defaultValues: { nome: '', email: '' }
  });

  if (!user) {
    return <ModalUpgrade modo="login" onClose={() => navigate('/consumidor')} />;
  }

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await api.get('/usuarios/me');
        const usuario = res.data;
        setValue('nome', usuario.nome);
        setValue('email', usuario.email);
      } catch (err) {
        console.error('Erro ao obter usuário:', err);
        alert('Erro ao carregar perfil.');
      }
    };

    const fetchPedidos = async () => {
      try {
        const res = await api.get('/pedidos/my-orders');
        setPedidos(res.data);
      } catch (err) {
        console.error('Erro ao obter pedidos:', err);
      }
    };

    const fetchGamificacao = async () => {
      try {
        const res = await api.get('/gamificacao');
        setPontos(res.data.pontos);
        setRecompensa(res.data.recompensa);
      } catch (err) {
        console.error('Erro ao obter gamificação:', err);
      }
    };

    const status = new URLSearchParams(window.location.search).get('status');
    if (status === 'sucesso') {
      alert('✅ Pagamento confirmado! Seu plano agora é premium.');
    }

    fetchPerfil();
    fetchPedidos();
    fetchGamificacao();
  }, [setValue]);

  const onSubmit = async (data: PerfilForm) => {
    try {
      await api.put('/usuarios/me', data);
      alert('✅ Perfil salvo com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar perfil. Tente novamente.');
    }
  };

  const iniciarComandoVoz = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('API de Reconhecimento de Voz não é suportada neste navegador.');
      return;
    }

    const reconhecimento = new SpeechRecognition();
    reconhecimento.lang = 'pt-BR';

    reconhecimento.onresult = (event: any) => {
      const comando = event.results[0][0].transcript.toLowerCase();
      if (comando.includes('salvar')) {
        document.getElementById('btnSalvarPerfil')?.click();
      } else if (comando.includes('pedidos')) {
        document.getElementById('historico-pedidos')?.scrollIntoView({ behavior: 'smooth' });
      } else if (comando.includes('recompensas')) {
        document.getElementById('gamificacao')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert(`Comando não reconhecido: ${comando}`);
      }
    };
    reconhecimento.start();
  };

  const handleAssinarPremium = async () => {
    if (!user?.id) {
      alert('Usuário não autenticado!');
      return;
    }

    if (user.tipo === 'premium') {
      setMostrarModalUpgrade(true);
      return;
    }

    setCarregandoStripe(true);
    try {
      const res = await api.post('/checkout/stripe', {
        preco: 59.9,
        plano: 'ESG Premium',
        usuarioId: user.id,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert('Erro ao iniciar o checkout.');
      }
    } catch (err) {
      console.error('Erro no checkout Stripe:', err);
      alert('Erro ao redirecionar para o Stripe.');
    } finally {
      setCarregandoStripe(false);
    }
  };

  return (
    <div>
      <main>
        <section className="hero-perfil" style={{ backgroundImage: "url('/images/hero-perfil.jpg')" }}>
          <div>
            <h2>Meu Perfil</h2>
            <p>Aqui você pode atualizar seus dados, assinar o plano Premium e visualizar suas recompensas.</p>
          </div>
        </section>

        <section id="gamificacao">
          <h2>🎁 Minhas Recompensas</h2>
          <div className="pontuacao">
            <p><strong>Pontos acumulados:</strong> <span>{pontos}</span></p>
            <p><strong>Próxima recompensa:</strong> <span>{recompensa}</span></p>
          </div>
        </section>

        <section id="informacoes-pessoais">
          <h2>📝 Informações Pessoais</h2>
          <form onSubmit={handleSubmit(onSubmit)} id="form-perfil">
            <div className="input-group">
              <label htmlFor="nome"><i className="fas fa-user"></i> Nome:</label>
              <input
                type="text"
                id="nome"
                placeholder="Ex: João Silva"
                {...register('nome', { required: 'Informe seu nome' })}
              />
              {errors.nome && <p className="error">{errors.nome.message}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="email"><i className="fas fa-envelope"></i> E-mail:</label>
              <input
                type="email"
                id="email"
                placeholder="Ex: joao@email.com"
                {...register('email', { required: 'Informe seu e-mail' })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <button type="submit" className="cta-button" id="btnSalvarPerfil">
              <i className="fas fa-save"></i> Salvar Alterações
            </button>
          </form>
        </section>

        <section>
          <h2>🌟 Plano Atual</h2>
          <p>Assine o plano Premium para desbloquear recursos exclusivos, como relatórios ESG, acesso a sensores e materiais educativos.</p>
          <button onClick={handleAssinarPremium} className="cta-button" disabled={carregandoStripe}>
            {carregandoStripe ? 'Redirecionando...' : '🚀 Assinar ESG Premium'}
          </button>
        </section>

        <section id="historico-pedidos">
          <h2>📦 Histórico de Pedidos</h2>
          <div className="pedidos-container">
            {pedidos.map((pedido) => (
              <div className="pedido" key={pedido.id}>
                <h3>Pedido #{pedido.id}</h3>
                <p>Data: {pedido.data}</p>
                <p>Total: R$ {pedido.total.toFixed(2)}</p>
                <Link to={`/perfil/pedido/${pedido.id}`} className="detalhes-button">
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        </section>

        <button id="microfone" className="cta-button" onClick={iniciarComandoVoz}>
          <i className="fas fa-microphone"></i> Ativar Comando de Voz
        </button>

        {mostrarModalUpgrade && (
          <ModalUpgrade modo="premium" onClose={() => setMostrarModalUpgrade(false)} />
        )}
      </main>
    </div>
  );
}
