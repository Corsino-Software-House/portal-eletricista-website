import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Swal from "sweetalert2";
import { useState } from "react";
import { criarPedidoDePlanoStripe } from "../../services/stripe.service"; 
import { CheckCircle, CreditCard, Wallet } from "lucide-react";
import "./CheckoutPlano.css";

export default function CheckoutPlano() {
  const location = useLocation();
  const plano = location.state;
  const profissionalId = Number(localStorage.getItem("id"));
  const tipoUsuario = localStorage.getItem("tipo");

  const [gatewaySelecionado, setGatewaySelecionado] = useState<
    "stripe" | "multibanco" | "mbway" | ""
  >("");

  const escolherGateway = async () => {
    if (tipoUsuario !== "profissional") {
      Swal.fire(
        "Acesso negado",
        "Apenas profissionais podem adquirir créditos.",
        "error"
      );
      return;
    }

    if (!gatewaySelecionado) {
      Swal.fire(
        "Selecione um método",
        "Escolha uma forma de pagamento.",
        "warning"
      );
      return;
    }

    try {
      if (gatewaySelecionado === "stripe") {
        const res = await criarPedidoDePlanoStripe({
          value: (plano.preco * 100).toString(), // Stripe usa centavos
          profissionalId,
          pacote: plano.nome,
        });

        if (res.url) {
          window.location.href = res.url; // redireciona pro checkout do Stripe
        } else {
          throw new Error("URL de checkout Stripe não encontrada.");
        }
      } else {
        Swal.fire(
          "Em breve",
          `Pagamento via ${gatewaySelecionado} será implementado.`,
          "info"
        );
      }
    } catch (err: any) {
      Swal.fire("Erro", err.message || "Erro ao iniciar o pagamento.", "error");
    }
  };

  if (!plano) return <p>Nenhum plano selecionado.</p>;

  const gateways = [
    { id: "stripe", label: "Stripe", icon: <CreditCard size={24} /> },
    { id: "mbway", label: "MB Way", icon: <Wallet size={24} /> },
    { id: "multibanco", label: "Multibanco", icon: <Wallet size={24} /> },
  ];

  return (
    <>
      <Header />
      <div className="checkout-page">
      <div className="checkout-wrapper">
        <div className="checkout-card">
          <h2>Escolha a forma de pagamento</h2>

          <ul className="payment-list">
            {gateways.map((g) => (
              <li
                key={g.id}
                onClick={() => setGatewaySelecionado(g.id as any)}
                className={`payment-item ${
                  gatewaySelecionado === g.id ? "selected" : ""
                }`}
              >
                <span className="payment-icon">{g.icon}</span>
                <span className="payment-label">{g.label}</span>
                {gatewaySelecionado === g.id && (
                  <CheckCircle size={20} color="#00c896" />
                )}
              </li>
            ))}
          </ul>

          <div className="checkout-summary">
            <p>
              <strong>Plano:</strong> {plano.nome}
            </p>
            <p>
              <strong>Preço:</strong> R$ {plano.preco.toFixed(2)}
            </p>
          </div>

          <button className="checkout-button" onClick={escolherGateway}>
            Confirmar pagamento
          </button>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
