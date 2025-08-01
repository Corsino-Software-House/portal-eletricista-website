import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import ProfessionalSearch from "../../components/ProfessionalSearch/ProfessionalSearch";
import "./styles.css"

export default function Search() {
  return (

    <>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
    <Header />
    <ProfessionalSearch />
     
    <Footer />
    </div>
    </>
  )
}