import { CheckCircle } from 'lucide-react';
import './SuccessScreen.css';

export default function SuccessScreen() {
  return (
    <div className="success-container">
      <div className="success-card">
        <CheckCircle size={72} className="success-icon" />
        <h1 className="success-title">Pagamento aprovado!</h1>
        <p className="success-message">
          Sua compra foi realizada com sucesso. Um recibo será enviado ao seu e-mail em instantes.
        </p>
        <a href="/" className="success-button">
          Voltar para o início
        </a>
      </div>
    </div>
  );
}
