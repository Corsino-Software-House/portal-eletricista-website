import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/', // ajuste para a URL real da sua API
});

// Enviar OTP para o email informado
export const sendOtp = async (email: string) => {
  try {
    const response = await api.post('/otp/send', { email });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao enviar OTP:', err.response?.data || err.message);
    throw error;
  }
};

// Validar o código OTP
export const validateOtp = async (email: string, code: string) => {
  try {
    const response = await api.post('/otp/validate', { email, code });
    return response.data;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao validar OTP:', err.response?.data || err.message);
    throw error;
  }
};
