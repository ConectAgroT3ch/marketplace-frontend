import { Routes, Route } from "react-router-dom";

// Páginas
import Home from "../pages/Home/Home";
import AuthPage from "../pages/Auth/Auth";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Perfil from "../pages/Perfil/Perfil";

// Marketplace
import Produtos from "../pages/Produtos/Produtos";
import NovoProduto from "../pages/Produtos/NovoProduto";
import ProdutoDetalhes from "../pages/Produtos/ProdutoDetalhes";

// 👇 IMPORTANTE: O Carrinho tem que estar importado aqui
import Carrinho from "../pages/Carrinho/Carrinho";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/registro" element={<AuthPage />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produto/:id" element={<ProdutoDetalhes />} />
      <Route path="/anunciar" element={<NovoProduto />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/suporte" element={<h1>Suporte</h1>} />

      {/* 👇 IMPORTANTE: A rota tem que chamar o componente <Carrinho /> */}
      <Route path="/carrinho" element={<Carrinho />} />
    </Routes>
  );
}