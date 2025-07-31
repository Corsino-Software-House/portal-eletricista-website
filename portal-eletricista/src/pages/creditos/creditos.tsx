import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function PlanosDeCreditos() {
  const planos = [
    { nome: "Básico", preco: 25, creditos: 20 },
    { nome: "Poupança", preco: 60, creditos: 60 },
    { nome: "Profissional", preco: 90, creditos: 100 },
    { nome: "Elite", preco: 120, creditos: 150 }
  ];

  return (
    <>
    <Header />
    <div className="creditos-wrapper">
      <h1>Adquira Créditos</h1>
      <p className="sub-info">
        Escolha o plano ideal para você e aumente suas chances de conseguir trabalhos.
      </p>

      <div className="planos-grid">
        {planos.map((plano, index) => (
          <div
            className={`plano-card ${plano.nome === "Elite" ? "destaque" : ""}`}
            key={index}
          >
            <h2>{plano.nome}</h2>
            <p className="preco">€ {plano.preco.toFixed(2)}</p>
            <p className="creditos">{plano.creditos} créditos</p>
            <button className="btn-adquirir">Adquirir</button>
          </div>
        ))}
      </div>

      <div className="info-final">
        <h3>⚠️ Informação Importante</h3>
        <p>
          A cada orçamento será atribuído, em BackOffice, o número respectivo de créditos,
          dependendo da complexidade de cada projeto.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
