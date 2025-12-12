import React, { useState } from "react";
import "../../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [activeTab, setActiveTab] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
<div
  style={{
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  }}
>

      <h2 style={{ color: "#0fcf6b" }}>Bem-vindo!</h2>
      <p style={{ width: 450, margin: "10px auto", lineHeight: "24px" }}>
        Faça login ou cadastre-se para acessar os melhores produtos direto dos produtores.
        <br /><br />
        🌱 Acompanhe suas compras e pedidos.<br />
        🔒 Seus dados seguros na nuvem.<br />
        🧾 CPF válido com 11 números.<br />
        🛒 Ofertas exclusivas e produtos orgânicos.
      </p>

      <div className="auth-container">
        {/* Tabs */}
        <div className="auth-tabs">
          <div
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => (window.location.href = "/login")}
          >
            Sign In
          </div>

          <div
            className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
          >
            Create Account
          </div>
        </div>

        {/* Inputs */}
        <input type="email" className="auth-input" placeholder="Digite seu e-mail" />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            className="auth-input"
            placeholder="Crie uma senha segura"
          />
          <span className="auth-eyes" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div style={{ position: "relative" }}>
          <input
            type={showPassword2 ? "text" : "password"}
            className="auth-input"
            placeholder="Repita a senha criada"
          />
          <span className="auth-eyes" onClick={() => setShowPassword2(!showPassword2)}>
            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <input type="text" className="auth-input" placeholder="Digite seu nome completo" />

        <div className="auth-phone-row">
          <select className="auth-input" style={{ maxWidth: 80 }}>
            <option value="+55">+55</option>
            <option value="+1">+1</option>
            <option value="+351">+351</option>
          </select>

          <input
            type="text"
            className="auth-input"
            placeholder="+55 XX 99999-9999"
          />
        </div>

        <input type="text" className="auth-input" placeholder="00000000000" />

        <button className="auth-btn">Create Account</button>
      </div>
    </div>
  );
}
