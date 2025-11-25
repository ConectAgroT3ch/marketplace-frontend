// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "../../styles/forgot-password.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) {
      alert("Digite seu e-mail.");
      return;
    }

    try {
      setLoading(true);

      // Quando tiver backend:
      // await api.post("/auth/forgot-password", { email });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar código. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* CONTEÚDO DA PÁGINA */}
      <div className="reset-page">
        <div className="reset-card">
          <h2 className="reset-title">Redefinir senha</h2>

          <p className="reset-subtitle">
            Insira seu e-mail cadastrado para receber o código de recuperação.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="reset-input"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="reset-btn" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </form>

          {success && (
            <p className="reset-info">
              Se o e-mail existir em nossa base, você receberá um código em
              alguns minutos.
            </p>
          )}

          <Link to="/login" className="reset-back-link">
            Voltar para iniciar sessão
          </Link>
        </div>
      </div>

      {/* FOOTER AZUL IGUAL À HOME / LOGIN */}
      <Footer />
    </>
  );
}
