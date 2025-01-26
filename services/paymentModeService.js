import axios from 'axios';
import API_BASE_URL from './baseServiceConfig';

const apiUrl = API_BASE_URL + '/api/payment-modes/';

const getToken = () => {
  if (import.meta.client) {
    return localStorage.getItem('token');
  }
  return null;
};

const getPaymentModes = () => {
  const token = getToken();
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getPaymentModeById = (id) => {
  const token = getToken();
  return axios.get(`${apiUrl}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createPaymentMode = (paymentMode) => {
  const token = getToken();
  return axios.post(apiUrl, paymentMode, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updatePaymentMode = (id, paymentMode) => {
  const token = getToken();
  return axios.put(`${apiUrl}${id}/`, paymentMode, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deletePaymentMode = (id) => {
  const token = getToken();
  return axios.delete(`${apiUrl}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getPaymentModes,
  getPaymentModeById,
  createPaymentMode,
  updatePaymentMode,
  deletePaymentMode,
};
