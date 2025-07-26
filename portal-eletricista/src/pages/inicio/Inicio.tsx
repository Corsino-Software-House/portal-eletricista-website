import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import banner from "../../../public/img/banner.webp";
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
      <h1 className="texth1">Chamados mais Pedidos</h1>
      <Chamados />

      <Depoimentos />
  
    </section>


    <Footer />
  </>
   
  );
}
