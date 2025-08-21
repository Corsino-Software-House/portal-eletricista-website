import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import ContaInfo from "../../components/contaInfo/ContaInfo"
import ContaOpcoes from "../../components/contaOpcoes/ContaOpcoes"
import "./styles.css"
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Conta() {
  const navigate = useNavigate();

  const handleBack = () => {
    const userType = localStorage.getItem("tipo"); 

    if (userType === "profissional") {
      navigate("/areadoprofissional/menu");
    } else {
      // default ou se for cliente
      navigate("/areadocliente/menu");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Header />

        <div style={{ padding: "10px" }}>
          <button
            onClick={handleBack}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "16px",
              color: "#3259daff",
            }}
          >
            <ArrowLeft size={22} />
            Voltar
          </button>
        </div>

        <main className="conta-container">
          <h1 className="conta-title">Minha Conta</h1>
          <ContaInfo />
          <ContaOpcoes />
        </main>

        <Footer />
      </div>
    </>
  );
}
