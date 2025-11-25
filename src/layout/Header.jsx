import { Link } from "react-router-dom";
import "./header.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          <img src="/vite.svg" className="logo-img" />
          <span>CONECT AGRO TECH</span>
        </Link>

        {/* MENU */}
        <nav className="nav">
          <Link to="/">Início</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/suporte">Suporte</Link>
        </nav>

        {/* AÇÕES */}
        <div className="right-side">
          <Link to="/carrinho" className="cart-btn">
            <FaShoppingCart size={20} />
          </Link>

          <Link to="/login" className="login-btn">
            Entrar / Registrar
          </Link>
        </div>

      </div>
    </header>
  );
}
