// ListagemProjetos.tsx
import React, { useState } from 'react';
import  { Trash2 } from 'lucide-react';
import './Listagem.css'; // Reutilizamos o mesmo CSS

// Definindo a interface para o tipo Projeto
interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  especialidade: string;
  creditosSugeridos: number; // Ex: créditos sugeridos pelo admin ao criar o projeto
  creditosAplicados?: number; // Ex: créditos que um profissional aplicou
}

const ListagemProjetos: React.FC = () => {
  // Dados mock de projetos (em um cenário real, viriam de uma API)
  const [projetos, setProjetos] = useState<Projeto[]>([
    {
      id: 'proj-001',
      titulo: 'Eletricista',
      descricao: 'Focado em instalações elétricas e manutenção em residências.',
      especialidade: 'Eletricista residencial',
      creditosSugeridos: 100,
      creditosAplicados: 0,
    },
    {
      id: 'proj-002',
      titulo: 'Eletricista',
      descricao: 'Trabalha com instalações elétricas em edifícios e condomínios.',
      especialidade: 'Eletricista predial',
      creditosSugeridos: 75,
      creditosAplicados: 5,
    },
    {
      id: 'proj-003',
      titulo: 'Eletricista',
      descricao: 'Atua em fábricas, indústrias e empresas, com foco em máquinas e sistemas elétricos industriais.',
      especialidade: 'Eletricista industrial',
      creditosSugeridos: 50,
      creditosAplicados: 50,
    },
    {
      id: 'proj-004',
      titulo: 'Eletricista',
      descricao: 'Áreas mais recentes e em crescimento, que envolvem a integração de sistemas eletrônicos e elétricos em residências e empresas. ',
      especialidade: 'Automação, domótica e robótica',
      creditosSugeridos: 120,
      creditosAplicados: 0,
    },
  ]);

  // Estado para controlar os créditos a serem aplicados
  const [creditosInput, setCreditosInput] = useState<{ [key: string]: number }>({});

  const handleLogout = () => {
    // Lógica de logout (limpar tokens, redirecionar)
    console.log("Usuário deslogado!");
    alert("Você foi desconectado.");
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      setProjetos(projetos.filter(projeto => projeto.id !== id));
      console.log(`Projeto ${id} excluído.`);
    }
  };

  const handleCreditosInputChange = (id: string, value: string) => {
    setCreditosInput({
      ...creditosInput,
      [id]: parseInt(value) || 0, // Garante que é um número
    });
  };

  const handleAplicarCreditos = (id: string) => {
    const creditosParaAplicar = creditosInput[id] || 0;
    setProjetos(projetos.map(projeto =>
      projeto.id === id
        ? { ...projeto, creditosAplicados: (projeto.creditosAplicados || 0) + creditosParaAplicar }
        : projeto
    ));
    // Limpa o input após aplicar
    setCreditosInput({ ...creditosInput, [id]: 0 });
    alert(`Créditos aplicados ao projeto ${id}: ${creditosParaAplicar}`);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Painel</h2>
        <ul>
          <li><strong><a href="/dashboard">Dashboard</a></strong></li> {/* Link para o dashboard */}
          <li><strong><a href="#">Valor Total</a></strong></li>
          <li><strong><a href="/listagem-clientes">Clientes</a></strong></li>
          <li><strong><a href="/listagem-profissionais">Profissionais</a></strong></li>
          <li><strong><a href="/listagem-projetos">Projetos</a></strong></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h2>Listagem de Projetos</h2>
        </div>

        <div className="projetos-list-container">
          {projetos.length === 0 ? (
            <p className="no-projects-message">Nenhum projeto encontrado. Adicione um novo projeto!</p>
          ) : (
            <div className="projetos-grid"> {/* Grid para os cards de projeto */}
              {projetos.map(projeto => (
                <div key={projeto.id} className="projeto-card">
                  <h3>{projeto.titulo}</h3>
                  <p className="projeto-descricao">{projeto.descricao}</p>
                  <p className="projeto-especialidade">
                    <strong>Especialidade:</strong> {projeto.especialidade}
                  </p>
                  <div className="projeto-creditos-info">
                    {/* <p><strong>Créditos Sugeridos:</strong> {projeto.creditosSugeridos}</p> */}
                    <p><strong>Créditos Aplicados:</strong> {projeto.creditosAplicados || 0}</p>
                  </div>

                  <div className="projeto-actions">
                    <div className="creditos-input-group">
                      <input
                        type="number"
                        placeholder="Adicionar Créditos"
                        value={creditosInput[projeto.id] || ''}
                        onChange={(e) => handleCreditosInputChange(projeto.id, e.target.value)}
                        min="0"
                        className="creditos-input"
                      />
                      <button
                        onClick={() => handleAplicarCreditos(projeto.id)}
                        className="btn-aplicar-creditos"
                      >
                        Aplicar
                      </button>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(projeto.id)}
                      className="btn-delete"
                      title="Excluir Projeto"
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

export default ListagemProjetos;