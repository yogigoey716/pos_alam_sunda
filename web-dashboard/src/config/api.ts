// API Configuration
export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/new-pos-api';
export const API_CONFIG = {
  ENDPOINTS: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    TRANSACTIONS: '/transactions/',
    PRODUCTS: '/product/',
    CREATE_PRODUCT: '/product/',
    MS_KATEGORI: '/category/',
    GET_PRODUCT_INGREDIENTS: '/product-ingredients/'
    // Add more endpoints as needed
  },
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string) => {
  return `${BASE_URL}${endpoint}`;
};