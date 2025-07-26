import React from 'react';
import './styles.css';

type Professional = {
  id: number;
  nome: string;
  especialidade: string;
  cidade: string;
  descricao: string;
  fotoUrl?: string;
};

type Props = {
  profissional: Professional;
};

const ProfessionalProfile: React.FC<Props> = ({ profissional }) => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={profissional.fotoUrl || 'https://via.placeholder.com/150'}
          alt={`Foto de ${profissional.nome}`}
          className="profile-img"
        />
        <div className="profile-info">
          <h2>{profissional.nome}</h2>
          <p><strong>Especialidade:</strong> {profissional.especialidade}</p>
          <p><strong>Cidade:</strong> {profissional.cidade}</p>
          <p className="descricao">{profissional.descricao}</p>
          <button className="contact-btn">Entrar em Contato</button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
