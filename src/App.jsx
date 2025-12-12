// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}
