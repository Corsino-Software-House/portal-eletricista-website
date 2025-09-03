import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { usarCredito } from "../../services/usarCreditos.service";
import { buscarRequestPorId } from "../../services/request.service";
import { buscarAssinaturaAtiva } from "../../services/subscription.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

export default function DetalhesDoChamado() {
  const { id } = useParams();
  const [trabalho, setTrabalho] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [candidatado, setCandidatado] = useState(false);

  const navigate = useNavigate();
  const profissionalId = Number(localStorage.getItem("id"));
  const subscriptionId = Number(id);

  useEffect(() => {
    async function fetchTrabalho() {
      try {
        const data = await buscarRequestPorId(subscriptionId);
        setTrabalho(data);
      } catch (err) {
        console.error("Erro ao buscar chamado:", err);
      } finally {
        setCarregando(false);
      }
    }
    fetchTrabalho();
  }, [subscriptionId]);

  const handleCandidatar = async () => {
    if (!trabalho) return;
    const assinaturaAtiva = await buscarAssinaturaAtiva(profissionalId);
    const assinatura = assinaturaAtiva[0];

    try {
      await usarCredito({
        requestId: trabalho.id,
        subscriptionId: assinatura.id,
        profissionalId,
        quantidade: trabalho.creditos,
      });

      setCandidatado(true);

      Swal.fire({
        title: "Candidatura enviada com sucesso!",
        text: "Os contatos do cliente foram liberados para você.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      Swal.fire({
        title: "Erro ao se candidatar",
        text: "Não foi possível usar o crédito. Tente novamente.",
        icon: "error",
        confirmButtonText: "Fechar",
      });
    }
  };

  function formatarData(dataString: string) {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (carregando) {
    return <div className="loading">Carregando...</div>;
  }

  if (!trabalho) {
    return <div className="error">Chamado não encontrado.</div>;
  }

  return (
    <>
      <Header />
      <div style={{ padding: "10px", background: "#f2f4f8" }}>
        <button
          onClick={() => navigate("/areadoprofissional/buscar-trabalhos")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "16px",
            color: "#3259daff",
          }}
        >
          <ArrowLeft size={22} />
          Voltar
        </button>
      </div>
      <div className="detalhes-container">
        <div className="detalhes-card">
          <h1>{trabalho.titulo}</h1>
          <p className="descricao">{trabalho.descricao}</p>

          <div className="info-grid">
            <div>
              <strong>Especialidade:</strong>
              <p>{trabalho.especialidade}</p>
            </div>
            <div>
              <strong>Local:</strong>
              <p>
                {trabalho.cidade}, {trabalho.bairro}
              </p>
            </div>
            <div>
              <strong>Créditos a gastar:</strong>
              <p>{trabalho.creditos}</p>
            </div>
            <div>
              <strong>Criado em:</strong>
              <p>{formatarData(trabalho.criadoEm)}</p>
            </div>
            <div>
              <strong>Publicado por:</strong>
              <p>{trabalho.cliente.nome}</p>
            </div>

            {candidatado ? (
              <>
                <div>
                  <strong>Contato:</strong>
                  <p>{trabalho.contato}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>Contato:</strong>
                  <p>Disponível após candidatura</p>
                </div>
              </>
            )}
          </div>

          {!candidatado && (
            <button className="btn-candidatar" onClick={handleCandidatar}>
              Candidatar-se
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
