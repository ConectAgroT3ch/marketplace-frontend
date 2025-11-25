import { Link } from "react-router-dom";
import { ShoppingCart, Search, Leaf } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        height: "80px",
        background: "#004E8A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* CONTAINER CENTRAL */}
      <div
        style={{
          width: "100%",
          maxWidth: "1350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxSizing: "border-box",
          color: "white",
        }}
      >
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ width: 45, height: 45, borderRadius: 6 }}
          />
          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            CONECT AGRO TECH
          </span>
        </div>

        {/* MENU */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <Link to="/" style={linkStyle}>Início</Link>
            <Link to="/produtos" style={linkStyle}>Produtos</Link>
            <Link to="/suporte" style={linkStyle}>Suporte</Link>
        </div>


        {/* AÇÕES */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Leaf size={20} style={{ cursor: "pointer" }} />

          <div
            style={{
              padding: "6px 12px",
              background: "white",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: 160,
            }}
          >
            <Search size={17} color="#555" />
            <input
              type="text"
              placeholder="Buscar..."
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: 14,
                color: "#333",
              }}
            />
          </div>

          <Link to="/carrinho" style={{ position: "relative", color: "white" }}>
            <ShoppingCart size={22} />
            <span
              style={{
                position: "absolute",
                top: -5,
                right: -10,
                background: "#0fcf6b",
                padding: "2px 6px",
                borderRadius: "50%",
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
              }}
            >
              0
            </span>
          </Link>

          <Link
            to="/login"
            style={{
              background: "#0fcf6b",
              padding: "6px 14px",
              borderRadius: 6,
              fontWeight: "bold",
              fontSize: 15,
              textDecoration: "none",
              color: "#003300",
            }}
          >
            Entrar
          </Link>

          <select
            style={{
              background: "white",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 14,
            }}
          >
            <option>PT</option>
            <option>EN</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 500,
};
