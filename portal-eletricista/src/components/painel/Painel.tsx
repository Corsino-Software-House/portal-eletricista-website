import React from 'react';
import './StylesPainel.css';

const Dashboard: React.FC = () => {
  const data = {
    valorRecebido: 12500.00,
    valorTotal: 15700.00,
    quantidadeClientes: 128,
    quantidadeServicos: 15,
    projetos: 20,
  };

  const handleLogout = () => {
    console.log("Usuário deslogado!");
    alert("Você foi desconectado.");
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li><strong>Recebido</strong></li>
          <li><strong>Clientes</strong></li>
          <li><strong>Serviços</strong></li>
          <li><strong>Projetos</strong></li>
          <li><strong>Total</strong></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h2>Dashboard Administrativo</h2>
        </div>

        <div className="summary-cards">
          <div className="card received">
            <h3>Valor Recebido</h3>
            <p>€ {data.valorRecebido.toFixed(2)}</p>
            <a href="/detalhes-recebido" className="card-link">Ver detalhes</a>
          </div>
          <div className="card total">
            <h3>Valor Total</h3>
            <p>€ {data.valorTotal.toFixed(2)}</p>
            <a href="/detalhes-valor" className="card-link">Ver detalhes</a>
          </div>
          <div className="card clients">
            <h3>Total de Clientes</h3>
            <p>{data.quantidadeClientes}</p>
            <a href="/detalhes-cliente" className="card-link">Ver detalhes</a>
          </div>
          <div className="card services">
            <h3>Serviços Disponíveis</h3>
            <p>{data.quantidadeServicos}</p>
            <a href="/detalhes-servicos" className="card-link">Ver detalhes</a>
          </div>
           <div className="card withdrawal">
            <h3><i className="fas fa-hand-holding-usd"></i> Projetos</h3>
            <p>{data.projetos}</p>
            <a href="/detalhes-projetos" className="card-link">Ver detalhes</a>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
