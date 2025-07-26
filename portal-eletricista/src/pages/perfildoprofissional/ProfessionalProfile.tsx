import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import ProfessionalProfile from "../../components/ProfessionalProfile/ProfessionalProfile"
import "./styles.css"

const profissionalExemplo = {
  id: 1,
  nome: 'Mariana Oliveira',
  especialidade: 'Técnica em Segurança Elétrica',
  cidade: 'São Paulo',
  descricao: 'Profissional com 8 anos de experiência em instalações elétricas, segurança residencial e manutenção preventiva. Atende com qualidade, pontualidade e foco na segurança do cliente.',
  fotoUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
};


export default function Conta() {
  return (

    <>
    <Header />
    <ProfessionalProfile profissional={profissionalExemplo} />
    <Footer />
    </>
  )
}