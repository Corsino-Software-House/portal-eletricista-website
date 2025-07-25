import { useForm } from "react-hook-form";
import "./styles.css";
import { cadastroCliente } from "../../services/cadastroCliente.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormData = {
  nome: string;
  email: string;
  senha: string;
};

export default function CadastroCliente() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const resposta = await cadastroCliente(data.nome, data.email, data.senha);
      setMensagem("Cliente cadastrado com sucesso!");
      console.log(resposta);
      reset();
      navigate("/areadocliente");
    } catch (erro) {
      setMensagem("Erro ao cadastrar. Verifique os dados.");
      console.error(erro);
    }
  };

  return (
    <form className="cadastro-cliente" onSubmit={handleSubmit(onSubmit)}>
      <h2>Cadastro do Cliente</h2>

      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          {...register("nome", { required: "Nome é obrigatório" })}
        />
        {errors.nome && <p className="erro">{errors.nome.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Formato de email inválido",
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

      <button type="submit">Cadastrar-se</button>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </form>
  );
}
