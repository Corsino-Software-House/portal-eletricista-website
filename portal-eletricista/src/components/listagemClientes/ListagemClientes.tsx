import React, { useState, useEffect } from 'react';
import './ListagemClientes.css'; 
import { useNavigate } from 'react-router-dom';
import { verClientes } from '../../services/cadastroCliente.service';

// Interface local para o tipo Cliente
interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  criadoEm: string; // ou dataCadastro, dependendo do retorno da API
}

const ListagemClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarClientes() {
      try {
        const resposta = await verClientes();
        setClientes(resposta);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    }

    carregarClientes();
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
          <h2>Listagem de Clientes</h2>
        </div>

        <div className="projetos-list-container">
          {clientes.length === 0 ? (
            <p className="no-projects-message">Nenhum cliente encontrado. Adicione um novo cliente!</p>
          ) : (
            <div className="projetos-grid">
              {clientes.map(cliente => (
                <div key={cliente.id} className="projeto-card">
                  <h3>{cliente.nome}</h3>
                  <p className="projeto-descricao">
                    <strong>Email:</strong> {cliente.email}
                  </p>
                  <p className="projeto-especialidade">
                    <strong>Telefone:</strong> {cliente.telefone}
                  </p>
                  <p className="projeto-especialidade">
                    <strong>Cadastro:</strong> {new Date(cliente.criadoEm).toLocaleDateString()}
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

export default ListagemClientes;
