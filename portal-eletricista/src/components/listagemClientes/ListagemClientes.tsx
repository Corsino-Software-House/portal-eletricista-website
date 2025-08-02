import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import './ListagemClientes.css'; // Reutilizamos o mesmo CSS

// Definindo a interface para o tipo Cliente
interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: string; // Ex: Data de cadastro do cliente
}

const ListagemClientes: React.FC = () => {
  // Dados mock de clientes (em um cenário real, viriam de uma API)
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 'cli-001',
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      telefone: '(11) 98765-4321',
      dataCadastro: '2023-01-15',
    },
    {
      id: 'cli-002',
      nome: 'Maria Souza',
      email: 'maria.souza@example.com',
      telefone: '(21) 99876-5432',
      dataCadastro: '2023-02-20',
    },
    {
      id: 'cli-003',
      nome: 'Carlos Pereira',
      email: 'carlos.pereira@example.com',
      telefone: '(31) 97654-3210',
      dataCadastro: '2023-03-10',
    },
    {
      id: 'cli-004',
      nome: 'Ana Oliveira',
      email: 'ana.oliveira@example.com',
      telefone: '(41) 96543-2109',
      dataCadastro: '2023-04-05',
    },
  ]);

  const handleLogout = () => {
    // Lógica de logout (limpar tokens, redirecionar)
    console.log("Usuário deslogado!");
    alert("Você foi desconectado.");
  };

  const handleDeleteClient = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      setClientes(clientes.filter(cliente => cliente.id !== id));
      console.log(`Cliente ${id} excluído.`);
    }
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

        <div className="projetos-list-container"> {/* Reutilizando o nome da classe CSS */}
          {clientes.length === 0 ? (
            <p className="no-projects-message">Nenhum cliente encontrado. Adicione um novo cliente!</p>
          ) : (
            <div className="projetos-grid"> {/* Grid para os cards de cliente */}
              {clientes.map(cliente => (
                <div key={cliente.id} className="projeto-card"> {/* Reutilizando o nome da classe CSS */}
                  <h3>{cliente.nome}</h3>
                  <p className="projeto-descricao"> {/* Reutilizando o nome da classe CSS */}
                    <strong>Email:</strong> {cliente.email}
                  </p>
                  <p className="projeto-especialidade"> {/* Reutilizando o nome da classe CSS */}
                    <strong>Telefone:</strong> {cliente.telefone}
                  </p>
                  <p className="projeto-especialidade"> {/* Reutilizando o nome da classe CSS */}
                    <strong>Cadastro:</strong> {cliente.dataCadastro}
                  </p>

                  <div className="projeto-actions"> {/* Reutilizando o nome da classe CSS */}
                    <button
                      onClick={() => handleDeleteClient(cliente.id)}
                      className="btn-delete"
                      title="Excluir Cliente"
                    >
                      <Trash2 />
                    </button>
                  </div>
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