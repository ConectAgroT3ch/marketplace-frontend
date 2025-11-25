import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import AuthPage from "../pages/Auth/Auth";
import ForgotPassword from "../pages/Auth/ForgotPassword"; // 👈 novo import

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<h1>Produtos</h1>} />
      <Route path="/suporte" element={<h1>Suporte</h1>} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/registro" element={<h1>Página de Registro</h1>} />
      <Route path="/carrinho" element={<h1>Seu Carrinho</h1>} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} /> {/* 👈 nova rota */}
    </Routes>
  );
}
