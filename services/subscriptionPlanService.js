import axios from 'axios';
import { API_BASE_URL } from './baseServiceConfig';

const apiUrl = `${API_BASE_URL}/api/subscription-plans/`;
const languageApiUrl = `${API_BASE_URL}/api/subscription-languages/`;
const modeApiUrl = `${API_BASE_URL}/api/subscription-modes/`;

const getToken = () => {
  if (import.meta.client) {
    return localStorage.getItem('token');
  }
  return null;
};

const getPlans = () => {
  const token = getToken();
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getPlanById = (id) => {
  const token = getToken();
  return axios.get(`${apiUrl}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createPlan = (plan) => {
  const token = getToken();
  return axios.post(apiUrl, plan, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updatePlan = (id, plan) => {
  const token = getToken();
  return axios.put(`${apiUrl}${id}/`, plan, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deletePlan = (id) => {
  const token = getToken();
  return axios.delete(`${apiUrl}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getLanguages = () => {
  const token = getToken();
  return axios.get(languageApiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getModes = () => {
  const token = getToken();
  return axios.get(modeApiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  getLanguages,
  getModes,
};
