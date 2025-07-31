import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import ProfessionalProfile from "../../components/ProfessionalProfile/ProfessionalProfile"
import "./styles.css"


export default function Conta() {
  return (

    <>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
    <Header />
    <ProfessionalProfile />
    <Footer />
    </div>
    </>
  )
}