import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import BookingForm from '../../components/BookingForm/BookingForm';
import './Styles.css'


export default function agendamento() {
  return (
    <>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
      
        <Header />
        <BookingForm />
        <Footer />
        </div>
      
    </>
  );
}