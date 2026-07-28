import axios from 'axios';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const getProduct = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const getConfidenceCheck = async (productId, concern) => {
  const response = await apiClient.post('/confidence-check', {
    product_id: productId,
    concern: concern,
  });
  return response.data;
};

export default apiClient;
