
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/', 
});



export const infoCliente = async (email : string) => {
  try {
    const response = await api.get(`/cliente/account/${email}`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao buscar informacoes de cliente', err.response?.data || err.message);
    throw error;
  }
};
export const infoProfissional = async ( email : string) => {
  try {
    const response = await api.get(`/profissional/account/${email}`, {
     params: { email },
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao fazer uscar informacoes profissional', err.response?.data || err.message);
    throw error;
  }
};