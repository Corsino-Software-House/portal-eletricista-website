import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import banner from "../../../public/banner.webp";
import Depoimentos from "../../components/depoimentos/Depoimentos";
import Chamados from "../../components/chamados/Chamados";
import "./styles.css"

export default function Inicio() {
  return (
  <>
    <Header />
    <section className="inicio">
      
      <div>
        <img className="banner" src={banner} alt="Banner" />
      </div>
      <h1 className="texth2">A Tech Manlight está presente em Lisboa, Setúbal, Porto e Algarve</h1>
      <h1 className="texth1">Serviços mais Procurados</h1>
      <Chamados />

      <Depoimentos />
  
    </section>


    <Footer />
  </>
   
  );
}
