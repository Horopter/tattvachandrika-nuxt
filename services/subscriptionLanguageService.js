import axios from 'axios';
import { API_BASE_URL } from './baseServiceConfig';

const apiUrl = `${API_BASE_URL}/api/subscription-languages/`;

// Function to get the stored token
const getToken = () => {
  if (import.meta.client) {
    return localStorage.getItem('token');
  }
  return null;
};

// Create an Axios instance with baseURL
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

const getSubscriptionLanguages = () => {
  const token = getToken();
  return axiosInstance.get('', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSubscriptionLanguageById = (id) => {
  const token = getToken();
  return axiosInstance.get(`${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createSubscriptionLanguage = (subscriptionLanguage) => {
  const token = getToken();
  return axiosInstance.post('', subscriptionLanguage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateSubscriptionLanguage = (id, subscriptionLanguage) => {
  const token = getToken();
  return axiosInstance.put(`${id}/`, subscriptionLanguage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteSubscriptionLanguage = (id) => {
  const token = getToken();
  return axiosInstance.delete(`${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getSubscriptionLanguages,
  getSubscriptionLanguageById,
  createSubscriptionLanguage,
  updateSubscriptionLanguage,
  deleteSubscriptionLanguage,
};
