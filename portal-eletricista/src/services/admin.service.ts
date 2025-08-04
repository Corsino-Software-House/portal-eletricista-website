import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/', 
});

export const cadastroAdmin = async (nome : string, email : string, senha : string) => {
  try {
    const response = await api.post('/admin/register', {
      nome,
      email,
      senha,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao fazer cadastro de admin', err.response?.data || err.message);
    throw error;
  }
};