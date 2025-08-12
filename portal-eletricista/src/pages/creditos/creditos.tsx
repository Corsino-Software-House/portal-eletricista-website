import Swal from "sweetalert2";
import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import LoadingSpinner from "../../components/spinner/spinner";
import { criarPedidoDePlano } from "../../services/paypal.service";

export default function PlanosDeCreditos() {
  const planos = [
    { nome: "Básico", preco: 25, creditos: 20 },
    { nome: "Poupança", preco: 60, creditos: 60 },
    { nome: "Profissional", preco: 90, creditos: 100 },
    { nome: "Elite", preco: 120, creditos: 150 },
  ];

  const profissionalId = Number(localStorage.getItem("id"));
  const tipoUsuario = localStorage.getItem("tipo");

  const [loadingPlano, setLoadingPlano] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<{ tipo: "erro" | "sucesso"; texto: string } | null>(null);

  const criarPedido = async (plano: { nome: string; preco: number }) => {
    if (tipoUsuario !== "profissional") {
      Swal.fire({
        icon: "error",
        title: "Acesso negado",
        text: "Apenas profissionais podem adquirir créditos.",
      });
      return;
    }

    try {
      setMensagem(null);
      setLoadingPlano(plano.nome);

      const res = await criarPedidoDePlano({
        value: plano.preco.toFixed(2),
        profissionalId,
        pacote: plano.nome,
      });

      const approvalLink = res.links.find((link: any) => link.rel === "approve")?.href;

      if (!approvalLink) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Link de aprovação do PayPal não encontrado.",
        });
        setLoadingPlano(null);
        return;
      }

      window.location.href = approvalLink;
    } catch (err) {
      console.error("Erro ao criar assinatura:", err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao iniciar o pagamento.",
      });
    } finally {
      setLoadingPlano(null);
    }
  };

  return (
    <>
      <Header />
      <div className="creditos-wrapper">
        <h1>Adquira Créditos</h1>
        <p className="sub-info">
          Escolha o plano ideal para você e aumente suas chances de conseguir trabalhos.
        </p>

        {mensagem && (
          <div
            className={`mensagem ${
              mensagem.tipo === "sucesso" ? "mensagem-sucesso" : "mensagem-erro"
            }`}
          >
            {mensagem.texto}
          </div>
        )}

        <div className="planos-grid">
          {planos.map((plano, index) => (
            <div
              className={`plano-card ${plano.nome === "Elite" ? "destaque" : ""}`}
              key={index}
            >
              <h2>{plano.nome}</h2>
              <p className="preco">€ {plano.preco.toFixed(2)}</p>
              <p className="creditos">{plano.creditos} créditos</p>
              <button
                className="btn-adquirir"
                onClick={() => criarPedido(plano)}
                disabled={loadingPlano === plano.nome}
              >
                {loadingPlano === plano.nome ? (
                  <div className="flex items-center gap-2 justify-center">
                    <LoadingSpinner /> Processando...
                  </div>
                ) : (
                  "Adquirir"
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="info-final">
          <h3>⚠️ Informação Importante</h3>
          <p>
            A cada orçamento será atribuído, em BackOffice, o número respectivo de créditos,
            dependendo da complexidade de cada projeto.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
