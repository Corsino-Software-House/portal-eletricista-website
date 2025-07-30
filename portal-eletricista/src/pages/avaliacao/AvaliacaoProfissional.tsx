import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AvaliacaoProfissional from "../../components/avaliacaoprofissional/AvaliacaoProfissional";   
import "./styles.css"

export default function avaliacao() {
  return (
    
    <>
    <Header />
    <section className="avaliacao-profissional">
    <AvaliacaoProfissional name="Nome do Profissional" />
    </section>
    <Footer />
    </>
    
  )
}