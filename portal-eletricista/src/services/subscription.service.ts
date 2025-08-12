import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/', 
});
export const CreditsoProfissional = async (id: number) => {
  try {
    const response = await api.get(`subscriptions/credito/${id}`);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao criar request:', err.response?.data || err.message);
    throw error;
  }
};

export const buscarAssinaturaAtiva = async (profissionalId: number) => {
  const response = await api.get(`/subscriptions/profissional/${profissionalId}`);
  return response.data;
};