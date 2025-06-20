// src/services/users.service.ts
import api from '../api/axiosInstance';

export const getAllUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const getUserById = async (id: number) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
