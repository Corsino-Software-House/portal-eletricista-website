import { XCircle } from 'lucide-react';
import './CancelledScreen.css';

export default function CancelledScreen() {
  return (
    <div className="cancel-container">
      <div className="cancel-card">
        <XCircle size={72} className="cancel-icon" />
        <h1 className="cancel-title">Compra cancelada</h1>
        <p className="cancel-message">
          A transação foi interrompida. Se isso foi um erro, tente novamente.
        </p>
        <a href="/" className="cancel-button">
          Voltar para o início
        </a>
      </div>
    </div>
  );
}
