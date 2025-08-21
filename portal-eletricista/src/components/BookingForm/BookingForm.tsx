import React, { useState, useEffect } from 'react';
import './BookingForm.css';
import { criarRequest } from '../../services/request.service';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

const BookingForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',           
    descricao: '',
    cidade: '',
    distrito: '',
    especialidade: '',
  });

  // Lista completa de especialidades (deve bater com os valores do select)
  const todasEspecialidades = [
  "Instalação elétrica completa (obra nova ou remodelação)",
  "Substituição de quadros elétricos",
  "Instalação de disjuntores e diferencial",
  "Passagem e substituição de cabos",
  "Tomadas e interruptores (instalação, substituição, reparo)",
  "Iluminação interior e exterior (convencional e LED)",
  "Ventoinhas de teto e exaustores",
  "Manutenção preventiva de sistemas elétricos",
  "Aumento de potência de quadro elétrico, ficha eletrotécnica e padrão E-redes",
  "Certificação elétrica (para venda ou arrendamento de imóveis)",
  "Inspeções técnicas e diagnósticos de falhas",
  "Instalação e configuração de assistentes virtuais (Alexa, Google Home, etc.)",
  "Instalação de tomadas e interruptores inteligentes (Wi-Fi)",
  "Automatização de iluminação, estores e persianas",
  "Instalação de câmeras de vigilância (CCTV)",
  "Instalação de sensores de movimento, fumaça, gás e inundação",
  "Controlo remoto de dispositivos via app",
  "Integração de sistemas de segurança com domótica",
  "Consultoria e otimização do consumo elétrico com smart meters",
  "Reparação de fugas de água (canos, torneiras, sifões)",
  "Desentupimentos (sanitas, lavatórios, ralos, canos)",
  "Instalação de torneiras, chuveiros e misturadoras",
  "Substituição de loiças sanitárias (sanitas, bidês, lavatórios)",
  "Instalação de máquinas de lavar roupa/loiça",
  "Reparação e substituição de autoclismos",
  "Montagem de sistemas de filtragem e purificação de água",
  "Canalizações completas para obras novas ou remodelações",
  "Verificação e substituição de esgotos e águas pluviais",
  "Certificações e ensaios de pressão/estanqueidade",
  "Reparos elétricos e hidráulicos simples",
  "Manutenção periódica de sistemas",
  "Pequenas remodelações de cozinha e WC (ligadas a elétrica e canalização)",
  "Instalação de suportes de TV, luminárias, cortinados",
  "Substituição de tomadas e interruptores danificados",
  "Falta de energia elétrica",
  "Quadro a disparar / disjuntor queimado",
  "Fugas de água visíveis ou risco de inundação",
  "Entupimentos graves",
  "Problemas com aquecedores elétricos ou termoacumuladores",
  "Receba pedidos filtrados por zona, tipo de serviço e urgência",
  "Pagamento seguro e garantido pela plataforma",
  "Flexibilidade de horários e aceitação de serviços",
  "Acesso a cliente final com perfil validado",
  "Possibilidade de crescer na reputação e ser técnico preferencial"
];


  // Normaliza strings para comparação
  const normalizar = (texto: string) => texto.trim().toLowerCase();

  // Busca título do projeto e define especialidade se bater
  useEffect(() => {
    const tituloProjeto = localStorage.getItem('tituloProjeto') || '';
    const match = todasEspecialidades.find(opt => normalizar(opt) === normalizar(tituloProjeto));

    setFormData(prev => ({
      ...prev,
      nome: tituloProjeto,
      especialidade: match || ''
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await criarRequest({
        clienteId: Number(localStorage.getItem('id')),
        titulo: formData.nome,
        descricao: formData.descricao,
        cidade: formData.cidade,
        bairro: formData.distrito,
        especialidade: formData.especialidade,
      });

      Swal.fire({
        title: "Sucesso!",
        text: "Projeto publicado com sucesso!",
        icon: "success",
      });

      setFormData({
        nome: '',
        descricao: '',
        cidade: '',
        distrito: '',
        especialidade: '',
      });
      localStorage.removeItem('tituloProjeto');
      navigate('/areadocliente');
    } catch (error) {
      console.error("Erro ao criar o projeto:", error);
      Swal.fire({
        title: "Erro!",
        text: "Erro ao publicar o projeto. Tente novamente.",
        icon: "error",
      });
    }
  };

  return (
    <>
     <div style={{ padding: "10px" }}>
          <button
            onClick={() => navigate("/areadocliente/menu")}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "16px",
              color: "#3259daff",
            }}
          >
            <ArrowLeft size={22} />
            Voltar
          </button>
        </div>
   
    <div className="booking-container">
      <h2>Postagem do Projeto</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Título do Projeto:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Descrição:
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Cidade:
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Distrito:
          <input
            type="text"
            name="distrito"
            value={formData.distrito}
            onChange={handleChange}
            required
          />
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
              <option value="Tomadas e interruptores (instalação, substituição, reparo)">Tomadas e interruptores (instalação, substituição, reparo)</option>
              <option value="Iluminação interior e exterior (convencional e LED)">Iluminação interior e exterior (convencional e LED)</option>
              <option value="Ventoinhas de teto e exaustores">Ventoinhas de teto e exaustores</option>
              <option value="Manutenção preventiva de sistemas elétricos">Manutenção preventiva de sistemas elétricos</option>
              <option value="Aumento de potência de quadro elétrico, ficha eletrotécnica e padrão E-redes">Aumento de potência de quadro elétrico, ficha eletrotécnica e padrão E-redes</option>
              <option value="Certificação elétrica (para venda ou arrendamento de imóveis)">Certificação elétrica (para venda ou arrendamento de imóveis)</option>
              <option value="Inspeções técnicas e diagnósticos de falhas">Inspeções técnicas e diagnósticos de falhas</option>
            </optgroup>
            <optgroup label="Domótica / Smart Home">
              <option value="Instalação e configuração de assistentes virtuais (Alexa, Google Home, etc.)">Instalação e configuração de assistentes virtuais (Alexa, Google Home, etc.)</option>
              <option value="Instalação de tomadas e interruptores inteligentes (Wi-Fi)">Instalação de tomadas e interruptores inteligentes (Wi-Fi)</option>
              <option value="Automatização de iluminação, estores e persianas">Automatização de iluminação, estores e persianas</option>
              <option value="Instalação de câmeras de vigilância (CCTV)">Instalação de câmeras de vigilância (CCTV)</option>
              <option value="Instalação de sensores de movimento, fumaça, gás e inundação">Instalação de sensores de movimento, fumaça, gás e inundação</option>
              <option value="Controlo remoto de dispositivos via app">Controlo remoto de dispositivos via app</option>
              <option value="Integração de sistemas de segurança com domótica">Integração de sistemas de segurança com domótica</option>
              <option value="Consultoria e otimização do consumo elétrico com smart meters">Consultoria e otimização do consumo elétrico com smart meters</option>
            </optgroup>
            <optgroup label="Hidráulica / Canalização">
              <option value="Reparação de fugas de água (canos, torneiras, sifões)">Reparação de fugas de água (canos, torneiras, sifões)</option>
              <option value="Desentupimentos (sanitas, lavatórios, ralos, canos)">Desentupimentos (sanitas, lavatórios, ralos, canos)</option>
              <option value="Instalação de torneiras, chuveiros e misturadoras">Instalação de torneiras, chuveiros e misturadoras</option>
              <option value="Substituição de loiças sanitárias (sanitas, bidês, lavatórios)">Substituição de loiças sanitárias (sanitas, bidês, lavatórios)</option>
              <option value="Instalação de máquinas de lavar roupa/loiça">Instalação de máquinas de lavar roupa/loiça</option>
              <option value="Reparação e substituição de autoclismos">Reparação e substituição de autoclismos</option>
              <option value="Montagem de sistemas de filtragem e purificação de água">Montagem de sistemas de filtragem e purificação de água</option>
              <option value="Canalizações completas para obras novas ou remodelações">Canalizações completas para obras novas ou remodelações</option>
              <option value="Verificação e substituição de esgotos e águas pluviais">Verificação e substituição de esgotos e águas pluviais</option>
              <option value="Certificações e ensaios de pressão/estanqueidade">Certificações e ensaios de pressão/estanqueidade</option>
            </optgroup>
            <optgroup label="Serviços Gerais e Emergência">
              <option value="Reparos elétricos e hidráulicos simples">Reparos elétricos e hidráulicos simples</option>
              <option value="Manutenção periódica de sistemas">Manutenção periódica de sistemas</option>
              <option value="Pequenas remodelações de cozinha e WC (ligadas a elétrica e canalização)">Pequenas remodelações de cozinha e WC (ligadas a elétrica e canalização)</option>
              <option value="Instalação de suportes de TV, luminárias, cortinados">Instalação de suportes de TV, luminárias, cortinados</option>
              <option value="Substituição de tomadas e interruptores danificados">Substituição de tomadas e interruptores danificados</option>
              <option value="Falta de energia elétrica">Falta de energia elétrica</option>
              <option value="Quadro a disparar / disjuntor queimado">Quadro a disparar / disjuntor queimado</option>
              <option value="Fugas de água visíveis ou risco de inundação">Fugas de água visíveis ou risco de inundação</option>
              <option value="Entupimentos graves">Entupimentos graves</option>
              <option value="Problemas com aquecedores elétricos ou termoacumuladores">Problemas com aquecedores elétricos ou termoacumuladores</option>
            </optgroup>
          </select>
        </label>

        <button type="submit">Publicar</button>
      </form>
    </div>
     </>  
  );
};

export default BookingForm;
