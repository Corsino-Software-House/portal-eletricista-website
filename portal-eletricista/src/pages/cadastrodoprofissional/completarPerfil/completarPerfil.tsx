import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { completarPerfil } from "../../../services/completarPerfil.service";
import { useNavigate } from "react-router-dom";

import "./style.css";

const ProfileForm: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [especialidade, setEspecialidade] = useState<string>("");

  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const idStr = localStorage.getItem("profissionalId");
    const id = idStr ? Number(idStr) : null;

    if (!id || isNaN(id)) {
      alert("ID inválido. Faça login novamente.");
      return;
    }

    if (!image) {
      alert("Selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("bio", bio);
    formData.append("telefone", telefone);
    formData.append("especialidade", especialidade);
    formData.append("foto", image);

    try {
      const resposta = await completarPerfil(formData);
      console.log("Perfil atualizado:", resposta);
      alert("Perfil atualizado com sucesso!");
      localStorage.clear();
      navigate("/areadoprofissional");
    } catch (erro) {
      console.error("Erro ao atualizar perfil:", erro);
      alert("Erro ao atualizar o perfil.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
      <Header />
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Completar Perfil</h2>

        <div className="image-upload">
          {preview ? (
            <img src={preview} alt="Preview" className="preview" />
          ) : (
            <div className="placeholder">Prévia</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Digite algo sobre você..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Digite seu telefone..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="especialidade">Especialidade:</label>
          <select
            id="especialidade"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
          >
            <option value="">Selecione uma especialidade</option>
            <optgroup label="Elétrica">
              <option value="Instalação elétrica completa (obra nova ou remodelação)">
                Instalação elétrica completa (obra nova ou remodelação)
              </option>
              <option value="Substituição de quadros elétricos">
                Substituição de quadros elétricos
              </option>
              <option value="Instalação de disjuntores e diferencial">
                Instalação de disjuntores e diferencial
              </option>
              <option value="Passagem e substituição de cabos">
                Passagem e substituição de cabos
              </option>
              <option value="Tomadas e interruptores">
                Tomadas e interruptores
              </option>
              <option value="Iluminação interior e exterior">
                Iluminação interior e exterior
              </option>
              <option value="Ventoinhas de teto e exaustores">
                Ventoinhas de teto e exaustores
              </option>
              <option value="Manutenção preventiva de sistemas elétricos">
                Manutenção preventiva de sistemas elétricos
              </option>
              <option value="Certificação elétrica">
                Certificação elétrica
              </option>
              <option value="Inspeções técnicas e diagnósticos de falha">
                Inspeções técnicas e diagnósticos de falha
              </option>
            </optgroup>
            <optgroup label="Domótica / Smart Home">
              <option value="Instalação e configuração de assistentes virtuais">
                Instalação de assistentes virtuais
              </option>
              <option value="Tomadas e interruptores inteligentes">
                Tomadas e interruptores inteligentes
              </option>
              <option value="Automatização de iluminação e persianas">
                Automatização de iluminação e persianas
              </option>
              <option value="Instalação de câmeras de vigilância (CCTV)">
                Instalação de câmeras de vigilância (CCTV)
              </option>
              <option value="Instalação de sensores de segurança">
                Instalação de sensores de segurança
              </option>
              <option value="Controle remoto via app">
                Controle remoto via app
              </option>
              <option value="Integração de sistemas com domótica">
                Integração com domótica
              </option>
              <option value="Consultoria e otimização com smart meter">
                Consultoria com smart meter
              </option>
            </optgroup>
            <optgroup label="Hidráulica / Canalização">
              <option value="Reparação de fugas de água">
                Reparação de fugas de água
              </option>
              <option value="Desentupimentos">
                Desentupimentos
              </option>
              <option value="Instalação de torneiras e chuveiros">
                Instalação de torneiras e chuveiros
              </option>
              <option value="Substituição de loiças sanitárias">
                Substituição de loiças sanitárias
              </option>
              <option value="Instalação de máquinas de lavar">
                Instalação de máquinas de lavar
              </option>
              <option value="Reparação e substituição de autoclismos">
                Substituição de autoclismos
              </option>
              <option value="Montagem de sistemas de filtragem de água">
                Sistemas de filtragem de água
              </option>
              <option value="Canalizações completas para obras">
                Canalizações para obras
              </option>
              <option value="Verificação e substituição de esgotos">
                Verificação e substituição de esgotos
              </option>
              <option value="Certificações e ensaios hidráulicos">
                Ensaios hidráulicos
              </option>
            </optgroup>
            <optgroup label="Serviços Gerais e Emergência">
              <option value="Reparos simples elétricos e hidráulicos">
                Reparos simples elétricos e hidráulicos
              </option>
              <option value="Manutenção periódica de sistemas">
                Manutenção periódica
              </option>
              <option value="Pequenas remodelações de cozinha e WC">
                Pequenas remodelações
              </option>
              <option value="Instalação de suportes e luminárias">
                Instalação de suportes e luminárias
              </option>
              <option value="Falta de energia elétrica">
                Falta de energia elétrica
              </option>
              <option value="Disjuntor queimado / quadro disparando">
                Disjuntor queimado / quadro disparando
              </option>
              <option value="Fugas de água ou risco de inundação">
                Fugas de água ou risco de inundação
              </option>
              <option value="Entupimentos graves">
                Entupimentos graves
              </option>
              <option value="Problemas com aquecedores">
                Problemas com aquecedores
              </option>
            </optgroup>
          </select>
        </div>

        <button type="submit">Salvar</button>
      </form>
      <Footer />
    </div>
  );
};

export default ProfileForm;
