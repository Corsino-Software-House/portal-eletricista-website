import "./styles.css";
import {
  buscarProfissionaisMaisAvaliados,
  buscarReviewsRecentes,
} from "../../services/inicio.service";
import { useEffect, useState } from "react";

type Review = {
  nome: string;
  comentario: string;
  fotoUrl?: string;
  cliente :{
    nome: string;
  }
};

type Profissional = {
  nome: string;
  notaMedia: number;
  fotoUrl?: string;
};

export default function Depoimentos() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const reviewsRes = await buscarReviewsRecentes();
        const profissionaisRes = await buscarProfissionaisMaisAvaliados();
        setReviews(reviewsRes);
        setProfissionais(profissionaisRes);
      } catch (error) {
        console.error("Erro ao carregar depoimentos e profissionais:", error);
      }
    }

    carregarDados();
  }, []);

  return (
    <>
      <section className="depoimentos">
        <h2>O que nossos clientes dizem</h2>
        <div className="cards">
          {reviews.map((review, index) => (
            <div className="card" key={index}>
              <img
                src={review.fotoUrl || "/user.png"}
                alt={review.nome}
                onError={(e) => (e.currentTarget.src = "/user.png")}
              />
              <h3>{review.cliente.nome}</h3>
              <p className="cargo">Cliente</p>
              <p className="texto">"{review.comentario}"</p>
            </div>
          ))}
        </div>
      </section>

      <section className="depoimentos">
        <h2>Profissionais Mais Avaliados</h2>
        <div className="cards">
          {profissionais.map((prof, index) => (
            <div className="card" key={index}>
              <img
                src={prof.fotoUrl || "/user.png"}
                alt={prof.nome}
                onError={(e) => (e.currentTarget.src = "/user.png")}
              />
              <h3>{prof.nome}</h3>
              <p>
                ⭐{" "}
                {prof.notaMedia !== undefined && prof.notaMedia !== null
                  ? prof.notaMedia.toFixed(1)
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
