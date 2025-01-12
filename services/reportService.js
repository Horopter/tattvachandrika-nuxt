import axios from 'axios';
import API_BASE_URL from './baseServiceConfig';

const apiUrl = API_BASE_URL+'/api/subscribers/';

const getReport = (filters) => {
  // `filters` is an object containing query parameters such as `status` and `userType`
  return axios.get(`${apiUrl}report/`, {
    params: filters,
    headers: {
      'accept': 'application/json',
    },
  });
};

const downloadPdfReport = (filters) => {
    return axios.get(`${apiUrl}generate_pdf_report/`, {
      responseType: 'blob', // Ensure the response is treated as a binary file
      headers: {
        'accept': 'application/json',
      },
      params: filters, // Pass filters as query parameters
    });
  };

export default {
  getReport,
  downloadPdfReport,
};
