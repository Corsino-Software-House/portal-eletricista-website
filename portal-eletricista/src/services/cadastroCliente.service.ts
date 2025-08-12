
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/', 
});



export const cadastroCliente = async (nome : string,email : string, senha : string) => {
  try {
    const response = await api.post('/cliente/register', {
      nome,
      email,
      senha,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao fazer cadastro de cliente', err.response?.data || err.message);
    throw error;
  }
};

export const verClientes = async () => {
  try {
    const response = await api.get('/cliente/see-all');
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao buscar profissionais:', err.response?.data || err.message);
    throw error;
  }
}
