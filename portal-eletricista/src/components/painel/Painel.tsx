import React, { useEffect, useState } from 'react';
import './StylesPainel.css';
import {
  totalClientes,
  totalProfissional,
  totalProjetos,
  totalSubscriptions,
} from '../../services/dashboard.service';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [valorRecebido, setValorRecebido] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);
  const [profissionais, setProfissionais] = useState(0);
  const [projetos, setProjetos] = useState(0);
  const navigate = useNavigate();

useEffect(() => {
  async function fetchData() {
    try {
      const [clientes, profs, subs, projs] = await Promise.all([
        totalClientes(),
        totalProfissional(),
        totalSubscriptions(),
        totalProjetos(),
      ]);

      console.log('clientes:', clientes);
      console.log('profissionais:', profs);
      console.log('subscriptions:', subs);
      console.log('projetos:', projs);

      // ajuste conforme a estrutura real
      setQuantidadeClientes(clientes.total || clientes || 0);
      setProfissionais(profs.total || profs || 0);
      setProjetos(projs.total || projs || 0);
      setValorRecebido(subs  || 0);
      setValorTotal(subs|| 0);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    }
  }

  fetchData();
}, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Painel</h2>
        <ul>
          <li><strong><a href="#">Valor Recebido</a></strong></li>
          <li><strong><a href="#">Valor Total</a></strong></li>
          <li><strong><a href="/listagem-clientes">Clientes</a></strong></li>
          <li><strong><a href="/listagem-profissionais">Profissionais</a></strong></li>
          <li><strong><a href="/listagem-projetos">Projetos</a></strong></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
        </div>

        <div className="summary-cards">
          <div className="card received">
            <h3>Valor Recebido</h3>
            <p>€ {valorRecebido.toFixed(2)}</p>
            <a href="/detalhes-recebido" className="card-link">Ver detalhes</a>
          </div>
          <div className="card total">
            <h3>Valor Total</h3>
            <p>€ {valorTotal.toFixed(2)}</p>
            <a href="/detalhes-valor" className="card-link">Ver detalhes</a>
          </div>
          <div className="card clients">
            <h3>Clientes</h3>
            <p>{quantidadeClientes}</p>
            <a href="/listagem-clientes" className="card-link">Ver detalhes</a>
          </div>
          <div className="card services">
            <h3>Profissionais</h3>
            <p>{profissionais}</p>
            <a href="/listagem-profissionais" className="card-link">Ver detalhes</a>
          </div>
          <div className="card withdrawal">
            <h3>Projetos</h3>
            <p>{projetos}</p>
            <a href="/listagem-projetos" className="card-link">Ver detalhes</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
