import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import { ArrowLeft } from "lucide-react";
import "./styles.css";
import { validateOtp } from "../../../services/email.service"; // importa a service

interface LocationState {
  email: string;
}

export default function OtpAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const email = state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("Email não encontrado. Volte e tente novamente.");
      return;
    }

    if (otp.length < 4) {
      alert("Preencha todos os dígitos do código");
      return;
    }

    try {
      setLoading(true);
      const res = await validateOtp(email, otp);

      if (res.message === true) {
        // OTP válido → segue para alteração de senha
        navigate("/admin/alterar-senha", { state: { email } });
      } else {
        alert("Código inválido ou expirado");
      }
    } catch (err: any) {
      console.error("Erro ao validar OTP:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Erro ao validar OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botão de voltar */}
      <button
        type="button"
        className="forgot-back-btn"
        onClick={() => navigate("/admin/esqueci-senha")}
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="forgot-container">
        <h2 className="forgot-title">Verificação OTP</h2>
        <p className="forgot-description">
          Digite o código de 4 dígitos enviado para seu e-mail.
        </p>

        <form onSubmit={handleSubmit} className="otp-form">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType="number"
            shouldAutoFocus
            containerStyle="otp-container"
            inputStyle="otp-input"
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />

          <button type="submit" className="forgot-button" disabled={loading}>
            {loading ? "Validando..." : "Confirmar Código"}
          </button>
        </form>
      </div>
    </>
  );
}
