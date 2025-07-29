

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portal-eletricista-api.onrender.com',
});

export const editarPerfilProfissional = (data: FormData) => {
  return api.put('/profissional/edit-profile', data, {
    headers: {
      'Content-Type': 'multipart/form-data', // opcional, axios já seta
    },
  });
};

export const editarPerfilCliente = (data: FormData) => {
  return axios.put('/cliente/edit-profile', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
