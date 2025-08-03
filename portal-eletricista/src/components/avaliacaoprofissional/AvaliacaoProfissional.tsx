import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import { verProfissionalPorId } from "../../services/cadastroProfissional.service";
import { criarRequest } from "../../services/review.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  fotoUrl?: string;
}

const ProfessionalCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (id) {
      verProfissionalPorId(Number(id))
        .then((data) => {
          setProfissional(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar profissional:", error);
        });
    }
  }, [id]);

  const handleEnviar = async () => {
    if (!profissional || rating === 0 || comment.trim() === "") {
      setMensagem("Preencha todos os campos.");
      return;
    }

    try {
      const clienteId = localStorage.getItem("id");
      await criarRequest({
        profissionalId: Number(profissional.id),
        clienteId: Number(clienteId),
        nota: rating,
        comentario: comment,
      });
      Swal.fire({
        title: "Sucesso!",
        text: "Feedback enviado!",
        icon: "success",
      });
      setRating(0);
      setComment("");
      navigate("/areadocliente/menu");
    } catch (error) {
      Swal.fire({
        title: "Erro!",
        text: "Feedback não enviado! Tente novamente.",
        icon: "error",
      });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar">
          {profissional?.fotoUrl ? (
            <img
              src={profissional.fotoUrl}
              alt={`Foto de ${profissional.nome}`}
            />
          ) : (
            <div className="avatar-placeholder" />
          )}
        </div>
        <div className="info">
          <h2 className="name">
            {profissional ? profissional.nome : "Carregando..."}
          </h2>
          <p className="label">
            {profissional ? profissional.especialidade : "Carregando..."}
          </p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={star <= rating ? "star active" : "star"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <textarea
        className="comment"
        placeholder="Escreva um comentário sobre o profissional"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="submit" onClick={handleEnviar}>
        Enviar
      </button>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default ProfessionalCard;
