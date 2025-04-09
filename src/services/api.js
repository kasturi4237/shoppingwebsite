import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Add request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const login = async (username, password) => {
  try {
    console.log('Attempting to login with:', { username, password });
    const response = await api.post('/auth/login', { username, password });
    console.log('Login response:', response.data);
     return response.data;
  } catch (error) {
    throw error;
  }
};

// Product endpoints
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;