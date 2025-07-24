import "./style.css";

export default function Header() {
  return (
    <header className="background">

      <img src="\src\img\logo1.jpg" alt="logo" style={{  marginLeft: '100px' }} />

      <div className="menu-principal">
        <a className="item" href="/">Início</a>
        <a className="item" href="/comofunciona">Como Funciona</a>
        <a className="item" href="/areadocliente">Área do Cliente</a>
        <a className="item" href="/areadoprofissional">Área do Profissional</a>
        <a className="item" href="/conta">Conta</a>
      </div>

    
    </header>

    
  );
}
