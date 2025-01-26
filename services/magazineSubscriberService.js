import axios from 'axios';
import API_BASE_URL from './baseServiceConfig';

const apiUrl = API_BASE_URL + '/api/subscribers/';

const getToken = () => {
  if (import.meta.client) {
    return localStorage.getItem('token');
  }
  return null;
};

const getMagazineSubscribers = () => {
  const token = getToken();
  return axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMagazineSubscriberById = (id) => {
  const token = getToken();
  return axios.get(`${apiUrl}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createMagazineSubscriber = (subscriber) => {
  const token = getToken();
  return axios.post(apiUrl, subscriber, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateMagazineSubscriber = (id, subscriber) => {
  const token = getToken();
  return axios.put(`${apiUrl}${id}/`, subscriber, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const softDeleteMagazineSubscriber = (id) => {
  const token = getToken();
  return axios.delete(`${apiUrl}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const activateMagazineSubscriber = (id) => {
  const token = getToken();
  return axios.post(`${apiUrl}${id}/activate/`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getCategories = () => {
  const token = getToken();
  return axios.get(API_BASE_URL + '/api/subscriber-categories/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTypes = () => {
  const token = getToken();
  return axios.get(API_BASE_URL + '/api/subscriber-types/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getMagazineSubscribers,
  getMagazineSubscriberById,
  createMagazineSubscriber,
  updateMagazineSubscriber,
  softDeleteMagazineSubscriber,
  activateMagazineSubscriber,
  getCategories,
  getTypes
};
