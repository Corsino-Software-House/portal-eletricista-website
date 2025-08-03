import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portal-eletricista-api.onrender.com', // Altere se necessário
});

export const usarCredito = async (data: {
  subscriptionId: number;
  requestId?: number;
  profissionalId: number;
  quantidade: number;
}) => {
  try {
    const response = await api.post('/creditos/usar', data);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao usar crédito:', err.response?.data || err.message);
    throw error;
  }
};

export const listarUsosPorProfissional = async (profissionalId: string) => {
  try {
    const response = await api.get(`/creditos/profissional/${profissionalId}`);
    console.log("Dados recebidos:", response.data);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao listar usos de crédito:', err.response?.data || err.message);
    throw error;
  }
};
