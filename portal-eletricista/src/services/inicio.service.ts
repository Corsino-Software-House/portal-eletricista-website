import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/',
});

export async function buscarReviewsRecentes() {
  const response = await api.get('/review/recent');
  return response.data;
}

export async function buscarProfissionaisMaisAvaliados() {
  const response = await api.get('/profissional/top-avaliados');
  return response.data;
}