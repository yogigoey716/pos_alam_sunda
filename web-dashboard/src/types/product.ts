export interface ProductIngredient {
  codeBarang: string; // kode bahan baku
  qty: number; // jumlah yang digunakan per produk
  namaBarang?: string; // opsional, hasil lookup untuk UI
  satuan?: string; // opsional, hasil lookup untuk UI
}

export interface Product {
  id?: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: ProductStatus;
  ingredients?: ProductIngredient[]; // komposisi bahan baku
  // UI / computed fields
  margin?: number;
  hpp?: number;
  trend?: number;
  laba?: number;
}

export type ProductStatus = 'Tersedia' | 'Stok Rendah' | 'Habis';

export interface ProductFormData {
  name: string;
  category: string;
  stock: number;
  price: number;
}

export interface ProductFilters {
  category: string;
  searchTerm: string;
  status?: ProductStatus;
}
