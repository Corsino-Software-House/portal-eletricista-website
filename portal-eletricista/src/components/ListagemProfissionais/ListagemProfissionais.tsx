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
  fotoFrenteUrl?: string | null;
  fotoVersoUrl?: string | null;
}

const ListagemProfissionais: React.FC = () => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [filtro, setFiltro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<Profissional | null>(null);
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

  const abrirModal = (profissional: Profissional) => {
    setProfissionalSelecionado(profissional);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProfissionalSelecionado(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  // Filtra profissionais pelo nome (ignora maiúsculas/minúsculas)
  const profissionaisFiltrados = profissionais.filter(prof =>
    prof.nome.toLowerCase().includes(filtro.toLowerCase())
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
          <h2>Listagem de Profissionais</h2>

          {/* Campo de busca */}
          <input
            type="text"
            placeholder="Buscar profissional pelo nome..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            className="input-busca"
          />
        </div>

        <div className="projetos-list-container">
          {profissionaisFiltrados.length === 0 ? (
            <p className="no-projects-message">Nenhum profissional encontrado.</p>
          ) : (
            <div className="projetos-grid">
              {profissionaisFiltrados.map(profissional => (
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
                  <button onClick={() => abrirModal(profissional)}>Ver Documentos</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {modalAberto && profissionalSelecionado && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Documentos de {profissionalSelecionado.nome}</h3>
            <div className="modal-images">
              {profissionalSelecionado.fotoFrenteUrl ? (
                <img src={profissionalSelecionado.fotoFrenteUrl} alt="Cartão Frente" />
              ) : (
                <p>Foto frente não disponível.</p>
              )}
              {profissionalSelecionado.fotoVersoUrl ? (
                <img src={profissionalSelecionado.fotoVersoUrl} alt="Cartão Verso" />
              ) : (
                <p>Foto verso não disponível.</p>
              )}
            </div>
            <button onClick={fecharModal} className="close-button">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListagemProfissionais;
