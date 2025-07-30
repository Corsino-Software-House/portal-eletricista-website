
import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function DetalhesDoChamado() {
  const trabalho = {
    titulo: "Troca de disjuntores",
    descricao: "Trocar 3 disjuntores queimados no quadro principal. É necessário levar ferramentas básicas.",
    especialidade: "Residencial",
    local: "Centro",
    valor: 200,
    usuario: "João da Silva",
    data: "10/08/2025",
    horario: "14:00"
  };

  return (
    <>
    <Header />
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
            <p>{trabalho.local}</p>
          </div>
          <div>
            <strong>Valor:</strong>
            <p>R$ {trabalho.valor}</p>
          </div>
          <div>
            <strong>Data:</strong>
            <p>{trabalho.data} às {trabalho.horario}</p>
          </div>
          <div>
            <strong>Publicado por:</strong>
            <p>{trabalho.usuario}</p>
          </div>
        </div>

        <button className="btn-candidatar">Candidatar-se</button>
      </div>
    </div>
    <Footer />
    </>
  );
}
