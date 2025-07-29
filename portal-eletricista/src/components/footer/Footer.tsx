import "./style.css";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <section className="footer-content">
        <p className="texto">
          <a className="linkfooter" href="https://firstmedia.pt/">First Media - Todos os direitos reservados</a>
        </p>
        </section>
        <section className="logo-bancos">
          <img src="/bancoscartoes.webp" alt="logo" width={200}/>
          
        </section>

      </footer>
      
    </>
  );
}
