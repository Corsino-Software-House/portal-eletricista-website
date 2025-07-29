import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { completarPerfilCliente } from "../../../services/completarPerfil.service";
import { useNavigate } from "react-router-dom";
import "./style.css";

type FormData = {
  telefone: string;
  foto: FileList;
};

const ProfileForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const idStr = localStorage.getItem("clienteId");
    const id = idStr ? Number(idStr) : null;

    if (!id || isNaN(id)) {
      alert("ID inválido. Faça login novamente.");
      return;
    }

    const image = data.foto[0];

    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("telefone", data.telefone);
    formData.append("foto", image);

    try {
      const resposta = await completarPerfilCliente(formData);
      console.log("Perfil atualizado:", resposta);
      alert("Perfil atualizado com sucesso!");
      localStorage.clear();
      navigate("/areadocliente");
    } catch (erro) {
      console.error("Erro ao atualizar perfil:", erro);
      alert("Erro ao atualizar o perfil.");
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Header />
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Completar Perfil</h2>

        <div className="image-upload">
          {preview ? (
            <img src={preview} alt="Preview" className="preview" />
          ) : (
            <div className="placeholder">Prévia</div>
          )}
          <input
            type="file"
            accept="image/*"
            {...register("foto", { required: "Selecione uma imagem" })}
            onChange={(e) => {
              handleImagePreview(e);
              // Necessário para atualizar o registro do react-hook-form também:
              (register("foto").onChange as any)(e);
            }}
          />
          {errors.foto && <p className="error">{errors.foto.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            id="telefone"
            type="tel"
            placeholder="Digite seu telefone..."
            {...register("telefone", {
              required: "Telefone é obrigatório",
              pattern: {
                value: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                message: "Formato de telefone inválido",
              },
            })}
          />
          {errors.telefone && <p className="error">{errors.telefone.message}</p>}
        </div>

        <button type="submit">Salvar</button>
      </form>
      <Footer />
    </div>
  );
};

export default ProfileForm;
