import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data: '',
    hora: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    alert('Agendamento realizado com sucesso!');
    setFormData({ nome: '', email: '', data: '', hora: '' });
  };

  return (
    <div className="booking-container">
      <h2>Agende um Horário</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Nome do Profissional:
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </label>
        <label>
          E-mail do Profissional:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Data:
          <input type="date" name="data" value={formData.data} onChange={handleChange} required />
        </label>
        <label>
          Horário:
          <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
        </label>
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
};

export default BookingForm;