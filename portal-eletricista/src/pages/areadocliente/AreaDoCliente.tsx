import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import "./styles.css"
import FormCliente from "../../components/formcliente/FormCliente";
export default function AreaDoCliente() {
  return (
    
     <>
     <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
      <Header />
      <FormCliente />
      <Footer />
      </div>
  </>
  );
}