
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portal-eletricista-api.onrender.com', 
});



export const infoCliente = async (email : string) => {
  try {
    const response = await api.get('/cliente/account', {
      params: { email },
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao fazer cadastro de cliente', err.response?.data || err.message);
    throw error;
  }
};
export const infoProfissional = async ( email : string) => {
  try {
    const response = await api.get('/profissional/account', {
     params: { email },
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao fazer cadastro de profissional', err.response?.data || err.message);
    throw error;
  }
};