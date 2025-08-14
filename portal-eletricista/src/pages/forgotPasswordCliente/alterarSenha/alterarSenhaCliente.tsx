import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./styles.css";

interface FormValues {
  novaSenha: string;
  confirmarSenha: string;
}

export default function AlterarSenhaCliente() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Nova senha:", data.novaSenha);
    alert("Senha alterada com sucesso!");
    navigate("/areadocliente");
  };

  return (
    <>
      {/* Botão de voltar */}
      <button
        type="button"
        className="forgot-back-btn"
        onClick={() => navigate("/cliente/otp")}
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="forgot-container">
        <h2 className="forgot-title">Alterar Senha</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="forgot-form">
          {/* Nova Senha */}
          <label className="forgot-label">Nova Senha</label>
          <input
            type="password"
            placeholder="Digite a nova senha"
            {...register("novaSenha", {
              required: "A nova senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
            })}
            className="forgot-input"
          />
          {errors.novaSenha && (
            <span className="forgot-error">{errors.novaSenha.message}</span>
          )}

          {/* Confirmar Senha */}
          <label className="forgot-label">Confirmar Senha</label>
          <input
            type="password"
            placeholder="Confirme a nova senha"
            {...register("confirmarSenha", {
              required: "A confirmação de senha é obrigatória",
              validate: (value) =>
                value === watch("novaSenha") || "As senhas não coincidem",
            })}
            className="forgot-input"
          />
          {errors.confirmarSenha && (
            <span className="forgot-error">{errors.confirmarSenha.message}</span>
          )}

          {/* Botão de Alterar */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="forgot-button"
          >
            {isSubmitting ? "Alterando..." : "Alterar Senha"}
          </button>
        </form>
      </div>
    </>
  );
}
