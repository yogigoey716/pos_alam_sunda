import { Product } from '@/types/product';

// Mock data - later replace with API calls
export const mockProducts: Product[] = [
  {
    id: '1',
    name: "Nasi Ayam Kremes",
    category: "Makanan",
    stock: 150,
    price: 25000,
    status: "Tersedia",
  },
  {
    id: '2',
    name: "Teh",
    category: "Minuman", 
    stock: 120,
    price: 5000,
    status: "Tersedia",
  },
  {
    id: '3',
    name: "Es Kopi Susu",
    category: "Minuman",
    stock: 110,
    price: 15000,
    status: "Tersedia",
  },
  {
    id: '4',
    name: "Sate Maranggi",
    category: "Makanan",
    stock: 100,
    price: 30000,
    status: "Tersedia",
  },
  {
    id: '5',
    name: "Soto Ayam",
    category: "Makanan",
    stock: 95,
    price: 20000,
    status: "Tersedia",
  },
  {
    id: '6',
    name: "Jus Jeruk",
    category: "Minuman",
    stock: 90,
    price: 12000,
    status: "Tersedia",
  },
  {
    id: '7',
    name: "Lemon Tea",
    category: "Minuman",
    stock: 85,
    price: 8000,
    status: "Tersedia",
  },
  {
    id: '8',
    name: "Mie Goreng",
    category: "Makanan",
    stock: 80,
    price: 18000,
    status: "Tersedia",
  },
  {
    id: '9',
    name: "Nasi Goreng",
    category: "Makanan",
    stock: 77,
    price: 22000,
    status: "Tersedia",
  },
  {
    id: '10',
    name: "Ayam Bakar",
    category: "Makanan",
    stock: 20,
    price: 28000,
    status: "Stok Rendah",
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
