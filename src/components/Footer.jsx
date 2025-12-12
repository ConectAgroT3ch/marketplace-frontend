import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css"; // ajuste o caminho se sua pasta estiver diferente

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="main-footer">
      <button
        onClick={handleScrollTop}
        className="back-to-top"
        title="Voltar ao topo"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      <div className="footer-container">
        <p>© 2025 CONECT AGRO TECH — Todos os direitos reservados.</p>

        <nav className="footer-innovations" aria-label="Inovações futuras">
          <h4>🌿 Inovações Futuras (Em Construção)</h4>
          <ul>
            <li><Link to="/mentoria"><span className="icon">🌿</span>Farm from Home</Link></li>
            <li><Link to="/live-commerce"><span className="icon">📺</span>Live Commerce</Link></li>
            <li><Link to="/csa-box"><span className="icon">📦</span>CSA Box</Link></li>
            <li><Link to="/trocas"><span className="icon">🔄</span>Trocas (Barter)</Link></li>
            <li><Link to="/blockchain"><span className="icon">⛓</span>Blockchain/NFTs</Link></li>
            <li><Link to="/reciclagem"><span className="icon">♻️</span>Reciclagem Gamificada</Link></li>
            <li><Link to="/microcredito"><span className="icon">💰</span>Microcrédito</Link></li>
            <li><Link to="/agro-ia"><span className="icon">🤖</span>Agrônomo IA</Link></li>
            <li><Link to="/labs"><span className="icon">🛰</span>Labs IoT/Drones</Link></li>
            <li><Link to="/farmfest"><span className="icon">🎉</span>Farm Fest</Link></li>
          </ul>
        </nav>

        <div className="footer-socials">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8" />
              <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
