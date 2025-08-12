import React, { useState, useEffect } from 'react';
import './ListagemClientes.css'; 
import { useNavigate } from 'react-router-dom';
import { verClientes } from '../../services/cadastroCliente.service';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  criadoEm: string;
}

const ListagemClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState('');
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

  // Filtra clientes pelo nome ignorando maiúsculas/minúsculas
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase())
  );

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

          {/* Input para busca */}
          <input
            type="text"
            placeholder="Buscar cliente pelo nome..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            className="input-busca"
          />
        </div>

        <div className="projetos-list-container">
          {clientesFiltrados.length === 0 ? (
            <p className="no-projects-message">Nenhum cliente encontrado.</p>
          ) : (
            <div className="projetos-grid">
              {clientesFiltrados.map(cliente => (
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
