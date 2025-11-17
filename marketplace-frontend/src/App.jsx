import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Carregando mensagem da API...');

  useEffect(() => {
    // Busca a mensagem do seu backend
    // A variável VITE_API_URL é definida no .env.example e carregada pelo Vite
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    fetch(`${apiUrl}/`)
      .then(response => response.text()) // Ou response.json() se sua API retornar JSON
      .then(data => setMessage(data))
      .catch(error => {
        console.error('Erro ao buscar API:', error);
        setMessage('Erro ao carregar a mensagem da API.');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Marketplace Frontend</h1>
        <p>{message}</p>
        <p>
          Este é o frontend React. A mensagem acima vem da sua API Node.js.
        </p>
        <a
          className="App-link"
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aprenda React
        </a>
      </header>
    </div>
  );
}

export default App;