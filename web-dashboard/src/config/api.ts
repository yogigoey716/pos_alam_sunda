// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://e406178f95ec.ngrok-free.app/new-pos-api',
  ENDPOINTS: {
    LOGIN: '/login/auth',
    LOGOUT: '/logout',
    TRANSACTIONS: '/transactions/transactions',
    PRODUCTS: '/products',
    // Add more endpoints as needed
  },
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
