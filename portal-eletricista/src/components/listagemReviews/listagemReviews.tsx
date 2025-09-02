// ListagemReviews.tsx
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import "./reviewsStyles.css"; // Alterei o nome do arquivo CSS também
import {
  buscarTodasAvaliacoes,
  aprovarReview,
  negarReview,
  excluirReview,
} from "../../services/review.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Review {
  id: number;
  nota: number;
  comentario: string;
  criadoEm: string;
  status: "ESPERA" | "APROVADO" | "REPROVADO";
  cliente: {
    nome: string;
    fotoUrl?: string;
  };
}

const ListagemReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "TODOS" | "ESPERA" | "APROVADO" | "REPROVADO"
  >("TODOS");

  const navigate = useNavigate();

  useEffect(() => {
    const carregarReviews = async () => {
      try {
        setLoading(true);
        const data = await buscarTodasAvaliacoes();
        const padronizado = data.map((r: any) => ({
          ...r,
          status: r.status === "NEGADO" ? "REPROVADO" : r.status,
        }));
        setReviews(padronizado);
      } catch (error) {
        console.error("Erro ao carregar reviews:", error);
        Swal.fire("Erro", "Erro ao buscar reviews.", "error");
      } finally {
        setLoading(false);
      }
    };

    carregarReviews();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleAprovar = async (id: number) => {
    try {
      await aprovarReview(id);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "APROVADO" } : r))
      );
      Swal.fire("Sucesso", "Review aprovada!", "success");
    } catch (error) {
        console.log(" id da review", id);
      console.error("Erro ao aprovar review:", error);
      Swal.fire("Erro", "Erro ao aprovar review.", "error");
    }
  };

  const handleNegar = async (id: number) => {
    try {
      await negarReview(id);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "REPROVADO" } : r))
      );
      Swal.fire("Sucesso", "Review reprovada!", "success");
    } catch (error) {
      console.error("Erro ao negar review:", error);
      Swal.fire("Erro", "Erro ao reprovar review.", "error");
    }
  };

  const handleExcluir = async (id: number) => {
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
        await excluirReview(id);
        setReviews((prev) => prev.filter((r) => r.id !== id));
        Swal.fire("Excluído!", "Review excluída com sucesso.", "success");
      } catch (error) {
        console.error("Erro ao excluir review:", error);
        Swal.fire("Erro", "Erro ao excluir review.", "error");
      }
    }
  };

  const reviewsFiltradas = reviews.filter((review) => {
    const matchesSearch =
      review.comentario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "TODOS" || review.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="reviews-dashboard">
      <aside className="reviews-sidebar">
        <h2 className="reviews-sidebar-title">Painel</h2>
        <ul className="reviews-sidebar-menu">
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
          <li>
            <strong>
              <a href="/listagem-reviews">Reviews</a>
            </strong>
          </li>
        </ul>
        <button onClick={handleLogout} className="reviews-logout-btn">
          Sair
        </button>
      </aside>

      <main className="reviews-main-content">
        <div className="reviews-header">
          <h2>Listagem de Reviews</h2>
        </div>

        <div className="reviews-filters">
          <input
            type="text"
            placeholder="Pesquisar por comentário ou cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="reviews-search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="reviews-status-select"
          >
            <option value="TODOS">Todos</option>
            <option value="ESPERA">Pendente</option>
            <option value="APROVADO">Aprovado</option>
            <option value="REPROVADO">Reprovado</option>
          </select>
        </div>

        <div className="reviews-list-container">
          {loading ? (
            <p>Carregando reviews...</p>
          ) : reviewsFiltradas.length === 0 ? (
            <p className="reviews-no-items">Nenhuma review encontrada.</p>
          ) : (
            <div className="reviews-grid">
              {reviewsFiltradas.map((review) => (
                <div key={review.id} className="reviews-card">
                  <h3 className="reviews-card-title">Cliente: {review.cliente.nome}</h3>
                  <p className="reviews-card-comment">{review.comentario}</p>
                  <p className="reviews-card-status">
                    <strong>Status:</strong> {review.status}
                  </p>
                  <p className="reviews-card-rating">
                    <strong>Nota:</strong> {review.nota}/5
                  </p>
                  <p className="reviews-card-date">
                    <strong>Criado em:</strong>{" "}
                    {new Date(review.criadoEm).toLocaleDateString()}
                  </p>

                  <div className="reviews-card-actions">
                    {review.status === "ESPERA" && (
                      <>
                        <button
                          onClick={() => handleAprovar(review.id)}
                          className="reviews-btn-approve"
                        >
                          Aprovar
                        </button>
                        <button
                          onClick={() => handleNegar(review.id)}
                          className="reviews-btn-reject"
                        >
                          Negar
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleExcluir(review.id)}
                      className="reviews-btn-delete"
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

export default ListagemReviews;
