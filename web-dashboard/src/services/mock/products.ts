import mockProducts from '@/mocks/products';
import { Product } from '@/types/product';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const productServiceMock = {
  async getAll(): Promise<Product[]> {
    await delay(300);
    return [...mockProducts];
  },
  async getById(id: string): Promise<Product | undefined> {
    await delay(200);
    return mockProducts.find(p => p.id === id);
  },
  async create(payload: Partial<Product>): Promise<Product> {
    await delay(200);
    const newP: Product = { ...(payload as Product), id: `p${Date.now()}` };
    mockProducts.unshift(newP);
    return newP;
  },
  async update(id: string, payload: Partial<Product>): Promise<Product | undefined> {
    await delay(200);
    const idx = mockProducts.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    mockProducts[idx] = { ...mockProducts[idx], ...(payload as Product) };
    return mockProducts[idx];
  },
  async delete(id: string): Promise<boolean> {
    await delay(200);
    const idx = mockProducts.findIndex(p => p.id === id);
    if (idx === -1) return false;
    mockProducts.splice(idx, 1);
    return true;
  }
};

export default productServiceMock;
