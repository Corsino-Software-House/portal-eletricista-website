
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/', 
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
export const alterarSenhaProfissionalPorEmail = async (email : string,  novaSenha : string) => {
  try {
    const response = await api.put('/profissional/recovery-password', {
      email,
      novaSenha,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao alterar senha:', err.response?.data || err.message);
    throw error;
  }
};

export const alterarSenhaClientePorEmail = async (email : string, novaSenha : string) => {
  try {
    const response = await api.put('/cliente/recovery-password', {
      email,
      novaSenha,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao alterar senha:', err.response?.data || err.message);
    throw error;
  }
};

export const alterarSenhaAdminPorEmail = async (email : string, novaSenha : string) => {
  try {
    const response = await api.put('/admin/recovery-password', {
      email,
      novaSenha,
    });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao alterar senha:', err.response?.data || err.message);
    throw error;
  }
};