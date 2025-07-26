import React, { useState } from 'react';
import './styles.css';

type Professional = {
  id: number;
  nome: string;
  especialidade: string;
  cidade: string;
};

const profissionais: Professional[] = [
  { id: 1, nome: 'Carlos Silva', especialidade: 'Eletricista', cidade: 'São Paulo' },
  { id: 2, nome: 'Ana Souza', especialidade: 'Técnico de Internet', cidade: 'Rio de Janeiro' },
  { id: 3, nome: 'João Mendes', especialidade: 'Instalador de Câmeras', cidade: 'Belo Horizonte' },
  { id: 4, nome: 'Mariana Rocha', especialidade: 'Eletricista', cidade: 'Brasília' },
];

const ProfessionalSearch: React.FC = () => {
  const [busca, setBusca] = useState('');

  const filtrados = profissionais.filter((prof) =>
    `${prof.nome} ${prof.especialidade} ${prof.cidade}`.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="search-container">
      <h2>Encontre um Profissional</h2>
      <input
        type="text"
        placeholder="Buscar por nome, especialidade ou cidade..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <ul className="professional-list">
        {filtrados.length > 0 ? (
          filtrados.map((prof) => (
            <li key={prof.id} className="professional-card">
              <h3>{prof.nome}</h3>
              <p>Especialidade: {prof.especialidade}</p>
              <p>Cidade: {prof.cidade}</p>
            </li>
          ))
        ) : (
          <li className="no-results">Nenhum profissional encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default ProfessionalSearch;
