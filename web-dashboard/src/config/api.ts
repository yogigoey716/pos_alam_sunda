// API Configuration
export const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://e406178f95ec.ngrok-free.app/new-pos-api');
export const API_CONFIG = {
  ENDPOINTS: {
    // auth
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',

    // transaksi
    TRANSACTIONS: '/transactions/',
  
    // master produk
    PRODUCTS: '/product/',
    GET_PRODUCTS_PROJECTIONS: '/product/projections/',
    CREATE_PRODUCT: '/product/',

    // master kategori
    GET_MS_KATEGORI: '/category/',
    GET_MS_KATEGORI_PROJECTIONS: '/category/projections/',

    // master bahan
    GET_MS_INGREDIENTS: '/ms-bahan/',
    CREATE_MS_INGREDIENTS: '/ms-bahan/',
    GET_MS_INGREDIENTS_PROJECTIONS: '/ms-bahan/projections/',

    // product bahan (resep)
    GET_PRODUCT_INGREDIENTS: '/product-ingredients/',
    CREATE_PRODUCT_INGREDIENTS: '/product-ingredients/',

    // master satuan
    GET_MS_SATUAN: '/ms-satuan/',
    CREATE_MS_SATUAN: '/ms-satuan/',
    GET_MS_SATUAN_PROJECTIONS: '/ms-satuan/projections/',

    // master supplier
    GET_MS_SUPPLIERS: '/ms-suppliers/',
    CREATE_MS_SUPPLIERS: '/ms-suppliers/',
    GET_MS_SUPPLIERS_PROJECTIONS: '/ms-suppliers/projections/',

    //pembelian bahan
    GET_INGREDIENT_PURCHASE: '/ingredients-purchases/',
    CREATE_INGREDIENT_PURCHASE: '/ingredients-purchases/',
    GET_INGREDIENT_PURCHASE_PROJECTIONS: '/ingredients-purchases/projections/',

    //master branch
    GET_MS_BRANCH: '/ms-branches/',
    CREATE_MS_BRANCH: '/ms-branches/',
    GET_MS_BRANCH_PROJECTIONS: '/ms-branches/projections/',
    // Add more endpoints as needed
  },
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string) => {
  return `${BASE_URL}${endpoint}`;
};