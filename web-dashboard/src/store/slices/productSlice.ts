import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  codeBarang: string;
  namaBarang: string;
  kategori: string;
  satuan: string;
  harga: number;
  hpp: number;
  stock: number;
  status: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    category: string;
    status: string;
  };
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    status: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { 
  setLoading, 
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  setError, 
  setFilters 
} = productSlice.actions;
export default productSlice.reducer;
