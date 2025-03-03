import axios from "axios";
import { API_BASE_URL } from "./baseServiceConfig";

const apiUrl = API_BASE_URL + "/api/subscription-modes/"; // Adjust the URL to your API endpoint

// Function to get the stored token
const getToken = () => {
  if (import.meta.client) {
    return localStorage.getItem("token"); // Access localStorage only on the client
  }
  return null; // Return null if not on the client
};

// Axios instance with default baseURL
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

// GET all subscription modes (with optional searchText)
const getSubscriptionModes = (searchText = "") => {
  const token = getToken();
  return axiosInstance.get("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      name: searchText,
    },
  });
};

// GET a specific subscription mode by ID
const getSubscriptionModeById = (id) => {
  const token = getToken();
  return axiosInstance.get(`${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// CREATE a new subscription mode
const createSubscriptionMode = (subscriptionMode) => {
  const token = getToken();
  return axiosInstance.post(
    "",
    subscriptionMode,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// UPDATE an existing subscription mode by ID
const updateSubscriptionMode = (id, subscriptionMode) => {
  const token = getToken();
  return axiosInstance.put(
    `${id}/`,
    subscriptionMode,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// DELETE a subscription mode by ID
const deleteSubscriptionMode = (id) => {
  const token = getToken();
  return axiosInstance.delete(`${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getSubscriptionModes,
  getSubscriptionModeById,
  createSubscriptionMode,
  updateSubscriptionMode,
  deleteSubscriptionMode,
};
