import axios from 'axios';
import { API_BASE_URL } from './baseServiceConfig';

const API_URL = API_BASE_URL+'/api/subscriptions/';
const API_PAYMENT_MODES_URL = API_BASE_URL+'/api/payment-modes/';

const getSubscriptions = () => {
  return axios.get(API_URL);
};

const getSubscriptionById = (id) => {
  return axios.get(`${API_URL}${id}/`);
};

const createSubscription = (subscription) => {
  return axios.post(API_URL, subscription);
};

const updateSubscription = (id, subscription) => {
  return axios.put(`${API_URL}${id}/`, subscription);
};

const getPaymentModes = () => {
  return axios.get(API_PAYMENT_MODES_URL);
};

const getSubscriptionsBySubscriber = (subscriberId) => {
  return axios.get(`${API_URL}by_subscriber/${subscriberId}/`);
};

export default {
  getSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  getPaymentModes,
  getSubscriptionsBySubscriber
};
