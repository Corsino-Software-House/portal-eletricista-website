import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import ContaInfo from "../../components/contaInfo/ContaInfo"
import ContaOpcoes from "../../components/contaOpcoes/ContaOpcoes"
import "./styles.css"

export default function Conta() {
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
     <main className="conta-container">
        <h1 className="conta-title">Minha Conta</h1>
        <ContaInfo />
        <ContaOpcoes />
      </main>
    <Footer />
    </div>
    </>
  )
}