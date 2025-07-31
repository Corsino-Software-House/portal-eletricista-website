// Dashboard.tsx
import React from 'react';
import './StylesPainel.css'; // Seu CSS
// import { LineChart, BarChart } from 'recharts'; // Exemplo de importação de gráfico

const Dashboard: React.FC = () => {
  // Dados mock (substitua pelos seus dados reais, talvez vindo de uma API ou context)
  const data = {
    valorRecebido: 12500.00,
    valorAReceber: 3200.00,
    valorTotal: 15700.00,
    valorRetirada: 500.00,
    quantidadeClientes: 128, // Novo dado
    quantidadeServicos: 15,  // Novo dado
    // ... dados para gráficos
  };

  const handleLogout = () => {
    // Lógica para sair do painel
    // Isso geralmente envolve:
    // 1. Limpar tokens de autenticação (localStorage, sessionStorage, cookies)
    // 2. Redirecionar o usuário para a página de login
    console.log("Usuário deslogado!");
    alert("Você foi desconectado."); // Apenas para demonstração
    // Exemplo de redirecionamento (se estiver usando react-router-dom)
    // history.push('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard Administrativo</h2>
        
      </div>

      <div className="summary-cards">
        <div className="card received">
          <h3>Valor Recebido</h3>
          <p>R$ {data.valorRecebido.toFixed(2)}</p>
        </div>
        <div className="card pending">
          <h3>Valor a Receber</h3>
          <p>R$ {data.valorAReceber.toFixed(2)}</p>
        </div>
        <div className="card total">
          <h3>Valor Total</h3>
          <p>R$ {data.valorTotal.toFixed(2)}</p>
        </div>
        <div className="card withdrawal">
          <h3>Valor de Retirada</h3>
          <p>R$ {data.valorRetirada.toFixed(2)}</p>
        </div>
        {/* Novos cards */}
        <div className="card clients">
          <h3>Total de Clientes</h3>
          <p>{data.quantidadeClientes}</p>
        </div>
        <div className="card services">
          <h3>Serviços Disponíveis</h3>
          <p>{data.quantidadeServicos}</p>
        </div>
      </div>
      {/* Adicionar componentes de gráfico aqui */}
      {/* <LineChart ... /> */}
      <button onClick={handleLogout} className="logout-button">Sair</button>
    </div>
    
  );
};

export default Dashboard;