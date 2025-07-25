import "./styles.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cadastroProfissional } from "../../services/cadastroProfissional.service";
import { useNavigate } from "react-router-dom";

type FormData = {
  nome: string;
  email: string;
  senha: string;
  cidade: string;
  bairro: string;
};

export default function CadastroProfissional() {
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
      const resposta = await cadastroProfissional(
        data.nome,
        data.email,
        data.senha,
        data.cidade,
        data.bairro
      );
      localStorage.setItem("profissionalId", String(resposta.id));
      setMensagem("Profissional cadastrado com sucesso!");
      console.log(resposta);
      reset(); // limpa os campos
      navigate("/areadoprofissional/completar-perfil");
    } catch (erro) {
      setMensagem("Erro ao cadastrar. Verifique os dados.");
      console.error(erro);
    }
  };

  return (
    <form className="cadastro-prossional" onSubmit={handleSubmit(onSubmit)}>
      <h2>Cadastro do Profissional</h2>

      <div className="form-group">
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
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
              message: "Email inválido",
            },
          })}
        />
        {errors.email && <p className="erro">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="senha">Senha:</label>
        <input
          id="senha"
          type="password"
          {...register("senha", {
            required: "Senha é obrigatória",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
        />
        {errors.senha && <p className="erro">{errors.senha.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="cidade">Cidade:</label>
        <input
          id="cidade"
          {...register("cidade", { required: "Cidade é obrigatória" })}
        />
        {errors.cidade && <p className="erro">{errors.cidade.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="bairro">Bairro:</label>
        <input
          id="bairro"
          {...register("bairro", { required: "Bairro é obrigatório" })}
        />
        {errors.bairro && <p className="erro">{errors.bairro.message}</p>}
      </div>

      <button type="submit">Cadastrar-se</button>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </form>
  );
}
