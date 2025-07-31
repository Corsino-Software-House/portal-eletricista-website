import "./style.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* O texto com o link */}
      <p className="footer-texto">
        <a className="footer-link" href="https://firstmedia.pt/">
          First Media - Todos os direitos reservados
        </a>
      </p>

      {/* A imagem dos bancos */}
      <img className="footer-logos" src="/bancoscartoes.webp" alt="Formas de pagamento" />
    </footer>
  );
}