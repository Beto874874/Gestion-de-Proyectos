import axios from 'axios';

const API_URL = 'http://localhost:5000/api/colaboradores';

const getToken = () => localStorage.getItem('token');

export const getColaboradores = async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const createColaborador = async (data) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const updateColaborador = async (nif, data) => {
  const res = await axios.put(`${API_URL}/${nif}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const deleteColaborador = async (nif) => {
  const res = await axios.delete(`${API_URL}/${nif}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};