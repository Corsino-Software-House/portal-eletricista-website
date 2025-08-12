import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { completarPerfilCliente } from "../../../services/completarPerfil.service";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/spinner/spinner";
import "./style.css";
import Swal from "sweetalert2";

type FormData = {
  telefone: string;
  foto: FileList;
};

const ProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      telefone: "",
    },
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const idStr = localStorage.getItem("clienteId");
    const id = idStr ? Number(idStr) : null;

    if (!id || isNaN(id)) {
      alert("ID inválido. Faça login novamente.");
      return;
    }

    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("telefone", data.telefone);
    if (data.foto && data.foto.length > 0) {
      formData.append("foto", data.foto[0]);
    }

    try {
      setLoading(true);
      const resposta = await completarPerfilCliente(formData);
      console.log("Perfil atualizado:", resposta);
      Swal.fire({
        title: "Deu certo!",
        text: "Cadastro completo!",
        icon: "success",
      });
      localStorage.clear();
      navigate("/areadocliente");
    } catch (erro) {
      console.error("Erro ao atualizar perfil:", erro);
      Swal.fire({
        title: "Erro!",
        text: "O seu registo nao foi concluido, tente novamente!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Validação do tamanho da foto: max 10MB
  const validateFileSize = (files: FileList) => {
    if (!files || files.length === 0) return true; // arquivo opcional
    const file = files[0];
    return file.size <= 10 * 1024 * 1024 || "A imagem deve ter até 10MB";
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

      {loading ? (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      ) : (
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
              {...register("foto", {
                validate: validateFileSize,
              })}
              onChange={(e) => {
                handleImagePreview(e);
                (register("foto").onChange as any)(e);
              }}
            />
            {errors.foto && <p className="error">{errors.foto.message?.toString()}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <Controller
              name="telefone"
              control={control}
              rules={{
                required: "Telefone é obrigatório",
                validate: (value) =>
                  (value && value.length >= 10) || "Telefone inválido",
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  defaultCountry="PT"
                  id="telefone"
                  placeholder="Digite seu telefone..."
                  international
                  countryCallingCodeEditable={false}
                />
              )}
            />
            {errors.telefone && (
              <p className="error">{errors.telefone.message?.toString()}</p>
            )}
          </div>

          <button type="submit">Salvar</button>
        </form>
      )}

      <Footer />
    </div>
  );
};

export default ProfileForm;
