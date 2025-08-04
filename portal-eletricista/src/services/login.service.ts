
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/', 
});



export const login = async (email : string, senha : string,tipo : 'admin'|'profissional'|'cliente') => {
  try {
    const response = await api.post('/auth/login', {
      email,
      senha,
      tipo
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao fazer login', err.response?.data || err.message);
    throw error;
  }
};
