// completarPerfil.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portal-eletricista-api.onrender.com',
});

export const completarPerfil = async (formData: FormData) => {
  try {
    const response = await api.put('/profissional/complete-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao completar perfil:', err.response?.data || err.message);
    throw error;
  }
};

export const completarPerfilCliente = async (formData: FormData) => {
  try {
    const response = await api.put('/cliente/complete-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao completar perfil:', err.response?.data || err.message);
    throw error;
  }
};
