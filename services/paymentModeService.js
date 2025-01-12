import axios from 'axios';
import API_BASE_URL from './baseServiceConfig';

const apiUrl = API_BASE_URL+'/api/payment-modes/';

const getPaymentModes = () => {
  return axios.get(apiUrl);
};

const getPaymentModeById = (id) => {
  return axios.get(`${apiUrl}${id}/`);
};

const createPaymentMode = (paymentMode) => {
  return axios.post(apiUrl, paymentMode);
};

const updatePaymentMode = (id, paymentMode) => {
  return axios.put(`${apiUrl}${id}/`, paymentMode);
};

const deletePaymentMode = (id) => {
  return axios.delete(`${apiUrl}${id}/`);
};

export default {
  getPaymentModes,
  getPaymentModeById,
  createPaymentMode,
  updatePaymentMode,
  deletePaymentMode
};
