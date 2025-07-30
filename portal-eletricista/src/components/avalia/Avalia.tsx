import './styles.css';

interface ProfissionalCardProps {
  nome: string;
  cargo: string;
  descricao: string;
  imagemUrl?: string;
}

export default function ProfissionalCard({ nome, cargo, descricao, imagemUrl }: ProfissionalCardProps) {
  return (
    <div className="cardAvaliar">
      <div className="profile-image" style={{ backgroundImage: `url(${imagemUrl || ''})` }} />
      <h3 className="nome">{nome}</h3>
      <div className="estrelas">
        {'★'.repeat(5)}
      </div>
      <div className="botoes">
        <button>Ver</button>
        <button>Avaliar</button>
      </div>
      <p className="cargo">{cargo}</p>
      <p className="descricao">{descricao}</p>
    </div>

    
  );
}
