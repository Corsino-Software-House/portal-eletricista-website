import { useState } from 'react';
import "./style.css";

export default function Header() {
  // Estado para controlar a visibilidade do menu mobile
  const [menuAberto, setMenuAberto] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className="background">
      <a href="https://techmanlight.pt/">
      <img src="/logo1.jpg" alt="logo" className="logo" />
      </a>

      {/* Botão Hambúrguer (só aparece em telas pequenas) */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      
      {/* Menu de Navegação Único.
        A classe 'active' será adicionada quando menuAberto for true.
      */}
      <nav className={`menu-nav ${menuAberto ? 'active' : ''}`}>
        <a className="item" href="/">Início</a>
        <a className="item" href="/comofunciona">Como Funciona</a>
        <a className="item" href="/areadocliente">Área do Cliente</a>
        <a className="item" href="/areadoprofissional">Área do Profissional</a>
        <a className="item" href="/creditos">Créditos</a>
      </nav>
    </header>
  );
}