import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RoutesApp />
    </BrowserRouter>
  );
}
