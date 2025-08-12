import React, { useState, type ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { completarPerfil } from "../../../services/completarPerfil.service";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/spinner/spinner";
import Swal from "sweetalert2";
import "./style.css";

type FormData = {
  bio: string;
  telefone: string;
  especialidade: string;
  fotoPerfil: FileList;    // campo único para foto perfil
  ccFrente: FileList;      // frente documento
  ccVerso: FileList;       // verso documento
};

const ProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      bio: "",
      telefone: "",
      especialidade: "",
    },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [previewFrente, setPreviewFrente] = useState<string | null>(null);
  const [previewVerso, setPreviewVerso] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateFileSize = (files: FileList) => {
    if (!files || files.length === 0) return "Este campo é obrigatório";
    const file = files[0];
    return file.size <= 10 * 1024 * 1024 || "A imagem deve ter até 10MB";
  };

  const handleImagePreview = (
    e: ChangeEvent<HTMLInputElement>,
    setPreviewFn: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewFn(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormData) => {
    const idStr = localStorage.getItem("profissionalId");
    const id = idStr ? Number(idStr) : null;

    if (!id || isNaN(id)) {
      alert("ID inválido. Faça login novamente.");
      return;
    }

    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("bio", data.bio);
    formData.append("telefone", data.telefone);
    formData.append("especialidade", data.especialidade);

    // Foto de perfil (campo único)
    formData.append("fotoPerfil", data.fotoPerfil[0]);

    // Documentos (array com dois arquivos)
    formData.append("documentos", data.ccFrente[0]);
    formData.append("documentos", data.ccVerso[0]);

    for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
    try {
      setLoading(true);
      const resposta = await completarPerfil(formData);
      console.log("Perfil atualizado:", resposta);
      Swal.fire({
        title: "Deu certo!",
        text: "Cadastro completo!",
        icon: "success",
      });
      localStorage.clear();
      navigate("/areadoprofissional");
    } catch (erro) {
      console.error("Erro ao atualizar perfil:", erro);
      Swal.fire({
        title: "Erro!",
        text: "O seu registo não foi concluído, tente novamente!",
        icon: "error",
      });
    } finally {
      setLoading(false);
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

        {/* FOTO PERFIL */}
        <div className="image-upload">
          <label>Foto de Perfil</label>
          {preview ? (
            <img src={preview} alt="Preview" className="preview" />
          ) : (
            <div className="placeholder">Prévia</div>
          )}
          <input
            type="file"
            accept="image/*"
            {...register("fotoPerfil", { validate: validateFileSize })}
            onChange={(e) => {
              handleImagePreview(e, setPreview);
              (register("fotoPerfil").onChange as any)(e);
            }}
          />
          {errors.fotoPerfil && (
            <p className="error">{errors.fotoPerfil.message?.toString()}</p>
          )}
        </div>

        {/* CARTÃO DE CIDADÃO FRENTE */}
        <div className="image-upload">
          <label>Cartão de Cidadão - Frente</label>
          {previewFrente ? (
            <img src={previewFrente} alt="CC Frente" className="preview-cartao" />
          ) : (
            <div className="placeholder-cartao">Prévia</div>
          )}
          <input
            type="file"
            accept="image/*"
            {...register("ccFrente", { validate: validateFileSize })}
            onChange={(e) => {
              handleImagePreview(e, setPreviewFrente);
              (register("ccFrente").onChange as any)(e);
            }}
          />
          {errors.ccFrente && (
            <p className="error">{errors.ccFrente.message?.toString()}</p>
          )}
        </div>

        {/* CARTÃO DE CIDADÃO VERSO */}
        <div className="image-upload">
          <label>Cartão de Cidadão - Verso</label>
          {previewVerso ? (
            <img src={previewVerso} alt="CC Verso" className="preview-cartao" />
          ) : (
            <div className="placeholder-cartao">Prévia</div>
          )}
          <input
            type="file"
            accept="image/*"
            {...register("ccVerso", { validate: validateFileSize })}
            onChange={(e) => {
              handleImagePreview(e, setPreviewVerso);
              (register("ccVerso").onChange as any)(e);
            }}
          />
          {errors.ccVerso && (
            <p className="error">{errors.ccVerso.message?.toString()}</p>
          )}
        </div>

        {/* BIO */}
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea id="bio" placeholder="Digite algo sobre você..." {...register("bio")} />
        </div>

        {/* TELEFONE */}
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <Controller
            name="telefone"
            control={control}
            rules={{
              required: "Telefone é obrigatório",
              validate: (value) => (value && value.length >= 10) || "Telefone inválido",
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
          {errors.telefone && <p className="error">{errors.telefone.message?.toString()}</p>}
        </div>

        {/* ESPECIALIDADE */}
        <div className="form-group">
          <label htmlFor="especialidade">Especialidade:</label>
          <select
            id="especialidade"
            {...register("especialidade", { required: "Selecione uma especialidade" })}
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
              <option value="Desentupimentos">Desentupimentos</option>
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
              <option value="Entupimentos graves">Entupimentos graves</option>
              <option value="Problemas com aquecedores">
                Problemas com aquecedores
              </option>
            </optgroup>
          </select>
          {errors.especialidade && (
            <p className="error">{errors.especialidade.message?.toString()}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Salvar"}
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default ProfileForm;
