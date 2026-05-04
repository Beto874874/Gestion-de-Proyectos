import axios from 'axios';

const API_URL = 'http://localhost:5000/api/proyectos';

const getToken = () => localStorage.getItem('token');

export const getProyectos = async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const createProyecto = async (data) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const updateProyecto = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};

export const deleteProyecto = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.data;
};