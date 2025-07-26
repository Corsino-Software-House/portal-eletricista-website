import React, { useState } from 'react';
import './styles.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export default function AlterarSenha() {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Senha Atual:', senhaAtual);
    console.log('Nova Senha:', novaSenha);
    // Aqui você chama a API para alterar a senha
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
    <Header />
    <div className="senha-container">
      <form className="senha-form" onSubmit={handleSubmit}>
        <h2>Alterar Senha</h2>

        <div className="form-group">
          <label htmlFor="senhaAtual">Senha Atual</label>
          <input
            type="password"
            id="senhaAtual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="novaSenha">Nova Senha</label>
          <input
            type="password"
            id="novaSenha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-salvar">Salvar</button>
      </form>
    </div>
    <Footer />
    </div>
    </>
  );
}
