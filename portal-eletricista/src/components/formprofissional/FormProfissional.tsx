import "./styles.css";

export default function AuthFormProfissional() {
  return (
    <>
      <form className="form-profissional">
        <h2>Login do Profissional</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Acessar</button>
      </form>

      <div className="login-client">
        <p>
          Ainda não tem conta?{" "}
          <strong>
            <a className="registro-cliente" href="http://localhost:5173/cadastro-profissional">
              Registre-se
            </a>
          </strong>
        </p>
      </div>
    </>
  );
}