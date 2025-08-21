import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import ProfessionalSearch from "../../components/ProfessionalSearch/ProfessionalSearch";
import "./styles.css"
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Search() {
  const navigate = useNavigate();
  return (

    <>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
    <Header />
      <div style={{ padding: "10px" }}>
          <button
            onClick={() => navigate("/areadocliente/menu")}
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
    <ProfessionalSearch />
    <Footer />
    </div>
    </>
  )
}