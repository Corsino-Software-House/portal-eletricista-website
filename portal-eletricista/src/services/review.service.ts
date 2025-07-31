
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

interface NovaRequest {
  profissionalId: number;
  clienteId: number;
  nota: number;
  comentario: string;
}

export const criarRequest = async (data: NovaRequest) => {
  try {
    const response = await api.post('/review/create', data);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao criar request:', err.response?.data || err.message);
    throw error;
  }
};
