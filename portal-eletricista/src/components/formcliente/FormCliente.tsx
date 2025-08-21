import "./styles.css";
import { useForm } from "react-hook-form";
import { login } from "../../services/login.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/spinner/spinner"; // import do spinner

type FormData = {
  email: string;
  senha: string;
};

export default function FormCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const tipo = "cliente";

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const resposta = await login(data.email, data.senha, tipo);
      localStorage.setItem("email", data.email);
      localStorage.setItem("id", resposta.id);
      localStorage.setItem("tipo", tipo);
      sessionStorage.setItem("token", resposta.access_token);
      const redirect = localStorage.getItem("redirect");
      setMensagem("Login realizado com sucesso!");
      if (redirect === "true") {
        localStorage.removeItem("redirect");
        navigate("/agendamento");
        return;
      }else{
       navigate("/areadocliente/menu");
       return;
      }
    } catch (erro) {
      setMensagem("Erro ao fazer login. Verifique os dados.");
      console.error(erro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="form-cliente" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login do Cliente</h2>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && <p className="erro">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            {...register("senha", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
            })}
          />
          {errors.senha && <p className="erro">{errors.senha.message}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Acessar"}
        </button>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>

      <div className="login-client">
        <p>
          Ainda não tem conta?{" "}
          <strong>
            <a className="registro-cliente" href="/cadastro-cliente">
              Registre-se
            </a>
          </strong>
        </p>
        <p>
          Esqueceu a senha?{" "}
          <strong>
            <a className="registro-cliente" href="/cliente/esqueci-senha">
              Clique Aqui
            </a>
          </strong>
        </p>
      </div>
    </>
  );
}
