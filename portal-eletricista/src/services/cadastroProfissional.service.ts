
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});



export const cadastroProfissional = async (nome : string,email : string, senha : string, cidade : string, bairro : string) => {
  try {
    const response = await api.post('/profissional/register', {
      nome,
      email,
      senha,
      cidade,
      bairro,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao fazer cadastro de profissional:', err.response?.data || err.message);
    throw error;
  }
};

export const verProfissionais = async () => {
  try {
    const response = await api.get('/profissional/see-all');
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao buscar profissionais:', err.response?.data || err.message);
    throw error;
  }
}

export const verProfissionalPorId = async (id: number) => {
  try {
    const response = await api.get(`/profissional/${id}`);
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao buscar profissional por ID:', err.response?.data || err.message);
    throw error;
  }
};
