// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Carrega usuário salvo no localStorage (se existir)
  useEffect(() => {
    const stored = localStorage.getItem("cat_auth_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.warn("Erro ao ler usuário do localStorage");
      }
    }
  }, []);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("cat_auth_user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("cat_auth_user");
  }

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
