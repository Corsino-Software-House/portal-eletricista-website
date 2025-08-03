import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portal-eletricista-api.onrender.com/',
});

type CreateRequestData = {
  clienteId: number;
  titulo: string;
  descricao: string;
  cidade: string;
  bairro: string;
  especialidade: string;
};

export interface Request {
  id: number;
  titulo: string;
  descricao: string;
  cidade: string;
  bairro: string;
  especialidade: string;
  clienteId: number;
  concluido: boolean;
}

export const criarRequest = async (data: CreateRequestData) => {
  try {
    const response = await api.post('/requests/create', data);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar request:', error.response?.data || error.message);
    throw error;
  }
};

export const buscarTodasRequests = async (): Promise<Request[]> => {
  try {
    const response = await api.get('/requests/all');
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar todas as requests:', error.response?.data || error.message);
    throw error;
  }
};

export const buscarRequestsPorCliente = async (clienteId: number): Promise<Request[]> => {
  try {
    const response = await api.get(`/requests/cliente/${clienteId}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar requests do cliente:', error.response?.data || error.message);
    throw error;
  }
};

export const buscarRequestPorId = async (id: number): Promise<Request> => {
  try {
    const response = await api.get(`/requests/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar request por ID:', error.response?.data || error.message);
    throw error;
  }
};

export const concluirRequest = async (id: number) => {
  try {
    const response = await api.patch(`/requests/${id}/concluir`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao concluir request:', error.response?.data || error.message);
    throw error;
  }
};

export const deletarRequest = async (id: number) => {
  try {
    const response = await api.delete(`/requests/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao deletar request:', error.response?.data || error.message);
    throw error;
  }
};
