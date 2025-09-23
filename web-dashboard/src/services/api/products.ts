import { apiFetch } from '@/lib/api';
import { API_CONFIG } from '@/config/api';
import { ProductDummy, ProductProjections, ProductResponse, ProductTable, RequestBodyProduct, UseProductsParams } from '@/types/product';
import { mockManagementStock } from './managementStock';

// Mock data - will be replaced with real API calls
export const mockProducts: ProductDummy[] = [
  {
    id: '1',
    name: "Nasi Ayam Kremes",
    category: "Makanan",
    stock: 50,
    price: 25000,
    status: "Tersedia",
    ingredients: [
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-001"); return { codeBarang: "BHN-001", stock: 0.15, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-002"); return { codeBarang: "BHN-002", stock: 0.2, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
  {
    id: '2',
    name: "Teh Manis Dingin",
    category: "Minuman", 
    stock: 70,
    price: 6000,
    status: "Tersedia",
    ingredients: [
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-003"); return { codeBarang: "BHN-003", stock: 0.05, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-006"); return { codeBarang: "BHN-006", stock: 0.02, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-007"); return { codeBarang: "BHN-007", stock: 0.1, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
  {
    id: '3',
    name: "Es Kopi Susu",
    category: "Minuman",
    stock: 30,
    price: 15000,
    status: "Tersedia",
    ingredients: [
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-004"); return { codeBarang: "BHN-004", stock: 0.02, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-006"); return { codeBarang: "BHN-006", stock: 0.02, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-007"); return { codeBarang: "BHN-007", stock: 0.1, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
  {
    id: '4',
    name: "Sate Maranggi",
    category: "Makanan",
    stock:  80,
    price: 30000,
    status: "Tersedia",
    ingredients: [
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-005"); return { codeBarang: "BHN-005", stock: 10, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
  {
    id: '5',
    name: "Soto Ayam",
    category: "Makanan",
    stock: 40,
    price: 20000,
    status: "Tersedia",
    ingredients: [
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-001"); return { codeBarang: "BHN-001", stock: 0.1, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-002"); return { codeBarang: "BHN-002", stock: 0.15, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
  {
    id: '6',
    name: "Jus Jeruk",
    category: "Minuman",
    stock: 25,
    price: 12000,
    status: "Tersedia",
    ingredients: [],
    // ingredients intentionally left empty for demo
  },
  {
    id: '7',
    name: "Lemon Tea",
    category: "Minuman",
    stock: 15,
    price: 8000,
    status: "Stok Rendah",
    ingredients: [
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-003"); return { codeBarang: "BHN-003", stock: 0.05, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-007"); return { codeBarang: "BHN-007", stock: 0.1, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
  {
    id: '8',
    name: "Mie Goreng",
    category: "Makanan",
    stock: 10,
    price: 18000,
    status: "Stok Rendah",
    ingredients: [],
    // ingredients intentionally left empty for demo
  },
  {
    id: '9',
    name: "Nasi Goreng",
    category: "Makanan",
    stock: 0,
    price: 22000,
    status: "Habis",
    ingredients: [],
    // ingredients intentionally left empty for demo
  },
  {
    id: '10',
    name: "Ayam Bakar",
    category: "Makanan",
    stock: 5,
    price: 28000,
    status: "Stok Rendah",
    ingredients: [
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-001"); return { codeBarang: "BHN-001", stock: 0.2, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
];

// Real API functions (to replace mock data)
export const productsApi = {
  status: "",
  cate: "",
  search: "",
  page: 1,
  size: 10,
  startDate: "",
  endDate: "",
  // Get all products
  getAll: async ({
    status,
    cate,
    search,
    page,
    size,
    startDate,
    endDate,
  }: UseProductsParams): Promise<{
    items: ProductTable[];
    total: number;
    pages: number;
    isLoading: boolean;
    error: Error | null;
  }> => {
    try {
      const queryParams = new URLSearchParams({
        ...(status && { status_filter: status }),
        ...(cate && { category: cate }),
        ...(search && { search }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
        page: page.toString(),
        size: size.toString(),
      });
      const response = await apiFetch(
        API_CONFIG.ENDPOINTS.PRODUCTS + `?${queryParams.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if(response.code !== 200){
        throw new Error(response.detail || "Gagal memuat produk");
      }

      const data = response.data as ProductResponse;
      const dataProduct: ProductTable[] = data.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        // stocks: item.stocks.toString(),
        category: item.category?.description ?? "-",
        status_barang: item.status_barang,
        img: item.img ? `http://localhost:8200/static/${item.img}` : "Image not found",
        ingredients: item.ingredients?.map((ing) => ({
          codeBarang: ing.id,
          namaBarang: ing.description,
          stock: ing.stock,
          satuan: ing.satuan ? ing.satuan.name : "",
        })),
      }));
      return { items: dataProduct, total: data.total, pages: data.pages, isLoading: false, error: null };
    } catch (error) {
      // Fallback to mock data during development
      console.error("Error fetching products:", error);
      return {
        items: [],
        total: 0,
        pages: 0,
        isLoading: false,
        error: error as Error,
      };
    }
  },
  
  // Get product by ID
  getById: async (id: string): Promise<ProductTable | null> => {
    try {
      const response = await apiFetch(`/products/${id}`);
      return response.data;
    } catch {
      // Fallback to mock data
      return null;
    }
  },

  getProjection: async (): Promise<ProductProjections[]> => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_PRODUCTS_PROJECTIONS);
      return response.data;
    } catch {
      // Fallback to mock data
      return [];
    }
  },
  
  // Create new product
  create: async (product: FormData): Promise<ProductTable> => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_PRODUCT, {
        method: 'POST',
        body: product,
      });
      console.log("responsee ", response);
      
      return response.data;
    } catch(error) {
      // Fallback to mock behavior
      console.log(error);
      
      throw error;
    }
  },
  
  // Update product
  update: async (id: string, product: Partial<RequestBodyProduct>): Promise<ProductTable | null> => {
    try {
      const response = await apiFetch(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
      });
      return response.data;
    } catch(error) {
      // Fallback to mock behavior
      console.log(error);
      
      throw error;
    }
  },
  
  // Delete product
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiFetch(`/products/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch {
      // Fallback to mock behavior
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) return false;
      
      mockProducts.splice(index, 1);
      return true;
    }
  }
};

// Export the old service for backward compatibility
export const productService = productsApi;
