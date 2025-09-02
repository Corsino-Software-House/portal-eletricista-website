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
  status: "ESPERA" | "APROVADO" | "REPROVADO";
  cliente: {
    nome: string;
    fotoUrl?: string;
  };
}

// Criar nova review
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

// Buscar avaliações por profissional
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

// Aprovar review
export const aprovarReview = async (id: number) => {
  try {
    const response = await api.put(`/review/accept/${id}`);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao aprovar review:', err.response?.data || err.message);
    throw error;
  }
};

// Negar review
export const negarReview = async (id: number) => {
  try {
    const response = await api.put(`/review/deny/${id}`);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao negar review:', err.response?.data || err.message);
    throw error;
  }
};

// Excluir review
export const excluirReview = async (id: number) => {
  try {
    const response = await api.delete(`/review/delete/${id}`);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao excluir review:', err.response?.data || err.message);
    throw error;
  }
};

export const buscarTodasAvaliacoes = async (): Promise<Review[]> => {
  try {
    const response = await api.get('/review/all'); // endpoint do backend que retorna todas
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao buscar todas as avaliações:', err.response?.data || err.message);
    throw error;
  }
};