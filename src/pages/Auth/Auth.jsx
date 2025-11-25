// src/pages/Auth/Auth.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import Footer from "../../components/Footer";

export default function AuthPage() {
  // aba inicial: Create Account
  const [activeTab, setActiveTab] = useState("register");
  // tipo de conta
  const [role, setRole] = useState("consumer"); // "consumer" | "producer"

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // estado genérico do formulário
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    cpf: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // REGISTRO
  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("As senhas não conferem.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role, // "consumer" ou "producer"
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          cpf: form.cpf,
        }),
      });

      if (response.ok) {
        alert("Conta criada com sucesso!");
        // if (role === "consumer") navigate("/home-consumidor");
        // if (role === "producer") navigate("/home-produtor");
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.message || "Erro ao criar conta.");
      }
    } catch (err) {
      console.error(err);
      alert("Falha ao comunicar com o servidor.");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role, // importante pro backend saber se é produtor ou consumidor
          email: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        alert("Login realizado!");
        // if (role === "consumer") navigate("/home-consumidor");
        // if (role === "producer") navigate("/home-produtor");
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.message || "Credenciais inválidas.");
      }
    } catch (err) {
      console.error(err);
      alert("Falha ao comunicar com o servidor.");
    }
  };

  const isRegister = activeTab === "register";

  return (
    <>
      <div className="auth-page">
        {/* Texto de boas-vindas */}
        <section className="auth-hero">
          <h2>Bem-vindo!</h2>
          <p>
            Faça login ou cadastre-se para acessar os melhores produtos direto
            dos produtores.
          </p>

          <ul>
            <li>🌱 Acompanhe suas compras e histórico de pedidos.</li>
            <li>🔒 Seus dados são protegidos com segurança em nuvem.</li>
            <li>📱 Use CPF válido com 11 números. Ex: 12345678900.</li>
            <li>🛒 Aproveite ofertas exclusivas e produtos orgânicos.</li>
          </ul>

          <div className="auth-info">
            Ao se cadastrar, você poderá receber notificações sobre novos
            produtos e acompanhar sua entrega com transparência.
          </div>
        </section>

        {/* Card de login/registro */}
        <div className="auth-container">
          {/* Abas (Sign In / Create Account) */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Create Account
            </button>
          </div>

          {/* Seletor de tipo de usuário */}
          <div className="role-toggle">
            <span>Tipo de conta:</span>
            <button
              type="button"
              className={`role-pill ${
                role === "consumer" ? "selected" : ""
              }`}
              onClick={() => setRole("consumer")}
            >
              Consumidor
            </button>
            <button
              type="button"
              className={`role-pill ${
                role === "producer" ? "selected" : ""
              }`}
              onClick={() => setRole("producer")}
            >
              Produtor
            </button>
          </div>

          <form onSubmit={isRegister ? handleRegister : handleLogin}>
            {/* E-mail */}
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Digite seu e-mail"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* Senha */}
            <div className="auth-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="auth-input"
                placeholder={
                  isRegister ? "Crie uma senha segura" : "Digite sua senha"
                }
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                className="auth-eyes"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirmar senha – só no registro */}
            {isRegister && (
              <div className="auth-input-wrapper">
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="confirmPassword"
                  className="auth-input"
                  placeholder="Repita a senha criada"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="auth-eyes"
                  onClick={() => setShowPassword2((prev) => !prev)}
                >
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            )}

            {/* Campos extras – só no registro */}
            {isRegister && (
              <>
                <input
                  type="text"
                  name="name"
                  className="auth-input"
                  placeholder="Digite seu nome completo"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <div className="auth-phone-row">
                  <select className="auth-input" style={{ maxWidth: 80 }}>
                    <option value="+55">+55</option>
                    <option value="+1">+1</option>
                    <option value="+351">+351</option>
                  </select>

                  <input
                    type="text"
                    name="phone"
                    className="auth-input"
                    placeholder="(99) 99999-9999"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <input
                  type="text"
                  name="cpf"
                  className="auth-input"
                  placeholder="CPF"
                  value={form.cpf}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            {/* Botão principal */}
            <button type="submit" className="auth-btn">
              {isRegister ? "Create Account" : "Sign In"}
            </button>

            {/* Linkzinho embaixo – só no login */}
            {!isRegister && (
              <p style={{ textAlign: "center", marginTop: 10 }}>
                <Link to="/esqueci-senha" className="auth-back-link">
                  Esqueceu sua senha?
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Rodapé padrão do site */}
      <Footer />
    </>
  );
}
