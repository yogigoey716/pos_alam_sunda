// API Configuration
export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/new-pos-api';
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

    //master payment methods
    GET_MS_PAYMENT_METHODS: '/payment-methods/',
    CREATE_MS_PAYMENT_METHODS: '/payment-methods/',
    GET_MS_PAYMENT_METHODS_PROJECTIONS: '/payment-methods/projections/',

    //stock bahan
    GET_STOCK_INGREDIENTS: '/branch-ingredients/',
    CREATE_STOCK_INGREDIENTS: '/branch-ingredients/',
    GET_STOCK_INGREDIENTS_PROJECTIONS: '/branch-ingredients/projections/',
    UPDATE_STOCK_INGREDIENTS_MINIMUM_STOCK: '/branch-ingredients/update-minimum-stock/',

    //stock produk
    GET_STOCK_PRODUCTS: '/branch-products/',
    CREATE_STOCK_PRODUCTS: '/branch-products/',
    GET_STOCK_PRODUCTS_PROJECTIONS: '/branch-products/projections/',
    UPDATE_STOCK_PRODUCTS_MINIMUM_STOCK: '/branch-products/update-minimum-stock/',

    //get frequently used material
    GET_FREQUENTLY_USED_MATERIAL: '/transaction-items/frequently-used-material',

    //product production
    GET_PRODUCT_PRODUCTION: '/product-productions/',
    CREATE_PRODUCT_PRODUCTION: '/product-productions/',
    GET_PRODUCT_PRODUCTION_PROJECTIONS: '/product-productions/projections/',

    //master user
    USER: '/users/',

    //master role
    ROLE: '/roles/',
    GET_ROLES_PROJECTIONS: '/roles/projections/',
    // Add more endpoints as needed
  },
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string) => {
  return `${BASE_URL}${endpoint}`;
};