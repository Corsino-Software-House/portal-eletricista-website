import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Avaliar from '../../components/avalia/Avalia';

import './styles.css'


export default function avaliar() {
  return (
    <>
      
        <Header />
            <Avaliar nome="Nome do Profissional" cargo="Cargo do Profissional" descricao="Descrição do profissional" />
        <Footer />
      
    </>
  );
}