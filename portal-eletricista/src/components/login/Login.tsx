import React from 'react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-form">
        <h2>Administrador</h2>
        <form>
          <input type="email" placeholder="E-mail:" required />
          <input type="password" placeholder="Senha:" required />
          <button type="submit">Entrar</button>
          <a href="#">Esqueceu a senha? <strong>Clique aqui</strong></a>
          <a href="#">Cadastra-se</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
