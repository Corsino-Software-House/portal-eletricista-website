import "./styles.css";

export default function CadastroProfissional() {
  return (
    <>
      <form className="cadastro-prossional">
        <h2>Cadastro do Profissional</h2>

        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="name" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

      
        <button type="submit">Cadastra-se</button>
      </form>
    </>
  );
}