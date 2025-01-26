import axios from 'axios';
import { API_BASE_URL } from './baseServiceConfig';

const apiUrl = `${API_BASE_URL}/api/subscriber-types/`;

const getToken = () => {
  if (import.meta.client) {
    return localStorage.getItem('token');
  }
  return null;
};

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

const getSubscriberTypes = () => {
  const token = getToken();
  return axiosInstance.get('', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSubscriberTypeById = (id) => {
  const token = getToken();
  return axiosInstance.get(`${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createSubscriberType = (subscriberType) => {
  const token = getToken();
  return axiosInstance.post('', subscriberType, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateSubscriberType = (id, subscriberType) => {
  const token = getToken();
  return axiosInstance.put(`${id}/`, subscriberType, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteSubscriberType = (id) => {
  const token = getToken();
  return axiosInstance.delete(`${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getSubscriberTypes,
  getSubscriberTypeById,
  createSubscriberType,
  updateSubscriberType,
  deleteSubscriberType,
};
