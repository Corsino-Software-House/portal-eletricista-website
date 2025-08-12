import React, { useState, useEffect } from 'react';
import './ListagemProfissionais.css'; 
import { useNavigate } from 'react-router-dom';
import { verProfissionais } from '../../services/cadastroProfissional.service';

interface Profissional {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
}

const ListagemProfissionais: React.FC = () => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarProfissionais();
  }, []);

  const carregarProfissionais = async () => {
    try {
      const response = await verProfissionais(); 
      setProfissionais(response);
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
    }
  };

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
          <li><strong><a href="/dashboard">Dashboard</a></strong></li> 
          <li><strong><a href="#">Valor Total</a></strong></li>
          <li><strong><a href="/listagem-clientes">Clientes</a></strong></li>
          <li><strong><a href="/listagem-profissionais">Profissionais</a></strong></li> 
          <li><strong><a href="/listagem-projetos">Projetos</a></strong></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h2>Listagem de Profissionais</h2>
        </div>

        <div className="projetos-list-container">
          {profissionais.length === 0 ? (
            <p className="no-projects-message">Nenhum profissional encontrado. Adicione um novo profissional!</p>
          ) : (
            <div className="projetos-grid">
              {profissionais.map(profissional => (
                <div key={profissional.id} className="projeto-card">
                  <h3>{profissional.nome}</h3>
                  <p className="projeto-descricao">
                    <strong>Email:</strong> {profissional.email}
                  </p>
                  <p className="projeto-especialidade">
                    <strong>Telefone:</strong> {profissional.telefone}
                  </p>
                  <p className="projeto-especialidade">
                    <strong>Especialidade:</strong> {profissional.especialidade}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ListagemProfissionais;
