import "./style.css";

export default function Chamados() {
  return (
    <>
      <section className="chamado">
        <div className="chamado__container">
          <div className="chamado__item">
            <img src="\src\img\Concerto.svg" alt="Concerto de fio descapado" />
            <div className="chamado__texto">
              <h3>Concerto de fio descapado</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum sodales venenatis. Nam sit amet convallis urna, eu sagittis magna. Vivamus sed maximus ipsum. Mauris tincidunt, diam vitae commodo pellentesque...</p>
              <button className="chamado__botao">Solicitar Chamado</button>
            </div>
          </div>

          <div className="chamado__item">
            <img src="\src\img\Troca Disjuntor.svg" alt="Troca de disjuntor" />
            <div className="chamado__texto">
              <h3>Troca de disjuntor</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum sodales venenatis. Nam sit amet convallis urna, eu sagittis magna. Vivamus sed maximus ipsum. Mauris tincidunt, diam vitae commodo pellentesque...</p>
              <button className="chamado__botao">Solicitar Chamado</button>
            </div>
          </div>

          <div className="chamado__item">
            <img src="\src\img\Concerto Tomada.svg" alt="Concerto de Tomada" />
            <div className="chamado__texto">
              <h3>Concerto de Tomada</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum sodales venenatis. Nam sit amet convallis urna, eu sagittis magna. Vivamus sed maximus ipsum. Mauris tincidunt, diam vitae commodo pellentesque...</p>
              <button className="chamado__botao">Solicitar Chamado</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
