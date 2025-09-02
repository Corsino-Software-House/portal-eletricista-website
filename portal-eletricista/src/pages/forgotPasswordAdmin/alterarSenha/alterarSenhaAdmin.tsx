import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./styles.css";
import { alterarSenhaAdminPorEmail } from "../../../services/alterarSenha.service";
import Swal from "sweetalert2";

interface FormValues {
  novaSenha: string;
  confirmarSenha: string;
}

interface LocationState {
  email: string;
}

export default function AlterarSenhaAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const email = state?.email;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!email) {
      alert("Email não encontrado. Volte e tente novamente.");
      return;
    }

    try {
      await alterarSenhaAdminPorEmail(email, data.novaSenha);
      Swal.fire({
        title: "Sucesso!",
        text: "Sua senha foi alterada com sucesso!",
        icon: "success",
      });
      navigate("/login");
    } catch (err: any) {
      console.error(
        "Erro ao alterar senha:",
        err.response?.data || err.message
      );
      Swal.fire({
        title: "Erro!",
        text: "Erro em alterar senha!",
        icon: "error",
      });
    }
  };

  return (
    <>
      {/* Botão de voltar */}
      <button
        type="button"
        className="forgot-back-btn"
        onClick={() => navigate("/admin/otp")}
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
            <span className="forgot-error">
              {errors.confirmarSenha.message}
            </span>
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
