import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarTodasRequests } from "../../services/request.service";

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

  const totalPages = Math.ceil(trabalhos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTrabalhos = trabalhos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    buscarTodasRequests()
      .then((res) => setTrabalhos(res))
      .catch((err) => console.error("Erro ao buscar trabalhos:", err))
      .finally(() => setLoading(false));
  }, []);

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

      <div className="trabalhos-wrapper">
        <h1>Buscar Trabalhos</h1>

        {loading ? (
          <p>Carregando trabalhos...</p>
        ) : trabalhos.length === 0 ? (
          <p>Nenhum trabalho disponível no momento.</p>
        ) : (
          <>
            <div className="trabalhos-grid">
              {currentTrabalhos.map((trabalho) => (
                <div className="trabalho-card" key={trabalho.id}>
                  <h2>{trabalho.titulo}</h2>
                  <p className="descricao">{trabalho.descricao}</p>
                  <p><strong>Especialidade:</strong> {trabalho.especialidade}</p>
                  <p><strong>Local:</strong> {trabalho.bairro}, {trabalho.cidade}</p>
                  <button
                    onClick={() =>
                      navigate("/areadoprofissional/detalhes-chamado", { state: trabalho })
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
              <span>Página {currentPage} de {totalPages}</span>
              <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
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
