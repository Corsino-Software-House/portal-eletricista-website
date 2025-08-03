import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portal-eletricista-api.onrender.com/', 
});

export async function totalClientes() {
  const response = await api.get('/cliente/total');
  return response.data;
}

export async function totalProfissional() {
  const response = await api.get('/profissional/total');
  return response.data;
}

export async function totalSubscriptions() {
  const response = await api.get('/subscriptions/valorPagoTotal');
  return response.data;
}

export async function totalProjetos() {
  const response = await api.get('/requests/total');
  return response.data;
}