// API Configuration
export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/new-pos-api';
export const API_CONFIG = {
  ENDPOINTS: {
    LOGIN: '/login/auth',
    LOGOUT: '/login/logout',
    TRANSACTIONS: '/transactions/transactions',
    PRODUCTS: '/product/all-products',
    CREATE_PRODUCT: '/product/create-product',
    MS_KATEGORI: '/category/all-categories',
    // Add more endpoints as needed
  },
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string) => {
  return `${BASE_URL}${endpoint}`;
};