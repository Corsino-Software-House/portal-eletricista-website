import React, { useState, type ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
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
  especialidades: string[];
  fotoPerfil: FileList; // campo único para foto perfil
  ccFrente: FileList; // frente documento
  ccVerso: FileList; // verso documento
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
      especialidades: [],
    },
  });
  const opcoesEspecialidades = [
    {
      label: "Elétrica",
      options: [
        {
          value: "Instalação elétrica completa",
          label: "Instalação elétrica completa (obra nova ou remodelação)",
        },
        {
          value: "Substituição de quadros elétricos",
          label: "Substituição de quadros elétricos",
        },
        {
          value: "Instalação de disjuntores e diferencial",
          label: "Instalação de disjuntores e diferencial",
        },
        {
          value: "Passagem e substituição de cabos",
          label: "Passagem e substituição de cabos",
        },
        { value: "Tomadas e interruptores", label: "Tomadas e interruptores" },
        {
          value: "Iluminação interior e exterior",
          label: "Iluminação interior e exterior",
        },
        {
          value: "Ventoinhas de teto e exaustores",
          label: "Ventoinhas de teto e exaustores",
        },
        {
          value: "Manutenção preventiva de sistemas elétricos",
          label: "Manutenção preventiva de sistemas elétricos",
        },
        { value: "Certificação elétrica", label: "Certificação elétrica" },
        {
          value: "Inspeções técnicas e diagnósticos de falha",
          label: "Inspeções técnicas e diagnósticos de falha",
        },
      ],
    },
    {
      label: "Domótica / Smart Home",
      options: [
        {
          value: "Instalação e configuração de assistentes virtuais",
          label: "Instalação e configuração de assistentes virtuais",
        },
        {
          value: "Tomadas e interruptores inteligentes",
          label: "Tomadas e interruptores inteligentes",
        },
        {
          value: "Automatização de iluminação e persianas",
          label: "Automatização de iluminação e persianas",
        },
        {
          value: "Instalação de câmeras de vigilância (CCTV)",
          label: "Instalação de câmeras de vigilância (CCTV)",
        },
        {
          value: "Instalação de sensores de segurança",
          label: "Instalação de sensores de segurança",
        },
        { value: "Controle remoto via app", label: "Controle remoto via app" },
        {
          value: "Integração de sistemas com domótica",
          label: "Integração de sistemas com domótica",
        },
        {
          value: "Consultoria e otimização com smart meter",
          label: "Consultoria e otimização com smart meter",
        },
      ],
    },
    {
      label: "Hidráulica / Canalização",
      options: [
        { value: "Reparação de fugas de água", label: "Reparação de fugas de água" },
        { value: "Desentupimentos", label: "Desentupimentos" },
        {
          value: "Instalação de torneiras e chuveiros",
          label: "Instalação de torneiras e chuveiros",
        },
        {
          value: "Substituição de loiças sanitárias",
          label: "Substituição de loiças sanitárias",
        },
        {
          value: "Instalação de máquinas de lavar",
          label: "Instalação de máquinas de lavar",
        },
        {
          value: "Substituição de autoclismos",
          label: "Reparação e substituição de autoclismos",
        },
        {
          value: "Montagem de sistemas de filtragem de água",
          label: "Montagem de sistemas de filtragem de água",
        },
        {
          value: "Canalizações para obras",
          label: "Canalizações para obras",
        },
        {
          value: "Verificação e substituição de esgotos",
          label: "Verificação e substituição de esgotos",
        },
        {
          value: "Ensaios hidráulicos",
          label: "Ensaios hidráulicos",
        },
      ],
    },
    {
      label: "Serviços Gerais e Emergência",
      options: [
        {
          value: "Reparos simples elétricos e hidráulicos",
          label: "Reparos simples elétricos e hidráulicos",
        },
        {
          value: "Manutenção periódica",
          label: "Manutenção periódica",
        },
        {
          value: "Pequenas remodelações",
          label: "Pequenas remodelações",
        },
        {
          value: "Instalação de suportes e luminárias",
          label: "Instalação de suportes e luminárias",
        },
        {
          value: "Falta de energia elétrica",
          label: "Falta de energia elétrica",
        },
        {
          value: "Disjuntor queimado / quadro disparando",
          label: "Disjuntor queimado / quadro disparando",
        },
        {
          value: "Fugas de água ou risco de inundação",
          label: "Fugas de água ou risco de inundação",
        },
        { value: "Entupimentos graves", label: "Entupimentos graves" },
        {
          value: "Problemas com aquecedores",
          label: "Problemas com aquecedores",
        },
      ],
    },
  ];

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
    data.especialidades.forEach((esp) => {
      formData.append("especialidades[]", esp);
    });

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
        height: "200vh",
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
            <img
              src={previewFrente}
              alt="CC Frente"
              className="preview-cartao"
            />
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
          <textarea
            id="bio"
            placeholder="Digite algo sobre você..."
            {...register("bio")}
          />
        </div>

        {/* TELEFONE */}
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

        {/* ESPECIALIDADE */}
        <div className="form-group">
          <label htmlFor="especialidade">Especialidade:</label>
          <Controller
            name="especialidades"
            control={control}
            rules={{ required: "Selecione ao menos uma especialidade" }}
            render={({ field }) => (
              <Select
                {...field}
                options={opcoesEspecialidades}
                isMulti
                closeMenuOnSelect={false}
                placeholder="Selecione suas especialidades..."
                onChange={(selectedOptions) => {
                  // converte para array de strings
                  field.onChange(selectedOptions.map((opt) => opt.value));
                }}
                value={opcoesEspecialidades
                  .flatMap((grupo) => grupo.options)
                  .filter((opt) => field.value?.includes(opt.value))}
              />
            )}
          />
          {errors.especialidades && (
            <p className="error">{errors.especialidades.message?.toString()}</p>
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
