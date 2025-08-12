import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { verProfissionalPorId } from "../../services/cadastroProfissional.service";

type Professional = {
  id: number;
  nome: string;
  especialidade: string;
  cidade: string;
  descricao: string;
  telefone?: string;
  notaMedia?: number;
  fotoUrl?: string;
};

const ProfessionalProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profissional, setProfissional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    verProfissionalPorId(Number(id))
      .then((data) => {
        setProfissional(data);
        setErro(null);
      })
      .catch((e) => {
        setErro("Erro ao carregar os dados do profissional.");
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando perfil...</p>;
  if (erro) return <p>{erro}</p>;
  if (!profissional) return <p>Profissional não encontrado.</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={profissional.fotoUrl || "/user.png"}
          onError={(e) => (e.currentTarget.src = "/user.png")}
          alt={`Foto de ${profissional.nome}`}
          className="profile-img"
        />
        <div className="profile-info">
          <h2>{profissional.nome}</h2>
          <p>
            <strong>Especialidade:</strong> {profissional.especialidade}
          </p>
          <p>
            <strong>Cidade:</strong> {profissional.cidade}
          </p>
          {profissional.telefone && (
            <p>
              <strong>Telefone para contato:</strong> {profissional.telefone}
            </p>
          )}
          {profissional.notaMedia !== undefined && (
            <p>
              <strong>Nota média:</strong> {profissional.notaMedia.toFixed(1)} ★
            </p>
          )}
          <p className="descricao">{profissional.descricao}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
