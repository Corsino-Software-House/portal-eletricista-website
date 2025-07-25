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
  formData.append("foto", image); // Aqui sim vai o arquivo real

  try {
    const resposta = await completarPerfil(formData);
    console.log("Perfil atualizado:", resposta);
    alert("Perfil atualizado com sucesso!");
    localStorage.clear()
    navigate("/areadoprofissional");
  } catch (erro) {
    console.error("Erro ao atualizar perfil:", erro);
    alert("Erro ao atualizar o perfil.");
  }
};

  return (
    <>
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

          <button type="submit">Salvar</button>
        </form>
        <Footer />
      </div>
    </>
  );
};

export default ProfileForm;
