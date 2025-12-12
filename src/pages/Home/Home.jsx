import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "../../styles/home.css";

// API backend
import api from "../../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [destaques, setDestaques] = useState([]);
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/produtos/destaques");

        if (Array.isArray(res.data)) {
          setDestaques(res.data);
        }
      } catch (err) {
        console.error("Erro ao carregar destaques", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // anúncios mockados
    setAnuncios([
      {
        id: 1,
        imagem: "/images/anuncie.jpeg",
        link: "#",
        descricao: "Anuncie aqui!"
      },
      {
        id: 2,
        imagem: "/images/anuncie.jpeg",
        link: "#",
        descricao: "Sua marca no Agro Sustentável!"
      }
    ]);
  }, []);

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero-home">
        <video autoPlay muted loop className="hero-video">
          <source src="/videos/agricultura-hero.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay">
          <h1>CONECT AGRO TECH</h1>
          <p>Conectando produtores, consumidores e o futuro sustentável do agro.</p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/produtos")}>Quero Comprar</button>
            <button onClick={() => navigate("/ajuda")}>Quero Vender</button>
          </div>
        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="produtos-destaque">
        <h2>🌟 Produtos em Destaque</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : destaques.length === 0 ? (
          <p>Nenhum produto em destaque.</p>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={2}
            spaceBetween={20}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}
          >
            {destaques.map((p) => (
              <SwiperSlide key={p._id}>
                <div
                  className="produto-card"
                  onClick={() => navigate(`/produto/${p._id}`)}
                >
                  <img src={p.imagemUrl} alt={p.nome} />
                  <h3>{p.nome}</h3>
                  <p>R$ {p.preco.toFixed(2)}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* NOSSOS ANUNCIANTES */}
      <section className="home-section">
        <h2>📢 Nossos Anunciantes</h2>
        <div className="home-cards-row">
          {anuncios.map((ad) => (
            <a
              key={ad.id}
              href={ad.link}
              target="_blank"
              rel="noreferrer"
              className="home-card"
            >
              <img src={ad.imagem} alt={ad.descricao} />
              <span>{ad.descricao}</span>
            </a>
          ))}
        </div>
      </section>

      {/* NOSSOS PARCEIROS */}
      <section className="home-section">
        <h2>🤝 Nossos Parceiros</h2>
        <div className="home-cards-row">
          <div className="home-card home-card-parceiro">
            <span>Seja uma empresa parceira</span>
          </div>
          <div className="home-card home-card-parceiro">
            <span>Faça parte do Agro Sustentável</span>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="home-section">
        <h2>🌱 Quem Somos</h2>
        <p className="home-text">
          A CONECT AGRO TECH aproxima pequenos produtores e consumidores finais,
          promovendo comércio justo, doações e práticas sustentáveis.
        </p>

        <img
          src="/images/logo.png"
          alt="CONECT AGRO TECH"
          className="home-logo-round"
        />
      </section>

        <Footer />
  </div>  // fecha .home-page
);
}

