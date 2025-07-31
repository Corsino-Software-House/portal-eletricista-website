import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AvaliacaoProfissional from "../../components/avaliacaoprofissional/AvaliacaoProfissional";   
import "./styles.css";

export default function Avaliacao() {
  return (
    <>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
      <Header />
      <section className="avaliacao-profissional">
        <AvaliacaoProfissional />
      </section>
      <Footer />
      </div>
    </>
  );
}
