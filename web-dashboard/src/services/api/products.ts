import { Product } from '@/types/product';
import { mockManagementStock } from '@/services/api/managementStock';

// Mock data - later replace with API calls
export const mockProducts: Product[] = [
  {
    id: '1',
    name: "Nasi Ayam Kremes",
    category: "Makanan",
    stock: 50,
    price: 25000,
    status: "Tersedia",
    ingredients: [
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-001"); return { codeBarang: "BHN-001", qty: 0.15, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-002"); return { codeBarang: "BHN-002", qty: 0.2, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
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
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-003"); return { codeBarang: "BHN-003", qty: 0.05, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-006"); return { codeBarang: "BHN-006", qty: 0.02, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-007"); return { codeBarang: "BHN-007", qty: 0.1, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
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
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-004"); return { codeBarang: "BHN-004", qty: 0.02, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-006"); return { codeBarang: "BHN-006", qty: 0.02, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-007"); return { codeBarang: "BHN-007", qty: 0.1, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
  {
    id: '4',
    name: "Sate Maranggi",
    category: "Makanan",
    stock: 80,
    price: 30000,
    status: "Tersedia",
    ingredients: [
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-005"); return { codeBarang: "BHN-005", qty: 10, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
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
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-001"); return { codeBarang: "BHN-001", qty: 0.1, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-002"); return { codeBarang: "BHN-002", qty: 0.15, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
  {
    id: '6',
    name: "Jus Jeruk",
    category: "Minuman",
    stock: 25,
    price: 12000,
    status: "Tersedia",
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
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-003"); return { codeBarang: "BHN-003", qty: 0.05, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-007"); return { codeBarang: "BHN-007", qty: 0.1, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
  {
    id: '8',
    name: "Mie Goreng",
    category: "Makanan",
    stock: 10,
    price: 18000,
    status: "Stok Rendah",
    // ingredients intentionally left empty for demo
  },
  {
    id: '9',
    name: "Nasi Goreng",
    category: "Makanan",
    stock: 0,
    price: 22000,
    status: "Habis",
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
      (() => { const b = mockManagementStock.find(x => x.codeBarang === "BHN-001"); return { codeBarang: "BHN-001", qty: 0.2, namaBarang: b?.namaBarang, satuan: b?.satuan }; })(),
    ],
  },
];

// API service functions (replace with actual API calls later)
export const productService = {
  getAll: async (): Promise<Product[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockProducts;
  },
  
  getById: async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockProducts.find(p => p.id === id) || null;
  },
  
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newProduct = { ...product, id: Date.now().toString() };
    mockProducts.push(newProduct);
    return newProduct;
  },
  
  update: async (id: string, product: Partial<Product>): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    mockProducts[index] = { ...mockProducts[index], ...product };
    return mockProducts[index];
  },
  
  delete: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    mockProducts.splice(index, 1);
    return true;
  }
};
