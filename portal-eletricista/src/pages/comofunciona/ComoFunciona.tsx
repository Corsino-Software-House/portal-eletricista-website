import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./styles.css";
export default function ComoFunciona() {
  return (
    <>
      <Header />
      <div className="como-funciona-container">
        <section className="hero">
          <h1>Como Funciona a Tech Manlight ?</h1>
          <p>
            Conectamos pessoas e empresas a eletricistas e técnicos
            especializados com confiança e rapidez.
          </p>
        </section>

        <section className="funciona-etapas">
          <h2>O que você faz?</h2>
          <p>
            Oferecemos uma plataforma digital exclusiva para quem procura
            serviços de eletricidade ou domótica, reunindo técnicos avaliados,
            orçamentos rápidos e um sistema inteligente de intermediação.
          </p>
        </section>

        <section className="funciona-etapas">
          <h2>Como funciona?</h2>
          <p>Na Tech Manlight, tornamos fácil e rápido encontrar um técnico qualificado para 
            resolver problemas elétricos, de canalização ou manutenções gerais — com segurança, 
            qualidade e sem complicações.</p>
          <ul>
            <li>
              <strong>Faça o seu pedido online:</strong><br/> Indique o tipo de serviço (eletricidade, canalização, smart home, etc.), a sua localização e a urgência.
            </li>
            <li>
              <strong>Receba um técnico certificado:</strong><br/> Enviamos-lhe profissionais experientes e avaliados, com competência comprovada e apoio técnico permanente.
            </li>
            <li>
              <strong>Pague de forma segura:</strong><br/> O pagamento é feito com total segurança através da nossa plataforma. Só paga depois de o serviço estar concluído com sucesso.
              </li>
            
          </ul>

          <section>
            <p>Seja para uma instalação elétrica, reparação de fugas de água ou automatização da sua casa, os nossos técnicos estão prontos para ajudar — 24 horas por dia.</p>
            <p><strong>Com a Tech Manlight, poupa tempo, evita surpresas e tem total controlo sobre os serviços na sua casa.</strong></p>

          </section>
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
            <div className="card">
              <h3>✔️ Nossos Diferenciais Exclusivos</h3>
              <p> Garantia Técnica Integrada Serviço com garantia de 7 a 14 dias após conclusão.</p>
            </div>
            <div className="card">
              <h3>✔️ Mais garantias</h3>
              <p> A plataforma acompanha o cliente até o fim do processo.<br/>
               Resultado: confiança real + redução de conflitos.</p>
            </div>
          </div>
        </section>

        <section className="tecnicos">
          <h2>Para Técnicos e Empresas</h2>
          <p>
            Registe-se gratuitamente, ganhe visibilidade e receba pedidos de
            clientes todos os dias. Use créditos para aceder propostas e aumente
            sua receita com segurança.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}
