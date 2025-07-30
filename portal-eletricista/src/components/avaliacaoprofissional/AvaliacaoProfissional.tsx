import React, { useState } from 'react';
import './styles.css';

interface ProfessionalCardProps {
  name: string;
}



const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ name }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar" />
        <div className="info">
          <h2 className="name">{name}</h2>
          <p className="label">Avaliar profissional</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={star <= rating ? 'star active' : 'star'}
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
      <button className="submit">Enviar</button>
    </div>

   
  );
};


export default ProfessionalCard;

