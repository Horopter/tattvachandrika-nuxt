import axios from 'axios';
import { API_BASE_URL } from './baseServiceConfig';

const apiUrl = `${API_BASE_URL}/api/subscriber-categories/`;

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

const getSubscriberCategories = () => {
  const token = getToken();
  return axiosInstance.get('', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSubscriberCategoryById = (id) => {
  const token = getToken();
  return axiosInstance.get(`${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createSubscriberCategory = (subscriberCategory) => {
  const token = getToken();
  return axiosInstance.post('', subscriberCategory, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateSubscriberCategory = (id, subscriberCategory) => {
  const token = getToken();
  return axiosInstance.put(`${id}/`, subscriberCategory, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteSubscriberCategory = (id) => {
  const token = getToken();
  return axiosInstance.delete(`${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getSubscriberCategories,
  getSubscriberCategoryById,
  createSubscriberCategory,
  updateSubscriberCategory,
  deleteSubscriberCategory,
};
