// src/pages/Auth/Auth.jsx
import { useAuth } from "../../context/AuthContext";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import Footer from "../../components/Footer";
import { mockRegister, mockLogin } from "../../mocks/authMock";


export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // <--- pega login do contexto

  // aba inicial: Create Account
  const [activeTab, setActiveTab] = useState("register");
  const [role, setRole] = useState("consumer"); // "consumer" | "producer"

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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

  // REGISTRO (mock)
  // REGISTRO (usando mock, sem backend real)
const handleRegister = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("As senhas não conferem.");
    return;
  }

  try {
    const user = await mockRegister({
      role,
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      cpf: form.cpf,
    });

    console.log("✅ Usuário mock registrado:", user);

    alert("Conta criada (mock) com sucesso! Agora faça login.");

    // 👉 Volta para a aba de login (Sign In)
    setActiveTab("login");

    // opcional: limpa só as senhas
    setForm((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));
  } catch (err) {
    console.error(err);
    alert(err.message || "Erro ao criar conta (mock).");
  }
};

  // LOGIN (mock)
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const user = await mockLogin({
      role,
      email: form.email,
      password: form.password,
    });

    console.log("✅ Login mock ok:", user);
    login(user); // <-- salva no contexto + localStorage
    alert(`Login mock realizado! Bem-vindo, ${user.name || user.email}.`);

    navigate("/");
  } catch (err) {
    console.error(err);
    alert(err.message || "Credenciais inválidas (mock).");
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
              className={`role-pill ${role === "consumer" ? "selected" : ""}`}
              onClick={() => setRole("consumer")}
            >
              Consumidor
            </button>
            <button
              type="button"
              className={`role-pill ${role === "producer" ? "selected" : ""}`}
              onClick={() => setRole("producer")}
            >
              Produtor
            </button>
          </div>

          <form onSubmit={isRegister ? handleRegister : handleLogin}>
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Digite seu e-mail"
              value={form.email}
              onChange={handleChange}
              required
            />

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

            {isRegister && (
              <>
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

            <button type="submit" className="auth-btn">
              {isRegister ? "Create Account" : "Sign In"}
            </button>

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

      <Footer />
    </>
  );
}
