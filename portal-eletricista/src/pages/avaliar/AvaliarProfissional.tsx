import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ProfissionalCard from '../../components/avalia/Avalia';
import { verProfissionais } from '../../services/cadastroProfissional.service';

import './styles.css';

export default function AvaliarPage() {
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const profissionaisPorPagina = 6;

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

  const totalPaginas = Math.ceil(profissionais.length / profissionaisPorPagina);
  const inicioIndex = (paginaAtual - 1) * profissionaisPorPagina;
  const profissionaisExibidos = profissionais.slice(inicioIndex, inicioIndex + profissionaisPorPagina);

  const irParaPagina = (numero: number) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaAtual(numero);
    }
  };

  return (
    <>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>

    
      <Header />
      <div className="profissionais-container">
        {profissionaisExibidos.length > 0 ? (
          profissionaisExibidos.map((prof) => (
            <ProfissionalCard
              key={prof.id}
              id={prof.id}
              nome={prof.nome}
              cargo={prof.cargo}
              descricao={prof.descricao}
              imagemUrl={prof.fotoUrl}
            />
          ))
        ) : (
          <p>Carregando profissionais...</p>
        )}
      </div>

      {/* Navegação de páginas */}
      <div className="paginacao">
        <button onClick={() => irParaPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>Anterior</button>
        <span>Página {paginaAtual} de {totalPaginas}</span>
        <button onClick={() => irParaPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>Próxima</button>
      </div>

      <Footer />
      </div>
    </>
  );
}
