import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./styles.css";

interface FormValues {
  email: string;
}

export default function ForgotPasswordCliente() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Email preenchido:", data.email);
    navigate("/cliente/otp");
  };

  return (
    <>
      {/* Botão de voltar com ícone */}
      <button
        type="button"
        className="forgot-back-btn"
        onClick={() => navigate("/areadocliente")}
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="forgot-container">
        <h2 className="forgot-title">Recuperar Senha</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="forgot-form">
          <label className="forgot-label">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            {...register("email", {
              required: "O e-mail é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Digite um e-mail válido",
              },
            })}
            className="forgot-input"
          />
          {errors.email && (
            <span className="forgot-error">{errors.email.message}</span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="forgot-button"
          >
            {isSubmitting ? "Validando..." : "Recuperar Senha"}
          </button>
        </form>
      </div>
    </>
  );
}
