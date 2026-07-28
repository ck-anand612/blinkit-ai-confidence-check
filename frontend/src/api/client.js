import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  const response = await apiClient.get('/api/products');
  return response.data;
};

export const getProduct = async (id) => {
  const response = await apiClient.get(`/api/products/${id}`);
  return response.data;
};

export const getConfidenceCheck = async (productId, concern) => {
  const response = await apiClient.post('/api/confidence-check', {
    product_id: productId,
    concern: concern,
  });
  return response.data;
};

export default apiClient;
