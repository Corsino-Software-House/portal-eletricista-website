import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import ProfessionalSearch from "../../components/ProfessionalSearch/ProfessionalSearch";
import "./styles.css"

export default function Search() {
  return (

    <>
   
    <Header />
    <ProfessionalSearch />
     <div style={{height: "10vh" }}>
    <Footer />
    </div>
    </>
  )
}