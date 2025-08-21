import  { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { listarUsosPorProfissional } from "../../services/usarCreditos.service";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Cliente = {
  id: number;
  nome: string;
  email: string;
  fotoUrl?: string;
  telefone?: string;
};

type Chamado = {
  id: number;
  titulo: string;
  descricao: string;
  cidade: string;
  bairro: string;
  especialidade: string;
  creditos?: number | null;
  criadoEm: string;
  status: string;
  cliente: Cliente;
  request: any
};

export default function ChamadosAgendados() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profissionalId = localStorage.getItem("id");
    if (!profissionalId) {
      setError("Profissional não identificado.");
      setLoading(false);
      return;
    }

    listarUsosPorProfissional(profissionalId)
      .then((data) => {
        setChamados(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar chamados.",);
        console.error(err)
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Header />
        <div style={{ padding: "10px" }}>
          <button
            onClick={() => navigate("/areadoprofissional/menu")}
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
        <div className="chamados-container">
          <h1>Projetos em que se candidatou</h1>

          {loading && <p>Carregando chamados...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="chamados-grid">
            {!loading && !error && chamados.length === 0 && (
              <p>Nenhum chamado encontrado.</p>
            )}

            {chamados.map((chamado) => (
              <div key={chamado.id} className="chamado-card">
                <h3>
                  Cliente: {chamado.request.cliente.nome ?? "Cliente não informado"}
                </h3>
                <p>
                  📅 {new Date(chamado.criadoEm).toLocaleDateString()} - 🕒{" "}
                  {new Date(chamado.criadoEm).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>Título: {chamado.request.titulo}</p>
                <p>Descrição: {chamado.request.descricao}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
