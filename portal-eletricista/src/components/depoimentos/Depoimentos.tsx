import './styles.css';

export default function Depoimentos() {
  return (
    <>
       <section className="depoimentos">
          <h2>O que nossos clientes dizem</h2>
          <div className="cards">

            <div className="card">
              <img src="\src\img\client.svg" alt="Reviewer name"></img>
              <h3>Reviewer name</h3>
              <p className="cargo">Cliente</p>
              <p className="texto">"Excelente serviço! Fui atendido com rapidez e eficiência. Recomendo muito."</p>
            </div>

            <div className="card">
              <img src="\src\img\client.svg" alt="Reviewer name"></img>
              <h3>Reviewer name</h3>
              <p className="cargo">Cliente</p>
              <p className="texto">"Atendimento impecável e suporte técnico de primeira qualidade. Amei tudo!"</p>
            </div>

            <div className="card">
              <img src="\src\img\client.svg" alt="Reviewer name"></img>
              <h3>Reviewer name</h3>
              <p className="cargo">Cliente</p>
              <p className="texto">"Muito satisfeito com o resultado. A equipe é extremamente competente."</p>
            </div>
          </div>
        </section>

        {/* PROFISSIONAIS MAIS AVALIADOS */}

        <section className="depoimentos">
          <h2>Profissionais Mais Avaliados</h2>
          <div className="cards">

            <div className="card">
              <img src="\src\img\casemiro.svg" alt="Reviewer name"></img>
              <h3>Casemiro</h3>
              ⭐ ⭐ ⭐ ⭐ ⭐
            </div>

            <div className="card">
              <img src="\src\img\felipe.svg" alt="Reviewer name"></img>
              <h3>Felipe</h3>  
              ⭐ ⭐ ⭐ ⭐ ⭐              
            </div>
             
            <div className="card">
              <img src="\src\img\rodrigo.svg" alt="Reviewer name"></img>
               
              <h3>Rodrigo</h3>
               ⭐ ⭐ ⭐ ⭐ ⭐
            </div>
          </div>
        </section>
        <br/>
    </>
  );
}