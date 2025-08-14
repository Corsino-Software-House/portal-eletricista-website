import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { ArrowLeft } from "lucide-react";
import "./styles.css";

export default function OtpAdmin() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length < 4) {
      alert("Preencha todos os dígitos do código");
      return;
    }

    console.log("Código OTP digitado:", otp);
    navigate("/admin/alterar-senha");
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

          <button type="submit" className="forgot-button">
            Confirmar Código
          </button>
        </form>
      </div>
    </>
  );
}
