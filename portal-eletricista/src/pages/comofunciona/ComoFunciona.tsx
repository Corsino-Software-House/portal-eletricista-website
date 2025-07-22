import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import "./styles.css"
export default function ComoFunciona() {
  return (
    
    <>
    <Header />
    <div className="como-funciona-container">
      <section className="hero">
        <h1>Como Funciona a Tech Manlight ?</h1>
        <p>Conectamos pessoas e empresas a eletricistas e técnicos especializados com confiança e rapidez.</p>
      </section>

      <section className="funciona-etapas">
        <h2>O que você faz?</h2>
        <p>
          Oferecemos uma plataforma digital exclusiva para quem procura serviços de eletricidade ou domótica, reunindo técnicos avaliados, orçamentos rápidos e um sistema inteligente de intermediação.
        </p>
      </section>

      <section className="funciona-etapas">
        <h2>Como funciona?</h2>
        <ul>
          <li>📌 Publique o serviço que precisa (ex: instalar vídeo porteiro, corrigir falhas elétricas)</li>
          <li>📲 Técnicos certificados recebem notificações e enviam orçamentos</li>
          <li>👥 Compare avaliações, experiência e preços</li>
          <li>🔐 O sistema regula o acesso com créditos e cobra comissão apenas por serviços fechados</li>
          <li>🚀 Garantimos agilidade, segurança e qualidade no atendimento</li>
        </ul>
      </section>

      <section className="beneficios">
        <h2>Por que escolher a Tech Manlight?</h2>
        <div className="cards">
          <div className="card">
            <h3>✔️ Publicação Rápida</h3>
            <p>Publique seu pedido em menos de 2 minutos</p>
          </div>
          <div className="card">
            <h3>✔️ Propostas Qualificadas</h3>
            <p>Receba propostas de técnicos avaliados e certificados</p>
          </div>
          <div className="card">
            <h3>✔️ Comparação Inteligente</h3>
            <p>Compare perfis, preços e avaliações com facilidade</p>
          </div>
          <div className="card">
            <h3>✔️ Controle e Segurança</h3>
            <p>Acompanhe todo o processo pela nossa plataforma</p>
          </div>
        </div>
      </section>

      <section className="tecnicos">
        <h2>🔧 Para Técnicos e Empresas</h2>
        <p>
          Registe-se gratuitamente, ganhe visibilidade e receba pedidos de clientes todos os dias. Use créditos para aceder propostas e aumente sua receita com segurança.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
}

