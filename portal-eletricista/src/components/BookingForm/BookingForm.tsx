import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    cidade: '',
    distrito: '',
    especialidade: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    alert('Projeto realizado com sucesso!');
    setFormData({
      nome: '',
      descricao: '',
      cidade: '',
      distrito: '',
      especialidade: '',
    });
  };

  return (
    <div className="booking-container">
      <h2>Postagem do Projeto</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Título do Projeto:
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </label>
        <label>
          Descrição:
          <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} required />
        </label>
        <label>
          Cidade:
          <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} required />
        </label>
        <label>
          Distrito:
          <input type="text" name="bairro" value={formData.distrito} onChange={handleChange} required />
        </label>

        <label>
          Especialidade:
          <select
            name="especialidade"
            value={formData.especialidade}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma especialidade</option>
            <optgroup label="Elétrica">
              <option value="Instalação elétrica completa (obra nova ou remodelação)">Instalação elétrica completa (obra nova ou remodelação)</option>
              <option value="Substituição de quadros elétricos">Substituição de quadros elétricos</option>
              <option value="Instalação de disjuntores e diferencial">Instalação de disjuntores e diferencial</option>
              <option value="Passagem e substituição de cabos">Passagem e substituição de cabos</option>
              <option value="Tomadas e interruptores">Tomadas e interruptores</option>
              <option value="Iluminação interior e exterior">Iluminação interior e exterior</option>
              <option value="Ventoinhas de teto e exaustores">Ventoinhas de teto e exaustores</option>
              <option value="Manutenção preventiva de sistemas elétricos">Manutenção preventiva de sistemas elétricos</option>
              <option value="Certificação elétrica">Certificação elétrica</option>
              <option value="Inspeções técnicas e diagnósticos de falha">Inspeções técnicas e diagnósticos de falha</option>
            </optgroup>
            <optgroup label="Domótica / Smart Home">
              <option value="Instalação e configuração de assistentes virtuais">Instalação e configuração de assistentes virtuais</option>
              <option value="Tomadas e interruptores inteligentes">Tomadas e interruptores inteligentes</option>
              <option value="Automatização de iluminação e persianas">Automatização de iluminação e persianas</option>
              <option value="Instalação de câmeras de vigilância (CCTV)">Instalação de câmeras de vigilância (CCTV)</option>
              <option value="Instalação de sensores de segurança">Instalação de sensores de segurança</option>
              <option value="Controle remoto via app">Controle remoto via app</option>
              <option value="Integração de sistemas com domótica">Integração de sistemas com domótica</option>
              <option value="Consultoria e otimização com smart meter">Consultoria e otimização com smart meter</option>
            </optgroup>
            <optgroup label="Hidráulica / Canalização">
              <option value="Reparação de fugas de água">Reparação de fugas de água</option>
              <option value="Desentupimentos">Desentupimentos</option>
              <option value="Instalação de torneiras e chuveiros">Instalação de torneiras e chuveiros</option>
              <option value="Substituição de loiças sanitárias">Substituição de loiças sanitárias</option>
              <option value="Instalação de máquinas de lavar">Instalação de máquinas de lavar</option>
              <option value="Reparação e substituição de autoclismos">Reparação e substituição de autoclismos</option>
              <option value="Montagem de sistemas de filtragem de água">Montagem de sistemas de filtragem de água</option>
              <option value="Canalizações completas para obras">Canalizações completas para obras</option>
              <option value="Verificação e substituição de esgotos">Verificação e substituição de esgotos</option>
              <option value="Certificações e ensaios hidráulicos">Certificações e ensaios hidráulicos</option>
            </optgroup>
            <optgroup label="Serviços Gerais e Emergência">
              <option value="Reparos simples elétricos e hidráulicos">Reparos simples elétricos e hidráulicos</option>
              <option value="Manutenção periódica de sistemas">Manutenção periódica de sistemas</option>
              <option value="Pequenas remodelações de cozinha e WC">Pequenas remodelações de cozinha e WC</option>
              <option value="Instalação de suportes e luminárias">Instalação de suportes e luminárias</option>
              <option value="Falta de energia elétrica">Falta de energia elétrica</option>
              <option value="Disjuntor queimado / quadro disparando">Disjuntor queimado / quadro disparando</option>
              <option value="Fugas de água ou risco de inundação">Fugas de água ou risco de inundação</option>
              <option value="Entupimentos graves">Entupimentos graves</option>
              <option value="Problemas com aquecedores">Problemas com aquecedores</option>
            </optgroup>
          </select>
        </label>

        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default BookingForm;
