import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarTodasRequests } from "../../services/request.service";
import { ArrowLeft } from "lucide-react";

type Request = {
  id: number;
  titulo: string;
  descricao: string;
  cidade: string;
  bairro: string;
  especialidade: string;
  clienteId: number;
  concluido: boolean;
};

const ITEMS_PER_PAGE = 12;

export default function BuscarTrabalhos() {
  const navigate = useNavigate();
  const [trabalhos, setTrabalhos] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    buscarTodasRequests()
      .then((res) => setTrabalhos(res))
      .catch((err) => console.error("Erro ao buscar trabalhos:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filtra os trabalhos pelo termo de pesquisa
  const trabalhosFiltrados = trabalhos.filter((trabalho) =>
    trabalho.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(trabalhosFiltrados.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTrabalhos = trabalhosFiltrados.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (direction: "prev" | "next") => {
    setCurrentPage((prev) => {
      if (direction === "prev" && prev > 1) return prev - 1;
      if (direction === "next" && prev < totalPages) return prev + 1;
      return prev;
    });
  };

  return (
    <>
      <Header />
      <div style={{ padding: "10px", background: "#f2f4f8" }}>
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
      <div className="trabalhos-wrapper">
        <h1>Buscar Trabalhos</h1>

        {/* Campo de pesquisa */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Pesquisar por título..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reinicia a paginação ao buscar
            }}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {loading ? (
          <p>Carregando trabalhos...</p>
        ) : trabalhosFiltrados.length === 0 ? (
          <p>Nenhum trabalho encontrado.</p>
        ) : (
          <>
            <div className="trabalhos-grid">
              {currentTrabalhos.map((trabalho) => (
                <div className="trabalho-card" key={trabalho.id}>
                  <h2>{trabalho.titulo}</h2>
                  <p className="descricao">{trabalho.descricao}</p>
                  <p>
                    <strong>Especialidade:</strong> {trabalho.especialidade}
                  </p>
                  <p>
                    <strong>Local:</strong> {trabalho.bairro}, {trabalho.cidade}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/areadoprofissional/detalhes-chamado/${trabalho.id}`, {
                        state: trabalho,
                      })
                    }
                  >
                    Candidatar-se
                  </button>
                </div>
              ))}
            </div>

            {/* Controles de Paginação */}
            <div className="paginacao">
              <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                Próxima
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
