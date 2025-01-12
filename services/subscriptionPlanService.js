import axios from 'axios';
import { API_BASE_URL } from './baseServiceConfig';

const apiUrl = API_BASE_URL+'/api/subscription-plans/';
const languageApiUrl = API_BASE_URL+'/api/subscription-languages/';
const modeApiUrl = API_BASE_URL+'/api/subscription-modes/';

const getPlans = () => {
  return axios.get(apiUrl);
};

const getPlanById = (id) => {
  return axios.get(`${apiUrl}${id}/`);
};

const createPlan = (plan) => {
  return axios.post(apiUrl, plan);
};

const updatePlan = (id, plan) => {
  return axios.put(`${apiUrl}${id}/`, plan);
};

const deletePlan = (id) => {
  return axios.delete(`${apiUrl}${id}/`);
};

const getLanguages = () => {
  return axios.get(languageApiUrl);
};

const getModes = () => {
  return axios.get(modeApiUrl);
};

export default {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  getLanguages,
  getModes,
};
