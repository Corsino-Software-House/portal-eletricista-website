import React from 'react';
import './Cadastro.css';

const Cadastro: React.FC = () => {
  return (
    <div className="cadastro-container">
      <div className="cadastro-image"></div>
      <div className="cadastro-form">
        <h2>Cadastro</h2>
        <form>
          <input type="text" placeholder="Nome:" required />
          <input type="email" placeholder="E-mail:" required />
          <input type="password" placeholder="Senha:" required />
          <input type="password" placeholder="Confirmar Senha:" required />
          <button type="submit">Cadastrar-se</button>
          <a href="#">Acesso de <strong>Login</strong></a>
          
        </form>
        
      </div>
    </div>
  );
};

export default Cadastro;