import './styles.css';
import { useNavigate } from 'react-router-dom';

interface ProfissionalCardProps {
  id: string;
  nome: string;
  cargo: string;
  descricao: string;
  imagemUrl?: string;
}

export default function ProfissionalCard({
  id,
  nome,
  cargo,
  descricao,
  imagemUrl,
}: ProfissionalCardProps) {
  const navigate = useNavigate();

  return (
    <div className="cardAvaliar">
      <div
        className="profile-image"
        style={{ backgroundImage: `url(${imagemUrl || ''})` }}
      />
      <h3 className="nome">{nome}</h3>
      <div className="botoes">
        <button onClick={() => navigate(`/profissionais/${id}`)}>Ver</button>
        <button onClick={() => navigate(`/avaliacao/${id}`)}>Avaliar</button>
      </div>
      <p className="cargo">{cargo}</p>
      <p className="descricao">{descricao}</p>
    </div>
  );
}
