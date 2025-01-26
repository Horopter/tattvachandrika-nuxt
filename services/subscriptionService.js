import axios from 'axios';
import { API_BASE_URL } from './baseServiceConfig';

const API_URL = `${API_BASE_URL}/api/subscriptions/`;
const API_PAYMENT_MODES_URL = `${API_BASE_URL}/api/payment-modes/`;

const getToken = () => {
  if (import.meta.client) {
    return localStorage.getItem('token');
  }
  return null;
};

const getSubscriptions = () => {
  const token = getToken();
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSubscriptionById = (id) => {
  const token = getToken();
  return axios.get(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createSubscription = (subscription) => {
  const token = getToken();
  return axios.post(API_URL, subscription, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateSubscription = (id, subscription) => {
  const token = getToken();
  return axios.put(`${API_URL}${id}/`, subscription, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getPaymentModes = () => {
  const token = getToken();
  return axios.get(API_PAYMENT_MODES_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSubscriptionsBySubscriber = (subscriberId) => {
  const token = getToken();
  return axios.get(`${API_URL}by_subscriber/${subscriberId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  getPaymentModes,
  getSubscriptionsBySubscriber,
};
