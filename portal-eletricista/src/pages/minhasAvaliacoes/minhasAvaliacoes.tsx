import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { buscarAvaliacoesPorProfissional } from "../../services/review.service";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Review = {
  id: number;
  nota: number;
  comentario: string;
  criadoEm: string;
  cliente: {
    nome: string;
    fotoUrl?: string;
  };
};

const AVALIACOES_POR_PAGINA = 3;

export default function MinhasAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Review[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const totalPaginas = Math.ceil(avaliacoes.length / AVALIACOES_POR_PAGINA);

  useEffect(() => {
    const profissionalId = localStorage.getItem("id");
    if (!profissionalId) return;

    buscarAvaliacoesPorProfissional(Number(profissionalId))
      .then(setAvaliacoes)
      .catch((err) => console.error("Erro ao buscar avaliações:", err))
      .finally(() => setLoading(false));
  }, []);

  const indiceInicial = (paginaAtual - 1) * AVALIACOES_POR_PAGINA;
  const indiceFinal = indiceInicial + AVALIACOES_POR_PAGINA;
  const avaliacoesPaginadas = avaliacoes.slice(indiceInicial, indiceFinal);

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100vh",
    }}>
      <Header />
      <div style={{ padding: "10px",background: "#f2f4f8"}}>
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
      <div className="avaliacoes-section">
        <h1>Minhas Avaliações</h1>

        {loading ? (
          <p>Carregando avaliações...</p>
        ) : avaliacoes.length === 0 ? (
          <p>Nenhuma avaliação encontrada.</p>
        ) : (
          <>
            {avaliacoesPaginadas.map((review) => (
              <div className="avaliacao-card" key={review.id}>
                <div className="stars">
                  {"★".repeat(review.nota) + "☆".repeat(5 - review.nota)}
                </div>
                <p>"{review.comentario}"</p>
                <span>— {review.cliente.nome}</span>
              </div>
            ))}

            <div className="paginacao">
              <button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1}>
                 Anterior
              </button>
              <span>Página {paginaAtual} de {totalPaginas}</span>
              <button onClick={irParaProximaPagina} disabled={paginaAtual === totalPaginas}>
                Próxima 
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
