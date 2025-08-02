import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import './ListagemProfissionais.css'; // Reutilizamos o mesmo CSS

// Definindo a interface para o tipo Profissional
interface Profissional {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  
}

const ListagemProfissionais: React.FC = () => {
  // Dados mock de profissionais (em um cenário real, viriam de uma API)
  const [profissionais, setProfissionais] = useState<Profissional[]>([
    {
      id: 'prof-001',
      nome: 'Ricardo Almeida',
      email: 'ricardo.almeida@example.com',
      telefone: '(11) 98765-1234',
      especialidade: 'Eletricista residencial',
      
    },
    {
      id: 'prof-002',
      nome: 'Fernanda Lima',
      email: 'fernanda.lima@example.com',
      telefone: '(21) 99876-2345',
      especialidade: 'Eletricista predial',
      
    },
    {
      id: 'prof-003',
      nome: 'Gustavo Santos',
      email: 'gustavo.santos@example.com',
      telefone: '(31) 97654-3456',
      especialidade: 'Eletricista industrial',
      
    },
    {
      id: 'prof-004',
      nome: 'Patricia Costa',
      email: 'patricia.costa@example.com',
      telefone: '(41) 96543-4567',
      especialidade: 'Automação, domótica e robótica',
      
    },
  ]);

  const handleLogout = () => {
    // Lógica de logout (limpar tokens, redirecionar)
    console.log("Usuário deslogado!");
    alert("Você foi desconectado.");
  };

  const handleDeleteProfissional = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este profissional?")) {
      setProfissionais(profissionais.filter(profissional => profissional.id !== id));
      console.log(`Profissional ${id} excluído.`);
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
          <h2>Listagem de Profissionais</h2>
        </div>

        <div className="projetos-list-container"> {/* Reutilizando o nome da classe CSS */}
          {profissionais.length === 0 ? (
            <p className="no-projects-message">Nenhum profissional encontrado. Adicione um novo profissional!</p>
          ) : (
            <div className="projetos-grid"> {/* Grid para os cards de profissional */}
              {profissionais.map(profissional => (
                <div key={profissional.id} className="projeto-card"> {/* Reutilizando o nome da classe CSS */}
                  <h3>{profissional.nome}</h3>
                  <p className="projeto-descricao"> {/* Reutilizando o nome da classe CSS */}
                    <strong>Email:</strong> {profissional.email}
                  </p>
                  <p className="projeto-especialidade"> {/* Reutilizando o nome da classe CSS */}
                    <strong>Telefone:</strong> {profissional.telefone}
                  </p>
                  <p className="projeto-especialidade"> {/* Reutilizando o nome da classe CSS */}
                    <strong>Especialidade:</strong> {profissional.especialidade}
                  </p>

                  <div className="projeto-actions"> {/* Reutilizando o nome da classe CSS */}
                    <button
                      onClick={() => handleDeleteProfissional(profissional.id)}
                      className="btn-delete"
                      title="Excluir Profissional"
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

export default ListagemProfissionais;