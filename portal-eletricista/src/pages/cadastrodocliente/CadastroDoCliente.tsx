import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CadastroCliente from "../../components/cadastrocliente/FormCadastroCliente";
import "./styles.css";

export default function cadastrocliente() {
  return (
    <>
      
      <Header />
  
        <CadastroCliente />

      <Footer />
    </>
  );
}
