
import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function ChamadosAgendados() {
  return (
    <>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
    <Header />
    <div className="chamados-container">
      <h1>Chamados Agendados</h1>
      <div className="chamados-grid">
        <div className="chamado-card">
          <h3>Cliente: João da Silva</h3>
          <p>📅 10/08/2025 - 🕒 14:00</p>
          <span className="status confirmado">Confirmado</span>
        </div>
        <div className="chamado-card">
          <h3>Cliente: Carla Mendes</h3>
          <p>📅 15/08/2025 - 🕒 10:00</p>
          <span className="status pendente">Pendente</span>
        </div>
      </div>
    </div>
    <Footer />
    </div>
    </>
  );
}
