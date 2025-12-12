import React, { useState } from "react";
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Digite e-mail e senha.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login realizado!");

      setLoading(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Entrar</h2>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </div>
  );
}
