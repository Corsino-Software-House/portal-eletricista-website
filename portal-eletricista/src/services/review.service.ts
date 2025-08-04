
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/', 
});

interface NovaRequest {
  profissionalId: number;
  clienteId: number;
  nota: number;
  comentario: string;
}

interface Review {
  id: number;
  nota: number;
  comentario: string;
  criadoEm: string;
  cliente: {
    nome: string;
    fotoUrl?: string;
  };
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

export const buscarAvaliacoesPorProfissional = async (profissionalId: number): Promise<Review[]> => {
  try {
    const response = await api.get(`/review/profissional/${profissionalId}`);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao buscar avaliações:', err.response?.data || err.message);
    throw error;
  }
};
