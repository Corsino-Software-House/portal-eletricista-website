import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ProfissionalCard from '../../components/avalia/Avalia';
import { verProfissionais } from '../../services/cadastroProfissional.service';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

import './styles.css';

export default function AvaliarPage() {
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState('');
  const profissionaisPorPagina = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const carregarProfissionais = async () => {
      try {
        const data = await verProfissionais();
        setProfissionais(data);
      } catch (error) {
        console.error('Erro ao carregar profissionais:', error);
      }
    };

    carregarProfissionais();
  }, []);

  // Filtro de busca
  const profissionaisFiltrados = profissionais.filter((prof) => {
    const termo = busca.toLowerCase();
    return (
      prof.nome.toLowerCase().includes(termo) ||
      prof.especialidade?.toLowerCase().includes(termo)
    );
  });

  // Paginação
  const totalPaginas = Math.ceil(profissionaisFiltrados.length / profissionaisPorPagina);
  const inicioIndex = (paginaAtual - 1) * profissionaisPorPagina;
  const profissionaisExibidos = profissionaisFiltrados.slice(
    inicioIndex,
    inicioIndex + profissionaisPorPagina
  );

  const irParaPagina = (numero: number) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaAtual(numero);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
      <Header />
    <div style={{ padding: "10px" }}>
          <button
            onClick={() => navigate("/areadocliente/menu")}
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
      {/* Barra de busca */}
      <div className="barra-de-pesquisa">
        <input
          type="text"
          placeholder="Buscar por nome ou especialidade..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPaginaAtual(1); 
          }}
        />
      </div>

      {/* Lista de profissionais */}
      <div className="profissionais-container">
        {profissionaisExibidos.length > 0 ? (
          profissionaisExibidos.map((prof) => (
            <ProfissionalCard
               key={prof.id}
              id={prof.id}
              nome={prof.nome}
              especialidade={prof.especialidade}
              descricao={prof.descricao}
              imagemUrl={prof.fotoUrl }
            />
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>Nenhum profissional encontrado.</p>
        )}
      </div>

      {/* Navegação de páginas */}
      {totalPaginas > 1 && (
        <div className="paginacao">
          <button onClick={() => irParaPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
            Anterior
          </button>
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button onClick={() => irParaPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
            Próxima
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
