import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function MinhasAvaliacoes() {
  return (
    <>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
    <Header />
    <div className="avaliacoes-section">
      <h1>Minhas Avaliações</h1>
      <div className="avaliacao-card">
        <div className="stars">⭐⭐⭐⭐⭐</div>
        <p>"Excelente profissional, resolveu tudo com rapidez."</p>
        <span>— Lucas Souza</span>
      </div>
      <div className="avaliacao-card">
        <div className="stars">⭐⭐⭐⭐☆</div>
        <p>"Serviço muito bom, só atrasou um pouco."</p>
        <span>— Ana Paula</span>
      </div>
    </div>
    <Footer />
    </div>
    </>
  );
}
