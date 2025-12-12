import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Leaf } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Singular

// 👇 CORREÇÃO AQUI: Mudamos de "contexts" para "context"
import { useCart } from "../context/CartContext"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartQuantity } = useCart(); // Agora vai funcionar!
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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

          <Link
            to="/carrinho"
            style={{ position: "relative", color: "white", display: "flex", alignItems: "center" }}
          >
            <ShoppingCart size={22} />
            {cartQuantity > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  right: -10,
                  background: "#0fcf6b",
                  padding: "2px 6px",
                  borderRadius: "50%",
                  fontSize: 11,
                  fontWeight: "bold",
                  color: "white",
                  minWidth: "16px",
                  textAlign: "center"
                }}
              >
                {cartQuantity}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  fontSize: 13,
                  lineHeight: 1.2,
                }}
              >
                <span>Olá, {user.name || user.email}</span>
                <span style={{ fontSize: 12, opacity: 0.85 }}>
                  {user.role === "producer" ? "Produtor" : "Consumidor"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  background: "#ffffff",
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontWeight: "bold",
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  color: "#004E8A",
                }}
              >
                Sair
              </button>
            </>
          ) : (
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
          )}

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