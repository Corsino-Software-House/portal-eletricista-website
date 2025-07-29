// src/pages/EditarPerfil.tsx
import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import { editarPerfilCliente } from '../../services/editarPerfil.service';
import { editarPerfilProfissional } from '../../services/editarPerfil.service';

export default function EditarPerfil() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    bio: '',
  });

  const [tipoUsuario, setTipoUsuario] = useState('');
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  useEffect(() => {
    const tipo = localStorage.getItem('tipo');
    if (tipo) setTipoUsuario(tipo);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const idStr = localStorage.getItem('id');
  const id = idStr ? Number(idStr) : null;

  if (!id || isNaN(id)) {
    alert("ID inválido. Faça login novamente.");
    return;
  }

  try {
    const formDataToSend = new FormData();

    formDataToSend.append('id', String(id));
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('telefone', formData.telefone);

    if (tipoUsuario === 'profissional') {
      formDataToSend.append('bio', formData.bio);
    }

    if (fotoFile) {
      formDataToSend.append('foto', fotoFile); // O nome 'foto' deve ser o esperado pelo backend
    }

    if (tipoUsuario === 'profissional') {
      await editarPerfilProfissional(formDataToSend);
    } else {
      await editarPerfilCliente(formDataToSend);
    }

    alert('Perfil atualizado com sucesso!');
    localStorage.setItem('email', formData.email);
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    alert('Erro ao atualizar o perfil.');
  }
};

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Header />
        <div className="editar-perfil-container">
          <h1 className="editar-perfil-title">Editar Perfil</h1>
          <form className="editar-perfil-form" onSubmit={handleSubmit}>
            <label>
              Nome
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Telefone
              <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} />
            </label>
            <label>
              Foto de Perfil
              <input type="file" accept="image/*" onChange={handleFotoChange} />
              {fotoPreview && <img src={fotoPreview} alt="Preview" className="editar-perfil-preview" />}
            </label>
            {tipoUsuario === 'profissional' && (
              <label>
                Bio
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} />
              </label>
            )}
            <button type="submit" className="editar-perfil-button">Salvar</button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}
