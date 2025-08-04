

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.techmanlight.pt/',
});

export const editarPerfilProfissional = (data: FormData) => {
  return api.put('/profissional/edit-profile', data, {
    headers: {
      'Content-Type': 'multipart/form-data', // opcional, axios já seta
    },
  });
};

export const editarPerfilCliente = (data: FormData) => {
  return api.put('/cliente/edit-profile', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
