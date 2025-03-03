import axios from 'axios';
import API_BASE_URL from './baseServiceConfig';

const apiUrl = API_BASE_URL + '/api/subscribers/';

const getToken = () => {
  if (import.meta.client) {
    return localStorage.getItem('token');
  }
  return null;
};

const getReport = (filters) => {
  const token = getToken();
  return axios.get(`${apiUrl}report/`, {
    params: filters,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const downloadPdfReport = (filters) => {
  const token = getToken();
  return axios.get(`${apiUrl}generate_pdf_report/`, {
    responseType: 'blob',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: filters,
  });
};

export default {
  getReport,
  downloadPdfReport,
};