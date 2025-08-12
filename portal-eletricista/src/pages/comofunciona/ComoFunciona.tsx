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
          <h2>COMO FUNCIONA PARA O CLIENTE</h2>
          <p>
            1. Escolha o serviço certo, com ajuda se precisar <br />
            Diga-nos o que precisa — instalação elétrica, domótica, reparação ou outro serviço técnico.<br />
            Se tiver dúvidas, fala com o nosso Assistente Inteligente (ou humano!) que o orienta de forma clara e gratuita.<br />
            Nada de orçamentos confusos ou categorias erradas. <br />
            Aqui, entende o que está a contratar desde o início. <br /><br />

            2. Veja técnicos disponíveis e agende em poucos cliques<br />
            Receba propostas de técnicos qualificados e avaliados, com insígnias de confiança, histórico de pontualidade e serviços realizados.<br />
            Ou então, se preferir rapidez, agende logo com um técnico disponível — sem esperar respostas nem ficar no escuro.<br />
            Mais que orçamentos: você controla o tempo, o técnico e o processo. <br /><br />

            3. Serviço com Garantia e Acompanhamento Real<br />
            Após o serviço, continuamos consigo. Tem garantia técnica de até 14 dias e um painel onde acompanha tudo: fotos, progresso, e o que foi feito.<br />
            E se algo não correr bem, a Tech Manlight resolve. Sem rodeios.<br />
            Transparência, suporte humano e segurança — como deve ser. <br />

          </p>
        </section>

        <section className="funciona-etapas">
          <h2>COMO FUNCIONA PARA O TÉCNICO</h2>
         <p>
          Tech Manlight. Aqui o técnico é respeitado, o cliente é acompanhado e o serviço é garantido. Junta-se a uma plataforma feita para si. <br />
          Aumente o seu volume de negócio facilmente, na TECHMANLIGHT você pode encontrar novos e novas clientes que procuram profissionais da sua área, e aumentar o seu volume de negócio.<br />
          Como? É bastante simples!<br />
          Os e as clientes dizem-nos o que precisam e nós enviamos para si os detalhes dos serviços requeridos, gratuitamente.<br />
          Se tiver interesse e disponibilidade em realizar o serviço solicitado, envie a sua proposta de orçamento e faça o seguimento do pedido para conseguir o trabalho.<br /><br />

          1. Regista-te e ganha visibilidade real<br />
          Crie o seu perfil técnico, mostre as suas especialidades, experiências e disponibilidade.<br />
          Recebe insígnias como “Verificado”, “Domótica Expert”, “Top Avaliado” — e ganhe destaque com base no que faz, não no que paga.<br />
          Na Tech Manlight, o profissional bom tem lugar de destaque. Aqui você é visto.<br /><br />

          2. Receba pedidos reais, com suporte e segurança<br />
          Nada de leads aleatórios. Aqui, recebe pedidos validados, com descrição clara, localização, e, se precisar, apoio da equipa Tech Manlight.<br />
          Pode optar por créditos, comissão por serviço ou planos mensais com garantia de retorno.<br />
          Escolha como quer trabalhar e nunca perca dinheiro à toa.<br /><br />

          3. Faça o serviço com qualidade — e ganhe muito mais que dinheiro<br />
          Ao concluir o serviço, ganha avaliações públicas, destaque no ranking e acesso a vantagens exclusivas:<br />
          ✔Acompanhamento de obra via app<br />
          ✔ Acesso a materiais com desconto ou cashback<br />
          ✔ Canal direto com clientes recorrentes<br />
          ✔ Painel com histórico, fotos e evolução dos serviços<br /><br />

          
          Aqui, valorizamos quem faz bem feito. Você é técnico, mas também é parceiro.



         </p>
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
