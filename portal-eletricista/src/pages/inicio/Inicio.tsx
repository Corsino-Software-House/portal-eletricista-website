import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import banner from "../../img/banner.webp"
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
  
    </section>

    <section>
      <div>
        <p className="tex">Testando</p>
      </div>
    </section>

    <Footer />
  </>

  );
}
