import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./styles.css";
import { sendOtp } from "../../services/email.service"; // importa a service

interface FormValues {
  email: string;
}

export default function ForgotPasswordAdmin() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await sendOtp(data.email);
      console.log("OTP enviado:", res.message);
      // redireciona para a tela de OTP do admin, passando o email
      navigate("/admin/otp", { state: { email: data.email } });
    } catch (err: any) {
      console.error("Erro ao enviar OTP:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Erro ao enviar OTP");
    }
  };

  return (
    <>
      {/* Botão de voltar com ícone */}
      <button
        type="button"
        className="forgot-back-btn"
        onClick={() => navigate("/login")}
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
            {isSubmitting ? "Enviando..." : "Recuperar Senha"}
          </button>
        </form>
      </div>
    </>
  );
}
