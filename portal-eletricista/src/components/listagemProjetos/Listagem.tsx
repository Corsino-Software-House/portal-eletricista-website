// ListagemProjetos.tsx
import React, { useEffect, useState } from "react";
import { Trash2, CheckCircle } from "lucide-react"; // Ícone para aprovar
import "./Listagem.css";
import {
  buscarTodasRequests,
  deletarRequest,
  aplicarCreditos,
  aprovarRequest, // importando a nova service
} from "../../services/request.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  especialidade: string;
  creditosAplicados?: number;
  status: "ESPERA" | "ABERTO" | "CONCLUIDO"; // status do projeto
}

const ListagemProjetos: React.FC = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(false);
  const [creditosInput, setCreditosInput] = useState<{ [key: string]: number }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<"TODOS" | "ESPERA" | "ABERTO" | "CONCLUIDO">("TODOS");


  useEffect(() => {
    const carregarProjetos = async () => {
      try {
        setLoading(true);
        const data = await buscarTodasRequests();

        const projetosConvertidos: Projeto[] = data.map((req: any) => ({
          id: String(req.id),
          titulo: req.titulo,
          descricao: req.descricao,
          especialidade: req.especialidade,
          creditosAplicados: req.creditosAplicados || 0,
          status: req.status, // <-- adicionando status
        }));

        setProjetos(projetosConvertidos);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        Swal.fire("Erro", "Erro ao buscar projetos.", "error");
      } finally {
        setLoading(false);
      }
    };

    carregarProjetos();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleDeleteProject = async (id: string) => {
    const confirmacao = await Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (confirmacao.isConfirmed) {
      try {
        await deletarRequest(Number(id));
        setProjetos((prev) => prev.filter((projeto) => projeto.id !== id));
        Swal.fire(
          "Excluído!",
          "O projeto foi excluído com sucesso.",
          "success"
        );
      } catch (error) {
        console.error("Erro ao excluir projeto:", error);
        Swal.fire("Erro", "Erro ao excluir projeto.", "error");
      }
    }
  };

  const handleCreditosInputChange = (id: string, value: string) => {
    setCreditosInput({
      ...creditosInput,
      [id]: parseInt(value) || 0,
    });
  };

  const handleAplicarCreditos = async (id: string) => {
    const creditosParaAplicar = creditosInput[id] || 0;

    if (creditosParaAplicar <= 0) {
      Swal.fire("Atenção", "Insira um valor válido de créditos.", "warning");
      return;
    }

    try {
      await aplicarCreditos(id, creditosParaAplicar);
      setProjetos((prev) =>
        prev.map((projeto) =>
          projeto.id === id
            ? {
                ...projeto,
                creditosAplicados:
                  (projeto.creditosAplicados || 0) + creditosParaAplicar,
              }
            : projeto
        )
      );
      setCreditosInput({ ...creditosInput, [id]: 0 });
      Swal.fire(
        "Sucesso",
        `Créditos aplicados: ${creditosParaAplicar}`,
        "success"
      );
    } catch (error) {
      console.error("Erro ao aplicar créditos:", error);
      Swal.fire("Erro", "Erro ao aplicar créditos.", "error");
    }
  };

  const handleAprovarProjeto = async (id: string) => {
    try {
      await aprovarRequest(Number(id));
      setProjetos((prev) =>
        prev.map((projeto) =>
          projeto.id === id ? { ...projeto, status: "ABERTO" } : projeto
        )
      );
      Swal.fire("Sucesso", "Projeto aprovado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao aprovar projeto:", error);
      Swal.fire("Erro", "Erro ao aprovar projeto.", "error");
    }
  };

  // 🔎 Filtro de projetos pelo termo digitado
  const projetosFiltrados = projetos.filter((projeto) => {
  const matchesSearch =
    projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    projeto.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    projeto.especialidade.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "TODOS" || projeto.status === statusFilter;

  return matchesSearch && matchesStatus;
});
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Painel</h2>
        <ul>
          <li>
            <strong>
              <a href="/dashboard">Dashboard</a>
            </strong>
          </li>
          <li>
            <strong>
              <a href="/listagem-clientes">Clientes</a>
            </strong>
          </li>
          <li>
            <strong>
              <a href="/listagem-profissionais">Profissionais</a>
            </strong>
          </li>
          <li>
            <strong>
              <a href="/listagem-projetos">Projetos</a>
            </strong>
          </li>
          <li><strong><a href="/listagem-reviews">Reviews</a></strong></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h2>Listagem de Projetos</h2>
        </div>
        

        {/* Campo de pesquisa */}
       <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
  <input
    type="text"
    placeholder="Pesquisar por título, descrição ou especialidade..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      flex: 1,
      padding: "10px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    }}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value as any)}
    style={{
      padding: "10px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    }}
  >
    <option value="TODOS">Todos</option>
    <option value="ESPERA">Espera</option>
    <option value="ABERTO">Aberto</option>
    <option value="CONCLUIDO">Concluído</option>
  </select>
</div>


        <div className="projetos-list-container">
          {loading ? (
            <p>Carregando projetos...</p>
          ) : projetosFiltrados.length === 0 ? (
            <p className="no-projects-message">Nenhum projeto encontrado.</p>
          ) : (
            <div className="projetos-grid">
              {projetosFiltrados.map((projeto) => (
                <div key={projeto.id} className="projeto-card">
                  <h3>{projeto.titulo}</h3>
                  <p className="projeto-descricao">{projeto.descricao}</p>
                  <p className="projeto-especialidade">
                    <strong>Especialidade:</strong> {projeto.especialidade}
                  </p>
                  <p className="projeto-status">
                    <strong>Status:</strong> {projeto.status}
                  </p>
                  <div className="projeto-creditos-info">
                    <p>
                      <strong>Créditos Aplicados:</strong>{" "}
                      {projeto.creditosAplicados || 0}
                    </p>
                  </div>

                  <div className="projeto-actions">
                    <div className="creditos-input-group">
                      <input
                        type="number"
                        placeholder="Créditos"
                        value={creditosInput[projeto.id] || ""}
                        onChange={(e) =>
                          handleCreditosInputChange(projeto.id, e.target.value)
                        }
                        min="0"
                        className="creditos-input"
                      />
                    </div>

                    <div className="action-buttons">
                      {projeto.status === "ESPERA" && (
                        <button
                          onClick={() => handleAprovarProjeto(projeto.id)}
                          className="btn-aprovar"
                          title="Aprovar Projeto"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span>Aprovar</span>
                        </button>
                      )}

                      {projeto.status === "ABERTO" && (
                        <button
                          onClick={() => handleAplicarCreditos(projeto.id)}
                          className="btn-aplicar-creditos"
                        >
                          Aplicar
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteProject(projeto.id)}
                        className="btn-delete"
                        title="Excluir Projeto"
                        aria-label="Excluir Projeto"
                      >
                        <Trash2 />
                      </button>
                    </div>
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
