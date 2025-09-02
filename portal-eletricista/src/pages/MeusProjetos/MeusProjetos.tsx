import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
import { buscarRequestsPorCliente,concluirRequest } from "../../services/request.service";
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
      await concluirRequest(id); // chama a service que conclui o projeto no backend
      setProjetos((prev) =>
        prev.map((proj) =>
          proj.id === id ? { ...proj, status: "CONCLUIDO" } : proj
        )
      );
    } catch (error) {
      console.error("Erro ao concluir projeto:", error);
    }
  };

  const voltar = () => {
    window.history.back();
  };

  const avaliar = () => {
    navigate("/avaliar");
  };

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
                <button className="btn-avaliar" onClick={avaliar}>
                  Avaliar profissional
                </button>
              )}
              {/* Nenhum botão aparece se o status for "Espera" */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
