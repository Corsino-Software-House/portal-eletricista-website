
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portal-eletricista-api.onrender.com', 
});



export const alterarSenhaCliente = async (id : string, senhaAtual : string, novaSenha : string) => {
  try {
    const response = await api.put('/cliente/change-password', {
      id,
      senhaAtual,
      novaSenha,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao alterar senha:', err.response?.data || err.message);
    throw error;
  }
};

export const alterarSenhaProfissional = async (id : string, senhaAtual : string, novaSenha : string) => {
  try {
    const response = await api.put('/profissional/change-password', {
      id,
      senhaAtual,
      novaSenha,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao alterar senha:', err.response?.data || err.message);
    throw error;
  }
};
