import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { verProfissionais } from "../../services/cadastroProfissional.service";

type Professional = {
  id: number;
  nome: string;
  especialidade: string;
  cidade: string;
};

const ITEMS_POR_PAGINA = 10;

const ProfessionalSearch: React.FC = () => {
  const [busca, setBusca] = useState("");
  const [profissionais, setProfissionais] = useState<Professional[]>([]);
  const [pagina, setPagina] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    verProfissionais()
      .then((data) => setProfissionais(data))
      .catch((err) => console.error("Erro ao buscar profissionais:", err));
  }, []);

  const filtrados = profissionais.filter((prof) =>
    `${prof.nome} ${prof.especialidade} ${prof.cidade}`
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA);
  const itensPagina = filtrados.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  );

  return (
    <>
      <div className="search-container">
        <h2>Encontre um Profissional</h2>
        <input
          type="text"
          placeholder="Buscar por nome, especialidade ou cidade..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPagina(1);
          }}
        />

        <ul className="professional-list">
          {itensPagina.length > 0 ? (
            itensPagina.map((prof) => (
              <li key={prof.id} className="professional-card">
                <h3>{prof.nome}</h3>
                <p>Especialidade: {prof.especialidade}</p>
                <p>Cidade: {prof.cidade}</p>
                <button onClick={() => navigate(`/profissionais/${prof.id}`)}>
                  Ver
                </button>
              </li>
            ))
          ) : (
            <li className="no-results">Nenhum profissional encontrado.</li>
          )}
        </ul>

        <div className="pagination">
          <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
            Anterior
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfessionalSearch;
