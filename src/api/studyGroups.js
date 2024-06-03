import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'http://localhost:5000/api';

export const fetchStudyGroups = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/groups`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createStudyGroup = async (name, userId) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/groups/create`, { name, userId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const joinStudyGroup = async (id, userId) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/groups/${id}/join`, { userId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const leaveStudyGroup = async (id, userId) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/groups/${id}/leave`, { userId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteStudyGroup = async (id) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/groups/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const searchStudyGroups = async (searchTerm) => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/groups/search?searchTerm=${searchTerm}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const fetchUserCreatedGroups = async (userId) => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/groups/user/${userId}/created`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
