import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
import {
  buscarRequestsPorCliente,
  concluirRequest,
} from "../../services/request.service";
import { buscarProfissionaisPorRequest, type Profissional as ProfissionalService } from "../../services/request.service"; // Importa interface do service
import "./styles.css";

interface Projeto {
  id: number;
  titulo: string;
  descricao: string;
  status: "ESPERA" | "ABERTO" | "CONCLUIDO";
}

export default function MeusProjetos() {
  const navigate = useNavigate();
  const { id: clienteId } = useParams<{ id: string }>();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [profissionais, setProfissionais] = useState<ProfissionalService[]>([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        if (!clienteId) return;
        const response: Projeto[] = await buscarRequestsPorCliente(Number(clienteId));
        setProjetos(response);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    };

    fetchProjetos();
  }, [clienteId]);

  const marcarConcluido = async (id: number) => {
    try {
      await concluirRequest(id);
      setProjetos((prev) =>
        prev.map((proj) =>
          proj.id === id ? { ...proj, status: "CONCLUIDO" } : proj
        )
      );
    } catch (error) {
      console.error("Erro ao concluir projeto:", error);
    }
  };

  const abrirModalAvaliar = async (projeto: Projeto) => {
    try {
      setProjetoSelecionado(projeto);
      const profs = await buscarProfissionaisPorRequest(projeto.id);
      setProfissionais(profs); // agora usa a interface do service
      setModalAberto(true);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    }
  };

  const selecionarProfissional = (profissionalId: number) => {
    setModalAberto(false);
    if (projetoSelecionado) {
      navigate(`/avaliacao/${profissionalId}`);
    }
  };

  const voltar = () => window.history.back();

  return (
    <>
      <button className="btn-voltar" onClick={voltar}>
        <ArrowLeft size={24} />
        Voltar
      </button>

      <div className="container">
        <div className="header">
          <h1>Meus Projetos</h1>
        </div>

        <div className="projetos-lista">
          {projetos.map((proj) => (
            <div key={proj.id} className="projeto-card">
              <div className="projeto-info">
                <h2>{proj.titulo}</h2>
                <p className="descricao">{proj.descricao}</p>
                <span
                  className={`status ${
                    proj.status === "CONCLUIDO"
                      ? "concluido"
                      : proj.status === "ABERTO"
                      ? "aberto"
                      : "espera"
                  }`}
                >
                  {proj.status === "CONCLUIDO" ? (
                    <CheckCircle size={16} />
                  ) : (
                    <Circle size={16} />
                  )}{" "}
                  {proj.status}
                </span>
              </div>

              {proj.status === "ABERTO" && (
                <button
                  className="btn-concluir"
                  onClick={() => marcarConcluido(proj.id)}
                >
                  Marcar como concluído
                </button>
              )}

              {proj.status === "CONCLUIDO" && (
                <button
                  className="btn-avaliar"
                  onClick={() => abrirModalAvaliar(proj)}
                >
                  Avaliar profissional
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
     {modalAberto && (
  <div className="modal-overlay" onClick={() => setModalAberto(false)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>Selecione o profissional contratado</h2>
      {profissionais.length === 0 ? (
        <p>Nenhum profissional se candidatou.</p>
      ) : (
        <div className="profissionais-grid">
          {profissionais.map((prof) => (
            <div key={prof.id} className="profissional-card">
              <img
                src={prof.fotoUrl || "/default-avatar.png"}
                alt={prof.nome}
                className="profissional-foto"
              />
              <div className="profissional-info">
                <h3>{prof.nome}</h3>
                <p>{prof.especialidade}</p>
              </div>
              <button
                className="btn-selecionar"
                onClick={() => selecionarProfissional(prof.id)}
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>
      )}
      <button className="btn-fechar" onClick={() => setModalAberto(false)}>
        Fechar
      </button>
    </div>
  </div>
)}
    </>
  );
}
